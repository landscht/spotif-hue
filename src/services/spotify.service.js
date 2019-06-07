export default {
    registration : {
        client_id : "9b976141d3324f198766ee8e48aaadca",
        client_secret : "18e2cf36acbd4663b4e27c450aec82a0",
        redirect_uri : "http://localhost:8080",
        scopes : 'streaming user-read-birthdate user-read-private user-read-email user-modify-playback-state playlist-modify-public user-read-playback-state user-top-read',
    },

    infos : {
        current_track : {},
        duration_track : 0,
        position_track : 0,
        current_artist : ''
    },

    access_token : "",

    actualiseInfos(current_track, duration, position) {
        this.infos.current_track = current_track
        this.infos.duration_track = duration
        this.infos.position_track = position
    },

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        return hashParams;
    },

    login(url) {
        fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
    },

    me() {
        return fetch('https://api.spotify.com/v1/me', {
            method : 'GET',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        }).then((response) => response.json())
            .then((data) => {
                return data
            })
    },

    nextTrack() {
        fetch(`https://api.spotify.com/v1/me/player/previous`, {
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        })
    },

    previousTrack() {
        fetch(`https://api.spotify.com/v1/me/player/next`, {
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        })
    },

    searchTrack() {
        return fetch(`https://api.spotify.com/v1/search?q=${this.search.query}&type=track&limit=5`, {
            method : 'GET',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        }).then((response) => response.json())
            .then((data) => {
                return data
            })
    },

    playerNow() {
        return fetch('https://api.spotify.com/v1/me/player', {
            method : 'GET',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        }).then((response) => response.json())
            .then((data) => {
                return data
            })
    },

    playMusic() {
         fetch('https://api.spotify.com/v1/me/player/play', {
            method : 'PUT',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },

        })
    },

    pauseMusic() {
        fetch('https://api.spotify.com/v1/me/player/pause', {
            method : 'PUT',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },

        })
    }
}
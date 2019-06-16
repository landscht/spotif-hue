export default {
    registration : {
        client_id : "9b976141d3324f198766ee8e48aaadca",
        client_secret : "18e2cf36acbd4663b4e27c450aec82a0",
        //redirect_uri : "http://localhost:8080",
        redirect_uri : "https://spotifhue.herokuapp.com/",
        scopes : 'streaming playlist-read-collaborative user-read-recently-played user-read-birthdate user-read-private user-read-email user-modify-playback-state playlist-modify-public user-read-playback-state user-top-read',
    },

    infos : {
        current_track : {},
        duration_track : 0,
        position_track : 0,
        current_artist : '',
        pause : false,
        interval : null
    },

    device_id : '',

    info_me : {},

    access_token : "",

    actualiseInfos(current_track, duration, position) {
        this.infos.current_track = current_track
        this.infos.duration_track = duration
        this.infos.position_track = position
        clearInterval(this.infos.interval)
        this.infos.interval = setInterval(function() {
            this.infos.position_track = this.infos.position_track + 1000
        }.bind(this), 1000)
    },

    getPause: function (pause) {
        this.infos.pause = pause
        if(pause) {
            clearInterval(this.infos.interval)
        }
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

    playPlaylistWithMusic(context_uri, track_uri) {
        fetch(`https://api.spotify.com/v1/me/player/play`, {
            method : 'PUT',
            body : JSON.stringify({context_uri: `${context_uri}`, offset: {uri: `${track_uri}`}}),
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        })
    },

    playPlaylist(context_uri) {
        fetch(`https://api.spotify.com/v1/me/player/play`, {
            method : 'PUT',
            body : JSON.stringify({context_uri: `${context_uri}`}),
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        })
    },

    nextTrack() {
        fetch(`https://api.spotify.com/v1/me/player/next`, {
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        })
    },

    getPlaylist(limit) {
        return fetch(`https://api.spotify.com/v1/me/playlists?limit=${limit}`, {
            method : 'GET',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        }).then((response) => response.json())
            .then((data) => {
                return data
            })
    },

    getPlaylistId(id) {
        return fetch(`https://api.spotify.com/v1/playlists/${id}`, {
            method : 'GET',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        }).then((response) => response.json())
            .then((data) => {
                return data
            })
    },

    getCurrentlyPlaying() {
        return fetch('https://api.spotify.com/v1/me/player/recently-played', {
            method : 'GET',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        }).then((response) => response.json())
            .then((data) => {
                return data
            })
    },

    previousTrack() {
        fetch(`https://api.spotify.com/v1/me/player/previous`, {
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        })
    },

    setDevice(id) {
        console.log(id)
        fetch(`https://api.spotify.com/v1/me/player`, {
            method : 'PUT',
            body : JSON.stringify({device_ids: [`${id}`]}),
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        })
    },

    getDevices() {
        return fetch('https://api.spotify.com/v1/me/player/devices', {
            method : 'GET',
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            },
        }).then((response) => response.json())
            .then((data) => {
                return data
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

    playMusicInms(ms) {
        console.log(ms)
        fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${ms}`, {
            method : 'PUT',
            headers: {
                'Authorization': `Bearer ${this.access_token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
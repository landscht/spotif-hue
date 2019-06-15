import Vue from 'vue'
import moment from "moment";

Vue.filter('formatDate', function(date) {
    if (date) {
        return moment(String(date)).format('hh:ss')
    }
})
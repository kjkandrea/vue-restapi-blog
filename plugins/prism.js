import Prism from '~/assets/js/prism';
import Vue from 'vue'

Vue.prototype.$InjectedPrism = () => {
    if (process.client) {
        Prism.highlightAll(); 
    }
}

/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import VCalendar from 'v-calendar';

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'
import 'v-calendar/style.css';

const app = createApp(App)

app.use(VCalendar, {
  componentPrefix: 'vc', // Use <vc-calendar /> instead of <v-calendar />
});

registerPlugins(app)

app.mount('#app')

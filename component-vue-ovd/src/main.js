import { createApp } from "vue";
import App from "./App.vue";
import store from "./store.js";

createApp(App).use(store).mount("#app");

module.exports = {
  addons: ["@storybook/addon-a11y"],
};

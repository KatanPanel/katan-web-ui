import "@/assets/styles/main.scss";
import { createApp } from "vue";
import App from "@/features/shared/ui/views/App.vue";
import "./registerServiceWorker";
import appStore from "@/store";
import appRouter from "@/router";
import { setupI18n } from "@/i18n";
import { getModule } from "vuex-module-decorators";
import AccountStore from "@/features/account/store/account.store";
import { ComponentCustomProperties } from "@vue/runtime-core";
import VueHead from "vue-head";
import "vue-progressive-image/dist/style.css";

export const i18n = setupI18n({
	legacy: true,
	allowComposition: true,
	messages: {
		"en-US": require(/* webpackChunkName: "locale-[request]" */
		"@/lang/en-US.json").default
	}
});

const app = createApp(App).use(appStore).use(appRouter).use(VueHead).use(i18n);
app.config.unwrapInjectedRef = true;

// assigned all declared augmented types from shims-vue.d.ts
Object.assign(app.config.globalProperties, {
	$isDevelopmentMode: process.env.NODE_ENV !== "production",
	$katan: {
		getUser: () => getModule(AccountStore).getAccount
	}
} as ComponentCustomProperties);

app.mount("#app");

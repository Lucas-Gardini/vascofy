// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	css: ["@/css/tailwind.css", "@/css/main.scss", "maz-ui/css/main.css"],
	build: {
		transpile: ["maz-ui"], // ⚠️ important ⚠️
	},
	modules: ["@nuxtjs/tailwindcss", "@nuxt/image-edge"],
});

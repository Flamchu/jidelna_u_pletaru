import { defineConfig } from "vite";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				home: "./index.html",
				menu: "./menu.html",
				alergeny: "./alergeny.html",
			},
		},
	},
});
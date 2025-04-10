import { defineConfig } from "vite";
import Userscript from "vite-userscript-plugin" 
import { name, version} from "./package.json"


export default  {
	plugins : [
		Userscript({
			entry: "src/main.ts",
			header: {
				name,
				version,
				match: [
					"https://jklm.fun/*"
				],
			},

			server: {
				port: 3000
			}
		}),
	]
}

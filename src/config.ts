// defines config structure and renders config panel
import van from "vanjs-core"
import {Bot} from "./bombparty.ts"
	
export interface Config {
	dict: string[];
	speed: number;
};

const {dialog, form, button, label, input, output} = van.tags

export const config = (bot) => dialog(
		{id: "configDialog",
			style: "left:35%;top:35%;padding:2%; position:absolute"
		}, 
		form({method: "dialog", id:"configForm"},
				 label({style: "display:block", for:"fileprompt"}, "words dictionary",
							 input({type: "file", name: "dictF", id: "fileprompt"})
					),
				 label({style: "display:block", for:"s"},"speed (in ms)", 
				 		input({
									name:"speed",
									id:"s",
						},),
					),
				 button({onclick: () => {save(bot);document.forms.configForm.submit()}}, "save once"),
				 button({onclick: () => {save(bot, true);document.forms.configForm.submit()}}, "save forever"),
				 button({onclick: () => document.forms.configForm.submit()}, "close")
			)
	)

function build_config(file: Path, speed: number, bot: Bot, forever): string[] {
	const reader = new FileReader()

	reader.onload = () => {
		 const array = JSON.parse(reader.result)
		 const config: Config = {
			 dict: array,
			 speed: speed,
		 };
		 bot.updateConfig(config);

		 if (forever){
				GM_setValue("config", config);
		 }
		 
	}
	reader.onerror = () => {
		console.log("FileReader error")
	}

	reader.readAsText(file);
}

function save(bot, forever = false): void {
	console.log("form closed");
	const formdata: FormData = new FormData(document.forms.configForm);
	build_config(formdata.get("dictF"), formdata.get("speed"), bot, forever)
};



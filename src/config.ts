// defines config structure and renders config panel
import van from "vanjs-core"
	
export interface Config {
	dict: string[];
	speed: number;
};

const {dialog, form, button, label, input} = van.tags

export const config = () => dialog(
		{id: "configDialog",
			style: "left:35%;top:35%;padding:2%; position:absolute"
		}, 
		form({method: "dialog", id:"configForm"},
				 label({style: "display:block", for:"fileprompt"}, "words dictionary",
							 input({type: "file", name: "dictF", id: "fileprompt"})
					),
				 label({style: "display:block", for:"s"},"speed", 
							 input({type:"range", name:"speed", id:"s", min:0, max:1000, step:10})
					),
				 button({onclick: save, type: "button"}, "save"),

			)


	)


function save(): void {
	console.log("form closed");
	const formdata: FormData = new FormData(document.forms.configForm);
	console.log(build_config(formdata.get("dictF"), formdata.get("speed")));

};

function build_config(file, speed): Config {
	return {
		dict: import(window.URL.createObjectURL(file), {with: {type: "json"}}),
		speed: speed
	}
}

import {type_word, find_word, history_builder} from "./utils.ts"
import {Config} from "./config.ts"
import dict from "../assets/english.json"

const example_config: Config = {
	dict,
	speed: 80
};


export class Bot {
	dict: string[];
	speed: number;
	history: string[];
	observerState: bool; // true means connected, false means disconnected
	syllableObserver: Observer;

	constructor(config: Config = example_config){
		this.dict = config.dict;
		this.speed = config.speed;
		this.history = [];
		this.observerState = false;
		this.syllableObserver = new MutationObserver(() => {

			if (milestone.currentPlayerPeerId == selfPeerId) {
				const syllable: String = milestone.syllable;
				type_word.bind(this, this.dict, syllable, this.speed, this.history)();
			};
			console.log(this.history);
			this.history = this.history.concat(history_builder());
		});
		console.log("bot initialized");
	};


	
	toggleObserver(): void {
		if (this.observerState) {
			this.syllableObserver.disconnect();
			this.observerState = false;
			console.log("is off")
		} else {
			this.syllableObserver.observe($(".middle .round .syllable"), {childList: true});
			this.observerState = true;
			console.log("is on")
		};
		return this.observerState
	};

	updateConfig(config: Config) {
		this.dict = config.dict;
		this.speed = config.speed;
	}
};

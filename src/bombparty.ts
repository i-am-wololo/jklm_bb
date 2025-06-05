import {type_word, find_word, history_builder, shuffle_dict} from "./utils.ts"
import {Config} from "./config.ts"
import dict from "../assets/english.json"

const example_config: Config = {
	dict,
	speed: 60,
	wait: 600
};


export class Bot {
	dict: string[];
	speed: number;
	history: string[];
	observerState: bool; // true means connected, false means disconnected
	// wait: number;
	syllableObserver: Observer;

	constructor(config: Config = example_config){
		this.dict = shuffle_dict(config.dict);
		this.speed = config.speed;
		// this.wait = config.wait
		this.history = [];
		this.observerState = false;
		this.syllableObserver = new MutationObserver(() => {
			if (milestone.currentPlayerPeerId == selfPeerId) {
				const syllable: String = milestone.syllable;
				type_word.bind(this, this.dict, syllable, this.speed, this.history, 200)();
			};
			this.history = this.history.concat(history_builder());
		});
		console.log("bot initialized");
	};


	
	toggleObserver(): bool {
		if (this.observerState) {
			this.syllableObserver.disconnect();
			this.observerState = false;
		} else {
			type_word.bind(this, this.dict, milestone.syllable, this.speed, this.history, 600)();
		this.history = this.history.concat(history_builder());
			this.syllableObserver.observe($(".middle .round .syllable"), {childList: true});
			this.observerState = true;
		};
		return this.observerState
	};

	updateConfig(config: Config) {
		this.dict = config.dict;
		this.speed = config.speed;
		// this.wait = config.wait;
	}

};

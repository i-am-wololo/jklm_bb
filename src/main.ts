import {regexp_builder, find_word} from "./utils.ts";
import {fill} from "./keyboardemulator.ts"
import words from "../assets/dict.json"


const jquery: (str: string) => HTMLElement = unsafeWindow.$;
const triggerSubmit: Event = new Event("submit");

const gameWindow: HTMLElement = document.getElementsByClassName("game")[0]

// callback pour un mutationobserver, surveille si le jeu est chargé
function gameLoaded(mutationList, observer): void {
	for (const mutation in mutationList) {
		console.log("game loaded!");

		// attache le mutationobserver pour les syllabes
		//
		console.log("loading syllable observer")

		const syllableNode: HTMLElement = document.getElementsByClassName(".syllable")[0];
		const syllableobserver: Observer = new MutationObserver(syllableChange);

		console.log(syllableNode)

		syllableobserver.observe(syllableNode, {childList: true});
		console.log("done!");

		console.log("unloading game observer");
		observer.disconnect();
	}
};



const observer: Observer = new MutationObserver(gameLoaded);
observer.observe(gameWindow, {childList: true});


function syllableChange(mutationList, observer) {
	for (const mutation in mutationList) {
		console.log(mutation);

	};
}


export function solve() {
	let pattern = regexp_builder(unsafeWindow.milestone.syllable);
	let word = find_word(words, pattern);

	fill(word, jquery(".selfTurn input"));
	jquery(".selfTurn form");

	

		
};


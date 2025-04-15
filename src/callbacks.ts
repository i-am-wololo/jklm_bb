import {type_word} from "./utils"
import words from '../assets/dict.json'

export function syllable_change(mutationList, observer) {
	// if our turn
	if (milestone.currentPlayerPeerId == selfPeerId) {
		console.log("playing!");
		const syllable: String = milestone.syllable;
		type_word(words, syllable, 20);
	};
}

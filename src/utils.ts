import {Bot} from "./bombparty.ts"

// génère une règle
// TODO: exclure les lettres déjà utilisé
export function regexp_builder(chars: string, excludedletters: string[]): RegExp {
	if (excludedletters != null) {
		const excludedpat: string[] = [];
		for (let i = 0; i<excludedletters.length; i++) {
			excludedpat.push(`(?!.*${excludedletters[i]})`)
		};
		return RegExp(`^${excludedpat.toString().replace(/[!.,]/g, '')}.*${chars}.*$`);
	}
	return RegExp(`^.*${chars}.*$`)
};


// prend en paramètre un dictionnaire (tableau de chaînes) et une règle, et retourne le premier mot qui est approuvé par la règle
export function find_word(dict: string[], pattern: RegExp, used_words: string[], random: bool = false): String {
	let found = false;
	let i: number = 0;
	while (i <= dict.length && found == false) {
		found = pattern.test(dict[i]) && !used_words.includes(dict[i]);
		i++
	};
	return dict[i-1];
};

/* le site regarde d'abord si un les lettres d'un mots sont écrits avec 
 * socket.emit("setWord", word, false);
 * puis quand un mot est envoyé, socket.emit("setWord", word, true) est appelé.
 * speed est en milisecondes
 */
export function type_word(dict: String[], syllable: String, speed: number, history: string[], wait: number = 0) {
	const pattern: RegExp = regexp_builder(syllable);
	const word: String = find_word(dict, pattern, history);
	let i: number = 0;
	setTimeout(() => {
	let typing = setInterval(() => {
		i++
		socket.emit("setWord", word.slice(0, i+1) ,false)
		if (i > word.length-1) {
			socket.emit("setWord", word, true);
			clearInterval(typing);
		};
	}, speed)}, 1100);
};

export function history_builder() {
	const result: string[] = [];
	for (const value of Object.values(milestone.playerStatesByPeerId)) {
			if (value.word != "") {
				result.push(value.word);
			}
	}
	return result
}



export function shuffle_dict(dict: String[]): String[] {
	for (let i = dict.length-1; i>=1; i--) {
		const randindex: number = Math.floor(Math.random()*(i+1));
		[dict[i], dict[randindex]] = [dict[randindex], dict[i]]
	}
	return dict
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

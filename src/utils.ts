// génère une règle
// TODO: exclure les lettres déjà utilisé
export function regexp_builder(chars: String): RegExp {
	const excludedpat: String[] = [];
	// for (let i = 0; i<excludedletters.length; i++) {
	// 	excludedpat.push(`(?!.*${excludedletters[i]})`)
	// };
	// return RegExp(`^${excludedpat.toString().replace(/[!.,]/g, '')}.*${chars}.*$`);
	// 
	return RegExp(`^.*${chars}.*$`)
};


// prend en paramètre un dictionnaire (tableau de chaînes) et une règle, et retourne le premier mot qui est approuvé par la règle
export function find_word(dict: String[], pattern: RegExp): String {
	let found = false;
	let i = 0;
	while (i <= dict.length && found == false) {
		found = pattern.test(dict[i]);
		i++
	};
	return dict[i-1];
};



// écrit un mot lettre par lettre puis l'envoie
/* bombparty regarde d'abord si un les lettres d'un mots sont écrit avec 
 * socket.emit("setWord", word, false);
 * puis quand un mot est envoyé, socket.emit("setWord", word, true) est appelé
* speed est en milisecondes
 */ 
export function type_word(dict: String[], syllable: String, speed: number) {
	const pattern: RegExp = regexp_builder(syllable);
	const word: String = find_word(dict, pattern);
	console.log(word);
	let i: number = 0;
	let typing = setInterval(() => {
		i++
		socket.emit("setWord", word.slice(0, i+1) ,false)
		if (i > word.length-1) {
			socket.emit("setWord", word, true);
			clearInterval(typing);
		};
	}, speed);
};

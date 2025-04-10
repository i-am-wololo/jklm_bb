
// génère une règle
export function regexp_builder(chars: string): RegExp {
	return RegExp("("+chars+")");
};


// prend en paramètre un dictionnaire et une règle, et retourne le premier mot qui est approuvé par la règle
export function find_word(dict: array[string], pattern: RegExp): string {
	let found = false;
	let i = 0
	while (i <= dict.length && found == false) {
		found = pattern.test(dict[i]);
		i++
	};
	return dict[i-1];
};





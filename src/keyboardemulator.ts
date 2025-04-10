

// écrit et envoie
export function fill(content: string, form: HTMLElement, speed?: int): void {
	const typingEv = new Event("input");
	const input: HTMLElement = form.getElementByTag("input");
	for (i = 0; i <= string.length; i++) {
		setTimeout(function(){
			input.value += content[i];
			form.dispatchEvent(typingEv)
		}, speed)
	};
	form.submit()
};





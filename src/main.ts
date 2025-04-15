import {syllable_change} from "./callbacks.ts"


console.log("initialization");
const syllableNode: HTMLEvent = $(".middle .round .syllable");
const syllableObserver: Obserevr = new MutationObserver(syllable_change);

syllableObserver.observe(syllableNode, {childList: true});
console.log("syllable observer attached");






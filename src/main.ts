import {syllable_change} from "./callbacks.ts"
import {Bot} from "./bombparty.ts"
import van from "vanjs-core"
import {config} from "./config.ts"

// userscript initialization
const {button} = van.tags

const injected: HTMLElement = $(".summary")

const bot = new Bot();
const botstate = van.state(false)

van.add(injected, 
				() => button({onclick: () => document.getElementById("configDialog").showModal()},
										 "config"),
				() => button(
					{onclick: () => botstate.val = bot.toggleObserver()},
					(botstate.val) ? "on" : "off"
				)
);

van.add(document.body, config())

	




export const test = "hello";

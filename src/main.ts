import {syllable_change} from "./callbacks.ts"
import {Bot} from "./bombparty.ts"
import van from "vanjs-core"
import {config} from "./config.ts"

// userscript initialization
const {button} = van.tags;
const debug: bool = true;

const injected: HTMLElement = $(".summary");

// initialise bot avec config sauvegardé ou config de base
const bot = new Bot(GM_getValue("config", undefined)); 
console.log(bot)

const botstate = van.state(false)

van.add(injected, 
				() => button(
					{onclick: () => document.getElementById("configDialog").showModal()},
					"config"
				),
				() => button(
					{onclick: () => botstate.val = bot.toggleObserver()},
					(botstate.val) ? "on" : "off"
				),
				// () => button(
				// 	{onclick: () =>bot.findThisWord()}, "trouve ce mot"
				// )
);

van.add(document.body, config(bot))

if (debug) {
	van.add(injected, 
		() => button(
				{onclick: () => console.log(bot)}, "Print config"
		),
	)
}

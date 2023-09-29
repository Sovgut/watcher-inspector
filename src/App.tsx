import {Platform, Watcher} from "@sovgut/watcher";
import {useEffect} from "react";

import {Count} from "./components/Count.js";
import {List} from "./components/List.js";
import {New} from "./components/New.js";
import {Next} from "./components/Next.js";
import {Scheduler} from "./components/Scheduler.js";
import {Status} from "./components/Status.js";
import {Tick} from "./components/Tick.js";

const URLS = ["https://www.olx.ua/nedvizhimost/kvartiry/", "https://www.olx.ua/rabota/roznichnaya-torgovlya-prodazhi-zakupki/"];

export function AppPage() {
	useEffect(() => {
		Watcher.addEntry({url: URLS[0], platform: Platform.Olx, title: "Квартиры"});
		Watcher.addEntry({url: URLS[1], platform: Platform.Olx, title: "Работа"});

		return function cleanup() {
			Watcher.removeEntry({url: URLS[0], platform: Platform.Olx, title: "Квартиры"});
			Watcher.removeEntry({url: URLS[1], platform: Platform.Olx, title: "Работа"});
		};
	}, []);

	return (
		<ul>
			<Scheduler />
			<Tick />
			<Status />
			<Next />
			<Count />
			<New />
			<List />
		</ul>
	);
}

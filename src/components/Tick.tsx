import {Watcher} from "@sovgut/watcher";
import {useEffect, useState} from "react";

import {usePing} from "../hooks/ping";

export function Tick() {
	const [tick, setTick] = useState(0);
	const componentId = usePing("tick");

	useEffect(() => {
		Watcher.on("tick", onTickEvent);

		return function cleanup() {
			Watcher.off("tick", onTickEvent);
		};
	}, []);

	function onTickEvent(tick: number) {
		setTick(tick);
	}

	return (
		<section id={componentId}>
			<details>
				<summary>Tick</summary>
				<article>
					<b>Event</b>
					<pre className="event">tick</pre>

					<hr />
					<b>Param 0</b>
					<pre className="value">{tick}</pre>
				</article>
			</details>
		</section>
	);
}

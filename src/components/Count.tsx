import {QueueEntry, Watcher} from "@sovgut/watcher";
import {useEffect, useState} from "react";

import {usePing} from "../hooks/ping.js";

export function Count() {
	const [count, setCount] = useState(0);
	const [entry, setEntry] = useState<QueueEntry | undefined>();
	const componentId = usePing("count");

	useEffect(() => {
		Watcher.on("count", onCount);

		return function cleanup() {
			Watcher.on("count", onCount);
		};
	}, []);

	function onCount(count: number, entry: QueueEntry) {
		setCount(count);
		setEntry(entry);
	}

	function unknownValue() {
		return <pre className="unknown">unknown</pre>;
	}

	function knownValue(entry: QueueEntry) {
		return <pre className="value">{JSON.stringify(entry, null, 4).replace('"platform": 0', '"platform": 0 (enum Platform.Olx)')}</pre>;
	}

	return (
		<section id={componentId}>
			<details>
				<summary>Count</summary>
				<article>
					<b>Event</b>
					<pre className="event">count</pre>

					<hr />
					<b>Param 0</b>
					<pre className="value">{count}</pre>

					<hr />
					<b>Param 1</b>
					{entry ? knownValue(entry) : unknownValue()}
				</article>
			</details>
		</section>
	);
}

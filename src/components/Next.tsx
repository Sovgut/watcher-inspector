import {QueueEntry, Watcher} from "@sovgut/watcher";
import {useEffect, useState} from "react";

import {usePing} from "../hooks/ping.js";

export function Next() {
	const [entry, setEntry] = useState<QueueEntry | undefined>();
	const [total, setTotal] = useState<QueueEntry[]>([]);
	const componentId = usePing("next");

	useEffect(() => {
		Watcher.on("next", onChange);

		return function cleanup() {
			Watcher.off("next", onChange);
		};
	}, []);

	function onChange(entry: QueueEntry, total: QueueEntry[]) {
		setEntry(entry);
		setTotal(total);
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
				<summary>Next</summary>
				<article>
					<b>Event</b>
					<pre className="event">next</pre>

					<hr />
					<b>Param 0</b>
					{entry ? knownValue(entry) : unknownValue()}

					<hr />
					<b>Param 1</b>
					<pre className="list">
						<details>
							<summary>QueueEntry[] &#x7b; ...{total.length} items &#x7d;</summary>
							<ul>
								{total.map((item) => (
									<pre key={item.url} className="list">
										<details>
											<summary>{item.url}</summary>
											<pre>{JSON.stringify(item, null, 4).replace('"platform": 0', '"platform": 0 (enum Platform.Olx)')}</pre>
										</details>
									</pre>
								))}
							</ul>
						</details>
					</pre>
				</article>
			</details>
		</section>
	);
}

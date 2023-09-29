import {QueueEntry, QueueState, Watcher} from "@sovgut/watcher";
import {useEffect, useState} from "react";

import {usePing} from "../hooks/ping.js";

export function Queue() {
	const [state, setState] = useState(Watcher.isEnabled());
	const [total, setTotal] = useState<QueueEntry[]>([]);
	const componentId = usePing("queue");

	useEffect(() => {
		Watcher.on("queue", onChange);

		return function cleanup() {
			Watcher.off("queue", onChange);
		};
	}, []);

	function onChange(state: QueueState, total: QueueEntry[]) {
		setState(state === QueueState.Enabled);
		setTotal(total);
	}

	function toggleState() {
		if (Watcher.isEnabled()) {
			Watcher.disable();
		} else {
			Watcher.enable();
		}
	}

	return (
		<section id={componentId}>
			<details>
				<summary>Queue</summary>
				<article>
					<b>Event</b>
					<ul className="row">
						<pre className="event">queue</pre>
						<button onClick={toggleState}>{state ? "Disable" : "Enable"}</button>
					</ul>

					<hr />
					<b>Param 0</b>
					<pre className="value">QueueState.{state ? "Enabled" : "Disabled"}</pre>

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

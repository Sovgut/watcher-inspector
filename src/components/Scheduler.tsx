import {QueueEntry, SchedulerState, Watcher} from "@sovgut/watcher";
import {useEffect, useState} from "react";

import {usePing} from "../hooks/ping.js";

export function Scheduler() {
	const [state, setState] = useState(Watcher.isEnabled());
	const [total, setTotal] = useState<QueueEntry[]>([]);
	const componentId = usePing("scheduler");

	useEffect(() => {
		Watcher.on("scheduler", onChange);

		return function cleanup() {
			Watcher.off("scheduler", onChange);
		};
	}, []);

	function onChange(state: SchedulerState, total: QueueEntry[]) {
		setState(state === SchedulerState.Enabled);
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
				<summary>Scheduler</summary>
				<article>
					<b>Event</b>
					<ul className="row">
						<pre className="event">scheduler</pre>
						<button onClick={toggleState}>{state ? "Disable" : "Enable"}</button>
					</ul>

					<hr />
					<b>Param 0</b>
					<pre className="value">SchedulerState.{state ? "Enabled" : "Disabled"}</pre>

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

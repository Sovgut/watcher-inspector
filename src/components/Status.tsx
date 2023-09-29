import {QueueEntry, Status as WatchStatus, Watcher} from "@sovgut/watcher";
import {useEffect, useState} from "react";

import {usePing} from "../hooks/ping.js";

export function Status() {
	const [status, setStatus] = useState<WatchStatus>(WatchStatus.Idle);
	const [entry, setEntry] = useState<QueueEntry | undefined>();
	const componentId = usePing("status");

	useEffect(() => {
		Watcher.on("status", onChange);

		return function cleanup() {
			Watcher.off("status", onChange);
		};
	}, []);

	function onChange(status: WatchStatus, entry: QueueEntry) {
		setStatus(status);
		setEntry(entry);
	}

	function unknownValue() {
		return <pre className="unknown">unknown</pre>;
	}

	function knownValue(entry: QueueEntry) {
		return <pre className="value">{JSON.stringify(entry, null, 4).replace('"platform": 0', '"platform": 0 (enum Platform.Olx)')}</pre>;
	}

	const STRINGIFY_STATUS = {
		[WatchStatus.Idle]: "Idle",
		[WatchStatus.Fetching]: "Fetching",
		[WatchStatus.Processing]: "Processing",
		[WatchStatus.Saving]: "Saving",
		[WatchStatus.Error]: "Error",
	};

	return (
		<section id={componentId}>
			<details>
				<summary>Status</summary>
				<article>
					<b>Event</b>
					<pre className="event">status</pre>

					<hr />
					<b>Param 0</b>
					<pre className="value">Status.{STRINGIFY_STATUS[status]}</pre>

					<hr />
					<b>Param 1</b>
					{entry ? knownValue(entry) : unknownValue()}
				</article>
			</details>
		</section>
	);
}

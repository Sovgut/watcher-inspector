import {EntityOffer, QueueEntry, Watcher} from "@sovgut/watcher";
import clsx from "clsx";
import {useEffect, useState} from "react";

import {usePing} from "../hooks/ping.js";

export function List() {
	const [list, setList] = useState<EntityOffer[]>([]);
	const [entry, setEntry] = useState<QueueEntry | undefined>();
	const componentId = usePing("list");

	useEffect(() => {
		Watcher.on("list", onChange);

		return function cleanup() {
			Watcher.off("list", onChange);
		};
	}, []);

	function onChange(list: EntityOffer[], entry: QueueEntry) {
		setList(list);
		setEntry(entry);
	}

	function unknownValue() {
		return <pre className="unknown">unknown</pre>;
	}

	function knownValue(entry: QueueEntry) {
		return <pre className="value">{JSON.stringify(entry, null, 4).replace('"platform": 0', '"platform": 0 (enum Platform.Olx)')}</pre>;
	}

	function onClearClick() {
		if (entry?.url) {
			Watcher.clear(entry.url).then(() => {
				Watcher.getItems<EntityOffer[]>(entry.url).then((list) => setList(list));
			});
		}
	}

	function renderItem(item: EntityOffer) {
		const className = clsx({
			["list"]: true,
			["corrupted"]: item.hasMissingInfo,
		});

		item.anchor = `https://www.olx.ua${item.anchor}`;

		return (
			<pre key={item.id} className={className}>
				<details>
					<summary>{item.title}</summary>
					<pre>
						{JSON.stringify(item, null, 4)
							.replace('"type": 1,', '"type": 1, (enum Offer.Advert)')
							.replace('"type": 0,', '"type": 0, (enum Offer.Job)')
							.replace('"status": 0', '"status": 0 (enum EntityStatus.New)')
							.replace('"status": 1', '"status": 1 (enum EntityStatus.Visited)')}
					</pre>
				</details>
			</pre>
		);
	}

	return (
		<section id={componentId}>
			<details>
				<summary>List</summary>
				<article>
					<b>Event</b>
					<ul className="row">
						<pre className="event">list</pre>
						<button onClick={onClearClick}>Clear</button>
					</ul>

					<hr />
					<b>Param 0</b>
					<pre className="list">
						<details>
							<summary>EntityOffer[] &#x7b; ...{list.length} items &#x7d;</summary>
							<ul>{list.map((item) => renderItem(item))}</ul>
						</details>
					</pre>

					<hr />
					<b>Param 1</b>
					{entry ? knownValue(entry) : unknownValue()}
				</article>
			</details>
		</section>
	);
}

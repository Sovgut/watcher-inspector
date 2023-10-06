import {Offer, Resource, Watcher, useNewEvent} from "@sovgut/watcher";

import {useEffect, useState} from "react";
import {usePing} from "../hooks/ping.js";
import {OfferArray} from "./values/OfferArray.js";
import {Primitive} from "./values/Primitive.js";
import {ResourceArray} from "./values/ResourceArray.js";
import {ResourceObject} from "./values/ResourceObject.js";

export function List() {
	const [offers, setOffers] = useState<Offer[]>();
	const {resource, queue} = useNewEvent();
	const componentId = usePing("new");

	useEffect(() => {
		console.log(resource);

		if (resource) {
			getOffers(resource);
		}
	}, [resource]);

	function getOffers(resource: Resource) {
		Watcher.database.getItems(resource.url).then((offers) => {
			setOffers(offers);
		});
	}

	function onClearClick() {
		if (resource) {
			Watcher.database.clear(resource.url).then(() => {
				getOffers(resource);
			});
		}
	}

	return (
		<section id={componentId}>
			<details>
				<summary>Table content</summary>
				<article>
					<fieldset>
						<legend>table name</legend>
						<ul className="row">
							<Primitive value={resource?.url} />
							<button onClick={onClearClick} disabled={!offers || offers.length === 0}>
								Clear
							</button>
						</ul>
					</fieldset>

					<fieldset>
						<legend>value</legend>
						<b>offers</b>
						<OfferArray values={offers} />

						<hr />
						<b>resource</b>
						<ResourceObject value={resource} />

						<hr />
						<b>queue</b>
						<ResourceArray values={queue} />
					</fieldset>
				</article>
			</details>
		</section>
	);
}

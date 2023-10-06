import {useNewEvent} from "@sovgut/watcher";

import {usePing} from "../hooks/ping.js";
import {OfferArray} from "./values/OfferArray.js";
import {ResourceArray} from "./values/ResourceArray.js";
import {ResourceObject} from "./values/ResourceObject.js";

export function New() {
	const {offers, resource, queue} = useNewEvent();
	const componentId = usePing("new");

	return (
		<section id={componentId}>
			<details>
				<summary>New</summary>
				<article>
					<fieldset>
						<legend>name</legend>
						<pre className="event">new</pre>
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

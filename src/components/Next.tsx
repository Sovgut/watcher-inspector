import {useNextEvent} from "@sovgut/watcher";

import {usePing} from "../hooks/ping.js";
import {ResourceArray} from "./values/ResourceArray.js";
import {ResourceObject} from "./values/ResourceObject.js";

export function Next() {
	const {next, resource, queue} = useNextEvent();
	const componentId = usePing("next");

	return (
		<section id={componentId}>
			<details>
				<summary>Next</summary>
				<article>
					<fieldset>
						<legend>name</legend>
						<pre className="event">next</pre>
					</fieldset>

					<fieldset>
						<legend>value</legend>
						<b>next</b>
						<ResourceObject value={next} />

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

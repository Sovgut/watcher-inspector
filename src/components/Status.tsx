import {useStatusEvent} from "@sovgut/watcher";

import {usePing} from "../hooks/ping.js";
import {ResourceArray} from "./values/ResourceArray.js";
import {ResourceObject} from "./values/ResourceObject.js";
import {WatcherStatusEnum} from "./values/WatcherStatusEnum.js";

export function Status() {
	const {status, resource, queue} = useStatusEvent();
	const componentId = usePing("status");

	return (
		<section id={componentId}>
			<details>
				<summary>Status</summary>
				<article>
					<fieldset>
						<legend>name</legend>
						<pre className="event">status</pre>
					</fieldset>

					<fieldset>
						<legend>value</legend>
						<b>status</b>
						<WatcherStatusEnum value={status} />

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

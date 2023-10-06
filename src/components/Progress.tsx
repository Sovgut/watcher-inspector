import {useProgressEvent} from "@sovgut/watcher";

import {usePing} from "../hooks/ping";
import {Primitive} from "./values/Primitive";
import {ResourceArray} from "./values/ResourceArray";
import {ResourceObject} from "./values/ResourceObject";

export function Progress() {
	const {progress, resource, queue} = useProgressEvent();
	const componentId = usePing("progress");

	return (
		<section id={componentId}>
			<details>
				<summary>Progress</summary>
				<article>
					<fieldset>
						<legend>name</legend>
						<pre className="event">progress</pre>
					</fieldset>

					<fieldset>
						<legend>value</legend>
						<b>progress</b>
						<Primitive value={progress} />

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

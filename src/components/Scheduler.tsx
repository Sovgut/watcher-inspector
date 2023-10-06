import {Platform, Resource, SchedulerState, useSchedulerCommands, useSchedulerEvent} from "@sovgut/watcher";

import {usePing} from "../hooks/ping.js";
import {ToggleResource} from "./controls/ToggleResource.js";
import {ResourceArray} from "./values/ResourceArray.js";
import {ResourceObject} from "./values/ResourceObject.js";
import {SchedulerStateEnum} from "./values/SchedulerStateEnum.js";

const RESOURCES: Resource[] = [
	{url: "https://www.olx.ua/nedvizhimost/kvartiry/", platform: Platform.Olx, title: "Квартиры"},
	{url: "https://www.olx.ua/uk/transport/avtobusy/?currency=UAH&search%5Bfilter_enum_car_state_type%5D%5B0%5D=with_mileage", platform: Platform.Olx, title: "Работа"},
];

export function Scheduler() {
	const {state, resource, queue} = useSchedulerEvent();
	const {enable, disable} = useSchedulerCommands();
	const componentId = usePing("scheduler");

	function toggleSchedulerState() {
		switch (state) {
			case SchedulerState.Enabled:
				return disable();
			case SchedulerState.Disabled:
				return enable();
		}
	}

	return (
		<section id={componentId}>
			<details>
				<summary>Scheduler</summary>
				<article>
					<fieldset>
						<legend>name</legend>
						<ul className="row">
							<pre className="event">scheduler</pre>
							<button onClick={toggleSchedulerState}>{state === SchedulerState.Enabled ? "Disable" : "Enable"}</button>
							{RESOURCES.map((resource) => (
								<ToggleResource key={resource.url} resource={resource} />
							))}
						</ul>
					</fieldset>

					<fieldset>
						<legend>value</legend>
						<b>state</b>
						<SchedulerStateEnum value={state} />

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

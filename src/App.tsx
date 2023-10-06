import {List} from "./components/List.js";
import {New} from "./components/New.js";
import {Next} from "./components/Next.js";
import {Progress} from "./components/Progress.js";
import {Scheduler} from "./components/Scheduler.js";
import {Status} from "./components/Status.js";

export function AppPage() {
	return (
		<ul>
			<Scheduler />
			<Progress />
			<Status />
			<Next />
			<New />
			<List />
		</ul>
	);
}

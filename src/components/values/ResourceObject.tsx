import {Resource} from "@sovgut/watcher";
import {typifyResource} from "../../utils/typify-resource";

type Props = {
	value?: Resource;
};

export function ResourceObject(props: Props) {
	if (typeof props.value === "undefined") {
		return <pre className="unknown">undefined</pre>;
	}

	return (
		<pre className="list">
			<details>
				<summary>Resource</summary>
				<pre>{typifyResource(props.value)}</pre>
			</details>
		</pre>
	);
}

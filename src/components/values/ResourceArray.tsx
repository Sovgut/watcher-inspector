import {Resource} from "@sovgut/watcher";
import {typifyResource} from "../../utils/typify-resource";

type Props = {
	values?: Resource[];
};

export function ResourceArray(props: Props) {
	if (!Array.isArray(props.values)) {
		return <pre className="unknown">undefined</pre>;
	}

	if (props.values.length === 0) {
		return <pre className="unknown">Resource[] &#x7b; ...0 items &#x7d;</pre>;
	}

	return (
		<pre className="list">
			<details>
				<summary>Resource[] &#x7b; ...{props.values.length} items &#x7d;</summary>
				<ul>
					{props.values.map((resource) => (
						<pre key={resource.url} className="list">
							<details>
								<summary>{resource.title}</summary>
								<pre>{typifyResource(resource)}</pre>
							</details>
						</pre>
					))}
				</ul>
			</details>
		</pre>
	);
}

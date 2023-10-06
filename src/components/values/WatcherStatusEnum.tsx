import {WatcherStatus} from "@sovgut/watcher";

type Props = {
	value?: WatcherStatus;
};

export function WatcherStatusEnum(props: Props) {
	if (typeof props.value === "undefined") {
		return <pre className="unknown">undefined</pre>;
	}

	const [name] = Object.keys({WatcherStatus});

	return (
		<pre className="value">
			{name}.{WatcherStatus[props.value]}
		</pre>
	);
}

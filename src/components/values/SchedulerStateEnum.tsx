import {SchedulerState} from "@sovgut/watcher";

type Props = {
	value?: SchedulerState;
};

export function SchedulerStateEnum(props: Props) {
	if (typeof props.value === "undefined") {
		return <pre className="unknown">undefined</pre>;
	}

	const [name] = Object.keys({SchedulerState});

	return (
		<pre className="value">
			{name}.{SchedulerState[props.value]}
		</pre>
	);
}

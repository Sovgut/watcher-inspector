import {Resource, useSchedulerCommands, useSchedulerEvent} from "@sovgut/watcher";

type Props = {
	resource: Resource;
};

export function ToggleResource(props: Props) {
	const {queue} = useSchedulerEvent();
	const {queueResource, dequeueResource} = useSchedulerCommands();

	function onAddClick() {
		queueResource(props.resource);
	}

	function onRemoveClick() {
		dequeueResource(props.resource);
	}

	function isInQueue() {
		if (!Array.isArray(queue)) {
			return false;
		}

		return !!queue.find((queueResource) => queueResource.url === props.resource.url);
	}

	if (isInQueue()) {
		return <button onClick={onRemoveClick}>Remove "{props.resource.title}"</button>;
	}

	return <button onClick={onAddClick}>Add "{props.resource.title}"</button>;
}

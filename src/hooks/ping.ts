import {EventCallback, Watcher} from "@sovgut/watcher";
import {nanoid} from "nanoid";
import {useEffect, useRef} from "react";

export function usePing(event: keyof EventCallback) {
	const id = useRef(nanoid());

	useEffect(() => {
		Watcher.on(event, onEvent);

		return function cleanup() {
			Watcher.off(event, onEvent);
		};
	}, [event]);

	function onEvent() {
		const element = document.getElementById(id.current);
		if (element) {
			element.style.transition = "border-color";
			element.style.transitionDuration = "0ms";
			element.style.borderColor = "#93D8CB";

			setTimeout(() => {
				if (element) {
					element.style.transitionDuration = "3s";
					element.style.borderColor = "rgba(41, 98, 135, 0.5)";
				}
			}, 10);
		}
	}

	return id.current;
}

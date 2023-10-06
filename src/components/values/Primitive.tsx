type Props = {
	value?: string | number;
};

export function Primitive(props: Props) {
	if (typeof props.value === "undefined") {
		return <pre className="unknown">undefined</pre>;
	}

	return <pre className="value">{props.value}</pre>;
}

import {Offer} from "@sovgut/watcher";
import clsx from "clsx";

import {typifyOffer} from "../../utils/typify-offer";

type Props = {
	values?: Offer[];
};

export function OfferArray(props: Props) {
	if (!Array.isArray(props.values)) {
		return <pre className="unknown">undefined</pre>;
	}

	if (props.values.length === 0) {
		return <pre className="unknown">Offer[] &#x7b; ...0 items &#x7d;</pre>;
	}

	return (
		<pre className="list">
			<details>
				<summary>Offer[] &#x7b; ...{props.values.length} items &#x7d;</summary>
				<ul>
					{props.values.map((offer) => (
						<pre key={offer.id} className={clsx({["list"]: true, ["corrupted"]: offer.hasMissingInfo})}>
							<details>
								<summary>{offer.title}</summary>
								<pre>{typifyOffer(offer)}</pre>
							</details>
						</pre>
					))}
				</ul>
			</details>
		</pre>
	);
}

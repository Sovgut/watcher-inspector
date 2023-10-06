import {Offer, OfferKind, OfferStatus} from "@sovgut/watcher";

export function typifyOffer(offer: Offer) {
	offer.anchor = `https://www.olx.ua${offer.anchor}`;

	let text = JSON.stringify(offer, null, 4);

	{
		const [enumName] = Object.keys({OfferKind});
		const search = `"type": ${offer.type}`;
		const replacer = `"type": ${offer.type} (enum ${enumName}.${OfferKind[offer.type]})`;

		text = text.replace(search, replacer);
	}

	{
		const [enumName] = Object.keys({OfferStatus});
		const search = `"status": ${offer.status}`;
		const replacer = `"status": ${offer.status} (enum ${enumName}.${OfferStatus[offer.status]})`;

		text = text.replace(search, replacer);
	}

	return text;
}

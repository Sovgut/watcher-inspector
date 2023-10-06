import {Platform, Resource} from "@sovgut/watcher";

export function typifyResource(resource: Resource) {
	let text = JSON.stringify(resource, null, 4);

	{
		const [enumName] = Object.keys({Platform});
		const search = `"platform": ${resource.platform}`;
		const replacer = `"platform": ${resource.platform} (enum ${enumName}.${Platform[resource.platform]})`;

		text = text.replace(search, replacer);
	}

	return text;
}

import routerMeta from '../../server/router-meta';

function setMetadata(url, state) {
	if (typeof window === 'undefined' || !url || url.match(/^[\w-,\s]+\.[A-Za-z]{3}$/)) {
		return;
	}

	const document = window.document;
	let metadata = routerMeta(url, state);
	if (!metadata || !metadata.title) {
		metadata = {
			title: 'dotNET Weekly',
			description: 'A free weekly newsletter on .NET latest'
		};
	}

	document.querySelector('meta[name="description"]').setAttribute('content', metadata.description);
	document.querySelector('meta[property="og:description"]').setAttribute('content', metadata.description);
	document.querySelector('meta[property="og:title"]').setAttribute('content', metadata.title);
	document.title = metadata.title;

	if (metadata.rss) {
		const rssMeta = document.querySelector('link[type="application/rss+xml"]');
		if (rssMeta) {
			rssMeta.setAttribute('href', metadata.rss);
		} else {
			document.head.insertAdjacentHTML(
				'beforeend',
				`<link rel="alternate" type="application/rss+xml" title="${metadata.title}" href="${metadata.rss}" />`
			);
		}
	}
}

export default setMetadata;

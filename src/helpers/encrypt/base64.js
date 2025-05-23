module.exports.base64UrlDecode = (data) => {
	const base64 = data.replace(/-/g, '+').replace(/_/g, '/');
	const decoded = atob(base64);
	const urlDecode = decodeURIComponent(
		decoded
			.split('')
			.map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
			.join(''),
	);

	return urlDecode;
};

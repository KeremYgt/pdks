/**
 * facet response fixer.
 *
 * @param {object} response
 */
module.exports.facetFixer = (response) => {
	if (typeof response.stats !== 'undefined' && typeof response.stats !== 'object') {
		response.stats = {};
	}
	if (typeof response.stats === 'undefined') {
		response.stats = { total: 0 };
	}
	if (typeof response.stats.total === 'undefined') {
		response.stats.total = 0;
	}
	return response;
};

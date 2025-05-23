const constants = require('../constants');

/* eslint-disable indent */
module.exports = {
	info: {
		version: '1.0.0',
		title: `PROJECT Swagger document (${process.env.NODE_ENV})`,
		description: `PROJECT Swagger document (${process.env.NODE_ENV}) env`,
	},
	security: {
		HeaderAuth: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
		},
		HeaderAuthCron: {
			type: 'apiKey',
			in: 'header',
			name: 'Authorization',
		},
	},
	baseDir: __dirname,
	filesPattern: '../routes/**/*.js',
	notRequiredAsNullable: false,
	exposeApiDocs: process.env.NODE_ENV !== constants.CONFIG.ENV.PROD,
	exposeSwaggerUI: process.env.NODE_ENV !== constants.CONFIG.ENV.PROD,
	swaggerUIPath: '/api-docs',
	apiDocsPath: '/api-docs-download',
	swaggerUiOptions: {
		swaggerOptions: {
			persistAuthorization: true,
		},
	},
};

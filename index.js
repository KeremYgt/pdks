const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const expressJSDocSwagger = require('express-jsdoc-swagger');
const compression = require('compression');

const app = express();
const constants = require('./src/constants');
const helpers = require('./src/helpers');
const middlewares = require('./src/middlewares');
const db = require('./src/db');

app.use(compression({ level: 7 }));

// connectors for db, cache etc.
async function connector() {
	await db.MongoDB.connector('reader');
	await db.MongoDB.connector('writer');
	helpers.cache.redis.connector();
}

connector();
morgan.token('real-ip', (req) => req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip);
morgan.token('datetime', (req) => new helpers.date.kk_date().format('YYYY-MM-DD HH:mm:ss'));

let port = constants.CONFIG.PORTS.PROD_PORT;
if (process.env.NODE_ENV === constants.CONFIG.ENV.PROD) {
	app.use(
		morgan((tokens, req, res) => {
			if (['304', '200', '204', '409'].includes(tokens.status(req, res)) === false) {
				helpers.error.logger({
					method: tokens.method(req, res),
					url: tokens.url(req, res),
					status: tokens.status(req, res),
					length: tokens.res(req, res, 'content-length'),
					responseTime: `${tokens['response-time'](req, res)} ms`,
					headers: req.headers,
					body: req.body,
					params: req.params,
					query: req.query,
				});
			}
		}),
	);
}

if (process.env.NODE_ENV === constants.CONFIG.ENV.TEST || process.env.NODE_ENV === constants.CONFIG.ENV.PROD) {
	app.use(
		morgan((tokens, req, res) => {
			if (['200'].includes(tokens.status(req, res))) {
				if (req.user?.user_permissions) {
					delete req.user.user_permissions;
				}
				helpers.error.logger(
					{
						method: tokens.method(req, res),
						url: tokens.url(req, res),
						status: tokens.status(req, res),
						length: tokens.res(req, res, 'content-length'),
						responseTime: `${tokens['response-time'](req, res)} ms`,
						headers: req.headers,
						user: req.user || {},
						body: req.body,
						params: req.params,
						query: req.query,
					},
					null,
					'project-backend',
					'project-requests',
				);
			}
		}),
	);
}

if (process.env.NODE_ENV === constants.CONFIG.ENV.TEST) {
	port = constants.CONFIG.PORTS.TEST_PORT;
	app.use(
		morgan((tokens, req, res) => {
			if (['304', '200', '204', '409'].includes(tokens.status(req, res)) === false) {
				helpers.error.logger({
					method: tokens.method(req, res),
					url: tokens.url(req, res),
					status: tokens.status(req, res),
					length: tokens.res(req, res, 'content-length'),
					responseTime: `${tokens['response-time'](req, res)} ms`,
					headers: req.headers,
					body: req.body,
					params: req.params,
					query: req.query,
				});
			}
		}),
	);
}

if (process.env.NODE_ENV === constants.CONFIG.ENV.DEV) {
	port = constants.CONFIG.PORTS.DEV_PORT;
	app.use(morgan(':datetime - :real-ip - :method :url :status :response-time ms'));
}

if (process.env.NODE_ENV === constants.CONFIG.ENV.LOCAL) {
	port = constants.CONFIG.PORTS.LOCAL_PORT;
	app.use(morgan(':datetime - :real-ip - :method :url :status :response-time ms'));
}
app.use(cors());
app.use(express.json({ limit: '5gb' }));
app.use(express.urlencoded({ extended: false }));

expressJSDocSwagger(app)(middlewares.swagger);

//routes;
app.get('/', (req, res) => {
	return res.json({
		status: true,
		desc: `project backend service (${process.env.NODE_ENV})`,
	});
});

app.use(require('./src/routes'));

app.use((err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		helpers.error.logger(err);
		const response = constants.RESPONSE.SERVER_ERROR();
		response.desc = err.message;
		return res.status(response.httpStatus).send(response); // Bad request
	}
	return next();
});

/**
 * 404
 */
app.use((req, res) => {
	const response = constants.RESPONSE.NOT_FOUND();
	response.desc = 'No endpoint!';
	return res.status(response.httpStatus).json(response);
});

app.listen(port, () => {
	helpers.error.logger(`project API (${process.env.NODE_ENV}) - PORT: ${port}`, true);
});

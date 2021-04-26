import * as winston from "winston";

const config = {
	levels: {
		error: 0,
		debug: 1,
		warn: 2,
		data: 3,
		info: 4,
		verbose: 5,
		silly: 6,
		custom: 7
	},
	colors: {
		error: 'red',
		debug: 'blue',
		warn: 'yellow',
		data: 'grey',
		info: 'green',
		verbose: 'cyan',
		silly: 'magenta',
		custom: 'yellow'
	}
};

const logger = winston.createLogger({

	levels: config.levels,
	format: winston.format.combine(
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		winston.format.colorize({ all: true }),
		winston.format.align(),
		winston.format.printf(
			info => `${info.timestamp} ${info.level}: ${info.message}`
		)
	),
	transports: [

		new winston.transports.Console(),
		new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
		new winston.transports.File({ filename: './logs/combined.log' }),

	],
	level: 'custom'

});

export { logger }
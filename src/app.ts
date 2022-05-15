import * as express from "express";
import * as helmet from "helmet";
import { createConnection, ConnectionOptions } from 'typeorm';
import { Category } from "./entities/category";
import { Page } from "./entities/page";
import { Product } from "./entities/product";
import { ProductPage } from "./entities/productPage";
import { Review } from "./entities/review";
import { ReviewAttribute } from "./entities/reviewAttribute";
import { Rol } from "./entities/rol";
import { Team } from "./entities/team";
import { User } from "./entities/user";
import { logger } from "./libs/logger";
import { MyRouter } from "./myRouter";

export class App {

	private app: express.Application;
	private router: MyRouter;

	constructor() {

		logger.info(`Profile: ${process.env.profile}`);

		this.app = express();

		let config: any = this.loadConfig();

		this.loadEntities(config.dbConfig);

		this.router = new MyRouter(config);
		this.loadRoutes();
		this.start(config);

	}

	public async start(config) {

		await this.app.listen(config.port, () => { });

	}

	private async loadEntities(dbConfig: ConnectionOptions) {

		const connection = await createConnection(dbConfig);

		if (connection === undefined) {

			logger.error('Error connecting to database');

		}

		await connection.synchronize();

		logger.info('Database synchronized');

	}

	private loadConfig(): any {

		let config: any = {
			profile: process.env.PROFILE,
		};

		// Global config
		this.app.use(helmet());
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		if (process.env.PROFILE === 'DEV') {

			config.port = process.env.DEV_API_PORT;
			config.host = process.env.DEV_API_HOST;

			let dbConfig: ConnectionOptions = {

				"type": "postgres",
				"host": process.env.DEV_DB_HOST,
				"port": Number(process.env.DEV_DB_PORT),
				"username": process.env.DEV_DB_USER,
				"password": process.env.DEV_DB_PASSWORD,
				"database": process.env.DEV_DB_NAME,
				"logging": false,
				"synchronize": true,
				"entities": [
					Review, ProductPage, Product, Category, Page, ReviewAttribute, User, Team, Rol
				],
				
			}

			config.dbConfig = dbConfig;

		}

		return config;

	}

	private loadRoutes(): void {

		this.app.use(this.router.getAPIPath(), this.router.getRouter());

	}

}
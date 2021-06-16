import * as express from "express";
import * as helmet from "helmet";
import { createConnection } from 'typeorm';
import { logger } from "./libs/logger";
import { MyRouter } from "./myRouter";

export class App {

	private app: express.Application;
	private router: MyRouter = new MyRouter();

	constructor() {

		this.app = express();

		this.loadEntities();
		this.loadConfig();
		this.loadRoutes();

	}

	public async start() {

		await this.app.listen(process.env.DEV_PORT, () => {

			logger.info(`Listening on port ${process.env.DEV_PORT}`);

		});

	}

	private async loadEntities() {

		const connection = await createConnection();

		if (connection === undefined) {

			logger.error('Error connecting to database');

		}

		await connection.synchronize();

		logger.info('Database synchronized');

	}

	private loadConfig(): void {

		this.app.use(helmet());
		this.app.use(express.json());

	}

	private loadRoutes(): void {

		this.app.use(this.router.getAPIPath(), this.router.getRouter());

	}

}
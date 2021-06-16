import { App } from "./app";

require('dotenv').config()

function start() {

	let app = new App();
	app.start();

}

start()
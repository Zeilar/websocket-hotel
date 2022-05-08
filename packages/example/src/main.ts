import { Hotel } from "@websocket-hotel";
import express from "express";
import { join } from "path";
import pino from "pino";

const PORT = process.env.NX_PORT ?? 3000;

const logger = pino({
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
		},
	},
});

const ws = new Hotel({ port: 3334 });
ws.on("connection", socket => {
	console.log("here are the guests", ws.guestlist.length);
	socket.on("message", data => {
		console.log(data.toString());
	});
});

const app = express();

app.use(express.static(join(__dirname, "./public")));

app.listen(PORT, () => {
	logger.info(`Server running at http://localhost:${PORT}`);
});

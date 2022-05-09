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
	socket.on("message", data => {
		const parsed = JSON.parse(data.toString());
		switch (parsed.type) {
			case "room:create-and-join":
				const room = ws.buildRoom({ guests: [ws.guestlist[0]] });
				ws.broadcaster
					.to(ws.guestlist[0])
					.send({ type: "room:enter", payload: { room } });
				break;
		}
	});
});

const app = express();

app.use(express.static(join(__dirname, "./public")));

app.listen(PORT, () => {
	logger.info(`Server running at http://localhost:${PORT}`);
});

import { WebSocket } from "ws";

export class Guest {
	public constructor(
		public readonly id: string,
		public readonly websocket: WebSocket
	) {}
}

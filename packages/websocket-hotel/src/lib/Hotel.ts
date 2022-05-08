import { ServerOptions, WebSocket, WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";
import { Guest } from "./Guest";
import { Room, RoomOptions } from "./Room";
import { Broadcaster } from "./Broadcaster";

export class Hotel extends WebSocketServer {
	public guestlist: Guest[] = [];
	public rooms: Room[] = [];
	public broadcaster = new Broadcaster();

	public constructor(serverOptions?: ServerOptions) {
		super(serverOptions);
		this.on("connection", socket => {
			const guest = this.checkIn(socket);
			socket.on("close", () => {
				this.checkOut(guest);
			});
		});
	}

	public evacuate() {
		this.guestlist.splice(0);
	}

	public checkIn(socket: WebSocket) {
		if (this.guestlist.some(guest => guest.websocket === socket)) {
			throw new Error("Guest is already checked in.");
		}
		const uuid = uuidv4();
		const guest = new Guest(uuid, socket);
		this.guestlist.push(guest);
		return guest;
	}

	public checkOut(guest: Guest) {
		const indexOfGuest = this.guestlist.indexOf(guest);
		if (indexOfGuest === -1) {
			throw new Error("Guest is not checked in.");
		}
		this.guestlist.splice(indexOfGuest, 1);
	}

	public buildRoom(roomOptions?: RoomOptions) {
		const room = new Room(roomOptions);
		this.rooms.push(room);
		return room;
	}
}

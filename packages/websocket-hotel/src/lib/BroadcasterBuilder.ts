import { Guest } from "./Guest";
import { Room } from "./Room";

export class BroadcasterBuilder {
	private guests: Guest[] = [];

	public constructor(...guestsOrRooms: (Guest | Room)[]) {
		guestsOrRooms.forEach(guestOrRoom => {
			if ("guests" in guestOrRoom) {
				this.guests.push(...guestOrRoom.guests);
			} else {
				this.guests.push(guestOrRoom);
			}
		});
	}

	private exceptGuest(guest: Guest) {
		this.guests = this.guests.filter(element => element.id !== guest.id);
	}

	private exceptRoom(room: Room) {
		room.guests.forEach(guest => {
			this.exceptGuest(guest);
		});
	}

	public except(guestOrRoom: Guest | Room) {
		if ("guests" in guestOrRoom) {
			this.exceptRoom(guestOrRoom);
		} else {
			this.exceptGuest(guestOrRoom);
		}
		return this;
	}

	public send(data: any) {
		this.guests.forEach(guest => {
			guest.websocket.send(data);
		});
	}
}

import { BroadcasterBuilder } from "./BroadcasterBuilder";
import { Guest } from "./Guest";
import { Room } from "./Room";

export class Broadcaster {
	public to(...guestsOrRooms: (Guest | Room)[]) {
		return new BroadcasterBuilder(...guestsOrRooms);
	}
}

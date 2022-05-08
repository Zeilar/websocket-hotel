import { v4 as uuidv4 } from "uuid";
import { Guest } from "./Guest";

export interface RoomOptions {
	maxSize?: number;
	guests?: Guest[];
	codeLock?: number | null;
}

export class Room {
	public static DEFAULT_MAX_SIZE = 10;

	public readonly maxSize: number;
	public guests: Guest[];
	public codeLock: number | null;
	public readonly id: string;

	public constructor(roomOptions?: RoomOptions) {
		this.id = uuidv4();
		this.maxSize = roomOptions?.maxSize ?? Room.DEFAULT_MAX_SIZE;
		this.guests = roomOptions?.guests ?? [];
		this.codeLock = roomOptions?.codeLock ?? null;
	}

	public changeCodeLock(sequence: number) {
		this.codeLock = sequence;
	}

	public removeCodeLock() {
		this.codeLock = null;
	}

	public isGuestInside(guest: Guest) {
		return this.guests.some(element => element.id === guest.id);
	}

	private assertGuestIsNotInside(guest: Guest) {
		if (this.isGuestInside(guest)) {
			throw new Error("Guest is already inside this room.");
		}
	}

	public hasCodeLock() {
		return this.codeLock !== null;
	}

	private authorizeGuest(codeLockSequence?: number) {
		if (!this.hasCodeLock()) {
			return true;
		}
		return codeLockSequence === this.codeLock;
	}

	public attemptToLetGuestInside(guest: Guest, codeLockSequence?: number) {
		this.assertGuestIsNotInside(guest);
		if (this.authorizeGuest(codeLockSequence)) {
			this.guests.push(guest);
		} else {
			throw new Error("Unauthorized to enter room.");
		}
	}

	public kickGuest(guest: Guest) {
		this.guests = this.guests.filter(element => element.id !== guest.id);
	}
}

const websocket = new WebSocket(
	`ws://localhost:${parseInt(location.port) + 1}`
);

websocket.addEventListener("open", () => {
	document.getElementById("createRoom").addEventListener("click", () => {
		websocket.send(JSON.stringify({ type: "room:create-and-join" }));
	});
	websocket.addEventListener("message", async event => {
		const data = JSON.parse(await event.data.text());
		if (!data?.type) {
			return;
		}
		switch (data.type) {
			case "room:enter":
				document.getElementById(
					"roomName"
				).innerHTML = `Room: ${data.payload.room.id}`;
				document
					.getElementById("roomGuests")
					.append(
						(document.createElement("li").textContent =
							data.payload.room.guests[0].id)
					);
				break;
		}
	});
});

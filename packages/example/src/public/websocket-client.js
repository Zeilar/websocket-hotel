const websocket = new WebSocket(
	`ws://localhost:${parseInt(location.port) + 1}`
);

websocket.addEventListener("open", e => {
	document.getElementById("sayhi").addEventListener("click", () => {
		websocket.send("Hello from client!");
	});
	websocket.addEventListener("message", data => {
		console.log("MESSAGE", data);
	});
});

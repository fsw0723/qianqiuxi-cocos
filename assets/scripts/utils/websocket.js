const remoteUrl = require('../Constants').remoteUrl;

module.exports.initializeWs = function() {
	console.log('WebSocket...', new Date())

	let ws = new WebSocket(`wss://${remoteUrl}`);

	ws.onerror = function (event) {
	    console.log("Send Text fired an error");
	};

	return ws;
}
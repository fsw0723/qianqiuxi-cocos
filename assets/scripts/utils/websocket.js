const remoteUrl = require('../Constants').remoteUrl;

let ws;
const initializeWs = function() {
	console.log('WebSocket...', new Date())
	if(ws) {
		return ws;
	}
	ws = new WebSocket(`ws://${remoteUrl}`);

	ws.onerror = function (event) {
	    console.log("Send Text fired an error");
	};
	ws.onclose = function (event) {
	    console.log("WebSocket instance closed.", new Date());
	};

	return ws;
}

initializeWs();

module.exports = ws;
let ws;

const initializeWs = function() {
	console.log('WebSocket...')
	if(ws) {
		return ws;
	}
	ws = new WebSocket("wss://qian-qiu-xi.herokuapp.com");
	ws.onmessage = function (event) {
	    console.log("response text msg: " + event.data);
	};
	ws.onerror = function (event) {
	    console.log("Send Text fired an error");
	};
	ws.onclose = function (event) {
	    console.log("WebSocket instance closed.");
	};

	return ws;
}

initializeWs();

export default ws;
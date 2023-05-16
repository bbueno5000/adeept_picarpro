"use strict";

/**
 * 
 * @param {any} b
 * @returns
 */
function buttonPressed(b) {

    if (typeof b === "object") {
        return b.pressed;
    }
    return b === 1.0;
}

/**
 * 
 * @returns
 */
function sendMoves() {

    setInterval(function () {
        const gamepads = navigator.getGamepads();
        if (!gamepads) {
            return;
        }
        const gamepad = gamepads[0];
        let command;
        if (buttonPressed(gamepad.buttons[0])) {
            console.log("up");
            command = "Switch_3_on";
        }
//    websocket.send(JSON.stringify(command));
    }, 100);
}

/**
 * 
 */
function start() {

//    var t = "ws://" + location.hostname + ":8888/echo";
//    const websocket = new WebSocket(t);
//    websocket.onopen = () => websocket.send("admin:123456");
    window.addEventListener("gamepadconnected", (e) => {
        console.log(
            "Gamepad connected at index %d: %s",
            e.gamepad.index, e.gamepad.id
        );
    });
    sendMoves();
}

window.onload = start;

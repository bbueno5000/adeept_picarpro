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
 * @param {any} websocket
 */
function sendMoves(websocket) {

    setInterval(function () {
        const gamepads = navigator.getGamepads();
        if (!gamepads) {
            return;
        }
        const gamepad = gamepads[0];
        let command;
        if (gamepad.axes[0] < -0.5) {
            console.log("1");
            command = "left";
        }
        if (gamepad.axes[0] > 0.5) {
            console.log("1");
            command = "right";
        }
        if (gamepad.axes[1] < -0.5) {
            console.log("1");
            command = "forward";
        }
        if (gamepad.axes[1] > 0.5) {
            console.log("1");
            command = "backward";
        }
        if (buttonPressed(gamepad.buttons[0])) {
            console.log("A");
            command = "Switch_2_on";
        }
        if (buttonPressed(gamepad.buttons[1])) {
            console.log("B");
            command = "Switch_2_off";
        }
        if (buttonPressed(gamepad.buttons[2])) {
            console.log("X");
            command = "Switch_3_on";
        }
        if (buttonPressed(gamepad.buttons[3])) {
            console.log("Y");
            command = "Switch_3_off";
        }
        websocket.send(JSON.stringify(command));
    }, 100);
}

/**
 * 
 */
function start() {

    var t = "ws://" + location.hostname + ":8888/echo";
    const websocket = new WebSocket(t);
    websocket.onopen = () => websocket.send("admin:123456");
    window.addEventListener("gamepadconnected", (e) => {
        console.log(
            "Gamepad connected at index %d: %s",
            e.gamepad.index, e.gamepad.id
        );
    });
    sendMoves(websocket);
}

window.onload = start;

'use strict';

import { Map } from "./system/map-camera/Map.js"
import { GameDisplayer } from "./system/GameDisplayer.js"
import { Player } from "./system/map-camera/Player.js"
import { KeyManager } from "./system/KeyMan.js"
import { Debug } from "./debug.js"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Main {

    // System
    gameDisplayer;

    // fields
    map = new Map();
    keyManager = new KeyManager();
    debug = new Debug(this.keyManager);
    camera = new Player(0, 0, this.keyManager, this.debug, this.map);

    constructor() {
        this.gameDisplayer = new GameDisplayer(this, this.map, this.camera, this.debug);
    }

    async startGame() {
        //this.autoDebug()
        while (true) {
            this.updateGame();
            this.gameDisplayer.drawGameFrame();
            await sleep(1000/60);
        }
    } 

    updateGame() {

        // Update variables
        this.camera.update();
        this.debug.update();
        

        // Update input
        this.keyManager.update();
    }

    autoDebug() {
        this.debug.debugMode = true
        this.debug.bean = false
        this.debug.noClip = true
    }

}

var game = new Main();
game.startGame();
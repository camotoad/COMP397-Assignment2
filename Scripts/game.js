"use strict";
//IIFE - Immediately Invoked Function Expression
//means -> self-executing anonymous function
var Game = (function () {
    // variable declarations
    var canvas = document.getElementsByTagName('canvas')[0];
    var stage;
    var currentSceneState;
    var currentScene;
    var assets;
    var textureAtlas;
    var spaceAtlas;
    var assetManifest = [
        { id: "space", src: "./Assets/images/space.gif" },
        { id: "atlas", src: "./Assets/sprites/atlas2.png" },
        { id: "pew", src: "./Assets/audio/pew.mp3" },
        { id: "oof", src: "./Assets/audio/oof.mp3" },
        { id: "lightning", src: "./Assets/audio/lightning.mp3" },
        { id: "boom", src: "./Assets/audio/boom.mp3" },
    ];
    var spriteData = {
        "images": {},
        "frames": [
            [1, 1, 5, 16, 0, 0, 0],
            [8, 1, 21, 20, 0, 0, 0],
            [31, 1, 150, 50, 0, 0, 0],
            [183, 1, 57, 52, 0, 0, 0],
            [1, 53, 150, 50, 0, 0, 0],
            [153, 55, 95, 61, 0, 0, 0],
            [1, 105, 150, 50, 0, 0, 0],
            [153, 118, 65, 65, 0, 0, 0],
            [1, 157, 150, 50, 0, 0, 0]
        ],
        "animations": {
            "laser": { "frames": [0] },
            "ball1": { "frames": [1] },
            "backButton2": { "frames": [2] },
            "ship": { "frames": [3] },
            "instructionsButton": { "frames": [4] },
            "enemy": { "frames": [5] },
            "restartButton2": { "frames": [6] },
            "placeholder": { "frames": [7] },
            "startButton2": { "frames": [8] }
        }
    };
    var spaceData = {
        "images": {},
        "frames": [
            [0, 0, 640, 1440, 0, 0, 0],
        ],
        "animations": {
            "space": { "frames": [0] },
        }
    };
    function Preload() {
        assets = new createjs.LoadQueue(); // asset container
        config.Game.ASSETS = assets; // make a reference to the assets in the global config
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }
    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start() {
        console.log("%c Game Started!", "color: blue; font-size: 20px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        spriteData.images = [assets.getResult("atlas")];
        textureAtlas = new createjs.SpriteSheet(spriteData);
        config.Game.TEXTURE_ATLAS = textureAtlas;
        spaceData.images = [assets.getResult("space")];
        spaceAtlas = new createjs.SpriteSheet(spaceData);
        config.Game.OCEAN_ATLAS = spaceAtlas;
        currentSceneState = scenes.State.NO_SCENE;
        config.Game.SCENE = scenes.State.START;
    }
    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn
     */
    function Update() {
        if (currentSceneState != config.Game.SCENE) {
            Main();
        }
        currentScene.Update();
        stage.update();
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log("%c Scene Switched...", "color: green; font-size: 16px;");
        // clean up
        if (currentSceneState != scenes.State.NO_SCENE) {
            currentScene.Clean();
            stage.removeAllChildren();
        }
        // switch to the new scene
        switch (config.Game.SCENE) {
            case scenes.State.START:
                console.log("switch to Start Scene");
                currentScene = new scenes.Start();
                break;
            case scenes.State.INSTRUCTIONS:
                console.log("switch to Instruction Scene");
                currentScene = new scenes.Instructions();
                break;
            case scenes.State.PLAY:
                console.log("switch to Play Scene");
                currentScene = new scenes.Play();
                break;
            case scenes.State.END:
                console.log("switch to End Scene");
                currentScene = new scenes.End();
                break;
        }
        currentSceneState = config.Game.SCENE;
        stage.addChild(currentScene);
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map
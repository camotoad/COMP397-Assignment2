"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var Instructions = /** @class */ (function (_super) {
        __extends(Instructions, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Instructions() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        // Initializing and Instantiating
        Instructions.prototype.Start = function () {
            //instantiate a new Text object
            this._instructionLabel = new objects.Label("Use WASD or arrow keys to move, space bar to shoot\n\n\n\nGoal of the game is to earn as much points as possible\n\n-> You gain 10 points every second you are alive. \n\n-> 200 points for every shot landed on the enemy\n\n\n\nWatchout for enemy attacks!", "20px", "Consolas", "#000000", 320, 180, true);
            this._gameName = new objects.Label("Space Shooter", "60px", "Arial", "#000000", 320, 100, true);
            // buttons
            this._backButton = new objects.Button("button", 320, 430, true);
            this.Main();
        };
        Instructions.prototype.Update = function () {
        };
        Instructions.prototype.Main = function () {
            this.addChild(this._instructionLabel);
            this.addChild(this._gameName);
            this.addChild(this._backButton);
            this._backButton.on("click", function () {
                config.Game.SCENE = scenes.State.START;
            });
        };
        Instructions.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Instructions;
    }(objects.Scene));
    scenes.Instructions = Instructions;
})(scenes || (scenes = {}));
//# sourceMappingURL=Instructions.js.map
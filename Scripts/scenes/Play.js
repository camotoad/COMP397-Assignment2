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
    var Play = /** @class */ (function (_super) {
        __extends(Play, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Play() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        // PUBLIC METHODS
        //initialize and instatiate
        Play.prototype.Start = function () {
            this._background = new objects.Ocean();
            this._player = new objects.Plane();
            this._enemy = new objects.Enemy();
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;
            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;
            this._enemyBulletManager = new managers.EnemyBullet();
            config.Game.ENEMY_BULLET = this._enemyBulletManager;
            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;
            this.Main();
        };
        Play.prototype.Update = function () {
            this._background.Update();
            this._player.Update();
            this._enemy.Update();
            this._enemyBulletManager.Update();
            this._bulletManager.Update();
            managers.Collision.AABBCheck(this._player, this._enemyBulletManager.GetBullet());
            if (managers.Collision.AABBCheck(this._bulletManager.GetBullet(), this._enemy)) {
                console.log("Collision with enemy!");
                var boomSound = createjs.Sound.play("boom");
                boomSound.volume = 0.1;
                this._bulletManager.collisionReset(); //reset bullet when hit so the bullet does not rack up multiple points
                config.Game.SCORE_BOARD.Score += 200;
                if (config.Game.SCORE > config.Game.HIGH_SCORE) {
                    config.Game.HIGH_SCORE = config.Game.SCORE;
                }
            }
        };
        Play.prototype.Main = function () {
            var _this = this;
            this.addChild(this._background);
            this.addChild(this._player);
            this.addChild(this._enemy);
            this._bulletManager.AddBulletsToScene(this);
            this._enemyBulletManager.AddBulletsToScene(this);
            this.addChild(this._scoreBoard.LivesLabel);
            this.addChild(this._scoreBoard.ScoreLabel);
            var count = 10;
            var minspeed = 20;
            var interval = window.setInterval(function () {
                _this.Update();
                config.Game.SCORE_BOARD.Score += 10; // each second the player gains 10 points
                count++;
                _this._enemy.setHorizontalSpeed(util.Mathf.RandomRange(count, count + 20)); // enemy moves more pixels
                //console.log(count); // debugging/testing
                if (count != 10 && count % 10 == 0 && minspeed > 1) //difficulty spikes more every 10 seconds
                 {
                    _this._enemy.setTickSpeed(minspeed - 1);
                }
                //window.clearInterval(interval); //end
            }, 1000);
        };
        Play.prototype.Clean = function () {
            this.removeAllChildren();
        };
        return Play;
    }(objects.Scene));
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=Play.js.map
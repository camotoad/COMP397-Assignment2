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
var objects;
(function (objects) {
    var Plane = /** @class */ (function (_super) {
        __extends(Plane, _super);
        // CONSTRUCTOR
        function Plane() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "ship", 0, 0, true) || this;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Plane.prototype, "backSound", {
            // PUBLIC PROPERTIES
            get: function () {
                return this._backMusic;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Plane.prototype._checkBounds = function () {
            // left boundary
            if (this.position.x <= this.halfWidth) {
                this.position = new objects.Vector2(this.halfWidth, this.position.y);
            }
            // right boundary
            if (this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth) {
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }
            //top boundary
            if (this.position.y <= config.Game.SCREEN_HEIGHT / 2) {
                this.position = new objects.Vector2(this.position.x, (config.Game.SCREEN_HEIGHT / 2));
            }
            //bottom
            if (this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight) {
                this.position = new objects.Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
        };
        Plane.prototype._move = function () {
            //let newPositionX = util.Mathf.Lerp(this.position.x, this.stage.mouseX, 0.05);
            if ((config.Game.KEYBOARD_MANAGER.MoveLeft) || (config.Game.KEYBOARD_MANAGER.MoveRight)) {
                var newPositionX = (config.Game.KEYBOARD_MANAGER.MoveRight) ?
                    this.position.x + this._horizontalSpeed : this.position.x - this._horizontalSpeed;
                // TODO: make movement smoother with a velocity function
                this.position = new objects.Vector2(newPositionX, this.position.y);
            }
            if ((config.Game.KEYBOARD_MANAGER.MoveUp || (config.Game.KEYBOARD_MANAGER.MoveDown))) {
                var newPositionY = (config.Game.KEYBOARD_MANAGER.MoveDown) ?
                    this.position.y + this._horizontalSpeed : this.position.y - this._horizontalSpeed;
                // TODO: make movement smoother with a velocity function
                this.position = new objects.Vector2(this.position.x, newPositionY);
            }
            this._bulletSpawn = new objects.Vector2(this.position.x, this.position.y - this.halfHeight);
        };
        // PUBLIC METHODS
        Plane.prototype.Start = function () {
            this.type = enums.GameObjectType.PLANE;
            this._verticalPosition = 430; // locked to the bottom of the screen
            this._backMusic = createjs.Sound.play("background");
            this._backMusic.loop = -1; // loop forever
            this._backMusic.volume = 0.1; // 10% volume
            this._horizontalSpeed = 7;
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 0.5, this._verticalPosition);
        };
        Plane.prototype.Update = function () {
            this._move();
            this._checkBounds();
            // fire bullets every 10 frames
            if (createjs.Ticker.getTicks() % 10 == 0) {
                if (config.Game.KEYBOARD_MANAGER.Fire) {
                    this.FireBullets();
                }
            }
        };
        Plane.prototype.Reset = function () {
        };
        Plane.prototype.FireBullets = function () {
            var bullet = config.Game.BULLET_MANAGER.GetBullet();
            if (bullet.position.y < 0) // 1 bullet at a time
             {
                bullet.position = this._bulletSpawn;
                var pewSound = createjs.Sound.play("pew");
                pewSound.volume = 0.1;
            }
        };
        return Plane;
    }(objects.GameObject));
    objects.Plane = Plane;
})(objects || (objects = {}));
//# sourceMappingURL=Plane.js.map
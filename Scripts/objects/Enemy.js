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
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function Enemy() {
            var _this = _super.call(this, config.Game.TEXTURE_ATLAS, "enemy", 0, 0, true) || this;
            _this.Start();
            return _this;
        }
        // PRIVATE METHODS
        Enemy.prototype._checkBounds = function () {
            // left boundary
            if (this.position.x <= this.halfWidth) {
                this.position = new objects.Vector2(this.halfWidth, this.position.y);
            }
            // right boundary
            if (this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth) {
                this.position = new objects.Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }
        };
        Enemy.prototype._move = function () {
            //let newPositionX = util.Mathf.RandomRange( this.halfWidth, config.Game.SCREEN_WIDTH - this.halfWidth );
            var newPositionX = util.Mathf.RandomRange(0, 640);
            if (newPositionX > this.position.x) {
                this.position = new objects.Vector2(this.position.x += this._horizontalSpeed, this._verticalPosition);
            }
            else {
                this.position = new objects.Vector2(this.position.x -= this._horizontalSpeed, this._verticalPosition);
            }
            this._bulletSpawn = new objects.Vector2(this.position.x, this.position.y + this.halfHeight);
        };
        // PUBLIC METHODS
        Enemy.prototype.Start = function () {
            this.type = enums.GameObjectType.PLANE;
            this._verticalPosition = 30;
            this._horizontalSpeed = 10;
            this._tickSpeed = 20;
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 0.5, this._verticalPosition);
        };
        Enemy.prototype.Update = function () {
            //this._move();
            if (createjs.Ticker.getTicks() % this._tickSpeed == 0) {
                var rand = Math.floor(util.Mathf.RandomRange(1, this._tickSpeed)); // randomly fire
                this._move();
                //console.log(this._tickSpeed);
                if (rand < 10) {
                    this.FireBullets();
                }
            }
            this._checkBounds();
        };
        Enemy.prototype.Reset = function () {
        };
        Enemy.prototype.FireBullets = function () {
            var bullet = config.Game.ENEMY_BULLET.GetBullet();
            bullet.velocity.y = util.Mathf.RandomRange(5, 10);
            bullet.position = this._bulletSpawn;
            if (config.Game.SCENE != scenes.State.END) {
                var lightningSound = createjs.Sound.play("lightning");
                lightningSound.volume = 0.1;
            }
        };
        Enemy.prototype.setTickSpeed = function (newSpeed) {
            this._tickSpeed = newSpeed;
        };
        Enemy.prototype.setHorizontalSpeed = function (newSpeed) {
            this._horizontalSpeed = newSpeed;
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=Enemy.js.map
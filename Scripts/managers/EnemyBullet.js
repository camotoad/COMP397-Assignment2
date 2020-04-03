"use strict";
var managers;
(function (managers) {
    var EnemyBullet = /** @class */ (function () {
        // PUBLIC PROPERTIES
        // CONSTRUCTOR
        function EnemyBullet() {
            this._buildBulletPool();
        }
        // PRIVATE METHODS
        EnemyBullet.prototype._buildBulletPool = function () {
            // initialize bullet number
            this._bulletNumber = 15;
            // create an empty container
            this._bulletPool = new Array();
            for (var count = 0; count < this._bulletNumber; count++) {
                var bullet = new objects.Bullet();
                this._bulletPool.push(bullet);
            }
        };
        // PUBLIC METHODS
        EnemyBullet.prototype.AddBulletsToScene = function (scene) {
            this._bulletPool.forEach(function (bullet) {
                scene.addChild(bullet);
            });
        };
        EnemyBullet.prototype.GetBullet = function () {
            // remove the bullet from the front of the pool
            var bullet = this._bulletPool.shift();
            bullet.isActive = true;
            // push the bullet to the back of the pool
            this._bulletPool.push(bullet);
            // return a reference to the active bullet
            return bullet;
        };
        EnemyBullet.prototype.collisionReset = function () {
            this._bulletPool.forEach(function (bullet) {
                bullet.Reset();
            });
        };
        EnemyBullet.prototype.Update = function () {
            this._bulletPool.forEach(function (bullet) {
                bullet.Update();
            });
        };
        return EnemyBullet;
    }());
    managers.EnemyBullet = EnemyBullet;
})(managers || (managers = {}));
//# sourceMappingURL=EnemyBullet.js.map
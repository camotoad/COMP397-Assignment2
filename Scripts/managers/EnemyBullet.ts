module managers
{
    export class EnemyBullet 
    {
        // PRIVATE INSTANCE MEMBERS
        private _bulletNumber: number;
        private _bulletPool: Array<objects.EnemyBullet>;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {

            this._buildBulletPool();
        }

        // PRIVATE METHODS
        private _buildBulletPool():void
        {
            // initialize bullet number
            this._bulletNumber = 15;

            // create an empty container
            this._bulletPool = new Array<objects.EnemyBullet>();

            for (let count = 0; count < this._bulletNumber; count++) {
                let bullet = new objects.EnemyBullet();
                this._bulletPool.push(bullet);
            }
        }

        // PUBLIC METHODS

        public AddBulletsToScene(scene:objects.Scene)
        {
            this._bulletPool.forEach(bullet => {
                scene.addChild(bullet);
            });
        }

        


        public GetBullet():objects.EnemyBullet
        {
            // remove the bullet from the front of the pool
            let bullet = this._bulletPool.shift();

            bullet.isActive = true;

            // push the bullet to the back of the pool
            this._bulletPool.push(bullet);

            // return a reference to the active bullet
            return bullet;
        }

        public collisionReset() :void
        {
            this._bulletPool.forEach(bullet => {
                bullet.Reset();
            });
        }

        public Update()
        {
            this._bulletPool.forEach(bullet => {
                bullet.Update();
            });
        }
    }
}
module objects
{
    export class Enemy extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalPosition:number;
       
        private _bulletSpawn: objects.Vector2;
        private _horizontalSpeed: number;
        private _tickSpeed: number;
        
        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "placeholder", 0, 0, true);

            this.Start();
        }

        // PRIVATE METHODS
        protected _checkBounds(): void 
        {
            // left boundary
            if(this.position.x <= this.halfWidth)
            {
                this.position = new Vector2(this.halfWidth, this.position.y);
            }

            // right boundary

            if(this.position.x >= config.Game.SCREEN_WIDTH - this.halfWidth)
            {
                this.position = new Vector2(config.Game.SCREEN_WIDTH - this.halfWidth, this.position.y);
            }
        }     

        private _move(): void
        {

                //let newPositionX = util.Mathf.RandomRange( this.halfWidth, config.Game.SCREEN_WIDTH - this.halfWidth );
                let newPositionX = util.Mathf.RandomRange( 0, 640 );

                if (newPositionX > this.position.x)
                {
                    this.position = new Vector2(this.position.x += this._horizontalSpeed, this._verticalPosition)
                }
                else{
                    this.position = new Vector2(this.position.x -= this._horizontalSpeed, this._verticalPosition)
                }

                
                this._bulletSpawn = new Vector2(this.position.x, this.position.y + this.halfHeight);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.PLANE;
            this._verticalPosition = 30;
            this._horizontalSpeed = 10;
            this._tickSpeed = 20;
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 0.5, this._verticalPosition);
        }

        public Update(): void 
        {
            //this._move();

            if(createjs.Ticker.getTicks() % this._tickSpeed == 0)
            {
                let rand = Math.floor(util.Mathf.RandomRange(1,this._tickSpeed)); // randomly fire
                this._move();
                //console.log(this._tickSpeed);
                if (rand < 10)
                {
                    
                    this.FireBullets();
                }
            }
            
            this._checkBounds();
      
        }

        public Reset(): void 
        {

        }

        public FireBullets(): void
        {
            let bullet = config.Game.ENEMY_BULLET.GetBullet();
            bullet.velocity.y = util.Mathf.RandomRange(5,10);
            bullet.position = this._bulletSpawn;           
            let lightningSound = createjs.Sound.play("lightning");
            lightningSound.volume = 0.1;
                      
        }

        public setTickSpeed(newSpeed : number): void{
            this._tickSpeed = newSpeed;
        }

        public setHorizontalSpeed(newSpeed:number):void{
            this._horizontalSpeed = newSpeed;
        }

        

        
    }

}

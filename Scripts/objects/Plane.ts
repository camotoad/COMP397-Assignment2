module objects
{
    export class Plane extends GameObject
    {
        // PRIVATE INSTANCE MEMBERS
        private _verticalPosition:number;
        private _bulletSpawn: objects.Vector2;
        private _horizontalSpeed: number;
        private _backMusic: createjs.AbstractSoundInstance;
        
        // PUBLIC PROPERTIES
        public get backSound() : createjs.AbstractSoundInstance 
        {
            return this._backMusic;
        }

        // CONSTRUCTOR
        constructor()
        {
            super(config.Game.TEXTURE_ATLAS, "ship", 0, 0, true);

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

            //top boundary
            if(this.position.y <= config.Game.SCREEN_HEIGHT/2)
            {
                this.position = new Vector2(this.position.x, (config.Game.SCREEN_HEIGHT/2));
            }

            //bottom
            if(this.position.y >= config.Game.SCREEN_HEIGHT - this.halfHeight)
            {
                this.position = new Vector2(this.position.x, config.Game.SCREEN_HEIGHT - this.halfHeight);
            }
        }        

        private _move(): void
        {
            //let newPositionX = util.Mathf.Lerp(this.position.x, this.stage.mouseX, 0.05);
            if((config.Game.KEYBOARD_MANAGER.MoveLeft) || (config.Game.KEYBOARD_MANAGER.MoveRight))
            {
                let newPositionX = (config.Game.KEYBOARD_MANAGER.MoveRight) ? 
                this.position.x + this._horizontalSpeed : this.position.x - this._horizontalSpeed;

                // TODO: make movement smoother with a velocity function

                this.position = new Vector2(newPositionX, this.position.y);
            }

            if ((config.Game.KEYBOARD_MANAGER.MoveUp || (config.Game.KEYBOARD_MANAGER.MoveDown)))
            {
                let newPositionY = (config.Game.KEYBOARD_MANAGER.MoveDown) ? 
                this.position.y + this._horizontalSpeed : this.position.y - this._horizontalSpeed;

                // TODO: make movement smoother with a velocity function

                this.position = new Vector2(this.position.x , newPositionY);
            }
            
            this._bulletSpawn = new Vector2(this.position.x, this.position.y - this.halfHeight);
        }
        
        // PUBLIC METHODS
        public Start(): void 
        {
            this.type = enums.GameObjectType.PLANE;
            this._verticalPosition = 430; // locked to the bottom of the screen
            this._backMusic = createjs.Sound.play("background");
            this._backMusic.loop = -1; // loop forever
            this._backMusic.volume = 0.1; // 10% volume
            this._horizontalSpeed = 7;
            this.position = new objects.Vector2(config.Game.SCREEN_WIDTH * 0.5, this._verticalPosition);
        }

        public Update(): void 
        {
            this._move();
            this._checkBounds();

            // fire bullets every 10 frames
            if(createjs.Ticker.getTicks() % 10 == 0)
            {
                if(config.Game.KEYBOARD_MANAGER.Fire)
                {
                    this.FireBullets();
                }
            }
            
        }

        public Reset(): void 
        {

        }

        public FireBullets(): void
        {
            let bullet = config.Game.BULLET_MANAGER.GetBullet();
            if (bullet.position.y < 0) // 1 bullet at a time
            {
                bullet.position = this._bulletSpawn;

                let pewSound = createjs.Sound.play("pew");
                pewSound.volume = 0.1;
               }         
        }

        
    }

}

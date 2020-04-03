module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _background?: objects.Ocean;
        private _player?: objects.Plane;
        private _enemy?: objects.Enemy;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
        private _enemyBulletManager: managers.EnemyBullet;
        private _keyboardManager: managers.Keyboard;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        //initialize and instatiate
        public Start(): void 
        {
            
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
        }        
        
        public Update(): void 
        {
           this._background.Update();

           this._player.Update();

           this._enemy.Update();
           
           

        this._enemyBulletManager.Update();

          this._bulletManager.Update();

            
        managers.Collision.AABBCheck(this._player, this._enemyBulletManager.GetBullet());
            
        if (managers.Collision.AABBCheck(this._bulletManager.GetBullet(), this._enemy))
            {
                console.log("Collision with enemy!");
                let boomSound = createjs.Sound.play("boom");
                boomSound.volume = 0.1;
                this._bulletManager.collisionReset(); //reset bullet when hit so the bullet does not rack up multiple points
                config.Game.SCORE_BOARD.Score += 200;
                if(config.Game.SCORE > config.Game.HIGH_SCORE)
                {
                    config.Game.HIGH_SCORE = config.Game.SCORE;
                }
            }

        


        }
        
        public Main(): void 
        {
            this.addChild(this._background);
            this.addChild(this._player);
            this.addChild(this._enemy);

            this._bulletManager.AddBulletsToScene(this);
            this._enemyBulletManager.AddBulletsToScene(this);

            this.addChild(this._scoreBoard.LivesLabel);

            this.addChild(this._scoreBoard.ScoreLabel);

            let count = 10;
            let minspeed = 20;
            let interval = window.setInterval ( ()=>{
                this.Update();
                config.Game.SCORE_BOARD.Score += 10; // each second the player gains 10 points
                count++;
                this._enemy.setHorizontalSpeed(util.Mathf.RandomRange(count, count+20)); // enemy moves more pixels
                //console.log(count); // debugging/testing
                if (count != 10 && count%10 == 0 && minspeed > 1)//difficulty spikes more every 10 seconds
                {
                    this._enemy.setTickSpeed(minspeed-1);
                }
                //window.clearInterval(interval); //end
            }, 1000);
        }

        public Clean(): void
        {
            this._player.backSound.stop();
            this.removeAllChildren();
        }


    }

        
}
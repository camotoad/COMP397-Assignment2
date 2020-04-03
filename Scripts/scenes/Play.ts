module scenes
{
    export class Play extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _ocean?: objects.Ocean;
        private _plane?: objects.Plane;
        private _enemy?: objects.Enemy;

        private _scoreBoard: managers.ScoreBoard;
        private _bulletManager: managers.Bullet;
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
            
            this._ocean = new objects.Ocean();
            this._plane = new objects.Plane();
            this._enemy = new objects.Enemy();
            
            this._scoreBoard = new managers.ScoreBoard();
            config.Game.SCORE_BOARD = this._scoreBoard;

            this._bulletManager = new managers.Bullet();
            config.Game.BULLET_MANAGER = this._bulletManager;

            this._keyboardManager = new managers.Keyboard();
            config.Game.KEYBOARD_MANAGER = this._keyboardManager;

             this.Main();
        }        
        
        public Update(): void 
        {
           this._ocean.Update();

           this._plane.Update();

           this._enemy.Update();

          this._bulletManager.Update();

        }
        
        public Main(): void 
        {
            this.addChild(this._ocean);
            this.addChild(this._plane);
            this.addChild(this._enemy);

            this._bulletManager.AddBulletsToScene(this);

            this.addChild(this._scoreBoard.LivesLabel);

            this.addChild(this._scoreBoard.ScoreLabel);

            let count = 10;
            let minspeed = 20;
            let interval = window.setInterval ( ()=>{
                config.Game.SCORE_BOARD.Score += 10; // each second the player gains 10 points
                count++;
                this._enemy.setHorizontalSpeed(util.Mathf.RandomRange(count, count+5)); // enemy moves more pixels
                console.log(count); // debugging/testing
                if (count != 10 && count%10 == 0 && minspeed > 1)//difficulty spikes more every 10 seconds
                {
                    this._enemy.setTickSpeed(minspeed-1);
                }
            }, 1000);
        }

        public Clean(): void
        {
            this.removeAllChildren();
        }


    }

        
}
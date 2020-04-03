module scenes
{
    export class Start extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _welcomeLabel: objects.Label;
        private _startButton: objects.Button;
        private _instructionButton: objects.Button;
        private _space: objects.Ocean;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS
        public Start(): void 
        {
             //instantiate a new Text object
            this._welcomeLabel = new objects.Label("Space Shooter", "80px", "Consolas", "#FFFF", 320, 180, true);
            // buttons
            this._startButton = new objects.Button("startButton2", 320, 430, true);

            this._instructionButton = new objects.Button("instructionsButton", 320, 350, true);

             this._space = new objects.Ocean();
            this.Main();
        }        
        
        public Update(): void 
        {
           this._space.Update();
        }
        
        public Main(): void 
        {
            this.addChild(this._space);
       
            this.addChild(this._welcomeLabel);

        
            this.addChild(this._startButton);

            this._startButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.PLAY;
            });

            this.addChild(this._instructionButton);

            this._instructionButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.INSTRUCTIONS;
            });

        }

        public Clean(): void{
            this.removeAllChildren();
        }

        
    }
}
module scenes
{
    export class Instructions extends objects.Scene
    {
        // PRIVATE INSTANCE MEMBERS
        private _instructionLabel: objects.Label;
        private _backButton: objects.Button;

        // PUBLIC PROPERTIES

        // CONSTRUCTOR
        constructor()
        {
            super();

            this.Start();
        }

        // PRIVATE METHODS

        // PUBLIC METHODS

        // Initializing and Instantiating
        public Start(): void 
        {
             //instantiate a new Text object
            this._instructionLabel = new objects.Label("Use WASD or arrow keys to move, space bar to shoot\n\nGoal of the game is to", "20px", "Consolas", "#000000", 320, 180, true);
            // buttons
             this._backButton = new objects.Button("button", 320, 430, true);

             this.Main();
        }        
        
        public Update(): void 
        {
        }
        
        public Main(): void 
        {

            this.addChild(this._instructionLabel);

        
            this.addChild(this._backButton);

            this._backButton.on("click", ()=>{
                config.Game.SCENE = scenes.State.START;
            });

        }

        public Clean(): void{
            this.removeAllChildren();
        }

        
    }
}
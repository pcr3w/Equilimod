// register the mod directly
ModRegistry.registerMod(new Mod({
    // the smart name of the mod
    name : "Equilinox Variations",
    // the version to be displayed
    version : "1.0.0",
    // the author(s) of the mod
    author : "pcr3w",
    // a brief overview of the mod's purpose
    description : "An extremely simple mod to add new music to the game.",
    
    // run when the mod is initiated
    init : function() {
        // we can load the sound file from the `sound` directory in our assets folder
        var aria = SoundRegistry.load("Goldberg Variations - Aria.wav");
        
        // the new music track can then be registered with the game
        SoundRegistry.registerMusic({
            // we need a unique ID to reference this specific track
            id : 988,
            // this name will be shown to the players when they select their music
            name : "J.S. Bach, Goldberg Variations - Aria",
            // the actual Sound object is provided to the registry here
            music : aria,
            // this is optional, stating that the track will not be locked
            locked : false
        });
    }
}));
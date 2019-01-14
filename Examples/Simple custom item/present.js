// register the mod directly
ModRegistry.registerMod(new Mod({
    // the smart name of the mod
    name : "Christmas Presents",
    // the version to be displayed
    version : "1.0.0",
    // the author(s) of the mod
    author : "pcr3w",
    // a brief overview of the mod's purpose
    description : "A festive mod that adds a decorative Christmas present to the world.",
    
    // run when the mod is initiated
    init : function() {
        BlueprintRegistry.registerBlueprint({
            // as with tasks, the ID has to be completely unique so that it won't conflict with any other mods
            id : 2512,
            // this is the name that will be displayed in the shop
            name : "Christmas Present",
             // this will be the description of the item in its information panel
            description : "A beautifully wrapped Christmas present",
            // this classification is used to determine which shop the entity goes in, and can also affect the components that you can have
            // I have chosen to classify the present as a "large rock"
            classification : "erl",
            // the present will only cost 10DP to purchase
            cost : 10,
            
            // this is very important as it tells Equilinox which model to use, and how to display it
            model : {
                // we only need to give the OBJ file; Equilimod will automatically load any required MTL files
                // as the present cannot grow, there is only one model
            	files : ["present.obj"],
                // the model should have a 1:1 scale in game (the same sizes as in the model file)
                size : 1
            },
            
            // for this basic entity we don't want to add any special components (which add new behaviours, etc)
            components : []
        });
    }
}));
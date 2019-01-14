// register the mod directly
ModRegistry.registerMod(new Mod({
    // the smart name of the mod
    name : "Custom task",
    // the version to be displayed
    version : "1.0.0",
    // the author(s) of the mod
    author : "pcr3w",
    // a brief overview of the mod's purpose
    description : "An extremely basic mod to demonstrate registering custom tasks with Equilinox.",
    
    // run when the mod is initiated
    init : function() {
        // actually registering the task is very simple
        TaskRegistry.registerTask({
             // we need a unique ID for the task - I'd recommend starting the ID with a number unique to your mod (666_)
            id : 6661,
            // you need to add a name so that people can recognise the task
        	name : "Grass can be happy too",
            // a nice description can help to clarify the task
        	description : "Have five happy grass tufts growing in the world.",
            // we don't want people to repeatedly complete this task
        	repeatable : false,
        	
            // as many requirements as you want can be added
        	requirements : [
                // we just want grass to be happy
        		new HappyEntityRequirement({
                    // classification codes can target specific species (such as this), or more general categories
        			classification : "png20",
                    // the number of happy grass tufts :P
        			count : 5,
                     // how happy the grass has to be with its environment (50%)
        			environmentFactor : 50,
                    // whether the grass has to be fully grown
        			fullyGrown : true
        		})
        	],
        	
            // you can also add as many rewards as you like
        	rewards : [
                // give the player 250DP
        		new CashReward(250),
                // give the player the poppy in the shop (it has an ID of 116)
        		new ShopItemReward(116),
                // this is added as a reward for the first task
                new TaskUnlockReward([6662])
        	]
        });
        
        // we can register another task that is linked to the first
        TaskRegistry.registerTask({
            // a new ID has to be used
            id : 6662,
        	name : "Joyous poppies",
        	description : "Have five happy poppies growing in the world.",
        	repeatable : false,
        	
        	requirements : [
        		new HappyEntityRequirement({
        			classification : "pnf116",
        			count : 5,
        			environmentFactor : 50,
        			fullyGrown : true
        		})
        	],
        	
        	rewards : [
        		new CashReward(1000)
        	]
        });
    }
}));
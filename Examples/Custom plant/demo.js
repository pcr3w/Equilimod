// register the mod directly
ModRegistry.registerMod(new Mod({
    // the smart name of the mod
    name : "New Grass",
    // the version to be displayed
    version : "1.0.0-beta",
    // the author(s) of the mod
    author : "pcr3w",
    // a brief overview of the mod's purpose
    description : "A basic Equilinox mod to add some new grass to the game.",
    
    // run when the mod is initiated
    init : function() {
        BlueprintRegistry.registerBlueprint({
            // once again, the ID is unique
            id : 6455,
            // a very boring name, I know
            name : "Red Grass",
            // I'd recommend that actual descriptions are more informative than this
            description : "A brand new type of grass that is bright red!",
            // I would like this entity to be classed as a type of grass
            classification : "png",
            // we'll undercut the normal grass
            cost : 50,
            // this allows us to have the grass produce around 30DP in-game
            dpRate : 30,
            
            // our model data will be very similar to last time
            model : {
                // I've loaded up all of the models for the different growth stages of the grass
                // the order specified here is used for the actual growth order later on
            	files : ["New Grass 0.obj", "New Grass 1.obj", "New Grass 2.obj", "New Grass 3.obj"],
                // the models should have a 1:1 scale in game again
                size : 1
            },
            
            // these are the vital components that add behaviour
            components : [
                new LifeComponent({
                    // the average population size
            		averagePopulation : 4.4,
                    // the average life length (in-game hours)
            		averageLifeLength : 50,
                    // the number of health points for defending against attacks
            		defencePoints : 100,
                    // this entity is a plant, so it is not classified as an animal :P
                    isAnimal : false,
            		
                    // the death type of the entity
                    // this will fade out the entity
            		death : new FadeDeath(5),
            		
                    // the breeding properties of the entity
            		breeding : {
                        // the plant will be ready for breeding after 15 hours
            			maturityAge : 15,
                        // the plant has to wait around 1 hour between each breed
            			averageBreedTime : 1
            		}
            	}),
                
                // this important component allows the plant to appear to grow
                // more information can be found under the "Simple Components" section of the wiki
                new GrowthComponent({
                    // the plant is static, so we would like a more "blocky" animation
            		dynamic : false,
                    // the plant should take about 5 hours to grow
            		time : 5,
                    // there are four growth stages, as we have four models
            		stages : 4,
                    // each growth stage has one "blocky" sub-stage
                    subStages : 1
            	}),
                
                // this small component allows the entity to spread a biome
                // more information can be found under the "Simple Components" section of the wiki
                new SpreaderComponent({
                    // the grass will spread the grassland biome
                    biome : BiomeCodes.GRASSLAND,
                    // the spreading strength is very strong
                    strength : 40,
                    // the biome will be spread within a radius of 10 from the plant
                    range : 10
                })
            ]
        });
    }
}));
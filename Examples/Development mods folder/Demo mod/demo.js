// register the mod directly
ModRegistry.registerMod(new Mod({
    // the smart name of the mod
    name : "Demo mod",
    // the version to be displayed
    version : "1.0.0-beta",
    // the author(s) of the mod
    author : "pcr3w",
    // a brief overview of the mod's purpose
    description : "A basic Equilinox mod for demonstration purposes. This should be on a new line so that it fits.",
    
    // run when the mod is initiated - 
    init : function() {
        // load a texture from the mod's assets folder
        var smiley = TextureRegistry.load("smiley.png", {
            // turns off filtering
    		noFiltering : true,
            // clamps the edges of the texture
    		clampEdges : true
            
            // uses nearest neighbour filtering for loading the texture 
            // nearestFiltering : true
            
            // disables mip-mapping
            // noMipMap : true
    	});
        
        // load the slime particle texture with the default settings (just clamp edges)
        var rawSlimeParticle = TextureRegistry.load("slime.png");
        // create a particle texture for the slime texure, with additive blending and 4 rows
        var slimeAtlas = new ParticleTexture(rawSlimeParticle, 4, true);
        // the particle system for the slime effect
        var slimeSystem = new ParticleSystem({
        	texture : slimeAtlas,
        	rate : 10,
        	speed : 0.05,
        	gravity : -0.05,
        	life : 10,
        	scale : 0.1,
        	
        	//spawn : new PointSpawn()
        	spawn : new CircleSpawn({
        		heading : new Vector3f(1, 1, 1),
        		radius : 10
        	})
        });
        
        BiomeRegistry.registerBiome({
        	id : "GOO",
        	name : "Goo",
        	colour : new Colour(0.71, 0.16, 1),
        	particleSystem : slimeSystem
        });
        
        // load a sound from the mod's assets folder
    	var rooster = SoundRegistry.load("chicken.wav");
    	
        // register a new slime blueprint with the game
    	BlueprintRegistry.registerBlueprint({
            // the unique ID for the entity
    		id : 1338,
            // the in-game name
            name : "King Slime",
            // the description showed to users
            description : "An odd slimy blob with a regal atmosphere.",
            // the species classification of the entity
            classification : "ahl",
            // the DP cost of the entity
            cost : 1000,
            // the amount of DP produced per minute by the entity
            dpRate : 100,
            // the roaming range of the entity
            roamingRange : 10,
            
            // the settings for the entity's model
            model : {
            	// the name of the entity model in the assets folder
            	file : "king_slime.obj",
            	// the model scale
                size : 1,
                // the optional order in which to load objects from the model file
                order : ["Baby_king_slime", "King_slime"]
            },
            
            // water properties
            water : {
                // whether the entity can survive underwater
            	underwater : false,
                // whether the entity can survive over water
            	overWater : true,
                // the entity offset when placed underwater?
            	offset : 0
            },
            
            // the components that the entity has
            components : [
                // the base life component - needed for living entities
                // INCOMPLETE
            	new LifeComponent({
                    // the average population size
            		averagePopulation : 4.4,
                    // the average life length
            		averageLifeLength : 50,
                    // the number of health points for defending against attacks
            		defencePoints : 100,
                    // population growth factors?
            		popFactors : [0],
            		
                    // the death type of the entity
                    // this will fade out the entity
            		death : new FadeDeath({
                        time : 5
            		}),
            		
                    // the breeding properties of the entity
                    // INCOMPLETE
            		breeding : {
            			maturity : 15,
            			time : 1
            		},
            		
                    // the properties regarding the entity's environmental satisfaction
            		environment : {
                        // the altitude preferences
            			altitude : {
                            // the minimum preferred altitude
            				min : 0,
                            // the maximum preferred altitude
            				max : 50,
                            // how much the altitude affects the entity's satisfaction
            				influence : 0.8
            			},
            			
                        // the biome preferences
            			biomes : {
                            // whether the entity can survive in barren land
            				barren : true,
                            // the ideal percentage of a biome?
            				idealFactor : 100,
            				
                            // the suitable biome preferences
            				// this is needed
            				suitable : {
                                // the IDs of preferred biomes
            					ids : [BiomeCodes.JUNGLE, BiomeCodes.LUSH, BiomeCodes.SWAMP, BiomeCodes.TROPICAL, BiomeCodes.get("GOO")],
                                // how much the preferred biomes affect the entity's satisfaction
            					influence : 0.1
            				},
                            
                            // the favourite biome preferences
            				// this can be omitted
            				favourite : {
                                // the ID of the favourite biome
            					ids : BiomeCodes.get("GOO"),
                                // how much the favourite biome affects the entity's satisfaction
            					influence : 0
            				},
            				
                            // the unsuitable biome preferences
            				// this can be omitted
            				unsuitable : {
                                // the IDs of disliked biomes
            					ids : [BiomeCodes.DESERT, BiomeCodes.SNOW],
                                // how much the preferred biomes affect the entity's satisfaction
            					influence : 0.8
            				}
            			}/*,
            			
            			// the species preferences
            			species : {
            				// the species that the entity likes
            				liked : {
            					// the classification codes for the species that the entity likes
            					classifications : ["pnm", "pnx"],
            					// how much the liked species affect the entity's satisfaction
            					influence : 1
            				},
            				
            				
            				// the species that the entity dislikes
            				disliked : {
            					// the classification codes for the species that the entity dislikes
            					classifications : ["pb"],
            					// how much the disliked species affect the entity's satisfaction
            					influence : 0.5
            				}
            			}*/
            		}
            	}),
            	
            	// allows the entity to grow (the stages are in the same order in which the model objects were loaded)
            	new GrowthComponent({
            		// whether the growth is dynamic
            		dynamic : true,
            		// the average time that it takes to grow (in-game hours)
            		time : 5,
            		// the number of growth stages, linking to the model count
            		stages : 2
            	}),
            	
            	/*
            	new FrogMovement({
            		speed : 0.55,
            		bouncePower : 3,
            		waitTime : 0.5,
            		bounciness : 0.4
            	}),
            	
            	new RabbitMovement({
            		baseSpeed : 0.55,
            		bouncePower : 5,
            		upRotationSpeed : 130,
            		downRotationSpeed : 250,
            		frontZ : 0,
            		backZ : 0
            	})
            	
            	
            	new FlouncerMovement({
            		speed : 0.55,
            		rotationSpeed : 180,
            		bouncePower : 10,
            		bounceRotation : 80,
            		standardHeight : 0.2
            	})
            	
            	new FlyMovement()
            	*/
            	
            	new BeeMovement(),
            	
            	new TortoiseAi(),
            	
            	new SpreaderComponent({
            		biome : BiomeCodes.get("GOO"),
            		strength : 10,
            		range : 10,
            		colourOffsets : new Vector3f(0.5, 0.5, 0.5)
            	})
            ]
    	});
    	
    	// register a new slime blueprint with the game
    	BlueprintRegistry.registerBlueprint({
            // the unique ID for the entity
    		id : 1337,
            // the in-game name
            name : "Slime",
            // the description showed to users
            description : "An odd slimy blob.",
            // the species classification of the entity
            classification : "ahs",
            // the DP cost of the entity
            cost : 500,
            // the amount of DP produced per minute by the entity
            dpRate : 25,
            // the roaming range of the entity
            roamingRange : 10,
            
            // the settings for the entity's model
            model : {
            	// the name of the entity model in the assets folder
            	file : "slime.obj",
            	// the model scale
                size : 0.65,
                // the optional order in which to load objects from the model file
                order : ["Baby_slime", "Adult_slime"]
            },
            
            // water properties
            water : {
                // whether the entity can survive underwater
            	underwater : false,
                // whether the entity can survive over water
            	overWater : true,
                // the entity offset when placed underwater?
            	offset : 0
            },
            
            // the components that the entity has
            components : [
                // the base life component - needed for living entities
                // INCOMPLETE
            	new LifeComponent({
                    // the average population size
            		averagePopulation : 4.4,
                    // the average life length
            		averageLifeLength : 50,
                    // the number of health points for defending against attacks
            		defencePoints : 100,
                    // population growth factors?
            		popFactors : [0],
            		
                    // the death type of the entity
                    // this will fade out the entity
            		death : new FadeDeath({
                        time : 5
            		}),
            		
                    // the breeding properties of the entity
                    // INCOMPLETE
            		breeding : {
            			maturity : 15,
            			time : 1
            		},
            		
                    // the properties regarding the entity's environmental satisfaction
            		environment : {
                        // the altitude preferences
            			altitude : {
                            // the minimum preferred altitude
            				min : 0,
                            // the maximum preferred altitude
            				max : 50,
                            // how much the altitude affects the entity's satisfaction
            				influence : 0.8
            			},
            			
                        // the biome preferences
            			biomes : {
                            // whether the entity can survive in barren land
            				barren : true,
                            // the ideal percentage of a biome?
            				idealFactor : 100,
            				
                            // the suitable biome preferences
            				// this is needed
            				suitable : {
                                // the IDs of preferred biomes
            					ids : [BiomeCodes.JUNGLE, BiomeCodes.LUSH, BiomeCodes.SWAMP, BiomeCodes.TROPICAL, BiomeCodes.get("GOO")],
                                // how much the preferred biomes affect the entity's satisfaction
            					influence : 0.1
            				},
                            
                            // the favourite biome preferences
            				// this can be omitted
            				favourite : {
                                // the ID of the favourite biome
            					ids : BiomeCodes.get("GOO"),
                                // how much the favourite biome affects the entity's satisfaction
            					influence : 0
            				},
            				
                            // the unsuitable biome preferences
            				// this can be omitted
            				unsuitable : {
                                // the IDs of disliked biomes
            					ids : [BiomeCodes.DESERT, BiomeCodes.SNOW],
                                // how much the preferred biomes affect the entity's satisfaction
            					influence : 0.8
            				}
            			}
            		}
            	}),
            	
            	// allows the entity to grow (the stages are in the same order in which the model objects were loaded)
            	new GrowthComponent({
            		// whether the growth is dynamic
            		dynamic : true,
            		// the average time that it takes to grow (in-game hours)
            		time : 5,
            		// the number of growth stages, linking to the model count
            		stages : 2
            	}),
            	
            	new BeeMovement(),
            	
            	new PatrolWithSwimAi(),
            	
            	new SpreaderComponent({
            		biome : BiomeCodes.get("GOO"),
            		strength : 10,
            		range : 10,
            		colourOffsets : new Vector3f(0.5, 0.5, 0.5)
            	}),
            	
            	new MaterialComponent({
            		materials : [
            			new Material(new Colour(1, 0, 0), 1000),
            			new Material(MaterialColours.get("GREEN"), 1000),
            			new Material(MaterialColours.get("PURPLE"), 1000)
            		],
            		
            		secondNaturalMaterial : true
            	})
            ]
    	});
        
        // PRE_GAME_UPDATE is called at the start of every game tick
        EventBus.on(Events.PRE_GAME_UPDATE, function(event) {
            // check if the 'Z' key has been pressed
        	if(MyKeyboard.getKeyboard().keyDownEventOccurred(Keyboard.KEY_Z)) {
                // display a notification, using our previously loaded image
        		EquilinoxGuis.notify("Modded", "This is from a Javascript mod!", smiley);
                // play our loaded "rooster" sound
        		SoundMaestro.playSystemSound(rooster);
        	}
        });
    }
}));
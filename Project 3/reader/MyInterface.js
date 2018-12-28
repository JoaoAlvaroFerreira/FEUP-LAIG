/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();
        this.initKeys();
        // add a group of controls (and open/expand by defult)

        return true;
    }

    /**
     * Adds a folder containing the IDs of the lights passed as parameter.
     * @param {array} lights
     */
    addLightsGroup(lights) {

        var gameGroup = this.gui.addFolder("Game Menu");
        gameGroup.add(this.scene, 'Player1', [ 'human', 'ai']);
        gameGroup.add(this.scene, 'Player2', [ 'human', 'ai']);
        gameGroup.add(this.scene, 'Difficulty', [ '1', '2', '3']);
        gameGroup.add(this.scene,'StartGame');
        var lightsGroup = this.gui.addFolder("Lights");
		lightsGroup.close();

		// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
		// e.g. this.option1=true; this.option2=false;

		lightsGroup.add(this.scene, 'Light1');
        lightsGroup.add(this.scene, 'Light2');


        this.gui.add(this.scene,'Axis');
        this.gui.add(this.scene, 'currentCamera', this.scene.cameraList );
        this.gui.add(this.scene, 'currentEnvironment', this.scene.environmentList );

        
/*
        for (var key in lights) {
            if (lights.hasOwnProperty(key)) {
                this.scene.lightValues[key] = lights[key][0];
                group.add(this.scene.lightValues, key);
            }
        } */
    }

    
	/**
	 * processKeyboard
	 * @param event {Event}
	 */
	
	//Key Processing Unit
        initKeys() {
          
            this.scene.gui=this;
            this.processKeyboard=function(){};
            this.activeKeys={};
            }
            processKeyDown(event) {
            this.activeKeys[event.code]=true;
            };
            processKeyUp(event) {
            this.activeKeys[event.code]=false;
            };
            isKeyPressed(keyCode) {
            return this.activeKeys[keyCode] || false;
            }
}
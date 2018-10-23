var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
        this.lightValues = {};
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.sceneInited = false;

        this.cameras = [];
        this.initCameras();
        this.setUpdatePeriod(1000 / 60);

        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        
        this.currentMaterial = 0;

        
       
        this.cameraList = {
		"Free Camera": 0,
        "Perspective Camera": 1,
        "Ortho Camera": 2
        };
        
        this.currentCamera = 0;

        this.axis = new CGFaxis(this);
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {

      

        this.freeCamera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));

        this.cameras.push(this.freeCamera);
            
        this.camera = this.freeCamera;
            
       
       
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.
        this.Light1=true; 
		this.Light2=true;
        
        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebGL.

            if (this.graph.lights.hasOwnProperty(key)) {
                var light = this.graph.lights[key];

                //lights are predefined in cgfscene
                this.lights[i].setPosition(light[1][0][0], light[1][0][1], light[1][0][2], light[1][0][3]);
                this.lights[i].setAmbient(light[2][0][0], light[2][0][1], light[2][0][2], light[2][0][3]);
                this.lights[i].setDiffuse(light[3][0][0], light[3][0][1], light[3][0][2], light[3][0][3]);
                this.lights[i].setSpecular(light[4][0][0], light[4][0][1], light[4][0][2], light[4][0][3]);
                if(light[5]){
                    this.lights[i].setSpotDirection(light[5][0][0],light[5][0][1],light[5][0][2]);
                }
                if(light[6]){
                    this.lights[i].setSpotCutOff(light[6]);
                }
                if(light[7]){
                    this.lights[i].setSpotExponent(light[7]);
                }

                this.lights[i].setVisible(true);
                if (light[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();
                

                i++;
            }
        }
    }
   
 
    
  


    /* Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        
       this.camera.near = this.graph.near;
       this.camera.far = this.graph.far;

      var viewName = this.graph.viewsInfo[0];

      for(var i = 1; i < this.graph.viewsInfo.length; i++)
      {
        
      
      if(this.graph.viewsInfo[i][this.graph.viewsInfo[i].length-1] == "perspective")  {
      var cameraAux = new CGFcamera(this.graph.viewsInfo[i][3], this.graph.viewsInfo[i][1], this.graph.viewsInfo[i][2],  //near, far e angles
        vec3.fromValues(this.graph.viewsInfo[i][4][0], this.graph.viewsInfo[i][4][1], this.graph.viewsInfo[i][4][2]),  //fromValues
        vec3.fromValues(this.graph.viewsInfo[i][5][0], this.graph.viewsInfo[i][5][1], this.graph.viewsInfo[i][5][2])); //toValues
      }
      else if (this.graph.viewsInfo[i][this.graph.viewsInfo[i].length-1] == "ortho"){

         vec3.fromValues(0, 0, 0)
        
     var cameraAux = new CGFcameraOrtho( this.graph.viewsInfo[i][3], this.graph.viewsInfo[i][4], this.graph.viewsInfo[i][6],
        this.graph.viewsInfo[i][5], this.graph.viewsInfo[i][1], this.graph.viewsInfo[i][2], this.graph.viewsInfo[i][7], this.graph.viewsInfo[i][8], [0,1,0] )

        
      }
      else continue;

        this.cameras.push(cameraAux);
     

        }
        //IMPORTANTE RESOLVER PARA FUNCIONAR
       // console.log(this.graph.viewsInfo[1][1]);
      /*this.camera2 = new CGFcameraOrtho(this.graph.viewsInfo[2][2], this.graph.viewsInfo[2][3], this.graph.viewsInfo[2][5],
        this.graph.viewsInfo[2][4], this.graph.viewsInfo[2][0], this.graph.viewsInfo[2][1], 
       position, target, up);  */

      
    
        

        //Done: Change reference length according to parsed graph
        this.axis = new CGFaxis(this, this.graph.sceneInfo[1]);

        // Done: Change ambient and background details according to parsed graph
        this.setGlobalAmbientLight(this.graph.ambientSources[0][0][0],this.graph.ambientSources[0][0][1],
            this.graph.ambientSources[0][0][2],this.graph.ambientSources[0][0][3]);
        this.gl.clearColor(this.graph.ambientSources[0][1][0],this.graph.ambientSources[0][1][1],
            this.graph.ambientSources[0][1][2],this.graph.ambientSources[0][1][3]);

        this.initLights();
        
        
        // Adds lights group.
        this.interface.addLightsGroup(this.graph.lights);

        this.sceneInited = true;
        
    }


    /**
     * Displays the scene.
     */
    display() {
        // ---- BEGIN Background, camera and axis setup
        this.camera = this.cameras[this.currentCamera];

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();
     

        if (this.sceneInited) {
            // Draw axis
            this.axis.display();
            
            this.graph.sceneComponentDisplay(this.currentMaterial);
        
            
            

        }
        else {
            // Draw axis
            this.axis.display();
        }



        this.popMatrix();
        // ---- END Background, camera and axis setup

        
    }

    checkKeys()
		{
		
		this.keysPressed=false;
		if (this.gui.isKeyPressed("KeyM"))
		{
	
        this.keysPressed=true;           
		}
	
		}

	

	update(currTime) {

      this.checkKeys();

        if(this.keysPressed==true){
            this.currentMaterial++;
            this.keysPressed=false;
        }

        if(!this.Light1){
			this.lights[0].disable();
			this.lights[0].update();
		}
		
		if(this.Light1){
			this.lights[0].enable();
			this.lights[0].update();
		}
		
		if(!this.Light2){
			this.lights[1].disable();
			this.lights[1].update();
		}
		
		if(this.Light2){
			this.lights[1].enable();
			this.lights[1].update();
        }
        
   
    }

    
	
}
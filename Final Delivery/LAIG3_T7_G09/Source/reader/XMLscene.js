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

        this.game = new Cannon(this);
        this.P1Marker = new MyMarker(this);
        this.sceneInited = false;

        this.cameraTransition = false;
        this.currentCamera = 3;
        this.show=false;

        this.cameras = [];
        this.initCameras();
        this.initAnimations();
     
   
        this.setUpdatePeriod(1000 / 60);
    

        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        
        this.currentMaterial = 0;

        this.deltaTime = 0;
       
        this.cameraList = {
		"Free Camera": 0,
        "Perspective Camera": 1,
        "Ortho Camera":2,
        "P1": 3,
        "P2": 4,
        "Top1": 5,
        "Top2": 6,
        "AnimationCamera": 7
        };

        this.environmentList={
        "Field": 0,
        "Pool":1,
        "Space":2
        }
        
        this.currentCamera = 0;
        this.currentEnvironment = 0;
        this.environmentInUse = 0;
        this.Player1 = 'ai';
        this.Player2 = 'ai';
        this.Difficulty = "1";
        this.Timer = '45';
        this.gamestarted = false;
        this.StartGame = function(){
            this.gamestarted = true;
            this.timer=true;
            this.timerTime=this.deltaTime;
            this.game.startGameJS(this.Player1, this.Player2, this.Difficulty);
        };
        
        this.PlayTurn = function(){
            if(this.botAnim && this.keyPressedA && this.game.checkBotTurn()){
                this.botPlay=true;  
                this.keyPressedA=false;
                
      
          }
        };

        this.PreviousPlay = function(){
            if(this.gamestarted)
            this.game.moveBack();
            
        };

        this.axis = new CGFaxis(this);
        this.setPickEnabled(true);
        this.selection=null;
        this.previousSelection=null;
        this.timer=false;
        this.timerTime=null;
        this.P1Victory=0;
        this.P2Victory=0;

        this.firstPick = false;
        this.firstPickVar;
        this.newTurn = false;
        this.botPlay=false;
        this.botAnim=true;
        this.keyPressedA=true;

    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {

      

        this.freeCamera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(40, 40, 40), vec3.fromValues(0, 0, 0));

        this.cameras.push(this.freeCamera);
            
        this.camera = this.freeCamera;
   
        
        this.initialTime = 0;
        
       
    }

    initAnimations(){
        this.circularAnimation = new CircularAnimation(this,1,20,0,0,0,5,0,720);
        var points = [[0,0,0],[1,1,1]];
        this.linearAnimation = new LinearAnimation(this,2,5,points);
    }

  
    	

    
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.
        this.Light1=true; 
        this.Light2=false;
        this.Axis = false;
        
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
        this.currentCamera = 4;
    }


    /**
     * Displays the scene.
     */
    display() {
        // ---- BEGIN Background, camera and axis setup
        this.camera = this.cameras[this.currentCamera];

        if(this.currentEnvironment != this.environmentInUse)
        {
            this.environmentInUse = this.currentEnvironment;
            this.graph.reader = new CGFXMLreader();
            this.graph.reader.open('scenes/' + this.filenames[this.environmentInUse], this.graph);
        }
        
        

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.DEPTH_TEST);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();
     

        if (this.sceneInited) {
            // Draw axis
            if(this.Axis)
            this.axis.display();
            
            this.graph.sceneComponentDisplay(this.currentMaterial);
        
        }
        else {
            // Draw axis
            this.axis.display();
        }

       
        this.popMatrix();
        // ---- END Background, camera and axis setup
        this.game.displayBoard();
        this.pushMatrix();
        this.translate(-7.75,.25,0);
        this.scale(1.5,1.5,3);
        this.P1Marker.display();
        this.popMatrix();
        this.pushMatrix();
        this.translate(7.75,.25,0);
        this.rotate(180*DEGREE_TO_RAD,0,1,0);
        this.scale(1.5,1.5,3);
        this.P1Marker.display();
        this.popMatrix();
      //makeRequest("getTable", this.game);

        
    }

    checkKeys()
		{
		
		this.keysPressed=false;
		if (this.gui.isKeyPressed("KeyM"))
		{
	
        this.keysPressed=true;  
    }
    if (this.gui.isKeyPressed("KeyA"))
		{
	if(this.botAnim && this.keyPressedA && this.game.checkBotTurn()){
          this.botPlay=true;  
          this.keyPressedA=false;
          

    }
    }
 
    if (this.gui.isKeyPressed("KeyQ"))
   {
   if(this.show==false){
        this.time=this.deltaTime;
        this.player=this.currentCamera;
            if(this.player==3){
                this.position = [9,10,0];
                 this.target = [1,0,0];
            }
            if(this.player==4){
                this.position = [-9,10,0];
                this.target = [-1,0,0];
            }
            }
        this.show=true;                    
        }
        
        if (this.gui.isKeyPressed("KeyW"))
		{	
        this.P2Victory++; 
        }
        if (this.gui.isKeyPressed("KeyE"))
		{	
        this.P1Victory++; 
        }
	
    }
        
        updateCameras() {
            this.time2 = this.deltaTime-this.time;
            if(this.player==3){
                if(this.position[0]-this.time2/9>-9)	{
                this.position[0] = this.position[0]-this.time2/9;
                if(this.position[0]-this.time2/9>=0)  this.position[2] = (-9+this.position[0])*1.8;
                else this.position[2] = (-9-this.position[0])*1.8;
                this.target[0] = this.position[0]/9;
                this.cameras[3].setPosition(this.position);
                this.cameras[3].setTarget(this.target);
                }
                else {
                    this.cameras[3].setPosition([-9,10,0]);
                    this.cameras[3].setTarget([-1,0,0]);
                    this.currentCamera=4;
                    this.cameraTransition=false;
                    this.show=false;
                    this.cameras[3].setPosition([9,10,0]);
                    this.cameras[3].setTarget([1,0,0]);
                    this.selection=null;
                    if(this.Player2!='ai') this.picking=true;
                    this.timer=true;
                    this.timerTime=this.deltaTime;
                    this.botAnim=true;
                    this.keyPressedA=true;
                }
            }
            if(this.player==4){
                if(this.position[0]+this.time2/9<9)	{
                this.position[0] = this.position[0]+this.time2/9;
                if(this.position[0]-this.time2/9<=0)  this.position[2] = (9+this.position[0])*1.8;
                else this.position[2] = (9-this.position[0])*1.8;
                this.target[0] = this.position[0]/9;
                this.cameras[4].setPosition(this.position);
                this.cameras[4].setTarget(this.target);
                }
                else {
                    this.cameras[4].setPosition([9,10,0]);
                    this.cameras[4].setTarget([1,0,0]);
                    this.currentCamera=3;
                    this.cameraTransition=false;
                    this.show=false;
                    this.cameras[4].setPosition([-9,10,0]);
                    this.cameras[4].setTarget([-1,0,0]);
                    if(this.Player1!='ai') this.picking=true;
                    this.timer=true;
                    this.timerTime=this.deltaTime;
                    this.botAnim=true;
                    this.keyPressedA=true;
            }
            }
        }

    updateAnimations(currTime){
        
      if(this.initialTime == 0){
        this.initialTime = currTime;
      }
      if(this.graph.animations!=null){
      for(var i = 0; i<this.graph.animations.length;i++){
          if(this.graph.animations[i][1]!=null){
              if(this.graph.animations[i][1]=="linear" || this.graph.animations[i][1]=="circular") {
                  this.graph.animations[i][2].update(this.deltaTime);
            }
            }
            }
        }
      
    }

logPicking(){
	if (this.pickMode == false) {
		if (this.pickResults != null && this.pickResults.length > 0) {
			for (var i=0; i< this.pickResults.length; i++) {
				var obj = this.pickResults[i][0];
				if (obj)
				{
					var customId = this.pickResults[i][1];				
                    console.log("Picked object: " + obj + ", with pick id " + customId);
                    this.previousSelection=this.selection;
                    this.selection=customId;
                    
                    console.log("antes");
                    console.log("Current player is"+this.game.currentPlayer);

                    console.log(this.firstPick);
                   
                    if(this.game.gameStarted && this.firstPick && this.game.checkValid(customId) && this.game.checkHumanTurn()){
                        this.newTurn = true;
                        console.log("entrou");
                        this.game.playHuman(this.firstPickVar, customId);
                       
                        this.firstPick = false;
                       //this.newTurn = false;

                        
                    }

                    console.log(this.newTurn);
                    console.log(this.game.gameStarted);
                    if(this.game.gameStarted && !this.newTurn && this.game.checkHumanTurn()){
                    console.log("picking1");
                    this.game.getPossibleMovesBoard(customId);
                    this.firstPick = true;
                    this.firstPickVar = customId;
                    }

                  
                    if(this.game.pickingCityFlag == 1){
                        
                        this.game.player1pick = 10-this.selection%10;
                        this.game.pickingCityFlag--;
                        

                        makeRequest('setCities('+this.game.player1+','+this.game.player2+','+this.game.player1pick+','+this.game.player2pick+')',this.game);
                        this.game.gameStarted = true;
                      
                        
                    }
                    if(this.game.pickingCityFlag == 3){
                        
                        this.game.player2pick = 10-this.selection%10;
                      

                        makeRequest('setCities('+this.game.player1+','+this.game.player2+','+this.game.player1pick+','+this.game.player2pick+')',this.game);
                        this.game.gameStarted = true;
                        
                        
                    }
                  

                    if(this.game.pickingCityFlag == 2){

                        
                        this.game.player1pick = 10-this.selection%10;
                        this.game.pickingCityFlag++;
                        this.game.board = this.game.p2board;
                 
                    }

                   
                    
				}
			}
            this.pickResults.splice(0,this.pickResults.length);
          
		}		
    }
   
}

    updateDeltaTime(currTime) {
        this.deltaTime = (currTime - this.initialTime)/1000;
    }
      

	update(currTime) {
        this.updateAnimations(currTime);

      if(this.cameraTransition) this.updateCameras();
      this.logPicking();
      this.clearPickRegistration();  
      this.checkKeys();
      this.updateDeltaTime(currTime);
      if(this.water != null) {
        this.water.updateShader();
    }

        if(this.keysPressed==true){
            this.currentMaterial++;
            this.keysPressed=false;
        }

        if(this.show==true){
            this.cameraTransition=true;
            this.time=this.deltaTime;
            this.player=this.currentCamera;
                if(this.player==3){
                    this.position = [9,10,0];
                     this.target = [1,0,0];
                }
                if(this.player==4){
                    this.position = [-9,10,0];
                    this.target = [-1,0,0];
                }
                this.show=false;
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

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
        this.initAnimations();
        //this.initShaders();
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
        this.plane = new Plane(this, 50, 50);
        
        this.initialTime = 0;
        
       
    }

    initAnimations(){
        this.circularAnimation = new CircularAnimation(this,1,20,0,0,0,5,0,720);
        var points = [[0,0,0],[1,1,1]];
        this.linearAnimation = new LinearAnimation(this,2,5,points);
    }

    initShaders(idTexture, idheightmap, heightscale, texscale){

        //this.terrainShader = new CGFshader(this.gl, "library/vertex.vert", "library/fragment.frag");
    
        this.appearance = null;
        //this.selectedExampleShader=0;
        this.wireframe=false;
        this.scaleFactor=heightscale;
        this.testTexture = new CGFtexture(this, "./scenes/images/"+ idTexture +".jpg");
        this.testHeightMap = new CGFtexture(this, "./scenes/images/"+ idheightmap +".jpg");
        
        this.terrainShader.setUniformsValues({uSampler2: 1});
        this.terrainShader.setUniformsValues({normScale: this.scaleFactor});
        this.terrainShader.setUniformsValues({compTimeFactor: this.compTimeFactor});
        this.terrainShader.setUniformsValues({scaleFactor: this.scaleFactor});
        this.terrainShader.setUniformsValues({redFactor: this.redFactor});
        this.terrainShader.setUniformsValues({greenFactor: this.blueFactor});
        this.terrainShader.setUniformsValues({blueFactor: this.greenFactor});
        
    
    };

    


    
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
        this.gl.enable(this.gl.DEPTH_TEST);

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

    updateAnimations(currTime){
        this.circularAnimation.update((currTime-this.initialTime)/1000);
       
      if(this.initialTime == 0){
        this.initialTime = currTime;
      }
      if(this.graph.animations!=null){
      for(var i = 0; i<this.graph.animations.length;i++){
          if(this.graph.animations[i][1]!=null){
              if(this.graph.animations[i][1]=="linear") {
                  this.graph.animations[i][2].update((currTime- this.initialTime)/1000);
            }
              else if(this.graph.animations[i][1]=="circular")  {
                  this.graph.animations[i][2].update((currTime- this.initialTime)/1000);
              }
                }
            }
        }
      this.linearAnimation.update((currTime- this.initialTime)/1000);
    }

    updateShaders(currTime){
        /*var factor = (Math.sin((currTime * 3.0) % 3141 * 0.002)+1.0)*.5;
        this.timeFactor=Math.abs(Math.sin(currTime/1000));
        this.compTimeFactor=1-this.timeFactor;
        this.terrainShader.setUniformsValues({timeFactor: this.timeFactor});
        this.terrainShader.setUniformsValues({compTimeFactor: this.compTimeFactor})*/
        
        //this.testShaders[0].setUniformsValues({scaleFactor: this.scaleFactor});
    };
    

	update(currTime) {
        
     
      this.updateAnimations(currTime);
      this.updateShaders(currTime);
      
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
/*
// terrain
				var img = new Image();
				img.onload = function () {
					var data = getHeightData(img);

					// plane
					plane = new Plane( 100, 100, 127, 127 );

					for ( var i = 0, l = plane.vertices.length; i < l; i++ ) {
						plane.vertices[i].position.z = data[i];
					}

					var planeMesh = addMesh( plane, 100,  0, FLOOR, 0, -1.57,0,0, getTerrainMaterial() );
					waterMesh.visible = true;
				};
				img.src = "heightmap_128.jpg";

				var water = new Plane( 100, 100, 1, 1 );
				for(var i=0; i<water.uvs.length; i++) {
					var uvs = water.uvs[i];
					for ( j = 0, jl = uvs.length; j < jl; j++ ) {
						uvs[j].u *= 10;
						uvs[j].v *= 10;
					}
				}
				waterMesh = addMesh( water, 63,  -1000, FLOOR+620, 1000, -1.57,0,0, getWaterMaterial() );
				waterMesh.visible = false;

				try {
					webglRenderer = new THREE.WebGLRenderer( { scene: scene, clearColor: 0x34583e, clearAlpha: 0.5 } );
					webglRenderer.setFaceCulling(0);
					webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
					container.appendChild( webglRenderer.domElement );
					has_gl = 1;
				}
				catch (e) {
					// need webgl
					document.getElementById('info').innerHTML = "<P><BR><B>Note.</B> You need a modern browser that supports WebGL for this to run the way it is intended.<BR>For example. <a href='http://www.google.com/landing/chrome/beta/' target='_blank'>Google Chrome 9+</a> or <a href='http://www.mozilla.com/firefox/beta/' target='_blank'>Firefox 4+</a>.</P><CENTER><BR><img src='../general/WebGL_logo.png' border='0'></CENTER>";
					document.getElementById('info').style.display = "block";
					return;
				}

				stats = new Stats();
				stats.domElement.style.position = 'absolute';
				stats.domElement.style.top = '0px';
				stats.domElement.style.zIndex = 100;
				container.appendChild( stats.domElement );
				
			}

			function getHeightData(img) {
				var canvas = document.createElement( 'canvas' );
				canvas.width = 128;
				canvas.height = 128;
				var context = canvas.getContext( '2d' );

				var size = 128 * 128, data = new Float32Array( size );

				context.drawImage(img,0,0);

				for ( var i = 0; i < size; i ++ ) {
					data[i] = 0
				}

				var imgd = context.getImageData(0, 0, 128, 128);
				var pix = imgd.data;

				var j=0;
				for (var i = 0, n = pix.length; i < n; i += (4)) {
					var all = pix[i]+pix[i+1]+pix[i+2];
					data[j++] = all/30;
				}

				return data;
			}

			function getWireframeMaterial () {
				return new THREE.MeshLambertMaterial( { color:0x231ad4, opacity: 0.65, shading: THREE.FlatShading } );
			}

			function getWaterMaterial () {
				var waterMaterial = new THREE.MeshPhongMaterial( { map: new THREE.Texture(null, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping), ambient: 0x666666, specular: 0xffffff, env_map: textureCube, combine: THREE.Mix, reflectivity: 0.15 , opacity: 0.8, shininess: 10, shading: THREE.SmoothShading } );

				var img = new Image();
				waterMaterial.map.image = img;
				img.onload = function () {
					waterMaterial.map.image.loaded = 1;
				};
				img.src = "water.jpg";

				return waterMaterial;
			}

			function getTerrainMaterial () {
				var terrainMaterial = new THREE.MeshPhongMaterial( { map: new THREE.Texture(null, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping), ambient: 0xaaaaaa, specular: 0xffffff, shininess: 0, shading: THREE.SmoothShading } );

				var img = new Image();
				terrainMaterial.map.image = img;
				img.onload = function () {
					terrainMaterial.map.image.loaded = 1;
				};
				img.src = "terrain.jpg";

				return terrainMaterial;
            }
            */

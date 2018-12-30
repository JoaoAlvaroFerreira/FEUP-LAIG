 /**
  * MyCity
  * @param gl {WebGLRenderingContext}
  * @constructor
  */
 var DEGREE_TO_RAD = Math.PI / 180;
 class MyCity extends CGFobject {
     constructor(scene,playerTexture) { //accelaration = 0.01, angle = 0) {
        super(scene);
 
  
        this.cube = new MyUnitCube(scene);
        this.roof = new MyPyramid(scene,1,1);
 
        this.texture = new CGFtexture(this.scene,"./scenes/images/" + playerTexture + ".jpg");

        this.myMaterial = new CGFappearance(this.scene);
   	  	this.myMaterial.setAmbient(0.5, 0.5, 0.5, 1);
	    	this.myMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
		    this.myMaterial.setSpecular(0.7, 0.7, 0.7, 1);	
        this.myMaterial.setShininess(120);
        this.myMaterial.setTexture(this.texture);
  
      };
 
      display() {
         this.myMaterial.apply();
         this.scene.pushMatrix();
         this.scene.scale(1.7,2,1.7);  
         this.scene.rotate(90*DEGREE_TO_RAD,0,1,0);
         this.scene.translate(0,-0.15,0);	
         //house1
         this.scene.pushMatrix();
         this.scene.translate(-0.1,0,0);
         this.scene.scale(0.6,0.5,0.6);
         this.scene.rotate(-20*DEGREE_TO_RAD,0,1,0);
         //base
         this.scene.pushMatrix();      
         this.scene.translate(0,0.25,0);
         this.scene.scale(0.4,0.5,0.4);
         this.cube.display();
         this.scene.popMatrix();
         //roof
         this.scene.pushMatrix();      
         this.scene.translate(0,0.4,0);
         this.scene.scale(0.6,0.4,0.6);
         this.roof.display();
         this.scene.popMatrix();
         this.scene.popMatrix();
 
  
           //house2
         this.scene.pushMatrix();
         this.scene.translate(0.2,0,0);
         this.scene.scale(0.4,0.3,0.4);
         this.scene.rotate(20*DEGREE_TO_RAD,0,1,0);
         //base
         this.scene.pushMatrix();      
         this.scene.translate(0,0.25,0);
         this.scene.scale(0.4,0.5,0.4);
         this.cube.display();
         this.scene.popMatrix();
         //roof
         this.scene.pushMatrix();      
         this.scene.translate(0,0.4,0);
         this.scene.scale(0.6,0.4,0.6);
         this.roof.display();
         this.scene.popMatrix();
         this.scene.popMatrix();
         this.scene.popMatrix();   
 
      }
 
  
  } 

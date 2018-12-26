 /**
  * MyCity
  * @param gl {WebGLRenderingContext}
  * @constructor
  */
 var DEGREE_TO_RAD = Math.PI / 180;
 class MyCity extends CGFobject {
     constructor(scene) { //accelaration = 0.01, angle = 0) {
         super(scene);
 
  
          this.cube = new MyUnitCube(scene);
         this.roof = new MyPyramid(scene,1,1);
 
  
      };
 
      display() {
         this.scene.pushMatrix();
         this.scene.scale(1.5,2,1.5);  	
         //house1
         this.scene.pushMatrix();
         /*<translate x="-0.1" y="0" z="0" />
         <scale x="0.6" y="0.5" z="0.6" />
         <rotate axis="y" angle="-20" /> */
         this.scene.translate(-0.1,0,0);
         this.scene.scale(0.6,0.5,0.6);
         this.scene.rotate(-20*DEGREE_TO_RAD,0,1,0);
         //base
         // <translate x="0" y="0.25" z="0" />
         // <scale x="0.4" y="0.5" z="0.4" />
         this.scene.pushMatrix();      
         this.scene.translate(0,0.25,0);
         this.scene.scale(0.4,0.5,0.4);
         this.cube.display();
          this.scene.popMatrix();
         //roof
         //<translate x="0" y="0.4" z="0" />
         //<scale x="0.6" y="0.4" z="0.6" />
         this.scene.pushMatrix();      
         this.scene.translate(0,0.4,0);
         this.scene.scale(0.6,0.4,0.6);
         this.roof.display();
         this.scene.popMatrix();
         this.scene.popMatrix();
 
  
           //house2
         this.scene.pushMatrix();
         /*<translate x="0.2" y="0" z="0" />
         <scale x="0.4" y="0.3" z="0.4" />
         <rotate axis="y" angle="20" />*/
         this.scene.translate(0.2,0,0);
         this.scene.scale(0.4,0.3,0.4);
         this.scene.rotate(20*DEGREE_TO_RAD,0,1,0);
         //base
         // <translate x="0" y="0.25" z="0" />
         // <scale x="0.4" y="0.5" z="0.4" />
         this.scene.pushMatrix();      
         this.scene.translate(0,0.25,0);
         this.scene.scale(0.4,0.5,0.4);
         this.cube.display();
         this.scene.popMatrix();
         //roof
         //<translate x="0" y="0.4" z="0" />
         //<scale x="0.6" y="0.4" z="0.6" />
         this.scene.pushMatrix();      
         this.scene.translate(0,0.4,0);
         this.scene.scale(0.6,0.4,0.6);
         this.roof.display();
         this.scene.popMatrix();
         this.scene.popMatrix();
         this.scene.popMatrix();   
 
      }
 
  
  } 

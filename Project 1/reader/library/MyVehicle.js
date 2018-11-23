/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
var DEGREE_TO_RAD = Math.PI / 180;
class MyVehicle extends CGFobject {
    constructor(scene) { //accelaration = 0.01, angle = 0) {
        super(scene);
       
       
        this.cube = new MyUnitCube(scene);
        //this.wheel = new Wheel(scene,20,20);
        this.cylinder = new MyCylinder2(scene,20,10,0.7,0.7,2);
        this.cylinder2 = new MyCylinder2(scene,20,10,0.7,0.5,1.5);
        this.cylinder3 = new MyCylinder2(scene,20,10,0.5,0,0.5);
        this.triangle = new MyTriangle(scene,0,0,0,1,0,0,0,1,0,1,1);
        this.invertedtriangle = new MyTriangleInverted(scene,0,0,0,1,0,0,0,1,0,1,1);
        this.sphere = new MySphere(scene,0.61,20,20);
        this.wing = new MyWings(scene);
        
        this.planeFrontTexture = new CGFtexture(this.scene,"./scenes/images/planeFront.jpg");
        this.planeMiddleTexture = new CGFtexture(this.scene,"./scenes/images/planeMiddle.jpg");
        this.planeDefaultTexture = new CGFtexture(this.scene,"./scenes/images/iron.jpg");

        this.planeFront = new CGFappearance(this.scene);
   		this.planeFront.setAmbient(0.3, 0.3, 0.3, 1);
		this.planeFront.setDiffuse(0.7, 0.7, 0.7, 1);
		this.planeFront.setSpecular(0.0, 0.0, 0.0, 1);	
        this.planeFront.setShininess(120);
        this.planeFront.setTexture(this.planeFrontTexture);

        this.planeMiddle = new CGFappearance(this.scene);
        this.planeMiddle.setAmbient(0.3, 0.3, 0.3, 1);
        this.planeMiddle.setDiffuse(0.7, 0.7, 0.7, 1);
        this.planeMiddle.setSpecular(0.0, 0.0, 0.0, 1);	
        this.planeMiddle.setShininess(120);
        this.planeMiddle.setTexture(this.planeMiddleTexture);

        this.planeDefault = new CGFappearance(this.scene);
        this.planeDefault.setAmbient(0.3, 0.3, 0.3, 1);
        this.planeDefault.setDiffuse(0.7, 0.7, 0.7, 1);
        this.planeDefault.setSpecular(0.0, 0.0, 0.0, 1);	
        this.planeDefault.setShininess(120);
        this.planeDefault.setTexture(this.planeDefaultTexture);
    
    };

    display() {
       
         
       	
        //asas
        this.scene.pushMatrix();      
        this.scene.translate(-0.3,-0.2,-0.6);
        this.planeDefault.apply();
        this.wing.display();
        this.scene.popMatrix();

         //asas
         this.scene.pushMatrix();      
         this.scene.translate(-0.15,-0.2,0.8);
         this.scene.scale(0.5,1,0.5);
         this.wing.display();
         this.scene.popMatrix();
    
      
       //cilindro central
       this.scene.pushMatrix();
       this.scene.translate(0,0,-1.1);
       this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
       //this.scene.scale(0.6,0.6,4);
       this.planeMiddle.apply();
       this.cylinder.display();
       this.scene.popMatrix();

        //Cone
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.9);
        this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
        //this.scene.scale(0.6,0.6,4);
        this.cylinder2.display();
        this.scene.popMatrix();

         //Cone
         this.scene.pushMatrix();
         this.scene.translate(0,0,2.4);
         this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
         //this.scene.scale(0.6,0.6,4);
         this.planeDefault.apply();
         this.cylinder3.display();
         this.scene.popMatrix();

       //cockpit
       this.scene.pushMatrix();
       this.scene.translate(0.065,0.015,-1);
       this.planeFront.apply();
       this.sphere.display();
       this.scene.popMatrix();

       //tail end
       this.scene.pushMatrix();
       this.scene.translate(0,0.2,2.5);
       this.scene.rotate(Math.PI/2,0,1,0);
       this.scene.rotate(Math.PI/10,0,0,1);
       this.scene.scale(1,1.2,0.8);
       this.planeDefault.apply();
       this.triangle.display();
       this.invertedtriangle.display();
       this.scene.popMatrix();

    }
    

}
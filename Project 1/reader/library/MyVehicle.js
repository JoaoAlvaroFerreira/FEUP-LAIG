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
       // this.wing = new MyWings(scene);
    
    };

    display() {

        //asas
        this.scene.pushMatrix();      
        this.scene.translate(0,0.6,0);
        this.scene.scale(6, 0.1, 1); 
        //this.wing.display();
        this.scene.popMatrix();
      
       //cilindro central
       this.scene.pushMatrix();
       this.scene.translate(0,0,-1.1);
       this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
       //this.scene.scale(0.6,0.6,4);
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
         this.cylinder3.display();
         this.scene.popMatrix();

       //triangulo superior asa direita
       this.scene.pushMatrix();
       this.scene.translate(3,0.6,0.5);
       this.scene.rotate(Math.PI/2,0,1,0);
       this.scene.scale(1,0.8,0.8);
       this.triangle.display();
       this.invertedtriangle.display();
       this.scene.popMatrix();

       //triangulo superior asa esquerda
       this.scene.pushMatrix();
       this.scene.translate(-3,0.6,0.5);
       this.scene.rotate(Math.PI/2,0,1,0);
       this.scene.scale(1,0.8,0.8);
       this.triangle.display();
       this.invertedtriangle.display();
       this.scene.popMatrix();

       //cockpit
       this.scene.pushMatrix();
       this.scene.translate(0.065,0.015,-1);
       this.sphere.display();
       this.scene.popMatrix();

       //tail end
       this.scene.pushMatrix();
       this.scene.translate(0,0.2,2.5);
       this.scene.rotate(Math.PI/2,0,1,0);
       this.scene.rotate(Math.PI/10,0,0,1);
       this.scene.scale(1,1.2,0.8);
       this.triangle.display();
       this.invertedtriangle.display();
       this.scene.popMatrix();

    }
    

}
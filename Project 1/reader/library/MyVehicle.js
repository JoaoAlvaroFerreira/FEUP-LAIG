/**
 * MyVehicle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyVehicle extends CGFobject {
    constructor(scene) { //accelaration = 0.01, angle = 0) {
        super(scene);
       
       
        this.cube = new MyUnitCube(scene);
        this.wheel = new Wheel(scene,20,20);
        this.triangle = new MyTriangle(scene,0,0,0,1,0,0,0,1,0,1,1);
        this.invertedtriangle = new MyTriangleInverted(scene,0,0,0,1,0,0,0,1,0,1,1);
        this.sphere = new MySphere(scene,0.6,20,20);
    
    };

    display() {

        //asas
        this.scene.pushMatrix();      
        this.scene.translate(0,0.6,0);
        this.scene.scale(6, 0.1, 1); 
        this.cube.display();
        this.scene.popMatrix();
      
       //cilindro central
       this.scene.pushMatrix();
       this.scene.scale(0.6,0.6,4);
       this.wheel.display();
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
       this.scene.translate(0,0,-1);
       this.sphere.display();
       this.scene.popMatrix();

       //cylinder end
       this.scene.pushMatrix();
       this.scene.translate(0,0,3);
       this.scene.scale(0.3,0.3,0.3);
       this.wheel.display();
       this.scene.popMatrix();

       //tail end
       this.scene.pushMatrix();
       this.scene.translate(0,0.6,3);
       this.scene.rotate(Math.PI/2,0,1,0);
       this.scene.scale(1,0.7,0.7);
       this.triangle.display();
       this.invertedtriangle.display();
       this.scene.popMatrix();

    }
    

}
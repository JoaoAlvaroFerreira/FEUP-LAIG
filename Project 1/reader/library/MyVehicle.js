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

       
     /*   this.scene.rotate(this.angle, 0, 1, 0);
		this.scene.translate(-1.5, 0, 0); 
        this.scene.translate(0, 0.5, -1.1);

        this.scene.pushMatrix();
        this.scene.white.apply();
        this.scene.translate(-1, 0.3, 2.1);
        this.scene.rotate(90 * Math.PI / 180.0, 0, 1, 0);
        this.scene.scale(0.1, 0.1, 0.5);
        this.exhaust.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.vehicleAppearances[this.scene.currentAppearance].apply();
        this.scene.translate(1.61, 1.38, 1.25);
        this.scene.rotate(90 * Math.PI / 180.0, 0, 0, 1);
        this.scene.rotate(90 * Math.PI / 180.0, 1, 0, 0);
        this.scene.scale(1.25, 2.5, 0.5);
        this.triang.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.white.apply();
        this.scene.translate(-0.4, 0.5, -0.25);
        this.scene.rotate(45 * Math.PI / 180.0, 0, 0, 1);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.5, -0.25);
        this.scene.rotate(135 * Math.PI / 180.0, 0, 0, 1);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.68, -0.25);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(2.6, 0.5, -0.25);
        this.scene.rotate(45 * Math.PI / 180.0, 0, 0, 1);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.4, 0.5, -0.25);
        this.scene.rotate(135 * Math.PI / 180.0, 0, 0, 1);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3, 0.68, -0.25);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(2.6, 0.5, 2.75);
        this.scene.rotate(45 * Math.PI / 180.0, 0, 0, 1);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3.4, 0.5, 2.75);
        this.scene.rotate(135 * Math.PI / 180.0, 0, 0, 1);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.68, 2.75);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0.5, 2.75);
        this.scene.rotate(45 * Math.PI / 180.0, 0, 0, 1);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.5, 2.75);
        this.scene.rotate(135 * Math.PI / 180.0, 0, 0, 1);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3, 0.68, 2.75);
        this.scene.scale(0.53, 0.1, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        //light 1
        this.scene.pushMatrix();
        this.scene.gold.apply();
        this.scene.translate(4, 0.4, 0.4);
        this.scene.rotate(90 * Math.PI / 180.0, 0, 1, 0);
        this.scene.scale(0.3, 0.3, 0.3);
        this.circle.display();
        this.scene.rotate(180 * Math.PI / 180.0, 0, 1, 0);
        this.semi.display();
        this.scene.translate(3, 0, 0);
        this.scene.popMatrix();

        //light 2
        this.scene.pushMatrix();
        this.scene.translate(4, 0.4, 2);
        this.scene.rotate(90 * Math.PI / 180.0, 0, 1, 0);
        this.scene.scale(0.3, 0.3, 0.3);
        this.circle.display();
        this.scene.rotate(180 * Math.PI / 180.0, 0, 1, 0);
        this.semi.display();
        this.scene.popMatrix();

        //WindowsDoors
        this.scene.pushMatrix();
        this.scene.vehicleAppearances[this.scene.currentAppearance].apply();
        this.scene.scale(2.3, 2, 2.5);
        this.scene.translate(0.2, 0.5, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        //Hood
        this.scene.pushMatrix();
        this.scene.scale(2.2, 0.8, 2.5);
        this.scene.translate(1.2, 0.6, 0.5);
        this.cube.display();
        this.scene.popMatrix();

        //*lowerbody
        this.scene.pushMatrix();
        this.scene.white.apply();
        //this.scene.axleAppearance.apply();
        this.scene.translate(1.5, 0, 1.25);
        this.scene.scale(4.5, 0.3, 2.6);
        this.cube.display();
        this.scene.popMatrix();


        //WHEELS
        this.scene.pushMatrix();
        this.scene.scale(0.55, 0.55, 0.55);
        this.scene.rotate(180 * Math.PI / 180.0, 0, 1, 0);
		this.scene.rotate(this.rotationWheels*50*Math.PI/180,0,0,1);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
		
        this.scene.translate(3, 0, 0);
        this.scene.scale(0.55, 0.55, 0.55);
        this.scene.rotate(180 * Math.PI / 180.0, 0, 1, 0);
		this.scene.rotate(this.angleWheels*10*Math.PI/180,0,1,0);
		this.scene.rotate(this.rotationWheels*50*Math.PI/180,0,0,1);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(3, 0, 2.5);
        this.scene.scale(0.55, 0.55, 0.55);
		this.scene.rotate(this.angleWheels*10*Math.PI/180,0,1,0);
		this.scene.rotate(-this.rotationWheels*50*Math.PI/180,0,0,1);
        this.wheel.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();

        this.scene.translate(0, 0, 2.5);
        this.scene.scale(0.55, 0.55, 0.55);
		this.scene.rotate(-this.rotationWheels*50*Math.PI/180,0,0,1);
        this.wheel.display();
        this.scene.popMatrix();*/
		


    }
    

}
/**
 * MyUnitCubeQuad
 * @constructor
 */
var DEGREE_TO_RAD = Math.PI / 180;
class MyUnitCube extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

		this.quad = new MyQuad(this.scene,-0.5,-0.5,0.5,0.5,1,1);
	};

	display() 
	{
		// front face
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
		this.scene.rotate(180 * DEGREE_TO_RAD, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// top face
		this.scene.pushMatrix();
		this.scene.rotate(-90 * DEGREE_TO_RAD, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
		this.scene.rotate(90 * DEGREE_TO_RAD, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// right face
		this.scene.pushMatrix();
		this.scene.rotate(-90 * DEGREE_TO_RAD, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// left face
		this.scene.pushMatrix();
		this.scene.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();
	};
};

/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyUnitCube extends CGFobject
{
	constructor(scene)
	{
		super(scene);
		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
				0.5, 0.5, -0.5,   //+ x + y -z 0
				0.5, -0.5, -0.5,  //+ x - y -z 1
				-0.5, -0.5, -0.5, //- x - y -z 2
				-0.5, 0.5, -0.5,  //- x + y -z 3
				0.5, 0.5, 0.5,     //+ x + y +z 4
				0.5, -0.5, 0.5,   //+ x - y +z 5
				-0.5, -0.5, 0.5,  //- x - y +z 6
				-0.5, 0.5, 0.5   //- x + y +z 7
				];

		this.indices = [
				0, 1, 3,
				3, 1, 2,
				0,4,5,
				5,1,0,
				5,6,1,
				6,2,1,
				6,7,2,
				2,7,3,
				7,0,3,
				7,4,0,
				4,7,5,
				5,7,6
			];

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyQuad extends CGFobject
{
	constructor(scene,x1,y1, x2, y2,ls,lt)
	{
		super(scene);
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.ls=ls;
		this.lt=lt;
		this.initBuffers();

	};


	initBuffers()
	{
		this.vertices = [
			this.x1, this.y1, 0,
			this.x2, this.y1, 0,
			this.x1, this.y2, 0,
			this.x2, this.y2, 0
				];

		this.indices = [
				0, 1, 2,
				3, 2, 1,
				2, 3, 1,
				3, 0, 2,
				0, 2, 1

			];
		this.texCoords = [
				0,this.lt,
				this.ls,this.lt,
				0,0,
				this.ls,0
		];
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.normals = [
				0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1
				];
		this.initGLBuffers();
	};
};

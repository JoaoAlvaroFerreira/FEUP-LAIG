/**
 * MyQuad
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyQuad extends CGFobject
{
	//constructor(scene,minS = -0.5,minT = -0.5, maxS = 0.5, maxT = 0.5)
	constructor(scene,minS,minT, maxS, maxT)
	{
		super(scene);
		this.minS = minS;
		this.minT = minT;
		this.maxS = maxS
		this.maxT = maxT;
		this.initBuffers();

	};

	initBuffers()
	{
		this.vertices = [
				-0.5, -0.5, 0,
				0.5, -0.5, 0,
				-0.5, 0.5, 0,
				0.5, 0.5, 0
				];

		this.indices = [
				0, 1, 2,
				3, 2, 1,
				2, 3, 1,
				3, 0, 2,
				0, 2, 1

			];
		this.texCoords = [
				this.minS,this.minT,
				this.minS,this.maxT,
				this.maxS,this.minT,
				this.maxS,this.maxT
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

/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTriangle extends CGFobject
{
	constructor(scene,minS = 0,minT = 0, maxS = 1, maxT = 1)
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
				-0.5, 0.5, 0
				];

		this.indices = [
				0, 1, 2
			];
		this.texCoords = [
				this.minS,this.minT,
				this.maxS,this.minT,
				this.minS,this.maxT
		];
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.normals = [
				0, 0, 1,
				0, 0, 1,
				0, 0, 1
				];
		this.initGLBuffers();
	};
};

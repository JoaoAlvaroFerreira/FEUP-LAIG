/**
 * MyTriangle
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTriangle extends CGFobject
{
	constructor(scene,x1,y1,z1, x2, y2,z2,x3,y3,z3,minS,minT)
	{
		super(scene);
		this.x1=x1;
		this.x2=x2;
		this.x3=x3;
		this.y1=y1;
		this.y2=y2;
		this.y3=y3;
		this.z1=z1;
		this.z2=z2;
		this.z3=z3;
		this.minS=minS;
		this.minT=minT;
		this.initBuffers();

	};

	initBuffers()
	{
		this.vertices = [
				this.x1, this.y1, this.z1,
				this.x2, this.y2,this.z2,
				this.x3, this.y3, this.z3
				];

		this.indices = [
				0, 1, 2
			];
		this.texCoords = [
				0,this.minT,
				this.minS,this.minT,
				0,0,
				this.minS,0
				
		];
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.normals = [
				0, 0, 1,
				0, 0, 1,
				0, 0, 1
				];
		this.initGLBuffers();
	};
	updateTextureCoord(s,t){
		this.minS=s;
		this.minT=t;
		this.texCoords = [
			0,this.minT,
			this.minS,this.minT,
			0,0,
			this.minS,0
			
	];
	this.updateTexCoordsGLBuffers();
	};
};

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
		this.x = (x2-x1)/4;
		this.y = (y2-y1)/4; 
		this.ls=ls;
		this.lt=lt;
		this.initBuffers();

	};


	initBuffers()
	{
		this.vertices = [
			/*this.x1, this.y1, 0,
			this.x2, this.y1, 0,
			this.x1, this.y2, 0,
			this.x2, this.y2, 0*/
				];

		this.indices = [
				/*0, 1, 2,
				3, 2, 1,
				2, 3, 1,
				3, 0, 2,
				0, 2, 1*/

			];
		this.texCoords = [
				/*0,this.lt,
				this.ls,this.lt,
				0,0,
				this.ls,0*/
		];
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.normals = [
				/*0, 0, 1,
				0, 0, 1,
				0, 0, 1,
				0, 0, 1*/
				];

		for(var i=0;i<5;i++){
			for(var k=0; k<5;k++){
				this.vertices.push(this.x1+this.x*k,this.y1+this.y*i,0);
				this.normals.push(0,0,1);
				this.texCoords.push(this.ls/4*k,this.lt-this.lt/4*i);
			}
		}
		for(var i=0;i<4;i++){
			for(var k=0; k<4;k++){
				this.indices.push(k+5*i,k+5*i+1,k+5*i+5,k+5*i+6,k+5*i+5,k+5*i+1);
			}
		}
		
		this.initGLBuffers();

		

	};
	updateTextureCoord(s,t){
		this.ls=s;
		this.lt=t;
		this.texCoords = [];
		for(var i=0;i<5;i++){
			for(var k=0; k<5;k++){
				this.texCoords.push(this.ls/4*k,this.lt-this.lt/4*i);
			}
		}
		this.updateTexCoordsGLBuffers();
	};
};

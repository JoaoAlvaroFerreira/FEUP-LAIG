/**
 * MyPrism
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene,slices,stacks)
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();
	};

	initBuffers()
	{
		var v = 1/this.stacks;
		var angle = (360/this.slices)*(Math.PI/180);
		var t = 0;
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		for(var j = 0; j < 2*this.stacks; j++){
			for(var i = 0; i < 2*this.slices; i++){
				//desinhar um retangulo
					this.vertices.push(Math.cos(i*angle),Math.sin(i*angle),v*j); //ponto 0
					this.vertices.push(Math.cos(i*angle),Math.sin(i*angle),v*(j+1)); //ponto 1
					this.vertices.push(Math.cos((i+1)*angle),Math.sin((i+1)*angle),v*j); //ponto 2
					this.vertices.push(Math.cos((i+1)*angle),Math.sin((i+1)*angle),v*(j+1)); //ponto 3
					this.indices.push(t,t+2,t+1);
					this.indices.push(t+1,t+2,t+3);
					t+=2;//proxima face
					this.normals.push(Math.cos(i*angle),Math.sin(i*angle),v*j);//ponto 0
					this.normals.push(Math.cos(i*angle),Math.sin(i*angle),v*(j+1));//ponto 1
					this.normals.push(Math.cos(i*angle),Math.sin(i*angle),v*j);//ponto 2
					this.normals.push(Math.cos(i*angle),Math.sin(i*angle),v*(j+1));//ponto 3
				}
		}
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

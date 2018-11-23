class Plane extends CGFobject{

    constructor(scene, uDivs, vDivs){
		super(scene);
		this.u = uDivs;
	    this.v=vDivs;
		this.initBuffers();

	};


	initBuffers()
	{
		this.vertices = [];

		this.indices = [];
		this.texCoords = [];
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.normals = [];

		for(var i=0;i<=this.v;i++){
			for(var k=0; k<=this.u;k++){
				this.vertices.push(-this.u/2+k,0,-this.v/2+i);
				this.normals.push(0,0,1);
                //this.texCoords.push(this.ls/4*k,this.lt-this.lt/4*i);
                this.texCoords.push(k*1/this.u,i*1/this.v);
			}
		}
		for(var i=0;i<this.v;i++){
			for(var k=0; k<this.u;k++){
                this.indices.push(k+1+i*(this.v+1),k+i*(this.v+1),k+1+this.u+i*(this.v+1),
                k+this.u+2+i*(this.v+1),k+1+i*(this.v+1),k+1+this.u+i*(this.v+1));
			}
		}
		
		this.initGLBuffers();

		

	};

};
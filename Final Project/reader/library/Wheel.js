class Wheel extends CGFobject
{
	constructor(scene,slices,stacks) 
	{
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
        this.cilindro= new MyCylinder(this.scene,this.slices,this.stacks);
		this.cylinderTexture = new CGFtexture(this.scene,"./scenes/images/defaultRocks.jpg");

        this.material = new CGFappearance(this.scene);
   		this.material.setAmbient(0.5, 0.5, 0.5, 1);
		this.material.setDiffuse(0.2, 0.2, 0.2, 1);
		this.material.setSpecular(0.0, 0.0, 0.0, 1);	
        this.material.setShininess(1);
        this.material.setTexture(this.cylinderTexture);
		this.initBuffers();
	};

    display()
    {
		var degToRad=0.01745329251;
		this.scene.translate(0,0,-0.25);
		this.scene.pushMatrix();
	
            super.display();
		this.scene.popMatrix();
        this.scene.pushMatrix();
			this.material.apply();
            this.cilindro.display();
		this.scene.popMatrix();
		this.scene.pushMatrix();
			this.scene.translate(0,0,1);
			this.scene.rotate(180*degToRad,1,0,0);
	
            super.display();
		this.scene.popMatrix();
    }

	initBuffers() 
	{
		this.vertices=[];
		this.normals=[];
        this.indices=[];
		this.texCoords=[];
		var z=1;
		this.vertices.push(0,0,z);
		this.normals.push(0,0,z);
		this.texCoords.push(0.5,0.5);
		var angulo_adicionar=Math.PI*2/this.slices;
		var angulo=0;
		for(let i=0; i<this.slices;i++)
		{
			let x=Math.cos(angulo);
			let y=Math.sin(angulo);
			this.vertices.push(x,y,z);
			this.texCoords.push((x/2)+0.5,1-((y/2)+0.5));
			this.normals.push(0,0,z);
			angulo+=angulo_adicionar;
		}

		for(let i=1;i<=this.slices;i++)
		{
			if(i!=this.slices)
				this.indices.push(0,i,i+1);
			else
				this.indices.push(0,i,1);
		}


		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
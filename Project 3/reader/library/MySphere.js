

class MySphere extends CGFobject
{
	constructor(scene,radius,slices,stacks)
	{
		super(scene);
		this.radius = radius;
		this.slices = slices;
		this.stacks = stacks;
		this.initBuffers();

    };
    
    initBuffers() 
    {

    this.indices = [];
    this.vertices = [];
    this.normals = [];
    this.originalTexCoords = [];

    var dTheta = Math.PI / this.stacks;
    var dPhi = 2 * Math.PI / this.slices;

   for (var stack = 0; stack <= this.stacks; ++stack) {
       for (var slice = 0; slice <= this.slices; ++slice) {
           this.vertices.push(this.radius * Math.sin(stack * dTheta) * Math.cos(slice * dPhi), this.radius * Math.sin(stack * dTheta) * Math.sin(slice * dPhi), this.radius * Math.cos(stack * dTheta));
           this.normals.push(Math.sin(stack * dTheta) * Math.cos(slice * dPhi), Math.sin(stack * dTheta) * Math.sin(slice * dPhi), Math.cos(stack * dTheta));
           this.originalTexCoords.push(slice/this.slices, 1-stack/this.stacks);
       }
   }

   for (var stack = 0; stack < this.stacks; ++stack) {
       for (var slice = 0; slice < this.slices; ++slice) {
           this.indices.push(stack * (this.slices + 1) + slice, (stack + 1) * (this.slices + 1) + slice, (stack + 1) * (this.slices + 1) + slice + 1);
           this.indices.push(stack * (this.slices + 1) + slice, (stack + 1) * (this.slices + 1) + slice + 1, stack * (this.slices + 1) + slice + 1);
       }
   }

   this.texCoords = this.originalTexCoords.slice();

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
    };
};
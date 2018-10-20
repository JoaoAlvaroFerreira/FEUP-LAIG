/**
 * MyTorus
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTorus extends CGFobject
{
	constructor(scene,inner=0.2 ,outer=0.3 ,slices=16, loops=16)
	{
		super(scene);
		this.inner = inner;
		this.outer = outer;
		this.slices = slices;
		this.loops = loops;
		this.initBuffers();

	};

	initBuffers()
	{
        this.indices = [];
        this.vertices = [];
        this.normals = [];
        this.texCoords = [];
        var curvature = (2*Math.PI)/this.slices;
        var edginess = (2*Math.PI)/this.loops;
        
        for(var i = 0; i <= this.loops; i++){
            for(var j = 0; j <= this.slices; j++){
                var textureLoops = 1 - j * (1/this.loops);
                var textureSlides = 1 - j * (1/this.slides);
                this.texCoords.push(textureLoops, textureSlides)

                var theta = i * edginess;
                var phi = j * curvature;

                var xCoordinate = (this.outer + this.inner*Math.cos(theta)) * Math.cos(phi);
                this.vertices.push(xCoordinate);
                this.normals.push(xCoordinate);
                var yCoordinate = (this.outer + this.inner*Math.cos(theta)) * Math.sin(phi);
                this.vertices.push(yCoordinate);
                this.normals.push(yCoordinate);
                var zCoordinate = this.inner * Math.sin(theta);
                this.vertices.push(zCoordinate);
                this.normals.push(zCoordinate);

                

            }
        }
        
        for(var k = 0; k <= this.loops; k++){
            for(var l = 0; l<= this.slices; l++)
            {
                var x = k + k*this.slices + l;
                var y = x + this.slices;

                this.indices.push(x,y+2,y+1);
                this.indices.push(x,x+1,y+2);
            }
        }
        
        

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

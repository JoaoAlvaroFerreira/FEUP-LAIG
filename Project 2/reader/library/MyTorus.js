/**
 * MyTorus
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyTorus extends CGFobject
{
	constructor(scene,inner,outer,slices, loops)
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
       
        for(var i = 0; i <= this.loops; i++){

            var theta = i * 2 * Math.PI / this.loops;
            var sinTheta = Math.sin(theta);
            var cosTheta = Math.cos(theta);

            for (var k = 0; k <= this.slices; k++) {
                var phi = k * 2 * Math.PI / this.slices;    
                var sinPhi = Math.sin(phi);    
                var cosPhi = Math.cos(phi);    
    
    
                var x = (this.outer + (this.inner * cosTheta)) * cosPhi;    
                var y = (this.outer + (this.inner * cosTheta)) * sinPhi    
                var z = this.inner * sinTheta;    
                var s = 1 - (i / this.loops);    
                var t = 1 - (k / this.slices);    
    
    
                this.vertices.push(x, y, z);    
                this.normals.push(x, y, z);    
                this.texCoords.push(s, t);
            }


            /*for(var j = 0; j <= this.slices; j++){
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

                

            }*/
        }

        for (var k = 0; k < this.loops; k++) {
            for (var slice = 0; slice < this.slices; slice++) {    
                var first = (k * (this.slices + 1)) + slice;    
                var second = first + this.slices + 1;    
    
    
                this.indices.push(first, second + 1, second);    
                this.indices.push(first, first + 1, second + 1);
    
            }
    
        }
        
        /*for(var k = 0; k <= this.loops; k++){
            for(var l = 0; l<= this.slices; l++)
            {
                var x = k + k*this.slices + l;
                var y = x + this.slices;

                this.indices.push(x,y+2,y+1);
                this.indices.push(x,x+1,y+2);
            }
        }*/
        
        

		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};

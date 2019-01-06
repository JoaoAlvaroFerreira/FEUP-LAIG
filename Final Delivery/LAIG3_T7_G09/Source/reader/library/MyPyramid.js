/**
  * MyPyramid
  * @param gl {WebGLRenderingContext}
  * @constructor
  */
 
 class MyPyramid extends CGFobject
 {
 	constructor(scene,base,height)
 	{
 		super(scene);
         this.base = base;
         this.height = height;
 		this.initBuffers();
 
  	};
 
  	initBuffers()
 	{
 		this.vertices = [
                 this.base/2,0,this.base/2,
                 -this.base/2,0,this.base/2,
                 -this.base/2,0,-this.base/2,
                 this.base/2,0,-this.base/2,
 				0,this.height,0
 				];
 
  		this.indices = [
                 0, 4, 1,
                 1,4,2,
                 2,4,3,
                 3,4,0
 			];
 		this.texCoords = [
 				0,1,
 				1,1,
 				0,1,
                 1,1,
                 0,0            
 
  		];
 		this.primitiveType=this.scene.gl.TRIANGLES;
 		this.normals = [
 				1, 1, 1,
 				-1, 1, 1,
                 -1, 1, -1,
                 1, 1, -1,
                 0, 1, 0
 				];
 		this.initGLBuffers();
 	};
 
  };

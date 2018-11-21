/**
 * CircularAnimation
 * @constructor
 */

class CircularAnimation extends Animation
{
	constructor(scene,id, span, centerX, centerY,centerZ, radius, startAng, rotAng)
	{
		super(scene);
		this.id = id;
		this.span = span;
		this.centerX = centerX;
		this.centerY = centerY;
		this.centerZ = centerZ;
		this.radius = radius;
		this.startAng = startAng;
		this.rotAng = rotAng;
		this.currentAng = startAng;
		this.angularSpeed = 0;
		this.time = 0;

    };
    
    applyMatrix(){
		var matrix = mat4.create();
		mat4.identity(matrix);

		if(this.rotAng >= 0){

		this.angularSpeed = this.rotAng/this.span;
		this.currentAng = this.angularSpeed * this.time;
		
	
	  
		mat4.translate(matrix, matrix, [this.centerX, this.centerY, this.centerZ]);
		mat4.rotate(matrix, matrix, this.currentAng, [0, 1, 0]);
		mat4.translate(matrix, matrix, [this.radius, 0, 0]);

		}
		else if(this.rotAng < 0){
		

		this.angularSpeed = -this.rotAng/this.span;
		this.currentAng = this.angularSpeed * this.time;
		
	
	  
		mat4.translate(matrix, matrix, [this.centerX, this.centerY, this.centerZ]);
		mat4.rotate(matrix, matrix, this.currentAng, [0, -1, 0]);
		mat4.translate(matrix, matrix, [this.radius, 0, 0]);
		}
		return matrix;

    };


	
	update(deltaTime){
		this.time = deltaTime;
	};
};

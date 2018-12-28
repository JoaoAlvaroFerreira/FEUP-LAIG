var DEGREE_TO_RAD = Math.PI / 180;

class CameraAnimation extends Animation
{
	constructor(scene,currentCamera)
	{
		super(scene);
		this.scene.cameras[7]=this.scene.cameras[currentCamera];
		this.player=this.scene.currentCamera;
		this.scene.currentCamera=7;
		if(this.player==3){
			this.position = [9,10,0];
			this.target = [1,0,0];
		}
		this.time = 0;

    };
    
    applyMatrix(){
		var matrix = mat4.create();
		mat4.identity(matrix);
		if(this.rotAng>=this.rotAng/this.span*this.time && this.rotAng>=0){
		
		this.angularSpeed = this.rotAng/this.span;
		this.currentAng = this.angularSpeed * this.time;
		
	
	  
		mat4.translate(matrix, matrix, [this.centerX, this.centerY, this.centerZ]);
		mat4.rotate(matrix, matrix, DEGREE_TO_RAD*this.currentAng, [0, 1, 0]);
		mat4.translate(matrix, matrix, [this.radius, 0, 0]);
		return matrix;
		}
		
		else if(this.rotAng < 0 && this.rotAng<=this.rotAng/this.span*this.time){
		

		this.angularSpeed = -this.rotAng/this.span;
		this.currentAng = this.angularSpeed * this.time;
		
	
	  
		mat4.translate(matrix, matrix, [this.centerX, this.centerY, this.centerZ]);
		mat4.rotate(matrix, matrix, DEGREE_TO_RAD*this.currentAng, [0, -1, 0]);
		mat4.translate(matrix, matrix, [this.radius, 0, 0]);
		
		return matrix;
	
	}
	else {
		var matrix = mat4.create();
		mat4.identity(matrix);
		mat4.translate(matrix, matrix, [this.centerX, this.centerY, this.centerZ]);
		mat4.rotate(matrix, matrix, DEGREE_TO_RAD*this.rotAng, [0, 1, 0]);
		mat4.translate(matrix, matrix, [this.radius, 0, 0]);
		return matrix;
	}
    };


	
	update(deltaTime){
		this.time = deltaTime;
		
	};
};

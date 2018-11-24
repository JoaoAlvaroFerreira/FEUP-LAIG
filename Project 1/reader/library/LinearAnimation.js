/**
 * LinearAnimation
 * @constructor
 */

class LinearAnimation extends Animation
{
	constructor(scene,id, span, pointList)
	{  
       super(scene);
        this.id = id;
        this.span = span;
        this.pointList = pointList;
        this.vectors = [];
        this.vectorLenghts = [];
        this.vectorSpans = [];
        this.progress = 0;
        this.speed = 0;
        this.totalDistance = [];
        this.time = 0;
        this.timePerAnimation = this.span/(pointList.length-1);
        
        this.pointConversion();
        this.calcSpeed();

	};

 

    pointConversion(){

        var aux = 0
        var auxDistance = [0,0,0];

        while(this.pointList.length != aux+1){

            var x = this.pointList[aux+1][0] - this.pointList[aux][0];
            var y = this.pointList[aux+1][1] - this.pointList[aux][1];
            var z = this.pointList[aux+1][2] - this.pointList[aux][2];

            auxDistance = [x,y,z];

            
            this.vectors.push(auxDistance);
            aux++;
            
        }
    };

    

    applyMatrix(){
       
 
            var aux = Math.floor(this.time/this.timePerAnimation);
            if(aux<this.pointList.length-1){
                var dx = this.vectorSpans[aux][0]*(this.time-aux*this.timePerAnimation)+this.pointList[aux][0];
                var dy = this.vectorSpans[aux][1]*(this.time-aux*this.timePerAnimation)+this.pointList[aux][1];
                var dz = this.vectorSpans[aux][2]*(this.time-aux*this.timePerAnimation)+this.pointList[aux][2];
                var translation = [dx, dy, dz];
                var dest = mat4.create();
                mat4.translate(dest, dest, translation);
                return dest;
            }
            else {
                var dx = this.pointList[this.pointList.length-1][0];
                var dy = this.pointList[this.pointList.length-1][1];
                var dz = this.pointList[this.pointList.length-1][2];
                var translation = [dx, dy, dz];
                var dest = mat4.create();
                mat4.translate(dest, dest, translation);
                return dest;
            }
    };

    calcSpeed(){
        

        
        for(var i = 1; i< this.pointList.length;i++){
            this.vectorSpans.push([(this.pointList[i][0]-this.pointList[i-1][0])/this.timePerAnimation,
            (this.pointList[i][1]-this.pointList[i-1][1])/this.timePerAnimation,(this.pointList[i][2]-this.pointList[i-1][2])/this.timePerAnimation]);
        }
    };
	
	update(currTime){
        
        this.time = currTime;
           

	};
};

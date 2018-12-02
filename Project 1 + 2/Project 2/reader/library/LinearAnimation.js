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
        this.time = 0;
        this.timePerAnimation = this.span/(pointList.length-1);
        this.times = [];
        this.distances = [];
        this.pointConversion();
        this.totalDistance();
        this.calcSpeed();

	};

    totalDistance(){
        var totalDistances = 0;
        for(var i = 0; i< this.vectors.length; i++){
            this.distances.push(Math.sqrt(Math.abs(this.vectors[i][0])) + Math.sqrt(Math.abs(this.vectors[i][1])) + Math.sqrt(Math.abs(this.vectors[i][2])));
            totalDistances += Math.sqrt(Math.abs(this.vectors[i][0])) + Math.sqrt(Math.abs(this.vectors[i][1])) + Math.sqrt(Math.abs(this.vectors[i][2]));
        }
        for(var i = 0; i< this.distances.length;i++){
            this.times.push(this.distances[i]/totalDistances*this.span);
        }
        

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
            var aux = 0;
            var timesSum = 0;
            var previousTimeSum = 0;
            var validation = false;
            for(var i = 0; i< this.times.length; i++){
                previousTimeSum = timesSum;
                timesSum+=this.times[i];
                if(timesSum>=this.time){
                    validation = true;
                    aux=i;
                    break;
                }
            }
            
            if(validation){
                var dx = this.vectorSpans[aux][0]*(this.time-previousTimeSum)+this.pointList[aux][0];
                var dy = this.vectorSpans[aux][1]*(this.time-previousTimeSum)+this.pointList[aux][1];
                var dz = this.vectorSpans[aux][2]*(this.time-previousTimeSum)+this.pointList[aux][2];
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
            this.vectorSpans.push([(this.pointList[i][0]-this.pointList[i-1][0])/this.times[i-1],
            (this.pointList[i][1]-this.pointList[i-1][1])/this.times[i-1],(this.pointList[i][2]-this.pointList[i-1][2])/this.times[i-1]]);
        }
    };
	
	update(currTime){
        
        this.time = currTime;
           

	};
};

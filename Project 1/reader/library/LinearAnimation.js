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
       
           /* if(this.time == this.vectorSpans[this.progress]){
                this.time = 0;
                this.progress++;
            }

            if(this.progress > this.vectors.length-1){
                var matrix = mat4.create();
                return mat4.identity(matrix);
            }

            var dX = this.vectors[this.progress][0]*this.time;
            var dY = this.vectors[this.progress][1]*this.time;
            var dZ = this.vectors[this.progress][2]*this.time;
        
            //console.log(this.time);
            var translation = vec3.fromValues(dX, dY, dZ);
            var dest = mat4.create();
            //mat4.fromTranslation(translationMatrix, translation);
            mat4.translate(dest, dest, translation);
            //console.log(dest);
            return dest; */

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
        
        
       /* for(var i = 0; i < this.vectors.length; i++)
        {
            this.vectorLenghts.push(Math.sqrt(Math.abs(this.vectors[i][0])), + Math.sqrt(Math.abs(this.vectors[i][1])), + Math.sqrt(Math.abs(this.vectors[i][2])));
            if(this.vectors[i][0]>=0) this.totalDistanceX += Math.sqrt(Math.abs(this.vectors[i][0]));
            else this.totalDistanceX += -Math.sqrt(Math.abs(this.vectors[i][0]));
            if(this.vectors[i][1]>=0) this.totalDistanceX += Math.sqrt(Math.abs(this.vectors[i][1]));
            else this.totalDistanceX += -Math.sqrt(Math.abs(this.vectors[i][1]));
            if(this.vectors[i][2]>=0) this.totalDistanceX += Math.sqrt(Math.abs(this.vectors[i][2]));
            else this.totalDistanceX += -Math.sqrt(Math.abs(this.vectors[i][2]));
        }
        this.speed = this.totalDistance/this.span;

        for(var j = 0; j < this.vectors.length; j++){
            this.vectorSpans.push(this.vectorLenghts[j]/this.speed);
        }*/
        for(var i = 1; i< this.pointList.length;i++){
            this.vectorSpans.push([(this.pointList[i][0]-this.pointList[i-1][0])/this.timePerAnimation,
            (this.pointList[i][1]-this.pointList[i-1][1])/this.timePerAnimation,(this.pointList[i][2]-this.pointList[i-1][2])/this.timePerAnimation]);
        }
    };
	
	update(currTime){
        
        this.time = currTime;
           

	};
};

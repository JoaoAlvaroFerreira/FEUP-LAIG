/**
 * LinearAnimation
 * @constructor
 */

class LinearAnimation extends Animation
{
	constructor(id, span, pointList)
	{  
       super();
        this.id = id;
        this.span = span;
        this.pointList = pointList;
        this.vectors = [];
        this.vectorLenghts = [];
        this.vectorSpans = [];
        this.progress = 0;
        this.speed = 0;
        this.totalDistance = 0;
        this.time = 0;
        
        this.pointConversion();
        this.calcSpeed();

	};

 

    pointConversion(){

        var aux = 0
        var auxDistance = [0,0,0];

        while(this.pointList.length != aux+1){

            var x = this.pointList[aux+1][0] - this.pointList[aux][0];
            var y = this.pointList[aux+1][0] - this.pointList[aux][0];
            var z = this.pointList[aux+1][0] - this.pointList[aux][0];

            auxDistance = [x,y,z];

            
            this.vectors.push(auxDistance);
            aux++;
            
        }
    };

    

    applyMatrix(){
       

        if(this.time == this.vectorSpans[this.progress]){
            this.time = 0;
            this.progress++;
        }

        if(this.progress > this.vectors.length){
            var matrix = mat4.create();
            return mat4.identity(matrix);
        }

        var dX = this.vectors[this.progress][0]*this.time;
        var dY = this.vectors[this.progress][1]*this.time;
        var dZ = this.vectors[this.progress][2]*this.time;
        
        console.log(this.time);
        var translation = vec3.fromValues(dX, dY, dZ);
        var dest = mat4.create();
        //mat4.fromTranslation(translationMatrix, translation);
        mat4.translate(dest, dest, translation);
        console.log(dest);
        return dest;



    };

    calcSpeed(){
        
        
        for(var i = 0; i < this.vectors.length; i++)
        {
            this.vectorLenghts.push(Math.sqrt(this.vectors[i][0]) + Math.sqrt(this.vectors[i][1]) + Math.sqrt(this.vectors[i][2]));
            this.totalDistance += Math.sqrt(this.vectors[i][0]) + Math.sqrt(this.vectors[i][1]) + Math.sqrt(this.vectors[i][2]);
        }

        this.speed = this.totalDistance/this.span;

        for(var j = 0; j < this.vectors.length; j++){
            this.vectorSpans.push(this.vectorLenghts/this.speed);
        }
        
    };
	
	update(currTime){
        this.time = currTime;
        
        

	};
};

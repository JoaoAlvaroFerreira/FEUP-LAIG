/**
 * LinearAnimation
 * @constructor
 */

class LinearAnimation extends Animation
{
	constructor(id, span)
	{  
        this.id = id;
        this.span = span;
        this.pointList = [];
        this.vectors = [];
        this.vectorLenghts = [];
        this.vectorSpans = [];
        this.progress = 0;
        this.speed = 0;
        this.totalDistance = 0;
        this.time = 0;

	};

    addCenterPoint(x,y,z){
        var point = [x,y,z];
        this.pointList.add(point);
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

    

    apply(){
       

        if(this.time == vectorSpans[progress]){
            this.time = 0;
            this.progress++;
        }

        if(this.progress > this.vectors.length){
            var matrix = mat4.create();
            return mat4.identity(matrix);
        }

        var dX = this.vectors[progress][0]*this.time;
        var dX = this.vectors[progress][1]*this.time;
        var dX = this.vectors[progress][2]*this.time;
        
        
        var translation = vec3.fromValues(dX, dY, dZ);
        var translationMatrix = mat4.fromTranslation(mat4.create(), translation);
        return translationMatrix;


    };

    calcSpeed(){
        
        
        for(var i = 0; i < this.vectors.length; i++)
        {
            this.vectorLenghts.push(sqrt(this.vectors[i][0]) + sqrt(this.vectors[i][1]) + sqrt(this.vectors[i][2]));
            this.totalDistance += sqrt(this.vectors[i][0]) + sqrt(this.vectors[i][1]) + sqrt(this.vectors[i][2]);
        }

        this.speed = this.totalDistance/this.span;

        for(var j = 0; j < this.vectors.length; j++){
            this.vectorSpans.push(this.vectorLenghts/this.speed);
        }
        
    };
	
	update(deltaTime){
        this.time += deltaTime;
        
        

	};
};

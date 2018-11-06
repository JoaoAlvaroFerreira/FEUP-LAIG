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
        this.betweenPoints = [];
        this.progress;
        this.speed;
        this.totalDistance = 0;

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

            
            this.betweenPoints.push(auxDistance);
            aux++;
            
        }
    };

    

    apply(deltaTime){
        var matrix = mat4.create();
        mat4.identity(matrix);


        matrix.translate(matrix,matrix, tempPoint[0],tempPoint[1],tempPoint[2]);
        return matrix;



    };

    calcSpeed(){
        

        for(var i = 0; i < this.betweenPoints.length; i++)
        {
            this.totalDistance += sqrt(this.betweenPoints[i][0]) + sqrt(this.betweenPoints[i][1]) + sqrt(this.betweenPoints[i][2]);
        }

        this.speed = this.totalDistance/this.span;
    };
	
	update(){
        
        

	};
};

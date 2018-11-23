/**
 * MyCylinder
 * @param gl {WebGLRenderingContext}
 * @constructor
 */

class MyCylinder2 extends CGFobject
{
	constructor(scene,slices,stacks,base,top,height)
	{
		super(scene);
		this.slices = slices;
        this.stacks = stacks;
        this.base = base;
        this.top = top;
        this.height = height;
        this.surface = [];
        this.calc();
        this.nurbsSurface = new CGFnurbsSurface(this.slices, this.stacks, this.surface);
		this.obj = new CGFnurbsObject(this.scene, this.slices, this.stacks, this.nurbsSurface ); 
	};

	calc()
	{
        this.spot = [];
        var angle = (360/this.slices)*(Math.PI/180);
        var stack = this.height/this.stacks;
        var radiusDecrease = (this.base-this.top)/this.stacks;
		this.vertices = [];
		this.indices = [];
		this.normals = [];
		this.texCoords = [];
        for(var j = 0; j <= this.slices+1; j++){
            this.spot=[];
			for(var i = this.stacks; i >= 0; i--){
                this.spot.push([(this.base-i*radiusDecrease)*Math.cos(j*angle), i*stack,
                 (this.base-i*radiusDecrease)*Math.sin(j*angle),1]);
                    
            }
            this.surface.push(this.spot);
		}

    };
    display(){
		this.obj.display();
	};
};

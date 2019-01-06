class Patch extends CGFobject{

    constructor(scene,uDivs,vDivs, uPoints, vPoints){
		super(scene);
		this.uPt = uPoints;
		this.vPt = vPoints;
		this.u = uDivs;
		this.v=vDivs;
		this.surface = []
		this.calc();
		this.nurbsSurface = new CGFnurbsSurface(this.u, this.v, this.surface);
		this.obj = new CGFnurbsObject(this.scene, this.uPt, this.vPt, this.nurbsSurface ); 

	};


	calc()
	{
		this.spot = [];
		

		for(var i=0;i<=this.u;i++){
			this.spot=[];
			for(var k=this.v; k>=0;k--){
				this.spot.push([-this.u/2+i,0,-this.v/2+k,1]);
			}
			this.surface.push(this.spot);
		}

	

	};

	display(){
		this.obj.display();
	};
};
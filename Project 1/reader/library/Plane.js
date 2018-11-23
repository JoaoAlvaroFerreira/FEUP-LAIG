class Plane extends CGFobject{

    constructor(scene, uDivs, vDivs){
		super(scene);
		this.u = uDivs;
		this.v=vDivs;
		this.surface = []
		this.calc();
		this.nurbsSurface = new CGFnurbsSurface(this.u, this.v, this.surface);
		this.obj = new CGFnurbsObject(this.scene, 20, 20, this.nurbsSurface ); 

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
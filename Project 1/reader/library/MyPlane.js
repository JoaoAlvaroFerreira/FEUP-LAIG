class MyPlane extends CGFobject{

    constructor(scene, uDivs, vDivs){
		super(scene);
		this.u = uDivs;
		this.v = vDivs;
		this.surface = [	// U = 0
            [ // V = 0..1;
                 [-0.5, 0, -0.5, 1 ],
                 [-0.5,  0, 0.5, 1 ]
                
            ],
            // U = 1
            [ // V = 0..1
                 [ 0.5, 0, -0.5, 1 ],
                 [ 0.5, 0, 0.5, 1 ]							 
            ]
        ];

		this.nurbsSurface = new CGFnurbsSurface(1, 1, this.surface);
		this.obj = new CGFnurbsObject(this.scene, this.u, this.v, this.nurbsSurface ); 

	};


	display(){
		this.obj.display();
	};
};
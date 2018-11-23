class MyWings extends CGFobject{

   /* constructor(scene){
		super(scene);
		this.surface = [
            [
                [-3,0,0,1],
                [-3,0,1,1]
            ],
            [
                [-2.5,0,0,1],
                [-2.5,0,1,1]
            ],
            [
                [-1,0,0,1],
                [-1,0,1,1]
            ],
            [
                [0,0,0,1],
                [0,0,1,1]
            ]
        ];
           
		this.nurbsSurface = new CGFnurbsSurface(8, 1, this.surface);
		this.obj = new CGFnurbsObject(this.scene, 20, 20, this.nurbsSurface ); 

	};*/



	display(){
		this.obj.display();
	};
};
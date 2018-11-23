class MyWings extends CGFobject{

    constructor(scene){
		super(scene);
		this.surface = [
            [
                [-3,0.3,1.7,1],
                [-3,0.3,1.3,1]               
            ],
            [
                [-2.5,0,1,1],
                [-2.5,0,0,1]         
            ],
            [
                [-1,0,1,1],
                [-1,0,0,1]            
            ],
            [
                [0,0.4,1.5,1],
                [0,0.4,0,1]
                
            ],
            [
                [0.6,0.4,1.5,1],
                [0.6,0.4,0,1]
                
            ],
            [
                [1.6,0,1,1],
                [1.6,0,0,1]           
            ],
            [
                [3.1,0,1,1],
                [3.1,0,0,1]            
            ],
            [
                [3.6,0.3,1.7,1],
                [3.6,0.3,1.3,1]
            ]
            
        ];

        this.surfaceInverted = [
            [
               
                [-3,0.3,1.3,1],
                [-3,0.3,1.7,1]
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
                [0,0.4,0,1],
                [0,0.4,1.5,1]
                
            ],
            [
                [0.6,0.4,0,1],
                [0.6,0.4,1.5,1]
                
            ],
            [
                [1.6,0,0,1],
                [1.6,0,1,1]                
            ],
            [
                [3.1,0,0,1],
                [3.1,0,1,1]                
            ],
            [
                [3.6,0.3,1.3,1],
                [3.6,0.3,1.7,1]
            ]
            
        ];
           
		this.nurbsSurface = new CGFnurbsSurface(7, 1, this.surface);
        this.obj = new CGFnurbsObject(this.scene, 6, 2, this.nurbsSurface ); 
        this.nurbsSurface2 = new CGFnurbsSurface(7, 1, this.surfaceInverted);
		this.obj2 = new CGFnurbsObject(this.scene, 6, 2, this.nurbsSurface2 ); 

	};



	display(){
        this.obj.display();
        this.obj2.display();
	};
};
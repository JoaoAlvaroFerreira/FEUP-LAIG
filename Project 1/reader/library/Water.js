class Water extends Plane{
    
    constructor(scene, idTexture, idwavemap, divs, heightscale,texscale){
		super(scene, divs, divs);
		
	};

    

	display(){
        this.scene.setActiveShader(this.scene.terrainShader);
        this.scene.pushMatrix();
        this.scene.testTexture.bind(0);
        this.scene.translate(15,10,15);
        //var appMatrixCircular = this.scene.circularAnimation.applyMatrix();
       // var appMatrixLinear = this.scene.linearAnimation.applyMatrix();
        //this.scene.multMatrix(appMatrixCircular);
        this.obj.display();
         this.scene.popMatrix();
         this.scene.setActiveShader(this.scene.defaultShader);
		
    };
    
    
};
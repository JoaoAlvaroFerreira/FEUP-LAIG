class Terrain extends Plane{
    
    constructor(scene, idTexture, idheightmap, divs, heightscale){
		super(scene, divs, divs);
		this.scene.initShaders(idTexture, idheightmap, heightscale);
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
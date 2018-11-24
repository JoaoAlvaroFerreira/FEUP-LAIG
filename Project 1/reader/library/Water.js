class Water extends Plane{
    
    constructor(scene, idTexture, idwavemap, divs, heightscale,texscale){
        super(scene, divs, divs);

        this.texscale=texscale;
        this.heightscale=heightscale;
 
        this.waterShader = new CGFshader(this.scene.gl, "./library/water.vert", "./library/water.frag");
        this.waterTexture = new CGFtexture(this.scene, "./scenes/images/"+ idTexture +".jpg");
        this.shaderTexture = new CGFtexture(this.scene, "./scenes/images/"+ idwavemap +".jpg");
        this.waterShader.setUniformsValues({uSampler2: 1});
        this.waterShader.setUniformsValues({normScale: this.heightscale});
        this.waterShader.setUniformsValues({textureScale: this.texscale});
        this.waterShader.setUniformsValues({timeFactor: this.scene.deltaTime/50});

        this.water = new CGFappearance(this.scene);
   		this.water.setAmbient(0.3, 0.3, 0.3, 1);
		this.water.setDiffuse(0.7, 0.7, 0.7, 1);
		this.water.setSpecular(0.0, 0.0, 0.0, 1);	
        this.water.setShininess(120);
        this.water.setTexture(this.waterTexture);
		
	};

    

    display(){
        this.water.apply();
        this.scene.setActiveShader(this.waterShader);
        this.waterTexture.bind(1);
        this.scene.pushMatrix();
        this.scene.translate(-22.5,0,22.5);
        this.scene.scale(45,1,45);
         this.obj.display();
         this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
		
    };

    updateShader(){
       this.waterShader.setUniformsValues({timeFactor: this.scene.deltaTime/50});
    };
    
    
};
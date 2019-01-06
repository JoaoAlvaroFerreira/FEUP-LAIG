class Terrain extends Plane{
    
    constructor(scene, idTexture, idheightmap, divs, heightscale){
        super(scene, divs, divs);
        this.heightscale=heightscale;
        this.terrainShader = new CGFshader(this.scene.gl, "./library/terrain.vert", "./library/terrain.frag");
        this.terrainTexture = new CGFtexture(this.scene, "./scenes/images/"+ idTexture +".jpg");
        this.shaderTexture = new CGFtexture(this.scene, "./scenes/images/"+ idheightmap +".jpg");
        this.terrainShader.setUniformsValues({uSampler2: 1});
        this.terrainShader.setUniformsValues({normScale: this.heightscale});
 

        this.terrain = new CGFappearance(this.scene);
   		this.terrain.setAmbient(0.3, 0.3, 0.3, 1);
		this.terrain.setDiffuse(0.7, 0.7, 0.7, 1);
		this.terrain.setSpecular(0.0, 0.0, 0.0, 1);	
        this.terrain.setShininess(120);
        this.terrain.setTexture(this.terrainTexture);
	};


    
    

	display(){
        this.terrain.apply();
        this.scene.setActiveShader(this.terrainShader);
        this.shaderTexture.bind(1);
        this.scene.pushMatrix();
        this.scene.translate(-19.5,0,19.5);
        this.scene.scale(40,1,40);
         this.obj.display();
         this.scene.popMatrix();
        this.scene.setActiveShader(this.scene.defaultShader);
		
    };
    
    
};
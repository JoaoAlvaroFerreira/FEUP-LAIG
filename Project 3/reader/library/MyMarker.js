/**
 * MyMarker
 * @constructor
 */
var DEGREE_TO_RAD = Math.PI / 180;
class MyMarker extends CGFobject
{
	constructor(scene) 
	{
		super(scene);

        this.quad = new MyQuad(this.scene,-0.5,-0.5,0.5,0.5,1,1);
        
        this.defaultTexture = new CGFtexture(this.scene,"./scenes/images/score/marker.jpg");

        //Numbers texture loadings
        this.T0 = new CGFtexture(this.scene,"./scenes/images/score/0.jpg");
        this.T1 = new CGFtexture(this.scene,"./scenes/images/score/1.jpg");
        this.T2 = new CGFtexture(this.scene,"./scenes/images/score/2.jpg");
        this.T3 = new CGFtexture(this.scene,"./scenes/images/score/3.jpg");
        this.T4 = new CGFtexture(this.scene,"./scenes/images/score/4.jpg");
        this.T5 = new CGFtexture(this.scene,"./scenes/images/score/5.jpg");
        this.T6 = new CGFtexture(this.scene,"./scenes/images/score/6.jpg");
        this.T7 = new CGFtexture(this.scene,"./scenes/images/score/7.jpg");
        this.T8 = new CGFtexture(this.scene,"./scenes/images/score/8.jpg");
        this.T9 = new CGFtexture(this.scene,"./scenes/images/score/9.jpg");
        this.times=[
            this.T0, this.T1, this.T2,
            this.T3, this.T4, this.T5,
            this.T6, this.T7, this.T8,
            this.T9
        ];
        this.black = new CGFtexture(this.scene,"./scenes/images/score/black.jpg");

        this.defaultMaterial = new CGFappearance(this.scene);
   		this.defaultMaterial.setAmbient(0.3, 0.3, 0.3, 1);
		this.defaultMaterial.setDiffuse(0.7, 0.7, 0.7, 1);
		this.defaultMaterial.setSpecular(0.3, 0.3, 0.3, 1);	
        this.defaultMaterial.setShininess(1);
        this.defaultMaterial.setTexture(this.defaultTexture);
        
        
	};

	display() 
	{   
        this.defaultMaterial.apply();
		// front face
		this.scene.pushMatrix();
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
		this.scene.rotate(180 * DEGREE_TO_RAD, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// top face
		this.scene.pushMatrix();
		this.scene.rotate(-90 * DEGREE_TO_RAD, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// back face
		this.scene.pushMatrix();
		this.scene.rotate(90 * DEGREE_TO_RAD, 1, 0, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

		// right face
		this.scene.pushMatrix();
		this.scene.rotate(-90 * DEGREE_TO_RAD, 0, 1, 0);
		this.scene.translate(0, 0, 0.5);
		this.quad.display();
		this.scene.popMatrix();

        // MARKER

        if(this.scene.timer==true && this.scene.deltaTime-this.scene.timerTime>Number(this.scene.Timer) && 
        ((this.scene.Player2!='ai' && this.scene.currentCamera==3)||(this.scene.Player1!='ai' && this.scene.currentCamera==4))){
            this.scene.timer=false;
            this.scene.show=true;
        }

        if(this.scene.timer==true) {
            this.roundTime=Math.round(Number(this.scene.Timer)-(this.scene.deltaTime-this.scene.timerTime));
            if(this.roundTime<0) this.defaultMaterial.setTexture(this.black);
            else if(this.roundTime<10)  this.defaultMaterial.setTexture(this.times[this.roundTime]);
            else {
            this.number = this.roundTime.toString();
            
            var digit = this.number.charAt(1);
            this.defaultMaterial.setTexture(this.times[digit]);
            }
        }
        else {
            this.defaultMaterial.setTexture(this.times[Number(this.scene.Timer.charAt(1))]);
        }
        this.defaultMaterial.apply();
        //SECONDS
		this.scene.pushMatrix();
		this.scene.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
        this.scene.translate(1/3, 0, 0.5);
        this.scene.scale(1/3,1,1);
		this.quad.display();
        this.scene.popMatrix();

        if(this.scene.timer==true) {
            if(this.roundTime<10)  this.defaultMaterial.setTexture(this.black);
            else {
            var digit = this.number.charAt(0);
            this.defaultMaterial.setTexture(this.times[digit]);
            }
        }
        else {
            this.defaultMaterial.setTexture(this.times[Number(this.scene.Timer.charAt(0))]);
        }

        this.defaultMaterial.apply();
        //10XSECONDS
        this.scene.pushMatrix();
		this.scene.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
        this.scene.translate(0, 0, 0.5);
        this.scene.scale(1/3,1,1);
		this.quad.display();
        this.scene.popMatrix();
        
        if(this.scene.currentCamera==3)  {
            if(this.scene.P1Victory>9) this.scene.P1Victory=0;
            this.defaultMaterial.setTexture(this.times[this.scene.P1Victory]);
        }
        else {
            if(this.scene.P2Victory>9) this.scene.P2Victory=0;
            this.defaultMaterial.setTexture(this.times[this.scene.P2Victory]);
        }
        this.defaultMaterial.apply();
        //SCORE
        
        this.scene.pushMatrix();
		this.scene.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
        this.scene.translate(-1/3, 0.15, 0.5);
        this.scene.scale(1/3,0.7,1);
		this.quad.display();
        this.scene.popMatrix();
        
        this.defaultMaterial.setTexture(this.black);
        this.defaultMaterial.apply();
        this.scene.pushMatrix();
		this.scene.rotate(90 * DEGREE_TO_RAD, 0, 1, 0);
        this.scene.translate(-1/3, -0.35, 0.5);
        this.scene.scale(1/3,0.3,1);
		this.quad.display();
        this.scene.popMatrix();

        this.defaultMaterial.setTexture(this.defaultTexture);
	};
};


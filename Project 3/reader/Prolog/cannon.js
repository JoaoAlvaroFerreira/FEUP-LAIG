var DEGREE_TO_RAD = Math.PI / 180;
class Cannon{

    constructor(scene){
       
        this.scene = scene;
        this.actualBoard = null;
        this.pos=100;
        this.coordinates=[null,null];
        this.newCoordinates=[null,null];

        this.board = [[32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32]];
        this.player1capture = 0;
        this.player2capture = 0;

        //são definidos no start game, para mudanças na UI não alterarem o jogo
        this.player1 = null;
        this.player2 = null;
        this.difficulty = null;

        this.whitePiece = new Wheel(this.scene, 16,10,"defaultRocks");
        this.blackPiece = new Wheel(this.scene, 16,10,"defaultRocks2");
        this.selectedPiece = new Wheel(this.scene, 16,10,"defaultYellow");
        this.capturePiece = new Wheel(this.scene, 16,10,"defaultBlue");
        this.shootPiece = new Wheel(this.scene, 16,10,"defaultRed");
        this.newPiece = new Wheel(this.scene, 16,10,"defaultGreen");
        this.whiteCity = new MyCity(this.scene,"defaultRocks");
        this.blackCity = new MyCity(this.scene, "defaultRocks2");

        //animations
        this.oneMove=false;
        this.twoMove=false;
        this.newPos=null;
        this.animationPoints=[null,null];
        this.initialLiteralCoordinates=null;
        this.time=0;
        this.initialTime=0;
        this.vx=null;
        this.vz=null;
       this.scene.picking=true;
    }

    changeBoard(newBoard){
        this.actualBoard = newBoard;
        var arr = eval("["+newBoard+"]"); //não mexer
        this.board = arr[0];
    }

    capturePlayer2Piece(){
        this.player1capture++;
    }

    capturePlayer1Piece(){
        this.player2capture++;
    }

    displayBoard(){
    
        this.board = 
           [[32,32,32,32,32,32,32,32,32,32],
            [32,49,32,32,32,32,32,32,32,32],
            [32,32,36,32,32,32,32,32,32,32],
            [32,32,32,35,32,32,32,32,32,32],
            [32,32,32,32,88,32,32,32,35,32],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,50,32,32,32,32,32],
            [32,32,32,32,32,32,50,32,32,32],
            [32,49,32,32,32,49,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32]];

        for(var i = 0; i<this.board.length;i++){
            for(var k = 0;k<this.board[i].length;k++){
                this.pos = 99-10*i-k;
                if(this.board[i][k]==49 && this.pos != this.newPos){
                    this.scene.pushMatrix();
                    this.scene.translate(i-4.5,.3,4.5-k);
                    this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
                    this.scene.scale(.5,0.5,1); 
                    if(this.scene.currentCamera==4){
                       this.scene.registerForPick(this.pos, this.whitePiece); 
                    }
                    if(this.pos==this.scene.selection &&this.scene.picking==true){
                        this.coordinates[0]=String.fromCharCode(k+65);
                        this.coordinates[1]=i+1;
                        this.initialLiteralCoordinates=[i-4.5,.3,4.5-k];
                        this.scene.scale(1.1,1.1,1);
                        this.selectedPiece.display();
                    }
                    else  this.whitePiece.display();
                    this.scene.popMatrix();
                    
                }
                if(this.board[i][k]==50 && this.pos != this.newPos){
                    this.scene.pushMatrix();
                    this.scene.translate(i-4.5,.3,4.5-k);
                    this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
                    this.scene.scale(.5,0.5,1); 
                    if(this.scene.currentCamera==3){
                        this.scene.registerForPick(this.pos, this.blackPiece); 
                    }
                    if(this.pos==this.scene.selection &&this.scene.picking==true){
                        this.coordinates[0]=String.fromCharCode(k+65);
                        this.coordinates[1]=i+1;
                        this.initialLiteralCoordinates=[i-4.5,.3,4.5-k];
                        this.scene.scale(1.1,1.1,1);
                        this.selectedPiece.display();
                    }
                    else  this.blackPiece.display();
                    this.scene.popMatrix();
                }
                if(this.board[i][k]==51){
                    this.scene.pushMatrix();
                    this.scene.translate(i-4.5,0.3,4.5-k);
                   
                    this.whiteCity.display();
                    this.scene.popMatrix();
                }
                if(this.board[i][k]==52){
                    this.scene.pushMatrix();
                    this.scene.translate(i-4.5,0.3,4.5-k);
       
                    this.blackCity.display();
                    this.scene.popMatrix();
                }
                if(this.board[i][k]==36){
                    this.scene.pushMatrix();
                    this.scene.translate(i-4.5,.3,4.5-k);
                    this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
                    this.scene.scale(.5,0.5,1); 
                    this.scene.registerForPick(this.pos, this.capturePiece);
                    if(this.pos==this.scene.selection){
                        this.newCoordinates[0]=String.fromCharCode(k+65);

                        this.newCoordinates[1]=i+1;
                    }
                    this.capturePiece.display();
                    this.scene.popMatrix();
                    
                }
                if(this.board[i][k]==88){
                    this.scene.pushMatrix();
                    this.scene.translate(i-4.5,.3,4.5-k);
                    this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
                    this.scene.scale(.5,0.5,1); 
                    this.scene.registerForPick(this.pos, this.shootPiece);
                    if(this.pos==this.scene.selection){
                        this.newCoordinates[0]=String.fromCharCode(k+65);
                        this.newCoordinates[1]=i+1;
                    }
                    this.shootPiece.display();
                    this.scene.popMatrix();
                    
                }
                if(this.board[i][k]==35){
                    this.scene.pushMatrix();
                    this.scene.translate(i-4.5,.3,4.5-k);
                    this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
                    this.scene.scale(.5,0.5,1); 
                    this.scene.registerForPick(this.pos, this.newPiece);
                    if(this.pos==this.scene.selection && this.oneMove==false && this.scene.previousSelection!=null){
                        this.newCoordinates[0]=String.fromCharCode(k+65);
                        this.newCoordinates[1]=i+1;
                        //this.scene.setPickEnabled(false);
                        this.oneMove=true;
                        this.newPos=this.scene.previousSelection;
                        this.animationPoints[1]=[i-4.5,.3,4.5-k];
                        this.animationPoints[0]=this.initialLiteralCoordinates;
                        this.vx=(this.animationPoints[1][0]-this.animationPoints[0][0])/4;
                        this.vz=(this.animationPoints[1][2]-this.animationPoints[0][2])/4;
                        this.initialTime=this.scene.deltaTime;
                       this.scene.picking=false;
                    }
                    this.newPiece.display();
                    this.scene.popMatrix();
                    
                }
                this.scene.registerForPick(null, null);
            }
        }
        this.scene.registerForPick(null, null); 
        if(this.coordinates!=null){
           // makeRequest()
        }
        if(this.oneMove){
            this.movePiece();
        }
        
    }

    movePiece(){
        this.time=this.scene.deltaTime-this.initialTime;
        if(this.time<4){
        this.scene.pushMatrix();
        this.scene.translate(this.animationPoints[0][0]+this.time*this.vx,.3+2*this.time-0.5*this.time*this.time,this.animationPoints[0][2]+this.time*this.vz);
        this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
        this.scene.scale(.5,0.5,1); 
        if(this.scene.currentCamera==3) this.blackPiece.display();
        else this.whitePiece.display();
        this.scene.popMatrix();
        }
        else {
            this.oneMove=false;
            this.newPos=101;
            this.scene.previousSelection=null;
            this.scene.selection=null;
            //this.scene.setPickEnabled(true);
            this.scene.show=true;
        }
    }

    startGameJS(Player1, Player2, Difficulty){
      this.player1 = Player1;
      this.player2 = Player2;
      this.difficulty = Difficulty;
      console.log(Player1);
      console.log(Player2);
      console.log(Difficulty);
      makeRequest('startGame('+Player1+','+Player2+','+Difficulty+')',this);
      
    }

    play(){
        makeRequest('playTurn('+this.actualBoard+','+this.player1+','+this.player2+','+this.difficulty+')',this);
    }
    
    

}
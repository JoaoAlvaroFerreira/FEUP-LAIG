var DEGREE_TO_RAD = Math.PI / 180;
class Cannon{

    constructor(scene){
       
        this.scene = scene;
        this.actualBoard = null;
        this.pos=100;
        this.coordinates=[null,null];
        this.newCoordinates=[null,null];
        this.pickingCityFlag = 0;
        this.player1pick;
        this.player2pick;
        this.currentPlayer=1;

        this.previousBoards = [];
        this.previousActualBoards = [];

        this.previewBoard = [];
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

        this.p2board =  [[32,32,32,32,32,32,32,32,32,32],
            [32,49,32,49,32,49,32,49,32,49],
            [32,49,32,49,32,49,32,49,32,49],
            [32,49,32,49,32,49,32,49,32,49],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32],
            [50,32,50,32,50,32,50,32,50,32],
            [50,32,50,32,50,32,50,32,50,32],
            [50,32,50,32,50,32,50,32,50,32],
            [36,36,36,36,36,36,36,36,36,36]];
        this.player1capture = 0;
        this.player2capture = 0;

        //são definidos no start game, para mudanças na UI não alterarem o jogo
        this.player1 = null;
        this.player2 = null;
        this.difficulty = null;

        this.gameStarted = false;
        this.gameStarted2 = false;
        this.previewFlag = false;

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
        this.animationPoints=[null,null,null];
        this.initialLiteralCoordinates=null;
        this.time=0;
        this.initialTime=0;
        this.vx=null;
        this.vz=null;
       this.scene.picking=true;
       this.P1keyHeight=-1;
       this.P2keyHeight=-1;
       this.P1stackSeparator=0;
       this.P2stackSeparator=0;
       this.frame = 0;
      this.scene.botAnim=true;
      this.holding=false;
    

    }

    changeBoard(newBoard){
console.log("ChangeBoard");

        if(this.previewFlag){
        var arr = eval("["+newBoard+"]"); //não mexer
        this.previewBoard = arr[0];
     
     
        }
        else{
            
            console.log("ChangeBoard1");
        this.previousBoards.push(this.board);
        this.previousActualBoards.push(this.actualBoard);
        this.actualBoard = newBoard;
        var arr = eval("["+newBoard+"]"); //não mexer
        this.board = arr[0];
            if(this.gameStarted2){
        this.changeTurn();
        console.log("BOARD:  Current player is"+this.currentPlayer);

            }

       
    }
       console.log(this.board);
    }

   

  boardDifference(){
        var board1 = this.board;
        var board2 = this.previousBoards[this.previousBoards.length-1];
        var firstPiece;
        var secondPiece;
        var captured1=0;
        var captured2=0;
        var difference=0;
        if(this.scene.botAnim){
       
        if(board1 != board2){
            for(var i = 0; i < 10; i++){
                for(var j = 0; j < 10; j++){
                    if(board1[i][j]==50 || board1[i][j]==49) captured1++;
                    if(board2[i][j]==50 || board2[i][j]==49) captured2++;

                    if((board1[i][j] != 50 && board2[i][j] == 50) || (board1[i][j] != 49 && board2[i][j] == 49)){
                        firstPiece = 99-10*i-j;
                        this.initialLiteralCoordinates=[i-4.5,.3,4.5-j];
                        difference++;
                        }
                    if(board1[i][j] != 32 && board2[i][j] == 32){
                    this.pos = 99-10*i-j;
                    this.animationPoints[1]=[i-4.5,.3,4.5-j];
                    difference++;
                    }
                    if(board1[i][j] != 32 && board2[i][j] != board1[i][j]){
                        this.Actualpos = 99-10*i-j;
                    }
                }
            }
                    if(difference<5){
                    if(firstPiece==null){
                        this.twoMove=true;
                        if(this.scene.currentCamera==3)  this.P1keyHeight++;
                        else this.P2keyHeight++;
                        if(this.P1keyHeight==3) {
                            this.P1stackSeparator++;
                            this.P1keyHeight=0;
                        }
                        if(this.P2keyHeight==3) {
                            this.P2stackSeparator++;
                            this.P2keyHeight=0;
                        }
                        this.newPos=this.pos;
                        if(this.scene.currentCamera==3) this.animationPoints[2]=[-2+this.P1stackSeparator,.3+.3*this.P1keyHeight,7];
                        else  this.animationPoints[2]=[2-this.P2stackSeparator,.3+.3*this.P2keyHeight,-7];
                        this.vx2=(this.animationPoints[2][0]-this.animationPoints[1][0])/4;
                        this.vz2=(this.animationPoints[2][2]-this.animationPoints[1][2])/4;
                        this.initialTime=this.scene.deltaTime;
                       this.scene.picking=false;
                       this.scene.timer=false;
                    }
                    else if(captured1==captured2){
                        this.oneMove=true;
                        this.newPos=this.pos;
                        this.animationPoints[0]=this.initialLiteralCoordinates;
                        this.vx=(this.animationPoints[1][0]-this.animationPoints[0][0])/4;
                        this.vz=(this.animationPoints[1][2]-this.animationPoints[0][2])/4;
                        this.initialTime=this.scene.deltaTime;
                       this.scene.picking=false;
                       this.scene.timer=false;
                    }
                    else {
                        this.oneMove=true;
                        this.twoMove=true;
                        this.newPos= this.Actualpos;
                        if(this.scene.currentCamera==3)  this.P1keyHeight++;
                        else this.P2keyHeight++;
                        if(this.P1keyHeight==3) {
                            this.P1stackSeparator++;
                            this.P1keyHeight=0;
                        }
                        if(this.P2keyHeight==3) {
                            this.P2stackSeparator++;
                            this.P2keyHeight=0;
                        }
                        this.animationPoints[0]=this.initialLiteralCoordinates;
                        if(this.scene.currentCamera==3) this.animationPoints[2]=[-2+this.P1stackSeparator,.3+.3*this.P1keyHeight,7];
                        else  this.animationPoints[2]=[2-this.P2stackSeparator,.3+.3*this.P2keyHeight,-7];
                        this.vx=(this.animationPoints[1][0]-this.animationPoints[0][0])/4;
                        this.vz=(this.animationPoints[1][2]-this.animationPoints[0][2])/4;
                        this.vx2=(this.animationPoints[2][0]-this.animationPoints[1][0])/4;
                        this.vz2=(this.animationPoints[2][2]-this.animationPoints[1][2])/4;
                        this.initialTime=this.scene.deltaTime;
                       this.scene.picking=false;
                       this.scene.timer=false;
                    }     
                    this.scene.botAnim=false;               
                }
                     
        
        }
       
    }
            
    } 

    displayBoard(){
    
          /*  this.board = 
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
 */
          
  /*if(this.gameStarted)   
  this.boardDifference();  */
  
            var aux;
            if(this.previewFlag)
            {
                aux = this.board;
                this.board = this.previewBoard;
            }
        
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
                    
                    if(this.pos==this.scene.selection && this.oneMove==false && this.scene.previousSelection!=null){
                       
                        this.newCoordinates[0]=String.fromCharCode(k+65);
                        this.newCoordinates[1]=i+1;
                        this.oneMove=true;
                        this.twoMove=true;
                        if(this.scene.currentCamera==3)  this.P1keyHeight++;
                        else this.P2keyHeight++;
                        if(this.P1keyHeight==3) {
                            this.P1stackSeparator++;
                            this.P1keyHeight=0;
                        }
                        if(this.P2keyHeight==3) {
                            this.P2stackSeparator++;
                            this.P2keyHeight=0;
                        }
                        this.newPos=this.pos;
                        this.animationPoints[1]=[i-4.5,.3,4.5-k];
                        this.animationPoints[0]=this.initialLiteralCoordinates;
                        if(this.scene.currentCamera==3) this.animationPoints[2]=[-2+this.P1stackSeparator,.3+.3*this.P1keyHeight,7];
                        else  this.animationPoints[2]=[2-this.P2stackSeparator,.3+.3*this.P2keyHeight,-7];
                        this.vx=(this.animationPoints[1][0]-this.animationPoints[0][0])/4;
                        this.vz=(this.animationPoints[1][2]-this.animationPoints[0][2])/4;
                        this.vx2=(this.animationPoints[2][0]-this.animationPoints[1][0])/4;
                        this.vz2=(this.animationPoints[2][2]-this.animationPoints[1][2])/4;
                        this.initialTime=this.scene.deltaTime;
                       this.scene.picking=false;
                       this.scene.timer=false;
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
                    if(this.pos==this.scene.selection && this.twoMove==false && this.scene.previousSelection!=null){
                        this.newCoordinates[0]=String.fromCharCode(k+65);
                        this.newCoordinates[1]=i+1;
                        this.twoMove=true;
                        if(this.scene.currentCamera==3)  this.P1keyHeight++;
                        else this.P2keyHeight++;
                        if(this.P1keyHeight==3) {
                            this.P1stackSeparator++;
                            this.P1keyHeight=0;
                        }
                        if(this.P2keyHeight==3) {
                            this.P2stackSeparator++;
                            this.P2keyHeight=0;
                        }
                        this.newPos=this.pos;
                        this.animationPoints[1]=[i-4.5,.3,4.5-k];
                        if(this.scene.currentCamera==3) this.animationPoints[2]=[-2+this.P1stackSeparator,.3+.3*this.P1keyHeight,7];
                        else  this.animationPoints[2]=[2-this.P2stackSeparator,.3+.3*this.P2keyHeight,-7];
                        this.vx2=(this.animationPoints[2][0]-this.animationPoints[1][0])/4;
                        this.vz2=(this.animationPoints[2][2]-this.animationPoints[1][2])/4;
                        this.initialTime=this.scene.deltaTime;
                       this.scene.picking=false;
                       this.scene.timer=false;
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
                        this.oneMove=true;
                        this.newPos=this.pos;
                        this.animationPoints[1]=[i-4.5,.3,4.5-k];
                        this.animationPoints[0]=this.initialLiteralCoordinates;
                        this.vx=(this.animationPoints[1][0]-this.animationPoints[0][0])/4;
                        this.vz=(this.animationPoints[1][2]-this.animationPoints[0][2])/4;
                        this.initialTime=this.scene.deltaTime;
                       this.scene.picking=false;
                       this.scene.timer=false;
                    }
                    this.newPiece.display();
                    this.scene.popMatrix();
                  
                    
                }
                this.scene.registerForPick(null, null);
            }
        }
        if(this.scene.botPlay && this.scene.botAnim){
            this.scene.botPlay=false;
            this.play();
            this.holdTime=this.scene.deltaTime;
            this.holding=true;
            this.hold();

            console.log("Current player is"+this.currentPlayer);

        }

        if(this.holding){
            this.hold();
        }
        this.scene.registerForPick(null, null); 
        if(this.coordinates!=null){
          // this.play();
        }
        if(this.oneMove){
            this.movePiece();
        }
        if(this.twoMove){
            this.removePiece();
        }
        this.displayCaptured();

        if(this.previewFlag)
        {
           
            this.board = aux;
        }
      
 
    }

    hold(){
        if(this.holdTime-this.scene.deltaTime<-0.5) {
            this.boardDifference();
            this.holding=false;
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
   
           
        }
    }

    removePiece(){
        this.time=this.scene.deltaTime-this.initialTime;
        if(this.time<4){
        this.scene.pushMatrix();
        if(this.scene.currentCamera==4)  this.scene.translate(this.animationPoints[1][0]+this.time*this.vx2,.3+2*this.time-0.5*this.time*this.time+this.time/4*this.P2keyHeight*.3,this.animationPoints[1][2]+this.time*this.vz2);
        else   this.scene.translate(this.animationPoints[1][0]+this.time*this.vx2,.3+2*this.time-0.5*this.time*this.time+this.time/4*this.P1keyHeight*.3,this.animationPoints[1][2]+this.time*this.vz2);
        this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
        this.scene.scale(.5,0.5,1); 
        if(this.scene.currentCamera==4) this.blackPiece.display();
        else this.whitePiece.display();
        this.scene.popMatrix();
        }
        else {
            this.twoMove=false;
            this.newPos=101;
            this.scene.previousSelection=null;
            this.scene.selection=null;
     
            if(this.scene.currentCamera==3) this.player1capture++;
            else  this.player2capture++;
           
        }
    }

    displayCaptured(){
        var counter=0;
        var counter2=0;
        for(var i = 0; i< this.player1capture;i++){
            if(counter==3){
                counter2++;
                counter=0;
            }
            this.scene.pushMatrix();
            this.scene.translate(-2+counter2,.3+counter*.3,7);
            this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
            this.scene.scale(.5,0.5,1); 
            this.whitePiece.display();
            this.scene.popMatrix();
            counter++;
            
        }
        counter=0;
        counter2=0;
        for(var i = 0; i< this.player2capture;i++){
            if(counter==3){
                counter2++;
                counter=0;
            }
            this.scene.pushMatrix();
            this.scene.translate(2-counter2,.3+counter*.3,-7);
            this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
            this.scene.scale(.5,0.5,1); 
            this.blackPiece.display();
            this.scene.popMatrix();
            counter++;
            
        }
    }

    startGameJS(Player1, Player2, Difficulty){
      this.player1 = Player1;
      this.player2 = Player2;
      this.difficulty = Difficulty;
      makeRequest('startGame('+Player1+','+Player2+','+Difficulty+')',this);
      this.pickingCityFlag = 0;
      if(this.player1 == "human" && this.player2 == "ai"){
      this.pickingCityFlag = 1;
      this.currentPlayer = 1;
      
      
      }

      if(this.player1 == "ai" && this.player2 == "human"){
        this.pickingCityFlag = 1;
      
        this.currentPlayer = 1;

        }

      if(this.player2 == "human" && this.player1=="human"){
      this.pickingCityFlag = 2;
      if(this.currentPlayer == 2)
      this.scene.show=true;

      this.currentPlayer = 1;

      
      }
      if(this.currentPlayer == 2)
      this.scene.show=true;

     
    }

    changeTurn(){
        if(this.currentPlayer == 1)
        this.currentPlayer = 2;
        else if(this.currentPlayer == 2)
        this.currentPlayer = 1;

        this.scene.show=true;
        this.scene.newTurn = false;
       
    }

    play(){ //FOR BOTS ONLY
        this.gameStarted2 = true;
        makeRequest('playTurn('+this.actualBoard+','+this.player1+','+this.player2+','+this.difficulty+','+this.currentPlayer+')',this);
        
        
       
    }

    playHuman(firstPickVar, customID){
        this.gameStarted2 = true;
        this.previewFlag = false;
        var I = 9-Math.floor(customID/10);
        var J = 9-customID%10;

        var x = 9-Math.floor(firstPickVar/10);
        var y = 9-firstPickVar%10;
       
        console.log(x,y);
        console.log(I,J);

        console.log(this.previewBoard);
        console.log(this.previewBoard[I][J]);
      if(this.previewBoard[I][J] == 50 || this.previewBoard[I][J] == 49 || this.previewBoard[I][J] == 35 || this.previewBoard[I][J] == 36){

        I++;
        J++;
        x++;
        y++;
        
        
          //newBoard[x][y] = 32;
          if(this.currentPlayer == 1)
          makeRequest('setPecaPeca('+x+','+y+','+I+','+J+','+this.actualBoard+','+49+')',this);

        if(this.currentPlayer == 2)
        makeRequest('setPecaPeca('+x+','+y+','+I+','+J+','+this.actualBoard+','+50+')',this);
          //newBoard[I][J] = 48 + this.currentPlayer;
      }
      else if (this.previewBoard[I][J] == 88){
        I++;
        J++;
        x++;
        y++;
        
        makeRequest('setPeca('+I+','+J+','+this.actualBoard+','+32+')',this);
       // newBoard[I][J] = 32;
      }
  
      console.log("PecaPeca");
    
      this.hold();
      this.scene.picking = true;


    }
    
    getPossibleMovesBoard(customID){
        var I = 10-Math.floor(customID/10);
        var J = 10-customID%10;
        this.previewFlag = true;
        makeRequest('imprimirTabuleiroJogadas('+this.currentPlayer+','+I+','+J+','+this.actualBoard+')',this);
        //this.board=this.actualBoard;
    }

    checkValid(customID){
        var I = 9-Math.floor(customID/10);
        var J = 9-customID%10;
        console.log(this.previewBoard[I][J]);
        if(this.previewBoard[I][J] == 36 || this.previewBoard[I][J] == 35 || this.previewBoard[I][J] == 88)
        return true;

        return false;

    }

    moveBack(){
        this.previewFlag = false;
        this.board = this.previousBoards[this.previousBoards - 1];
        this.previousBoards.pop();

        this.actualboard = this.previousActualBoards[this.previousActualBoards - 1];
        this.previousActualBoards.pop();

    }

    

}
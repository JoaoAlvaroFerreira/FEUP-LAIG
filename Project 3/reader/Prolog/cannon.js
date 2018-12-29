class Cannon{

    constructor(scene){
       
        this.scene = scene;
        this.actualBoard = null;
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
        this.whiteCity = new MyCity(this.scene,"defaultRocks");
        this.blackCity = new MyCity(this.scene, "defaultRocks2");
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
    
        for(var i = 0; i<this.board.length;i++){
            for(var k = 0;k<this.board[i].length;k++){
                if(this.board[i][k]==49){
                    this.scene.pushMatrix();
                    this.scene.translate(i-4.5,.3,4.5-k);
                    this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
                    this.scene.scale(.5,0.5,1); 
                    this.whitePiece.display();
                    this.scene.popMatrix();
                }
                if(this.board[i][k]==50){
                    this.scene.pushMatrix();
                    this.scene.translate(i-4.5,.3,4.5-k);
                    this.scene.rotate(90*DEGREE_TO_RAD,1,0,0);
                    this.scene.scale(.5,0.5,1); 
                    this.blackPiece.display();
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
            }
        }
    }

    startGameJS(Player1, Player2, Difficulty){
      this.player1 = Player1;
      this.player2 = Player2;
      this.difficulty = Difficulty;
      makeRequest('startGame('+Player1+','+Player2+','+Difficulty+')',this);
      
    }

    play(){
        makeRequest('playTurn('+this.actualBoard+','+this.player1+','+this.player2+','+this.difficulty+')',this);
    }
    
    

}
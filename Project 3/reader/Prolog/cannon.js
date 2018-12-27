class Cannon{

    constructor(){
        this.board = [[32,32,32,32,32,32,32,32,32,32],
            [32,49,32,49,32,49,32,49,32,49],
            [32,49,32,49,32,49,32,49,32,49],
            [32,49,32,49,32,49,32,49,32,49],
            [32,32,32,32,32,32,32,32,32,32],
            [32,32,32,32,32,32,32,32,32,32],
            [50,32,50,32,50,32,50,32,50,32],
            [50,32,50,32,50,32,50,32,50,32],
            [50,32,50,32,50,32,50,32,50,32],
            [32,32,32,32,32,32,32,32,32,32]];
        this.player1capture = 0;
        this.player2capture = 0;
        
        this.whitePiece = new Wheel(this.scene, 16,10,"defaultRocks");
        this.blackPiece = new Wheel(this.scene, 16,10,"defaultRocks2");
        this.whiteCity = new MyCity(this.scene,"defaultRocks");
        this.blackCity = new Wheel(this.scene, "defaultRocks2");
    }

    changeBoard(newBoard){
        this.board = newBoard;
        this.displayBoard();
    }

    capturePlayer2Piece(){
        this.player1capture++;
    }

    capturePlayer1Piece(){
        this.player2capture++;
    }

    displayBoard(){
        console.log(this.board);
        for(var i = 0; i<this.board.length;i++){
            for(var k = 0;k<this.board[i].length;k++){
                if(this.board[i][k]==49){
                    this.scene.pushMatrix();
                    this.scene.traslate(i-4.5,0,4.5-k);
                    this.whitePiece.display();
                    this.scene.popMatrix();
                }
                if(this.board[i][k]==50){
                    this.scene.pushMatrix();
                    this.scene.traslate(i-4.5,0,4.5-k);
                    this.blackPiece.display();
                    this.scene.popMatrix();
                }
                if(this.board[i][k]==51){
                    this.scene.pushMatrix();
                    this.scene.traslate(i-4.5,0,4.5-k);
                    this.whitePiece.display();
                    this.scene.popMatrix();
                }
                if(this.board[i][k]==52){
                    this.scene.pushMatrix();
                    this.scene.traslate(i-4.5,0,4.5-k);
                    this.blackPiece.display();
                    this.scene.popMatrix();
                }
            }
        }
    }
    
    

}
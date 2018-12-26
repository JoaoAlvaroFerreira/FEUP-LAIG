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
        
        whitePiece = new Wheel(this.scene, 16,10,"DefaultRocks");
<<<<<<< HEAD
         blackPiece = new Wheel(this.scene, 16,10,"DefaultRocks2");
=======
        blackPiece = new Wheel(this.scene, 16,10,"DefaultRocks2");
>>>>>>> e5957d505d2680651871a3422bba9ccb391ba9b4
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
    }
    
    

}
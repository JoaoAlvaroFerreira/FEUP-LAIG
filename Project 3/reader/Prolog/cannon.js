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
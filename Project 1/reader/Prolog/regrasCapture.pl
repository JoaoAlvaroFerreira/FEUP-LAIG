


addMove(1,Peca,Linha,Coluna,Moves,NovoMoves):-
    ((Peca =:= 50 | Peca =:= 52) -> 
        NovoMoves = [[Linha,Coluna]|Moves]
    ;
        NovoMoves = Moves
    ).
addMove(2,Peca,Linha,Coluna,Moves,NovoMoves):-
    ((Peca =:= 49 | Peca =:= 51) -> 
        NovoMoves = [[Linha,Coluna]|Moves]
    ;
        NovoMoves = Moves
    ).

captureLeft(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    CapLinha is EstouLinha,
    CapColuna is EstouColuna - 1,
    ((CapLinha >= 11 | CapColuna =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(CapLinha,CapColuna,Tabuleiro,Peca),
        addMove(1,Peca,CapLinha,CapColuna,Moves,NovoMoves)
    ).
captureLeft(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    CapLinha is EstouLinha,
    CapColuna is EstouColuna - 1,
    ((CapLinha >= 11 | CapColuna =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(CapLinha,CapColuna,Tabuleiro,Peca),
        addMove(2,Peca,CapLinha,CapColuna,Moves,NovoMoves)
    ).
captureBottomLeft(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    CapLinha is EstouLinha + 1,
    CapColuna is EstouColuna - 1,
    ((CapLinha >= 11 | CapColuna =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(CapLinha,CapColuna,Tabuleiro,Peca),
        addMove(1,Peca,CapLinha,CapColuna,Moves,NovoMoves)
    ).
captureTopLeft(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    CapLinha is EstouLinha - 1,
    CapColuna is EstouColuna - 1,
    ((CapLinha =< 0 | CapColuna =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(CapLinha,CapColuna,Tabuleiro,Peca),
        addMove(2,Peca,CapLinha,CapColuna,Moves,NovoMoves)
    ).
captureBottom(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    CapLinha is EstouLinha + 1,
    CapColuna is EstouColuna ,
    ((CapLinha >= 11 | CapColuna =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(CapLinha,CapColuna,Tabuleiro,Peca),
        addMove(1,Peca,CapLinha,CapColuna,Moves,NovoMoves)
    ).
captureTop(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    CapLinha is EstouLinha - 1,
    CapColuna is EstouColuna ,
    ((CapLinha =< 0 | CapColuna =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(CapLinha,CapColuna,Tabuleiro,Peca),
        addMove(2,Peca,CapLinha,CapColuna,Moves,NovoMoves)
    ).
captureBottomRight(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    CapLinha is EstouLinha + 1,
    CapColuna is EstouColuna + 1,
    ((CapLinha >= 11 | CapColuna >= 11) ->
        NovoMoves = Moves
    ;
        getPeca(CapLinha,CapColuna,Tabuleiro,Peca),
        addMove(1,Peca,CapLinha,CapColuna,Moves,NovoMoves)
    ).
captureTopRight(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    CapLinha is EstouLinha - 1,
    CapColuna is EstouColuna + 1,
    ((CapLinha =< 0 | CapColuna >= 11) ->
        NovoMoves = Moves
    ;
        getPeca(CapLinha,CapColuna,Tabuleiro,Peca),
        addMove(2,Peca,CapLinha,CapColuna,Moves,NovoMoves)
    ).
captureRight(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    CapLinha is EstouLinha,
    CapColuna is EstouColuna + 1,
    ((CapLinha >= 11 | CapColuna >= 11) ->
        NovoMoves = Moves
    ;
        getPeca(CapLinha,CapColuna,Tabuleiro,Peca),
        addMove(1,Peca,CapLinha,CapColuna,Moves,NovoMoves)
    ).
captureRight(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    CapLinha is EstouLinha,
    CapColuna is EstouColuna + 1,
    ((CapLinha >= 11 | CapColuna >= 11) ->
        NovoMoves = Moves
    ;
        getPeca(CapLinha,CapColuna,Tabuleiro,Peca),
        addMove(2,Peca,CapLinha,CapColuna,Moves,NovoMoves)
    ).

getCaptures(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves):-
    captureLeft(1,EstouLinha,EstouColuna,Tabuleiro,[],NovoMoves1),
    captureBottomLeft(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves1,NovoMoves2),
    captureBottom(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves2,NovoMoves3),
    captureBottomRight(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves3,NovoMoves4),
    captureRight(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves4,NovoMoves).

getCaptures(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves):-
    captureLeft(2,EstouLinha,EstouColuna,Tabuleiro,[],NovoMoves1),
    captureTopLeft(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves1,NovoMoves2),
    captureTop(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves2,NovoMoves3),
    captureTopRight(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves3,NovoMoves4),
    captureRight(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves4,NovoMoves).
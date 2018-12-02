
addMove(1,Peca1,Peca2,Peca3,PecaDisparo,Linha,Coluna,Moves,NovoMoves):-
    ((Peca1 =:= 49, Peca2 =:= 49 , Peca3 =:= 32 , (PecaDisparo =:= 50 | PecaDisparo =:= 52) ) ->
        NovoMoves = [[Linha,Coluna]|Moves]
    ;
        NovoMoves = Moves
    ).
addMove(2,Peca1,Peca2,Peca3,PecaDisparo,Linha,Coluna,Moves,NovoMoves):-
    ((Peca1 =:= 50, Peca2 =:= 50 , Peca3 =:= 32 , (PecaDisparo =:= 49 | PecaDisparo =:= 51) ) ->
        NovoMoves = [[Linha,Coluna]|Moves]
    ;
        NovoMoves = Moves
    ).

canonSuperTop(Player,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha - 1,
    Ponto2X is EstouLinha - 2,
    Ponto3X is EstouLinha - 3,
    Ponto4X is EstouLinha - 4,
    Ponto5X is EstouLinha - 5,
    Ponto1Y is EstouColuna,
    Ponto2Y is EstouColuna,
    Ponto3Y is EstouColuna,
    Ponto4Y is EstouColuna,
    Ponto5Y is EstouColuna,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Ponto4X =< 0) ->
            NovoMoves1 = Moves
        ;
            getPeca(Ponto4X,Ponto4Y,Tabuleiro,Peca4),
            addMove(Player,Peca1,Peca2,Peca3,Peca4,Ponto4X,Ponto4Y,Moves,NovoMoves1)
        ),
        ((Ponto5X =< 0) ->
            NovoMoves = NovoMoves1
        ;
            getPeca(Ponto5X,Ponto5Y,Tabuleiro,Peca5),
            addMove(Player,Peca1,Peca2,Peca3,Peca5,Ponto5X,Ponto5Y,NovoMoves1,NovoMoves)
        )
    ).
canonSuperTopRight(Player,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha - 1,
    Ponto2X is EstouLinha - 2,
    Ponto3X is EstouLinha - 3,
    Ponto4X is EstouLinha - 4,
    Ponto5X is EstouLinha - 5,
    Ponto1Y is EstouColuna + 1,
    Ponto2Y is EstouColuna + 2,
    Ponto3Y is EstouColuna + 3,
    Ponto4Y is EstouColuna + 4,
    Ponto5Y is EstouColuna + 5,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Ponto4X =< 0 | Ponto4Y >= 11) ->
            NovoMoves1 = Moves
        ;
            getPeca(Ponto4X,Ponto4Y,Tabuleiro,Peca4),
            addMove(Player,Peca1,Peca2,Peca3,Peca4,Ponto4X,Ponto4Y,Moves,NovoMoves1)
        ),
        ((Ponto5X =< 0 | Ponto5Y >= 11) ->
            NovoMoves = NovoMoves1
        ;
            getPeca(Ponto5X,Ponto5Y,Tabuleiro,Peca5),
            addMove(Player,Peca1,Peca2,Peca3,Peca5,Ponto5X,Ponto5Y,NovoMoves1,NovoMoves)
        )
    ).
canonSuperRight(Player,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha ,
    Ponto2X is EstouLinha ,
    Ponto3X is EstouLinha ,
    Ponto4X is EstouLinha ,
    Ponto5X is EstouLinha ,
    Ponto1Y is EstouColuna + 1,
    Ponto2Y is EstouColuna + 2,
    Ponto3Y is EstouColuna + 3,
    Ponto4Y is EstouColuna + 4,
    Ponto5Y is EstouColuna + 5,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Ponto4X =< 0 | Ponto4Y >= 11) ->
            NovoMoves1 = Moves
        ;
            getPeca(Ponto4X,Ponto4Y,Tabuleiro,Peca4),
            addMove(Player,Peca1,Peca2,Peca3,Peca4,Ponto4X,Ponto4Y,Moves,NovoMoves1)
        ),
        ((Ponto5X =< 0 | Ponto5Y >= 11) ->
            NovoMoves = NovoMoves1
        ;
            getPeca(Ponto5X,Ponto5Y,Tabuleiro,Peca5),
            addMove(Player,Peca1,Peca2,Peca3,Peca5,Ponto5X,Ponto5Y,NovoMoves1,NovoMoves)
        )
    ).
canonSuperBottomRight(Player,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha + 1,
    Ponto2X is EstouLinha + 2,
    Ponto3X is EstouLinha + 3,
    Ponto4X is EstouLinha + 4,
    Ponto5X is EstouLinha + 5,
    Ponto1Y is EstouColuna + 1,
    Ponto2Y is EstouColuna + 2,
    Ponto3Y is EstouColuna + 3,
    Ponto4Y is EstouColuna + 4,
    Ponto5Y is EstouColuna + 5,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Ponto4X >= 11 | Ponto4Y >= 11) ->
            NovoMoves1 = Moves
        ;
            getPeca(Ponto4X,Ponto4Y,Tabuleiro,Peca4),
            addMove(Player,Peca1,Peca2,Peca3,Peca4,Ponto4X,Ponto4Y,Moves,NovoMoves1)
        ),
        ((Ponto5X >= 11 | Ponto5Y >= 11) ->
            NovoMoves = NovoMoves1
        ;
            getPeca(Ponto5X,Ponto5Y,Tabuleiro,Peca5),
            addMove(Player,Peca1,Peca2,Peca3,Peca5,Ponto5X,Ponto5Y,NovoMoves1,NovoMoves)
        )
    ).
canonSuperBottom(Player,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha + 1,
    Ponto2X is EstouLinha + 2,
    Ponto3X is EstouLinha + 3,
    Ponto4X is EstouLinha + 4,
    Ponto5X is EstouLinha + 5,
    Ponto1Y is EstouColuna ,
    Ponto2Y is EstouColuna ,
    Ponto3Y is EstouColuna ,
    Ponto4Y is EstouColuna ,
    Ponto5Y is EstouColuna ,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Ponto4X >= 11 | Ponto4Y >= 11) ->
            NovoMoves1 = Moves
        ;
            getPeca(Ponto4X,Ponto4Y,Tabuleiro,Peca4),
            addMove(Player,Peca1,Peca2,Peca3,Peca4,Ponto4X,Ponto4Y,Moves,NovoMoves1)
        ),
        ((Ponto5X >= 11 | Ponto5Y >= 11) ->
            NovoMoves = NovoMoves1
        ;
            getPeca(Ponto5X,Ponto5Y,Tabuleiro,Peca5),
            addMove(Player,Peca1,Peca2,Peca3,Peca5,Ponto5X,Ponto5Y,NovoMoves1,NovoMoves)
        )
    ).
canonSuperBottomLeft(Player,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha + 1,
    Ponto2X is EstouLinha + 2,
    Ponto3X is EstouLinha + 3,
    Ponto4X is EstouLinha + 4,
    Ponto5X is EstouLinha + 5,
    Ponto1Y is EstouColuna - 1,
    Ponto2Y is EstouColuna - 2,
    Ponto3Y is EstouColuna - 3,
    Ponto4Y is EstouColuna - 4,
    Ponto5Y is EstouColuna - 5,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y =< 0 | Ponto2Y =< 0 | Ponto3Y =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Ponto4X >= 11 | Ponto4Y =< 0) ->
            NovoMoves1 = Moves
        ;
            getPeca(Ponto4X,Ponto4Y,Tabuleiro,Peca4),
            addMove(Player,Peca1,Peca2,Peca3,Peca4,Ponto4X,Ponto4Y,Moves,NovoMoves1)
        ),
        ((Ponto5X >= 11 | Ponto5Y =< 0) ->
            NovoMoves = NovoMoves1
        ;
            getPeca(Ponto5X,Ponto5Y,Tabuleiro,Peca5),
            addMove(Player,Peca1,Peca2,Peca3,Peca5,Ponto5X,Ponto5Y,NovoMoves1,NovoMoves)
        )
    ).
canonSuperLeft(Player,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha ,
    Ponto2X is EstouLinha ,
    Ponto3X is EstouLinha ,
    Ponto4X is EstouLinha ,
    Ponto5X is EstouLinha ,
    Ponto1Y is EstouColuna - 1,
    Ponto2Y is EstouColuna - 2,
    Ponto3Y is EstouColuna - 3,
    Ponto4Y is EstouColuna - 4,
    Ponto5Y is EstouColuna - 5,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y =< 0 | Ponto2Y =< 0 | Ponto3Y =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Ponto4X >= 11 | Ponto4Y =< 0) ->
            NovoMoves1 = Moves
        ;
            getPeca(Ponto4X,Ponto4Y,Tabuleiro,Peca4),
            addMove(Player,Peca1,Peca2,Peca3,Peca4,Ponto4X,Ponto4Y,Moves,NovoMoves1)
        ),
        ((Ponto5X >= 11 | Ponto5Y =< 0) ->
            NovoMoves = NovoMoves1
        ;
            getPeca(Ponto5X,Ponto5Y,Tabuleiro,Peca5),
            addMove(Player,Peca1,Peca2,Peca3,Peca5,Ponto5X,Ponto5Y,NovoMoves1,NovoMoves)
        )
    ).
canonSuperTopLeft(Player,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha - 1,
    Ponto2X is EstouLinha - 2,
    Ponto3X is EstouLinha - 3,
    Ponto4X is EstouLinha - 4,
    Ponto5X is EstouLinha - 5,
    Ponto1Y is EstouColuna - 1,
    Ponto2Y is EstouColuna - 2,
    Ponto3Y is EstouColuna - 3,
    Ponto4Y is EstouColuna - 4,
    Ponto5Y is EstouColuna - 5,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 | Ponto1Y =< 0 | Ponto2Y =< 0 | Ponto3Y =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Ponto4X =< 0 | Ponto4Y =< 0) ->
            NovoMoves1 = Moves
        ;
            getPeca(Ponto4X,Ponto4Y,Tabuleiro,Peca4),
            addMove(Player,Peca1,Peca2,Peca3,Peca4,Ponto4X,Ponto4Y,Moves,NovoMoves1)
        ),
        ((Ponto5X =< 0 | Ponto5Y =< 0) ->
            NovoMoves = NovoMoves1
        ;
            getPeca(Ponto5X,Ponto5Y,Tabuleiro,Peca5),
            addMove(Player,Peca1,Peca2,Peca3,Peca5,Ponto5X,Ponto5Y,NovoMoves1,NovoMoves)
        )
    ).

getCanonDisparos(Player,EstouLinha,EstouColuna,Tabuleiro,NovoMoves):-
    canonSuperTop(Player,EstouLinha,EstouColuna,Tabuleiro,[],NovoMoves1),
    canonSuperTopRight(Player,EstouLinha,EstouColuna,Tabuleiro,NovoMoves1,NovoMoves2),
    canonSuperRight(Player,EstouLinha,EstouColuna,Tabuleiro,NovoMoves2,NovoMoves3),
    canonSuperBottomRight(Player,EstouLinha,EstouColuna,Tabuleiro,NovoMoves3,NovoMoves4),
    canonSuperBottom(Player,EstouLinha,EstouColuna,Tabuleiro,NovoMoves4,NovoMoves5),
    canonSuperBottomLeft(Player,EstouLinha,EstouColuna,Tabuleiro,NovoMoves5,NovoMoves6),
    canonSuperLeft(Player,EstouLinha,EstouColuna,Tabuleiro,NovoMoves6,NovoMoves7),
    canonSuperTopLeft(Player,EstouLinha,EstouColuna,Tabuleiro,NovoMoves7,NovoMoves).
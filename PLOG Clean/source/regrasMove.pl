




addMove(Peca,Linha,Coluna,Moves,NovoMoves):-
    (Peca =:= 32 -> 
        NovoMoves = [[Linha,Coluna]|Moves]
    ;
        NovoMoves = Moves
    ).

moveBottomLeft(EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha + 1,
    ParaColuna is EstouColuna - 1, 
    ((ParaLinha >= 11 | ParaColuna =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).

moveBottom(EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha + 1,
    ParaColuna is EstouColuna, 
    ((ParaLinha >= 11) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).

moveBottomRight(EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha + 1,
    ParaColuna is EstouColuna + 1, 
    ((ParaLinha >= 11 | ParaColuna >= 11) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).

moveTopLeft(EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha - 1,
    ParaColuna is EstouColuna - 1, 
    ((ParaLinha =< 0 | ParaColuna =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).

moveTop(EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha - 1,
    ParaColuna is EstouColuna, 
    ((ParaLinha =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).

moveTopRight(EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha - 1,
    ParaColuna is EstouColuna + 1, 
    ((ParaLinha =< 0 | ParaColuna >= 11) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).

moveRetreatLeft(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha - 2,
    ParaColuna is EstouColuna - 2, 
    ((ParaLinha =< 0 | ParaColuna =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).
moveRetreatLeft(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha + 2,
    ParaColuna is EstouColuna - 2, 
    ((ParaLinha >= 11 | ParaColuna =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).
moveRetreatBack(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha - 2,
    ParaColuna is EstouColuna, 
    ((ParaLinha =< 0) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).
moveRetreatBack(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha + 2,
    ParaColuna is EstouColuna, 
    ((ParaLinha >= 11) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).
moveRetreatRight(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha - 2,
    ParaColuna is EstouColuna + 2, 
    ((ParaLinha =< 0 | ParaColuna >= 11) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).
moveRetreatRight(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    ParaLinha is EstouLinha + 2,
    ParaColuna is EstouColuna + 2, 
    ((ParaLinha >= 11 | ParaColuna >= 11) ->
        NovoMoves = Moves
    ;
        getPeca(ParaLinha,ParaColuna,Tabuleiro,Peca),
        addMove(Peca,ParaLinha,ParaColuna,Moves,NovoMoves)
    ).
checkAdjacente(1,CheckLinha,CheckColuna,Tabuleiro,ExisteEnimigo):-
    ((CheckLinha =< 0 | CheckLinha >= 11 | CheckColuna =< 0 | CheckColuna >= 11) ->
        ExisteEnimigo = 0
    ;
        getPeca(CheckLinha,CheckColuna,Tabuleiro,Peca),
        ((Peca =:= 50 | Peca =:= 52) ->
            ExisteEnimigo = 1 
            ;
            ExisteEnimigo = 0 
        )
    ).
checkAdjacente(2,CheckLinha,CheckColuna,Tabuleiro,ExisteEnimigo):-
    ((CheckLinha =< 0 | CheckLinha >= 11 | CheckColuna =< 0 | CheckColuna >= 11) ->
        ExisteEnimigo = 0
    ;
        getPeca(CheckLinha,CheckColuna,Tabuleiro,Peca),
        ((Peca =:= 49 | Peca =:= 51) ->
            ExisteEnimigo = 1 
            ;
            ExisteEnimigo = 0 
        )
    ).


moveRetreat(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    EsquerdaLinha is EstouLinha - 1,
    DireitaLinha is EstouLinha + 1,
    CimaColuna is EstouColuna - 1,
    BaixoColuna is EstouColuna + 1,
    checkAdjacente(1,EsquerdaLinha,EstouColuna,Tabuleiro,ExisteEnimigo1),
    checkAdjacente(1,DireitaLinha,EstouColuna,Tabuleiro,ExisteEnimigo2),
    checkAdjacente(1,EstouLinha,CimaColuna,Tabuleiro,ExisteEnimigo3),
    checkAdjacente(1,EstouLinha,BaixoColuna,Tabuleiro,ExisteEnimigo4),
    ((ExisteEnimigo1 =:= 1 | ExisteEnimigo2 =:= 1 | ExisteEnimigo3 =:= 1 | ExisteEnimigo4 =:= 1) ->
        moveRetreatLeft(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves1),
        moveRetreatBack(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves1,NovoMoves2),
        moveRetreatRight(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves2,NovoMoves)
    ;
        NovoMoves = Moves
    ).
moveRetreat(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    EsquerdaLinha is EstouLinha - 1,
    DireitaLinha is EstouLinha + 1,
    CimaColuna is EstouColuna - 1,
    BaixoColuna is EstouColuna + 1,
    checkAdjacente(2,EsquerdaLinha,EstouColuna,Tabuleiro,ExisteEnimigo1),
    checkAdjacente(2,DireitaLinha,EstouColuna,Tabuleiro,ExisteEnimigo2),
    checkAdjacente(2,EstouLinha,CimaColuna,Tabuleiro,ExisteEnimigo3),
    checkAdjacente(2,EstouLinha,BaixoColuna,Tabuleiro,ExisteEnimigo4),
    ((ExisteEnimigo1 =:= 1 | ExisteEnimigo2 =:= 1 | ExisteEnimigo3 =:= 1 | ExisteEnimigo4 =:= 1) ->
        moveRetreatLeft(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves1),
        moveRetreatBack(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves1,NovoMoves2),
        moveRetreatRight(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves2,NovoMoves)
    ;
        NovoMoves = Moves
    ).


moveSuperTop(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha - 1,
    Ponto2X is EstouLinha - 2,
    Ponto3X is EstouLinha - 3,
    Ponto1Y is EstouColuna,
    Ponto2Y is EstouColuna,
    Ponto3Y is EstouColuna,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 49 , Peca2 =:= 49) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperTop(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha - 1,
    Ponto2X is EstouLinha - 2,
    Ponto3X is EstouLinha - 3,
    Ponto1Y is EstouColuna,
    Ponto2Y is EstouColuna,
    Ponto3Y is EstouColuna,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 50 , Peca2 =:= 50) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperTopRight(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha - 1,
    Ponto2X is EstouLinha - 2,
    Ponto3X is EstouLinha - 3,
    Ponto1Y is EstouColuna + 1,
    Ponto2Y is EstouColuna + 2,
    Ponto3Y is EstouColuna + 3,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 49 , Peca2 =:= 49) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperTopRight(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha - 1,
    Ponto2X is EstouLinha - 2,
    Ponto3X is EstouLinha - 3,
    Ponto1Y is EstouColuna + 1,
    Ponto2Y is EstouColuna + 2,
    Ponto3Y is EstouColuna + 3,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 50 , Peca2 =:= 50) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperRight(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha ,
    Ponto2X is EstouLinha ,
    Ponto3X is EstouLinha ,
    Ponto1Y is EstouColuna + 1,
    Ponto2Y is EstouColuna + 2,
    Ponto3Y is EstouColuna + 3,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 49 , Peca2 =:= 49) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperRight(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha ,
    Ponto2X is EstouLinha ,
    Ponto3X is EstouLinha ,
    Ponto1Y is EstouColuna + 1,
    Ponto2Y is EstouColuna + 2,
    Ponto3Y is EstouColuna + 3,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 50 , Peca2 =:= 50) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperBottomRight(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha + 1,
    Ponto2X is EstouLinha + 2,
    Ponto3X is EstouLinha + 3,
    Ponto1Y is EstouColuna + 1,
    Ponto2Y is EstouColuna + 2,
    Ponto3Y is EstouColuna + 3,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 49 , Peca2 =:= 49) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperBottomRight(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha + 1,
    Ponto2X is EstouLinha + 2,
    Ponto3X is EstouLinha + 3,
    Ponto1Y is EstouColuna + 1,
    Ponto2Y is EstouColuna + 2,
    Ponto3Y is EstouColuna + 3,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 50 , Peca2 =:= 50) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperBottom(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha + 1,
    Ponto2X is EstouLinha + 2,
    Ponto3X is EstouLinha + 3,
    Ponto1Y is EstouColuna ,
    Ponto2Y is EstouColuna ,
    Ponto3Y is EstouColuna ,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 49 , Peca2 =:= 49) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperBottom(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha + 1,
    Ponto2X is EstouLinha + 2,
    Ponto3X is EstouLinha + 3,
    Ponto1Y is EstouColuna ,
    Ponto2Y is EstouColuna ,
    Ponto3Y is EstouColuna ,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y >= 11 | Ponto2Y >= 11 | Ponto3Y >=11 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 50 , Peca2 =:= 50) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperBottomLeft(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha + 1,
    Ponto2X is EstouLinha + 2,
    Ponto3X is EstouLinha + 3,
    Ponto1Y is EstouColuna - 1,
    Ponto2Y is EstouColuna - 2,
    Ponto3Y is EstouColuna - 3,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y =< 0 | Ponto2Y =< 0 | Ponto3Y =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 49 , Peca2 =:= 49) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperBottomLeft(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha + 1,
    Ponto2X is EstouLinha + 2,
    Ponto3X is EstouLinha + 3,
    Ponto1Y is EstouColuna - 1,
    Ponto2Y is EstouColuna - 2,
    Ponto3Y is EstouColuna - 3,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y =< 0 | Ponto2Y =< 0 | Ponto3Y =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 50 , Peca2 =:= 50) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperLeft(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha ,
    Ponto2X is EstouLinha ,
    Ponto3X is EstouLinha ,
    Ponto1Y is EstouColuna - 1,
    Ponto2Y is EstouColuna - 2,
    Ponto3Y is EstouColuna - 3,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y =< 0 | Ponto2Y =< 0 | Ponto3Y =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 49 , Peca2 =:= 49) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperLeft(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha ,
    Ponto2X is EstouLinha ,
    Ponto3X is EstouLinha ,
    Ponto1Y is EstouColuna - 1,
    Ponto2Y is EstouColuna - 2,
    Ponto3Y is EstouColuna - 3,
    ((Ponto1X >= 11 | Ponto2X >= 11 | Ponto3X >= 11 | Ponto1Y =< 0 | Ponto2Y =< 0 | Ponto3Y =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 50 , Peca2 =:= 50) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperTopLeft(1,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha - 1,
    Ponto2X is EstouLinha - 2,
    Ponto3X is EstouLinha - 3,
    Ponto1Y is EstouColuna - 1,
    Ponto2Y is EstouColuna - 2,
    Ponto3Y is EstouColuna - 3,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 | Ponto1Y =< 0 | Ponto2Y =< 0 | Ponto3Y =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 49 , Peca2 =:= 49) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).
moveSuperTopLeft(2,EstouLinha,EstouColuna,Tabuleiro,Moves,NovoMoves):-
    Ponto1X is EstouLinha - 1,
    Ponto2X is EstouLinha - 2,
    Ponto3X is EstouLinha - 3,
    Ponto1Y is EstouColuna - 1,
    Ponto2Y is EstouColuna - 2,
    Ponto3Y is EstouColuna - 3,
    ((Ponto1X =< 0 | Ponto2X =< 0 | Ponto3X =< 0 | Ponto1Y =< 0 | Ponto2Y =< 0 | Ponto3Y =< 0 ) ->
        NovoMoves = Moves
    ;
        getPeca(Ponto1X,Ponto1Y,Tabuleiro,Peca1),
        getPeca(Ponto2X,Ponto2Y,Tabuleiro,Peca2),
        getPeca(Ponto3X,Ponto3Y,Tabuleiro,Peca3),
        ((Peca1 =:= 50 , Peca2 =:= 50) ->
            addMove(Peca3,Ponto3X,Ponto3Y,Moves,NovoMoves)
        ;
            NovoMoves = Moves
        )
    ).

getMovesPecaPlayer(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves):-
    moveBottomLeft(EstouLinha,EstouColuna,Tabuleiro,[],NovoMoves1),
    moveBottom(EstouLinha,EstouColuna,Tabuleiro,NovoMoves1,NovoMoves2),
    moveBottomRight(EstouLinha,EstouColuna,Tabuleiro,NovoMoves2,NovoMoves3),
    moveRetreat(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves3,NovoMoves4),
    moveSuperTop(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves4,NovoMoves5),
    moveSuperTopRight(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves5,NovoMoves6),
    moveSuperRight(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves6,NovoMoves7),
    moveSuperBottomRight(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves7,NovoMoves8),
    moveSuperBottom(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves8,NovoMoves9),
    moveSuperBottomLeft(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves9,NovoMoves10),
    moveSuperLeft(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves10,NovoMoves11),
    moveSuperTopLeft(1,EstouLinha,EstouColuna,Tabuleiro,NovoMoves11,NovoMoves).


getMovesPecaPlayer(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves):-
    moveTopLeft(EstouLinha,EstouColuna,Tabuleiro,[],NovoMoves1),
    moveTop(EstouLinha,EstouColuna,Tabuleiro,NovoMoves1,NovoMoves2),
    moveTopRight(EstouLinha,EstouColuna,Tabuleiro,NovoMoves2,NovoMoves3),
    moveRetreat(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves3,NovoMoves4),
    moveSuperTop(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves4,NovoMoves5),
    moveSuperTopRight(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves5,NovoMoves6),
    moveSuperRight(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves6,NovoMoves7),
    moveSuperBottomRight(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves7,NovoMoves8),
    moveSuperBottom(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves8,NovoMoves9),
    moveSuperBottomLeft(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves9,NovoMoves10),
    moveSuperLeft(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves10,NovoMoves11),
    moveSuperTopLeft(2,EstouLinha,EstouColuna,Tabuleiro,NovoMoves11,NovoMoves).

:- use_module(library(lists)).
:- use_module(library(random)).

make_jogada_normal(2,DeX,DeY,ParaX,ParaY,Board,Nivel,Lista,Move,Pontuacao):-
    getPeca(ParaX,ParaY,Board,Peca),
    ((Peca =:= 51)->NovaPontuacao is Pontuacao + 10;NovaPontuacao is Pontuacao ),
    setPeca(DeX,DeY,Board,NewBoard1,32),
    setPeca(ParaX,ParaY,NewBoard1,NewBoard,50),
    valid_pecas_linhas(2,NewBoard,1,[],Pecas),
    NovoNivel is Nivel - 1,
    NovaLista = [[ParaX,ParaY]|Lista],
    percorrer_pecas(2,Pecas,NewBoard,NovoNivel,NovaLista,Move,NovaPontuacao).

make_jogada_normal(1,DeX,DeY,ParaX,ParaY,Board,Nivel,Lista,Move,Pontuacao):-
    getPeca(ParaX,ParaY,Board,Peca),
    ((Peca =:= 52)->NovaPontuacao is Pontuacao + 10;NovaPontuacao is Pontuacao ),
    setPeca(DeX,DeY,Board,NewBoard1,32),
    setPeca(ParaX,ParaY,NewBoard1,NewBoard,49),
    valid_pecas_linhas(1,NewBoard,1,[],Pecas),
    NovoNivel is Nivel - 1,
    NovaLista = [[ParaX,ParaY]|Lista],
    percorrer_pecas(1,Pecas,NewBoard,NovoNivel,NovaLista,Move,NovaPontuacao).

make_jogada_cannon(Player,DeX,DeY,ParaX,ParaY,Board,Nivel,Lista,Move,Pontuacao):-
    setPeca(ParaX,ParaY,Board,NewBoard,32),
    valid_pecas_linhas(Player,NewBoard,1,[],Pecas),
    NovoNivel is Nivel - 1,
    NovaLista = [[ParaX,ParaY]|Lista],
    percorrer_pecas(Player,Pecas,NewBoard,NovoNivel,NovaLista,Move,Pontuacao).

percorrer_jogadas(_,_,_,[],_,_,_,[],_).
percorrer_jogadas(Player,X,Y,[[ParaX,ParaY]|Resto],Board,Nivel,Lista,Move,Pontuacao):-
    make_jogada_normal(Player,X,Y,ParaX,ParaY,Board,Nivel,Lista,Move1,Pontuacao),
    percorrer_jogadas(Player,X,Y,Resto,Board,Nivel,Lista,Move2,Pontuacao),
    append(Move1,Move2,Move).

percorrer_cannon(_,_,_,[],_,_,_,[],_).
percorrer_cannon(Player,X,Y,[[ParaX,ParaY]|Resto],Board,Nivel,Lista,Move,Pontuacao):-
    make_jogada_cannon(Player,X,Y,ParaX,ParaY,Board,Nivel,Lista,Move1,Pontuacao),
    percorrer_cannon(Player,X,Y,Resto,Board,Nivel,Lista,Move2,Pontuacao),
    append(Move1,Move2,Move).

empty_list([]).

jogada_atual(Player,X,Y,Board,Nivel,Lista,Move,Pontuacao):-
    NovaLista = [[X,Y]|Lista],
    getMovesPecaPlayer(Player,X,Y,Board,MovesN),
    ((empty_list(MovesN)) ->
        Move1 = []
    ;
        percorrer_jogadas(Player,X,Y,MovesN,Board,Nivel,NovaLista,Move1,Pontuacao)
    ),
    getCaptures(Player,X,Y,Board,MovesC),
    ((empty_list(MovesC)) ->
        Move2 = []
    ;
        NovaPontuacao is Pontuacao + 1 * Nivel,
        percorrer_jogadas(Player,X,Y,MovesC,Board,Nivel,NovaLista,Move2,NovaPontuacao)),
    append(Move1,Move2,Move3),
    getCanonDisparos(Player,X,Y,Board,MovesD),
    ((empty_list(MovesD)) ->
        Move4 = []
    ;
        NovaPontuacao2 is Pontuacao + 2 * Nivel,
        percorrer_cannon(Player,X,Y,MovesD,Board,Nivel,NovaLista,Move4,NovaPontuacao2)),
    append(Move3,Move4,Move).

percorrer_pecas(_,[],_,_,_,[],_).
percorrer_pecas(_,_,_,0,Proxima,Lista,Pontuacao):- Lista = [[Pontuacao,Proxima]].
percorrer_pecas(Player,[[X,Y]|Resto],Board,Nivel,Lista,Move,Pontuacao):-
    Nivel > 0,
    jogada_atual(Player,X,Y,Board,Nivel,Lista,MoveLista,Pontuacao),
    percorrer_pecas(Player,Resto,Board,Nivel,Lista,MoveLista2,Pontuacao),
    append(MoveLista,MoveLista2,Move).

escolher_movimento([],[]).
escolher_movimento(Escolhido,[[_,Escolhido]|_]).

imprimirLista([]).
imprimirLista([Este|Resto]):-
    write(Este),nl,
    imprimirLista(Resto).

atualizar_board([],Board,Board,_).
atualizar_board([[X1,Y1],[X2,Y2]|Resto],Board,NewBoard, 1):-
    write(board1),
    Move = [[X1,Y1],[X2,Y2]],
    ImprimirY1 is Y1 + 64,
    ImprimirX1 is X1 ,
    write('Movimento da peca '), format('[~c,~d]',[ImprimirY1,ImprimirX1]),
    ImprimirY2 is Y2 + 64,
    ImprimirX2 is X2 ,
    write(' para a posicao '), format('[~c,~d]',[ImprimirY2,ImprimirX2]),nl,
    move(Move,Board,NewBoard, 1).
    setPeca(X2,Y2,Board, NewBoard1,49),
    setPeca(X1,Y1,NewBoard1, NewBoard,32).
    write(board2).

atualizar_board([[X1,Y1],[X2,Y2]|Resto],Board,NewBoard, 2):-
    write(board1),
    Move = [[X1,Y1],[X2,Y2]],
    ImprimirY1 is Y1 + 64,
    ImprimirX1 is X1 ,
    write('Movimento da peca '), format('[~c,~d]',[ImprimirY1,ImprimirX1]),
    ImprimirY2 is Y2 + 64,
    ImprimirX2 is X2 ,
    write(' para a posicao '), format('[~c,~d]',[ImprimirY2,ImprimirX2]),nl,
    move(Move,Board,NewBoard, 2).
    setPeca(X2,Y2,Board, NewBoard1,50),
    setPeca(X1,Y1,NewBoard1, NewBoard,32).
    write(board2).

choose_move(Board,NewBoard,Nivel, Player):-
    valid_pecas_linhas(Player,Board,1,[],Pecas),
    percorrer_pecas(Player,Pecas,Board,Nivel,[],Moves,0),
    ((empty_list(Moves))->fail;true),
    sort(Moves,SortedMoves),
    reverse(SortedMoves,ReversedMoves),
    escolher_movimento(Escolha,ReversedMoves),
    reverse(Escolha,Movimento),
    atualizar_board(Movimento,Board,NewBoard,Player).



value(Board,Player,Value):-
    valid_pecas_linhas(Player,Board,1,[],Pecas),
    percorrer_pecas(Player,Pecas,Board,1,[],Value,0).
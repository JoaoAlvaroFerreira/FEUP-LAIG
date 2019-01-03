:- use_module(library(lists)).

valid_pecas_colunas(_,[],_,_,[]).
valid_pecas_colunas(1,[49|Resto],Linha,Coluna,[[Linha,Coluna]|RestoMoves]):-
    NovaColunaNr is Coluna + 1,
    valid_pecas_colunas(1,Resto,Linha,NovaColunaNr,RestoMoves).
valid_pecas_colunas(2,[50|Resto],Linha,Coluna,[[Linha,Coluna]|RestoMoves]):-
    NovaColunaNr is Coluna + 1,
    valid_pecas_colunas(2,Resto,Linha,NovaColunaNr,RestoMoves).
valid_pecas_colunas(Player,[_|Resto],Linha,Coluna,List):-
    NovaColunaNr is Coluna + 1,
    valid_pecas_colunas(Player,Resto,Linha,NovaColunaNr,List).

valid_pecas_linhas(_,[],_,ListOfMoves,ListOfMoves).
valid_pecas_linhas(Player,[List|Resto],N,ListaMo,ListOfMoves):-
    valid_pecas_colunas(Player,List,N,1,Moves),
    append(ListaMo,Moves,NovaLista),
    NovaLinhaNr is N + 1,
    valid_pecas_linhas(Player,Resto,NovaLinhaNr,NovaLista,ListOfMoves)
    .

all_moves(Player,X,Y,Board,Moves):-
    getMovesPecaPlayer(Player,X,Y,Board,MovesN),
    getCaptures(Player,X,Y,Board,MovesC),
    getCanonDisparos(Player,X,Y,Board,MovesD),
    append(MovesN,MovesC,MovesNC),
    append(MovesNC,MovesD,Moves).



existe_movimento(_,_,[]):- fail.
existe_movimento(X,Y,[[ThisX,ThisY]|Resto]):-
    ((X =:= ThisX , Y =:= ThisY) ->
        true,
        !
    ;
        existe_movimento(X,Y,Resto)
    ).



get_all_moves_pecas(_,_,[],[]).
get_all_moves_pecas(Player,Board,[[X,Y]|Resto],[Movimento|Continuacao]):-
    get_all_moves_pecas(Player,Board,Resto,Continuacao),
    all_moves(Player,X,Y,Board,Moves),
    Movimento = [[X,Y],Moves].

valid_moves(Board,Player,ListOfMoves):-
    valid_pecas_linhas(Player,Board,1,[],Pecas),
    get_all_moves_pecas(Player,Board,Pecas,ListOfMoves).

move([[],[]],Board,NewBoard, _).

move([[DeX,DeY],[ParaX,ParaY]],Board,NewBoard, 1):-
write(move),
    getPeca(DeX,DeY,Board,Peca),
    write(move0),
    Peca =:= 50,
    write(move1),
    getMovesPecaPlayer(1,DeX,DeY,Board,MovesN),
    write(move2),
    getCaptures(1,DeX,DeY,Board,MovesC),
    write(move3),
    append(MovesN,MovesC,MovesNC),
    write(move4),
    ((existe_movimento(ParaX,ParaY,MovesNC))->
        setPeca(DeX,DeY,Board,NewBoard1,32),
        setPeca(ParaX,ParaY,NewBoard1,NewBoard,50)
    ;
        getCanonDisparos(1,DeX,DeY,Board,MovesD),
        ((existe_movimento(ParaX,ParaY,MovesD))->
            setPeca(ParaX,ParaY,Board,NewBoard,32)
        ;
            fail, !
        )
        
    )
    ,write(movened).

move([[DeX,DeY],[ParaX,ParaY]],Board,NewBoard,2):-
    write(move),
    getPeca(DeX,DeY,Board,Peca),
    Peca =:= 49,
    getMovesPecaPlayer(2,DeX,DeY,Board,MovesN),
    getCaptures(2,DeX,DeY,Board,MovesC),
    append(MovesN,MovesC,MovesNC),
    ((existe_movimento(ParaX,ParaY,MovesNC))->
        setPeca(DeX,DeY,Board,NewBoard1,32),
        setPeca(ParaX,ParaY,NewBoard1,NewBoard,49)
    ;
        getCanonDisparos(2,DeX,DeY,Board,MovesD),
        ((existe_movimento(ParaX,ParaY,MovesD))->
            setPeca(ParaX,ParaY,Board,NewBoard,32)
        ;
            fail, !
        )
    ).








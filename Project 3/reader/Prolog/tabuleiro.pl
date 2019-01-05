/*
32 - Empty Cell
49 - White Soldier
51 - White City
50 - Black Soldier
52 - Black City
10x10 Rows,
88 - disparo dos canhoes
36 - Capturas possiveis
35 - Movimentos possiveis
*/
:- use_module(library(lists)).
:- use_module(library(random)).

tabuleiroInicial([[32,32,32,32,32,32,32,32,32,32],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,32,32,32,32,32,32,32,32,32],
                  [32,32,32,32,32,32,32,32,32,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [32,32,32,32,32,32,32,32,32,32]]).

                  tabuleiroP1([[36,36,36,36,36,36,36,36,36,36],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,32,32,32,32,32,32,32,32,32],
                  [32,32,32,32,32,32,32,32,32,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [32,32,32,32,32,32,32,32,32,32]]).

                  tabuleiroP2([[32,32,32,32,32,32,32,32,32,32],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,32,32,32,32,32,32,32,32,32],
                  [32,32,32,32,32,32,32,32,32,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [36,36,36,36,36,36,36,36,36,36]]).

                  tabuleiroP1P2([[36,36,36,36,36,36,36,36,36,36],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,49,32,49,32,49,32,49,32,49],
                  [32,32,32,32,32,32,32,32,32,32],
                  [32,32,32,32,32,32,32,32,32,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [50,32,50,32,50,32,50,32,50,32],
                  [36,36,36,36,36,36,36,36,36,36]]).

/*        SETS              */

setColuna(1,[_|Resto],[Peca|Resto],Peca):- !.
setColuna(Natual,[PecaAtual|Resto],[PecaAtual|LinhaResto],Peca):-
    Natual>1,
    ProximoAtual is Natual - 1,
    setColuna(ProximoAtual,Resto,LinhaResto,Peca).

setPeca(1,Ncoluna,[Linha|Resto],[NovaLinha|Resto],Peca):-
    setColuna(Ncoluna,Linha,NovaLinha,Peca).

setPeca(Natual,Ncoluna,[LinhaAtual|Resto],[LinhaAtual|NovaLinha],Peca):-
    Natual>1,
    ProximoAtual is Natual - 1,
    setPeca(ProximoAtual,Ncoluna,Resto,NovaLinha,Peca).


setPecaPeca(Nlinha,Ncoluna,Nlinha2,Ncoluna2,Tabuleiro,NewTabuleiro,Peca):-
    setPeca(Nlinha,Ncoluna,Tabuleiro,NewTabuleiro1,32),
    setPeca(Nlinha2,Ncoluna2,NewTabuleiro1,NewTabuleiro,Peca),
    imprimirTabuleiro(NewTabuleiro).

/*         GETS            */

getIterativo(Natual,Nobjetivo,[LinhaAtual|_],LinhaAtual):-
    Natual =:= Nobjetivo,!.
getIterativo(Natual,Nobjetivo,[_|Resto],Linha):-
    Natual \= Nobjetivo,
    NovoIT is Natual + 1,
    getIterativo(NovoIT,Nobjetivo,Resto,Linha).

getPecaColuna(Ncoluna,Linha,Peca):-
    getIterativo(1,Ncoluna,Linha,Peca).

getLinha(Nlinha,Tabuleiro,Linha):-
    getIterativo(1,Nlinha,Tabuleiro,Linha).

getPeca(Nlinha,Ncoluna,Tabuleiro,Peca):-
    getLinha(Nlinha,Tabuleiro,Linha),
    getPecaColuna(Ncoluna,Linha,Peca).




/*       PRINT  TABULEIRO                */
writeNumber(Number):-
    ((Number >= 10) ->
    format('~d',Number);
    format(' ~d',Number)).
imprimirLine([]):-
    write('|'),
    write('\n'),
    write('--+-+-+-+-+-+-+-+-+-+-+\n').
imprimirLine([Head|Tail]):-
    write('|'),
    format('~c',Head),
    imprimirLine(Tail).

imprimir([],_).
imprimir([Head|Tabuleiro],Linha) :-
    writeNumber(Linha),
    imprimirLine(Head),
    NewNumber is Linha + 1,
    imprimir(Tabuleiro,NewNumber).

imprimirTabuleiro(Tabuleiro) :-
    write('  |A|B|C|D|E|F|G|H|I|J|\n'),
    write('--+-+-+-+-+-+-+-+-+-+-+\n'),
    imprimir(Tabuleiro,1).



movesToTabuleiro([],NewTabuleiro,NewTabuleiro,_).
movesToTabuleiro([[X,Y]|Resto],Tabuleiro,NewTabuleiro,Index):-
    setPeca(X,Y,Tabuleiro,NewTabuleiro1,Index),
    movesToTabuleiro(Resto,NewTabuleiro1,NewTabuleiro,Index).

imprimirTabuleiroJogadas(Player,Linha,Coluna,Tabuleiro, NewTabuleiro):-
    getMovesPecaPlayer(Player,Linha,Coluna,Tabuleiro,Moves),
    getCaptures(Player,Linha,Coluna,Tabuleiro,CapMoves),
    getCanonDisparos(Player,Linha,Coluna,Tabuleiro,CannonMoves),
    movesToTabuleiro(Moves,Tabuleiro,NewTabuleiro1,35),
    movesToTabuleiro(CapMoves,NewTabuleiro1,NewTabuleiro2,36),
    movesToTabuleiro(CannonMoves,NewTabuleiro2,NewTabuleiro,88).

menu:-
    repeat,
    clearConsole,
    write(' _______  _______  _        _        _______  _         \n'),
    write('(  ____ \\(  ___  )( (    /|( (    /|(  ___  )( (    /|  \n'),
    write('| (    \\/| (   ) ||  \\  ( ||  \\  ( || (   ) ||  \\  ( |  \n'),
    write('| |      | (___) ||   \\ | ||   \\ | || |   | ||   \\ | |  \n'),
    write('| |      |  ___  || (\\ \\) || (\\ \\) || |   | || (\\ \\) |  \n'),
    write('| |      | (   ) || | \\   || | \\   || |   | || | \\   |  \n'),
    write('| (____/\\| )   ( || )  \\  || )  \\  || (___) || )  \\  |  \n'),
    write('(_______/|/     \\||/    )_)|/    )_)(_______)|/    )_)  \n'),
    write('1 - Iniciar Jogo\n'),
    write('2 - Imprimir tabuleiro\n'),
    write('0 - Exit\n'),
    read_line(Escolher),
    name(Escolha,Escolher),
    integer(Escolha),
    clearConsole,
    (
        ((Escolha =:= 1)-> modeChoice , fail)|
        ((Escolha =:= 2)-> printScreen , pressToContinue, fail)|
        ((Escolha =:= 0))
    ),
    !.
ola:- write('ola'),!.



clearConsole :- write('\33\[2J').

modeChoice:-
    repeat,
    clearConsole,
    write('Escolha o modo de jogo: \n'),
    write('1 - PC vs PC\n'),
    write('2 - Jogador vs PC\n'),
    write('3 - Jogador vs Jogador\n'),
    write('0 - Exit\n'),
    read_line(Escolher),
    name(Escolha,Escolher),
    integer(Escolha),
    clearConsole,
    (
        ((Escolha =:= 1)-> difficultyChoice(ai,ai))|
        ((Escolha =:= 2)-> sideChoice)|
        ((Escolha =:= 3)-> startGame(human,human,0))|
        ((Escolha =:= 0))
    ),
    !.





sideChoice:-
    repeat,
    clearConsole,
    write('Escolha as pecas com que quer jogar: \n'),
    write('1 - Pecas Brancas\n'),
    write('2 - Pecas Negras\n'),
    write('0 - Exit\n'),
    read_line(Escolher),
    name(Escolha,Escolher),
    integer(Escolha),
    clearConsole,
    (
        ((Escolha =:= 1)-> difficultyChoice(human,ai))|
        ((Escolha =:= 2)-> difficultyChoice(ai,human))|
        ((Escolha =:= 0))
    ),
    !.


difficultyChoice(PecasBrancas,PecasNegras):-
    repeat,
    clearConsole,
    write('Escolha a dificuldade: \n'),
    write('1 - Facil\n'),
    write('2 - Normal\n'),
    write('3 - DificiL\n'),
    write('0 - Exit\n'),
    read_line(Escolher),
    name(Escolha,Escolher),
    integer(Escolha),
    clearConsole,
    (
        ((Escolha =:= 1)-> startGame(PecasBrancas,PecasNegras,1))|
        ((Escolha =:= 2)-> startGame(PecasBrancas,PecasNegras,2))|
        ((Escolha =:= 3)-> startGame(PecasBrancas,PecasNegras,3))|
        ((Escolha =:= 0)->pressToContinue)
    ),
    !.


separar(Coluna,Linha,[Letra|Resto]):-
    name(Coluna,Resto),
    integer(Coluna),
    Coluna >= 1,
    Coluna =< 10,
    integer(Letra),
    Linha is Letra - 64,
    Linha >= 1,
    Linha =< 10
    .


lerUserCelula(Linha,Coluna):-
    repeat,
    write('Porfavor insira uma celula valida (LetraNumero) : '),
    read_line(ValorLido),
    length(ValorLido,Tamanho),
    Tamanho =< 4,
    Tamanho >= 2, 
    separar(Linha,Coluna,ValorLido).
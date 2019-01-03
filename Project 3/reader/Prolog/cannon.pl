:- use_module(library(random)).

check_linha_primeira([],2).
check_linha_primeira([Pos|Resto],Winner):-
	((Pos =:= 51) ->
		Winner = 0,!
	;
		check_linha_primeira(Resto,Winner)
	).
check_linha_ultima([],1).
check_linha_ultima([Pos|Resto],Winner):-
	((Pos =:= 52 )->
		Winner = 0,!
	;
		check_linha_ultima(Resto,Winner)
	).
find_board_coluna([],_).
find_board_coluna([Peca|Resto],Procurar):-
	\+(Peca =:= Procurar),
	find_board_coluna(Resto,Procurar).

find_board_linha([],_).
find_board_linha([Linha|Coluna],Procurar):-
	find_board_coluna(Linha,Procurar),
	find_board_linha(Coluna,Procurar).

check_winner(Winner1,Winner2,Winner3,Winner):-
	((Winner1 =\= 0)->
		Winner is Winner1
	;
		((Winner2 =\= 0)->
			Winner is Winner2
		;
			((Winner3 =\= 0)->
				Winner is Winner3
			;
				Winner is 0
			)
		)
	).

game_over2([Primeira,_,_,_,_,_,_,_,_,Decimo],All,Winner):-
	check_linha_primeira(Primeira,Winner1),
	check_linha_ultima(Decimo,Winner2),
	((find_board_linha(All,49))->
		Winner3 is 2
	;
		((find_board_linha(All,50))->
			Winner3 is 1
		;
			Winner3 is 0
		)
	),
	check_winner(Winner1,Winner2,Winner3,Winner).

game_over(Board,Winner):-
	game_over2(Board,Board,Winner).


validar_inicial(Linha,Coluna,Board):-
	jogador(Player),
    valid_pecas_linhas(Player,Board,1,[],Pecas),!,
	existe_movimento(Linha,Coluna,Pecas).


play_human(Tabuleiro,NovoTabuleiro):-
	jogador(Player),
	clearConsole,
	imprimirTabuleiro(Tabuleiro),
	write('E a vez do jogador '), write(Player),nl,
	write('Indique a posicao da peca'), nl,
	lerUserCelula(Linha1,Coluna1),!,
	validar_inicial(Linha1,Coluna1,Tabuleiro),
	clearConsole,
	imprimirTabuleiroJogadas(Linha1,Coluna1,Tabuleiro),
	write('Indique para onde quer mover a peca ou a posicao da peca inimiga a capturar'), nl,
	lerUserCelula(Linha2,Coluna2),!,
	move([[Linha1,Coluna1],[Linha2,Coluna2]],Tabuleiro,NovoTabuleiro),
	clearConsole,
	imprimirTabuleiro(NovoTabuleiro),
	swap_player(Player,NovoPlayer),
	retract(jogador(Player)),
	assert(jogador(NovoPlayer)).

playTurn(Tabuleiro, NovoTabuleiro, human,human , _):-
	play_human(Tabuleiro,NovoTabuleiro).

playTurn(Tabuleiro, NovoTabuleiro, human,ai , Dificuldade):-
	jogador(Player),
	((Player =:= 1)->
		play_human(Tabuleiro,NovoTabuleiro)
	;
		play_robot(Tabuleiro,NovoTabuleiro,Dificuldade)
	).
playTurn(Tabuleiro, NovoTabuleiro, ai,human , Dificuldade):-
	jogador(Player),
	((Player =:= 1)->
		play_robot(Tabuleiro,NovoTabuleiro,Dificuldade)
	;
		play_human(Tabuleiro,NovoTabuleiro)
	).
playTurn(Tabuleiro, NovoTabuleiro, ai,ai , Dificuldade):-
	play_robot(Tabuleiro,NovoTabuleiro,Dificuldade).


play(_,_,_,_,0).
play(Tabuleiro, PecasBrancas, PecasNegras,Dificuldade,_):-
	repeat,
	((playTurn(Tabuleiro, NovoTabuleiro, PecasBrancas,PecasNegras,Dificuldade))->
		true
	;
		write('Nao foram encontradas jogas.'),Acabou = 0
	),
	game_over(NovoTabuleiro,Winner),
	((Winner =:= 0)->
		Acabou = 1
	;
		clearConsole,
		imprimirTabuleiro(NovoTabuleiro),
		write('O jogador '), write(Winner), write(' ganhou o jogo'),nl,
		Acabou = 0

	),
	play(NovoTabuleiro,PecasBrancas,PecasNegras,Dificuldade,Acabou).


placeWhiteCity(Tabuleiro,NovoTabuleiro):-
	repeat,
	write('\nPrimeiro jogador (Pecas Brancas): Selecione a posicao da sua cidade [2-9]\n'),
	read_line(Lido),
	name(Posicao,Lido),
	integer(Posicao),
	((Posicao > 1 , Posicao < 10 )-> 
		setPeca(1,Posicao,Tabuleiro,NovoTabuleiro,51)
	;
		write('\nA posicao tem de ser um numero de 2 a 9\n'),
		fail
	).


placeBlackCity(Tabuleiro,NovoTabuleiro):-
	repeat,
	write('\nSegundo jogador (Pecas Negras): Selecione a posicao da sua cidade [2-9]\n'),
	read_line(Lido),
	name(Posicao,Lido),
	integer(Posicao),
	(((Posicao>1),(Posicao<10))-> 
		setPeca(10,Posicao,Tabuleiro,NovoTabuleiro,52)
	;
		write('\nA posicao tem de ser um numero de 2 a 9\n'),
	fail).


 setCities(human,ai,Choice1,Choice2, NovoTabuleiro):-
 tabuleiroInicial(Tabuleiro),
 	setPeca(1,Choice1,Tabuleiro,NovoTabuleiro,51),
	random(2,10,Posicao),
	setPeca(10,Posicao,Tabuleiro,NovoTabuleiro1,51).

 setCities(ai,human,Choice1,Choice2, NovoTabuleiro):-
 tabuleiroInicial(Tabuleiro),
 	random(2,10,Posicao),
	setPeca(1,Posicao,Tabuleiro,NovoTabuleiro1,51),
 	setPeca(10,Choice1,Tabuleiro,NovoTabuleiro,52).

 setCities(human,human,Choice1,Choice2, NovoTabuleiro):-
 tabuleiroInicial(Tabuleiro),
 	setPeca(1,Choice1,Tabuleiro,NovoTabuleiro1,51),
	setPeca(10,Choice2,NovoTabuleiro1,NovoTabuleiro,52).

placeCities(Tabuleiro,NovoTabuleiro,human,ai):-
	tabuleiroP1(NovoTabuleiro).

placeCities(Tabuleiro,NovoTabuleiro,ai,human):-
	tabuleiroP2(NovoTabuleiro).

placeCities(Tabuleiro,NovoTabuleiro,human,human):-
	tabuleiroP1P2(NovoTabuleiro).


placeCities(Tabuleiro,NovoTabuleiro,ai,ai):-
	random(2,10,Posicao),
	setPeca(1,Posicao,Tabuleiro,NovoTabuleiro1,51),
	random(2,10,Posicao2),
	setPeca(10,Posicao2,NovoTabuleiro1,NovoTabuleiro,52).

startGame(PecasBrancas,PecasNegras,Dificuldade, NovoTabuleiro):-
	tabuleiroInicial(Tabuleiro),
	placeCities(Tabuleiro, NovoTabuleiro, PecasBrancas,PecasNegras).

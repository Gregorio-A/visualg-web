Comando de Desvio Condicional

se <expressão-lógica> entao
    <seqüência-de-comandos>
fimse

Ao encontrar este comando, o VisuAlg analisa a <expressão-lógica>. Se o seu resultado for VERDADEIRO, todos os comandos da <seqüência-de-comandos> (entre esta linha e a linha com fimse) são executados. Se o resultado for FALSO, estes comandos são desprezados e a execução do algoritmo continua a partir da primeira linha depois do fimse.

se <expressão-lógica> entao
    <seqüência-de-comandos-1>
senao
    <seqüência-de-comandos-2>
fimse

Nesta outra forma do comando, se o resultado da avaliação de <expressão-lógica> for VERDADEIRO, todos os comandos da <seqüência-de-comandos-1> (entre esta linha e a linha com senao) são executados, e a execução continua depois a partir da primeira linha depois do fimse. Se o resultado for FALSO, estes comandos são desprezados e o algoritmo continua a ser executado a partir da primeira linha depois do senao, executando todos os comandos da <seqüência-de-comandos-2> (até a linha com fimse).

Estes comandos equivalem ao if...then e if...then...else do Pascal. Note que não há necessidade de delimitadores de bloco (como begin e end), pois as seqüências de comandos já estão delimitadas pelas palavras-chave senao e fimse. O VisuAlg permite o aninhamento desses comandos de desvio condicional.

Comando de Seleção Múltipla

O VisuAlg implementa (com certas variações) o comando case do Pascal. A sintaxe é a seguinte:

escolha <expressão-de-seleção>
caso <exp11>, <exp12>, ..., <exp1n>
   <seqüência-de-comandos-1>
caso <exp21>, <exp22>, ..., <exp2n>
   <seqüência-de-comandos-2>
...
outrocaso
   <seqüência-de-comandos-extra>
fimescolha

Veja o exemplo a seguir, que ilustra bem o que faz este comando:

    algoritmo "Times"
    var time: caractere
    inicio
    escreva ("Entre com o nome de um time de futebol: ")
    leia (time)
    escolha time
    caso "Flamengo", "Fluminense", "Vasco", "Botafogo"
       escreval ("É um time carioca.")
    caso "São Paulo", "Palmeiras", "Santos", "Corínthians"
       escreval ("É um time paulista.")
    outrocaso
       escreval ("É de outro estado.")
    fimescolha
    fimalgoritmo

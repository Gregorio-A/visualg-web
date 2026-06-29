Subprograma é um programa que auxilia o programa principal através da realização de uma determinada subtarefa. Também costuma receber os nomes de sub-rotina, procedimento, método ou módulo.

Os subprogramas são chamados dentro do corpo do programa principal como se fossem comandos. Após seu término, a execução continua a partir do ponto onde foi chamado. É importante compreender que a chamada de um subprograma simplesmente gera um desvio provisório no fluxo de execução.

Há um caso particular de subprograma que recebe o nome de função. Uma função, além de executar uma determinada tarefa, retorna um valor para quem a chamou, que é o resultado da sua execução. Por este motivo, a chamada de uma função aparece no corpo do programa principal como uma expressão, e não como um comando.

Cada subprograma, além de ter acesso às variáveis do programa que o chamou (são as variáveis globais), pode ter suas próprias variáveis (são as variáveis locais), que existem apenas durante sua chamada.

Ao se chamar um subprograma, também é possível passar-lhe determinadas informações que recebem o nome de parâmetros (são valores que, na linha de chamada, ficam entre os parênteses e que estão separados por vírgulas). A quantidade dos parâmetros, sua seqüência e respectivos tipos não podem mudar: devem estar de acordo com o que foi especificado na sua correspondente declaração.

Para se criar subprogramas, é preciso descrevê-los após a declaração das variáveis e antes do corpo do programa principal. O VisuAlg possibilita declaração e chamada de subprogramas nos moldes da linguagem Pascal, ou seja, procedimentos e funções com passagem de parâmetros por valor ou referência. Isso será explicado a seguir.

Procedimentos

Em VisuAlg, procedimento é um subprograma que não retorna nenhum valor (corresponde ao procedure do Pascal). Sua declaração, que deve estar entre o final da declaração de variáveis e a linha inicio do programa principal, segue a sintaxe abaixo:

    procedimento <nome-de-procedimento> [(<seqüência-de-declarações-de-parâmetros>)]
    // Seção de Declarações Internas
    inicio
    // Seção de Comandos
    fimprocedimento

O <nome-de-procedimento> obedece as mesmas regras de nomenclatura das variáveis. Por outro lado, a <seqüência-de-declarações-de-parâmetros> é uma seqüência de

    [var] <seqüência-de-parâmetros>: <tipo-de-dado>

separadas por ponto e vírgula. A presença (opcional) da palavra-chave var indica passagem de parâmetros por referência; caso contrário, a passagem será por valor. 

Por sua vez, <seqüência-de-parâmetros> é uma seqüência de nomes de parâmetros (também obedecem a mesma regra de nomenclatura de variáveis) separados por vírgulas.

De modo análogo ao programa principal, a seção de declaração internas começa com a palavra-chave var, e continua com a seguinte sintaxe:

    <lista-de-variáveis> : <tipo-de-dado>

Nos próximos exemplos, através de um subprograma soma, será calculada a soma entre os valores 4 e –9 (ou seja, será obtido o resultado 13) que o programa principal imprimirá em seguida. No primeiro caso, um procedimento sem parâmetros utiliza uma variável local aux para armazenar provisoriamente o resultado deste cálculo (evidentemente, esta variável é desnecessária, mas está aí apenas para ilustrar o exemplo), antes de atribuí-lo à variável global res:

    procedimento soma
    var aux: inteiro
    inicio
    // n, m e res são variáveis globais
    aux <- n + m
    res <- aux
    fimprocedimento

    No programa principal deve haver os seguintes comandos:
    n <- 4
    m <- -9
    soma
    escreva(res)

A mesma tarefa poderia ser executada através de um procedimento com parâmetros, como descrito abaixo:

    procedimento soma (x,y: inteiro)
    inicio
    // res é variável global
    res <- x + y
    fimprocedimento

    No programa principal deve haver os seguintes comandos:
    n <- 4
    m <- -9
    soma(n,m)
    escreva(res)

A passagem de parâmetros do exemplo acima chama-se passagem por valor. Neste caso, o subprograma simplesmente recebe um valor que utiliza durante sua execução. Durante essa execução, os parâmetros passados por valor são análogos às suas variáveis locais, mas com uma única diferença: receberam um valor inicial no momento em que o subprograma foi chamado.
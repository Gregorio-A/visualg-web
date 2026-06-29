
Comandos de Saída de Dados

escreva (<lista-de-expressões>)

Escreve no dispositivo de saída padrão (isto é, na área à direita da metade inferior da tela do VisuAlg) o conteúdo de cada uma das expressões que compõem <lista-de-expressões>.  As expressões dentro desta lista devem estar separadas por vírgulas; depois de serem avaliadas, seus resultados são impressos na ordem indicada. É equivalente ao comando write do Pascal.

De modo semelhante a Pascal, é possível especificar o número de espaços no qual se deseja escrever um determinado valor. Por exemplo, o comando escreva(x:5) escreve o valor da variável x em 5 espaços, alinhado-o à direita. Para variáveis reais, pode-se também especificar o número de casas fracionárias que serão exibidas. Por exemplo, considerando y como uma variável real, o comando escreva(y:6:2)escreve seu valor em 6 espaços colocando 2 casas decimais. 

escreval (<lista-de-expressões>). 

Idem ao anterior, com a única diferença que pula uma linha em seguida. É equivalente ao writeln do Pascal.

Exemplos:

    algoritmo "exemplo"
    var x: real
        y: inteiro
        a: caractere
        l: logico
    inicio
    x <- 2.5
    y <- 6
    a <- "teste"
    l <- VERDADEIRO
    escreval ("x", x:4:1, y+3:4) // Escreve: x 2.5    9
    escreval (a, "ok")           // Escreve: testeok (e depois pula linha)
    escreval (a, " ok")          // Escreve: teste ok (e depois pula linha)
    escreval (a + " ok")         // Escreve: teste ok (e depois pula linha)
    escreva (l)                  //tipo caractere, para que assim possa haver a concatenação. Quando se deseja separar expressões do tipo caractere, é necessário acrescentar espaços nos locais adequados.

Comando de Entrada de Dados

leia (<lista-de-variáveis>)

Recebe valores digitados pelos usuário, atribuindo-os às variáveis cujos nomes estão em <lista-de-variáveis> (é respeitada a ordem especificada nesta lista). É análogo ao comando read do Pascal.

Veja no exemplo abaixo o resultado:

algoritmo "exemplo 1"
var x: inteiro;
inicio
leia (x)
escreva (x)
fimalgoritmo

O comando de leitura acima irá exibir uma janela como a que se vê ao lado, com a mensagem padrão:
 "Entre com o valor de <nome-de-variável>"

 

Se você clicar em Cancelar ou teclar Esc durante a leitura de dados, o programa será imediatamente interrompido. Escreve: VERDADEIRO
    fimalgoritmo

Note que o VisuAlg separa expressões do tipo numérico e lógico com um espaço à esquerda, mas não as expressões do 
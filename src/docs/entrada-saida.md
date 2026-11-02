# Entrada e Saída

Use `escreva` e `escreval` para mostrar valores no console. Use `leia` para receber dados digitados pelo usuário no campo de entrada do console.

![Console do VisuAlg Web 1.1 após uma execução](screenshots/interface-console-1.11.png)

No modo abaixo do editor, arraste a divisão acima do console para ajustar sua altura; as setas do teclado também funcionam quando essa divisão tem foco. Após uma execução longa, a rolagem permanece na saída mais recente. Pressione `Esc` para fechar o console e voltar ao código. O cabeçalho mantém apenas as ações necessárias para a execução.

## Saída com escreva

```visualg
escreva(<lista-de-expressoes>)
escreval(<lista-de-expressoes>)
escreva <lista-de-expressoes>
escreval <lista-de-expressoes>
```

`escreva` mantém o cursor na mesma linha. `escreval` imprime e pula uma linha. As formas sem parênteses são aceitas para aproximar o Web dos materiais clássicos do VisuAlg.

```visualg
algoritmo "Saida"
inicio
  escreva "Visu"
  escreval "Alg"
  escreval("Nova linha")
fimalgoritmo
```

Nesse exemplo, o console mostra `VisuAlg` e `Nova linha` em linhas separadas.
Aspas são usadas no código para indicar valores de texto escritos diretamente
no programa; o texto digitado em `leia` não precisa delas.

## Formatação

Valores podem receber largura mínima e, no caso de reais, número de casas decimais.

| Forma | Resultado |
| --- | --- |
| `x:5` | Exibe `x` alinhado à direita em 5 espaços. |
| `y:6:2` | Exibe `y` em 6 espaços com 2 casas decimais. |

```visualg
algoritmo "Formatacao"
var
  media: real
  faltas: inteiro
inicio
  media <- 7.356
  faltas <- 2
  escreval("Média: ", media:6:2)
  escreval("Faltas: ", faltas:3)
fimalgoritmo
```

## Entrada com leia

```visualg
leia(<lista-de-variaveis>)
leia <lista-de-variaveis>
```

`leia` atribui os valores digitados às variáveis na ordem informada. Como no VisuAlg, o próprio algoritmo deve usar `escreva` quando quiser mostrar uma orientação antes da leitura. A entrada aceita o campo inline ou a janela modal configurada na IDE.

```visualg
algoritmo "Entrada"
var
  nome: caractere
  idade: inteiro
inicio
  escreva("Digite seu nome: ")
  leia nome

  escreva("Digite sua idade: ")
  leia idade

  escreval("Olá, ", nome, ". Você tem ", idade, " anos.")
fimalgoritmo
```

Digite `Ana` e `17` nos pedidos do console. A saída final será `Olá, Ana. Você
tem 17 anos.`.

## Conversão dos valores digitados

| Tipo da variável | Conversão no Web |
| --- | --- |
| `inteiro` | Aceita somente números inteiros, como `10` ou `-3`. |
| `real` | Aceita números com ponto ou vírgula decimal, como `3.14` ou `3,14`. |
| `caractere` | Mantém o texto digitado. |
| `logico` | Aceita `verdadeiro`/`v` ou `falso`/`f`. |

Pressionar Enter sem digitar nada avança a leitura e atribui o valor padrão do tipo: `0` para inteiro ou real, texto vazio para caractere e `FALSO` para lógico. A regra também vale para elementos de vetor. Espaços em branco sem outros caracteres são tratados como entrada vazia nos tipos numéricos e lógicos; em caractere, os espaços digitados são preservados.

Uma entrada inválida mostra uma mensagem didática e a leitura é repetida até chegar um valor compatível. No modo modal, cancelar a entrada interrompe o programa de forma controlada. Por padrão, o valor lido aparece no console; use `eco off` para ocultá-lo e `eco on` para reativá-lo.

```visualg
algoritmo "EntradaLogica"
var
  confirmado: logico
inicio
  escreva("Confirmado? ")
  leia confirmado
  escreval("Valor lógico: ", confirmado)
fimalgoritmo
```

## Se algo der errado

- Se o valor numérico for recusado, confira se `inteiro` recebeu um número sem
  casas decimais ou se `real` recebeu um número válido. Na entrada, os dois
  aceitam ponto ou vírgula decimal.
- Para `logico`, informe `verdadeiro`, `v`, `falso` ou `f`. Outros textos não
  são convertidos em valor lógico.
- Se a execução parar esperando uma leitura, preencha o campo do console e
  envie a entrada; o programa só continua depois disso.

## Pratique

1. Leia duas notas reais e mostre a média com `escreval`.
2. Leia o nome e a idade e exiba uma frase usando várias expressões na mesma
   chamada.
3. Use `media:6:2` para mostrar duas casas decimais. A largura é mínima; um
   valor maior pode ocupar mais espaços.

Se a leitura continuar repetindo, consulte o diagnóstico de
[entrada inválida](#doc:erros).

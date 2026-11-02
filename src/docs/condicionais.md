# Condicionais

Use condicionais para executar comandos somente quando uma expressão lógica for verdadeira.

![Fluxo de decisão se/senao](images/docs/fluxo-condicional.svg)

## se...entao

```visualg
se <expressao-logica> entao
  <comandos>
fimse
```

```visualg
algoritmo "Maioridade"
var
  idade: inteiro
inicio
  idade <- 20

  se idade >= 18 entao
    escreval("Maior de idade")
  fimse
fimalgoritmo
```

Como `idade` vale `20`, o console mostra `Maior de idade`. Se você alterar o
valor para `16`, nenhum comando dentro do bloco será executado.

## se...senao

```visualg
se <expressao-logica> entao
  <comandos-quando-verdadeiro>
senao
  <comandos-quando-falso>
fimse
```

```visualg
algoritmo "Aprovacao"
var
  media: real
inicio
  media <- 6.5

  se media >= 6 entao
    escreval("Aprovado")
  senao
    escreval("Reprovado")
  fimse
fimalgoritmo
```

Com `media` igual a `6.5`, a saída é `Aprovado`. O limite `>= 6` inclui também
uma média exatamente igual a seis.

## senao se

Use `senao se` na mesma linha quando quiser encadear uma nova condição sem abrir um bloco `senao` separado. Essa forma usa apenas um `fimse` no final da cadeia.

```visualg
algoritmo "SenaoSe"
var
  x: inteiro
inicio
  x <- 2

  se x = 1 entao
    escreval("um")
  senao se x = 2 entao
    escreval("dois")
  senao
    escreval("outro")
  fimse
fimalgoritmo
```

Para `x = 2`, a saída é `dois`. Se `x` for outro valor, a cadeia chega ao bloco
`senao` e mostra `outro`.

Se `se` ficar na linha seguinte ao `senao`, ele passa a ser um bloco aninhado normal e precisa de dois `fimse`.

```visualg
senao
  se x = 2 entao
    escreval("dois")
  fimse
fimse
```

## Aninhamento

Condicionais podem ficar dentro de outras condicionais.

```visualg
algoritmo "Conceito"
var
  nota: real
inicio
  nota <- 8.5

  se nota >= 6 entao
    se nota >= 9 entao
      escreval("Excelente")
    senao
      escreval("Aprovado")
    fimse
  senao
    escreval("Reprovado")
  fimse
fimalgoritmo
```

## escolha...caso

Use `escolha` quando a mesma expressão precisa ser comparada com vários valores.

```visualg
escolha <expressao>
caso <valor1>, <valor2>
  <comandos>
outrocaso
  <comandos>
fimescolha
```

```visualg
algoritmo "Menu"
var
  opcao: inteiro
inicio
  opcao <- 2

  escolha opcao
  caso 1
    escreval("Novo")
  caso 2
    escreval("Abrir")
  caso 3
    escreval("Salvar")
  outrocaso
    escreval("Opção inválida")
  fimescolha
fimalgoritmo
```

`caso` aceita mais de um valor na mesma linha, separado por vírgula.

```visualg
caso "S", "s", "sim"
  escreval("Confirmado")
```

## Evite condições ambíguas

Uma condição deve resultar em verdadeiro ou falso. Compare valores
explicitamente, por exemplo `idade >= 18`; não escreva `se idade` esperando que
um número seja tratado automaticamente como condição lógica.

Em uma cadeia `senao se`, escreva `senao se` na mesma linha e feche a cadeia com
um único `fimse`. Se colocar o segundo `se` em outra linha, ele abre um bloco
aninhado e precisa do próprio `fimse`.

## Pratique

1. Leia uma nota e mostre `Aprovado` quando for pelo menos 6, ou `Reprovado`.
2. Classifique uma idade em criança, adolescente ou adulto usando `senao se`.
3. Faça um menu com `escolha`, incluindo um `outrocaso` para opções inválidas.

Se a execução não entrar no bloco esperado, revise primeiro a expressão e os
valores que ela compara. Veja [Operadores](#doc:operadores) para a precedência
de `nao`, `e`, `ou` e `xou`.

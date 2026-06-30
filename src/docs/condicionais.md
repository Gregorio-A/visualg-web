# Condicionais

Use condicionais para executar comandos somente quando uma expressão lógica for verdadeira.

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

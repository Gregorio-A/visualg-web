# Repetição

O VisuAlg Web implementa os laços `para`, `enquanto` e `repita`. Todos podem usar `interrompa` para sair antes do fim normal do laço.

## para...ate...faca

Use `para` quando a quantidade de repetições é controlada por uma variável inteira.

```visualg
para <variavel> de <inicio> ate <fim> [passo <incremento>] faca
  <comandos>
fimpara
```

```visualg
algoritmo "Contagem"
var
  i: inteiro
inicio
  para i de 1 ate 5 faca
    escreval(i)
  fimpara
fimalgoritmo
```

O `passo` é opcional. Sem ele, o incremento é `1`. Use passo negativo para contagens decrescentes.

```visualg
algoritmo "Decrescente"
var
  i: inteiro
inicio
  para i de 5 ate 1 passo -1 faca
    escreval(i)
  fimpara
fimalgoritmo
```

## enquanto...faca

Use `enquanto` quando a condição deve ser testada antes da primeira repetição. Se a condição começar falsa, o bloco não executa.

```visualg
enquanto <expressao-logica> faca
  <comandos>
fimenquanto
```

```visualg
algoritmo "Enquanto"
var
  i: inteiro
inicio
  i <- 1

  enquanto i <= 5 faca
    escreval(i)
    i <- i + 1
  fimenquanto
fimalgoritmo
```

## repita...ate

Use `repita` quando o bloco precisa executar pelo menos uma vez. A condição em `ate` é testada no fim.

```visualg
repita
  <comandos>
ate <expressao-logica>
```

```visualg
algoritmo "Repita"
var
  i: inteiro
inicio
  i <- 1

  repita
    escreval(i)
    i <- i + 1
  ate i > 5
fimalgoritmo
```

## repita...fimrepita com interrompa

Também é possível usar `repita...fimrepita` e encerrar com `interrompa`.

```visualg
algoritmo "Interrompa"
var
  i: inteiro
inicio
  i <- 0

  repita
    i <- i + 1
    escreval(i)

    se i = 5 entao
      interrompa
    fimse
  fimrepita
fimalgoritmo
```

## Detecção de loop infinito

O Web pausa a execução quando um laço passa de 1.000 iterações e pergunta se você deseja continuar. Essa proteção pode ser alterada em `Configurações > Gerais > Detecção de loop infinito`.

`passo 0` em `para` gera erro, porque a variável de controle não avançaria.

# Repetição

O VisuAlg Web implementa os laços `para`, `enquanto` e `repita`. Todos podem usar `interrompa` para sair antes do fim normal do laço.

![Ciclo de teste e repetição](images/docs/ciclo-repeticao.svg)

## para...ate...faca

Use `para` quando a quantidade de repetições é controlada por uma variável inteira.

O cabeçalho usa `de` para o valor inicial, `ate` para o limite final e `faca` para iniciar o corpo. `passo` é opcional. O limite final é calculado uma vez antes do laço; a variável de controle avança pelo passo até ultrapassar esse limite.

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

Use `enquanto` quando a condição deve ser testada antes da primeira repetição. Se a condição começar falsa, o bloco não executa. `faca` encerra o cabeçalho e começa o corpo do laço.

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

`passo 0` em `para` gera erro, porque a variável de controle não avançaria.

## Escolha o laço

- Prefira `para` quando você conhece o início, o fim e o passo da contagem.
- Use `enquanto` quando a condição pode impedir até a primeira execução.
- Use `repita` quando o corpo precisa executar ao menos uma vez, por exemplo,
  para validar uma entrada.

Nos exemplos de contagem acima, a saída é uma linha por número: de `1` a `5`.
No laço decrescente, a saída vai de `5` a `1`. No exemplo com `interrompa`, o
laço também para em `5`, mas por causa da condição dentro do corpo.

## Pratique

1. Some os números de `1` a `10` usando `para` e mostre o total (`55`).
2. Faça uma contagem regressiva de `10` até `0` com `passo -1`.
3. Leia uma senha e repita a leitura até receber a palavra `visualg`.

Se um laço não termina, confira se a variável que participa da condição muda
dentro do corpo. Para acompanhar cada repetição, use **Depurar** e o painel
**Variáveis**. Consulte [Entrada e saída](#doc:entrada-saida) para ler valores.

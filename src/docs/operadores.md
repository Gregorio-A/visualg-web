# Operadores

Operadores formam expressões numéricas, lógicas e de texto. O VisuAlg Web segue a precedência usual: parênteses primeiro, depois potência, multiplicação/divisão, soma/subtração, comparações e operadores lógicos.

## Aritméticos

| Operador | Nome | Exemplo | Resultado |
| --- | --- | --- | --- |
| `+` | Soma ou sinal positivo | `2 + 3` | `5` |
| `-` | Subtração ou sinal negativo | `10 - 4` | `6` |
| `*` | Multiplicação | `3 * 4` | `12` |
| `/` | Divisão real | `5 / 2` | `2.5` |
| `\` ou `div` | Divisão inteira | `5 \ 2` | `2` |
| `mod` ou `%` | Resto da divisão | `8 mod 3` | `2` |
| `^` | Potência | `5 ^ 2` | `25` |

```visualg
algoritmo "OperadoresAritmeticos"
var
  a, b: inteiro
inicio
  a <- 8
  b <- 3
  escreval("Soma: ", a + b)
  escreval("Divisão inteira: ", a div b)
  escreval("Resto: ", a mod b)
  escreval("Potência: ", b ^ 2)
fimalgoritmo
```

## Caracteres

O operador `+` concatena textos quando pelo menos um dos lados é `caractere`.

```visualg
algoritmo "Texto"
var
  nome: caractere
inicio
  nome <- "Ana"
  escreval("Olá, " + nome + "!")
fimalgoritmo
```

## Relacionais

| Operador | Significado |
| --- | --- |
| `=` | Igual |
| `<>` | Diferente |
| `<` | Menor que |
| `>` | Maior que |
| `<=` | Menor ou igual |
| `>=` | Maior ou igual |

Comparações de texto não diferenciam maiúsculas e minúsculas. Assim, `"ABC" = "abc"` resulta em `VERDADEIRO`.

## Lógicos

| Operador | Uso |
| --- | --- |
| `nao` | Inverte um valor lógico. |
| `e` | Verdadeiro quando os dois lados são verdadeiros. |
| `ou` | Verdadeiro quando pelo menos um lado é verdadeiro. |
| `xou` | Verdadeiro quando os lados são diferentes. |

```visualg
algoritmo "OperadoresLogicos"
var
  idade: inteiro
  tem_autorizacao: logico
inicio
  idade <- 16
  tem_autorizacao <- VERDADEIRO

  se idade >= 18 ou tem_autorizacao entao
    escreval("Entrada permitida")
  senao
    escreval("Entrada negada")
  fimse
fimalgoritmo
```

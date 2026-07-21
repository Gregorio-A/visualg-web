# Operadores

Operadores formam expressões numéricas, lógicas e de texto. O VisuAlg Web segue a precedência do VisuAlg clássico sempre que o comportamento já foi validado.

## Precedência e associatividade

| Ordem | Operadores | Associatividade |
| --- | --- | --- |
| 1 | Parênteses | Expressão interna primeiro |
| 2 | `+`, `-`, `nao` unários | Direita para esquerda |
| 3 | `^` | Direita para esquerda |
| 4 | `*`, `/`, `\`, `div`, `mod`, `%` | Esquerda para direita |
| 5 | `+`, `-` binários | Esquerda para direita |
| 6 | `=`, `<>`, `<`, `>`, `<=`, `>=` | Pares adjacentes no encadeamento |
| 7 | `e` | Esquerda para direita |
| 8 | `ou`, `xou` | Esquerda para direita |

Exemplo: `2 ^ 3 ^ 2` resulta em `512`, pois é interpretado como `2 ^ (3 ^ 2)`.

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

O operador `+` concatena textos quando os dois lados são `caractere`. Misturar
texto e número na mesma soma gera erro de tipo; use uma chamada separada de
`escreva` ou `escreval` quando quiser exibir valores de tipos diferentes.

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

Comparações encadeadas são suportadas por pares adjacentes. Por exemplo,
`1 < x < 10` verifica `1 < x` e `x < 10`; a forma
`x > 1 e x < 10` pode ser usada quando deixar a intenção mais explícita for
preferível.

## Lógicos

| Operador | Uso |
| --- | --- |
| `nao` | Inverte um valor lógico. |
| `e` | Verdadeiro quando os dois lados são verdadeiros. |
| `ou` | Verdadeiro quando pelo menos um lado é verdadeiro. |
| `xou` | Verdadeiro quando os lados são diferentes. |

Os operadores `e` e `ou` usam curto-circuito: o lado direito só é avaliado
quando ainda pode alterar o resultado. O operador `xou` avalia os dois lados,
pois precisa comparar ambos os valores.

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

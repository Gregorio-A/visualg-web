# Funções

Funções são subprogramas que retornam um valor e podem ser usadas dentro de expressões. Declare funções depois da seção `var` global e antes do `inicio` do programa principal.

## Sintaxe

```visualg
funcao <nome>(<parametros>): <tipo-de-retorno>
var
  <variaveis-locais>
inicio
  <comandos>
  retorne <expressao>
fimfuncao
```

```visualg
algoritmo "FuncaoSoma"
var
  total: inteiro

funcao soma(a, b: inteiro): inteiro
inicio
  retorne a + b
fimfuncao

inicio
  total <- soma(4, 9)
  escreval("Total: ", total)
fimalgoritmo
```

Quando a função não tem parâmetros, ela pode ser declarada sem parênteses e usada com ou sem `()`.

```visualg
algoritmo "FuncaoSemParametro"
var
  valor: inteiro

funcao resposta: inteiro
inicio
  retorne 42
fimfuncao

inicio
  valor <- resposta
  escreval(valor)
fimalgoritmo
```

## Retorno pelo nome da função

Além de `retorne`, o Web também aceita atribuir o resultado a uma variável local com o mesmo nome da função.

```visualg
algoritmo "RetornoPeloNome"
var
  dobro: inteiro

funcao calcularDobro(valor: inteiro): inteiro
inicio
  calcularDobro <- valor * 2
fimfuncao

inicio
  dobro <- calcularDobro(6)
  escreval(dobro)
fimalgoritmo
```

## Recursão

Uma função pode chamar a si mesma. Garanta sempre uma condição de parada.

```visualg
algoritmo "Fatorial"
var
  n: inteiro

funcao fatorial(valor: inteiro): inteiro
inicio
  se valor <= 1 entao
    retorne 1
  senao
    retorne valor * fatorial(valor - 1)
  fimse
fimfuncao

inicio
  n <- 5
  escreval("Fatorial: ", fatorial(n))
fimalgoritmo
```

## Funções internas

As funções internas são chamadas com parênteses. Exemplos: `raizq(25)`, `rand()` e `pi()`. Por compatibilidade, `pi` também pode ser usado diretamente como constante.

| Função | Retorno |
| --- | --- |
| `abs(x)` | Valor absoluto. |
| `quad(x)` | Quadrado de `x`. |
| `raizq(x)` | Raiz quadrada de `x`. Gera erro para número negativo. |
| `exp(base, expoente)` | Potência de `base` elevada a `expoente`. |
| `log(x)` | Logaritmo na base 10. `x` deve ser maior que zero. |
| `logn(x)` | Logaritmo natural. `x` deve ser maior que zero. |
| `sen(x)`, `cos(x)`, `tan(x)`, `cotan(x)` | Funções trigonométricas em radianos. |
| `arcsen(x)`, `arccos(x)`, `arctan(x)` | Funções trigonométricas inversas. `arcsen` e `arccos` exigem valor entre `-1` e `1`. |
| `grauprad(x)` | Converte graus para radianos. |
| `radpgrau(x)` | Converte radianos para graus. |
| `int(x)` | Parte inteira de `x`. |
| `pi` ou `pi()` | Valor de π. |
| `rand()` | Número real aleatório entre `0` e `1`. |
| `randi(limite)` | Inteiro aleatório de `0` até `limite - 1`. O limite deve ser inteiro maior que zero. |
| `compr(texto)` | Quantidade de caracteres. |
| `copia(texto, inicio, tamanho)` | Trecho de texto, com posição inicial começando em `1`. |
| `maiusc(texto)` | Texto em maiúsculas. |
| `minusc(texto)` | Texto em minúsculas. |
| `asc(texto)` | Código do primeiro caractere. |
| `carac(codigo)` | Caractere do código informado. |
| `pos(trecho, texto)` | Posição do trecho no texto, começando em `1`; não diferencia maiúsculas/minúsculas e retorna `0` se não encontrar. |
| `caracpnum(texto)` | Converte texto para número. |
| `numpcarac(numero)` | Converte número para texto. |

```visualg
algoritmo "FuncoesInternas"
var
  texto: caractere
inicio
  texto <- "VisuAlg"
  escreval("Tamanho: ", compr(texto))
  escreval("Maiúsculas: ", maiusc(texto))
  escreval("Raiz: ", raizq(25))
  escreval("Pi: ", pi:6:3)
fimalgoritmo
```

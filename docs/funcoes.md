# Funções

Funções são subprogramas que retornam um valor e podem ser usadas dentro de expressões. Declare funções depois da seção `var` global e antes do `inicio` do programa principal.

![Uma função recebe parâmetros e devolve um valor ao algoritmo](images/docs/chamada-subprograma.svg)

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

O resultado é `Total: 13`. A chamada `soma(4, 9)` calcula o valor e a atribuição
guarda esse retorno em `total`.

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

Esse exemplo mostra `42`. Como a função não recebe dados, a chamada pode ser
escrita como `resposta` ou `resposta()`.

## Retorne

`retorne expressão` define o valor devolvido pela função, mas não encerra imediatamente sua execução. Os comandos seguintes ainda são executados; se outro `retorne` ocorrer depois, ele pode substituir o valor anterior. Coloque o retorno depois dos comandos que devem acontecer ou use uma estrutura condicional para escolher qual valor devolver.

```visualg
algoritmo "MaiorValor"

funcao maior(a, b: inteiro): inteiro
inicio
  se a > b entao
    retorne a
  senao
    retorne b
  fimse
fimfuncao

inicio
  escreval(maior(4, 9))
fimalgoritmo
```

O resultado é `9`, porque a função devolve o maior entre `4` e `9`.

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

O resultado é `12`, o dobro de `6`.

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

O resultado é `Fatorial: 120`. A condição `valor <= 1` é o caso base: sem ela,
a função continuaria chamando a si mesma até atingir o limite de execução.

## Função interna em expressão

```visualg
algoritmo "FuncaoDobro"
inicio
  escreval("Dobro: ", quad(3))
fimalgoritmo
```

Esse exemplo mostra `Dobro: 9`; `quad(x)` multiplica o valor por ele mesmo.

## Quando usar função ou procedimento

Use uma função quando o cálculo precisa devolver um valor para uma atribuição,
condição ou outra expressão. Use um procedimento quando a tarefa é executar
ações, como mostrar uma mensagem ou alterar variáveis recebidas por referência.
Se a função não devolver um valor em todos os caminhos, revise cada ramo de
condição e garanta um `retorne` adequado.

## Pratique

1. Escreva `funcao dobro(valor: inteiro): inteiro` e mostre `dobro(21)`.
2. Crie uma função que receba três notas e devolva a média.
3. Crie uma função `ehPar` que devolva um lógico e use-a em uma condição.

Se houver erro ao chamar uma função, confira parênteses, quantidade, ordem e
tipos dos argumentos. [Erros e soluções](#doc:erros) traz exemplos de
diagnóstico; para uma rotina sem retorno, veja [Subprogramas](#doc:subprogramas).

## Funções internas

As funções internas fazem parte do interpretador e não precisam ser declaradas. Escreva seus argumentos entre parênteses e na ordem indicada. A ajuda contextual mostra essa assinatura durante a digitação e abre a subseção da função pelo link da dica. `pi` é uma constante e também aceita a forma `pi()`.

### Matemática básica

| Função | Comportamento e limites |
| --- | --- |
| `abs(x)` | Valor absoluto de `x`, sem o sinal negativo. |
| `quad(x)` | Calcula `x * x`. |
| `raizq(x)` | Raiz quadrada; valores negativos geram erro. |
| `exp(base, expoente)` | Potência `base ^ expoente`; aceita dois argumentos. |
| `log(x)` | Logaritmo decimal; `x` precisa ser maior que zero. |
| `logn(x)` | Logaritmo natural; `x` precisa ser maior que zero. |
| `int(x)` | Trunca a parte decimal em direção a zero: `int(2.8)` é `2` e `int(-2.8)` é `-2`. |
| `pi` ou `pi()` | Constante real π. |
| `rand()` | Número real aleatório no intervalo de zero até antes de um. |
| `randi(limite)` | Inteiro de `0` até `limite - 1`; exige limite inteiro maior que zero. |

### Trigonometria

Os ângulos de `sen`, `cos`, `tan` e `cotan` são informados em radianos. Converta graus com `grauprad(graus)`; faça o caminho inverso com `radpgrau(radianos)`. `arcsen` e `arccos` recebem valores entre `-1` e `1` e devolvem radianos. `arctan` também devolve radianos. `cotan` gera erro quando não está definida para o ângulo informado.

| Função | Comportamento |
| --- | --- |
| `sen(x)`, `cos(x)`, `tan(x)`, `cotan(x)` | Seno, cosseno, tangente e cotangente de `x` radianos. |
| `arcsen(x)`, `arccos(x)` | Arco seno e arco cosseno; exigem `-1 <= x <= 1`. |
| `arctan(x)` | Arco tangente, com resultado em radianos. |
| `grauprad(x)` | Converte graus em radianos. |
| `radpgrau(x)` | Converte radianos em graus. |

### Texto

Posições de texto começam em `1`. `pos` procura sem diferenciar maiúsculas de minúsculas e devolve `0` se não encontrar o trecho. `copia` recebe texto, posição inicial e quantidade; posição menor que `1` ou tamanho negativo gera erro. `asc` devolve `0` para texto vazio.

| Função | Comportamento |
| --- | --- |
| `compr(texto)` | Número de unidades de texto da string. |
| `copia(texto, início, tamanho)` | Extrai até `tamanho` caracteres a partir da posição indicada. |
| `maiusc(texto)`, `minusc(texto)` | Converte o texto para maiúsculas ou minúsculas. |
| `asc(texto)` | Código UTF-16 do primeiro caractere; retorna `0` para texto vazio. |
| `carac(código)` | Converte um inteiro entre `0` e `65535` em caractere; fora do intervalo ou não inteiro gera erro. |
| `pos(trecho, texto)` | Posição inicial da primeira ocorrência, sem distinção de caixa; retorna `0` quando não encontra. |

### Conversão entre texto e número

`caracpnum` aceita texto com sinal opcional e parte decimal opcional. Para a parte decimal, aceita ponto ou vírgula; espaços nas extremidades são ignorados. Texto vazio ou em outro formato gera erro. `numpcarac` produz a representação textual do valor, útil para guardar ou concatenar o resultado.

| Função | Comportamento |
| --- | --- |
| `caracpnum(texto)` | Converte texto numérico em número real. |
| `numpcarac(numero)` | Converte número em texto. |

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

# Introdução ao VisuAlg Web

O VisuAlg Web executa pseudocódigo em português no estilo do VisuAlg 3.0.7, direto no navegador ou no aplicativo desktop. A ideia é manter a escrita conhecida por quem aprende algoritmos, mas a documentação abaixo descreve o comportamento do interpretador web deste projeto.

> Use esta documentação como referência do VisuAlg Web. A aba Compatibilidade mostra o que já segue o VisuAlg 3.0.7, o que é parcial e o que é extensão própria do Web.

## Estrutura mínima

Todo programa começa com `algoritmo`, pode declarar variáveis em `var`, executa comandos a partir de `inicio` e termina em `fimalgoritmo`.

```visualg
algoritmo "MeuAlgoritmo"
var
  nome: caractere
  idade: inteiro
inicio
  escreva("Nome: ")
  leia(nome)
  escreva("Idade: ")
  leia(idade)
  escreval("Olá, ", nome, ". Idade: ", idade)
fimalgoritmo
```

## Regras gerais

| Regra | Como funciona no Web |
| --- | --- |
| Maiúsculas e minúsculas | Palavras-chave e nomes são reconhecidos sem diferenciar caixa. |
| Acentos | Prefira palavras sem acento, como `entao`, `senao`, `ate`, `faca`, `inicio`, `logico` e `nao`. O Web aceita alguns aliases acentuados para facilitar a digitação. |
| Comandos por linha | Escreva um comando por linha. Não é necessário usar ponto e vírgula no fim das linhas. |
| Comentário de linha | Tudo depois de `//` é ignorado até o fim da linha. |
| Comentário em bloco | Texto entre `{` e `}` também é ignorado. Se faltar `}`, o Web mostra erro. |
| Strings | Textos usam aspas duplas. Se faltar a aspa final, o Web mostra erro. |

## Tipos de dados

| Tipo | Valor padrão | Uso |
| --- | --- | --- |
| `inteiro` | `0` | Números sem casas decimais. |
| `real` | `0.0` | Números com casas decimais usando ponto, como `3.14`. |
| `caractere` | `""` | Textos entre aspas duplas. |
| `logico` | `FALSO` | Valores `VERDADEIRO` ou `FALSO`. |

## Declaração de variáveis

A seção `var` fica antes de `inicio`. Declare uma ou mais variáveis por linha, separadas por vírgula.

```visualg
algoritmo "Declaracoes"
var
  contador: inteiro
  media, nota1, nota2: real
  nome_do_aluno: caractere
  aprovado: logico
inicio
  contador <- 1
  nota1 <- 8.5
  nota2 <- 7.0
  media <- (nota1 + nota2) / 2
  aprovado <- media >= 6
  escreval("Média: ", media:4:1)
fimalgoritmo
```

## Vetores

Vetores são declarados com `vetor [inicio..fim] de tipo`. O Web aceita uma ou duas dimensões, exige limites inteiros constantes e valida os índices usados entre colchetes.

```visualg
algoritmo "Vetores"
var
  notas: vetor [1..3] de real
  matriz: vetor [1..2,1..2] de inteiro
inicio
  notas[1] <- 8.5
  notas[2] <- 7.0
  notas[3] <- 9.0

  matriz[1,1] <- 10
  escreval("Primeira nota: ", notas[1]:4:1)
  escreval("Canto da matriz: ", matriz[1,1])
fimalgoritmo
```

## Constantes e atribuição

Use `<-` para atribuir valores. O Web também aceita `:=`, mas `<-` é o formato recomendado para VisuAlg.

```visualg
x <- 10
nome <- "Ana"
ativo <- VERDADEIRO
total <- x * 2 + 5
```

Constantes reais usam ponto como separador decimal, independentemente da configuração regional.

```visualg
preco <- 12.50
```

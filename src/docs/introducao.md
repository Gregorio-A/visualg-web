# Introdução ao VisuAlg Web

O VisuAlg Web executa pseudocódigo em português no estilo do VisuAlg 3.0.7, direto no navegador ou no aplicativo desktop. A ideia é manter a escrita conhecida por quem aprende algoritmos, mas a documentação abaixo descreve o comportamento do interpretador web deste projeto.

> Use esta documentação como referência do VisuAlg Web. A aba **Status** separa
> correções, pendências e itens em validação; a aba **Compatibilidade** descreve
> o contrato funcional da linguagem e as extensões próprias do Web.

## Conheça a interface

A barra lateral esquerda reúne arquivos e documentação. O centro mantém uma única área de trabalho para o arquivo, a documentação, os exemplos, o console ou as configurações. À direita ficam execução, mensagens e variáveis. Durante a execução, o botão **Executar** se transforma em **Parar**, e o arquivo ativo recebe um indicador animado.

![Visão geral do editor, arquivos, execução e variáveis na versão 1.11](screenshots/interface-editor-1.11.png)

A documentação abre na mesma aba de documentação ao trocar de assunto. A pesquisa considera títulos e o texto das páginas e também mostra exemplos encontrados em um bloco separado.

![Documentação integrada à área central na versão 1.11](screenshots/interface-documentacao-1.11.png)

## Ajuda contextual no editor

Passe o cursor sobre uma palavra-chave, comando, operador ou função interna para ver uma explicação curta. Ao escrever uma chamada e abrir parênteses, o editor mostra a assinatura e realça o argumento que está sendo preenchido. A dica inclui um link para a seção correspondente desta documentação; use-o para abrir a explicação completa e os exemplos.

O autocomplete continua disponível enquanto você digita e pode ser aberto com `Ctrl` + `Espaço`. As dicas contextuais são informativas: elas não alteram o código e não substituem a análise de erros feita ao executar o algoritmo.

## Desafios do Dia

A página inicial e a Documentação apresentam dois exercícios independentes por data: **Iniciante** e **Avançado**. O calendário permite voltar a qualquer dia do ano atual desde 1º de janeiro, com uma prévia dos títulos. A lista permite buscar por nome ou descrição e filtrar por dificuldade. Abra o exercício, tente resolvê-lo no editor e consulte as dicas e a solução somente quando precisar.

![Calendário com os desafios simples e avançados](screenshots/interface-desafios-1.11.png)

## Primeiro programa

Crie um arquivo, substitua o conteúdo pelo exemplo e pressione **Executar**. O
comando `algoritmo` exige um nome entre aspas duplas; `var` declara dados,
`inicio` abre os comandos executáveis e `fimalgoritmo` encerra o programa.

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

Quando o console pedir, informe `Ana` e depois `17`. A última mensagem exibida será:

```text
Olá, Ana. Idade: 17
```

`escreva` deixa o cursor na mesma linha para que o pedido e o valor digitado
fiquem juntos; `escreval` termina a saída com uma quebra de linha. Consulte
[Entrada e saída](#doc:entrada-saida) para separar melhor as mensagens e as
leituras.

### Experimente

1. Troque a idade e execute novamente.
2. Declare `ano_atual: inteiro`, atribua um ano e calcule uma idade aproximada
   com `ano_atual - nascimento`.
3. Se uma mensagem de erro aparecer, clique nela e procure o termo no
   [guia de erros](#doc:erros).

## Regras gerais

| Regra | Como funciona no Web |
| --- | --- |
| Maiúsculas e minúsculas | Palavras-chave, tipos e nomes de identificadores não diferenciam caixa. Evite declarar nomes que só mudam entre maiúsculas e minúsculas. |
| Acentos | Prefira palavras sem acento, como `entao`, `senao`, `ate`, `faca`, `inicio`, `logico` e `nao`. O Web também aceita os aliases listados abaixo. |
| Comandos por linha | Escreva um comando por linha. Não é necessário usar ponto e vírgula no fim das linhas; em parâmetros tipados, `;` separa grupos. |
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

Por compatibilidade, `numerico` e `numérico` são aliases de `real`; `caracter`,
`caráter` e `literal` são aliases de `caractere`; `lógico` é alias de `logico`.
`declare` é alias de `var`. Prefira as formas da tabela nos programas novos. O
[glossário](#doc:glossario) explica a diferença entre tipo, variável e valor.

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

Durante a execução, expanda o valor na seção **Variáveis** para inspecionar as posições do vetor ou da matriz. Vetores grandes são exibidos em páginas para manter a interface responsiva.

![Vetor expandido no painel de variáveis](images/docs/variables-vector.svg)

O console mantém as mensagens na largura disponível, oferece entrada inline ou modal e preserva, à direita, o status e os valores calculados.


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

## Percurso de aprendizado

Depois de conhecer a estrutura, pratique na sequência do
[sumário](#doc:sumario): entrada e saída, operadores, condicionais, repetição e
subprogramas. Cada página traz exemplos e pequenas atividades. Se um conceito
novo aparecer, consulte o [glossário](#doc:glossario); se o programa não
executar, use [Erros e soluções](#doc:erros).

# Erros e soluções

Esta página reúne erros frequentes, explica em que etapa eles aparecem e sugere como investigá-los. O interpretador do VisuAlg Web analisa o código antes de executá-lo; por isso, um erro de escrita ou de tipos impede a execução, enquanto erros de execução dependem dos valores recebidos ou calculados.

## Como investigar uma mensagem

1. Leia a mensagem e localize a linha indicada. No painel **Mensagens**, clique no erro para levar o cursor ao trecho relacionado.
2. Confira a linha e também o comando anterior. Um bloco não encerrado ou um separador ausente pode fazer o erro aparecer algumas linhas depois da causa.
3. Corrija o código e execute novamente. A análise é refeita a cada execução; ao editar o código, as mensagens de erro antigas são limpas.
4. Se a mensagem não tiver linha, procure primeiro por uma operação dependente dos dados, como divisão, índice de vetor ou conversão.

## Etapas do programa

O processamento ocorre em etapas. O **analisador léxico** reconhece palavras, números, textos e símbolos. O **analisador sintático** verifica se eles formam comandos válidos. A **análise semântica** verifica declarações, tipos, chamadas e uso dos comandos. Depois dessas verificações, o **interpretador** executa o algoritmo, pode solicitar dados com `leia` e apresenta resultados com `escreva` ou `escreval`.

Isso ajuda a interpretar o momento do erro: caractere inesperado, texto sem aspas finais e comentário aberto pertencem à leitura dos símbolos; estruturas incompletas são erros de sintaxe; variável não declarada ou tipos incompatíveis são erros semânticos; valores inválidos durante operações aparecem na execução. A indicação de linha aponta o local detectado, que pode estar depois do ponto onde o problema começou.

## Erros comuns

| Mensagem ou sintoma | Causa provável | Como corrigir |
| --- | --- | --- |
| Variável não declarada | O nome não aparece na seção `var`, ou foi digitado diferente. | Declare a variável antes de `inicio` e confira a grafia. |
| Identificador já declarado | O mesmo nome foi declarado duas vezes no mesmo escopo. | Remova a duplicata ou escolha outro nome. |
| `fimalgoritmo` esperado | Falta encerrar o algoritmo ou algum bloco. | Confira `fimse`, `fimcaso`, `fimenquanto`, `fimpara`, `fimprocedimento` e `fimfuncao`, conforme o bloco aberto. |
| Token esperado / token inesperado | Palavra-chave, delimitador ou ordem de comandos não corresponde à estrutura esperada. | Confira a linha indicada e o bloco imediatamente anterior; compare com os exemplos de [condicionais](#doc:condicionais), [repetição](#doc:repeticao) e [subprogramas](#doc:subprogramas). |
| Caractere inválido | Há um símbolo que o analisador não reconhece nessa posição. | Remova-o ou use a forma suportada, por exemplo `<-` para atribuição. |
| String não foi fechada | Falta a aspa dupla final, possivelmente na linha da mensagem. | Feche o texto na mesma linha: `escreval("Olá")`. |
| Comentário de bloco não foi fechado | Um comentário iniciado com `{` não recebeu `}`. | Feche o bloco ou use `//` para comentar até o fim da linha. |
| Tipos incompatíveis | O valor atribuído, argumento ou expressão não combina com o tipo exigido. | Confira os tipos declarados e as regras de [operadores](#doc:operadores) e [funções](#doc:funcoes). |
| Quantidade de argumentos incorreta | A chamada não corresponde à assinatura do procedimento ou função. | Passe todos os parâmetros na ordem declarada; consulte [subprogramas](#doc:subprogramas) e [funções](#doc:funcoes). |
| `interrompa` fora de laço | O comando foi usado sem um laço ativo. | Mova-o para dentro de `enquanto`, `repita` ou `para`. |
| `retorne` fora de função | `retorne` foi usado em um algoritmo principal ou procedimento. | Use-o dentro de uma função; procedimentos não retornam valor. |
| `Entrada invalida para inteiro` ou `real` | O texto informado no console não pode ser convertido para o tipo da variável. | Para `inteiro`, digite um número sem parte decimal; para `real`, use um número com ponto ou vírgula decimal. Consulte [Entrada e saída](#doc:entrada-saida). |
| `Divisao por zero` | O divisor vale zero no momento da operação. | Verifique o divisor antes de dividir. |
| `Vetor ... espera ... indice(s)` | A declaração e o acesso usam quantidades diferentes de dimensões. | Passe um índice por dimensão: vetor simples usa um; matriz usa dois. |
| `Indice ... fora dos limites` | O índice calculado não pertence à faixa declarada. | Compare o índice com os limites declarados, incluindo início e fim. |
| `espera ... argumento(s), mas recebeu ...` | A chamada não passou a quantidade declarada na assinatura. | Compare a chamada com a declaração da função ou procedimento. |
| `O passo do comando para nao pode ser zero` | Um laço `para` não consegue avançar com passo zero. | Use um passo positivo ou negativo diferente de zero. |

As mensagens variam conforme o ponto em que o problema é detectado. Se a sugestão do painel não corresponder ao caso, use a linha como pista, verifique os comandos ao redor e consulte a página específica da linguagem.

## Exemplos de diagnóstico

### Variável não declarada

Código com erro:

```text
algoritmo "SemDeclaracao"
inicio
  total <- 10
  escreval(total)
fimalgoritmo
```

`total` precisa aparecer em `var` antes de `inicio`:

```visualg
algoritmo "ComDeclaracao"
var
  total: inteiro
inicio
  total <- 10
  escreval(total)
fimalgoritmo
```

### Entrada numérica recusada

Se `leia quantidade` espera um inteiro e você digita `3,5`, o valor não pode
ser convertido. Use `3` para quantidade inteira ou declare `quantidade: real`
se casas decimais fizerem sentido. Durante a leitura, o console pede um valor
compatível novamente.

### Índice fora da faixa

Para `notas: vetor [1..3] de real`, os índices válidos são `1`, `2` e `3`.
O índice `0` ou `4` causa erro durante a execução. Confira também o limite do
laço: `para i de 1 ate 3 faca` percorre exatamente as posições declaradas.

## Dicas para evitar problemas

- Escreva um comando por linha e mantenha `var` antes de `inicio`.
- Use os nomes de tipos e comandos aceitos, como `inteiro`, `real`, `caractere`, `logico`, `inicio` e `fimalgoritmo`.
- Mantenha os pares de abertura e fechamento: aspas, parênteses, colchetes, chaves de comentários e palavras de fim dos blocos.
- Faça a leitura antes de usar o dado recebido. Para números, informe um valor numérico no console; para textos, use texto sem aspas na entrada.
- Teste trechos menores quando o erro persistir e use **Depurar** para acompanhar a execução passo a passo e inspecionar as variáveis.
- Consulte [Entrada e saída](#doc:entrada-saida) para `leia` e escrita, [Compatibilidade](#doc:compatibilidade) para limites conhecidos e [Editor e arquivos](#doc:editor) para os controles de execução.

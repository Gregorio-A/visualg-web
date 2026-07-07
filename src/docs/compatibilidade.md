# Compatibilidade com VisuAlg

O alvo deste projeto é executar pseudocódigo o mais próximo possível do VisuAlg 3.0.7, especialmente para uso didático em sala de aula. O Web ainda não é uma cópia completa do desktop; por isso esta tabela separa o que é compatível, o que é parcial e o que é extensão própria da IDE web.

## Compatível

| Recurso | Situação | Observação |
| --- | --- | --- |
| Estrutura `algoritmo`, `var`, `inicio`, `fimalgoritmo` | Suportado | Um programa por arquivo ou aba. |
| Tipos `inteiro`, `real`, `caractere`, `logico` | Suportado | Conversões de entrada são validadas por tipo. |
| Vetores com 1 ou 2 dimensões | Suportado | Índices são validados contra os limites declarados. |
| Atribuição com `<-` | Suportado | Forma recomendada para compatibilidade. |
| `se`, `senao`, `senao se`, `fimse` | Suportado | `senao se` na mesma linha é tratado como encadeamento. |
| `escolha`, `caso`, `outrocaso`, `fimescolha` | Suportado | `caso` aceita vários valores separados por vírgula. |
| `para`, `enquanto`, `repita` | Suportado | Inclui `repita...ate` e `repita...fimrepita`. |
| `procedimento` e `funcao` | Suportado | Inclui parâmetros por valor, por referência e recursão. |
| Função sem parâmetro usada sem parênteses | Suportado | `x <- f` chama `f` quando `f` é função sem parâmetros. |
| `escreva`, `escreval` e `leia` sem parênteses | Suportado | Também continuam aceitando a forma com parênteses. |
| Comentário `//` e comentário `{ ... }` | Suportado | Comentário em bloco sem fechamento gera erro. |
| String entre aspas duplas | Suportado | String sem fechamento gera erro. |
| `limpatela` e `interrompa` | Suportado | `interrompa` só pode ser usado dentro de laços. |

## Parcial

| Recurso | Situação | Diferença atual |
| --- | --- | --- |
| Funções internas matemáticas e de texto | Parcial | Há validação de aridade e domínio nas funções implementadas, mas nem toda função do desktop existe. |
| `pi` | Parcial | O Web aceita `pi` como constante e `pi()` como função interna. |
| Operadores lógicos `e`, `ou`, `xou` | Parcial | A expressão ainda avalia os dois lados; não há curto-circuito. |
| Comparações encadeadas | Parcial | Prefira escrever cada comparação de forma explícita com `e` ou `ou`. |
| Entrada com `leia` | Parcial | O prompt mostra variável e tipo. Entrada inválida gera erro; ainda não repete a pergunta automaticamente. |
| Aleatoriedade | Parcial | Use `rand()` e `randi(limite)`; o comando desktop `aleatorio` não existe. |
| Comentários e strings avançadas | Parcial | Aspas escapadas dentro de string ainda não são uma regra documentada como compatível com o desktop. |

## Não Suportado

| Comando do VisuAlg desktop | Situação no Web |
| --- | --- |
| `arquivo` | Não suportado como comando da linguagem. Use a interface para abrir arquivos de código. |
| `aleatorio` | Não suportado como comando. Use `rand()` ou `randi(limite)`. |
| `timer` | Não suportado como comando. |
| `pausa` | Não suportado como comando. |
| `debug` | Não suportado como comando. Use a execução passo a passo da interface. |
| `eco` | Não suportado como comando. |
| `cronometro` | Não suportado como comando. |

Quando um desses comandos aparece no código, o Web gera erro explícito em vez de tentar executar parcialmente.

## Extensões do Web

| Recurso | Motivo |
| --- | --- |
| Abas persistentes | O código e as abas são restaurados ao reabrir a IDE. |
| Atribuição com `:=` | Atalho aceito para alunos vindos de outros materiais de Portugol; `<-` continua sendo o recomendado. |
| Console com entrada inline ou modal | Facilita o uso no navegador e no desktop. |
| Passo a passo pela interface | Recurso da IDE, não comando da linguagem. |
| Validação interna de programas padrão | Ferramenta de manutenção para verificar regressões sem aparecer na interface. |

## Matriz de precedência

| Ordem | Operadores | Associatividade |
| --- | --- | --- |
| 1 | Parênteses | Expressão interna primeiro |
| 2 | `+`, `-`, `nao` unários | Direita para esquerda |
| 3 | `^` | Direita para esquerda |
| 4 | `*`, `/`, `\`, `div`, `mod`, `%` | Esquerda para direita |
| 5 | `+`, `-` binários | Esquerda para direita |
| 6 | `=`, `<>`, `<`, `>`, `<=`, `>=` | Esquerda para direita |
| 7 | `e` | Esquerda para direita |
| 8 | `ou`, `xou` | Esquerda para direita |

Exemplo: `2 ^ 3 ^ 2` é interpretado como `2 ^ (3 ^ 2)`.

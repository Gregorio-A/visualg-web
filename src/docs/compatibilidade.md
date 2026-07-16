# Compatibilidade com VisuAlg

O interpretador tem como contrato a linguagem do VisuAlg 3.0.7. A mesma implementação de lexer, parser, análise semântica e execução é usada no navegador e no Electron; apenas recursos dependentes do sistema operacional usam adaptadores diferentes.

## Compatível

| Recurso | Situação | Observação |
| --- | --- | --- |
| Estrutura `algoritmo`, `var`, `inicio`, `fimalgoritmo` | Suportado | Um programa por arquivo ou aba. |
| Tipos `inteiro`, `real`, `caractere`, `logico` | Suportado | Conversões de entrada são validadas por tipo. |
| Aliases `declare`, `numerico`, `literal`, `caracter` | Suportado | Formas históricas continuam aceitas. |
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
| Todas as funções internas do manual | Suportado | Inclui validação de quantidade, tipo e domínio dos argumentos. |
| `pi`/`pi()` e `rand`/`rand()` | Suportado | Funções internas sem parâmetros aceitam as duas formas clássicas. |
| Operadores `e`, `ou`, `xou` | Suportado | `e` e `ou` fazem curto-circuito; `xou` avalia ambos os lados por definição. |
| Comparações encadeadas | Suportado | `a < b <= c` compara pares adjacentes e avalia cada operando uma vez. |
| Entrada inválida em `leia` | Suportado | Mostra o erro e repete a leitura sem encerrar o algoritmo. |
| Aspas dentro de string | Suportado | Aceita a forma clássica `""` e também `\"` como extensão. |
| `aleatorio` | Suportado | Inclui `on`, `off`, faixa padrão, limite único e faixa mínima/máxima. |
| `timer` | Suportado | Atraso assíncrono persistente de 0 a 10.000 ms por comando. |
| `pausa` e `debug` | Suportado | Pausa incondicional e condicional com retomada pelo terminal. |
| `eco on/off` | Suportado | Controla se valores de entrada aparecem no console. |
| `cronometro on/off` | Suportado | Mede e mostra o tempo decorrido. |
| `arquivo` | Suportado | Alimenta `leia` e grava entradas quando o arquivo ainda não existe. |

## Equivalência entre navegador e desktop

O código do algoritmo é idêntico nas duas plataformas. A única diferença inevitável é onde `arquivo "nome.txt"` persiste os dados:

| Plataforma | Armazenamento de `arquivo` |
| --- | --- |
| Navegador | Área persistente e isolada do site (`localStorage`), identificada pelo nome informado. |
| Electron | Arquivo de texto físico dentro da pasta de dados do VisuAlg Web, com subpastas relativas permitidas. |

O navegador não pode acessar silenciosamente um caminho arbitrário do computador por causa do modelo de segurança da Web. O adaptador mantém a semântica de leitura, gravação e reutilização sem criar duas versões do interpretador.

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
| 6 | `=`, `<>`, `<`, `>`, `<=`, `>=` | Encadeamento por pares adjacentes |
| 7 | `e` | Esquerda para direita |
| 8 | `ou`, `xou` | Esquerda para direita |

Exemplo: `2 ^ 3 ^ 2` é interpretado como `2 ^ (3 ^ 2)`.

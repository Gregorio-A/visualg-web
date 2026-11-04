# Glossário

Termos usados nesta documentação e nas mensagens do VisuAlg Web.

| Termo | Significado neste projeto |
| --- | --- |
| **Algoritmo** | Sequência finita de comandos organizada para resolver uma tarefa. No código, fica entre `algoritmo "nome"` e `fimalgoritmo`. |
| **Atribuição** | Ação de guardar um valor em uma variável. Escreva `variavel <- expressao`; `=` compara valores e não faz atribuição. |
| **Expressão** | Combinação de valores, variáveis, operadores e funções que produz outro valor, como `preco * quantidade`. |
| **Tipo** | Categoria de valores que uma variável pode armazenar: `inteiro`, `real`, `caractere` ou `logico`. |
| **Variável** | Nome associado a um valor que pode mudar durante a execução. Ela precisa ser declarada antes de ser usada. |
| **Vetor** | Variável que guarda vários valores do mesmo tipo, identificados por índice, como `notas[1]`. |
| **Matriz** | Vetor de duas dimensões, acessado com dois índices, como `notas[linha, coluna]`. |
| **Condição** | Expressão lógica que resulta em `verdadeiro` ou `falso`; controla estruturas como `se` e `enquanto`. |
| **Laço** | Estrutura que repete comandos: `para`, `enquanto` ou `repita`. |
| **Parâmetro** | Nome e tipo declarados na definição de uma função ou procedimento, como `idade: inteiro`. |
| **Argumento** | Valor enviado a um parâmetro ao chamar o subprograma, como `calcular(18)`: `18` é o argumento. |
| **Procedimento** | Subprograma que executa comandos e não fornece um valor para ser usado em uma expressão. |
| **Função** | Subprograma que calcula e devolve um valor, usado em uma expressão ou atribuição. |
| **Escopo** | Região do programa em que uma variável ou parâmetro pode ser acessado. Variáveis locais pertencem ao subprograma onde foram declaradas. |
| **Depuração** | Execução controlada para acompanhar comandos e valores, normalmente passo a passo. |
| **Interpretador** | Parte do VisuAlg Web que lê, verifica e executa o pseudocódigo. |
| **Erro léxico** | Problema ao reconhecer símbolos, como caractere inválido ou texto sem aspas finais. |
| **Erro sintático** | Comandos não formam uma estrutura válida, por exemplo quando falta `fimse`. |
| **Erro semântico** | A estrutura está escrita, mas seu significado é inválido, como usar uma variável não declarada. |
| **Erro de execução** | Problema que só aparece ao calcular ou receber um valor, como divisão por zero ou índice fora dos limites do vetor. |

Para exemplos de uso, siga o [roteiro recomendado](#doc:sumario) ou consulte
[Erros e soluções](#doc:erros) para entender as etapas de análise do programa.

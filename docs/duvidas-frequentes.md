# Dúvidas Frequentes

Respostas rápidas para começar a usar o VisuAlg Web. Para explicações detalhadas, consulte [Erros e soluções](#doc:erros), [Editor e arquivos](#doc:editor) ou [Compatibilidade](#doc:compatibilidade).

## Como começo um algoritmo?

Use a estrutura `algoritmo`, uma seção opcional `var`, o bloco `inicio` e o encerramento `fimalgoritmo`. Um exemplo completo está na página [Introdução](#doc:introducao).

## Como executo o programa?

Clique em **Executar** ou use `F5`/`F9`. Se o código tiver um erro, a execução para e a mensagem aparece no painel **Mensagens**. Clique na mensagem para ir à linha indicada; use o link de explicação para ver possíveis causas e soluções.

## Onde digito os dados pedidos por `leia`?

Durante a execução, o console mostra o pedido e oferece um campo para informar o valor. Digite a entrada e envie para o algoritmo continuar. Para exemplos, consulte [Entrada e saída](#doc:entrada-saida).

## Como vejo o valor das variáveis?

Abra o painel **Variáveis** durante ou depois da execução. No modo **Depurar**, avance passo a passo com `F8` ou `F10` e acompanhe como os valores mudam.

## Meu código é salvo automaticamente?

O trabalho é salvo automaticamente neste navegador. Para manter uma cópia fora do navegador, use **Baixar projeto** ou exporte o arquivo `.alg`. `Ctrl+S` baixa o arquivo ativo.

## Como crio ou organizo arquivos?

Use **Novo** para criar um arquivo e as ações da sidebar para importar, exportar, renomear, duplicar ou organizar arquivos em pastas. Fechar uma aba não exclui o arquivo do projeto. A página [Editor e arquivos](#doc:editor) detalha esses controles.

## Posso abrir vários arquivos ao mesmo tempo?

Sim. Cada arquivo aberto aparece em uma aba. Clique em uma aba para alternar entre arquivos; fechar a aba mantém o arquivo no projeto, disponível na lista de arquivos.

## O que faço quando aparece um erro?

Leia a mensagem, clique nela para posicionar o cursor e verifique também os comandos próximos. Um bloco aberto ou delimitador faltando pode causar o erro em uma linha posterior. A página [Erros e soluções](#doc:erros) explica as mensagens mais comuns.

## O Web é igual ao VisuAlg 3?

O projeto busca compatibilidade com a escrita do VisuAlg, mas algumas partes têm diferenças ou limites próprios. Consulte [Compatibilidade](#doc:compatibilidade) para saber o que está implementado e como interpretar diferenças.

## Como encontro a explicação de um comando?

Passe o cursor sobre uma palavra-chave, operador ou função no editor para abrir uma dica. Quando disponível, use **Abrir explicação na documentação** para ir ao assunto completo. Também é possível pesquisar na aba **Documentação**.

## Qual é a diferença entre `escreva` e `escreval`?

As duas mostram valores no console. `escreva` mantém a saída na mesma linha;
`escreval` termina a saída e começa a próxima linha. Veja exemplos em
[Entrada e saída](#doc:entrada-saida).

## Qual é a diferença entre `<-` e `=`?

`<-` guarda um valor em uma variável; `=` compara dois valores e produz um
resultado lógico. Por isso, use `idade <- 18` para atribuir e `idade = 18` em
uma condição. A página [Operadores](#doc:operadores) mostra os demais símbolos.

## Por que meu laço não termina?

Confira se a condição pode se tornar falsa e se o corpo atualiza a variável
usada nela. No modo **Depurar**, acompanhe a condição e a variável a cada
passo. Consulte [Repetição](#doc:repeticao).

## Como acesso uma posição de vetor?

Use o nome e o índice entre colchetes, como `notas[1]`. Os índices válidos são
os definidos na declaração do vetor. Para matrizes, informe um índice por
dimensão, por exemplo `matriz[1,2]`.

## Quando uso função em vez de procedimento?

Funções devolvem um valor e podem participar de expressões; procedimentos
executam comandos. Veja exemplos em [Funções](#doc:funcoes) e
[Subprogramas](#doc:subprogramas).

## Como fecho uma dica contextual?

Pressione `Esc` ou clique fora do painel da dica. Para abrir a explicação completa, use o link dentro do próprio painel.

## Onde vejo os recursos disponíveis e as limitações conhecidas?

Consulte [Compatibilidade](#doc:compatibilidade) para o contrato da linguagem e [Status do projeto](#doc:status) para correções, validações e pendências do aplicativo.

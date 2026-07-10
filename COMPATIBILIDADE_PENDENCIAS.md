# Pendências para compatibilidade 100% do VisuAlg Web

Este documento lista as correções e implementações necessárias para que o VisuAlg Web passe de "Parcial" e "Não suportado" para um suporte funcional completo, de acordo com os recursos esperados do VisuAlg desktop.

## Parcial

### Funções internas matemáticas e de texto
- Revisar a lista de funções internas implementadas em `src/js/interpreter.js` e comparar com o VisuAlg desktop.
- Implementar todas as funções internas do desktop ausentes no Web.
- Garantir validação de aridade e domínio para cada função interna.
- Cobrir casos de erro de domínio com mensagens de execução claras e consistentes.
- Adicionar testes automatizados para cada função interna implementada.
- Atualizar documentação para listar as funções internas suportadas e as diferenças residuais.

### `pi`
- Confirmar o suporte completo para `pi` como constante e para `pi()` como chamada de função.
- Garantir que o analisador semântico aceite `pi` em contextos de expressão sem erro e que a execução trate `pi` corretamente como `Math.PI`.
- Garantir que `pi()` seja aceito como função sem parâmetros com tipo `real`.
- Adicionar casos de teste que verifiquem ambas as formas e a sua equivalência semântica.

### Operadores lógicos `e`, `ou`, `xou`
- Implementar curto-circuito no avaliador de expressões para `e`, `ou` e `xou`.
- Assegurar que o lado direito de `e` não seja avaliado se o lado esquerdo for `false`.
- Assegurar que o lado direito de `ou` não seja avaliado se o lado esquerdo for `true`.
- Verificar e documentar o comportamento de `xou` em curtas-circuitos (aplicar apenas quando possível).
- Adicionar testes que confirmem efeitos colaterais e avaliação condicional em expressões lógicas.

### Comparações encadeadas
- Implementar suporte a comparações encadeadas (`a < b < c`, `a = b = c`, etc.) no parser e/ou na semântica.
- Ajustar `Parser.prototype.parseComparison` para reconhecer sequências de operadores comparativos e tratá-las corretamente.
- Validar semanticamente as comparações encadeadas, evitando a comparação de booleanos com valores numéricos ou de outro tipo.
- Executar comparações encadeadas como uma conjunção dos subcomparadores, preservando a ordem e a associatividade esperadas.
- Adicionar testes para expressões como `a < b <= c`, `x = y <> z`, `1 < 2 < 3`.

### Entrada com `leia`
- Implementar repetição automática na entrada: quando o usuário fornece valor inválido, o prompt deve reaparecer até receber um valor válido.
- Preservar o comportamento atual de prompt mostrando variável e tipo.
- Tornar a validação de entrada robusta para `inteiro`, `real`, `caractere` e `logico`.
- Garantir que entradas inválidas em `leia` não interrompam a execução do programa com erro inesperado.
- Adicionar testes de interação para `leia` com valores válidos e inválidos.

### Aleatoriedade
- Definir e implementar o comando desktop `aleatorio`, se o objetivo for compatibilidade total com o VisuAlg desktop.
- Se `aleatorio` for uma função interna, suportar seu uso em expressões como as demais funções internas.
- Mapear o comportamento de `aleatorio` para o equivalente do Web (`rand()` / `randi(limite)`), mantendo a mesma semântica desktop.
- Atualizar o parser para aceitar `aleatorio` como palavra reservada ou função interna, conforme definido.
- Adicionar testes para `aleatorio` e para as funções já existentes `rand()` e `randi(limite)`.

### Comentários e strings avançadas
- Implementar escape de aspa dupla dentro de strings, seguindo a regra do VisuAlg desktop.
- Ajustar `Lexer.prototype.readString` para permitir aspas internas válidas sem encerrar a string.
- Garantir que strings com aspas escapadas sejam tokenizadas e avaliadas corretamente.
- Documentar oficialmente a sintaxe de escape de strings no Web, alinhada com o desktop.
- Adicionar testes para strings com conteúdo como `"` ou `""` (dependendo da regra de escape do VisuAlg desktop).

## Não suportado

### `arquivo`
- Definir o comportamento do comando `arquivo` no Web.
- Implementar suporte mínimo ou total ao comando de arquivo, se possível no ambiente do navegador.
- Caso não seja possível suportar leitura/escrita de arquivos como no desktop, documentar claramente o limite e apresentar mensagem de erro amigável.

### `aleatorio`
- Implementar `aleatorio` como comando ou função da linguagem, conforme o desktop espera.
- Garantir que o parser reconheça `aleatorio` e que a execução gere o valor aleatório correto.
- Atualizar a lista de palavras-chave e aliases para remover `aleatorio` da lista de não suportados.

### `timer`
- Implementar o comando `timer` ou uma alternativa compatível no ambiente web.
- Definir seu efeito esperado em VisuAlg desktop e prover equivalência com a interface do navegador.
- Documentar limitações se o comportamento exato não puder ser reproduzido.

### `pausa`
- Implementar `pausa` como comando de suspensão da execução até que o usuário confirme continução.
- Integrar com o terminal ou com a interface da IDE para exibir um aviso e aguardar entrada do usuário.
- Adicionar testes de comportamento de pausa e retomada.

### `debug`
- Implementar suporte ao comando `debug` no parser e executor, se o desktop usa esse comando para inspecionar variáveis ou pausar a execução.
- Alternativamente, mapear `debug` para a execução passo a passo da interface se for semanticamente equivalente.
- Atualizar documentação para mostrar como `debug` funciona no Web.

### `eco`
- Implementar `eco` como comando equivalente a `escreva`/`escreval`, se o desktop o usa dessa forma.
- Garantir suporte a `eco` tanto com parênteses quanto sem parênteses, conforme a sintaxe do VisuAlg desktop.
- Adicionar casos de teste com `eco` para saída de texto e variáveis.

### `cronometro`
- Implementar `cronometro` como comando de medição de tempo ou como atalho para `timer`/`pause`, conforme o desktop.
- Documentar comportamento e limitações específicas do ambiente web.

## Observações finais
- Todas as implementações devem ser cobertas por testes automatizados sempre que possível.
- O parser deve continuar gerando erros explícitos para comandos não suportados, mas os comandos listados acima devem deixar de estar nessa categoria após a implementação.
- A documentação de compatibilidade deve ser atualizada para refletir o status "Suportado" dessas funcionalidades.
- Sempre que uma função ou comando for suportado apenas de forma parcial no navegador, deve haver uma observação clara sobre a diferença em relação ao desktop.

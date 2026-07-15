# Estado da compatibilidade com VisuAlg 3.0.7

Os itens de linguagem que antes estavam classificados como parciais ou não suportados foram implementados no runtime compartilhado pelo navegador e pelo Electron.

## Fechado

- Funções internas matemáticas, trigonométricas, de conversão e texto, com validação de aridade, tipo e domínio.
- `pi`/`pi()` e `rand`/`rand()` como funções internas sem parâmetros.
- Curto-circuito de `e` e `ou`; `xou` avalia os dois operandos porque depende de ambos.
- Comparações encadeadas por pares adjacentes, com avaliação única dos operandos.
- Repetição automática de `leia` após entrada inválida.
- Aspas duplicadas dentro de strings; escapes com barra invertida continuam disponíveis como extensão Web.
- `aleatorio`, incluindo `on`, `off`, faixa padrão, limite único e intervalo mínimo/máximo.
- `timer`, `pausa`, `debug`, `eco` e `cronometro`.
- `arquivo`, com leitura sequencial e gravação das primeiras entradas.
- Semântica clássica de `retorne`: define o retorno sem encerrar antecipadamente o restante da função.
- Aliases `função`, `caracter`, `caráter`, `literal`, `numerico` e `declare`.

## Adaptação de plataforma

O navegador não tem autorização para abrir silenciosamente um caminho arbitrário do computador. Por isso, `arquivo "nome.txt"` usa uma área persistente da origem Web. No Electron, o mesmo comando usa um arquivo de texto físico na pasta de dados do aplicativo. Lexer, parser, análise semântica e executor são os mesmos nas duas plataformas.

## Verificação automatizada

`npm run test:p0` executa:

- regressões semânticas e todos os exemplos completos da documentação;
- programas padrão de entrada, saída, controle de fluxo, vetores e subprogramas;
- matriz legada com todas as funções internas e comandos especiais.

O contrato detalhado está em `src/docs/compatibilidade.md`. Diferenças futuras encontradas contra o binário 3.0.7 devem entrar primeiro como teste de reprodução e só então como alteração do runtime.


• Minha leitura: o núcleo do VisuAlg Web está próximo de 1.0, mas eu ainda não removeria o “Beta”. A linguagem está forte; o que falta é maturidade de lançamento.

  Hoje eu estimaria:

  - Núcleo funcional: aproximadamente 85%.
  - Preparação para produção: aproximadamente 60%.
  - Desktop distribuível: aproximadamente 40%.

  ## Bloqueadores para a versão 1.0

  1. Testes reais da interface

  Os testes atuais validam muito bem o interpretador, exemplos e recuperação, mas não simulam um usuário no navegador.

  Faltam testes E2E para:

  - Abrir e executar exemplos.
  - F8, F9 e Parar.
  - leia inline e modal.
  - Abrir e salvar .alg.
  - Restaurar abas e recuperação.
  - Mostrar/esconder painéis.
  - Navegação de erros.
  - Onboarding.
  - Chrome, Edge e Firefox.

  Também falta CI para executar esses testes automaticamente. Atualmente não há workflow em .github, e o lint ainda é apenas uma mensagem em package.json:16.

  2. Garantia contra perda de código

  Autosave e recuperação já existem, mas para 1.0 eu exigiria:

  - Teste com armazenamento cheio ou indisponível.
  - Aviso persistente quando o salvamento falhar.
  - Exportação de todas as abas como backup.
  - Recuperação de workspace corrompido.
  - Migração versionada do formato do workspace.
  - Teste de fechamento inesperado do navegador/aplicativo.

  3. Segurança da versão Electron

  Os fuses do Electron estão bem configurados, mas ainda faltam:

  - Política CSP.
  - contextIsolation, nodeIntegration e sandbox declarados explicitamente.
  - Bloqueio de navegação para sites externos.
  - Bloqueio de novas janelas não autorizadas.
  - Revisão dos canais IPC.
  - Teste contra caminhos e links simbólicos no comando arquivo.

  A configuração atual está em electron/main.js:44.

  4. Distribuição desktop real

  O Electron empacota, mas isso ainda não significa um aplicativo pronto para o público.

  Para chamar o desktop de 1.0 faltam:

  - Instalador Windows testado em Windows 10 e 11.
  - Ícone, nome do publicador e metadados finais.
  - Assinatura digital do executável.
  - Associação opcional com arquivos .alg.
  - Processo de atualização.
  - Teste de instalação, atualização e desinstalação.
  - Artefatos com checksums.
  - Processo de release reproduzível.

  Os makers existem em forge.config.js:8, mas não há assinatura ou atualização configurada.

  5. Acessibilidade

  A interface possui alguns atributos ARIA, mas ainda falta uma revisão completa:

  - Navegação integral por teclado.
  - Foco preso corretamente dentro dos modais.
  - Retorno do foco ao fechar modal.
  - Leitura adequada por leitor de tela.
  - Contraste em todos os temas.
  - Tamanho mínimo de áreas clicáveis.
  - Uso com zoom de 200%.
  - Mensagens que não dependam apenas de cor.

  6. Validação com alunos e professores

  “1.0” precisa ser validada fora do ambiente de desenvolvimento.

  Critério recomendado:

  - Pelo menos 10 alunos e 3 professores.
  - Primeiro algoritmo executado sem ajuda.
  - Aula completa sem perda de código.
  - Arquivos .alg reais abertos e executados.
  - Registro e correção dos problemas encontrados.
  - Nenhum erro crítico durante pelo menos duas semanas de uso.

  7. Documentação e governança

  Faltam elementos básicos de um produto público:

  - Arquivo LICENSE na raiz — o package.json declara MIT, mas o arquivo não existe.
  - SECURITY.md.
  - Canal claro para relatar bugs.
  - Navegadores e sistemas oficialmente suportados.
  - Política de compatibilidade.
  - Política de privacidade, mesmo que seja para declarar que não há coleta.
  - Checklist de release.
  - Notas da versão 1.0.

  8. Limpeza da identidade de versão

  No lançamento será necessário:

  - Alterar 0.13.0 para 1.0.0.
  - Remover a etiqueta “Beta”.
  - Criar changelog específico da v1.0.
  - Evitar versões duplicadas entre package.json, rodapé e changelog.
  - Gerar a versão da interface a partir de uma única fonte.

  ## Corte recomendado

  Eu faria dois lançamentos separados:

  - VisuAlg Web 1.0: navegador estável e oficialmente suportado.
  - VisuAlg Desktop Preview: Electron ainda em validação.

  Para lançar o Web 1.0, os requisitos mínimos seriam:

  - CI e testes E2E.
  - Auditoria de perda de dados.
  - Revisão de acessibilidade.
  - Teste com alunos e professores.
  - Documentação legal e de suporte.
  - Duas semanas sem bugs críticos.
  - Changelog, versão e identidade atualizados.

  Recursos como conta, nuvem, colaboração e inteligência artificial não são necessários para a 1.0. Eles aumentariam o produto, mas não são bloqueadores. O que falta agora é confiança
  operacional, não mais funcionalidades da linguagem.
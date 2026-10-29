# Status do VisuAlg Web

> Esta é a fonte única para saber o que já foi corrigido, o que ainda está
> pendente e o que depende de validação. Os documentos antigos
> `ANALISE_PROBLEMAS_VISUALG_WEB.md` e `COMPATIBILIDADE_PENDENCIAS.md` foram
> descontinuados para não manter listas concorrentes.

**Versão revisada:** `1.13.0`

**Última revisão:** 29 de outubro de 2026
**Base funcional auditada:** versão `1.1.0`; as verificações desta revisão estão identificadas abaixo.

![Seleção dos temas da versão 1.11](screenshots/interface-temas-1.11.png)

![Editor no tema Steam Clássico](screenshots/interface-steam-1.11.png)

![Calendário dos Desafios do Dia](screenshots/interface-desafios-1.11.png)

## Leitura rápida

| Área | Estado atual | O que falta |
| --- | --- | --- |
| Linguagem | O conjunto documentado está implementado e coberto por regressões. Não há incompatibilidade de linguagem reproduzida registrada como aberta nesta revisão. | Novas diferenças em relação ao VisuAlg 3.0.7 precisam de programa mínimo e teste de reprodução. |
| Aplicação Web | Versão 1.13.0, com 11 temas escuros, 11 claros e 4 clássicos. A edição móvel tem ajuste direto do texto; os operadores usam ligaduras de uma fonte distribuída com o aplicativo. | Reforçar recuperação de dados, concluir validações manuais e realizar uso acompanhado em sala de aula. |
| Desafios do Dia | 365 datas e 730 páginas Markdown, com níveis Iniciante e Avançado, exemplos, dicas progressivas e soluções ocultas. Calendário e lista pesquisável consultam os dias do ano atual desde 1º de janeiro até hoje. | Revisar o material didático com estudantes de diferentes idades; avançados ainda pressupõem conceitos de programação. |
| Abas e autosave | Abas de código e conteúdos auxiliares podem ser fechadas; códigos, aba ativa, estado modificado e uma cópia de recuperação são persistidos e testados. Falhas de salvamento geram aviso visível. | Tratar armazenamento cheio/bloqueado, workspace corrompido, migração e fechamento inesperado; oferecer backup completo. |
| Acessibilidade | Atalhos, navegação por teclado em abas e modais, foco inicial e preso em modais, retorno do foco, ARIA e anúncios de estado foram implementados. | Validar com leitor de tela, zoom de 200%, todos os temas e tamanhos mínimos de alvos de toque. |
| Electron | Isolamento, sandbox, CSP, IPC e proteção de caminhos possuem regressões automatizadas. A versão 1.13 adiciona pasta real escolhida pelo usuário, navegação e salvamento de `.alg`/`.txt`, e uma build portátil Windows x64. | Validar o executável em Windows real, assinatura de código e distribuições adicionais. |
| Build e arquitetura | A build Web é gerada com sucesso e os assets necessários são copiados. | Os scripts clássicos ainda produzem avisos esperados do Vite e mantêm dependência de globais e ordem de carregamento. |

Esta tabela não significa “100% idêntico em qualquer caso”. O contrato funcional
da linguagem fica na aba **Compatibilidade**. Um comportamento não listado deve
ser reproduzido e verificado antes de ser classificado.

## Evidência da revisão

Na revisão de 6 de outubro de 2026, `npm run test:ci` passou com:

- ESLint sobre interface, Electron e testes;
- 31 programas completos extraídos da documentação;
- 18 programas padrão com saída esperada;
- matriz legada, funções internas e semântica avançada;
- 37 exemplos da galeria;
- autosave e troca segura da cópia de recuperação;
- segurança Electron;
- build Web de produção. A build ainda informa avisos de scripts globais sem `type="module"`.

A suíte Playwright roda separada de `npm run test:ci`, por meio de
`npm run test:e2e`. Os resultados citados acima pertencem à revisão da versão
1.0. Na preparação da versão 1.1, foram geradas novas capturas do navegador e
verificada a geração estrutural das 730 páginas de desafios; esses registros
não equivalem a uma validação manual em dispositivos reais.

Em 24 de outubro de 2026, `npm run build:web` concluiu a build da versão 1.1,
incluindo as 730 páginas Markdown e as novas capturas da documentação.
`npm audit --omit=dev --audit-level=high` não apontou vulnerabilidades nas
dependências de produção. A suíte automatizada completa não foi repetida nesta
etapa de documentação e publicação.

Em 29 de outubro de 2026, a preparação da versão 1.12 executou `npm ci`,
`npm run test:ci` e `npm audit --omit=dev --audit-level=high` com sucesso.
A suíte incluiu lint, regressões P0, programas padrão, 200 programas gerados,
17 casos adicionais de linguagem, compatibilidade, exemplos, recuperação do
workspace, segurança Electron e build Web. A auditoria das dependências de
produção não apontou vulnerabilidades; `npm ci` ainda informou avisos em
dependências de desenvolvimento. As verificações visuais realizadas em
navegador não substituem teste em dispositivo Android real nem validação de
instaladores Electron.

Em 29 de outubro de 2026, a versão 1.12.1 passou em `npm run test:ci`,
incluindo lint, regressões de linguagem e build Web. Uma verificação em Chromium
com viewport móvel confirmou o ajuste de 14 para 16 e 12 px, a persistência do
valor e a desativação das ligaduras na fonte Fira Code. A verificação não
substitui teste de toque em dispositivos e teclados móveis reais.

Na revisão 1.12.2, `npm run test:ci` passou. Uma verificação em Chromium
confirmou que Fira Code é carregada antes de abrir a interface, que os
operadores mantêm a mesma fonte e as ligaduras ativas ao trocar a fonte do
editor, e que comentários, strings e o código salvo preservam os caracteres
originais. Outros navegadores e dispositivos reais ainda requerem validação.

Na 1.13.0, foram adicionadas regressões para criação, leitura, gravação,
conflito de versão, renomeação, exclusão, travessia de caminhos, links
simbólicos e arquivos binários no projeto desktop. O pacote portátil Windows
x64 é gerado por GitHub Actions a partir da tag, com checksum SHA-256. A
instalação e a abertura em computadores Windows reais ainda exigem validação.

## Como interpretar os estados

- **Pendente:** a lacuna foi confirmada e ainda não existe solução completa.
- **Em validação:** já há implementação, mas falta comprovar cenários ou
  ambientes importantes.
- **Planejado:** é uma melhoria desejável, não um defeito do contrato atual.
- **Concluído:** há implementação e evidência suficiente para retirar o item da
  lista ativa.

Prioridade **alta** indica risco para dados, acessibilidade ou publicação;
**média** indica limitação perceptível; **baixa** indica manutenção ou polimento.

## Pendências ativas

| ID | Prioridade | Estado | Pendência e critério de conclusão |
| --- | --- | --- | --- |
| DATA-001 | Alta | Pendente | **Resiliência do workspace.** Tratar armazenamento cheio ou indisponível, conteúdo corrompido, migração versionada e fechamento inesperado. Concluir quando esses cenários tiverem comportamento recuperável, aviso persistente e testes automatizados. |
| DATA-002 | Alta | Pendente | **Backup completo.** Exportar e importar todas as abas em um formato versionado. Concluir quando ida, volta e rejeição de backup inválido estiverem testadas. |
| A11Y-001 | Alta | Em validação | **Auditoria assistiva.** Validar leitor de tela, zoom de 200%, contraste de todos os temas, mensagens sem dependência exclusiva de cor e alvos de toque. Concluir com registro dos ambientes e correção dos achados. |
| PILOT-001 | Alta | Pendente | **Uso real.** Validar com pelo menos 10 alunos e 3 professores, incluindo abertura de arquivos `.alg`, uma aula sem perda de código e duas semanas de uso acompanhado sem defeitos críticos. |
| DESKTOP-001 | Alta | Em validação | **Distribuição Electron.** A edição portátil Windows x64 dispensa instalação e tem geração reproduzível e checksum. Validar abertura em computadores Windows reais, definir ícone/publicador, obter assinatura de código e planejar atualização. |
| EDITOR-001 | Média | Em validação | **Estado de arquivo por aba.** O indicador de alteração desde o último download e o nome de arquivo persistem por aba. Ainda falta registrar data/origem do último export e validar casos de importação e recuperação. |
| FILE-001 | Média | Pendente | **Falsos positivos ao abrir `.alg`.** O filtro textual bloqueia palavras parecidas com HTML/JavaScript mesmo que estejam em comentários ou strings. Concluir com validação adequada ao fato de o arquivo ser exibido como texto no editor. |
| ERROR-001 | Média | Pendente | **Mensagens de erro uniformes.** Nem todo erro semântico ou de execução possui linha, coluna e trecho. Concluir quando a localização e a orientação didática forem consistentes nas fases do interpretador. |
| MOBILE-001 | Média | Em validação | **Interface móvel.** Há teste de viewport estreita e captura visual; o Backspace foi verificado em navegador com perfil Android. Ainda é necessário validar em dispositivos reais o editor, teclado virtual, áreas de toque e janelas auxiliares. |
| RELEASE-001 | Média | Concluído | **Versão em uma única fonte.** `package.json` define a versão técnica 1.13.0; a tela de abertura e o cabeçalho exibem 1.13. A identificação Beta foi retirada com a adoção da versão 1.0. |
| DOCS-001 | Baixa | Pendente | **Carregamento seguro da documentação.** Verificar `response.ok` e definir uma fronteira de sanitização antes de aceitar qualquer Markdown que não faça parte do pacote local. |
| TECH-001 | Baixa | Planejado | **Scripts clássicos e globais.** Modularizar gradualmente o runtime e permitir que o Vite empacote o código sem os avisos atuais, preservando os testes existentes. |

## Melhorias planejadas que não são bloqueadores

Os itens abaixo podem melhorar a experiência, mas não devem ser confundidos com
incompatibilidades ou regressões conhecidas:

- breakpoints, call stack visual e separação de escopos no depurador;
- autocomplete e ajuda contextual;
- formatador baseado em tokens ou AST, preservando comentários;
- restauração rápida das configurações padrão;
- associação opcional de arquivos `.alg` e atualização automática no desktop.

## Correções concluídas

| Versão | Principais entregas consolidadas | Evidência atual |
| --- | --- | --- |
| `1.13.0` | Windows portátil x64; escolha de pasta real, árvore navegável, operações em arquivos e proteção contra conflitos. | Regressão do acesso ao disco e fluxo de interface; build e validação em Windows via workflow de release. |
| `1.12.2` | Ligaduras dos operadores restauradas com Fira Code embarcada e carregada na abertura; sem alterar o código salvo. | Verificação em Chromium do carregamento da fonte, aparência dos operadores e preservação do texto; validação em outros navegadores e dispositivos reais ainda pendente. |
| `1.12.1` | Ajuste direto da fonte no editor móvel; operadores de código sem ligaduras dependentes do dispositivo; símbolos matemáticos explícitos na documentação. | Suíte automatizada e verificação dos controles e estilos em Chromium; validação em Android real ainda pendente. |
| `1.12` | Melhoria de execução e entrada vazia; ações dos temas clássicos; menus de arquivos; edição numérica; barras de rolagem; documentação e quebra de linha móveis; Backspace Android. | Regressões de linguagem e programas, verificações de código e build Web desta versão; validação Android real ainda pendente. Consulte o histórico para detalhes. |
| `1.1` | Desafios do Dia com 730 materiais; calendário desde 1º de janeiro; Steam Clássico e Windows 95; remoção de seis peles antigas; refinamento do editor e do console; nova documentação e capturas. | Catálogo e páginas gerados com cobertura de 365 datas; capturas Chromium da interface 1.1; build Web e auditoria das dependências de produção concluídas. Consulte as notas de versão para detalhes e limites da verificação. |
| `1.0` | Primeira versão principal independente; 11 temas escuros e 11 temas claros, além de 8 temas clássicos; identificação de versão derivada do pacote. | `npm run test:ci` passou; testes E2E dos temas e seus contrastes também passaram nesta revisão. |
| `0.14` | Identidade própria do fork; nova interface com abas unificadas, painéis responsivos, 26 temas claros e escuros e destaque de sintaxe; Console em painel/aba/modal/janela/aba externa; fontes independentes; teclado, foco e ARIA; segurança Electron; lint, CI e testes E2E. | `npm run test:ci` passou em 6/10/2026; navegação de documentação verificada em Chromium. Suíte E2E completa não executada nesta revisão. |
| `0.13` | Onboarding e galeria; erro clicável; estado visível do autosave e recuperação; controle dos painéis; `senao se`; E/S sem parênteses; funções sem `()`; `pi`; entrada inválida repetida; comandos especiais e semântica avançada. | `npm run test:compat`, `npm run test:standard`, `npm run test:examples`, `npm run test:workspace` e testes E2E. |
| `0.12` | Persistência das abas e códigos, restauração da sessão, programas padrão e documentação de história/autoria. | `npm run test:workspace` e `npm run test:standard`. |
| `0.11` | Erro para tokens inválidos e blocos abertos; análise semântica de nomes, tipos, aridade e contexto; limites de vetores; divisão por zero; domínios matemáticos; isolamento da execução entre abas. | Regressões semânticas em `npm run test:p0`; bloqueio de ações entre abas implementado no gerenciador de abas. |
| `0.10` | Detecção de possível loop infinito, atalho para comentários, correções de atribuição/variáveis, tratamento de `raizq` negativa e documentação. | Histórico incorporado ao projeto e cobertura parcial por regressões posteriores. |
| `0.9` e anteriores | Funções e procedimentos, documentação da linguagem, configurações, autoindentação, alto contraste, múltiplas abas, salvamento e melhorias de interface do projeto-base. | Histórico do projeto-base; cobertura automatizada apenas para comportamentos preservados no runtime atual. |

As versões `0.9` e anteriores pertencem ao legado do projeto-base. O histórico de
origem e autoria fica na aba **História**.

## Onde cada informação deve ficar

| Pergunta | Fonte correta |
| --- | --- |
| O que foi corrigido e o que ainda falta? | Este documento, `src/docs/status.md`. |
| Qual sintaxe e quais recursos funcionam hoje? | `src/docs/compatibilidade.md` e os demais guias da linguagem. |
| Quais regras uma mudança incompatível deve seguir? | `COMPATIBILITY.md`, na raiz do repositório. |
| Quais navegadores e sistemas recebem suporte? | `SUPPORT.md`, na raiz do repositório. |
| Quais passos uma publicação precisa cumprir? | `RELEASE_CHECKLIST.md`, na raiz do repositório. |
| Onde relatar um caso novo? | Página de Issues do GitHub, com versão, ambiente e programa `.alg` mínimo. |

O checklist de release é um procedimento: caixas desmarcadas nele não são
automaticamente defeitos atuais. Issues são usadas para discussão e execução;
somente problemas reproduzidos e aceitos entram na tabela de pendências acima.

## Regra de manutenção

1. Não criar outra lista de estado atual, roadmap, problemas ou pendências.
   Notas de release podem resumir uma versão, mas não devem carregar backlog.
2. Ao confirmar um problema, registrá-lo acima com ID, estado e critério de
   conclusão.
3. Ao corrigir um item, removê-lo da tabela ativa e registrar seu ID na linha da
   versão correspondente em **Correções concluídas**, junto do teste que evita
   regressão. Entregas anteriores à adoção deste status não possuem ID.
4. Se a mudança alterar a linguagem, atualizar também a matriz de
   compatibilidade, sem copiar o backlog para ela.
5. Atualizar a versão e a data no topo deste documento em cada revisão de
   status.

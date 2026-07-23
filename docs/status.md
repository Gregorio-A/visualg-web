# Status do VisuAlg Web

> Esta é a fonte única para saber o que já foi corrigido, o que ainda está
> pendente e o que depende de validação. Os documentos antigos
> `ANALISE_PROBLEMAS_VISUALG_WEB.md` e `COMPATIBILIDADE_PENDENCIAS.md` foram
> descontinuados para não manter listas concorrentes.

**Versão revisada:** `0.14.0`

**Última revisão:** 21 de julho de 2026
**Base funcional auditada:** `main` em `79e2b94`, antes desta consolidação documental

## Leitura rápida

| Área | Estado atual | O que falta |
| --- | --- | --- |
| Linguagem | O conjunto documentado está implementado e coberto por regressões. Não há incompatibilidade de linguagem reproduzida registrada como aberta nesta revisão. | Novas diferenças em relação ao VisuAlg 3.0.7 precisam de programa mínimo e teste de reprodução. |
| Aplicação Web | Build, lint, regressões e os principais fluxos de interface possuem automação. A versão continua Beta. | Reforçar recuperação de dados, concluir validações manuais e realizar uso acompanhado em sala de aula. |
| Abas e autosave | Abas, códigos, aba ativa e uma cópia de recuperação são persistidos e testados. Falhas de salvamento geram aviso visível. | Tratar armazenamento cheio/bloqueado, workspace corrompido, migração e fechamento inesperado; oferecer backup completo. |
| Acessibilidade | Atalhos, navegação por teclado em abas e modais, foco inicial e preso em modais, retorno do foco, ARIA e anúncios de estado foram implementados. | Validar com leitor de tela, zoom de 200%, todos os temas e tamanhos mínimos de alvos de toque. |
| Electron | Isolamento, sandbox, CSP, IPC e proteção de caminhos possuem regressões automatizadas. | Preparar e validar a distribuição pública dos instaladores. |
| Build e arquitetura | A build Web é gerada com sucesso e os assets necessários são copiados. | Os scripts clássicos ainda produzem avisos esperados do Vite e mantêm dependência de globais e ordem de carregamento. |

Esta tabela não significa “100% idêntico em qualquer caso”. O contrato funcional
da linguagem fica na aba **Compatibilidade**. Um comportamento não listado deve
ser reproduzido e verificado antes de ser classificado.

## Evidência da revisão

Na revisão desta versão, `npm run test:ci` passou com:

- ESLint sobre interface, Electron e testes;
- 31 programas completos extraídos da documentação;
- 18 programas padrão com saída esperada;
- matriz legada, funções internas e semântica avançada;
- 37 exemplos da galeria;
- autosave e troca segura da cópia de recuperação;
- segurança Electron;
- build Web de produção.

A suíte Playwright cobre os principais fluxos da interface. Localmente, ela roda
separada de `npm run test:ci`, por meio de `npm run test:e2e`; o CI executa
projetos separados para Chrome, Edge e Firefox. Nesta revisão,
`npm run test:e2e:chromium` passou com 10 testes.

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
| DESKTOP-001 | Alta | Pendente | **Distribuição Electron.** Testar instaladores nas plataformas publicadas, definir ícone/publicador/metadados, assinatura quando aplicável, checksums e um processo reproduzível de instalação, atualização e remoção. |
| EDITOR-001 | Média | Pendente | **Estado de arquivo por aba.** Hoje o fechamento compara o código com o template inicial. Concluir quando cada aba controlar nome de origem, estado modificado e último salvamento sem alertas falsos. |
| FILE-001 | Média | Pendente | **Falsos positivos ao abrir `.alg`.** O filtro textual bloqueia palavras parecidas com HTML/JavaScript mesmo que estejam em comentários ou strings. Concluir com validação adequada ao fato de o arquivo ser exibido como texto no editor. |
| ERROR-001 | Média | Pendente | **Mensagens de erro uniformes.** Nem todo erro semântico ou de execução possui linha, coluna e trecho. Concluir quando a localização e a orientação didática forem consistentes nas fases do interpretador. |
| MOBILE-001 | Média | Em validação | **Interface móvel.** Navegadores móveis continuam em melhor esforço. Revalidar editor, controles, modais e áreas de toque em larguras pequenas e criar ao menos um teste de viewport móvel. |
| RELEASE-001 | Média | Pendente | **Versão em uma única fonte.** A versão ainda é repetida no `package.json`, na interface e em formulários. Concluir quando a build derivar esses valores de uma fonte única e a retirada da etiqueta Beta tiver critério explícito. |
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
| `0.14` | Identidade própria do fork; base pública de suporte e governança; teclado, foco e ARIA; segurança Electron; lint, CI e testes E2E; lógica de resize retirada do HTML. | `npm run lint`, `npm run test:security`, suíte Playwright e workflow de CI. |
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
| Onde relatar um caso novo? | Formulário de bug do repositório, com versão, ambiente e programa `.alg` mínimo. |

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

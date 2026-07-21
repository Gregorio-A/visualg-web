# Checklist de release
Pelo amor de deus, não esqueça de fazer esse checklist antes de lançar uma nova versão:

## Preparação

- [ ] Definir escopo e revisar os bloqueadores em [`src/docs/status.md`](src/docs/status.md).
- [ ] Confirmar que as issues da release estão resolvidas ou explicitamente adiadas no status.
- [ ] Atualizar versão em `package.json`, lockfile e interface.
- [ ] Mover itens concluídos para o histórico de correções em `src/docs/status.md` e registrar as limitações restantes.
- [ ] Atualizar compatibilidade, plataformas e políticas quando necessário.
- [ ] Revisar dependências e avisos de segurança (`npm audit`).
- [ ] Confirmar que nenhum segredo, dado pessoal ou artefato local entrou no diff.

## Qualidade

- [ ] Executar `npm ci` em ambiente limpo.
- [ ] Executar `npm run test:p0`.
- [ ] Executar `npm run build:web`.
- [ ] Testar teclado, foco em modais, leitor de tela, zoom de 200% e temas.
- [ ] Testar F8, F9, Parar, `leia`, erros, abrir e salvar `.alg`/`.txt`.
- [ ] Confirmar autosave e recuperação após fechar e reabrir.
- [ ] Fazer smoke test nos navegadores oficialmente suportados.

## Electron

- [ ] Executar `npm run test:security`.
- [ ] Validar CSP sem violações inesperadas e sem scripts remotos.
- [ ] Confirmar `contextIsolation`, `sandbox` e ausência de Node no renderer.
- [ ] Tentar navegação externa, pop-up e chamadas IPC fora do frame principal.
- [ ] Testar travessia e links simbólicos no comando `arquivo`.
- [ ] Executar `npm run make` nas plataformas que receberão artefatos.
- [ ] Instalar e abrir cada artefato; verificar assinatura quando aplicável.

## Publicação

- [ ] Criar tag assinada no formato `vX.Y.Z` a partir do commit revisado.
- [ ] Publicar release com resumo, correções, incompatibilidades e limitações.
- [ ] Anexar artefatos e checksums somente das plataformas testadas.
- [ ] Conferir links, licença, aviso de privacidade e canal de bugs na página pública.
- [ ] Fazer smoke test da implantação Web em produção.
- [ ] Manter procedimento de rollback e monitorar relatos após a publicação.

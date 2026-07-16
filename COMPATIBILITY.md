# Política de compatibilidade

## Objetivo

O VisuAlg Web busca executar programas educacionais escritos para o VisuAlg
3.0.7 sem alterar seu significado. A tabela funcional detalhada fica em
[`src/docs/compatibilidade.md`](src/docs/compatibilidade.md).

## Classes de comportamento

- **Suportado:** coberto pelo interpretador e tratado como compromisso de compatibilidade.
- **Parcial:** funciona apenas nas condições documentadas; pode ganhar cobertura sem aviso.
- **Não suportado:** não há compromisso de funcionamento.
- **Extensão Web:** recurso próprio, aceito desde que não mude o significado de um programa clássico válido.

## Mudanças

Correções que aproximam o comportamento do VisuAlg 3.0.7 podem alterar um
resultado que dependia de um bug desta implementação. Elas devem aparecer nas
notas de versão e ganhar teste de regressão.

Mudanças incompatíveis deliberadas exigem justificativa, documentação de
migração e incremento de versão principal. Durante a fase beta, superfícies de
interface e extensões ainda podem evoluir, mas programas classificados como
“Suportado” não devem quebrar silenciosamente.

Arquivos de workspace/autosave são internos e não constituem formato público de
intercâmbio. Arquivos `.alg` e `.txt` permanecem os formatos portáveis.

## Plataformas

O mesmo interpretador em `src/` é usado na Web e no Electron. Diferenças de
persistência do comando `arquivo` são intencionais e documentadas. A matriz de
navegadores e sistemas fica em [`SUPPORT.md`](SUPPORT.md).

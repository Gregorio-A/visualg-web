# Como contribuir

Obrigado pelo interesse no VisuAlg Web. O projeto aceita correções, melhorias de
compatibilidade, acessibilidade, documentação e novos testes.

## Antes de começar

1. Consulte o [`status do projeto`](src/docs/status.md) e procure uma issue
   existente para evitar trabalho duplicado.
2. Para mudanças maiores, abra uma proposta e descreva comportamento, motivação
   e impacto na compatibilidade com o VisuAlg.
3. Vulnerabilidades não devem ser discutidas publicamente; siga o
   [`SECURITY.md`](SECURITY.md).
4. Ao participar, siga o [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

## Ambiente local

Use Node.js 22 ou mais recente e npm 10 ou mais recente:

```bash
npm install
npm run test:ci
```

Mudanças de interface também devem passar pelo teste E2E relacionado:

```bash
npx playwright install chromium
npm run test:e2e:chromium
```

## Pull requests

- Mantenha cada pull request focado em um problema.
- Explique o que mudou, como foi validado e quais limitações permanecem.
- Inclua ou atualize testes para mudanças de comportamento.
- Atualize a documentação e a matriz de compatibilidade quando necessário.
- Ao resolver ou confirmar uma pendência, atualize `src/docs/status.md` sem criar
  uma lista concorrente.
- Não inclua arquivos gerados, dados pessoais, credenciais ou dependências sem
  necessidade demonstrada.
- Confirme que você tem direito de disponibilizar sua contribuição sob a
  licença MIT do projeto.

O mantenedor pode pedir ajustes antes da integração. A aceitação considera
corretude, segurança, acessibilidade, compatibilidade, manutenção e aderência ao
escopo educacional.

## Contato

O mantenedor responsável é **Murilo Gregorio Alves**. Consulte os canais e a
separação entre suporte atual e créditos históricos em [`CONTACT.md`](CONTACT.md).

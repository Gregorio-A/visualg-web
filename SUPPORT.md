# Plataformas suportadas

Esta matriz define o suporte oficial da versão atual. “Suportado” significa que
o projeto aceita relatórios reproduzíveis e busca corrigir regressões; não
significa que toda combinação recebe teste automatizado em cada commit.

## Web

- Chrome e Edge: versão estável atual e imediatamente anterior.
- Firefox: versão estável atual, anterior e ESR vigente.
- Safari no macOS: versão estável atual e imediatamente anterior.
- JavaScript, Web Storage e downloads do navegador devem estar habilitados.

Navegadores móveis, versões beta/nightly, navegadores incorporados e versões
mais antigas podem funcionar, mas recebem suporte em melhor esforço. Internet
Explorer não é suportado.

## Aplicativo Electron

- Windows 10 e 11, 64 bits.
- macOS: versão atual e as duas versões principais anteriores, em Intel ou Apple Silicon quando houver artefato publicado para a arquitetura.
- Linux: Ubuntu LTS vigente e Fedora estável vigente, 64 bits.

Outras distribuições Linux podem funcionar com `.deb`, `.rpm` ou pacote
compactado, mas ficam em melhor esforço. Uma plataforma só é considerada
oficialmente distribuída quando há artefato dela anexado à release.

## Ao pedir suporte

Informe versão do VisuAlg Web, sistema, navegador/versão quando aplicável,
código `.alg` mínimo, resultado obtido e resultado esperado. Use o
[formulário de bug](https://github.com/Gregorio-A/visualg-web/issues/new?template=bug_report.yml).

Consulte também a [política de compatibilidade](COMPATIBILITY.md).

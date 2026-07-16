# Política de segurança

## Versões cobertas

Somente a versão mais recente publicada recebe correções de segurança. Não há
backports para versões anteriores durante a fase beta.

| Versão | Suporte de segurança |
| --- | --- |
| Última versão publicada | Sim |
| Versões anteriores | Não |
| Branches e builds de desenvolvimento | Não |

## Como relatar uma vulnerabilidade

Não abra uma issue pública para uma vulnerabilidade ainda não corrigida.

Use, de preferência, o recurso **Report a vulnerability** na aba Security do
[repositório](https://github.com/Gregorio-A/visualg-web/security/advisories/new).
Se esse recurso não estiver disponível, envie o relato para
`contato@conradosal.com` com o assunto `[SECURITY] VisuAlg Web`.

Inclua a versão, plataforma, impacto, passos mínimos para reprodução e, se
possível, uma prova de conceito sem dados pessoais. Não envie segredos reais.

O projeto buscará confirmar o recebimento em até 7 dias corridos, avaliar o
impacto e combinar uma divulgação responsável. O prazo de correção depende da
gravidade e da complexidade. Crédito será dado quando solicitado e seguro.

## Escopo

São especialmente relevantes: escape do sandbox Electron, execução de código
no processo principal, travessia de diretórios, acesso indevido aos arquivos do
usuário, XSS persistente, exposição de dados e bypass da política de navegação.

Bugs comuns, incompatibilidades e sugestões devem ser enviados pelo
[formulário público de bugs](https://github.com/Gregorio-A/visualg-web/issues/new?template=bug_report.yml).

## Inventário IPC do Electron

O preload expõe somente o objeto `visualgDesktopDataFiles`, sem acesso genérico
ao `ipcRenderer`:

| Canal | Direção | Dados | Finalidade |
| --- | --- | --- | --- |
| `visualg-data-file:read` | renderer → main | nome relativo | Ler entradas do comando `arquivo`. |
| `visualg-data-file:append` | renderer → main | nome relativo e valor | Acrescentar uma entrada do comando `arquivo`. |

Os handlers aceitam apenas o frame principal da janela, limitam entradas e
rejeitam caminhos fora de `visualg-data`, arquivos especiais e links
simbólicos. Novos canais exigem atualização desta tabela, API mínima no preload
e caso de teste em `scripts/electron-security-check.mjs`.

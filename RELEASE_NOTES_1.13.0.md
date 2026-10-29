# VisuAlg Web 1.13.0 — Windows portátil

Baixe `VisuAlg-Web-1.13.0-portable-x64.exe` nos arquivos desta release. Execute diretamente no Windows 10/11 x64; não há instalador. O arquivo é autossuficiente para distribuição e extrai seus componentes temporariamente ao iniciar. O SHA-256 está em `SHA256SUMS.txt`.

Na guia **Arquivos**, clique em **Abrir pasta**. A árvore mostra as pastas e arquivos reais. Abra `.alg` ou `.txt`, crie arquivos e pastas, renomeie ou exclua itens pelo botão direito e use **Salvar** para gravar no disco. A gravação verifica se outro programa alterou o arquivo desde a abertura.

O acesso a arquivos é limitado à pasta escolhida. Links simbólicos, travessia de caminhos e arquivos binários não são abertos; arquivos de código têm limite de 5 MB. A pasta deve ser escolhida novamente em cada inicialização. Abas recuperadas do histórico local não ficam associadas automaticamente ao arquivo físico.

Este executável ainda não tem assinatura de código. O SmartScreen do Windows pode pedir confirmação na primeira execução. O projeto e o checksum permitem conferir o arquivo obtido nesta release.

As demais melhorias desde 1.12.2 estão no [histórico de versões](CHANGELOG.md). A edição Web continua disponível separadamente.

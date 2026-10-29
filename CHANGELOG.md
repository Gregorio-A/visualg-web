# Histórico de versões

## 1.12.0 — 29 de outubro de 2026

### Execução e entrada

- Reduz o custo de programas longos: o painel de variáveis atualiza por quadro em execução contínua e sincroniza ao pausar ou terminar; o console reúne escritas consecutivas e evita agendar rolagens repetidas; o interpretador cede tempo à interface em intervalos controlados em vez de criar um timer a cada saída ou iteração.
- `leia` aceita Enter vazio e avança para a próxima variável. O valor padrão é `0` para inteiro e real, texto vazio para caractere e `FALSO` para lógico, inclusive em elementos de vetor. Cancelar a execução durante a leitura continua interrompendo o programa.

### Interface e editor

- Reúne as ações rápidas no lado direito da barra de ferramentas dos quatro temas clássicos, com botões e ícones maiores. Os controles espelham rótulos, estados e disponibilidade dos botões principais.
- Restringe os ponteiros personalizados de mouse, texto, carregamento e demais estados aos quatro temas clássicos; os temas modernos usam os cursores padrão do navegador.
- O tema Steam Clássico só é aplicado por clique no seletor; passar o mouse sobre ele não muda a aparência automaticamente.
- O clique direito na área vazia da lista de arquivos oferece criar arquivo, criar pasta e importar. Nas pastas, oferece criar arquivo na pasta, renomear e excluir; arquivos existentes mantêm seu menu contextual.
- As pílulas numéricas das Configurações e dos ajustes rápidos do editor aceitam edição pelo teclado ao clicar no valor. Enter aplica, Esc cancela, e arrastar, rolar e usar os botões de incremento continuam disponíveis.
- Unifica as barras de rolagem com as cores dos temas e substitui o canto branco do editor pela cor da superfície correspondente.
- Corrige a documentação lateral: itens não encolhem nem deixam a descrição escapar do cartão. Em telas pequenas, capturas da documentação cabem na coluna e podem ser ampliadas pelo controle existente.
- Permite desativar a quebra de linha também em telas pequenas e mantém a escolha ao redimensionar.
- Trata Backspace do teclado virtual Android no editor, inclusive para unir linhas ao apagar no começo de uma linha.

### Validação e limites

- Adiciona regressão de linguagem para `leia` vazio nos quatro tipos e em vetor.
- O comportamento de Backspace foi reproduzido em navegador com perfil Android; ainda depende de confirmação em dispositivos e teclados Android reais.
- A build Web é preparada na branch `visualg-deploy-web` para implantação manual no site. Esta versão não publica instaladores Electron nem atualiza o site automaticamente.

## 1.11.0 — 24 de outubro de 2026

- Reorganiza a página inicial em boas-vindas, duas ações principais, links de apoio, Desafios do Dia e Arquivos recentes. Os painéis de continuidade ficam lado a lado quando há espaço e se empilham em telas estreitas.
- Separa os dois níveis diários em cartões com descrições curtas e acesso direto, além de um link para o calendário.
- Os arquivos recentes ganham painel próprio, data da última abertura quando disponível, estado vazio e uma opção para removê-los apenas dessa lista.
- Apresenta calendário e exercícios selecionados lado a lado na Documentação, com adaptação para telas pequenas, legenda e estados visuais mais fáceis de distinguir.
- Adiciona prévia dos títulos no hover e foco do calendário, acesso rápido ao dia atual e uma lista de desafios pesquisável e filtrável por dificuldade. A lista mostra os dias disponíveis do ano mais recente primeiro, com carregamento progressivo.
- Recolhe as orientações gerais em seções expansíveis. Em cada exercício, as dicas aparecem uma a uma; o editor pode iniciar um algoritmo novo e a solução exige confirmação antes de ser revelada.
- Preserva a data consultada durante a virada do dia. Quando a pessoa acompanha o dia atual, o calendário avança automaticamente.
- Remove as capturas de tela inseridas dentro da própria página de Desafios do Dia; o conteúdo interativo ocupa esse espaço.
- Atualiza as capturas externas da interface e a versão exibida no aplicativo para 1.11.
- Cria arquivos de imediato, com nome único e pasta definida pelo contexto atual, sem abrir o formulário de criação. O botão **+** das abas também cria o arquivo diretamente.
- Sincroniza o nome do arquivo e a declaração `Algoritmo "..."` nos dois sentidos, inclusive ao duplicar ou importar. `F2` renomeia o arquivo ativo ou o selecionado na lista.
- Substitui a sequência `Ctrl+K`, `Z` por `Ctrl+Shift+F` (`Cmd+Shift+F` no macOS) para alternar o modo foco; `Esc` continua saindo dele.

## 1.1.0 — 24 de outubro de 2026

### Adições

- **Desafios do Dia:** 365 datas e 730 exercícios independentes, um Simples e um Avançado por dia. A página inicial mostra os dois desafios atuais; a Documentação tem calendário, apresentação separada dos níveis e páginas Markdown próprias.
- Cada página de desafio inclui objetivo, regras, exemplo, dicas e uma solução em VisuAlg inicialmente oculta. A solução pode ser exibida, ocultada, copiada ou aberta no editor.
- O calendário permite consultar qualquer data do ano atual desde 1º de janeiro até hoje. O dia 29 de fevereiro reutiliza os desafios de 28 de fevereiro. A data é lida do relógio local e atualizada sem recarregar a página. Essa escolha dispensa serviço pago, mas não impede alterações deliberadas do relógio do dispositivo.
- Guia introdutório dos desafios, definições curtas de termos técnicos e explicações para exemplos com seta. Os enunciados repetidos e as dicas genéricas de parte dos exercícios Simples foram revistos.
- Tema **Steam Clássico**, inspirado no cliente Steam e em controles Source/VGUI dos anos 2000, com layout clássico, superfícies oliva e controles compactos.
- Tema **Windows 95**, com menus, barra de ferramentas, painéis e controles clássicos. Os cursores da interface ganharam variantes adicionais, incluindo seleção de texto.
- Divisor redimensionável entre editor e console no modo de painel, com arraste e ajuste pelas setas do teclado.
- Telas de abertura próprias para os temas clássicos. A abertura Steam usa barras de carregamento no estilo Source.

### Alterações

- Melhor separação de superfícies, contraste, foco e estados dos controles clássicos em arquivos, documentação, configurações, histórico e recuperação.
- Editor nos temas clássicos com cores de seleção, sintaxe, comentários, linha atual, gutter e componentes auxiliares ajustadas para leitura.
- Console clássico integrado visualmente à janela; a saída permanece próxima do fim após execuções longas. `Esc` fecha o console e retorna ao código; `F5` também encerra a execução aberta e volta ao editor.
- Layout e botões do console foram compactados. O modo abaixo do editor pode ser redimensionado sem alterar o tamanho dos outros painéis.
- Imagens do README e das páginas internas de documentação foram refeitas a partir da interface 1.1. Há novas capturas da página inicial, editor, console, documentação, calendário, desafio, configurações, seleção de temas e interfaces clássicas.
- A versão exibida na abertura e no cabeçalho é derivada de `package.json`, agora `1.1`.

### Remoções

- Peles clássicas **Água, Metal, Notas, Alumínio, Madeira e Plástico** do seletor. Preferências antigas desses temas migram para **VisuAlg Clássico**.
- Música nos temas clássicos, incluindo Steam.
- Botão de limpar o console e controles redundantes de tamanho de fonte no próprio console.
- Botões decorativos e sem função de minimizar, maximizar e fechar nas barras de título clássicas.

### Documentação e manutenção

- `src/docs/status.md` continua sendo a fonte de pendências e validações atuais; este histórico registra apenas entregas de versão.
- O catálogo CSV e o catálogo de soluções alimentam um gerador reproduzível para as 730 páginas Markdown.
- `scripts/capture-release-screenshots.mjs` documenta como gerar as capturas da versão com um perfil de navegador novo, sem arquivos pessoais.

### Limites conhecidos

- O calendário depende da data local; alterar o relógio do dispositivo pode antecipar desafios.
- Os exercícios Avançados podem exigir conhecimento prévio de vetores, matrizes, funções ou outras estruturas. A revisão automática da estrutura das 730 páginas não substitui avaliação didática com estudantes.
- O deploy Web e a distribuição de instaladores Electron são processos separados desta publicação no GitHub.

## 1.0.0

Primeira versão principal independente do VisuAlg Web. Consulte [Status do projeto](src/docs/status.md) e o histórico do Git para as entregas anteriores.

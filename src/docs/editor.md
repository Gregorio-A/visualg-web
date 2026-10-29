# Editor e arquivos

Esta página descreve os controles do VisuAlg Web. Os atalhos abaixo correspondem ao mapa padrão para Windows e Linux; algumas combinações podem variar conforme o navegador ou o sistema operacional.

![Editor e painéis na versão 1.11](screenshots/interface-editor-1.11.png)

## Arquivos do projeto

Crie um arquivo pela tela inicial, pelo botão **Novo arquivo** ou pelo **+** das abas. Ele aparece imediatamente, sem perguntar nome ou pasta, com um nome livre como `MeuAlgoritmo.alg`. Se uma pasta estiver selecionada, o arquivo entra nela; caso contrário, usa a pasta do arquivo ativo ou a raiz do projeto. Pressione `F2` para renomear o arquivo ativo ou um arquivo selecionado na lista. O nome do arquivo e o nome entre aspas na linha `Algoritmo "..."` acompanham um ao outro quando você renomeia ou edita essa linha. Arquivos abertos aparecem na lateral; fechar uma aba mantém o arquivo no projeto. Para removê-lo, use a ação de exclusão e confirme. O salvamento de trabalho ocorre automaticamente neste navegador. **Baixar projeto** exporta os arquivos para o dispositivo; essa ação não grava silenciosamente em uma pasta do computador.

Clique com o botão direito em um arquivo para fechar, exportar, renomear, duplicar, mover ou excluir. Em uma pasta, o menu permite criar um arquivo nela, renomear ou excluir a pasta; os arquivos da pasta excluída voltam à raiz. Na área vazia da lista, o menu oferece novo arquivo na raiz, nova pasta e importação.

## Localizar e substituir

| Ação | Atalho |
| --- | --- |
| Localizar no arquivo | `Ctrl+F` |
| Substituir no arquivo | `Ctrl+H` |
| Selecionar a próxima ocorrência do texto | `Ctrl+D` |
| Selecionar todas as ocorrências do texto selecionado | `Ctrl+Shift+L` |

Essas seleções são textuais. Uma palavra igual em comentário ou texto entre aspas também pode ser selecionada; isso não é uma renomeação semântica de variável.

## Edição e formatação

| Ação | Atalho |
| --- | --- |
| Indentar seleção | `Tab` |
| Remover indentação | `Shift+Tab` |
| Comentar ou descomentar linhas | `Ctrl+/` |
| Formatar os recuos do algoritmo | `Shift+Alt+F` |

Ao digitar aspas ou parênteses com um trecho selecionado, o editor envolve a seleção e a mantém destacada. Sem seleção, os pares são inseridos juntos quando o contexto permite. A formatação automática ajusta recuos e preserva comentários e textos; use **Desfazer** para retornar ao estado anterior.

Em **Configurações** e no menu de ajustes rápidos do editor, clique no valor de uma pílula numérica para digitá-lo. Pressione Enter para aplicar ou Esc para cancelar. Também é possível arrastar a pílula, usar a roda do mouse ou os botões `+` e `−`. A opção **Quebra de linha** pode ser ativada ou desativada em qualquer largura de tela. No Android, o Backspace do teclado virtual apaga caracteres e junta linhas quando o cursor está no início da linha.

O atalho `Alt+clique` acrescenta um cursor na palavra indicada. Para manter vários pontos de edição, clique em cada palavra com `Alt` pressionado.

## Executar e depurar

| Ação | Atalho |
| --- | --- |
| Executar | `F5` ou `F9` |
| Parar | `Shift+F5` |
| Avançar uma etapa | `F8` |
| Avançar sobre a chamada atual | `F10` |
| Baixar o arquivo ativo como `.alg` | `Ctrl+S` |

O projeto é salvo automaticamente neste navegador; `Ctrl+S` baixa o arquivo ativo como `.alg`. O console pode aparecer como painel, janela interna ou janela separada, conforme a configuração. Quando uma execução pede dados com `leia`, digite no campo exibido. **F11 permanece reservado à tela cheia do navegador.**

## Modo foco

Pressione `Ctrl+Shift+F` (ou `Cmd+Shift+F` no macOS) para alternar o modo foco e ocultar temporariamente as laterais. Pressione `Esc` para voltar. O estado anterior dos painéis é restaurado.

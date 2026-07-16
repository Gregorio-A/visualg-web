# História, autoria e continuidade

O VisuAlg Web existe para manter vivo, no navegador e no aplicativo desktop, um jeito de estudar algoritmos que muita gente no Brasil aprendeu pelo VisuAlg clássico: pseudocódigo em português, execução imediata e foco na lógica antes da sintaxe de uma linguagem profissional.

Este projeto não é o VisuAlg original nem o VisuAlg.dev. O VisuAlg Web é um
fork do VisuAlg.dev, do qual herdou a base do editor e do interpretador antes
de receber identidade, políticas, testes e alterações próprias. Ambos fazem
parte de uma história maior, construída por professores, desenvolvedores,
materiais didáticos e iniciativas anteriores.

## Referências históricas

### Prof. Antonio Carlos Nicolodi

Nome associado publicamente à história do Portugol como método didático e à manutenção/publicação da linha VisuAlg 3.0, incluindo a versão 3.0.7.

### Prof. Conrado Salomé Ribeiro

Nome que já aparecia no rodapé desta interface antes da minha etapa de manutenção. Esse crédito deve permanecer registrado como parte da história deste repositório.

### Cláudio Morgado de Souza

Nome atribuído publicamente à primeira implementação conhecida do Portugol VisuAlg, em 1996.

> Antes de falar do meu papel, é importante deixar claro: este projeto se apoia no trabalho desses nomes e de muitos outros professores, desenvolvedores e estudantes que mantiveram o VisuAlg vivo no ensino de programação.

## A história do VisuAlg

O VisuAlg faz parte da família do Portugol, também chamada de Português Estruturado. A ideia é aproximar algoritmos da língua portuguesa para reduzir a barreira inicial de quem está aprendendo programação.

As fontes públicas sobre a origem do Portugol e do VisuAlg nem sempre contam a história do mesmo jeito, então a forma mais responsável de registrar isso é separar os marcos principais:

| Período | Marco |
| --- | --- |
| Década de 1980 | O Portugol aparece como método didático inspirado em Pascal e ALGOL, com registros públicos associando esse esforço ao professor Antonio Carlos Nicolodi. |
| 1996 | A primeira implementação conhecida do Portugol VisuAlg é atribuída a Cláudio Morgado de Souza. |
| Anos seguintes | O VisuAlg se consolida como ferramenta de ensino em escolas, cursos técnicos, faculdades e universidades, especialmente no Brasil. |
| VisuAlg 3.x | Antonio Carlos Nicolodi passa a manter e publicar a linha VisuAlg 3.0, com versão 3.0.7 registrada publicamente em páginas como SourceForge. |
| Web e extensões | Com o tempo surgem interpretações web, materiais online e extensões para outros ambientes, cada uma tentando levar a experiência do VisuAlg para plataformas mais atuais. |

O mérito do VisuAlg clássico está em ter criado um ambiente direto para aprender lógica: declarar variáveis, executar comandos, ver saídas e entender estruturas como `se`, `para`, `enquanto`, `procedimento` e `funcao` sem depender de compiladores mais complexos.

## Por que este site está sendo feito

O objetivo do VisuAlg Web é continuar essa experiência em um ambiente atual:

- rodar no navegador, sem exigir instalação do VisuAlg desktop;
- funcionar também como aplicativo desktop com Electron;
- documentar claramente o que o interpretador web suporta;
- manter exemplos em português, próximos do material usado em sala de aula;
- reduzir diferenças silenciosas entre o VisuAlg clássico e esta implementação;
- deixar o projeto mais fácil de manter por quem vier depois.

Por isso a documentação deste modal descreve o comportamento do interpretador web. Quando um comando existe no VisuAlg desktop, mas ainda não existe aqui, ele deve ser explicado como não suportado em vez de parecer que funciona.

## O projeto-base VisuAlg.dev

O código que deu origem a este fork foi publicado como VisuAlg.dev. Seus
autores e colaboradores permanecem creditados pelo histórico do Git e pela
licença do projeto-base: mudar o nome do fork não apaga autoria nem histórico.

O projeto tem, portanto, várias camadas:

1. o VisuAlg clássico, ligado à história do Portugol e aos autores do ambiente original;
2. as iniciativas web e materiais online que vieram depois;
3. o VisuAlg.dev, que forneceu a base direta deste código;
4. o VisuAlg Web, fork que passa a ter versão e identidade independentes.

A numeração foi preservada: a manutenção do VisuAlg Web começa na versão
`0.10` e segue por `0.11`, `0.12`, `0.13` e `0.14`. As versões `0.9` e
anteriores são registradas como legado anterior a esta etapa de manutenção.

O trabalho do fork envolve melhorar o interpretador, alinhar a documentação
com o que realmente executa, ajustar a interface, preservar compatibilidade
quando possível e registrar melhor as decisões para os próximos mantenedores.

## Manutenção atual e contatos

O VisuAlg Web é mantido por **Murilo Gregorio Alves**. Questões sobre suporte,
bugs, contribuições, segurança, privacidade e uso deste fork devem ser dirigidas
a ele pelos canais oficiais do repositório ou por
`murilogregorioalves@gmail.com`.

O professor Conrado Salomé Ribeiro pode ser contatado em
`contato@conradosal.com` para assuntos ligados ao trabalho e aos materiais
dele. Esse endereço é um crédito e contato acadêmico; não é o canal de suporte
do VisuAlg Web.

## Créditos e responsabilidade

Quando a interface diz "Quem desenvolveu?", a resposta correta não é um único nome.

O VisuAlg clássico tem autores e mantenedores próprios. O VisuAlg.dev tem uma
história de contribuições anteriores e é a origem direta deste fork. O VisuAlg
Web é a etapa atual, sem reivindicar a autoria dos trabalhos nos quais se apoia.
Os nomes históricos nesta página não indicam responsabilidade pela manutenção
ou pelo atendimento do VisuAlg Web.

## Fontes públicas consultadas

- [VISUALG 3.0 no SourceForge](https://sourceforge.net/projects/visualg30/)
- [Site público do VISUALG 3.0](https://visualg30.yolasite.com/)
- [Artigo sobre VisuAlg na Wikipédia](https://pt.wikipedia.org/wiki/Visualg)
- [Artigo sobre Portugol na Wikipédia](https://pt.wikipedia.org/wiki/Portugol)

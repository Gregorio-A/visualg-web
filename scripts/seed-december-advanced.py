#!/usr/bin/env python3
"""Author advanced December solutions against the supplied challenge CSV."""
import csv
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
catalog = root / "data/challenge-solutions.json"
entries = json.loads(catalog.read_text(encoding="utf-8"))
rows = {r["data_mm_dd"]: r for r in csv.DictReader((root / "data/visualg_365_dias_730_desafios.csv").open(encoding="utf-8"))}

def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f"12-{day:02d}"
    prompt = rows[date]["avancado_enunciado"]
    code = f'algoritmo "Desafio12{day:02d}A"\nvar\n{variables.rstrip()}\ninicio\n{body.rstrip()}\nfimalgoritmo'
    entries[f"{date}/avancado"] = dict(
        code=code, objective=prompt[0].upper()+prompt[1:], rules=rules,
        example=example, edge=edge, explanation=explanation, hints=hints)

add(1,'''  horario, duracao, termino: vetor[1..5] de inteiro
  i, j, conflitos: inteiro''','''  para i de 1 ate 5 faca
    repita
      escreva("Atividade ", i, ": início em minutos após 00:00: ")
      leia(horario[i])
      escreva("Duração em minutos: ")
      leia(duracao[i])
    ate (horario[i] >= 0) e (horario[i] < 1440) e (duracao[i] > 0)
    termino[i] <- horario[i] + duracao[i]
  fimpara
  conflitos <- 0
  para i de 1 ate 4 faca
    para j de i+1 ate 5 faca
      se (horario[i] < termino[j]) e (horario[j] < termino[i]) entao
        escreval("Conflito entre atividades ", i, " e ", j)
        conflitos <- conflitos + 1
      fimse
    fimpara
  fimpara
  escreval("Pares em conflito: ", conflitos)''',
  'Cadastre cinco atividades com início entre 0 e 1439 minutos e duração positiva. Intervalos são [início, fim); atividades que apenas se tocam não conflitam.',
  '10:00–11:00 e 10:30–11:30 → conflito; 11:00–12:00 não conflita com a primeira.',
  'A duração pode levar uma atividade além da meia-noite; compare minutos absolutos.',
  'Dois intervalos se cruzam quando cada um começa antes do término do outro.',
  ['Converta horários para minutos.', 'Guarde início e fim.', 'Compare cada par uma única vez.'])

add(2,'''  luz: vetor[1..4,1..6] de inteiro
  turno, lampada, acesas: inteiro''','''  para turno de 1 ate 4 faca
    acesas <- 0
    para lampada de 1 ate 6 faca
      se ((turno + lampada) mod 2 = 0) ou (lampada = turno) entao
        luz[turno,lampada] <- 1
        acesas <- acesas + 1
      senao
        luz[turno,lampada] <- 0
      fimse
    fimpara
    escreval("Turno ", turno, ":")
    para lampada de 1 ate 6 faca
      escreva(luz[turno,lampada], " ")
    fimpara
    escreval(" | acesas: ", acesas)
  fimpara''',
  'Use matriz de quatro turnos por seis lâmpadas. A lâmpada acende quando turno + índice é par ou quando seu índice coincide com o turno.',
  'No turno 1, as lâmpadas 1, 3 e 5 aparecem acesas.',
  'Cada célula vale somente zero (apagada) ou um (acesa).',
  'A matriz guarda o padrão completo e o contador resume cada turno.',
  ['Escolha índices de turno e lâmpada.', 'Aplique a regra booleana em cada célula.', 'Mostre a linha e conte os valores 1.'])

add(3,'''  pessoa, item: vetor[1..5] de caractere
  preco: vetor[1..5] de real
  i, j: inteiro
  orcamento, total: real
  repetido: logico''','''  repita
    escreva("Orçamento máximo: ")
    leia(orcamento)
  ate orcamento >= 0
  total <- 0
  para i de 1 ate 5 faca
    escreva("Pessoa ", i, ": ")
    leia(pessoa[i])
    repita
      escreva("Item para ", pessoa[i], ": ")
      leia(item[i])
      repetido <- falso
      para j de 1 ate i-1 faca
        se item[j] = item[i] entao
          repetido <- verdadeiro
        fimse
      fimpara
      se repetido entao
        escreval("Item já escolhido; escolha outro")
      fimse
    ate nao repetido
    repita
      escreva("Preço: ")
      leia(preco[i])
    ate preco[i] >= 0
    total <- total + preco[i]
  fimpara
  para i de 1 ate 5 faca
    escreval(pessoa[i], ": ", item[i], " — R$ ", preco[i]:0:2)
  fimpara
  escreval("Total: R$ ", total:0:2)
  se total > orcamento entao
    escreval("Acima do orçamento em R$ ", total-orcamento:0:2)
  senao
    escreval("Dentro do orçamento; sobra R$ ", orcamento-total:0:2)
  fimse''',
  'Cadastre cinco pessoas e cinco itens distintos; preços não negativos. Um item com nome já usado deve ser trocado.',
  'Ana: Livro R$ 20; Bia: Jogo R$ 30; orçamento R$ 60 → sobra R$ 10 (considerando as demais entradas a R$ 0).',
  'Orçamento negativo não é significativo; informe zero ou mais.',
  'Antes de aceitar um item, compare-o aos anteriores; depois some o preço e compare com o limite.',
  ['Use vetores paralelos para pessoa, item e preço.', 'Procure duplicatas antes de aceitar.', 'Some os preços e compare com o orçamento.'])

add(4,'''  largura, altura, quantidade, usados, folhas: inteiro
  folhaL, folhaA, porLinha, porColuna, porFolha, desperdicio: inteiro''','''  escreva("Largura e altura de cada retângulo (cm): ")
  leia(largura, altura)
  escreva("Quantidade de embrulhos: ")
  leia(quantidade)
  escreva("Largura e altura da folha (cm): ")
  leia(folhaL, folhaA)
  se (largura <= 0) ou (altura <= 0) ou (quantidade < 0) ou (folhaL <= 0) ou (folhaA <= 0) entao
    escreval("Medidas inválidas")
  senao
    porLinha <- folhaL div largura
    porColuna <- folhaA div altura
    porFolha <- porLinha * porColuna
    se porFolha = 0 entao
      escreval("O retângulo não cabe na folha nessa orientação")
    senao
      folhas <- (quantidade + porFolha - 1) div porFolha
      usados <- quantidade * largura * altura
      desperdicio <- folhas * folhaL * folhaA - usados
      escreval("Retângulos por folha: ", porFolha)
      escreval("Folhas necessárias: ", folhas)
      escreval("Área não usada: ", desperdicio, " cm²")
    fimse
  fimse''',
  'Corte retângulos sem rotação, em grade regular, de folhas idênticas. Desperdício inclui espaços entre cortes e sobra da última folha.',
  'Retângulos 10×10 cm, 5 unidades, folha 20×20 cm → 2 folhas; desperdício 300 cm².',
  'Se uma dimensão do embrulho exceder a folha, a orientação escolhida não comporta nenhum.',
  'Divida cada dimensão da folha pela dimensão correspondente do retângulo e arredonde para baixo.',
  ['Conte colunas e linhas por folha.', 'Arredonde a quantidade de folhas para cima.', 'Subtraia a área dos embrulhos da área comprada.'])

add(5,'''  nomes: vetor[1..6] de caractere
  categoria, modelo, i: inteiro''','''  para i de 1 ate 6 faca
    escreva("Destinatário ", i, ": ")
    leia(nomes[i])
    repita
      escreva("Categoria (1 família, 2 amigo, 3 colega): ")
      leia(categoria)
    ate (categoria >= 1) e (categoria <= 3)
    escolha categoria
      caso 1
        modelo <- 1
      caso 2
        modelo <- 2
      outrocaso
        modelo <- 3
    fimescolha
    escolha modelo
      caso 1
        escreval(nomes[i], ", que a união da família ilumine seu ano!")
      caso 2
        escreval(nomes[i], ", obrigada pela amizade. Boas festas!")
      outrocaso
        escreval(nomes[i], ", boas festas e ótimos projetos!")
    fimescolha
  fimpara''',
  'Cadastre seis destinatários e escolha um dos três modelos conforme a categoria informada.',
  'Ana, família → “Ana, que a união da família ilumine seu ano!”',
  'Categoria fora de 1–3 é solicitada de novo.',
  'A categoria seleciona o modelo; a mensagem inclui o nome do destinatário.',
  ['Cadastre nomes em vetor.', 'Associe categoria a modelo.', 'Escreva uma mensagem diferente por categoria.'])

add(6,'''  arvore: vetor[1..5,1..9] de caractere
  linha, coluna, centro, distancia: inteiro''','''  centro <- 5
  para linha de 1 ate 5 faca
    para coluna de 1 ate 9 faca
      distancia <- abs(coluna-centro)
      se distancia < linha entao
        se (coluna = centro) e (linha mod 2 = 0) entao
          arvore[linha,coluna] <- "o"
        senao
          arvore[linha,coluna] <- "*"
        fimse
      senao
        arvore[linha,coluna] <- " "
      fimse
    fimpara
  fimpara
  para linha de 1 ate 5 faca
    para coluna de 1 ate 9 faca
      escreva(arvore[linha,coluna])
    fimpara
    escreval("")
  fimpara''',
  'A árvore tem cinco linhas e largura nove. Colunas dentro da distância da linha ao centro recebem ramos; centro de linhas pares recebe enfeite “o”.',
  'Topo: “    *    ”; segunda linha: “   *o*   ”.',
  'Espaços fora dos ramos preservam a simetria.',
  'A distância horizontal ao centro determina se uma célula pertence à árvore.',
  ['Crie matriz de caracteres.', 'Calcule a distância ao centro.', 'Troque o centro das linhas pares por enfeite.'])

add(7,'''  porcao: vetor[1..3,1..3] de real
  total: vetor[1..3] de real
  nomes: vetor[1..3] de caractere
  i, j, quantidade: inteiro''','''  nomes[1] <- "farinha"
  nomes[2] <- "açúcar"
  nomes[3] <- "leite"
  para j de 1 ate 3 faca
    total[j] <- 0
  fimpara
  para i de 1 ate 3 faca
    escreva("Porções da receita ", i, ": ")
    leia(quantidade)
    se quantidade < 0 entao
      quantidade <- 0
    fimse
    para j de 1 ate 3 faca
      escreva(nomes[j], " por porção: ")
      leia(porcao[i,j])
      se porcao[i,j] < 0 entao
        porcao[i,j] <- 0
      fimse
      total[j] <- total[j] + porcao[i,j] * quantidade
    fimpara
  fimpara
  para j de 1 ate 3 faca
    escreval(nomes[j], ": ", total[j]:0:2)
  fimpara''',
  'Três receitas usam farinha, açúcar e leite; informe o consumo por porção e a quantidade de porções de cada receita. Mantenha unidade consistente para cada ingrediente.',
  'Duas receitas usam 100 g e 50 g de farinha por porção, com 2 porções cada → 300 g de farinha (terceira usa 0).',
  'Quantidade negativa é tratada como zero neste exemplo.',
  'Acumule para cada ingrediente o consumo por porção multiplicado pelas porções.',
  ['Use linhas para receitas e colunas para ingredientes.', 'Multiplique taxa por porções.', 'Some por ingrediente.'])

add(8,'''  resposta, acompanhantes, i, pessoas, capacidade: inteiro''','''  pessoas <- 0
  para i de 1 ate 6 faca
    repita
      escreva("Convidado ", i, " confirmou? (1 sim, 0 não): ")
      leia(resposta)
    ate (resposta = 0) ou (resposta = 1)
    se resposta = 1 entao
      repita
        escreva("Acompanhantes: ")
        leia(acompanhantes)
      ate acompanhantes >= 0
      pessoas <- pessoas + 1 + acompanhantes
    fimse
  fimpara
  repita
    escreva("Capacidade da sala: ")
    leia(capacidade)
  ate capacidade >= 0
  escreval("Presenças previstas: ", pessoas)
  se capacidade < pessoas entao
    escreval("Faltam ", pessoas-capacidade, " lugares")
  senao
    escreval("Lugares livres: ", capacidade-pessoas)
  fimse''',
  'Cadastre seis convites; somente confirmados e seus acompanhantes contam para a capacidade.',
  'Três confirmações sem acompanhantes e uma com dois acompanhantes → 5 pessoas.',
  'Convidado que recusou não leva acompanhantes.',
  'Para cada confirmação, some um mais seus acompanhantes e compare à capacidade.',
  ['Leia confirmação antes dos acompanhantes.', 'Conte apenas quem irá.', 'Compare o total com a sala.'])

add(9,'''  tamanhos: vetor[1..3] de inteiro
  usados: vetor[1..3] de inteiro
  litros, convidados, i, restante, servido: inteiro''','''  tamanhos[1] <- 500
  tamanhos[2] <- 300
  tamanhos[3] <- 200
  escreva("Volume disponível em ml: ")
  leia(litros)
  escreva("Número de convidados: ")
  leia(convidados)
  se (litros < 0) ou (convidados < 0) entao
    escreval("Dados inválidos")
  senao
    restante <- litros
    servido <- 0
    para i de 1 ate 3 faca
      usados[i] <- restante div tamanhos[i]
      se servido + usados[i] > convidados entao
        usados[i] <- convidados-servido
      fimse
      restante <- restante-usados[i]*tamanhos[i]
      servido <- servido+usados[i]
      escreval("Copos de ", tamanhos[i], " ml: ", usados[i])
    fimpara
    escreval("Convidados servidos: ", servido)
    escreval("Volume restante: ", restante, " ml")
  fimse''',
  'Use copos de 500, 300 e 200 ml, nessa prioridade; sirva no máximo um copo por convidado, sem reabastecer.',
  '1600 ml e 4 convidados → 3 copos de 500 ml, 0 de 300 ml, 0 de 200 ml; sobram 100 ml.',
  'Se não houver volume para 200 ml, o restante não serve outro copo.',
  'Uma estratégia gulosa usa os maiores copos primeiro e subtrai o volume servido.',
  ['Guarde os três tamanhos em vetor.', 'Limite o número de copos por convidados restantes.', 'Subtraia cada volume usado.'])

add(10,'''  antigo, atual, desconto: vetor[1..5] de real
  nomes: vetor[1..5] de caractere
  i, j: inteiro
  aux: real
  auxNome: caractere''','''  para i de 1 ate 5 faca
    escreva("Produto ", i, ": ")
    leia(nomes[i])
    repita
      escreva("Preço antigo e atual: ")
      leia(antigo[i], atual[i])
    ate (antigo[i] > 0) e (atual[i] >= 0)
    desconto[i] <- (antigo[i]-atual[i])*100/antigo[i]
  fimpara
  para i de 1 ate 4 faca
    para j de i+1 ate 5 faca
      se desconto[j] > desconto[i] entao
        aux <- desconto[i]
        desconto[i] <- desconto[j]
        desconto[j] <- aux
        auxNome <- nomes[i]
        nomes[i] <- nomes[j]
        nomes[j] <- auxNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(nomes[i], ": ", desconto[i]:0:2, "%")
  fimpara''',
  'Compare cinco ofertas pelo desconto percentual real. Preço atual acima do antigo produz percentual negativo, não desconto.',
  'De R$ 100 para R$ 75 → 25%; de R$ 40 para R$ 20 → 50%, que aparece antes.',
  'Preço antigo zero não permite porcentagem; solicite outro valor.',
  'Calcule a mudança percentual e troque nome e taxa juntos ao ordenar.',
  ['Use a fórmula (antigo-atual)/antigo.', 'Ordene do maior desconto ao menor.', 'Preserve a associação com o produto.'])

add(11,'''  d: vetor[1..4,1..4] de real
  ordem: vetor[1..4] de inteiro
  i, j, k, aux: inteiro
  custo, melhor: real''','''  para i de 1 ate 4 faca
    para j de 1 ate 4 faca
      repita
        escreva("Distância do ponto ", i, " ao ", j, ": ")
        leia(d[i,j])
      ate d[i,j] >= 0
    fimpara
  fimpara
  melhor <- 999999
  para i de 1 ate 4 faca
    ordem[i] <- i
  fimpara
  para i de 1 ate 4 faca
    para j de 1 ate 4 faca
      se j <> i entao
        para k de 1 ate 4 faca
          se (k <> i) e (k <> j) entao
            aux <- 10-i-j-k
            custo <- d[i,j]+d[j,k]+d[k,aux]+d[aux,i]
            se custo < melhor entao
              melhor <- custo
              ordem[1] <- i
              ordem[2] <- j
              ordem[3] <- k
              ordem[4] <- aux
            fimse
          fimse
        fimpara
      fimse
    fimpara
  fimpara
  escreval("Ordem: ", ordem[1], ", ", ordem[2], ", ", ordem[3], ", ", ordem[4])
  escreval("Distância total com retorno ao ponto 1: ", melhor:0:2)''',
  'Há quatro locais numerados 1–4; a visita começa no primeiro da ordem e termina de volta nele. Informe matriz de distâncias não negativas e compare as 24 permutações.',
  'Com distâncias 1 entre todos os locais, qualquer ordem tem percurso 4; a primeira ordem encontrada é exibida.',
  'A distância para ir do local 1 ao 2 pode ser diferente da distância para voltar do 2 ao 1.',
  'A soma dos quatro deslocamentos do ciclo permite comparar todas as ordens possíveis.',
  ['Cadastre matriz de distâncias.', 'Enumere quatro locais sem repetição.', 'Guarde a menor soma e sua ordem.'])

add(12,'''  peso, altura: vetor[1..6] de real
  i, j, usados: inteiro
  aux, limite, totalAltura, base: real''','''  para i de 1 ate 6 faca
    repita
      escreva("Peso e altura da caixa ", i, ": ")
      leia(peso[i], altura[i])
    ate (peso[i] > 0) e (altura[i] > 0)
  fimpara
  escreva("Altura máxima da pilha: ")
  leia(limite)
  para i de 1 ate 5 faca
    para j de i+1 ate 6 faca
      se peso[j] > peso[i] entao
        aux <- peso[i]
        peso[i] <- peso[j]
        peso[j] <- aux
        aux <- altura[i]
        altura[i] <- altura[j]
        altura[j] <- aux
      fimse
    fimpara
  fimpara
  totalAltura <- 0
  usados <- 0
  para i de 1 ate 6 faca
    se totalAltura+altura[i] <= limite entao
      totalAltura <- totalAltura+altura[i]
      usados <- usados+1
      escreval("Na pilha: caixa de peso ", peso[i]:0:2, " e altura ", altura[i]:0:2)
    fimse
  fimpara
  escreval("Caixas empilhadas: ", usados, "; altura: ", totalAltura:0:2)''',
  'Organize seis caixas da mais pesada para a mais leve. Inclua uma caixa apenas se ela não ultrapassar a altura máxima; caixas ignoradas não entram na pilha.',
  'Caixas (peso 10, altura 2) e (peso 5, altura 3), limite 4 → entra apenas a primeira.',
  'Limite zero resulta em pilha vazia.',
  'Ordenar pelo peso garante base mais pesada; a soma de alturas controla o limite.',
  ['Ordene peso e altura juntos.', 'Percorra do maior peso ao menor.', 'Acrescente apenas se couber.'])

add(13,'''  grupo: vetor[1..3] de inteiro
  estoque: vetor[1..3] de inteiro
  modelo, pessoas, i, atendidos: inteiro''','''  para i de 1 ate 3 faca
    escreva("Estoque do modelo ", i, ": ")
    leia(estoque[i])
    se estoque[i] < 0 entao
      estoque[i] <- 0
    fimse
    grupo[i] <- 0
  fimpara
  atendidos <- 0
  para i de 1 ate 6 faca
    repita
      escreva("Grupo ", i, " (modelo 1–3) e pessoas: ")
      leia(modelo, pessoas)
    ate (modelo >= 1) e (modelo <= 3) e (pessoas >= 0)
    se estoque[modelo] >= pessoas entao
      estoque[modelo] <- estoque[modelo]-pessoas
      grupo[modelo] <- grupo[modelo]+pessoas
      atendidos <- atendidos+pessoas
      escreval("Grupo atendido")
    senao
      escreval("Estoque insuficiente para este grupo; faltam ", pessoas-estoque[modelo])
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Modelo ", i, ": distribuídos ", grupo[i], "; estoque ", estoque[i])
  fimpara
  escreval("Pessoas atendidas: ", atendidos)''',
  'Cada grupo pede um modelo e recebe todos os brindes solicitados ou nenhum; não substitua por outro modelo.',
  'Estoque 5 do modelo 1, grupo de 3 e depois grupo de 4 → primeiro atendido, segundo rejeitado.',
  'Grupo com zero pessoas não consome estoque.',
  'O vetor de estoque é atualizado apenas quando a demanda inteira cabe.',
  ['Guarde estoque por modelo.', 'Compare pedido com saldo.', 'Subtraia somente quando atender.'])

add(14,'''  vencedor: vetor[1..8] de inteiro
  i, j, numero: inteiro
  repetido: logico''','''  para i de 1 ate 8 faca
    repita
      escreva("Número vencedor ", i, " (1 a 99): ")
      leia(numero)
      repetido <- falso
      para j de 1 ate i-1 faca
        se vencedor[j] = numero entao
          repetido <- verdadeiro
        fimse
      fimpara
      se (numero < 1) ou (numero > 99) ou repetido entao
        escreval("Número inválido ou repetido")
      fimse
    ate (numero >= 1) e (numero <= 99) e (nao repetido)
    vencedor[i] <- numero
  fimpara
  escreval("Sequência válida:")
  para i de 1 ate 8 faca
    escreva(vencedor[i], " ")
  fimpara
  escreval("")''',
  'Leia oito vencedores entre 1 e 99; nenhum número pode aparecer duas vezes.',
  '3, 8, 3 → o terceiro 3 é recusado e precisa ser informado novamente.',
  'A procura por repetição considera somente posições já preenchidas.',
  'Antes de guardar cada número, compare-o com os vencedores anteriores.',
  ['Use vetor de vencedores.', 'Percorra apenas índices menores que o atual.', 'Repita a leitura até ser válido.'])

add(15,'''  familia: vetor[1..5] de inteiro
  tamanho: vetor[1..3] de inteiro
  ocupada: vetor[1..3] de inteiro
  i, j, mesa, livre: inteiro''','''  para j de 1 ate 3 faca
    repita
      escreva("Capacidade da mesa ", j, ": ")
      leia(tamanho[j])
    ate tamanho[j] >= 0
    ocupada[j] <- 0
  fimpara
  para i de 1 ate 5 faca
    repita
      escreva("Pessoas da família ", i, ": ")
      leia(familia[i])
    ate familia[i] > 0
    mesa <- 0
    livre <- 9999
    para j de 1 ate 3 faca
      se (tamanho[j]-ocupada[j] >= familia[i]) e (tamanho[j]-ocupada[j] < livre) entao
        mesa <- j
        livre <- tamanho[j]-ocupada[j]
      fimse
    fimpara
    se mesa = 0 entao
      escreval("Família ", i, " não cabe sem separação")
    senao
      ocupada[mesa] <- ocupada[mesa]+familia[i]
      escreval("Família ", i, " na mesa ", mesa)
    fimse
  fimpara
  para j de 1 ate 3 faca
    escreval("Mesa ", j, ": ", ocupada[j], "/", tamanho[j])
  fimpara''',
  'Cinco grupos familiares ficam juntos em uma de três mesas. Escolha a mesa com menor espaço livre que comporte o grupo; não divida famílias.',
  'Mesas 4, 6 e 8; primeira família com 5 pessoas → mesa de 6.',
  'Se nenhuma mesa comportar um grupo, informe que ele não foi alocado.',
  'O encaixe na menor capacidade disponível aproxima os membros e preserva espaço maior para grupos grandes.',
  ['Controle ocupação por mesa.', 'Encontre a menor sobra que ainda cabe.', 'Atualize a mesa escolhida.'])

add(16,'''  estoque, preferencia: vetor[1..3] de inteiro
  i, j, pessoas, recebidas: inteiro''','''  para j de 1 ate 3 faca
    escreva("Fatias disponíveis do sabor ", j, ": ")
    leia(estoque[j])
    se estoque[j] < 0 entao
      estoque[j] <- 0
    fimse
  fimpara
  escreva("Número de pessoas (1 a 10): ")
  leia(pessoas)
  se (pessoas < 1) ou (pessoas > 10) entao
    escreval("Quantidade inválida")
  senao
    recebidas <- 0
    para i de 1 ate pessoas faca
      repita
        escreva("Sabor preferido da pessoa ", i, " (1–3): ")
        leia(j)
      ate (j >= 1) e (j <= 3)
      preferencia[j] <- 0
      se estoque[j] > 0 entao
        estoque[j] <- estoque[j]-1
        recebidas <- recebidas+1
        escreval("Pessoa ", i, " recebeu sabor ", j)
      senao
        escreval("Pessoa ", i, " ficou sem o sabor preferido")
      fimse
    fimpara
    escreval("Atendidas: ", recebidas, "/", pessoas)
    para j de 1 ate 3 faca
      escreval("Restam ", estoque[j], " fatias do sabor ", j)
    fimpara
  fimse''',
  'Cada pessoa recebe no máximo uma fatia do sabor preferido; não há substituição automática por outro sabor.',
  'Sabor 1 tem uma fatia; duas pessoas o preferem → primeira recebe, segunda fica sem.',
  'Uma preferência não disponível não reduz os outros estoques.',
  'O vetor de estoque diminui conforme cada preferência é atendida.',
  ['Leia estoque por sabor.', 'Para cada pessoa, consulte sua preferência.', 'Diminua somente o sabor solicitado.'])

add(17,'''  largura, altura, profundidade: vetor[1..4] de real
  objL, objA, objP, aux: real
  i, escolhida: inteiro
  volume, menor: real''','''  para i de 1 ate 4 faca
    repita
      escreva("Caixa ", i, " (largura, altura, profundidade): ")
      leia(largura[i], altura[i], profundidade[i])
    ate (largura[i] > 0) e (altura[i] > 0) e (profundidade[i] > 0)
  fimpara
  repita
    escreva("Objeto (largura, altura, profundidade): ")
    leia(objL, objA, objP)
  ate (objL > 0) e (objA > 0) e (objP > 0)
  escolhida <- 0
  menor <- 999999999
  para i de 1 ate 4 faca
    se (objL <= largura[i]) e (objA <= altura[i]) e (objP <= profundidade[i]) entao
      volume <- largura[i]*altura[i]*profundidade[i]
      se volume < menor entao
        menor <- volume
        escolhida <- i
      fimse
    fimse
  fimpara
  se escolhida = 0 entao
    escreval("Nenhuma caixa comporta o objeto nessa orientação")
  senao
    escreval("Escolha a caixa ", escolhida, " com volume ", menor:0:2)
  fimse''',
  'Considere o objeto na orientação informada, sem girá-lo. Escolha entre quatro caixas válidas a de menor volume.',
  'Objeto 2×2×2; caixas 3×3×3 e 2×2×4 → escolha a segunda, volume 16.',
  'Se o objeto não couber em nenhuma caixa, informe isso.',
  'Teste as três dimensões separadamente e minimize o volume das caixas aprovadas.',
  ['Leia dimensões de caixas e objeto.', 'Compare dimensões correspondentes.', 'Entre as válidas, escolha menor volume.'])

add(18,'''  camisa, calca, sapato: vetor[1..3] de caractere
  usadaCamisa, usadaCalca, usadoSapato: vetor[1..3] de logico
  i, c, p, s: inteiro
  disponivel: logico''','''  para i de 1 ate 3 faca
    escreva("Camisa ", i, ": ")
    leia(camisa[i])
    escreva("Calça ", i, ": ")
    leia(calca[i])
    escreva("Sapato ", i, ": ")
    leia(sapato[i])
    usadaCamisa[i] <- falso
    usadaCalca[i] <- falso
    usadoSapato[i] <- falso
  fimpara
  para i de 1 ate 3 faca
    repita
      escreva("Conjunto ", i, " — camisa (1 a 3) ainda não usada: ")
      leia(c)
      disponivel <- falso
      se (c >= 1) e (c <= 3) entao
        disponivel <- nao usadaCamisa[c]
      fimse
    ate disponivel
    repita
      escreva("Calça (1 a 3) ainda não usada: ")
      leia(p)
      disponivel <- falso
      se (p >= 1) e (p <= 3) entao
        disponivel <- nao usadaCalca[p]
      fimse
    ate disponivel
    repita
      escreva("Sapato (1 a 3) ainda não usado: ")
      leia(s)
      disponivel <- falso
      se (s >= 1) e (s <= 3) entao
        disponivel <- nao usadoSapato[s]
      fimse
    ate disponivel
    usadaCamisa[c] <- verdadeiro
    usadaCalca[p] <- verdadeiro
    usadoSapato[s] <- verdadeiro
    escreval("Conjunto ", i, ": ", camisa[c], ", ", calca[p], ", ", sapato[s])
  fimpara
  escreval("Cada peça foi usada uma única vez nos 3 conjuntos")''',
  'Cadastre três peças de cada categoria. Para cada um dos três conjuntos, escolha índices ainda não usados de camisa, calça e sapato.',
  'Camisas A/B/C, calças X/Y/Z, sapatos 1/2/3; escolhas (1,2,3), (2,1,1), (3,3,2) geram A-Y-3, B-X-1 e C-Z-2.',
  'São três conjuntos porque há três peças de cada categoria.',
  'Três vetores lógicos marcam peças utilizadas e impedem que uma seleção posterior reutilize uma delas.',
  ['Guarde nomes por categoria.', 'Marque cada peça escolhida como usada.', 'Repita a leitura caso o índice já tenha sido usado.'])

add(19,'''  nome: vetor[1..4] de caractere
  nota: vetor[1..4,1..3] de real
  media: vetor[1..4] de real
  i, j, k: inteiro
  aux: real
  auxNome: caractere''','''  para i de 1 ate 4 faca
    escreva("Apresentação ", i, ": ")
    leia(nome[i])
    media[i] <- 0
    para j de 1 ate 3 faca
      repita
        escreva("Nota do jurado ", j, " (0 a 10): ")
        leia(nota[i,j])
      ate (nota[i,j] >= 0) e (nota[i,j] <= 10)
    fimpara
    media[i] <- (nota[i,1]*2+nota[i,2]*3+nota[i,3]*5)/10
  fimpara
  para i de 1 ate 3 faca
    para j de i+1 ate 4 faca
      se media[j] > media[i] entao
        aux <- media[i]
        media[i] <- media[j]
        media[j] <- aux
        auxNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- auxNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[i], ": ", media[i]:0:2)
  fimpara''',
  'Avalie quatro apresentações por três jurados, com pesos 2, 3 e 5; classifique pela média ponderada decrescente.',
  'Notas 10, 10, 10 → média 10; notas 0, 0, 10 → média 5.',
  'Em empate, mantenha a ordem original de cadastro.',
  'A média é a soma nota×peso dividida por 10; ordene nome e média juntos.',
  ['Leia a matriz de notas.', 'Calcule médias com pesos 2, 3 e 5.', 'Ordene preservando cada nome.'])

add(20,'''  horario, duracao, termino: vetor[1..5] de inteiro
  i, hora, minuto: inteiro''','''  para i de 1 ate 5 faca
    repita
      escreva("Início da atração ", i, " (hora e minuto): ")
      leia(hora, minuto)
      escreva("Duração em minutos: ")
      leia(duracao[i])
    ate (hora >= 0) e (hora < 24) e (minuto >= 0) e (minuto < 60) e (duracao[i] >= 0)
    horario[i] <- hora*60+minuto
    termino[i] <- horario[i]+duracao[i]
    hora <- (termino[i] mod 1440) div 60
    minuto <- (termino[i] mod 1440) mod 60
    escreva("Atração ", i, " termina no dia ", 1+termino[i] div 1440, " às ")
    se hora < 10 entao
      escreva("0")
    fimse
    escreva(hora, ":")
    se minuto < 10 entao
      escreva("0")
    fimse
    escreval(minuto)
  fimpara''',
  'Cadastre cinco atrações com início no dia 1 e duração em minutos; mostre dia relativo e horário de término, inclusive após meia-noite.',
  '23:30 + 90 minutos → dia 2 às 01:00.',
  'Duração zero termina no mesmo instante.',
  'Converta para minutos absolutos; quociente por 1440 indica o dia e resto indica hora/minuto.',
  ['Converta horário em minutos.', 'Some a duração.', 'Separe dia e horário usando div e mod.'])

add(21,'''  etiqueta: vetor[1..8] de caractere
  i, j, duplicatas: inteiro
  repetida: logico''','''  duplicatas <- 0
  para i de 1 ate 8 faca
    escreva("Destinatário do pacote ", i, ": ")
    leia(etiqueta[i])
    repetida <- falso
    para j de 1 ate i-1 faca
      se etiqueta[j] = etiqueta[i] entao
        repetida <- verdadeiro
      fimse
    fimpara
    se repetida entao
      duplicatas <- duplicatas+1
      escreval("Etiqueta duplicada: ", etiqueta[i])
    fimse
  fimpara
  escreval("Pacotes: 8; etiquetas repetidas: ", duplicatas)
  se duplicatas = 0 entao
    escreval("Todas as etiquetas são únicas")
  fimse''',
  'Leia oito etiquetas de destinatários, conte pacotes e marque cada etiqueta que já apareceu. Nomes idênticos são considerados duplicados.',
  'Ana, Bia, Ana → três pacotes e uma etiqueta duplicada (mais cinco entradas distintas).',
  'Uma terceira ocorrência do mesmo nome conta como outra duplicata.',
  'Compare cada nova etiqueta somente com as anteriores; assim cada pacote duplicado é contado uma vez.',
  ['Guarde as etiquetas.', 'Compare a etiqueta nova às anteriores.', 'Incremente o contador uma vez se houver repetição.'])

add(22,'''  mensagens: vetor[1..7] de inteiro
  i, total, maior, dia: inteiro
  media: real''','''  total <- 0
  maior <- -1
  dia <- 0
  para i de 1 ate 7 faca
    repita
      escreva("Mensagens no dia ", i, ": ")
      leia(mensagens[i])
    ate mensagens[i] >= 0
    total <- total+mensagens[i]
    se mensagens[i] > maior entao
      maior <- mensagens[i]
      dia <- i
    fimse
  fimpara
  media <- total/7
  escreval("Total semanal: ", total)
  escreval("Média diária: ", media:0:2)
  escreval("Maior envio: dia ", dia, " com ", maior)''',
  'Considere uma semana de sete dias. Em empate pelo maior envio, escolha o primeiro dia.',
  'Valores 1,2,3,4,5,6,7 → total 28, média 4, maior no dia 7.',
  'Se todos forem zero, o primeiro dia é o maior por convenção.',
  'Acumule as sete contagens e atualize o máximo enquanto percorre o vetor.',
  ['Use um vetor de sete posições.', 'Some e compare durante a leitura.', 'Divida o total por sete.'])

add(23,'''  nome: vetor[1..5] de caractere
  preco, minimo: vetor[1..5] de real
  prioridade: vetor[1..5] de inteiro
  i, escolhido: inteiro
  total, limite, economia: real''','''  total <- 0
  para i de 1 ate 5 faca
    escreva("Item ", i, ": ")
    leia(nome[i])
    repita
      escreva("Preço atual e substituto econômico: ")
      leia(preco[i], minimo[i])
      escreva("Prioridade (1 essencial, 2 opcional): ")
      leia(prioridade[i])
    ate (preco[i] >= 0) e (minimo[i] >= 0) e (minimo[i] <= preco[i]) e (prioridade[i] >= 1) e (prioridade[i] <= 2)
    total <- total+preco[i]
  fimpara
  escreva("Orçamento: ")
  leia(limite)
  para i de 1 ate 5 faca
    se (total > limite) e (prioridade[i] = 2) entao
      total <- total-preco[i]
      escreval("Removido: ", nome[i])
    fimse
  fimpara
  para i de 1 ate 5 faca
    se (total > limite) e (prioridade[i] = 1) entao
      economia <- preco[i]-minimo[i]
      total <- total-economia
      escreval("Substituído por versão econômica: ", nome[i])
    fimse
  fimpara
  escreval("Custo final: R$ ", total:0:2)
  se total > limite entao
    escreval("Ainda faltam R$ ", total-limite:0:2, " de redução")
  senao
    escreval("Cabe no orçamento")
  fimse''',
  'Cadastre cinco itens, preço atual, opção econômica e prioridade. Primeiro remova opcionais; se ainda necessário, substitua essenciais por alternativas econômicas.',
  'Essencial R$ 80 com substituto R$ 60, opcional R$ 30 e orçamento R$ 70 → remova opcional, custo R$ 80; substitua essencial, custo R$ 60 (demais itens a R$ 0).',
  'Se o mínimo possível ainda exceder o limite, informe a falta; não declare sucesso falso.',
  'A regra percorre prioridades em duas etapas e recalcula o total após cada redução.',
  ['Some o custo original.', 'Retire opcionais enquanto houver excesso.', 'Reduza essenciais e confira novamente.'])

add(24,'''  feito: vetor[1..5] de inteiro
  requisito: vetor[1..5] de inteiro
  i, dep, concluidas: inteiro''','''  requisito[1] <- 0
  requisito[2] <- 1
  requisito[3] <- 1
  requisito[4] <- 2
  requisito[5] <- 3
  concluidas <- 0
  para i de 1 ate 5 faca
    repita
      escreva("Tarefa ", i, " concluída? (1 sim, 0 não): ")
      leia(feito[i])
    ate (feito[i] = 0) ou (feito[i] = 1)
    concluidas <- concluidas+feito[i]
  fimpara
  escreval("Concluídas: ", concluidas)
  para i de 1 ate 5 faca
    dep <- requisito[i]
    se feito[i] = 1 entao
      escreval("Tarefa ", i, ": concluída")
    senao
      se (dep = 0) ou (feito[dep] = 1) entao
        escreval("Tarefa ", i, ": liberada")
      senao
        escreval("Tarefa ", i, ": bloqueada pela ", dep)
      fimse
    fimse
  fimpara''',
  'As dependências fixas são: tarefa 1 livre; 2 e 3 dependem da 1; 4 da 2; 5 da 3. Mostre concluídas, liberadas e bloqueadas.',
  'Se apenas tarefa 1 está concluída, tarefas 2 e 3 ficam liberadas; 4 e 5 seguem bloqueadas.',
  'Uma tarefa concluída não deve reaparecer como liberada.',
  'O vetor requisito aponta para a tarefa que precisa estar pronta antes da atual.',
  ['Defina as dependências por índice.', 'Leia cinco estados.', 'Para cada pendente, consulte seu requisito.'])

add(25,'''  distancia: vetor[1..4] de real
  i, hora, minuto, chegada, tempo: inteiro
  velocidade, total, minutosTrecho: real''','''  total <- 0
  tempo <- 8*60
  escreva("Velocidade média em km/h: ")
  leia(velocidade)
  se velocidade <= 0 entao
    escreval("Velocidade inválida")
  senao
    para i de 1 ate 4 faca
      repita
        escreva("Distância até parada ", i, " (km): ")
        leia(distancia[i])
        escreva("Horário máximo da chegada (hora e minuto): ")
        leia(hora, minuto)
      ate (distancia[i] >= 0) e (hora >= 0) e (hora < 24) e (minuto >= 0) e (minuto < 60)
      total <- total+distancia[i]
      minutosTrecho <- distancia[i]*60/velocidade
      tempo <- tempo+int(minutosTrecho)
      se minutosTrecho > int(minutosTrecho) entao
        tempo <- tempo+1
      fimse
      chegada <- hora*60+minuto
      escreval("Parada ", i, " chega às ", tempo div 60, ":", tempo mod 60)
      se tempo > chegada entao
        escreval("Atraso de ", tempo-chegada, " minuto(s)")
      fimse
    fimpara
    escreval("Distância total: ", total:0:2, " km")
  fimse''',
  'Saia às 08:00 e visite quatro paradas na ordem cadastrada. Use velocidade média constante, arredondando cada trecho para cima em minutos.',
  'Trecho 30 km a 60 km/h → primeira chegada às 08:30; prazo 08:20 gera 10 minutos de atraso.',
  'Uma parada com distância zero tem o mesmo horário da anterior.',
  'Acumule as distâncias e os minutos de deslocamento; compare cada chegada ao respectivo limite.',
  ['Fixe partida às 08:00.', 'Converta km/velocidade em minutos.', 'Compare chegada e prazo de cada parada.'])

add(26,'''  estoque, kit: vetor[1..3] de inteiro
  nomes: vetor[1..3] de caractere
  i, kits, capacidade, falta: inteiro''','''  nomes[1] <- "alimento"
  nomes[2] <- "higiene"
  nomes[3] <- "roupa"
  para i de 1 ate 3 faca
    escreva("Unidades recebidas de ", nomes[i], ": ")
    leia(estoque[i])
    escreva("Unidades de ", nomes[i], " por kit: ")
    leia(kit[i])
  fimpara
  se (kit[1] <= 0) ou (kit[2] <= 0) ou (kit[3] <= 0) ou (estoque[1] < 0) ou (estoque[2] < 0) ou (estoque[3] < 0) entao
    escreval("Dados inválidos")
  senao
    kits <- estoque[1] div kit[1]
    para i de 2 ate 3 faca
      capacidade <- estoque[i] div kit[i]
      se capacidade < kits entao
        kits <- capacidade
      fimse
    fimpara
    escreval("Kits completos: ", kits)
    para i de 1 ate 3 faca
      falta <- (kits+1)*kit[i]-estoque[i]
      se falta < 0 entao
        falta <- 0
      fimse
      escreval(nomes[i], ": sobra ", estoque[i]-kits*kit[i], "; faltam ", falta, " para mais um kit")
    fimpara
  fimse''',
  'Cada kit exige quantidades positivas de alimento, higiene e roupa. O número de kits é limitado pela categoria mais escassa.',
  '10 alimentos (2/kit), 6 higienes (2/kit), 8 roupas (1/kit) → 3 kits.',
  'Uma categoria sem estoque impede qualquer kit completo.',
  'Calcule quantos kits cada estoque permite; use o menor resultado.',
  ['Leia estoque e consumo por kit.', 'Calcule a divisão inteira de cada categoria.', 'Mostre kits, sobras e faltas para o próximo.'])

add(27,'''  porcoes: vetor[1..3] de inteiro
  capacidade, usados, i, potes, restante: inteiro''','''  escreva("Capacidade de cada pote: ")
  leia(capacidade)
  se capacidade <= 0 entao
    escreval("Capacidade inválida")
  senao
    potes <- 0
    restante <- 0
    para i de 1 ate 3 faca
      escreva("Porções do prato ", i, ": ")
      leia(porcoes[i])
      se porcoes[i] < 0 entao
        porcoes[i] <- 0
      fimse
      usados <- porcoes[i]
      se usados > 0 entao
        potes <- potes+(usados+capacidade-1) div capacidade
        restante <- restante+((usados+capacidade-1) div capacidade)*capacidade-usados
      fimse
      escreval("Prato ", i, ": ", (usados+capacidade-1) div capacidade, " pote(s)")
    fimpara
    escreval("Total de potes: ", potes)
    escreval("Espaço vazio nos potes: ", restante, " porção(ões)")
  fimse''',
  'Há três pratos; por higiene, não misture pratos no mesmo pote. Todos os potes têm a mesma capacidade positiva.',
  'Pratos com 5, 3 e 0 porções; potes de 4 → 2 + 1 + 0 = 3 potes.',
  'Prato sem sobra não usa pote.',
  'Arredonde para cima a divisão de cada prato separadamente e some os recipientes.',
  ['Não junte tipos de prato.', 'Calcule potes por prato.', 'Some e informe o espaço que sobrou.'])

add(28,'''  nome: vetor[1..6] de caractere
  prazo: vetor[1..6] de inteiro
  i, j, aux, limite: inteiro
  auxNome: caractere''','''  para i de 1 ate 6 faca
    escreva("Pendência ", i, ": ")
    leia(nome[i])
    repita
      escreva("Prazo, dia de dezembro (1–31): ")
      leia(prazo[i])
    ate (prazo[i] >= 1) e (prazo[i] <= 31)
  fimpara
  escreva("Data limite, dia de dezembro: ")
  leia(limite)
  para i de 1 ate 5 faca
    para j de i+1 ate 6 faca
      se prazo[j] < prazo[i] entao
        aux <- prazo[i]
        prazo[i] <- prazo[j]
        prazo[j] <- aux
        auxNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- auxNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 6 faca
    escreva("Dia ", prazo[i], ": ", nome[i])
    se prazo[i] > limite entao
      escreval(" — ultrapassa o limite")
    senao
      escreval(" — no prazo")
    fimse
  fimpara''',
  'Ordene seis pendências pelo dia do prazo; marque aquelas com prazo posterior à data limite informada.',
  'Prazos 20 e 10, limite 15 → dia 10 no prazo, dia 20 ultrapassa.',
  'Em empate, preserve a ordem de cadastro.',
  'Troque nome e prazo juntos na ordenação; depois compare cada prazo com o limite.',
  ['Guarde nomes e prazos.', 'Ordene pelo número do dia.', 'Compare cada prazo com o limite.'])

add(29,'''  resultado: vetor[1..12] de real
  i, melhorMes: inteiro
  soma, maior, evolucao: real''','''  soma <- 0
  maior <- -1
  melhorMes <- 0
  para i de 1 ate 12 faca
    repita
      escreva("Resultado do mês ", i, " (0 a 100%): ")
      leia(resultado[i])
    ate (resultado[i] >= 0) e (resultado[i] <= 100)
    soma <- soma+resultado[i]
    se resultado[i] > maior entao
      maior <- resultado[i]
      melhorMes <- i
    fimse
  fimpara
  escreval("Média anual: ", soma/12:0:2, "%")
  escreval("Melhor mês: ", melhorMes, " com ", maior:0:2, "%")
  evolucao <- resultado[12]-resultado[1]
  escreval("Evolução de janeiro a dezembro: ", evolucao:0:2, " ponto(s) percentuais")
  para i de 2 ate 12 faca
    se resultado[i] > resultado[i-1] entao
      escreval("Melhora no mês ", i)
    fimse
  fimpara''',
  'Cadastre percentuais de 0 a 100 para os 12 meses; apresente média, melhor mês e crescimento entre meses.',
  'Janeiro 40%, dezembro 70% → evolução final de +30 pontos percentuais.',
  'Empate no máximo mantém o primeiro mês encontrado.',
  'O vetor permite comparar meses vizinhos e identificar a evolução do início ao fim.',
  ['Leia 12 percentuais.', 'Acumule a soma e guarde o máximo.', 'Compare vizinhos e extremos.'])

add(30,'''  alvo, instante: vetor[1..4] de inteiro
  i, segundo, faltam: inteiro''','''  para i de 1 ate 4 faca
    escreva("Instante-alvo do evento ", i, " em segundos desde 00:00: ")
    leia(alvo[i])
    se alvo[i] < 0 entao
      alvo[i] <- 0
    fimse
  fimpara
  escreva("Segundo atual desde 00:00: ")
  leia(segundo)
  se segundo < 0 entao
    segundo <- 0
  fimse
  para i de 1 ate 4 faca
    faltam <- alvo[i]-segundo
    se faltam > 0 entao
      escreval("Evento ", i, ": faltam ", faltam div 60, " min e ", faltam mod 60, " s")
    senao
      se faltam = 0 entao
        escreval("Evento ", i, ": agora")
      senao
        escreval("Evento ", i, ": ocorreu há ", -faltam, " segundo(s)")
      fimse
    fimse
  fimpara''',
  'Quatro eventos e o instante atual são medidos em segundos desde 00:00 do mesmo dia; mostre contagem restante ou tempo decorrido.',
  'Agora 100 s, alvo 225 s → faltam 2 min e 5 s.',
  'Alvo igual ao instante atual aparece como “agora”.',
  'Subtraia o instante atual de cada alvo e decomponha diferenças positivas.',
  ['Guarde quatro alvos.', 'Calcule alvo menos instante atual.', 'Separe antes, agora e depois.'])

add(31,'''  nome: vetor[1..12] de caractere
  prazo, concluida: vetor[1..12] de inteiro
  i, prontas, atrasadas: inteiro''','''  prontas <- 0
  atrasadas <- 0
  para i de 1 ate 12 faca
    escreva("Meta ", i, ": ")
    leia(nome[i])
    repita
      escreva("Mês do prazo (1 a 12): ")
      leia(prazo[i])
    ate (prazo[i] >= 1) e (prazo[i] <= 12)
    repita
      escreva("Concluída? (1 sim, 0 não): ")
      leia(concluida[i])
    ate (concluida[i] = 0) ou (concluida[i] = 1)
    prontas <- prontas+concluida[i]
  fimpara
  para i de 1 ate 12 faca
    escreva("Meta ", i, ": ", nome[i], " — mês ", prazo[i])
    se concluida[i] = 1 entao
      escreval(" — concluída")
    senao
      escreval(" — pendente")
    fimse
  fimpara
  escreval("Concluídas: ", prontas, "/12")''',
  'Cadastre doze metas, cada uma com mês de prazo e estado de conclusão; o painel mostra todas e o total concluído.',
  'Meta “ler livros”, prazo 3, concluída → aparece como “mês 3 — concluída”.',
  'Uma meta com estado 0 permanece pendente mesmo após o mês de prazo; o painel não depende da data do computador.',
  'Vetores paralelos mantêm nome, prazo e estado da mesma meta em cada índice.',
  ['Leia meta e prazo em vetores.', 'Guarde conclusão como 0 ou 1.', 'Percorra as doze metas para montar o painel.'])

catalog.write_text(json.dumps(entries, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
print(f"Catalogued {len(entries)} challenge solutions")

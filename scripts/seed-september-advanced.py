#!/usr/bin/env python3
"""Curated advanced September exercises based on the challenge CSV."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'09-{day:02d}'
    prompt = rows[date]['avancado_enunciado']
    code = f'algoritmo "Desafio09{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/avancado'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  especie: vetor[1..3] de caractere
  estoque: vetor[1..3] de inteiro
  i, area, tipo, quantidade: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Espécie ", i, ": ")
    leia(especie[i])
    escreva("Estoque de mudas: ")
    leia(estoque[i])
  fimpara
  para area de 1 ate 4 faca
    escreva("Espécie solicitada para área ", area, " (1 a 3): ")
    leia(tipo)
    escreva("Quantidade: ")
    leia(quantidade)
    se (tipo >= 1) e (tipo <= 3) e (quantidade > 0) entao
      se quantidade <= estoque[tipo] entao
        estoque[tipo] <- estoque[tipo] - quantidade
        escreval("Área ", area, " recebeu ", quantidade, " muda(s) de ", especie[tipo])
      senao
        escreval("Estoque insuficiente; faltam ", quantidade - estoque[tipo])
      fimse
    senao
      escreval("Pedido inválido")
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval(especie[i], ": ", estoque[i], " muda(s) restantes")
  fimpara''',
    'Cadastre três espécies e respectivos estoques. Quatro áreas solicitam uma espécie e quantidade; entregue pedidos inteiros somente quando houver saldo.',
    'Estoque 10; área solicita 4 → entrega 4, saldo 6',
    'Pedido acima do estoque é recusado sem entrega parcial.',
    'O índice da espécie vincula o nome ao estoque que é reduzido após a distribuição.',
    ['Guarde espécies e quantidades.', 'Valide o tipo solicitado.', 'Confira saldo antes de entregar.'])

add(2, '''  peso: vetor[1..3] de real
  quantidade: vetor[1..3] de inteiro
  i, material: inteiro
  massa: real''', '''  para i de 1 ate 3 faca
    peso[i] <- 0
    quantidade[i] <- 0
  fimpara
  para i de 1 ate 10 faca
    escreva("Material ", i, " (1 papel, 2 vidro, 3 plástico): ")
    leia(material)
    escreva("Peso em kg: ")
    leia(massa)
    se (material >= 1) e (material <= 3) e (massa >= 0) entao
      peso[material] <- peso[material] + massa
      quantidade[material] <- quantidade[material] + 1
    senao
      escreval("Descarte inválido")
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Categoria ", i, ": ", quantidade[i], " descarte(s), ", peso[i], " kg")
  fimpara''',
    'Registre dez descartes, cada um classificado como papel, vidro ou plástico, com peso. Mostre quantidade e massa total por categoria.',
    'Papel de 2 kg e papel de 3 kg → dois descartes, 5 kg',
    'Peso negativo ou categoria desconhecida é ignorado.',
    'Vetores por categoria acumulam contagem e peso separadamente.',
    ['Mapeie material para índice.', 'Some peso na categoria.', 'Conte descartes válidos.'])

add(3, '''  leitura: vetor[1..8] de real
  i, picos: inteiro
  limite, aumento, maior: real''', '''  escreva("Aumento anormal mínimo em %: ")
  leia(limite)
  para i de 1 ate 8 faca
    escreva("Consumo do período ", i, ": ")
    leia(leitura[i])
  fimpara
  picos <- 0
  maior <- 0
  para i de 2 ate 8 faca
    se (leitura[i - 1] > 0) e (leitura[i] >= 0) entao
      aumento <- 100 * (leitura[i] - leitura[i - 1]) / leitura[i - 1]
      se aumento > maior entao
        maior <- aumento
      fimse
      se aumento > limite entao
        picos <- picos + 1
        escreval("Aumento anormal entre períodos ", i - 1, " e ", i, ": ", aumento, "%")
      fimse
    fimse
  fimpara
  escreval("Aumentos anormais: ", picos, "; maior aumento: ", maior, "%")''',
    'Leia oito consumos de água. Compare períodos vizinhos e marque aumento percentual estritamente acima do limite informado.',
    'Consumo 100 seguido de 130, limite 20% → aumento anormal de 30%',
    'Consumo anterior zero não pode ser base percentual e é ignorado.',
    'A variação percentual usa a leitura anterior como denominador.',
    ['Compare vizinhos.', 'Divida diferença pelo anterior.', 'Conte os valores acima do limite.'])

add(4, '''  potencia, eficiencia, sombra: vetor[1..3] de real
  i, dia: inteiro
  horas, geracao, total: real''', '''  para i de 1 ate 3 faca
    escreva("Potência do painel ", i, " em W: ")
    leia(potencia[i])
    escreva("Eficiência percentual: ")
    leia(eficiencia[i])
    escreva("Sombreamento percentual: ")
    leia(sombra[i])
  fimpara
  para dia de 1 ate 5 faca
    escreva("Horas ideais de sol no dia ", dia, ": ")
    leia(horas)
    total <- 0
    se horas >= 0 entao
      para i de 1 ate 3 faca
        se (potencia[i] >= 0) e (eficiencia[i] >= 0) e (eficiencia[i] <= 100) e (sombra[i] >= 0) e (sombra[i] <= 100) entao
          geracao <- potencia[i] * horas * eficiencia[i] / 100 * (1 - sombra[i] / 100) / 1000
          total <- total + geracao
          escreval("Painel ", i, ": ", geracao, " kWh")
        fimse
      fimpara
    fimse
    escreval("Dia ", dia, ": ", total, " kWh")
  fimpara''',
    'Três painéis têm potência, eficiência e sombreamento próprios. Para cinco dias com horas de sol informadas, calcule kWh por painel e dia.',
    '1000 W, 4 h, 80% de eficiência, 25% de sombra → 2,4 kWh',
    'Percentuais fora de 0–100% invalidam aquele painel na soma.',
    'A produção teórica é reduzida pela eficiência e pela fração sem sombra.',
    ['Multiplique W por horas.', 'Aplique eficiência e sombra.', 'Divida Wh por mil.'])

add(5, '''  planta: vetor[1..5, 1..5] de inteiro
  linha, coluna, especie, vizinho, ocupadas: inteiro''', '''  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      planta[linha, coluna] <- 0
    fimpara
  fimpara
  para ocupadas de 1 ate 8 faca
    escreva("Linha e coluna da nova planta: ")
    leia(linha, coluna)
    escreva("Espécie (1 ou 2): ")
    leia(especie)
    se (linha >= 1) e (linha <= 5) e (coluna >= 1) e (coluna <= 5) e (especie >= 1) e (especie <= 2) entao
      vizinho <- 0
      se planta[linha, coluna] <> 0 entao
        vizinho <- 1
      fimse
      se linha > 1 entao
        se planta[linha - 1, coluna] = especie entao
          vizinho <- 1
        fimse
      fimse
      se linha < 5 entao
        se planta[linha + 1, coluna] = especie entao
          vizinho <- 1
        fimse
      fimse
      se coluna > 1 entao
        se planta[linha, coluna - 1] = especie entao
          vizinho <- 1
        fimse
      fimse
      se coluna < 5 entao
        se planta[linha, coluna + 1] = especie entao
          vizinho <- 1
        fimse
      fimse
      se vizinho = 0 entao
        planta[linha, coluna] <- especie
        escreval("Plantio aceito")
      senao
        escreval("Plantio recusado")
      fimse
    senao
      escreval("Posição ou espécie inválida")
    fimse
  fimpara''',
    'Jardim 5×5 aceita oito tentativas. A célula precisa estar vazia e nenhuma vizinha ortogonal pode conter a mesma espécie; espécies diferentes podem ficar adjacentes.',
    'Espécie 1 em (2,2) impede outra espécie 1 em (2,3)',
    'Células diagonais não contam como vizinhas neste modelo.',
    'Checar quatro vizinhos antes de gravar mantém a distância mínima definida.',
    ['Valide coordenadas.', 'Cheque a célula e os quatro vizinhos.', 'Grave somente se estiver livre.'])

add(6, '''  especie: vetor[1..3] de caractere
  estoque, vencimento: vetor[1..3] de inteiro
  i, mesAtual, acao, tipo, quantidade: inteiro''', '''  escreva("Mês atual (1 a 12): ")
  leia(mesAtual)
  para i de 1 ate 3 faca
    escreva("Espécie ", i, ": ")
    leia(especie[i])
    escreva("Estoque: ")
    leia(estoque[i])
    escreva("Mês de validade (1 a 12): ")
    leia(vencimento[i])
  fimpara
  escreva("Espécie para retirada (1 a 3; 0 encerra): ")
  leia(tipo)
  enquanto tipo <> 0 faca
    escreva("Quantidade: ")
    leia(quantidade)
    se (tipo < 1) ou (tipo > 3) ou (quantidade <= 0) entao
      escreval("Pedido inválido")
    senao
      se vencimento[tipo] < mesAtual entao
        escreval("Lote vencido")
      senao
        se quantidade <= estoque[tipo] entao
          estoque[tipo] <- estoque[tipo] - quantidade
          escreval("Retirada de ", especie[tipo], " autorizada")
        senao
          escreval("Estoque insuficiente")
        fimse
      fimse
    fimse
    escreva("Espécie para retirada (1 a 3; 0 encerra): ")
    leia(tipo)
  fimenquanto''',
    'Três lotes têm espécie, saldo e mês de validade no mesmo ano. Retire sementes apenas se o mês atual não superar o vencimento e houver saldo.',
    'Mês atual 5, validade 4 → retirada recusada por vencimento',
    'O exercício assume todas as datas dentro do mesmo ano; o mês de validade ainda é válido durante ele.',
    'A comparação numérica de meses identifica vencimento neste modelo anual.',
    ['Guarde validade por espécie.', 'Cheque mês antes de retirar.', 'Desconte apenas pedido válido.'])

add(7, '''  chuva: vetor[1..30] de real
  i, atual, maior, inicioAtual, inicioMaior, diaRecorde: inteiro
  recorde: real''', '''  atual <- 0
  maior <- 0
  recorde <- -1
  para i de 1 ate 30 faca
    escreva("Chuva do dia ", i, " em mm: ")
    leia(chuva[i])
    se chuva[i] < 0 entao
      chuva[i] <- 0
    fimse
    se chuva[i] > recorde entao
      recorde <- chuva[i]
      diaRecorde <- i
    fimse
    se chuva[i] = 0 entao
      se atual = 0 entao
        inicioAtual <- i
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Recorde de chuva: ", recorde, " mm no dia ", diaRecorde)
  se maior > 0 entao
    escreval("Maior seca: dias ", inicioMaior, " a ", inicioMaior + maior - 1, " (", maior, " dias)")
  senao
    escreval("Nenhum dia seco")
  fimse''',
    'Leia chuva de trinta dias. Encontre o maior valor e o maior bloco de dias consecutivos sem precipitação.',
    'Chuva 0,0,5 → maior seca de 2 dias',
    'Chuva negativa é tratada como zero. Empates preservam a primeira ocorrência.',
    'Um máximo guarda o recorde e contadores rastreiam a sequência seca corrente.',
    ['Atualize recorde por comparação.', 'Conte zeros consecutivos.', 'Guarde o maior bloco.'])

add(8, '''  i, aquecedor, ventilador: inteiro
  leitura, minimo, maximo, margem: real''', '''  escreva("Temperatura mínima ideal: ")
  leia(minimo)
  escreva("Temperatura máxima ideal: ")
  leia(maximo)
  escreva("Margem de histerese: ")
  leia(margem)
  aquecedor <- 0
  ventilador <- 0
  se (minimo > maximo) ou (margem < 0) entao
    escreval("Parâmetros inválidos")
  senao
    para i de 1 ate 10 faca
      escreva("Leitura ", i, ": ")
      leia(leitura)
      se aquecedor = 0 entao
        se leitura < minimo entao
          aquecedor <- 1
        fimse
      senao
        se leitura >= minimo + margem entao
          aquecedor <- 0
        fimse
      fimse
      se ventilador = 0 entao
        se leitura > maximo entao
          ventilador <- 1
        fimse
      senao
        se leitura <= maximo - margem entao
          ventilador <- 0
        fimse
      fimse
      escreval("Aquecedor ", aquecedor, "; ventilador ", ventilador)
    fimpara
  fimse''',
    'Em dez leituras, ligue aquecedor abaixo do mínimo e desligue após subir até mínimo + margem. Ligue ventilador acima do máximo e desligue após cair até máximo − margem.',
    'Mínimo 18, margem 2: aquece a 17 e só desliga ao chegar a 20',
    'Escolha margem compatível com a faixa ideal para evitar ambos ligados por configuração contraditória.',
    'Estados separados e limiares diferentes de liga e desliga evitam oscilação rápida.',
    ['Guarde se cada atuador está ligado.', 'Use limiares diferentes para ligar e desligar.', 'Atualize a cada leitura.'])

add(9, '''  contagem: vetor[1..4] de inteiro
  soma: vetor[1..4] de real
  i, direcao, principal: inteiro
  velocidade: real''', '''  para i de 1 ate 4 faca
    contagem[i] <- 0
    soma[i] <- 0
  fimpara
  para i de 1 ate 12 faca
    escreva("Direção do vento (1 N, 2 L, 3 S, 4 O): ")
    leia(direcao)
    escreva("Velocidade: ")
    leia(velocidade)
    se (direcao >= 1) e (direcao <= 4) e (velocidade >= 0) entao
      contagem[direcao] <- contagem[direcao] + 1
      soma[direcao] <- soma[direcao] + velocidade
    fimse
  fimpara
  principal <- 1
  para i de 1 ate 4 faca
    escreval("Direção ", i, ": ", contagem[i], " leitura(s)")
    se contagem[i] > 0 entao
      escreval("Velocidade média: ", soma[i] / contagem[i])
    fimse
    se contagem[i] > contagem[principal] entao
      principal <- i
    fimse
  fimpara
  escreval("Direção predominante: ", principal)''',
    'Leia doze observações com direção N/L/S/O e velocidade. Conte ocorrências, calcule média por direção e identifique a direção mais frequente.',
    'N aparece 4 vezes, L 3 vezes → N é predominante',
    'Empate preserva a menor direção numérica. Direção sem leitura não tem média.',
    'Vetores por direção mantêm contagem e soma de velocidades para o relatório.',
    ['Mapeie direção para índice.', 'Some velocidades e contagens.', 'Compare frequências.'])

add(10, '''  distancia: vetor[1..5, 1..5] de real
  melhor: vetor[1..5] de real
  visitado: vetor[1..5] de inteiro
  i, j, atual, destino, etapa: inteiro
  menor: real''', '''  para i de 1 ate 5 faca
    para j de 1 ate 5 faca
      escreva("Distância direta de ", i, " para ", j, " (0 sem ligação): ")
      leia(distancia[i, j])
    fimpara
    melhor[i] <- 999999
    visitado[i] <- 0
  fimpara
  escreva("Origem (1 a 5): ")
  leia(atual)
  escreva("Destino (1 a 5): ")
  leia(destino)
  se (atual < 1) ou (atual > 5) ou (destino < 1) ou (destino > 5) entao
    escreval("Ponto inválido")
  senao
    melhor[atual] <- 0
    para etapa de 1 ate 5 faca
      atual <- 0
      menor <- 999999
      para i de 1 ate 5 faca
        se (visitado[i] = 0) e (melhor[i] < menor) entao
          menor <- melhor[i]
          atual <- i
        fimse
      fimpara
      se atual > 0 entao
        visitado[atual] <- 1
        para j de 1 ate 5 faca
          se (distancia[atual, j] > 0) e (melhor[atual] + distancia[atual, j] < melhor[j]) entao
            melhor[j] <- melhor[atual] + distancia[atual, j]
          fimse
        fimpara
      fimse
    fimpara
    se melhor[destino] = 999999 entao
      escreval("Sem rota")
    senao
      escreval("Menor distância: ", melhor[destino])
    fimse
  fimse''',
    'Uma matriz 5×5 registra distâncias positivas entre pontos; zero significa ausência de ligação. Informe origem e destino e calcule a menor distância.',
    'Ir do ponto 1 ao 2 custa 3; do 2 ao 3 custa 4; ir direto do 1 ao 3 custa 10. O menor custo do ponto 1 ao 3 é 7, passando pelo ponto 2.',
    'Sem caminho alcançável, informe sem rota. Distâncias negativas não são arestas válidas.',
    'O algoritmo de Dijkstra seleciona repetidamente o ponto não visitado de menor custo e relaxa seus vizinhos.',
    ['Guarde distâncias mínimas provisórias.', 'Selecione o menor ponto aberto.', 'Atualize vizinhos com caminhos melhores.'])

add(11, '''  equipe, area: vetor[1..6] de inteiro
  massa, horas: vetor[1..6] de real
  total: vetor[1..3] de real
  tempo: vetor[1..3] de real
  i, j, melhor: inteiro
  rendimento, maior: real''', '''  para i de 1 ate 3 faca
    total[i] <- 0
    tempo[i] <- 0
  fimpara
  para i de 1 ate 6 faca
    escreva("Equipe da coleta ", i, " (1 a 3): ")
    leia(equipe[i])
    escreva("Área (1 a 3): ")
    leia(area[i])
    escreva("Massa recolhida (kg): ")
    leia(massa[i])
    escreva("Tempo (h): ")
    leia(horas[i])
    se (equipe[i] >= 1) e (equipe[i] <= 3) e (area[i] >= 1) e (area[i] <= 3) e (massa[i] >= 0) e (horas[i] > 0) entao
      total[equipe[i]] <- total[equipe[i]] + massa[i]
      tempo[equipe[i]] <- tempo[equipe[i]] + horas[i]
      escreval("Área ", area[i], " registrada para equipe ", equipe[i])
    fimse
  fimpara
  maior <- -1
  para i de 1 ate 3 faca
    se tempo[i] > 0 entao
      rendimento <- total[i] / tempo[i]
      escreval("Equipe ", i, ": ", total[i], " kg em ", tempo[i], " h; ", rendimento, " kg/h")
      se rendimento > maior entao
        maior <- rendimento
        melhor <- i
      fimse
    fimse
  fimpara
  se maior >= 0 entao
    escreval("Maior rendimento: equipe ", melhor)
  fimse''',
    'Seis coletas registram equipe, área, massa e horas. Some massa e tempo por equipe; classifique a de maior rendimento em kg/h.',
    'Equipe A recolhe 20 kg em 2 h → rendimento 10 kg/h',
    'Tempo zero não entra no cálculo; equipe sem coleta não recebe média.',
    'O rendimento agregado usa massa total dividida por tempo total de cada equipe.',
    ['Some massa por equipe.', 'Some horas por equipe.', 'Divida e compare rendimentos.'])

add(12, '''  nebulosidade: vetor[1..14] de real
  i, atual, maior, inicioAtual, inicioMaior, series: inteiro''', '''  atual <- 0
  maior <- 0
  series <- 0
  para i de 1 ate 14 faca
    escreva("Nebulosidade do dia ", i, " (%): ")
    leia(nebulosidade[i])
    se nebulosidade[i] > 70 entao
      se atual = 0 entao
        inicioAtual <- i
        series <- series + 1
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Séries acima de 70%: ", series)
  se maior > 0 entao
    escreval("Maior série: dias ", inicioMaior, " a ", inicioMaior + maior - 1, " (", maior, ")")
  fimse''',
    'Leia catorze percentuais e identifique blocos consecutivos de dias com nebulosidade estritamente maior que 70%.',
    '75,80,60,90 → duas séries; maior tem 2 dias',
    'Valor exatamente 70% interrompe a série.',
    'Cada transição de fora para dentro da faixa abre uma nova série.',
    ['Compare >70.', 'Conte início de bloco.', 'Guarde o maior comprimento.'])

add(13, '''  nome: vetor[1..3] de caractere
  tempo, custo, emissao, nota: vetor[1..3] de real
  i, j, escolhido: inteiro
  pesoTempo, pesoCusto, pesoEmissao, menor: real''', '''  escreva("Peso do tempo, custo e emissão na nota: ")
  leia(pesoTempo, pesoCusto, pesoEmissao)
  escolhido <- 0
  para i de 1 ate 3 faca
    escreva("Transporte ", i, ": ")
    leia(nome[i])
    escreva("Tempo em minutos, custo R$ e emissão kg: ")
    leia(tempo[i], custo[i], emissao[i])
    se (tempo[i] >= 0) e (custo[i] >= 0) e (emissao[i] >= 0) e (pesoTempo >= 0) e (pesoCusto >= 0) e (pesoEmissao >= 0) entao
      nota[i] <- tempo[i] * pesoTempo + custo[i] * pesoCusto + emissao[i] * pesoEmissao
      se (escolhido = 0) ou (nota[i] < menor) entao
        menor <- nota[i]
        escolhido <- i
      fimse
      escreval(nome[i], ": nota ", nota[i])
    senao
      nota[i] <- -1
    fimse
  fimpara
  se escolhido > 0 entao
    escreval("Melhor nota: ", nome[escolhido], " (", menor, ")")
  senao
    escreval("Nenhuma opção válida")
  fimse''',
    'Compare três meios de transporte. A nota ponderada é tempo×peso do tempo + custo×peso do custo + emissão×peso da emissão. Menor nota vence.',
    'Pesos 1,1,1: A (10 min, R$ 5, 1 kg) → nota 16',
    'Pesos devem ser não negativos. Empate preserva a primeira opção.',
    'Os pesos explicitam a importância relativa dos três critérios na escolha.',
    ['Defina os pesos.', 'Calcule nota de cada trajeto.', 'Guarde o menor valor.'])

add(14, '''  tipo: vetor[1..3, 1..4] de inteiro
  litros: vetor[1..3, 1..4] de real
  setor, canteiro, total: inteiro
  agua: real''', '''  agua <- 0
  para setor de 1 ate 3 faca
    para canteiro de 1 ate 4 faca
      escreva("Tipo da planta em ", setor, ",", canteiro, " (1, 2 ou 3): ")
      leia(tipo[setor, canteiro])
      escolha tipo[setor, canteiro]
        caso 1
          litros[setor, canteiro] <- 1
        caso 2
          litros[setor, canteiro] <- 2
        caso 3
          litros[setor, canteiro] <- 3
        outrocaso
          litros[setor, canteiro] <- 0
      fimescolha
      agua <- agua + litros[setor, canteiro]
    fimpara
  fimpara
  escreval("Água total necessária: ", agua, " L")
  para setor de 1 ate 3 faca
    agua <- 0
    para canteiro de 1 ate 4 faca
      agua <- agua + litros[setor, canteiro]
    fimpara
    escreval("Setor ", setor, ": ", agua, " L")
  fimpara''',
    'Matriz 3×4 representa canteiros. Planta tipo 1 precisa 1 L, tipo 2 precisa 2 L, tipo 3 precisa 3 L; tipo desconhecido recebe zero.',
    'Um setor com tipos 1,2,3,1 precisa 7 L',
    'Canteiro com tipo inválido deve ser corrigido se o plano precisar ser completo.',
    'Uma segunda matriz guarda água por canteiro para calcular totais de cada setor.',
    ['Associe tipo a litros.', 'Some células para o total geral.', 'Some cada linha para o setor.'])

add(15, '''  nome: vetor[1..5] de caractere
  ultimoDia, intervalo: vetor[1..5] de inteiro
  i, hoje: inteiro''', '''  escreva("Dia atual do planejamento: ")
  leia(hoje)
  para i de 1 ate 5 faca
    escreva("Planta ", i, ": ")
    leia(nome[i])
    escreva("Último dia de rega: ")
    leia(ultimoDia[i])
    escreva("Intervalo entre regas (dias): ")
    leia(intervalo[i])
    se (intervalo[i] > 0) e (hoje >= ultimoDia[i]) entao
      se hoje - ultimoDia[i] >= intervalo[i] entao
        escreval(nome[i], ": rega vencida")
      senao
        escreval(nome[i], ": próxima rega em ", intervalo[i] - (hoje - ultimoDia[i]), " dia(s)")
      fimse
    senao
      escreval("Agenda inválida para ", nome[i])
    fimse
  fimpara''',
    'Use dias numéricos de uma mesma linha do tempo. Para cinco plantas, compare hoje menos último dia de rega ao intervalo configurado.',
    'Hoje 10, última rega 7, intervalo 3 → rega vencida',
    'Intervalo zero ou último dia no futuro invalida a agenda da planta.',
    'A diferença de dias mede quanto tempo se passou desde a última rega.',
    ['Guarde último dia e intervalo.', 'Calcule dias decorridos.', 'Compare com intervalo.'])

add(16, '''  medida: vetor[1..3, 1..4] de real
  planta, semana: inteiro
  variacao, soma: real''', '''  para planta de 1 ate 3 faca
    para semana de 1 ate 4 faca
      escreva("Comprimento da planta ", planta, " semana ", semana, " (cm): ")
      leia(medida[planta, semana])
    fimpara
    variacao <- medida[planta, 4] - medida[planta, 1]
    escreval("Planta ", planta, ": variação total ", variacao, " cm")
    se variacao > 0 entao
      escreval("Tendência geral de crescimento")
    senao
      se variacao < 0 entao
        escreval("Tendência geral de redução")
      senao
        escreval("Estável no início e fim")
      fimse
    fimse
    para semana de 2 ate 4 faca
      escreval("Semana ", semana - 1, " para ", semana, ": ", medida[planta, semana] - medida[planta, semana - 1], " cm")
    fimpara
  fimpara''',
    'Registre quatro medições de três plantas. Mostre variação entre primeira e última semana e diferenças semanais para analisar tendência.',
    'Planta 10, 12, 14, 15 cm → variação geral +5 cm',
    'Variação zero entre início e fim é estável nesse resumo, mesmo se houve oscilação intermediária.',
    'A matriz mantém medições por planta e semana; diferenças revelam evolução.',
    ['Leia cada linha da matriz.', 'Subtraia última menos primeira.', 'Compare semanas adjacentes.'])

add(17, '''  producao, perda: vetor[1..4] de real
  i: inteiro
  preco, liquida, receita: real''', '''  escreva("Preço de venda por kg: ")
  leia(preco)
  receita <- 0
  para i de 1 ate 4 faca
    escreva("Produção do canteiro ", i, " (kg): ")
    leia(producao[i])
    escreva("Perda em kg: ")
    leia(perda[i])
    se (producao[i] >= 0) e (perda[i] >= 0) e (perda[i] <= producao[i]) e (preco >= 0) entao
      liquida <- producao[i] - perda[i]
      receita <- receita + liquida * preco
      escreval("Canteiro ", i, ": ", liquida, " kg vendáveis")
    senao
      escreval("Registro inválido")
    fimse
  fimpara
  escreval("Receita líquida estimada: R$ ", receita)''',
    'Para quatro canteiros, calcule produção vendável = produção menos perda. Multiplique por preço por kg e some a receita.',
    'Produção 10 kg, perda 2 kg, preço R$ 5/kg → R$ 40',
    'Perda maior que produção invalida o canteiro.',
    'A receita considera somente a massa efetivamente vendável.',
    ['Subtraia perdas.', 'Multiplique pelo preço.', 'Some canteiros válidos.'])

add(18, '''  area: vetor[1..3] de caractere
  indicador: vetor[1..3, 1..4] de real
  i, mes, abaixo: inteiro
  meta: real''', '''  escreva("Meta mensal do indicador: ")
  leia(meta)
  para i de 1 ate 3 faca
    escreva("Área ", i, ": ")
    leia(area[i])
    abaixo <- 0
    para mes de 1 ate 4 faca
      escreva("Indicador do mês ", mes, ": ")
      leia(indicador[i, mes])
      se indicador[i, mes] < meta entao
        abaixo <- abaixo + 1
        escreval(area[i], " abaixo da meta no mês ", mes)
      fimse
    fimpara
    escreval(area[i], ": ", abaixo, " mês(es) abaixo da meta")
  fimpara''',
    'Três áreas registram o mesmo indicador em quatro meses. Compare cada leitura à meta comum e conte meses abaixo por área.',
    'Meta 10; valores 8, 10, 12, 9 → dois meses abaixo',
    'Valor igual à meta a alcança.',
    'A matriz liga área a mês e permite relatórios por linha.',
    ['Percorra áreas e meses.', 'Compare cada célula com a meta.', 'Conte pendências por área.'])

add(19, '''  dia, capacidade: inteiro
  entrada, consumo, reservatorio, excedente, totalExcedente: real''', '''  escreva("Capacidade do reservatório (L): ")
  leia(capacidade)
  escreva("Volume inicial (L): ")
  leia(reservatorio)
  totalExcedente <- 0
  se (capacidade < 0) ou (reservatorio < 0) ou (reservatorio > capacidade) entao
    escreval("Dados inválidos")
  senao
    para dia de 1 ate 7 faca
      escreva("Entrada do dia ", dia, " (L): ")
      leia(entrada)
      escreva("Consumo (L): ")
      leia(consumo)
      se (entrada >= 0) e (consumo >= 0) entao
        reservatorio <- reservatorio + entrada
        excedente <- 0
        se reservatorio > capacidade entao
          excedente <- reservatorio - capacidade
          reservatorio <- capacidade
          totalExcedente <- totalExcedente + excedente
        fimse
        se consumo > reservatorio entao
          consumo <- reservatorio
        fimse
        reservatorio <- reservatorio - consumo
        escreval("Dia ", dia, ": volume ", reservatorio, " L; transbordou ", excedente, " L")
      fimse
    fimpara
    escreval("Transbordamento total: ", totalExcedente, " L")
  fimse''',
    'Por sete dias, adicione entrada, limite o reservatório à capacidade e depois retire consumo até o volume disponível.',
    'Capacidade 100, volume 90, entrada 20, consumo 5 → transborda 10; termina com 95 L',
    'Consumo maior que volume disponível é limitado ao volume restante.',
    'O transbordamento é apurado antes do consumo, respeitando a ordem física definida.',
    ['Some entrada.', 'Corte acima da capacidade.', 'Subtraia o consumo possível.'])

add(20, '''  consumo: vetor[1..8] de real
  mes: inteiro
  media, economia: real''', '''  para mes de 1 ate 8 faca
    escreva("Consumo do mês ", mes, ": ")
    leia(consumo[mes])
  fimpara
  economia <- 0
  para mes de 2 ate 8 faca
    economia <- economia + consumo[mes - 1] - consumo[mes]
    escreval("Diferença mês ", mes - 1, " para ", mes, ": ", consumo[mes - 1] - consumo[mes])
  fimpara
  media <- (consumo[6] + consumo[7] + consumo[8]) / 3
  escreval("Economia acumulada relativa aos meses anteriores: ", economia)
  escreval("Projeção do próximo mês pela média dos últimos 3: ", media)''',
    'Leia oito consumos mensais. Mostre diferença mês a mês, soma dessas diferenças e projeção do mês seguinte pela média móvel dos últimos três.',
    'Últimos meses 90, 80, 70 → projeção 80',
    'Economia acumulada telescópica equivale ao primeiro consumo menos o último; pode ser negativa se houve aumento.',
    'A média móvel suaviza os três meses mais recentes para projetar o próximo.',
    ['Compare meses adjacentes.', 'Some as diferenças.', 'Faça média dos meses 6 a 8.'])

add(21, '''  trecho: vetor[1..4] de real
  velocidade, intervaloPausa: vetor[1..4] de real
  i: inteiro
  relogio: real''', '''  escreva("Horário inicial em minutos: ")
  leia(relogio)
  para i de 1 ate 4 faca
    escreva("Distância do trecho ", i, " (km): ")
    leia(trecho[i])
    escreva("Velocidade nesse trecho (km/h): ")
    leia(velocidade[i])
    escreva("Pausa ao fim do trecho (min): ")
    leia(intervaloPausa[i])
    se (trecho[i] >= 0) e (velocidade[i] > 0) e (intervaloPausa[i] >= 0) entao
      relogio <- relogio + trecho[i] / velocidade[i] * 60
      escreval("Chegada ao fim do trecho ", i, ": minuto ", relogio)
      relogio <- relogio + intervaloPausa[i]
      escreval("Retomada: minuto ", relogio)
    senao
      escreval("Trecho inválido ignorado")
    fimse
  fimpara
  escreval("Fim da trilha: minuto ", relogio)''',
    'Quatro trechos têm distância, velocidade e pausa final próprias. Some tempo de caminhada e pausa a um relógio em minutos.',
    'Trecho 4 km a 4 km/h, pausa 15 min → 75 minutos até a retomada',
    'Velocidade zero invalida o trecho para evitar divisão por zero.',
    'A duração em horas é multiplicada por sessenta antes de atualizar a agenda.',
    ['Calcule distância/velocidade.', 'Converta horas em minutos.', 'Some pausa após registrar chegada.'])

add(22, '''  leitura: vetor[1..3, 1..4] de real
  regiao, sensor, fora: inteiro
  limite, soma: real''', '''  escreva("Limite máximo de qualidade do ar: ")
  leia(limite)
  para regiao de 1 ate 3 faca
    fora <- 0
    soma <- 0
    para sensor de 1 ate 4 faca
      escreva("Região ", regiao, " sensor ", sensor, ": ")
      leia(leitura[regiao, sensor])
      soma <- soma + leitura[regiao, sensor]
      se leitura[regiao, sensor] > limite entao
        fora <- fora + 1
        escreval("Sensor acima do limite")
      fimse
    fimpara
    escreval("Região ", regiao, ": média ", soma / 4, "; ", fora, " sensor(es) acima do limite")
  fimpara''',
    'Três regiões possuem quatro sensores cada. Calcule média por região e conte leituras estritamente acima do limite.',
    'Região com 10,20,30,40 e limite 25 → média 25; dois sensores acima',
    'Leitura exatamente no limite não é marcada.',
    'Cada linha da matriz contém sensores de uma região.',
    ['Use matriz região×sensor.', 'Some para média.', 'Conte leituras acima do limite.'])

add(23, '''  faixa: vetor[1..3] de inteiro
  i: inteiro
  altura: real''', '''  para i de 1 ate 3 faca
    faixa[i] <- 0
  fimpara
  para i de 1 ate 12 faca
    escreva("Altura da árvore ", i, " em metros: ")
    leia(altura)
    se altura < 0 entao
      escreval("Altura inválida")
    senao
      se altura < 2 entao
        faixa[1] <- faixa[1] + 1
      senao
        se altura < 5 entao
          faixa[2] <- faixa[2] + 1
        senao
          faixa[3] <- faixa[3] + 1
        fimse
      fimse
    fimse
  fimpara
  escreval("Abaixo de 2 m: ", faixa[1])
  escreval("De 2 a menos de 5 m: ", faixa[2])
  escreval("5 m ou mais: ", faixa[3])''',
    'Classifique doze árvores em três faixas: abaixo de 2 m, de 2 m até menos de 5 m, e 5 m ou mais.',
    'Alturas 1, 2 e 5 m → uma árvore em cada faixa',
    'Altura negativa é ignorada.',
    'A sequência de condições separa intervalos sem sobreposição.',
    ['Defina limites.', 'Conte uma faixa por árvore.', 'Mostre distribuição.'])

add(24, '''  contagem: vetor[1..3, 1..4] de inteiro
  parcela, especie, riqueza, total: inteiro''', '''  para parcela de 1 ate 3 faca
    riqueza <- 0
    total <- 0
    para especie de 1 ate 4 faca
      escreva("Parcela ", parcela, " espécie ", especie, " indivíduos: ")
      leia(contagem[parcela, especie])
      se contagem[parcela, especie] > 0 entao
        riqueza <- riqueza + 1
        total <- total + contagem[parcela, especie]
      fimse
    fimpara
    escreval("Parcela ", parcela, ": ", total, " indivíduos, riqueza de ", riqueza, " espécie(s)")
  fimpara''',
    'Três parcelas registram contagens de quatro espécies. Riqueza é o número de espécies com pelo menos um indivíduo em cada parcela.',
    'Contagens 3,0,2,0 → 5 indivíduos e riqueza 2',
    'Contagem zero não aumenta riqueza. Entrada negativa é ignorada.',
    'A riqueza mede presença de tipos, não quantidade total de animais.',
    ['Conte indivíduos positivos.', 'Some indivíduos.', 'Incremente riqueza uma vez por espécie presente.'])

add(25, '''  semana: inteiro
  estoque, entrada, perdaPct, saida, transformado, totalSaida: real''', '''  escreva("Massa inicial em kg: ")
  leia(estoque)
  escreva("Perda percentual semanal: ")
  leia(perdaPct)
  totalSaida <- 0
  se (estoque < 0) ou (perdaPct < 0) ou (perdaPct > 100) entao
    escreval("Parâmetros inválidos")
  senao
    para semana de 1 ate 4 faca
      escreva("Entrada de material na semana ", semana, ": ")
      leia(entrada)
      escreva("Saída de composto: ")
      leia(saida)
      se (entrada >= 0) e (saida >= 0) entao
        transformado <- (estoque + entrada) * (1 - perdaPct / 100)
        se saida <= transformado entao
          estoque <- transformado - saida
          totalSaida <- totalSaida + saida
          escreval("Semana ", semana, ": estoque ", estoque, " kg")
        senao
          escreval("Saída maior que material disponível; operação recusada")
        fimse
      fimse
    fimpara
    escreval("Saídas totais: ", totalSaida, " kg")
  fimse''',
    'Por quatro semanas, adicione material, aplique uma perda percentual sobre o material em transformação e retire composto pronto se houver saldo.',
    'Estoque 100 kg, entrada 0, perda 10%, saída 20 kg → saldo 70 kg',
    'Saída maior que material transformado é recusada e preserva o estoque anterior da semana.',
    'A ordem entrada → transformação → saída determina o novo estoque.',
    ['Some entrada ao saldo.', 'Aplique perda percentual.', 'Confira saída antes de descontar.'])

add(26, '''  quantidade, dias: inteiro
  antigaW, novaW, horasDia, tarifa, precoNova, economiaDia, retorno: real''', '''  escreva("Número de lâmpadas: ")
  leia(quantidade)
  escreva("Potência antiga e nova em W: ")
  leia(antigaW, novaW)
  escreva("Horas acesas por dia: ")
  leia(horasDia)
  escreva("Tarifa R$/kWh: ")
  leia(tarifa)
  escreva("Investimento total nas novas lâmpadas R$: ")
  leia(precoNova)
  se (quantidade <= 0) ou (antigaW < novaW) ou (novaW < 0) ou (horasDia < 0) ou (tarifa < 0) ou (precoNova < 0) entao
    escreval("Dados inválidos")
  senao
    economiaDia <- quantidade * (antigaW - novaW) * horasDia * tarifa / 1000
    escreval("Economia diária: R$ ", economiaDia)
    se economiaDia > 0 entao
      retorno <- precoNova / economiaDia
      escreval("Prazo estimado para recuperar investimento: ", retorno, " dias")
    senao
      escreval("Sem economia diária para recuperar investimento")
    fimse
  fimse''',
    'Compare um conjunto de lâmpadas antigas e novas sob o mesmo uso diário. Calcule economia em R$/dia e investimento dividido por essa economia.',
    '10 lâmpadas economizam R$ 2/dia; investimento R$ 100 → retorno em 50 dias',
    'Economia zero não tem prazo finito de retorno.',
    'Diferença de potência vira kWh economizados por dia e depois valor monetário.',
    ['Subtraia potências.', 'Multiplique quantidade, horas e tarifa.', 'Divida investimento pela economia diária.'])

add(27, '''  visita: vetor[1..5, 1..5] de inteiro
  linha, coluna, novaL, novaC, i, tecla: inteiro''', '''  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      visita[linha, coluna] <- 0
    fimpara
  fimpara
  linha <- 3
  coluna <- 3
  visita[linha, coluna] <- 1
  para i de 1 ate 12 faca
    escreva("Movimento ", i, " (1 cima, 2 direita, 3 baixo, 4 esquerda): ")
    leia(tecla)
    novaL <- linha
    novaC <- coluna
    escolha tecla
      caso 1
        novaL <- novaL - 1
      caso 2
        novaC <- novaC + 1
      caso 3
        novaL <- novaL + 1
      caso 4
        novaC <- novaC - 1
    fimescolha
    se (novaL >= 1) e (novaL <= 5) e (novaC >= 1) e (novaC <= 5) entao
      linha <- novaL
      coluna <- novaC
      visita[linha, coluna] <- visita[linha, coluna] + 1
    fimse
  fimpara
  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      escreva(visita[linha, coluna], " ")
    fimpara
    escreval("")
  fimpara''',
    'A formiga começa no centro de uma grade 5×5. Leia doze movimentos; movimentos fora da grade são ignorados. Mostre quantas vezes cada posição foi visitada.',
    'De (3,3), direita e esquerda → (3,3) visitada duas vezes, (3,4) uma',
    'Comando diferente de 1–4 não altera a posição, mas a posição atual já foi contada.',
    'A matriz registra o número de chegadas em cada célula, incluindo a posição inicial.',
    ['Inicialize a matriz com zero.', 'Valide o movimento proposto.', 'Incremente a célula após mover.'])

add(28, '''  umidade, liga, desliga: vetor[1..3] de real
  valvula: vetor[1..3] de inteiro
  i, rodada: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Sensor ", i, ": liga abaixo de: ")
    leia(liga[i])
    escreva("Desliga a partir de: ")
    leia(desliga[i])
    valvula[i] <- 0
  fimpara
  para rodada de 1 ate 5 faca
    para i de 1 ate 3 faca
      escreva("Umidade sensor ", i, " na rodada ", rodada, ": ")
      leia(umidade[i])
      se valvula[i] = 0 entao
        se umidade[i] < liga[i] entao
          valvula[i] <- 1
        fimse
      senao
        se umidade[i] >= desliga[i] entao
          valvula[i] <- 0
        fimse
      fimse
      escreval("Válvula ", i, ": ", valvula[i])
    fimpara
  fimpara''',
    'Três setores têm limiares independentes. Válvula desligada liga abaixo do limiar inferior; ligada desliga ao atingir o superior.',
    'Liga abaixo de 30, desliga em 45: umidade 20 liga, 35 mantém, 45 desliga',
    'Configure limiar de desligar maior que o de ligar para obter histerese coerente.',
    'Cada válvula conserva seu próprio estado entre as cinco rodadas.',
    ['Guarde dois limites por setor.', 'Confira o estado atual.', 'Altere apenas quando atravessar o limite correspondente.'])

add(29, '''  leitura: vetor[1..10] de real
  i, maximos, minimos: inteiro''', '''  para i de 1 ate 10 faca
    escreva("Nível da maré na leitura ", i, ": ")
    leia(leitura[i])
  fimpara
  maximos <- 0
  minimos <- 0
  para i de 2 ate 9 faca
    se (leitura[i] > leitura[i - 1]) e (leitura[i] > leitura[i + 1]) entao
      maximos <- maximos + 1
      escreval("Máximo local na leitura ", i, ": ", leitura[i])
    fimse
    se (leitura[i] < leitura[i - 1]) e (leitura[i] < leitura[i + 1]) entao
      minimos <- minimos + 1
      escreval("Mínimo local na leitura ", i, ": ", leitura[i])
    fimse
  fimpara
  escreval("Máximos locais: ", maximos, "; mínimos locais: ", minimos)''',
    'Leia dez níveis de maré. Uma leitura interna é máximo local se supera os dois vizinhos; mínimo local se fica abaixo dos dois.',
    'Níveis 1,3,2 → leitura central é máximo local',
    'Extremos da série não têm dois vizinhos e não são avaliados. Empate não forma extremo estrito.',
    'Comparar a leitura anterior e a posterior identifica picos e vales locais.',
    ['Percorra posições 2–9.', 'Compare com ambos os vizinhos.', 'Conte máximos e mínimos.'])

add(30, '''  setor: vetor[1..3] de caractere
  agua, energia, residuos: vetor[1..3] de real
  i, pendencias: inteiro
  metaAgua, metaEnergia, metaResiduos: real''', '''  escreva("Metas de água, energia e resíduos: ")
  leia(metaAgua, metaEnergia, metaResiduos)
  para i de 1 ate 3 faca
    escreva("Setor ", i, ": ")
    leia(setor[i])
    escreva("Economia de água, energia e resíduos: ")
    leia(agua[i], energia[i], residuos[i])
    pendencias <- 0
    se agua[i] < metaAgua entao
      pendencias <- pendencias + 1
      escreval(setor[i], ": água abaixo da meta")
    fimse
    se energia[i] < metaEnergia entao
      pendencias <- pendencias + 1
      escreval(setor[i], ": energia abaixo da meta")
    fimse
    se residuos[i] < metaResiduos entao
      pendencias <- pendencias + 1
      escreval(setor[i], ": resíduos abaixo da meta")
    fimse
    escreval(setor[i], ": ", 3 - pendencias, " meta(s) atingida(s), ", pendencias, " pendência(s)")
  fimpara''',
    'Três setores possuem indicadores de economia de água, energia e resíduos. Cada indicador é comparado à sua própria meta; reporte atingidas e pendências.',
    'Metas 10,20,30; setor obtém 10,15,35 → 2 metas atingidas, energia pendente',
    'Igualdade alcança a meta.',
    'Comparar separadamente cada dimensão evita somar unidades diferentes.',
    ['Guarde três metas.', 'Compare cada setor por dimensão.', 'Conte pendências e atingidas.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')

#!/usr/bin/env python3
"""Curated introductory September exercises based on the challenge CSV."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'09-{day:02d}'
    prompt = rows[date]['simples_enunciado']
    code = f'algoritmo "Desafio09{day:02d}S"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/simples'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '  fileiras, porFileira: inteiro', '''  escreva("Fileiras de mudas: ")
  leia(fileiras)
  escreva("Mudas por fileira: ")
  leia(porFileira)
  se (fileiras < 0) ou (porFileira < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Mudas plantadas: ", fileiras * porFileira)
  fimse''', 'As fileiras têm a mesma quantidade de mudas.',
    '4 fileiras com 5 mudas → 20 mudas', 'Zero fileira resulta em zero muda.',
    'A multiplicação soma a mesma quantidade em cada fileira.',
    ['Leia fileiras.', 'Leia mudas por fileira.', 'Multiplique.'])

add(2, '  material: caractere', '''  escreva("Material (PAPEL, VIDRO ou PLÁSTICO): ")
  leia(material)
  escolha maiusc(material)
    caso "PAPEL"
      escreval("Lixeira azul")
    caso "VIDRO"
      escreval("Lixeira verde")
    caso "PLÁSTICO"
      escreval("Lixeira vermelha")
    caso "PLASTICO"
      escreval("Lixeira vermelha")
    outrocaso
      escreval("Material não cadastrado")
  fimescolha''',
    'Associe papel à azul, vidro à verde e plástico à vermelha.',
    'VIDRO → lixeira verde', 'PLASTICO sem acento também é aceito.',
    'A seleção escolhe a cor correspondente ao material informado.',
    ['Normalize para maiúsculas.', 'Use escolha.', 'Trate material desconhecido.'])

add(3, '  litrosDia: real\n  dias: inteiro', '''  escreva("Litros economizados por dia: ")
  leia(litrosDia)
  escreva("Número de dias: ")
  leia(dias)
  se (litrosDia < 0) ou (dias < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Economia total: ", litrosDia * dias, " L")
  fimse''',
    'A economia diária permanece constante ao longo do período.',
    '2,5 L por dia durante 4 dias → 10 L', 'Zero dia gera economia zero.',
    'Multiplicar a economia de um dia pelo número de dias dá o total.',
    ['Leia taxa diária.', 'Leia dias.', 'Multiplique.'])

add(4, '  potencia, horas, geracao: real', '''  escreva("Potência do painel em W: ")
  leia(potencia)
  escreva("Horas ideais de sol: ")
  leia(horas)
  se (potencia < 0) ou (horas < 0) entao
    escreval("Dados inválidos")
  senao
    geracao <- potencia * horas / 1000
    escreval("Geração estimada: ", geracao, " kWh")
  fimse''',
    'Considere potência constante em horas ideais; converta Wh para kWh.',
    '500 W por 4 h → 2 kWh', 'Zero hora gera zero energia.',
    'Potência vezes tempo fornece Wh; mil Wh formam um kWh.',
    ['Multiplique W por h.', 'Divida por 1000.', 'Mostre kWh.'])

add(5, '  largura, comprimento: real', '''  escreva("Largura do canteiro: ")
  leia(largura)
  escreva("Comprimento do canteiro: ")
  leia(comprimento)
  se (largura < 0) ou (comprimento < 0) entao
    escreval("Medida inválida")
  senao
    escreval("Área: ", largura * comprimento, " m2")
  fimse''',
    'O canteiro é retangular e as duas medidas estão em metros.',
    '3 m por 4 m → 12 m²', 'Uma medida zero produz área zero.',
    'A área do retângulo é o produto dos lados.',
    ['Leia dois lados.', 'Multiplique.', 'Mostre m².'])

add(6, '  estoque, semeadas: inteiro', '''  escreva("Sementes disponíveis: ")
  leia(estoque)
  escreva("Sementes plantadas: ")
  leia(semeadas)
  se (estoque < 0) ou (semeadas < 0) ou (semeadas > estoque) entao
    escreval("Dados inválidos")
  senao
    escreval("Sementes restantes: ", estoque - semeadas)
  fimse''',
    'Desconte do estoque somente a quantidade semeada.',
    '100 sementes, 35 semeadas → 65 restantes', 'Semear todas deixa saldo zero.',
    'A subtração representa o estoque após o plantio.',
    ['Leia estoque.', 'Leia uso.', 'Subtraia após validar.'])

add(7, '  milimetros, area, litros: real', '''  escreva("Chuva em milímetros: ")
  leia(milimetros)
  escreva("Área em metros quadrados: ")
  leia(area)
  se (milimetros < 0) ou (area < 0) entao
    escreval("Dados inválidos")
  senao
    litros <- milimetros * area
    escreval("Volume: ", litros, " L")
    escreval("Por metro quadrado: ", milimetros, " L/m2")
  fimse''',
    'Um milímetro de chuva sobre um metro quadrado equivale a um litro de água.',
    '10 mm sobre 2 m² → 20 L; 10 L/m²', 'Área zero recebe volume zero.',
    'Multiplicar precipitação pela área fornece litros.',
    ['Use equivalência 1 mm = 1 L/m².', 'Multiplique pela área.', 'Mostre as unidades.'])

add(8, '  leitura, minimo, maximo: real', '''  escreva("Temperatura mínima ideal: ")
  leia(minimo)
  escreva("Temperatura máxima ideal: ")
  leia(maximo)
  escreva("Leitura da estufa: ")
  leia(leitura)
  se minimo > maximo entao
    escreval("Faixa inválida")
  senao
    se leitura < minimo entao
      escreval("Abaixo da faixa")
    senao
      se leitura > maximo entao
        escreval("Acima da faixa")
      senao
        escreval("Dentro da faixa")
      fimse
    fimse
  fimse''',
    'Os limites inferior e superior fazem parte da faixa ideal.',
    'Faixa 18–25 °C, leitura 20 → dentro', 'Leitura igual a qualquer limite está dentro.',
    'Duas comparações separam abaixo, dentro e acima.',
    ['Leia três valores.', 'Confira a ordem dos limites.', 'Compare a leitura.'])

add(9, '  vento, limite: real', '''  escreva("Velocidade do vento: ")
  leia(vento)
  escreva("Limite de vento forte: ")
  leia(limite)
  se (vento < 0) ou (limite < 0) entao
    escreval("Dados inválidos")
  senao
    se vento > limite entao
      escreval("Vento acima do limite")
    senao
      escreval("Vento no limite ou abaixo")
    fimse
  fimse''',
    'Considere vento forte apenas quando a velocidade superar estritamente o limite.',
    'Vento 30, limite 20 → acima', 'Igualdade não supera o limite.',
    'A relação > distingue os dois estados.',
    ['Leia velocidade e limite.', 'Use >.', 'Mostre o caso correto.'])

add(10, '  ida: real', '''  escreva("Distância da ida em km: ")
  leia(ida)
  se ida < 0 entao
    escreval("Distância inválida")
  senao
    escreval("Ida e volta: ", ida * 2, " km")
  fimse''',
    'O retorno percorre o mesmo trajeto da ida.',
    '3 km de ida → 6 km no total', 'Distância zero resulta em zero.',
    'O mesmo percurso é contabilizado duas vezes.',
    ['Leia ida.', 'Multiplique por dois.', 'Mostre km.'])

add(11, '  a, b, c: real', '''  escreva("Massas dos três sacos: ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Massa inválida")
  senao
    escreval("Massa recolhida: ", a + b + c, " kg")
  fimse''',
    'As três massas são medidas em quilogramas.',
    '2, 3 e 4 kg → 9 kg', 'Saco vazio contribui com zero.',
    'A massa total é a soma das três parcelas.',
    ['Leia três massas.', 'Some.', 'Mostre kg.'])

add(12, '  nebulosidade, limite: real', '''  escreva("Nebulosidade em %: ")
  leia(nebulosidade)
  escreva("Limite para dia ensolarado em %: ")
  leia(limite)
  se (nebulosidade < 0) ou (nebulosidade > 100) ou (limite < 0) ou (limite > 100) entao
    escreval("Percentual inválido")
  senao
    se nebulosidade < limite entao
      escreval("Dia ensolarado")
    senao
      escreval("Nebulosidade no limite ou acima")
    fimse
  fimse''',
    'Dia ensolarado exige nebulosidade estritamente abaixo do limite definido.',
    '20% com limite 40% → ensolarado', 'Igualdade não fica abaixo.',
    'A comparação estrita evita incluir o limite no resultado positivo.',
    ['Valide 0–100%.', 'Compare <.', 'Exiba a classificação.'])

add(13, '  distancia, taxa: real', '''  escreva("Distância percorrida em km: ")
  leia(distancia)
  escreva("Emissão estimada em kg por km: ")
  leia(taxa)
  se (distancia < 0) ou (taxa < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Emissão estimada: ", distancia * taxa, " kg")
  fimse''',
    'Considere taxa de emissão constante por quilômetro.',
    '100 km a 0,2 kg/km → 20 kg', 'Zero distância produz zero emissão.',
    'A emissão é distância multiplicada pela taxa.',
    ['Leia km.', 'Leia kg/km.', 'Multiplique.'])

add(14, '  linhas, colunas: inteiro', '''  escreva("Linhas de vasos: ")
  leia(linhas)
  escreva("Colunas de vasos: ")
  leia(colunas)
  se (linhas < 0) ou (colunas < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total de vasos: ", linhas * colunas)
  fimse''',
    'Considere uma grade retangular com todas as posições ocupadas por um vaso.',
    '3 linhas × 4 colunas → 12 vasos', 'Grade com dimensão zero não possui vasos.',
    'Multiplicação conta todas as posições da grade.',
    ['Leia linhas.', 'Leia colunas.', 'Multiplique.'])

add(15, '  plantas, i: inteiro', '''  escreva("Plantas regadas: ")
  leia(plantas)
  se plantas < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate plantas faca
      escreval("Planta ", i, " regada")
    fimpara
  fimse''',
    'Numere de 1 até a quantidade de plantas atendidas.',
    'N=2 → Planta 1 regada; Planta 2 regada', 'N=0 não imprime planta.',
    'O contador do laço fornece a numeração.',
    ['Leia N.', 'Use para.', 'Imprima cada número.'])

add(16, '  centimetros: real', '''  escreva("Comprimento em centímetros: ")
  leia(centimetros)
  se centimetros < 0 entao
    escreval("Medida inválida")
  senao
    escreval("Comprimento: ", centimetros * 10, " mm")
  fimse''',
    'Cada centímetro contém dez milímetros.',
    '2,5 cm → 25 mm', 'Zero cm corresponde a zero mm.',
    'A conversão multiplica a medida por dez.',
    ['Leia cm.', 'Multiplique por dez.', 'Mostre mm.'])

add(17, '  quilos, precoQuilo: real', '''  escreva("Quilos vendidos: ")
  leia(quilos)
  escreva("Preço por quilo: ")
  leia(precoQuilo)
  se (quilos < 0) ou (precoQuilo < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Receita: R$ ", quilos * precoQuilo)
  fimse''',
    'Use preço unitário por quilograma constante.',
    '8 kg a R$ 5/kg → R$ 40', 'Venda de zero kg gera zero receita.',
    'A receita é massa vendida multiplicada pela taxa de preço.',
    ['Leia kg.', 'Leia R$/kg.', 'Multiplique.'])

add(18, '  reciclada, meta: real', '''  escreva("Quantidade reciclada: ")
  leia(reciclada)
  escreva("Meta: ")
  leia(meta)
  se (reciclada < 0) ou (meta < 0) entao
    escreval("Dados inválidos")
  senao
    se reciclada >= meta entao
      escreval("Meta alcançada")
    senao
      escreval("Faltam ", meta - reciclada)
    fimse
  fimse''',
    'A meta é alcançada quando a quantidade reciclada é maior ou igual a ela.',
    'Reciclada 9, meta 10 → falta 1', 'Igualdade alcança a meta.',
    'A diferença calcula a pendência.',
    ['Compare >=.', 'Subtraia no caso incompleto.', 'Mostre o estado.'])

add(19, '  a, b, c: real', '''  escreva("Volumes das três fontes (L): ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Volume inválido")
  senao
    escreval("Volume conjunto: ", a + b + c, " L")
  fimse''',
    'Some os volumes das três fontes na mesma unidade.',
    '10, 20 e 30 L → 60 L', 'Fonte seca contribui com zero.',
    'A soma reúne a contribuição de cada fonte.',
    ['Leia três volumes.', 'Some.', 'Mostre L.'])

add(20, '  antigo, novo, reducao: real', '''  escreva("Consumo antigo: ")
  leia(antigo)
  escreva("Consumo novo: ")
  leia(novo)
  se (antigo <= 0) ou (novo < 0) entao
    escreval("Dados inválidos")
  senao
    reducao <- 100 * (antigo - novo) / antigo
    escreval("Redução percentual: ", reducao, "%")
  fimse''',
    'Use o consumo antigo como base da porcentagem.',
    'Antigo 100, novo 80 → redução 20%', 'Se o consumo novo aumentar, a redução é negativa.',
    'A diferença dividida pelo valor inicial mede a variação relativa.',
    ['Subtraia novo de antigo.', 'Divida por antigo.', 'Multiplique por cem.'])

add(21, '  distancia, velocidade: real', '''  escreva("Distância da trilha (km): ")
  leia(distancia)
  escreva("Velocidade média (km/h): ")
  leia(velocidade)
  se (distancia < 0) ou (velocidade <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Tempo estimado: ", distancia / velocidade, " h")
  fimse''',
    'Assuma velocidade constante e use tempo = distância / velocidade.',
    '12 km a 4 km/h → 3 h', 'Velocidade zero torna o cálculo impossível.',
    'As unidades km e km/h resultam em horas.',
    ['Leia km.', 'Leia km/h.', 'Divida após validar.'])

add(22, '  indice: real', '''  escreva("Índice fictício de poluição: ")
  leia(indice)
  se indice < 0 entao
    escreval("Índice inválido")
  senao
    se indice <= 50 entao
      escreval("Baixo")
    senao
      se indice <= 100 entao
        escreval("Moderado")
      senao
        escreval("Alto")
      fimse
    fimse
  fimse''',
    'Classifique 0–50 como baixo, acima de 50 até 100 como moderado e acima de 100 como alto.',
    '50 → baixo; 75 → moderado; 120 → alto', 'Índice negativo é inválido.',
    'Condições ordenadas garantem que cada valor entre em uma única faixa.',
    ['Valide não negativo.', 'Teste até 50.', 'Depois teste até 100.'])

add(23, '  metros: real', '''  escreva("Altura da árvore em metros: ")
  leia(metros)
  se metros < 0 entao
    escreval("Altura inválida")
  senao
    escreval("Altura: ", metros * 100, " cm")
  fimse''',
    'Um metro contém cem centímetros.',
    '2,5 m → 250 cm', 'Zero metro corresponde a zero cm.',
    'Multiplicar por cem muda a unidade.',
    ['Leia metros.', 'Multiplique por cem.', 'Mostre cm.'])

add(24, '  primeira, segunda, terceira: inteiro', '''  escreva("Exemplares das três espécies: ")
  leia(primeira, segunda, terceira)
  se (primeira < 0) ou (segunda < 0) ou (terceira < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Exemplares observados: ", primeira + segunda + terceira)
  fimse''',
    'Some as contagens de três espécies sem confundi-las.',
    '2, 3 e 4 indivíduos → 9 exemplares', 'Espécie não observada contribui com zero.',
    'O total de indivíduos é a soma das três contagens.',
    ['Leia três números.', 'Some.', 'Mostre exemplares.'])

add(25, '  massa, perda: real', '''  escreva("Massa inicial (kg): ")
  leia(massa)
  escreva("Perda percentual: ")
  leia(perda)
  se (massa < 0) ou (perda < 0) ou (perda > 100) entao
    escreval("Dados inválidos")
  senao
    escreval("Massa restante: ", massa * (1 - perda / 100), " kg")
  fimse''',
    'A perda percentual incide sobre a massa inicial.',
    '100 kg com 20% de perda → 80 kg', 'Perda de 100% deixa zero.',
    'A fração restante multiplica a massa original.',
    ['Converta % em fração.', 'Subtraia de 1.', 'Multiplique pela massa.'])

add(26, '  antiga, eficiente, diferenca: real', '''  escreva("Potência da lâmpada antiga (W): ")
  leia(antiga)
  escreva("Potência da nova lâmpada (W): ")
  leia(eficiente)
  se (antiga < 0) ou (eficiente < 0) entao
    escreval("Potência inválida")
  senao
    diferenca <- antiga - eficiente
    escreval("Economia de potência: ", diferenca, " W")
  fimse''',
    'Subtraia a potência da nova lâmpada da antiga.',
    '60 W para 10 W → economia de 50 W', 'Resultado negativo indica aumento de potência.',
    'A diferença compara o consumo instantâneo das duas opções.',
    ['Leia as duas potências.', 'Subtraia nova de antiga.', 'Interprete o sinal.'])

add(27, '  viagens: inteiro\n  metrosPorIda: real', '''  escreva("Número de idas: ")
  leia(viagens)
  escreva("Metros por ida: ")
  leia(metrosPorIda)
  se (viagens < 0) ou (metrosPorIda < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Percurso total: ", viagens * metrosPorIda, " m")
  fimse''',
    'Conte apenas as idas mencionadas, todas com a mesma distância.',
    '5 idas de 2 m → 10 m', 'Zero ida produz percurso zero.',
    'Multiplicação soma deslocamentos iguais.',
    ['Leia idas.', 'Leia metros por ida.', 'Multiplique.'])

add(28, '  umidade, minimo: real', '''  escreva("Umidade medida em %: ")
  leia(umidade)
  escreva("Mínimo necessário em %: ")
  leia(minimo)
  se (umidade < 0) ou (umidade > 100) ou (minimo < 0) ou (minimo > 100) entao
    escreval("Dados inválidos")
  senao
    se umidade >= minimo entao
      escreval("Umidade suficiente")
    senao
      escreval("Umidade insuficiente")
    fimse
  fimse''',
    'A umidade atende ao mínimo quando é maior ou igual a ele.',
    '40% com mínimo 35% → suficiente', 'Igualdade é suficiente.',
    'A comparação >= inclui o limite necessário.',
    ['Valide percentuais.', 'Compare >=.', 'Mostre o estado.'])

add(29, '  maximo, minimo: real', '''  escreva("Nível máximo da maré: ")
  leia(maximo)
  escreva("Nível mínimo da maré: ")
  leia(minimo)
  se maximo < minimo entao
    escreval("Máximo menor que mínimo")
  senao
    escreval("Amplitude da maré: ", maximo - minimo)
  fimse''',
    'A diferença entre nível máximo e mínimo é a amplitude medida.',
    'Máximo 3 m e mínimo 1 m → amplitude 2 m', 'Níveis iguais dão amplitude zero.',
    'A subtração mede a variação entre extremos.',
    ['Leia extremos.', 'Confirme a ordem.', 'Subtraia.'])

add(30, '  agua, energia, residuos: real', '''  escreva("Economia de água em unidade comparável: ")
  leia(agua)
  escreva("Economia de energia na mesma escala de pontos: ")
  leia(energia)
  escreva("Economia de resíduos na mesma escala de pontos: ")
  leia(residuos)
  se (agua < 0) ou (energia < 0) ou (residuos < 0) entao
    escreval("Valor inválido")
  senao
    escreval("Pontos de economia ambiental: ", agua + energia + residuos)
  fimse''',
    'As três economias devem ser previamente convertidas para a mesma escala de pontos; não some litros diretamente a kWh.',
    '10, 20 e 30 pontos → balanço de 60 pontos', 'Valor zero não altera o balanço.',
    'A soma só faz sentido após as grandezas terem sido expressas em unidade comparável.',
    ['Use unidade comum.', 'Leia três valores.', 'Some.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')

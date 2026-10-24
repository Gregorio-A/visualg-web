#!/usr/bin/env python3
"""Curated implementations for daily exercises. Extend the catalog here."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/challenge-solutions.json"
entries = json.loads(CATALOG.read_text(encoding="utf-8")) if CATALOG.exists() else {}


def add(day, level, variables, body, objective, rules, example, edge, explanation, hints=None):
    key = f"01-{day:02d}/{level}"
    name = f"Desafio01{day:02d}{'S' if level == 'simples' else 'A'}"
    code = f'algoritmo "{name}"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[key] = dict(code=code, objective=objective, rules=rules,
                        example=example, edge=edge, explanation=explanation,
                        hints=hints or [
                            "Anote quais valores precisam ser lidos e quais serão calculados.",
                            "Use variáveis para guardar os resultados intermediários.",
                            "Teste um caso normal e o caso de fronteira descrito abaixo.",
                        ])


add(1, 'simples', '  nome: caractere', '''  escreva("Nome: ")
  leia(nome)
  escreval("Boas férias, ", nome, "!")''',
    'Receba o nome da pessoa e produza uma saudação que inclua esse nome.',
    'Leia uma cadeia de caracteres e concatene-a à mensagem de férias. Não há cálculo numérico.',
    'Nome: Ana\nBoas férias, Ana!',
    'Um nome composto também deve aparecer integralmente na mensagem.',
    'A variável `nome` guarda a entrada; `escreval` apresenta texto fixo e o valor lido na mesma linha.')

add(2, 'simples', '  temperatura: real', '''  escreva("Temperatura (°C): ")
  leia(temperatura)
  se temperatura > 30 entao
    escreval("Supera 30 °C")
  senao
    escreval("Não supera 30 °C")
  fimse''',
    'Informe se uma temperatura em graus Celsius é maior que 30.',
    'Leia uma temperatura real. Use comparação estrita: 30 °C não supera 30 °C.',
    'Temperatura (°C): 32\nSupera 30 °C',
    'Para entrada `30`, a resposta é “Não supera 30 °C”.',
    'A condição `temperatura > 30` separa os dois resultados possíveis.')

add(3, 'simples', '  total, parcela: real\n  pessoas: inteiro', '''  escreva("Valor total: ")
  leia(total)
  escreva("Número de pessoas: ")
  leia(pessoas)
  se pessoas > 0 entao
    parcela <- total / pessoas
    escreval("Cada pessoa paga: ", parcela)
  senao
    escreval("O número de pessoas deve ser positivo.")
  fimse''',
    'Calcule a parcela individual de uma compra compartilhada igualmente.',
    'Leia o valor total e a quantidade de participantes. Divida somente se a quantidade for maior que zero.',
    'Valor total: 60\nNúmero de pessoas: 3\nCada pessoa paga: 20',
    'Com zero participantes, apresente a mensagem de erro e evite divisão por zero.',
    'A validação protege a divisão; a parcela é o valor total dividido pelo número de pessoas.')

add(4, 'simples', '  minutos, horas, restante: inteiro', '''  escreva("Minutos de natação: ")
  leia(minutos)
  se minutos >= 0 entao
    horas <- minutos div 60
    restante <- minutos mod 60
    escreval(horas, " hora(s) e ", restante, " minuto(s)")
  senao
    escreval("A duração não pode ser negativa.")
  fimse''',
    'Converta uma duração em minutos para horas completas e minutos restantes.',
    'Leia um total não negativo. A divisão inteira por 60 fornece as horas; o resto fornece os minutos.',
    'Minutos de natação: 135\n2 hora(s) e 15 minuto(s)',
    'Uma entrada de 60 minutos produz 1 hora e 0 minutos.',
    '`div` e `mod` separam a parte inteira e o resto da conversão.')

add(5, 'simples', '  preco, percentual, valorFinal: real', '''  escreva("Preço: ")
  leia(preco)
  escreva("Desconto (%): ")
  leia(percentual)
  se (preco >= 0) e (percentual >= 0) e (percentual <= 100) entao
    valorFinal <- preco * (100 - percentual) / 100
    escreval("Preço com desconto: ", valorFinal)
  senao
    escreval("Preço ou percentual inválido.")
  fimse''',
    'Determine o preço final de um produto após um desconto percentual.',
    'Leia preço e taxa de desconto. Aceite taxas entre 0% e 100%; aplique a taxa sobre o preço original.',
    'Preço: 80\nDesconto (%): 25\nPreço com desconto: 60',
    'Com desconto de 100%, o preço final é zero.',
    'Multiplicar por `(100 - percentual) / 100` conserva apenas a parte não descontada.')

add(6, 'simples', '  quilometros, metros: real', '''  escreva("Distância (km): ")
  leia(quilometros)
  metros <- quilometros * 1000
  escreval("Distância (m): ", metros)''',
    'Converta uma distância informada em quilômetros para metros.',
    'Leia um número real e multiplique por 1000, pois um quilômetro contém mil metros.',
    'Distância (km): 2.5\nDistância (m): 2500',
    'Zero quilômetro corresponde a zero metro.',
    'A multiplicação realiza a conversão sem arredondar a entrada antes do cálculo.')

add(7, 'simples', '  peso, limite: real', '''  escreva("Peso da bagagem (kg): ")
  leia(peso)
  escreva("Limite (kg): ")
  leia(limite)
  se peso > limite entao
    escreval("Bagagem acima do limite.")
  senao
    escreval("Bagagem dentro do limite.")
  fimse''',
    'Verifique se a bagagem excede o limite de peso fornecido.',
    'Leia peso e limite na mesma unidade. O excesso existe somente quando peso é maior que limite.',
    'Peso da bagagem (kg): 24\nLimite (kg): 23\nBagagem acima do limite.',
    'Se peso e limite forem iguais, a bagagem está dentro do limite.',
    'A condição `peso > limite` preserva a igualdade como caso permitido.')

add(8, 'simples', '  preco, total: real', '''  escreva("Preço de uma passagem: ")
  leia(preco)
  total <- 2 * preco
  escreval("Total de ida e volta: ", total)''',
    'Calcule o custo de duas passagens de mesmo preço, uma para ida e outra para volta.',
    'Leia o preço unitário e multiplique por dois. Este exercício supõe a mesma tarifa nos dois sentidos.',
    'Preço de uma passagem: 18\nTotal de ida e volta: 36',
    'Quando a passagem for gratuita, o custo total também será zero.',
    'O fator dois representa exatamente os dois trajetos.')

add(9, 'simples', '  primeiro, segundo, terceiro, total: real', '''  escreva("Preço 1: ")
  leia(primeiro)
  escreva("Preço 2: ")
  leia(segundo)
  escreva("Preço 3: ")
  leia(terceiro)
  total <- primeiro + segundo + terceiro
  escreval("Total: ", total)''',
    'Some os preços de três itens de um lanche compartilhado.',
    'Leia os três preços separadamente, some os valores e mostre o total da compra.',
    'Preço 1: 5\nPreço 2: 7\nPreço 3: 3\nTotal: 15',
    'Um item com preço zero não altera a soma.',
    'A variável `total` acumula as três entradas e é apresentada depois de todas as leituras.')

add(10, 'simples', '  horas, minutos: real', '''  escreva("Horas: ")
  leia(horas)
  minutos <- horas * 60
  escreval("Minutos: ", minutos)''',
    'Converta um número de horas para minutos.',
    'Leia a duração em horas e multiplique por 60. Aceite frações de hora.',
    'Horas: 1.5\nMinutos: 90',
    'Meia hora, `0.5`, corresponde a 30 minutos.',
    'O tipo real permite trabalhar com durações que não são horas inteiras.')

add(11, 'simples', '  horarioInicial, horarioFinal, intervalo: inteiro', '''  escreva("Horário inicial (minutos): ")
  leia(horarioInicial)
  escreva("Horário final (minutos): ")
  leia(horarioFinal)
  se horarioFinal >= horarioInicial entao
    intervalo <- horarioFinal - horarioInicial
    escreval("Intervalo: ", intervalo, " minuto(s)")
  senao
    escreval("O horário final deve ser posterior ao inicial no mesmo dia.")
  fimse''',
    'Calcule o tempo transcorrido entre dois horários expressos em minutos do mesmo dia.',
    'Leia início e fim como minutos desde meia-noite. Subtraia apenas se o fim não preceder o início.',
    'Horário inicial (minutos): 600\nHorário final (minutos): 645\nIntervalo: 45 minuto(s)',
    'Horários iguais produzem intervalo de zero minuto.',
    'A diferença `fim - inicio` fornece a duração sem precisar converter horas e minutos.')

add(12, 'simples', '  comprimento, largura, profundidade, volume: real', '''  escreva("Comprimento (m): ")
  leia(comprimento)
  escreva("Largura (m): ")
  leia(largura)
  escreva("Profundidade (m): ")
  leia(profundidade)
  se (comprimento >= 0) e (largura >= 0) e (profundidade >= 0) entao
    volume <- comprimento * largura * profundidade
    escreval("Volume (m³): ", volume)
  senao
    escreval("As dimensões não podem ser negativas.")
  fimse''',
    'Calcule o volume de uma piscina retangular em metros cúbicos.',
    'Leia comprimento, largura e profundidade em metros e multiplique as três dimensões.',
    'Comprimento (m): 10\nLargura (m): 4\nProfundidade (m): 2\nVolume (m³): 80',
    'Se alguma dimensão for zero, o volume calculado é zero.',
    'A fórmula para um prisma retangular é comprimento × largura × profundidade.')

add(13, 'simples', '  distancia, tempo, velocidade: real', '''  escreva("Distância (km): ")
  leia(distancia)
  escreva("Tempo (h): ")
  leia(tempo)
  se tempo > 0 entao
    velocidade <- distancia / tempo
    escreval("Velocidade média (km/h): ", velocidade)
  senao
    escreval("O tempo deve ser positivo.")
  fimse''',
    'Encontre a velocidade média de uma corrida a partir de distância e tempo.',
    'Leia quilômetros percorridos e horas gastas. Divida distância por tempo apenas quando o tempo for positivo.',
    'Distância (km): 12\nTempo (h): 2\nVelocidade média (km/h): 6',
    'Tempo zero é inválido porque provocaria divisão por zero.',
    'A unidade km/h decorre das unidades escolhidas para as duas entradas.')

add(14, 'simples', '  orcamento, despesa, sobra: real', '''  escreva("Orçamento: ")
  leia(orcamento)
  escreva("Despesa: ")
  leia(despesa)
  sobra <- orcamento - despesa
  escreval("Saldo após a despesa: ", sobra)''',
    'Determine o saldo de um orçamento depois de uma despesa.',
    'Leia o valor disponível e o gasto e subtraia o segundo do primeiro.',
    'Orçamento: 100\nDespesa: 35\nSaldo após a despesa: 65',
    'Se a despesa exceder o orçamento, o saldo negativo indica quanto faltou.',
    'A subtração conserva o sinal e deixa evidente quando houve gasto acima do previsto.')

add(15, 'simples', '  celsius, fahrenheit: real', '''  escreva("Temperatura (°C): ")
  leia(celsius)
  fahrenheit <- celsius * 9 / 5 + 32
  escreval("Temperatura (°F): ", fahrenheit)''',
    'Converta uma temperatura de graus Celsius para Fahrenheit.',
    'Leia Celsius e aplique a fórmula `F = C × 9 / 5 + 32`.',
    'Temperatura (°C): 0\nTemperatura (°F): 32',
    'Para 100 °C, o resultado esperado é 212 °F.',
    'A variável `fahrenheit` guarda o resultado antes de mostrá-lo.')

add(16, 'simples', '  entrada, saida, noites: inteiro', '''  escreva("Dia de entrada: ")
  leia(entrada)
  escreva("Dia de saída: ")
  leia(saida)
  se (entrada >= 1) e (saida > entrada) e (saida <= 31) entao
    noites <- saida - entrada
    escreval("Noites: ", noites)
  senao
    escreval("Informe dias válidos do mesmo mês, com saída posterior.")
  fimse''',
    'Calcule quantas noites de hospedagem há entre dois dias do mesmo mês.',
    'Leia dia de entrada e dia de saída. A diferença é o número de noites quando a saída vem depois.',
    'Dia de entrada: 10\nDia de saída: 13\nNoites: 3',
    'Entrada no dia 10 e saída no dia 11 representam uma noite.',
    'A subtração exclui naturalmente o dia de saída da contagem de pernoites.')

add(17, 'simples', '  preco, total: real\n  quantidade: inteiro', '''  escreva("Preço por pedágio: ")
  leia(preco)
  escreva("Quantidade de praças: ")
  leia(quantidade)
  se quantidade >= 0 entao
    total <- preco * quantidade
    escreval("Custo total: ", total)
  senao
    escreval("Quantidade inválida.")
  fimse''',
    'Calcule o custo total de passar por várias praças de pedágio com a mesma tarifa.',
    'Leia a tarifa por praça e a quantidade de praças. Multiplique somente para quantidade não negativa.',
    'Preço por pedágio: 8\nQuantidade de praças: 3\nCusto total: 24',
    'Uma rota sem pedágios tem custo zero.',
    'O produto tarifa × quantidade representa a soma de tarifas iguais.')

add(18, 'simples', '  nota: real', '''  escreva("Nota de 0 a 10: ")
  leia(nota)
  se (nota < 0) ou (nota > 10) entao
    escreval("Nota inválida.")
  senao
    se nota >= 8 entao
      escreval("Nota pelo menos 8.")
    senao
      escreval("Nota abaixo de 8.")
    fimse
  fimse''',
    'Informe se uma nota válida alcança o limite de 8 pontos.',
    'Leia um valor de 0 a 10. Rejeite valores fora dessa faixa; depois compare com 8 de forma inclusiva.',
    'Nota de 0 a 10: 8\nNota pelo menos 8.',
    'A nota 7,9 fica abaixo de 8; a nota 11 é inválida.',
    'A primeira condição valida a entrada e a segunda avalia o limite solicitado.')

add(19, 'simples', '  litros, mililitros: real\n  garrafas: inteiro', '''  escreva("Volume desejado (litros): ")
  leia(litros)
  se litros >= 0 entao
    mililitros <- litros * 1000
    garrafas <- int(mililitros / 500)
    se garrafas * 500 < mililitros entao
      garrafas <- garrafas + 1
    fimse
    escreval("Garrafas de 500 ml necessárias: ", garrafas)
  senao
    escreval("Volume inválido.")
  fimse''',
    'Calcule o número mínimo de garrafas inteiras de 500 ml para atingir um volume em litros.',
    'Converta litros em mililitros, divida por 500 e arredonde para cima quando houver resto.',
    'Volume desejado (litros): 1.2\nGarrafas de 500 ml necessárias: 3',
    'Exatamente 1 litro precisa de duas garrafas; 1,01 litro precisa de três.',
    'O teste após a divisão adiciona uma garrafa apenas quando a capacidade calculada ainda não alcança o volume.')

add(20, 'simples', '  ganhas, perdidas, total: inteiro', '''  escreva("Partidas ganhas: ")
  leia(ganhas)
  escreva("Partidas perdidas: ")
  leia(perdidas)
  se (ganhas >= 0) e (perdidas >= 0) entao
    total <- ganhas + perdidas
    escreval("Total de partidas: ", total)
  senao
    escreval("Quantidades inválidas.")
  fimse''',
    'Calcule quantas partidas foram jogadas somando vitórias e derrotas.',
    'Leia duas quantidades inteiras não negativas e apresente a soma.',
    'Partidas ganhas: 4\nPartidas perdidas: 2\nTotal de partidas: 6',
    'Com zero vitórias e zero derrotas, o total é zero.',
    'O total é a soma das duas categorias informadas no enunciado.')

add(21, 'simples', '  custoTotal, porPessoa: real\n  integrantes: inteiro', '''  escreva("Custo total: ")
  leia(custoTotal)
  escreva("Integrantes: ")
  leia(integrantes)
  se integrantes > 0 entao
    porPessoa <- custoTotal / integrantes
    escreval("Custo por pessoa: ", porPessoa)
  senao
    escreval("É necessário ao menos um integrante.")
  fimse''',
    'Divida igualmente um custo de viagem entre os integrantes da família.',
    'Leia custo total e número de integrantes. Divida pelo número apenas se ele for positivo.',
    'Custo total: 300\nIntegrantes: 4\nCusto por pessoa: 75',
    'Com um integrante, o custo individual é igual ao custo total.',
    'A validação impede divisão por zero; a divisão calcula a cota igualitária.')

add(22, 'simples', '  primeira, segunda: real', '''  escreva("Altura da primeira onda: ")
  leia(primeira)
  escreva("Altura da segunda onda: ")
  leia(segunda)
  se primeira > segunda entao
    escreval("Maior altura: ", primeira)
  senao
    escreval("Maior altura: ", segunda)
  fimse''',
    'Apresente a maior altura entre duas ondas medidas.',
    'Leia as duas alturas na mesma unidade e compare os valores.',
    'Altura da primeira onda: 1.2\nAltura da segunda onda: 1.7\nMaior altura: 1.7',
    'Se as alturas forem iguais, o valor comum será exibido.',
    'A seleção escolhe a primeira altura somente quando ela é estritamente maior.')

add(23, 'simples', '  distancia, taxa, calorias: real', '''  escreva("Distância (km): ")
  leia(distancia)
  escreva("Calorias estimadas por km: ")
  leia(taxa)
  calorias <- distancia * taxa
  escreval("Calorias estimadas: ", calorias)''',
    'Estime calorias gastas em um passeio de bicicleta usando uma taxa fixa por quilômetro.',
    'Leia distância e taxa de calorias por quilômetro; multiplique as duas entradas.',
    'Distância (km): 12\nCalorias estimadas por km: 30\nCalorias estimadas: 360',
    'Para distância zero, a estimativa é zero.',
    'A taxa é configurável; o programa não afirma que a estimativa substitui medição fisiológica.')

add(24, 'simples', '  litros, mililitros: real', '''  escreva("Capacidade (litros): ")
  leia(litros)
  mililitros <- litros * 1000
  escreval("Capacidade (ml): ", mililitros)''',
    'Converta a capacidade de um recipiente de litros para mililitros.',
    'Leia um valor em litros e multiplique por 1000.',
    'Capacidade (litros): 2.5\nCapacidade (ml): 2500',
    'Meio litro corresponde a 500 ml.',
    'A relação entre as unidades é constante e não depende do tamanho do recipiente.')

add(25, 'simples', '  preco, total: real\n  meia: logico', '''  escreva("Preço integral: ")
  leia(preco)
  escreva("Tem direito à meia-entrada (verdadeiro/falso)? ")
  leia(meia)
  se meia entao
    total <- preco / 2
  senao
    total <- preco
  fimse
  escreval("Preço a pagar: ", total)''',
    'Calcule o valor de um ingresso a partir de uma condição booleana de meia-entrada.',
    'Leia o preço integral e uma variável lógica. Quando a condição for verdadeira, cobre metade; caso contrário, mantenha o preço.',
    'Preço integral: 40\nTem direito à meia-entrada (verdadeiro/falso)? verdadeiro\nPreço a pagar: 20',
    'Se `meia` for `falso`, o preço final é o integral.',
    'O `se` escolhe qual valor atribuir antes da única linha de saída.')

add(26, 'simples', '  probabilidade, limite: real', '''  escreva("Probabilidade de chuva (%): ")
  leia(probabilidade)
  escreva("Limite para levar guarda-chuva (%): ")
  leia(limite)
  se (probabilidade < 0) ou (probabilidade > 100) ou (limite < 0) ou (limite > 100) entao
    escreval("Percentual inválido.")
  senao
    se probabilidade >= limite entao
      escreval("Leve guarda-chuva.")
    senao
      escreval("Guarda-chuva opcional.")
    fimse
  fimse''',
    'Decida se deve levar guarda-chuva comparando a chance de chuva com um limite escolhido.',
    'Leia dois percentuais de 0 a 100. Recomende guarda-chuva quando a probabilidade alcançar ou ultrapassar o limite.',
    'Probabilidade de chuva (%): 70\nLimite para levar guarda-chuva (%): 60\nLeve guarda-chuva.',
    'Probabilidade igual ao limite também aciona a recomendação.',
    'A comparação inclusiva permite que o próprio aluno escolha o ponto de corte.')

add(27, 'simples', '  primeira, segunda, terceira, media: real', '''  escreva("Nota 1: ")
  leia(primeira)
  escreva("Nota 2: ")
  leia(segunda)
  escreva("Nota 3: ")
  leia(terceira)
  media <- (primeira + segunda + terceira) / 3
  escreval("Média: ", media)''',
    'Calcule a média aritmética de três notas.',
    'Leia três valores reais, some-os e divida por três.',
    'Nota 1: 6\nNota 2: 8\nNota 3: 10\nMédia: 8',
    'Três notas iguais produzem média igual a cada nota.',
    'Os parênteses garantem que a divisão seja aplicada à soma completa.')

add(28, 'simples', '  i: inteiro', '''  para i de 1 ate 5 faca
    escreval("Lembrete ", i, ": beber água")
  fimpara''',
    'Mostre cinco lembretes numerados de hidratação.',
    'Use um laço `para` começando em 1 e terminando em 5. Cada volta imprime um número e a mensagem.',
    'Lembrete 1: beber água\nLembrete 2: beber água\nLembrete 3: beber água\nLembrete 4: beber água\nLembrete 5: beber água',
    'O laço deve imprimir exatamente cinco linhas, sem uma sexta.',
    'A variável de controle `i` já representa o número que aparece em cada lembrete.')

add(29, 'simples', '  custo, disponivel: real', '''  escreva("Custo previsto: ")
  leia(custo)
  escreva("Dinheiro disponível: ")
  leia(disponivel)
  se custo <= disponivel entao
    escreval("Viagem dentro do orçamento.")
  senao
    escreval("Faltam: ", custo - disponivel)
  fimse''',
    'Verifique se o dinheiro disponível é suficiente para uma viagem de custo previsto.',
    'Leia custo e saldo. Se o custo couber no saldo, informe isso; caso contrário, mostre quanto falta.',
    'Custo previsto: 200\nDinheiro disponível: 150\nFaltam: 50',
    'Se custo e saldo forem iguais, a viagem cabe exatamente no orçamento.',
    'A subtração no caso insuficiente quantifica a diferença entre custo e disponibilidade.')

add(30, 'simples', '  cidade, mensagem: caractere', '''  escreva("Cidade: ")
  leia(cidade)
  escreva("Mensagem: ")
  leia(mensagem)
  escreval("Cartão-postal de ", cidade, ": ", mensagem)''',
    'Monte uma dedicatória de cartão-postal usando cidade e mensagem informadas.',
    'Leia dois textos e combine-os em uma única linha de saída.',
    'Cidade: Recife\nMensagem: Saudades de você!\nCartão-postal de Recife: Saudades de você!',
    'A mensagem pode conter espaços; preserve seu conteúdo ao exibi-la.',
    '`escreval` junta os trechos na ordem desejada sem realizar operações numéricas.')

add(31, 'simples', '  primeira, segunda, terceira, total, media: real', '''  escreva("Despesa 1: ")
  leia(primeira)
  escreva("Despesa 2: ")
  leia(segunda)
  escreva("Despesa 3: ")
  leia(terceira)
  total <- primeira + segunda + terceira
  media <- total / 3
  escreval("Total: ", total)
  escreval("Média: ", media)''',
    'Resuma três despesas mostrando o gasto total e a média por despesa.',
    'Leia três valores. Some-os uma vez; use esse total para calcular a média aritmética.',
    'Despesa 1: 10\nDespesa 2: 20\nDespesa 3: 30\nTotal: 60\nMédia: 20',
    'Se as três despesas forem zero, total e média também serão zero.',
    'Reutilizar a variável `total` evita somar os mesmos valores duas vezes.')

CATALOG.parent.mkdir(parents=True, exist_ok=True)
CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catalog contains {len(entries)} reviewed challenge solutions")

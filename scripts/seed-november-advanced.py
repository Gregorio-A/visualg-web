#!/usr/bin/env python3
"""Curated advanced November exercises based on the challenge CSV."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'11-{day:02d}'
    prompt = rows[date]['avancado_enunciado']
    code = f'algoritmo "Desafio11{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/avancado'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  tamanho: vetor[1..8] de real
  categoria: vetor[1..8] de inteiro
  soma: vetor[1..3] de real
  i, tipo: inteiro
  total: real''', '''  para i de 1 ate 3 faca
    soma[i] <- 0
  fimpara
  total <- 0
  para i de 1 ate 8 faca
    escreva("Extensão do arquivo ", i, " (1 txt, 2 jpg, 3 mp4): ")
    leia(tipo)
    escreva("Tamanho em MB: ")
    leia(tamanho[i])
    se (tipo >= 1) e (tipo <= 3) e (tamanho[i] >= 0) entao
      categoria[i] <- tipo
      soma[tipo] <- soma[tipo] + tamanho[i]
      total <- total + tamanho[i]
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Extensão ", i, ": ", soma[i], " MB")
  fimpara
  escreval("Ocupação total: ", total, " MB")''',
    'Agrupe oito arquivos por extensão TXT, JPG ou MP4, com tamanhos em MB. Some a ocupação por extensão e no total.',
    'TXT 2 MB e TXT 3 MB → grupo TXT ocupa 5 MB',
    'Extensão desconhecida e tamanho negativo não entram nas somas.',
    'O código da extensão funciona como índice do acumulador de categoria.',
    ['Mapeie extensão para 1–3.', 'Some tamanho por grupo.', 'Some também o total.'])

add(2, '''  numero, baseEntrada, baseSaida, resto, digito, valor, posicao, acumulado: inteiro
  textoEntrada, resultado, caractereAtual: caractere''', '''  escreva("Base de entrada (2, 10 ou 16): ")
  leia(baseEntrada)
  escreva("Número sem sinal: ")
  leia(textoEntrada)
  escreva("Base de saída (2, 10 ou 16): ")
  leia(baseSaida)
  se ((baseEntrada <> 2) e (baseEntrada <> 10) e (baseEntrada <> 16)) ou ((baseSaida <> 2) e (baseSaida <> 10) e (baseSaida <> 16)) entao
    escreval("Base inválida")
  senao
    acumulado <- 0
    valor <- 1
    para posicao de 1 ate compr(textoEntrada) faca
      caractereAtual <- maiusc(copia(textoEntrada, posicao, 1))
      digito <- asc(caractereAtual) - 48
      se (asc(caractereAtual) >= 65) e (asc(caractereAtual) <= 70) entao
        digito <- asc(caractereAtual) - 55
      fimse
      se (digito < 0) ou (digito >= baseEntrada) entao
        valor <- 0
      senao
        acumulado <- acumulado * baseEntrada + digito
      fimse
    fimpara
    se valor = 0 entao
      escreval("Dígito inválido para a base")
    senao
      numero <- acumulado
      resultado <- ""
      se numero = 0 entao
        resultado <- "0"
      fimse
      enquanto numero > 0 faca
        resto <- numero mod baseSaida
        se resto < 10 entao
          caractereAtual <- carac(resto + 48)
        senao
          caractereAtual <- carac(resto + 55)
        fimse
        resultado <- caractereAtual + resultado
        numero <- numero div baseSaida
      fimenquanto
      escreval("Resultado: ", resultado)
    fimse
  fimse''',
    'Converta texto numérico não negativo entre bases 2, 10 e 16. Primeiro interprete cada dígito, validando-o; depois divida sucessivamente pela base de saída.',
    '1010 em base 2 → A em base 16; FF em base 16 → 255 em base 10',
    'Entrada vazia deve ser evitada. Valores devem caber no tipo inteiro do interpretador.',
    'Acumulação posicional transforma entrada em decimal; restos sucessivos montam o texto da base desejada.',
    ['Converta cada caractere em dígito.', 'Valide dígito < base de entrada.', 'Monte a saída com divisões e restos.'])

add(3, '''  a, b, naoA, eLogico, ouLogico, resultado: logico''', '''  escreva("Entrada A (verdadeiro/falso): ")
  leia(a)
  escreva("Entrada B (verdadeiro/falso): ")
  leia(b)
  naoA <- nao a
  eLogico <- a e b
  ouLogico <- a ou b
  resultado <- (a e b) ou (nao a)
  escreval("NOT A: ", naoA)
  escreval("A AND B: ", eLogico)
  escreval("A OR B: ", ouLogico)
  escreval("(A AND B) OR (NOT A): ", resultado)''',
    'Leia duas entradas lógicas e calcule NOT A, A AND B, A OR B e a expressão composta (A AND B) OR (NOT A).',
    'A=falso, B=verdadeiro → expressão composta verdadeira',
    'Use entradas lógicas válidas, verdadeiro ou falso.',
    'A expressão composta combina os resultados das portas AND e NOT com OR.',
    ['Calcule NOT A.', 'Calcule A AND B.', 'Combine com OR.'])

add(4, '''  r1, r2, serie, paralelo: real''', '''  escreva("Resistor 1 em ohms: ")
  leia(r1)
  escreva("Resistor 2 em ohms: ")
  leia(r2)
  se (r1 <= 0) ou (r2 <= 0) entao
    escreval("Resistências devem ser positivas")
  senao
    serie <- r1 + r2
    paralelo <- r1 * r2 / (r1 + r2)
    escreval("Equivalente em série: ", serie, " ohms")
    escreval("Equivalente em paralelo: ", paralelo, " ohms")
  fimse''',
    'Para dois resistores positivos, série soma resistências e paralelo usa R1×R2/(R1+R2).',
    'Dois resistores de 10 ohms → série 20 ohms, paralelo 5 ohms',
    'Resistência zero ou negativa é recusada neste modelo.',
    'As duas fórmulas representam topologias elétricas diferentes para os mesmos componentes.',
    ['Leia duas resistências.', 'Some para série.', 'Use produto sobre soma para paralelo.'])

add(5, '''  led: vetor[1..4, 1..8] de inteiro
  canal, instante: inteiro''', '''  para instante de 1 ate 8 faca
    para canal de 1 ate 4 faca
      led[canal, instante] <- 0
      se (instante + canal) mod 2 = 0 entao
        led[canal, instante] <- 1
      fimse
      se instante mod 4 = 0 entao
        led[canal, instante] <- 1
      fimse
    fimpara
  fimpara
  para canal de 1 ate 4 faca
    escreva("Canal ", canal, ": ")
    para instante de 1 ate 8 faca
      escreva(led[canal, instante], " ")
    fimpara
    escreval("")
  fimpara''',
    'Gere oito instantes para quatro canais de LED. Acenda em padrão alternado pela paridade canal+instante; a cada quarto instante, acenda todos.',
    'Instante 4 → os quatro canais acesos',
    'A matriz contém apenas 0 (apagado) e 1 (aceso).',
    'O padrão base alterna por paridade e o pulso coletivo sobrescreve instantes 4 e 8.',
    ['Use matriz canal×instante.', 'Teste paridade.', 'Sobrescreva múltiplos de quatro.'])

add(6, '''  brilho, i: inteiro
  leitura, minimo, maximo, margem: real''', '''  escreva("Luminosidade mínima e máxima desejadas: ")
  leia(minimo, maximo)
  escreva("Margem morta: ")
  leia(margem)
  brilho <- 50
  se (minimo > maximo) ou (margem < 0) entao
    escreval("Parâmetros inválidos")
  senao
    para i de 1 ate 8 faca
      escreva("Luminosidade ambiente ", i, ": ")
      leia(leitura)
      se leitura < minimo - margem entao
        brilho <- brilho + 10
      fimse
      se leitura > maximo + margem entao
        brilho <- brilho - 10
      fimse
      se brilho > 100 entao
        brilho <- 100
      fimse
      se brilho < 0 entao
        brilho <- 0
      fimse
      escreval("Brilho ajustado: ", brilho)
    fimpara
  fimse''',
    'Comece com brilho 50. Em oito leituras, aumente 10 abaixo de mínimo−margem, reduza 10 acima de máximo+margem e mantenha dentro da faixa morta.',
    'Mínimo 30, margem 5, leitura 20 → brilho passa de 50 a 60',
    'Brilho fica limitado a 0–100.',
    'A margem evita ajustes por pequenas oscilações de luz.',
    ['Compare com faixas ampliadas pela margem.', 'Ajuste em passos de dez.', 'Limite a escala.'])

add(7, '''  tamanho: vetor[1..3] de real
  i, rodada, ativas: inteiro
  banda, cota, gasto: real''', '''  escreva("Banda total por rodada (MB): ")
  leia(banda)
  para i de 1 ate 3 faca
    escreva("Tamanho restante da tarefa ", i, " (MB): ")
    leia(tamanho[i])
  fimpara
  se banda <= 0 entao
    escreval("Banda inválida")
  senao
    rodada <- 0
    ativas <- 1
    enquanto (ativas > 0) e (rodada < 1000) faca
      ativas <- 0
      para i de 1 ate 3 faca
        se tamanho[i] > 0 entao
          ativas <- ativas + 1
        fimse
      fimpara
      se ativas > 0 entao
        rodada <- rodada + 1
        cota <- banda / ativas
        para i de 1 ate 3 faca
          se tamanho[i] > 0 entao
            gasto <- cota
            se gasto > tamanho[i] entao
              gasto <- tamanho[i]
            fimse
            tamanho[i] <- tamanho[i] - gasto
          fimse
        fimpara
        escreval("Rodada ", rodada, ": restantes ", tamanho[1], ", ", tamanho[2], ", ", tamanho[3], " MB")
      fimse
    fimenquanto
    escreval("Rodadas necessárias: ", rodada)
  fimse''',
    'Três transferências compartilham banda por rodadas. Divida igualmente entre tarefas ainda ativas em cada rodada e reporte quando todas terminarem.',
    'Banda 6 MB, três tarefas ativas → cota 2 MB na primeira rodada',
    'Mil rodadas são o limite didático de simulação.',
    'A contagem de ativas redefine a cota quando uma tarefa termina.',
    ['Conte tarefas com tamanho positivo.', 'Divida banda por essa contagem.', 'Reduza cada tarefa até zero.'])

add(8, '''  paginas, prioridade, estado: vetor[1..5] de inteiro
  nome: vetor[1..5] de caractere
  i, j, escolhido, total: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Trabalho ", i, ": ")
    leia(nome[i])
    escreva("Páginas: ")
    leia(paginas[i])
    escreva("Prioridade (1 mais alta): ")
    leia(prioridade[i])
    estado[i] <- 0
  fimpara
  total <- 0
  para i de 1 ate 5 faca
    escolhido <- 0
    para j de 1 ate 5 faca
      se (estado[j] = 0) e (paginas[j] >= 0) entao
        se escolhido = 0 entao
          escolhido <- j
        senao
          se prioridade[j] < prioridade[escolhido] entao
            escolhido <- j
          fimse
        fimse
      fimse
    fimpara
    se escolhido > 0 entao
      estado[escolhido] <- 1
      total <- total + paginas[escolhido]
      escreval("Concluído: ", nome[escolhido], " (", paginas[escolhido], " página(s))")
    fimse
  fimpara
  escreval("Páginas impressas: ", total)''',
    'Cinco trabalhos possuem nome, páginas e prioridade. Imprima primeiro menor número de prioridade; empate segue cadastro. Marque cada trabalho concluído.',
    'A prioridade 1 imprime antes da prioridade 3',
    'Páginas negativas invalidam o trabalho.',
    'A cada passo, a fila escolhe o melhor trabalho ainda pendente.',
    ['Guarde estado de conclusão.', 'Procure menor prioridade pendente.', 'Marque e some páginas.'])

add(9, '''  obstaculo, entregue: vetor[1..5, 1..5] de inteiro
  linha, coluna, novaL, novaC, i, direcao, entregas: inteiro''', '''  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      obstaculo[linha, coluna] <- 0
      entregue[linha, coluna] <- 0
    fimpara
  fimpara
  obstaculo[2, 2] <- 1
  obstaculo[4, 4] <- 1
  linha <- 1
  coluna <- 1
  entregas <- 0
  para i de 1 ate 12 faca
    escreva("Direção (1 cima, 2 direita, 3 baixo, 4 esquerda): ")
    leia(direcao)
    novaL <- linha
    novaC <- coluna
    escolha direcao
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
      se obstaculo[novaL, novaC] = 0 entao
        linha <- novaL
        coluna <- novaC
      fimse
    fimse
    se ((linha = 1) e (coluna = 5)) ou ((linha = 5) e (coluna = 1)) entao
      se entregue[linha, coluna] = 0 entao
        entregue[linha, coluna] <- 1
        entregas <- entregas + 1
      fimse
    fimse
    escreval("Robô em (", linha, ",", coluna, "); entregas ", entregas)
  fimpara''',
    'Robô percorre grade 5×5 por doze comandos. Obstáculos em (2,2) e (4,4); pontos de entrega em (1,5) e (5,1) contam somente na primeira visita.',
    'De (1,1), quatro movimentos à direita alcançam (1,5) e registram uma entrega',
    'Tentativa de sair da grade ou atravessar obstáculo não move o robô.',
    'Uma matriz de estado impede contar o mesmo destino novamente.',
    ['Calcule nova célula.', 'Valide limites e obstáculo.', 'Marque destino atendido.'])

add(10, '''  x, y: vetor[1..5] de real
  i: inteiro
  dx, dy, distancia, total: real''', '''  para i de 1 ate 5 faca
    escreva("Ponto ", i, " X e Y: ")
    leia(x[i], y[i])
  fimpara
  total <- 0
  para i de 2 ate 5 faca
    dx <- x[i] - x[i - 1]
    dy <- y[i] - y[i - 1]
    distancia <- raizq(dx * dx + dy * dy)
    total <- total + distancia
    escreval("Trecho ", i - 1, "–", i, ": ", distancia)
  fimpara
  escreval("Comprimento total da rota: ", total)''',
    'Cadastre cinco pontos no plano. Use distância euclidiana entre pontos consecutivos e some os quatro trechos.',
    '(0,0) para (3,4) → trecho de 5 unidades',
    'Pontos coincidentes produzem trecho de comprimento zero.',
    'Pitágoras calcula cada trecho a partir das diferenças em X e Y.',
    ['Subtraia coordenadas.', 'Some quadrados.', 'Use raiz quadrada e acumule.'])

add(11, '''  carga, consumo: vetor[1..3] de inteiro
  i, rodada, primeiro: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Carga do dispositivo ", i, " (0 a 100): ")
    leia(carga[i])
    escreva("Consumo por rodada: ")
    leia(consumo[i])
  fimpara
  primeiro <- 0
  para rodada de 1 ate 10 faca
    para i de 1 ate 3 faca
      se carga[i] > 0 entao
        carga[i] <- carga[i] - consumo[i]
        se carga[i] <= 0 entao
          carga[i] <- 0
          se primeiro = 0 entao
            primeiro <- i
            escreval("Primeiro a esgotar: dispositivo ", i, " na rodada ", rodada)
          fimse
        fimse
      fimse
      escreval("Dispositivo ", i, ": ", carga[i], "%")
    fimpara
  fimpara
  se primeiro = 0 entao
    escreval("Nenhum dispositivo esgotou em dez rodadas")
  fimse''',
    'Três dispositivos têm carga e consumo fixo próprios. Simule dez rodadas, limite cargas a zero e identifique o primeiro que esgota.',
    'Cargas 20 e 30, consumos 10 e 5 → primeiro esgota na rodada 2',
    'Consumos devem ser não negativos. Empate na rodada privilegia menor índice.',
    'Cada dispositivo mantém seu próprio saldo entre rodadas.',
    ['Guarde carga e consumo por índice.', 'Subtraia a cada rodada.', 'Registre o primeiro saldo que chega a zero.'])

add(12, '''  nome: vetor[1..5] de caractere
  memoria: vetor[1..5] de inteiro
  i, acao, usado, capacidade, pedido, posicao: inteiro
  busca: caractere''', '''  escreva("Memória física total: ")
  leia(capacidade)
  usado <- 0
  para i de 1 ate 5 faca
    nome[i] <- ""
    memoria[i] <- 0
  fimpara
  escreva("Ação (1 iniciar, 2 encerrar, 3 consultar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      escreva("Processo: ")
      leia(busca)
      escreva("Memória solicitada: ")
      leia(pedido)
      posicao <- 0
      para i de 1 ate 5 faca
        se nome[i] = busca entao
          posicao <- -1
        fimse
      fimpara
      se posicao = 0 entao
        para i de 5 ate 1 passo -1 faca
          se nome[i] = "" entao
            posicao <- i
          fimse
        fimpara
      fimse
      se (posicao > 0) e (pedido > 0) e (usado + pedido <= capacidade) entao
        nome[posicao] <- busca
        memoria[posicao] <- pedido
        usado <- usado + pedido
        escreval("Processo iniciado")
      senao
        escreval("Alocação recusada")
      fimse
    senao
      se acao = 2 entao
        escreva("Processo a encerrar: ")
        leia(busca)
        posicao <- 0
        para i de 1 ate 5 faca
          se nome[i] = busca entao
            posicao <- i
          fimse
        fimpara
        se posicao > 0 entao
          usado <- usado - memoria[posicao]
          nome[posicao] <- ""
          memoria[posicao] <- 0
        fimse
      senao
        se acao = 3 entao
          escreval("Memória usada: ", usado, "; livre: ", capacidade - usado)
        fimse
      fimse
    fimse
    escreva("Ação (1 iniciar, 2 encerrar, 3 consultar, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Até cinco processos podem reservar memória física. Nome duplicado, memória não positiva, catálogo cheio ou capacidade insuficiente recusam a alocação.',
    'Total 100; processo A usa 30 → 70 livres; ao encerrar A volta a 100',
    'Encerrar processo desconhecido não altera a memória usada.',
    'Cada processo guarda a quantidade exata para que sua liberação devolva o valor correto.',
    ['Associe nome ao tamanho.', 'Valide antes de alocar.', 'Subtraia o mesmo tamanho ao encerrar.'])

add(13, '''  temperatura: vetor[1..10] de real
  i, velocidade, anterior, mudancas: inteiro''', '''  velocidade <- 0
  mudancas <- 0
  para i de 1 ate 10 faca
    escreva("Temperatura ", i, " (°C): ")
    leia(temperatura[i])
    anterior <- velocidade
    se temperatura[i] < 40 entao
      velocidade <- 20
    senao
      se temperatura[i] < 60 entao
        velocidade <- 50
      senao
        velocidade <- 100
      fimse
    fimse
    se velocidade <> anterior entao
      mudancas <- mudancas + 1
      escreval("Ventoinha mudou de ", anterior, "% para ", velocidade, "%")
    fimse
  fimpara
  escreval("Mudanças de velocidade: ", mudancas)''',
    'Use curva de 20% abaixo de 40 °C, 50% de 40 até menos de 60 °C e 100% a partir de 60 °C. Registre mudanças ao longo de dez leituras.',
    'Temperaturas 35,45,65 °C → 20%,50%,100%',
    'Leitura exatamente 40 entra na faixa de 50%; 60 entra em 100%.',
    'A faixa determina a nova velocidade; compará-la à anterior detecta transições.',
    ['Defina três faixas.', 'Calcule velocidade de cada leitura.', 'Conte mudanças.'])

add(14, '''  nome: vetor[1..8] de caractere
  categoria: vetor[1..8] de inteiro
  contagem: vetor[1..3] de inteiro
  i, j, repetidos: inteiro''', '''  para i de 1 ate 3 faca
    contagem[i] <- 0
  fimpara
  repetidos <- 0
  para i de 1 ate 8 faca
    escreva("Nome do arquivo ", i, ": ")
    leia(nome[i])
    escreva("Extensão (1 txt, 2 jpg, 3 mp4): ")
    leia(categoria[i])
    se (categoria[i] >= 1) e (categoria[i] <= 3) entao
      contagem[categoria[i]] <- contagem[categoria[i]] + 1
    fimse
    para j de 1 ate i - 1 faca
      se minusc(nome[i]) = minusc(nome[j]) entao
        repetidos <- repetidos + 1
        escreval("Nome repetido: ", nome[i])
        interrompa
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    escreval("Extensão ", i, ": ", contagem[i], " arquivo(s)")
  fimpara
  escreval("Entradas com nome repetido: ", repetidos)''',
    'Cadastre oito arquivos com nome e extensão codificada. Conte por extensão e sinalize cada entrada cujo nome já apareceu, ignorando caixa.',
    'a.txt e A.TXT cadastrados com mesmo nome textual → segunda entrada repetida',
    'A comparação de nomes usa exatamente o campo digitado; inclua a extensão nele se quiser distingui-la.',
    'Um laço interno procura nomes anteriores e evita contar a mesma entrada repetida mais de uma vez.',
    ['Conte códigos de extensão.', 'Compare cada nome aos anteriores.', 'Pare após achar duplicata.'])

add(15, '''  usuario, codigo: vetor[1..5] de caractere
  i, j, n, duplicado, achado, tentativa: inteiro
  busca, digitado: caractere''', '''  n <- 0
  para i de 1 ate 5 faca
    escreva("Nome do novo usuário: ")
    leia(busca)
    escreva("Código de acesso: ")
    leia(digitado)
    duplicado <- 0
    para j de 1 ate n faca
      se (usuario[j] = busca) ou (codigo[j] = digitado) entao
        duplicado <- 1
      fimse
    fimpara
    se duplicado = 0 entao
      n <- n + 1
      usuario[n] <- busca
      codigo[n] <- digitado
      escreval("Usuário cadastrado")
    senao
      escreval("Nome ou código duplicado")
    fimse
  fimpara
  para tentativa de 1 ate 3 faca
    escreva("Usuário para login: ")
    leia(busca)
    escreva("Código: ")
    leia(digitado)
    achado <- 0
    para i de 1 ate n faca
      se (usuario[i] = busca) e (codigo[i] = digitado) entao
        achado <- 1
      fimse
    fimpara
    se achado = 1 entao
      escreval("Acesso autorizado")
    senao
      escreval("Acesso negado")
    fimse
  fimpara''',
    'Até cinco cadastros: nomes e códigos de acesso devem ser únicos. Depois, três tentativas de login exigem que nome e código coincidam no mesmo registro.',
    'Ana/123 cadastrado; Ana/123 autoriza, Ana/999 nega',
    'Tentativa de cadastrar nome ou código duplicado não consome uma posição de cadastro.',
    'Vetores paralelos preservam a associação nome–código; a busca de login confere ambos no mesmo índice.',
    ['Procure duplicatas antes de inserir.', 'Guarde nome e código juntos.', 'Valide o par completo no login.'])

add(16, '''  larguraAntiga, alturaAntiga, larguraNova, alturaNova: real
  x, y, largura, altura, escalaX, escalaY: real''', '''  escreva("Resolução antiga, largura e altura: ")
  leia(larguraAntiga, alturaAntiga)
  escreva("Nova resolução, largura e altura: ")
  leia(larguraNova, alturaNova)
  escreva("Componente original: X, Y, largura, altura: ")
  leia(x, y, largura, altura)
  se (larguraAntiga <= 0) ou (alturaAntiga <= 0) ou (larguraNova <= 0) ou (alturaNova <= 0) entao
    escreval("Resolução inválida")
  senao
    escalaX <- larguraNova / larguraAntiga
    escalaY <- alturaNova / alturaAntiga
    escreval("Nova posição: (", x * escalaX, ",", y * escalaY, ")")
    escreval("Novo tamanho: ", largura * escalaX, " × ", altura * escalaY)
  fimse''',
    'Reescale posição e tamanho de um componente de uma resolução para outra, usando fatores horizontal e vertical independentes.',
    '800×600 para 1600×1200; componente (10,20) de 100×50 → (20,40) de 200×100',
    'Resolução de dimensão zero é inválida.',
    'Cada coordenada horizontal usa escala X e cada vertical usa escala Y.',
    ['Calcule fatores de escala.', 'Multiplique X e largura por escala X.', 'Multiplique Y e altura por escala Y.'])

add(17, '''  r, g, b: vetor[1..2] de inteiro
  i, canal, alto, baixo, resto: inteiro
  hex, paleta: caractere
  luminosidade: vetor[1..2] de real''', '''  paleta <- "0123456789ABCDEF"
  para i de 1 ate 2 faca
    escreva("Amostra ", i, ": R, G, B (0 a 255): ")
    leia(r[i], g[i], b[i])
    hex <- "#"
    para canal de 1 ate 3 faca
      escolha canal
        caso 1
          resto <- r[i]
        caso 2
          resto <- g[i]
        caso 3
          resto <- b[i]
      fimescolha
      alto <- resto div 16 + 1
      baixo <- resto mod 16 + 1
      hex <- hex + copia(paleta, alto, 1) + copia(paleta, baixo, 1)
    fimpara
    luminosidade[i] <- 0.2126 * r[i] + 0.7152 * g[i] + 0.0722 * b[i]
    escreval("Hexadecimal: ", hex, "; luminosidade estimada: ", luminosidade[i])
  fimpara
  se luminosidade[1] > luminosidade[2] entao
    escreval("Amostra 1 mais luminosa")
  senao
    se luminosidade[2] > luminosidade[1] entao
      escreval("Amostra 2 mais luminosa")
    senao
      escreval("Luminosidades iguais")
    fimse
  fimse''',
    'Leia duas amostras RGB inteiras de 0 a 255. Converta cada canal em dois dígitos hexadecimais e estime luminosidade por 0,2126R+0,7152G+0,0722B.',
    'RGB (255,0,0) → #FF0000; luminosidade estimada 54,213',
    'Canais fora de 0–255 precisam ser corrigidos antes da conversão.',
    'Quociente e resto por 16 formam os dois dígitos de cada canal.',
    ['Separe cada canal em partes de 16.', 'Use uma tabela de dígitos hexadecimais.', 'Compare luminosidades ponderadas.'])

add(18, '''  categoria: vetor[1..12] de inteiro
  contagem: vetor[1..3] de inteiro
  i, atual, maior, inicioAtual, inicioMaior: inteiro''', '''  para i de 1 ate 3 faca
    contagem[i] <- 0
  fimpara
  atual <- 0
  maior <- 0
  para i de 1 ate 12 faca
    escreva("Log ", i, " (1 info, 2 aviso, 3 erro): ")
    leia(categoria[i])
    se (categoria[i] >= 1) e (categoria[i] <= 3) entao
      contagem[categoria[i]] <- contagem[categoria[i]] + 1
    fimse
    se categoria[i] = 3 entao
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
  para i de 1 ate 3 faca
    escreval("Categoria ", i, ": ", contagem[i])
  fimpara
  se maior > 0 entao
    escreval("Maior sequência de erros: ", maior, " logs, de ", inicioMaior, " a ", inicioMaior + maior - 1)
  fimse''',
    'Leia doze logs classificados em informação, aviso ou erro. Conte cada categoria e encontre o maior trecho consecutivo de erros.',
    '3,3,1,3 → dois erros seguidos no primeiro trecho',
    'Código desconhecido não entra nas contagens e interrompe sequência de erros.',
    'O máximo preserva início e tamanho do trecho de erros mais longo.',
    ['Conte por categoria.', 'Acompanhe sequência atual de erros.', 'Guarde a maior.'])

add(19, '''  nome: vetor[1..6] de caractere
  pai: vetor[1..6] de inteiro
  i, j, k: inteiro''', '''  para i de 1 ate 6 faca
    escreva("Pasta ", i, ": ")
    leia(nome[i])
    escreva("Índice da pasta pai (0 raiz): ")
    leia(pai[i])
  fimpara
  para i de 1 ate 6 faca
    se pai[i] = 0 entao
      escreval(nome[i])
      para j de 1 ate 6 faca
        se pai[j] = i entao
          escreval("  └ ", nome[j])
          para k de 1 ate 6 faca
            se pai[k] = j entao
              escreval("    └ ", nome[k])
            fimse
          fimpara
        fimse
      fimpara
    fimse
  fimpara''',
    'Cadastre seis pastas com índice de pai. Zero marca raiz. Mostre árvore textual de até três níveis: raiz, filho e neto.',
    'Pasta 1 raiz; pasta 2 tem pai 1 → pasta 2 aparece indentada sob pasta 1',
    'Relações cíclicas ou profundidade maior que três ficam fora do modelo definido.',
    'Laços aninhados encontram filhos e netos pelo índice do pai.',
    ['Guarde pai por pasta.', 'Imprima raízes.', 'Procure filhos e netos com indentação.'])

add(20, '''  volume, mudo, solo, salvo: vetor[1..3] de inteiro
  i, acao, canal, valor, soma: inteiro''', '''  para i de 1 ate 3 faca
    volume[i] <- 50
    mudo[i] <- 0
    solo[i] <- 0
    salvo[i] <- 50
  fimpara
  escreva("Ação (1 ajustar, 2 mudo, 3 solo, 4 salvar, 5 restaurar, 6 ouvir, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao >= 1) e (acao <= 3) entao
      escreva("Canal (1 a 3): ")
      leia(canal)
      se (canal >= 1) e (canal <= 3) entao
        escolha acao
          caso 1
            escreva("Novo volume 0 a 100: ")
            leia(valor)
            se (valor >= 0) e (valor <= 100) entao
              volume[canal] <- valor
            fimse
          caso 2
            mudo[canal] <- 1 - mudo[canal]
          caso 3
            solo[canal] <- 1 - solo[canal]
        fimescolha
      fimse
    senao
      se acao = 4 entao
        para i de 1 ate 3 faca
          salvo[i] <- volume[i]
        fimpara
      fimse
      se acao = 5 entao
        para i de 1 ate 3 faca
          volume[i] <- salvo[i]
        fimpara
      fimse
      se acao = 6 entao
        soma <- solo[1] + solo[2] + solo[3]
        para i de 1 ate 3 faca
          valor <- 0
          se (mudo[i] = 0) e ((soma = 0) ou (solo[i] = 1)) entao
            valor <- volume[i]
          fimse
          escreval("Canal ", i, ": volume efetivo ", valor)
        fimpara
      fimse
    fimse
    escreva("Ação (1 ajustar, 2 mudo, 3 solo, 4 salvar, 5 restaurar, 6 ouvir, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Controle três canais. Mudo zera o volume efetivo do canal; se algum solo estiver ativo, só canais solo não mudos soam. Salvar/restaurar copia os volumes ajustados.',
    'Canal 1 em solo e canal 2 normal → só canal 1 soa',
    'Restaurar recompõe volumes, mas preserva mudo e solo nesta versão.',
    'Vetores separam valores configurados, estados de escuta e cópia salva.',
    ['Guarde volume e estados separados.', 'Calcule volume efetivo.', 'Copie os volumes ao salvar.'])

add(21, '''  horario, recorrencia: vetor[1..5] de inteiro
  nome: vetor[1..5] de caractere
  i, dia, agora: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Alarme ", i, ": ")
    leia(nome[i])
    escreva("Horário em minutos desde 00:00: ")
    leia(horario[i])
    escreva("Recorrência (0 único, 1 todos os dias, 2 dias pares): ")
    leia(recorrencia[i])
  fimpara
  escreva("Dia a consultar: ")
  leia(dia)
  escreva("Minuto atual desse dia: ")
  leia(agora)
  para i de 1 ate 5 faca
    se (horario[i] >= agora) e (horario[i] <= 1439) e (horario[i] >= 0) entao
      se (recorrencia[i] = 1) ou ((recorrencia[i] = 2) e (dia mod 2 = 0)) ou ((recorrencia[i] = 0) e (dia = 1)) entao
        escreval(nome[i], " disparará no minuto ", horario[i])
      fimse
    fimse
  fimpara''',
    'Cadastre cinco alarmes com horário e recorrência: único no dia 1, diário ou dias pares. Consulte os disparos ainda futuros de um dia numérico.',
    'Alarme diário às 600 min, consulta dia 3 às 500 min → aparecerá',
    'Alarme no minuto atual ainda aparece; horários fora de 0–1439 são ignorados.',
    'A recorrência filtra o dia e a comparação de minutos filtra o que ainda não passou.',
    ['Guarde horário e recorrência.', 'Teste se vale para o dia.', 'Mostre apenas horários futuros.'])

add(22, '''  sinal: vetor[1..4, 1..4] de real
  linha, coluna, fracos: inteiro
  limite, soma: real''', '''  escreva("Sinal mínimo aceitável: ")
  leia(limite)
  fracos <- 0
  soma <- 0
  para linha de 1 ate 4 faca
    para coluna de 1 ate 4 faca
      escreva("Sinal em ", linha, ",", coluna, ": ")
      leia(sinal[linha, coluna])
      soma <- soma + sinal[linha, coluna]
      se sinal[linha, coluna] < limite entao
        fracos <- fracos + 1
        escreval("Cobertura insuficiente em (", linha, ",", coluna, ")")
      fimse
    fimpara
  fimpara
  escreval("Células insuficientes: ", fracos, "; sinal médio: ", soma / 16)''',
    'Leia matriz 4×4 de intensidades. Localize cada célula estritamente abaixo do limite e calcule média de todas.',
    'Limite 40; célula com sinal 30 → insuficiente',
    'Valor igual ao limite é suficiente.',
    'Percorrer linhas e colunas preserva a posição das regiões fracas.',
    ['Use matriz 4×4.', 'Compare cada célula.', 'Some para média.'])

add(23, '''  processo: vetor[1..5] de caractere
  tempo: vetor[1..5] de real
  i, gargalo: inteiro
  soma, maior: real''', '''  soma <- 0
  maior <- -1
  para i de 1 ate 5 faca
    escreva("Processo ", i, ": ")
    leia(processo[i])
    escreva("Tempo de inicialização (s): ")
    leia(tempo[i])
    se tempo[i] >= 0 entao
      soma <- soma + tempo[i]
      escreval("Tempo acumulado até aqui: ", soma, " s")
      se tempo[i] > maior entao
        maior <- tempo[i]
        gargalo <- i
      fimse
    fimse
  fimpara
  se maior >= 0 entao
    escreval("Gargalo: ", processo[gargalo], " com ", maior, " s")
  fimse
  escreval("Inicialização total sequencial: ", soma, " s")''',
    'Cinco processos iniciam sequencialmente. Some tempos, mostre custo acumulado e identifique o processo individual mais lento.',
    'Tempos 2, 5 e 3 s → total 10 s, gargalo no processo de 5 s',
    'Tempo negativo é ignorado. Empate preserva o primeiro gargalo.',
    'A soma representa o tempo sequencial e o máximo localiza o gargalo individual.',
    ['Acumule tempos.', 'Compare cada processo com o maior.', 'Mostre ambos.'])

add(24, '''  valor, bytes: real
  unidade: inteiro''', '''  escreva("Valor: ")
  leia(valor)
  escreva("Unidade (1 bytes, 2 KiB, 3 MiB, 4 GiB): ")
  leia(unidade)
  se (valor < 0) ou (unidade < 1) ou (unidade > 4) entao
    escreval("Dados inválidos")
  senao
    bytes <- valor
    escolha unidade
      caso 2
        bytes <- valor * 1024
      caso 3
        bytes <- valor * 1024 * 1024
      caso 4
        bytes <- valor * 1024 * 1024 * 1024
    fimescolha
    escreval("Bytes: ", bytes)
    escreval("KiB: ", bytes / 1024)
    escreval("MiB: ", bytes / (1024 * 1024))
    escreval("GiB: ", bytes / (1024 * 1024 * 1024))
  fimse''',
    'Selecione unidade de entrada entre bytes, KiB, MiB e GiB. Converta para bytes e mostre as quatro unidades usando fator 1024.',
    '1 MiB → 1048576 bytes → 1024 KiB',
    'Valor negativo ou código de unidade fora de 1–4 é inválido.',
    'Bytes servem de unidade intermediária comum para todas as saídas.',
    ['Converta entrada em bytes.', 'Use potências de 1024.', 'Divida para outras unidades.'])

add(25, '''  saldo, comando, parametro, i, erros: inteiro''', '''  saldo <- 0
  erros <- 0
  para i de 1 ate 8 faca
    escreva("Comando ", i, " (1 somar, 2 subtrair, 3 multiplicar, 4 zerar): ")
    leia(comando)
    parametro <- 0
    se (comando >= 1) e (comando <= 3) entao
      escreva("Parâmetro inteiro: ")
      leia(parametro)
    fimse
    escolha comando
      caso 1
        saldo <- saldo + parametro
      caso 2
        saldo <- saldo - parametro
      caso 3
        saldo <- saldo * parametro
      caso 4
        saldo <- 0
      outrocaso
        erros <- erros + 1
        escreval("Comando inválido")
    fimescolha
    escreval("Estado: ", saldo)
  fimpara
  escreval("Erros de protocolo: ", erros)''',
    'Interprete oito instruções: somar, subtrair, multiplicar com parâmetro ou zerar sem parâmetro. Conte comandos desconhecidos.',
    'Saldo 0; somar 5; multiplicar 2 → saldo 10',
    'Comando inválido não altera o estado.',
    'A estrutura de seleção aplica a operação correspondente à instrução recebida.',
    ['Leia comando.', 'Leia parâmetro só quando necessário.', 'Atualize saldo e conte erros.'])

add(26, '''  nome: vetor[1..5] de caractere
  prioridade, duracao, estado: vetor[1..5] de inteiro
  i, j, escolhido, relogio, esperaTotal: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Tarefa ", i, ": ")
    leia(nome[i])
    escreva("Prioridade (1 mais alta): ")
    leia(prioridade[i])
    escreva("Duração: ")
    leia(duracao[i])
    estado[i] <- 0
  fimpara
  relogio <- 0
  esperaTotal <- 0
  para i de 1 ate 5 faca
    escolhido <- 0
    para j de 1 ate 5 faca
      se (estado[j] = 0) e (duracao[j] >= 0) entao
        se escolhido = 0 entao
          escolhido <- j
        senao
          se prioridade[j] < prioridade[escolhido] entao
            escolhido <- j
          fimse
        fimse
      fimse
    fimpara
    se escolhido > 0 entao
      estado[escolhido] <- 1
      escreval(nome[escolhido], ": espera ", relogio, ", termina em ", relogio + duracao[escolhido])
      esperaTotal <- esperaTotal + relogio
      relogio <- relogio + duracao[escolhido]
    fimse
  fimpara
  escreval("Espera total: ", esperaTotal, "; duração total: ", relogio)''',
    'Cinco tarefas chegam no instante zero. Execute por prioridade crescente, sem preempção; empate segue cadastro. Mostre espera e conclusão.',
    'Tarefa A dura 3 e executa primeiro; tarefa B espera 3 antes de iniciar',
    'Duração negativa invalida a tarefa.',
    'O relógio acumulado antes da execução de cada tarefa é seu tempo de espera.',
    ['Selecione prioridade mais alta ainda pendente.', 'Mostre relógio como espera.', 'Avance pelo tempo da tarefa.'])

add(27, '''  nome: vetor[1..6] de caractere
  tamanho, prioridade: vetor[1..6] de inteiro
  selecionado: vetor[1..6] de inteiro
  i, j, escolhido, liberado, alvo: inteiro''', '''  escreva("Espaço a liberar: ")
  leia(alvo)
  para i de 1 ate 6 faca
    escreva("Arquivo temporário ", i, ": ")
    leia(nome[i])
    escreva("Tamanho: ")
    leia(tamanho[i])
    escreva("Prioridade de limpeza (1 mais alta): ")
    leia(prioridade[i])
    selecionado[i] <- 0
  fimpara
  liberado <- 0
  para i de 1 ate 6 faca
    se liberado < alvo entao
      escolhido <- 0
      para j de 1 ate 6 faca
        se (selecionado[j] = 0) e (tamanho[j] > 0) entao
          se escolhido = 0 entao
            escolhido <- j
          senao
            se (prioridade[j] < prioridade[escolhido]) ou ((prioridade[j] = prioridade[escolhido]) e (tamanho[j] > tamanho[escolhido])) entao
              escolhido <- j
            fimse
          fimse
        fimse
      fimpara
      se escolhido > 0 entao
        selecionado[escolhido] <- 1
        liberado <- liberado + tamanho[escolhido]
        escreval("Remover ", nome[escolhido], " (", tamanho[escolhido], ")")
      fimse
    fimse
  fimpara
  escreval("Espaço liberado: ", liberado)
  se liberado < alvo entao
    escreval("Alvo não alcançado")
  fimse''',
    'Escolha arquivos temporários até atingir o espaço-alvo. Prioridade numérica menor vem primeiro; no empate, maior arquivo primeiro.',
    'Alvo 10; arquivos prioritários de tamanhos 6 e 5 → ambos selecionados, 11 liberados',
    'Se todos os arquivos válidos não bastarem, informe que o alvo não foi alcançado.',
    'Uma seleção repetida encontra a melhor opção ainda não escolhida.',
    ['Guarde prioridade e tamanho.', 'Selecione a próxima opção.', 'Pare ao atingir alvo.'])

add(28, '''  nome: vetor[1..5] de caractere
  depende, instalado: vetor[1..5] de inteiro
  i, rodada, progresso, restantes: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Pacote ", i, ": ")
    leia(nome[i])
    escreva("Depende do pacote (0 sem dependência, 1 a 5): ")
    leia(depende[i])
    instalado[i] <- 0
  fimpara
  restantes <- 5
  para rodada de 1 ate 5 faca
    progresso <- 0
    para i de 1 ate 5 faca
      se instalado[i] = 0 entao
        se depende[i] = 0 entao
          instalado[i] <- 1
          restantes <- restantes - 1
          progresso <- progresso + 1
          escreval("Instalado: ", nome[i])
        senao
          se (depende[i] >= 1) e (depende[i] <= 5) entao
            se instalado[depende[i]] = 1 entao
              instalado[i] <- 1
              restantes <- restantes - 1
              progresso <- progresso + 1
              escreval("Instalado: ", nome[i])
            fimse
          fimse
        fimse
      fimse
    fimpara
    se progresso = 0 entao
      interrompa
    fimse
  fimpara
  se restantes > 0 entao
    escreval("Dependência circular ou inválida; ", restantes, " pacote(s) pendente(s)")
  senao
    escreval("Todos os pacotes instalados em ordem válida")
  fimse''',
    'Cinco pacotes têm no máximo uma dependência cada. Instale um pacote somente depois de instalar seu requisito; repita passagens até concluir ou travar.',
    'B depende de A; A sem dependência → instala A antes de B',
    'Ciclo A↔B deixa os dois pendentes e é identificado pela ausência de progresso.',
    'Passagens sucessivas aplicam uma ordenação topológica simples aos requisitos.',
    ['Guarde dependência e estado.', 'Instale os liberados.', 'Detecte uma passagem sem progresso.'])

add(29, '''  teste: vetor[1..12] de inteiro
  i, quedas, atual, maior, inicioAtual, inicioMaior: inteiro''', '''  quedas <- 0
  atual <- 0
  maior <- 0
  para i de 1 ate 12 faca
    escreva("Teste ", i, " (1 conectado, 0 queda): ")
    leia(teste[i])
    se teste[i] = 0 entao
      quedas <- quedas + 1
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
  escreval("Quedas totais: ", quedas)
  se maior > 0 entao
    escreval("Maior sequência de quedas: testes ", inicioMaior, " a ", inicioMaior + maior - 1)
  fimse''',
    'Em doze testes, 0 indica queda e 1 conexão. Conte quedas e localize o maior bloco consecutivo sem conexão.',
    'Resultados 0,0,1,0 → três quedas totais e maior bloco de 2',
    'Qualquer entrada diferente de 0 interrompe a sequência.',
    'Contador atual e máximo localizam a pior sequência de falhas.',
    ['Conte zeros.', 'Reinicie a sequência em conexão.', 'Guarde o melhor início e tamanho.'])

add(30, '''  modulo, severidade, status: vetor[1..8] de inteiro
  pendente: vetor[1..3] de inteiro
  i, graves: inteiro''', '''  para i de 1 ate 3 faca
    pendente[i] <- 0
  fimpara
  graves <- 0
  para i de 1 ate 8 faca
    escreva("Módulo da falha ", i, " (1 a 3): ")
    leia(modulo[i])
    escreva("Severidade (1 leve, 2 média, 3 grave): ")
    leia(severidade[i])
    escreva("Status (1 aberto, 2 resolvido): ")
    leia(status[i])
    se (modulo[i] >= 1) e (modulo[i] <= 3) e (status[i] = 1) entao
      pendente[modulo[i]] <- pendente[modulo[i]] + 1
      se severidade[i] = 3 entao
        graves <- graves + 1
      fimse
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Módulo ", i, ": ", pendente[i], " pendência(s)")
  fimpara
  escreval("Falhas graves ainda abertas: ", graves)''',
    'Cadastre oito falhas por módulo 1–3, severidade 1–3 e status aberto/resolvido. Conte pendências por módulo e graves ainda abertas.',
    'Uma falha grave aberta no módulo 2 → módulo 2 tem uma pendência e grave aberto total 1',
    'Falha resolvida não entra nas pendências.',
    'Somente registros abertos incrementam os contadores.',
    ['Guarde três atributos por falha.', 'Filtre status aberto.', 'Conte por módulo e severidade.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')

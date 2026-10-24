#!/usr/bin/env python3
"""Curated introductory August exercises based on the challenge CSV."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'08-{day:02d}'
    prompt = rows[date]['simples_enunciado']
    code = f'algoritmo "Desafio08{day:02d}S"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/simples'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '  primeira, segunda, terceira: inteiro', '''  escreva("Pontos das três fases: ")
  leia(primeira, segunda, terceira)
  se (primeira < 0) ou (segunda < 0) ou (terceira < 0) entao
    escreval("Pontuação inválida")
  senao
    escreval("Pontuação total: ", primeira + segunda + terceira)
  fimse''',
    'Some os pontos obtidos em três fases.', '10, 20 e 30 → 60 pontos',
    'Fase com zero ponto é válida.', 'A pontuação final reúne as três parcelas.',
    ['Leia três inteiros.', 'Some.', 'Mostre o total.'])

add(2, '  iniciais, perdidas, restantes: inteiro', '''  escreva("Vidas iniciais: ")
  leia(iniciais)
  escreva("Vidas perdidas: ")
  leia(perdidas)
  se (iniciais < 0) ou (perdidas < 0) entao
    escreval("Dados inválidos")
  senao
    restantes <- iniciais - perdidas
    se restantes < 0 entao
      restantes <- 0
    fimse
    escreval("Vidas restantes: ", restantes)
  fimse''',
    'Subtraia as vidas perdidas e limite o resultado inferior a zero.',
    '3 vidas, 5 perdidas → 0 restantes', 'Perder zero vida mantém o saldo.',
    'O limite inferior evita uma quantidade impossível de vidas.',
    ['Subtraia.', 'Compare com zero.', 'Ajuste se necessário.'])

add(3, '  tecla: caractere', '''  escreva("Tecla W, A, S ou D: ")
  leia(tecla)
  escolha maiusc(tecla)
    caso "W"
      escreval("Mover para cima")
    caso "A"
      escreval("Mover para a esquerda")
    caso "S"
      escreval("Mover para baixo")
    caso "D"
      escreval("Mover para a direita")
    outrocaso
      escreval("Tecla desconhecida")
  fimescolha''',
    'Associe W a cima, A a esquerda, S a baixo e D a direita.',
    'Tecla D → mover para a direita', 'Aceite minúsculas convertendo a entrada.',
    'A seleção usa a tecla normalizada para escolher uma ação.',
    ['Leia um texto.', 'Converta para maiúsculas.', 'Use escolha.'])

add(4, '  a, b, c: real', '''  escreva("FPS das três medições: ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("FPS inválido")
  senao
    escreval("FPS médio: ", (a + b + c) / 3)
  fimse''',
    'Some três medições de FPS e divida por três.',
    '30, 60 e 45 → média 45 FPS', 'Uma leitura zero é aceita.',
    'A média aritmética usa as três medições com o mesmo peso.',
    ['Some leituras.', 'Divida por três.', 'Mostre FPS.'])

add(5, '  capacidade, usada: real', '''  escreva("Capacidade de memória: ")
  leia(capacidade)
  escreva("Memória usada: ")
  leia(usada)
  se (capacidade < 0) ou (usada < 0) ou (usada > capacidade) entao
    escreval("Dados inválidos")
  senao
    escreval("Memória livre: ", capacidade - usada)
  fimse''',
    'A capacidade e o uso devem estar na mesma unidade.',
    '16 GB totais, 6 GB usados → 10 GB livres', 'Uso igual à capacidade deixa zero livre.',
    'A diferença entre capacidade e uso é o espaço livre.',
    ['Leia os dois valores.', 'Confira se uso não supera capacidade.', 'Subtraia.'])

add(6, '  senha: caractere', '''  escreva("Digite a senha do jogo: ")
  leia(senha)
  se senha = "dragao42" entao
    escreval("Acesso permitido")
  senao
    escreval("Senha incorreta")
  fimse''',
    'Compare exatamente com o código pré-definido dragao42, incluindo maiúsculas e minúsculas.',
    'dragao42 → acesso permitido', 'Dragao42 não corresponde ao código.',
    'A comparação de textos verifica todos os caracteres da senha.',
    ['Guarde a entrada como caractere.', 'Compare com o literal.', 'Exiba o resultado.'])

add(7, '  cliques, i: inteiro', '''  escreva("Quantidade de cliques: ")
  leia(cliques)
  se cliques < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate cliques faca
      escreval(i)
    fimpara
  fimse''',
    'Conte de 1 até a quantidade de cliques informada.',
    'N=3 → 1, 2, 3', 'Zero clique não imprime números.',
    'O contador do laço representa cada clique.',
    ['Leia N.', 'Use para.', 'Imprima o contador.'])

add(8, '  saldo, preco: inteiro', '''  escreva("Moedas disponíveis: ")
  leia(saldo)
  escreva("Preço da compra: ")
  leia(preco)
  se (saldo < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    se preco <= saldo entao
      escreval("Compra efetuada; saldo ", saldo - preco)
    senao
      escreval("Moedas insuficientes; saldo ", saldo)
    fimse
  fimse''',
    'Subtraia o preço somente quando o saldo pagar a compra.',
    'Saldo 10, preço 7 → saldo 3', 'Compra acima do saldo é recusada.',
    'A validação impede saldo negativo.',
    ['Compare preço e saldo.', 'Subtraia se possível.', 'Mantenha o saldo se não puder comprar.'])

add(9, '  pontos, limite: inteiro', '''  escreva("Experiência atual: ")
  leia(pontos)
  escreva("Experiência exigida para o próximo nível: ")
  leia(limite)
  se (pontos < 0) ou (limite < 0) entao
    escreval("Dados inválidos")
  senao
    se pontos >= limite entao
      escreval("Próximo nível disponível")
    senao
      escreval("Faltam ", limite - pontos, " pontos")
    fimse
  fimse''',
    'O próximo nível está disponível quando pontos alcançam ou superam o limite.',
    '90 pontos, limite 100 → faltam 10', 'Igualdade já libera o nível.',
    'A diferença informa a quantidade ainda necessária.',
    ['Use >=.', 'Subtraia para o caso incompleto.', 'Mostre a situação.'])

add(10, '  dado: inteiro', '''  escreva("Resultado do dado: ")
  leia(dado)
  se (dado >= 1) e (dado <= 6) entao
    escreval("Face válida")
  senao
    escreval("Face inválida")
  fimse''',
    'Um dado comum tem faces numeradas de 1 a 6.',
    '6 → válido; 7 → inválido', 'Zero não é face válida.',
    'As duas desigualdades delimitam o intervalo permitido.',
    ['Leia um inteiro.', 'Compare os dois limites.', 'Exiba a classificação.'])

add(11, '  processador, memoria, armazenamento: real', '''  escreva("Preço do processador: ")
  leia(processador)
  escreva("Preço da memória: ")
  leia(memoria)
  escreva("Preço do armazenamento: ")
  leia(armazenamento)
  se (processador < 0) ou (memoria < 0) ou (armazenamento < 0) entao
    escreval("Preço inválido")
  senao
    escreval("Total: R$ ", processador + memoria + armazenamento)
  fimse''',
    'Some o preço de uma peça de cada categoria.',
    'R$ 500, R$ 200 e R$ 300 → R$ 1000', 'Peça gratuita contribui com zero.',
    'A soma compõe o custo total do conjunto.',
    ['Leia três preços.', 'Some.', 'Mostre o total.'])

add(12, '  gigabytes: real', '''  escreva("Espaço em GB: ")
  leia(gigabytes)
  se gigabytes < 0 entao
    escreval("Espaço inválido")
  senao
    escreval("Espaço em MB: ", gigabytes * 1024)
  fimse''',
    'Use 1 GB = 1024 MB, conforme a convenção binária adotada neste exercício.',
    '2 GB → 2048 MB', 'Zero GB corresponde a zero MB.',
    'Multiplicar por 1024 muda a unidade mantendo a quantidade de dados.',
    ['Leia GB.', 'Multiplique por 1024.', 'Mostre MB.'])

add(13, '  bateria, consumo, restante: real', '''  escreva("Bateria atual em %: ")
  leia(bateria)
  escreva("Consumo em pontos percentuais: ")
  leia(consumo)
  se (bateria < 0) ou (bateria > 100) ou (consumo < 0) entao
    escreval("Dados inválidos")
  senao
    restante <- bateria - consumo
    se restante < 0 entao
      restante <- 0
    fimse
    escreval("Bateria restante: ", restante, "%")
  fimse''',
    'Subtraia o consumo informado, em pontos percentuais, da carga atual.',
    '80% menos 25 pontos → 55%', 'Consumo maior que a carga deixa 0%.',
    'A carga restante é limitada inferiormente para não ficar negativa.',
    ['Subtraia consumo.', 'Compare com zero.', 'Mostre o percentual.'])

add(14, '  vitorias, i: inteiro', '''  escreva("Vitórias: ")
  leia(vitorias)
  se vitorias < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate vitorias faca
      escreval("PARABÉNS")
    fimpara
  fimse''',
    'Mostre PARABÉNS uma vez para cada vitória.',
    '2 vitórias → duas linhas PARABÉNS', 'Zero vitória não imprime a frase.',
    'O laço controla o número de repetições.',
    ['Leia N.', 'Repita N vezes.', 'Use escreval.'])

add(15, '  volume: inteiro', '''  escreva("Volume solicitado: ")
  leia(volume)
  se volume < 0 entao
    volume <- 0
  fimse
  se volume > 100 entao
    volume <- 100
  fimse
  escreval("Volume aplicado: ", volume)''',
    'Limite o volume ao intervalo de 0 a 100.',
    '120 → 100; -5 → 0', 'Valores já dentro da faixa permanecem iguais.',
    'Dois limites sucessivos fazem a saturação do valor.',
    ['Compare com zero.', 'Compare com cem.', 'Mostre o resultado limitado.'])

add(16, '  total, concluidas: inteiro', '''  escreva("Fases totais: ")
  leia(total)
  escreva("Fases concluídas: ")
  leia(concluidas)
  se (total < 0) ou (concluidas < 0) ou (concluidas > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Faltam ", total - concluidas, " fase(s)")
  fimse''',
    'Subtraia as fases concluídas do total do jogo.',
    '10 fases, 6 concluídas → faltam 4', 'Concluiu todas → faltam zero.',
    'A diferença representa o progresso ainda necessário.',
    ['Leia total e concluídas.', 'Valide o intervalo.', 'Subtraia.'])

add(17, '  atual, adquiridos: inteiro', '''  escreva("Itens no inventário: ")
  leia(atual)
  escreva("Novos itens: ")
  leia(adquiridos)
  se (atual < 0) ou (adquiridos < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Itens agora: ", atual + adquiridos)
  fimse''',
    'Acrescente as unidades adquiridas ao inventário atual.',
    '5 itens, adquire 3 → 8 itens', 'Adquirir zero não muda o inventário.',
    'A soma atualiza a contagem total.',
    ['Leia saldo.', 'Leia aquisição.', 'Some.'])

add(18, '  primeiro, segundo: inteiro', '''  escreva("Pontos do jogador 1: ")
  leia(primeiro)
  escreva("Pontos do jogador 2: ")
  leia(segundo)
  se primeiro = segundo entao
    escreval("Placar empatado")
  senao
    escreval("Placar diferente")
  fimse''',
    'Verifique somente se os dois placares são iguais.',
    '10 e 10 → empatado; 10 e 8 → diferente', 'Zero a zero é empate.',
    'A igualdade compara diretamente as duas pontuações.',
    ['Leia dois valores.', 'Use =.', 'Exiba um dos resultados.'])

add(19, '  largura, altura: inteiro', '''  escreva("Largura em pixels: ")
  leia(largura)
  escreva("Altura em pixels: ")
  leia(altura)
  se (largura < 0) ou (altura < 0) entao
    escreval("Dimensão inválida")
  senao
    escreval("Pixels totais: ", largura * altura)
  fimse''',
    'Imagem retangular tem largura multiplicada pela altura em pixels.',
    '800 × 600 → 480000 pixels', 'Dimensão zero resulta em zero pixel.',
    'A multiplicação conta todas as posições da grade.',
    ['Leia largura.', 'Leia altura.', 'Multiplique.'])

add(20, '  total, baixados: real', '''  escreva("Tamanho total do arquivo: ")
  leia(total)
  escreva("Dados já baixados: ")
  leia(baixados)
  se (total < 0) ou (baixados < 0) ou (baixados > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Restam: ", total - baixados)
  fimse''',
    'Os dois tamanhos devem estar na mesma unidade.',
    '100 MB totais, 40 MB baixados → faltam 60 MB', 'Download concluído deixa zero.',
    'A diferença mede dados ainda pendentes.',
    ['Leia tamanho total.', 'Leia progresso.', 'Subtraia após validar.'])

add(21, '  base, bonus, finalDano: real', '''  escreva("Dano base: ")
  leia(base)
  escreva("Bônus crítico em %: ")
  leia(bonus)
  se (base < 0) ou (bonus < 0) entao
    escreval("Dados inválidos")
  senao
    finalDano <- base * (1 + bonus / 100)
    escreval("Dano crítico: ", finalDano)
  fimse''',
    'Aplique o bônus percentual ao dano base.',
    'Dano 20, bônus 50% → dano 30', 'Bônus zero mantém o dano base.',
    'Um mais a taxa em fração multiplica o valor original.',
    ['Divida o percentual por 100.', 'Some 1.', 'Multiplique pelo dano base.'])

add(22, '  segundos: inteiro', '''  escreva("Segundos da partida: ")
  leia(segundos)
  se segundos < 0 entao
    escreval("Tempo inválido")
  senao
    escreval("Tempo: ", segundos div 60, " min e ", segundos mod 60, " s")
  fimse''',
    'Cada minuto contém 60 segundos.',
    '125 s → 2 min e 5 s', 'Menos de 60 segundos dá zero minuto.',
    'A divisão inteira fornece minutos e o resto fornece segundos restantes.',
    ['Use div por 60.', 'Use mod 60.', 'Mostre as duas partes.'])

add(23, '  codigo: inteiro', '''  escreva("Código ASCII: ")
  leia(codigo)
  se (codigo >= 48) e (codigo <= 57) entao
    escreval("Representa um dígito")
  senao
    escreval("Não representa um dígito")
  fimse''',
    'No ASCII, os caracteres 0 a 9 usam os códigos 48 a 57.',
    '48 → dígito; 65 → não dígito', 'Os extremos 48 e 57 estão incluídos.',
    'A condição testa se o código está no intervalo inclusivo.',
    ['Leia o código inteiro.', 'Compare os dois limites.', 'Exiba a classificação.'])

add(24, '  a, b, c: real', '''  escreva("Latências das três respostas (ms): ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Latência inválida")
  senao
    escreval("Latência média: ", (a + b + c) / 3, " ms")
  fimse''',
    'Some as três latências em milissegundos e divida por três.',
    '10, 20, 30 ms → média 20 ms', 'Zero ms é aceito nesta simulação.',
    'A média aritmética dá o tempo médio de resposta.',
    ['Some os tempos.', 'Divida por três.', 'Mostre ms.'])

add(25, '  imagens: inteiro\n  porImagem: real', '''  escreva("Número de imagens: ")
  leia(imagens)
  escreva("Espaço por imagem (MB): ")
  leia(porImagem)
  se (imagens < 0) ou (porImagem < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Espaço total: ", imagens * porImagem, " MB")
  fimse''',
    'Considere todas as imagens com o mesmo tamanho.',
    '50 imagens de 2 MB → 100 MB', 'Zero imagem usa zero MB.',
    'A multiplicação fornece o armazenamento conjunto.',
    ['Leia número e tamanho.', 'Multiplique.', 'Mostre MB.'])

add(26, '  valor, zona: real', '''  escreva("Valor do eixo do joystick: ")
  leia(valor)
  escreva("Limite absoluto da zona morta: ")
  leia(zona)
  se zona < 0 entao
    escreval("Zona inválida")
  senao
    se (valor >= 0 - zona) e (valor <= zona) entao
      escreval("Em repouso")
    senao
      escreval("Fora da zona morta")
    fimse
  fimse''',
    'O eixo está em repouso quando seu valor está entre -zona e +zona, inclusive.',
    'Valor -0,1 e zona 0,2 → em repouso', 'Valor exatamente no limite ainda está na zona.',
    'A faixa é simétrica em torno de zero.',
    ['Leia valor e limite.', 'Teste os dois extremos.', 'Mostre a situação.'])

add(27, '  a, b, c, maior: inteiro', '''  escreva("Três pontuações: ")
  leia(a, b, c)
  maior <- a
  se b > maior entao
    maior <- b
  fimse
  se c > maior entao
    maior <- c
  fimse
  escreval("Maior pontuação: ", maior)''',
    'Compare três pontuações e mostre o valor máximo.',
    '7, 12, 9 → 12', 'Empates mostram o mesmo máximo.',
    'A variável maior é atualizada quando aparece um valor superior.',
    ['Comece com a primeira.', 'Compare as outras duas.', 'Mostre maior.'])

add(28, '  dias, bonusDiario, bonusTotal: inteiro', '''  escreva("Dias de recompensa: ")
  leia(dias)
  escreva("Bônus fixo por dia: ")
  leia(bonusDiario)
  se (dias < 0) ou (bonusDiario < 0) entao
    escreval("Dados inválidos")
  senao
    bonusTotal <- dias * bonusDiario
    escreval("Bônus acumulado: ", bonusTotal)
  fimse''',
    'Cada dia concede o mesmo bônus fixo.',
    '5 dias de 10 moedas → 50 moedas', 'Zero dia dá bônus zero.',
    'A multiplicação soma o mesmo bônus N vezes.',
    ['Leia dias.', 'Leia bônus diário.', 'Multiplique.'])

add(29, '  jogadores, minimo: inteiro', '''  escreva("Jogadores presentes: ")
  leia(jogadores)
  escreva("Mínimo para iniciar: ")
  leia(minimo)
  se (jogadores < 0) ou (minimo < 0) entao
    escreval("Dados inválidos")
  senao
    se jogadores >= minimo entao
      escreval("Partida pode começar")
    senao
      escreval("Aguardando ", minimo - jogadores, " jogador(es)")
    fimse
  fimse''',
    'A partida inicia quando a quantidade presente alcança o mínimo.',
    '3 presentes, mínimo 4 → aguarda 1 jogador', 'Igualdade já permite começar.',
    'A diferença informa quantos jogadores faltam.',
    ['Compare presentes e mínimo.', 'Use >=.', 'Calcule a falta.'])

add(30, '  vida: real', '''  escreva("Vida atual: ")
  leia(vida)
  se vida <= 0 entao
    escreval("GAME OVER")
  senao
    escreval("Jogo continua")
  fimse''',
    'O jogo termina quando a vida chega a zero ou menos.',
    'Vida 0 → GAME OVER; vida 1 → jogo continua',
    'Valor negativo também representa personagem sem vida.',
    'A condição <= cobre zero e valores inferiores.',
    ['Leia a vida.', 'Compare com zero.', 'Mostre a situação.'])

add(31, '  vitorias, partidas: inteiro\n  percentual: real', '''  escreva("Vitórias: ")
  leia(vitorias)
  escreva("Partidas: ")
  leia(partidas)
  se (partidas <= 0) ou (vitorias < 0) ou (vitorias > partidas) entao
    escreval("Dados inválidos")
  senao
    percentual <- 100 * vitorias / partidas
    escreval("Aproveitamento: ", percentual, "%")
  fimse''',
    'Divida vitórias por partidas e multiplique por 100.',
    '6 vitórias em 8 partidas → 75%', 'Zero partida impede calcular uma razão.',
    'O percentual mede a fração de partidas vencidas.',
    ['Valide o total.', 'Divida vitórias por partidas.', 'Multiplique por cem.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')

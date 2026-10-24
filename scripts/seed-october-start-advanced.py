#!/usr/bin/env python3
"""Curated advanced challenges for October 1–22."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'10-{day:02d}'
    prompt = rows[date]['avancado_enunciado']
    code = f'algoritmo "Desafio10{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/avancado'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  armadilha: vetor[1..10] de inteiro
  posicao, chaves, movimento, rodada: inteiro''', '''  para posicao de 1 ate 10 faca
    armadilha[posicao] <- 0
  fimpara
  armadilha[3] <- 1
  armadilha[6] <- 2
  armadilha[9] <- 1
  posicao <- 1
  chaves <- 1
  para rodada de 1 ate 8 faca
    escreval("Posição ", posicao, ", chaves ", chaves)
    escreva("Passos à frente (1 ou 2; 0 encerra): ")
    leia(movimento)
    se movimento = 0 entao
      interrompa
    fimse
    se (movimento = 1) ou (movimento = 2) entao
      se posicao + movimento <= 10 entao
        posicao <- posicao + movimento
        se armadilha[posicao] = 1 entao
          se chaves > 0 entao
            chaves <- chaves - 1
            escreval("Armadilha neutralizada com uma chave")
          senao
            escreval("Armadilha! Volta ao início")
            posicao <- 1
          fimse
        fimse
        se armadilha[posicao] = 2 entao
          chaves <- chaves + 1
          armadilha[posicao] <- 0
          escreval("Chave encontrada")
        fimse
      fimse
    fimse
  fimpara
  escreval("Posição final: ", posicao, "; chaves: ", chaves)''',
    'Corredor de dez posições. Armadilhas em 3 e 9 consomem uma chave ou devolvem ao início; posição 6 contém uma chave única. Faça até oito movimentos de um ou dois passos.',
    'Começa com uma chave; mover para posição 3 neutraliza a armadilha e deixa zero chaves',
    'Movimento que ultrapassa a posição 10 é ignorado.',
    'Um vetor codifica armadilhas e objeto; a posição e o inventário mudam conforme a célula alcançada.',
    ['Guarde posição e chaves.', 'Consulte o conteúdo da célula alcançada.', 'Consuma ou encontre chave conforme o evento.'])

add(2, '''  estoque: vetor[1..3] de inteiro
  i, acao, tamanho, quantidade, perdas, vendas: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Estoque inicial tamanho ", i, " (1 P, 2 M, 3 G): ")
    leia(estoque[i])
  fimpara
  vendas <- 0
  perdas <- 0
  escreva("Ação (1 entrada, 2 venda, 3 perda, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Tamanho (1 a 3): ")
    leia(tamanho)
    escreva("Quantidade: ")
    leia(quantidade)
    se (tamanho >= 1) e (tamanho <= 3) e (quantidade > 0) entao
      se acao = 1 entao
        estoque[tamanho] <- estoque[tamanho] + quantidade
      senao
        se (acao = 2) ou (acao = 3) entao
          se quantidade <= estoque[tamanho] entao
            estoque[tamanho] <- estoque[tamanho] - quantidade
            se acao = 2 entao
              vendas <- vendas + quantidade
            senao
              perdas <- perdas + quantidade
            fimse
          senao
            escreval("Estoque insuficiente")
          fimse
        fimse
      fimse
    fimse
    escreva("Ação (1 entrada, 2 venda, 3 perda, 0 sair): ")
    leia(acao)
  fimenquanto
  para i de 1 ate 3 faca
    escreval("Tamanho ", i, ": ", estoque[i])
  fimpara
  escreval("Vendidas: ", vendas, "; perdidas: ", perdas)''',
    'Controle três tamanhos de abóbora. Entrada aumenta saldo; venda e perda reduzem apenas se houver unidades suficientes.',
    'Tamanho M com 5; vende 2 e perde 1 → saldo 2',
    'Saída maior que o estoque é recusada sem saldo negativo.',
    'Um vetor guarda saldo por tamanho e contadores distinguem vendas de perdas.',
    ['Associe cada tamanho a índice.', 'Valide saídas.', 'Atualize o contador correto.'])

add(3, '''  estoque, porSacola: vetor[1..3] de inteiro
  tipo, sacolas, possiveis, menor: inteiro''', '''  para tipo de 1 ate 3 faca
    escreva("Estoque do doce ", tipo, ": ")
    leia(estoque[tipo])
    escreva("Unidades desse doce por sacola: ")
    leia(porSacola[tipo])
  fimpara
  menor <- 999999
  para tipo de 1 ate 3 faca
    se (estoque[tipo] < 0) ou (porSacola[tipo] <= 0) entao
      menor <- -1
    senao
      possiveis <- estoque[tipo] div porSacola[tipo]
      se possiveis < menor entao
        menor <- possiveis
      fimse
    fimse
  fimpara
  se menor < 0 entao
    escreval("Dados inválidos")
  senao
    sacolas <- menor
    escreval("Sacolas completas: ", sacolas)
    para tipo de 1 ate 3 faca
      escreval("Sobra do doce ", tipo, ": ", estoque[tipo] - sacolas * porSacola[tipo])
    fimpara
  fimse''',
    'Cada sacola usa quantidades positivas de três tipos de doce. Monte o máximo de sacolas completas e reporte sobras por tipo.',
    'Estoques 10,8,7; por sacola 2,2,1 → quatro sacolas completas',
    'Necessidade zero é inválida para este modelo.',
    'O menor quociente inteiro estoque/necessidade limita a produção.',
    ['Calcule sacolas possíveis por tipo.', 'Escolha o menor valor.', 'Subtraia o consumo de cada tipo.'])

add(4, '''  morcego: vetor[1..6, 1..6] de inteiro
  contagem: vetor[1..4] de inteiro
  linha, coluna, quadrante, i: inteiro''', '''  para i de 1 ate 4 faca
    contagem[i] <- 0
  fimpara
  para linha de 1 ate 6 faca
    para coluna de 1 ate 6 faca
      escreva("Morcegos na célula ", linha, ",", coluna, ": ")
      leia(morcego[linha, coluna])
      quadrante <- 1
      se coluna > 3 entao
        quadrante <- quadrante + 1
      fimse
      se linha > 3 entao
        quadrante <- quadrante + 2
      fimse
      se morcego[linha, coluna] > 0 entao
        contagem[quadrante] <- contagem[quadrante] + morcego[linha, coluna]
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval("Quadrante ", i, ": ", contagem[i], " morcego(s)")
  fimpara''',
    'Matriz 6×6 representa morcegos por célula. Divida em quatro quadrantes 3×3 e some as criaturas de cada um.',
    'Um morcego em (1,1) entra no quadrante 1; dois em (5,5) no quadrante 4',
    'Número negativo de morcegos é tratado como zero.',
    'A posição relativa à terceira linha e coluna determina o quadrante.',
    ['Use matriz 6×6.', 'Calcule quadrante pela linha e coluna.', 'Acumule a contagem.'])

add(5, '''  nome: vetor[1..4] de caractere
  pontos, vitorias, ordem: vetor[1..4] de inteiro
  equipe, rodada, valor, i, j, troca: inteiro''', '''  para equipe de 1 ate 4 faca
    escreva("Equipe ", equipe, ": ")
    leia(nome[equipe])
    pontos[equipe] <- 0
    vitorias[equipe] <- 0
    ordem[equipe] <- equipe
    para rodada de 1 ate 3 faca
      escreva("Pontos da rodada ", rodada, ": ")
      leia(valor)
      se valor > 0 entao
        pontos[equipe] <- pontos[equipe] + valor
        vitorias[equipe] <- vitorias[equipe] + 1
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se (pontos[ordem[j]] > pontos[ordem[i]]) ou ((pontos[ordem[j]] = pontos[ordem[i]]) e (vitorias[ordem[j]] > vitorias[ordem[i]])) entao
        troca <- ordem[i]
        ordem[i] <- ordem[j]
        ordem[j] <- troca
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[ordem[i]], ": ", pontos[ordem[i]], " pontos, ", vitorias[ordem[i]], " rodadas pontuadas")
  fimpara''',
    'Quatro equipes têm três rodadas. Classifique por pontos totais, desempate por número de rodadas com pontos positivos e depois por cadastro.',
    'A soma 10 supera 8; em empate de 10 pontos, vence quem pontuou em mais rodadas',
    'Valor não positivo não aumenta pontuação nem rodadas pontuadas.',
    'Ordenar índices preserva os atributos das equipes e aplica dois critérios.',
    ['Acumule pontos e rodadas pontuadas.', 'Compare o total primeiro.', 'Use o segundo critério no empate.'])

add(6, '''  mapa: vetor[1..4, 1..5] de inteiro
  linha, coluna, especiais: inteiro''', '''  especiais <- 0
  para linha de 1 ate 4 faca
    para coluna de 1 ate 5 faca
      escreva("Código da lápide em ", linha, ",", coluna, " (0 comum, 1 especial): ")
      leia(mapa[linha, coluna])
      se mapa[linha, coluna] = 1 entao
        especiais <- especiais + 1
        escreval("Lápide especial em (", linha, ",", coluna, ")")
      fimse
    fimpara
  fimpara
  escreval("Total de lápides especiais: ", especiais)''',
    'Leia mapa 4×5 codificado com 0 para comum e 1 para especial. Liste todas as coordenadas especiais.',
    'Célula (2,3)=1 → lápide especial em (2,3)',
    'Mapa sem código 1 tem total zero.',
    'A varredura usa os índices da matriz como coordenadas de saída.',
    ['Percorra linhas e colunas.', 'Teste código 1.', 'Mostre coordenada e conte.'])

add(7, '''  nome: vetor[1..4] de caractere
  tempo: vetor[1..4] de real
  i, j, trecho: inteiro
  parcial, auxTempo: real
  auxNome: caractere''', '''  para i de 1 ate 4 faca
    escreva("Competidor ", i, ": ")
    leia(nome[i])
    tempo[i] <- 0
    para trecho de 1 ate 3 faca
      repita
        escreva("Tempo da parcial ", trecho, " (s): ")
        leia(parcial)
      ate parcial > 0
      tempo[i] <- tempo[i] + parcial
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i+1 ate 4 faca
      se tempo[j] < tempo[i] entao
        auxTempo <- tempo[i]
        tempo[i] <- tempo[j]
        tempo[j] <- auxTempo
        auxNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- auxNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[i], ": ", tempo[i]:0:2, " s")
  fimpara''',
    'Quatro competidores percorrem três trechos. Some parciais positivas e classifique os quatro pelo tempo acumulado crescente.',
    'Parciais 10, 20 e 15 s → total 45 s; quem tiver 40 s aparece antes.',
    'Cada parcial deve ser positiva. Empates mantêm a ordem de cadastro.',
    'Somar trechos produz o tempo final; a ordenação troca nome e tempo juntos.',
    ['Some três parciais por competidor.', 'Ordene os totais crescentemente.', 'Troque nomes com seus tempos.'])

add(8, '''  estoque, porPocao: vetor[1..4] de inteiro
  i, quantidade, possiveis, menor: inteiro''', '''  para i de 1 ate 4 faca
    escreva("Estoque do ingrediente ", i, ": ")
    leia(estoque[i])
    escreva("Necessidade por poção: ")
    leia(porPocao[i])
  fimpara
  menor <- 999999
  para i de 1 ate 4 faca
    se (estoque[i] < 0) ou (porPocao[i] <= 0) entao
      menor <- -1
    senao
      possiveis <- estoque[i] div porPocao[i]
      se possiveis < menor entao
        menor <- possiveis
      fimse
    fimse
  fimpara
  se menor < 0 entao
    escreval("Receita inválida")
  senao
    escreval("Poções completas: ", menor)
    para i de 1 ate 4 faca
      escreval("Sobra do ingrediente ", i, ": ", estoque[i] - menor * porPocao[i])
    fimpara
  fimse''',
    'A receita usa quantidades positivas de quatro ingredientes. Produza o máximo de poções completas com os estoques limitados.',
    'Estoques 10,8,6,4; usa 2,2,1,1 por poção → quatro poções',
    'Necessidade zero é inválida neste modelo de receita.',
    'O menor quociente inteiro entre estoque e necessidade determina a produção.',
    ['Calcule capacidade por ingrediente.', 'Escolha o mínimo.', 'Calcule sobras.'])

add(9, '''  estoque: vetor[1..2] de inteiro
  receita: vetor[1..2,1..2] de inteiro
  bonus, duracao: vetor[1..2] de inteiro
  ativa: vetor[1..2] de logico
  baseForca, baseDefesa, forcaAtual, defesaAtual, turno, i, j: inteiro
  possivel: logico''', '''  escreva("Ervas disponíveis: ")
  leia(estoque[1])
  escreva("Cristais disponíveis: ")
  leia(estoque[2])
  escreva("Força e defesa base: ")
  leia(baseForca, baseDefesa)
  receita[1,1] <- 2
  receita[1,2] <- 1
  receita[2,1] <- 1
  receita[2,2] <- 2
  para i de 1 ate 2 faca
    escreva("Bônus da poção ", i, ": ")
    leia(bonus[i])
    escreva("Duração (0 a 5 turnos): ")
    leia(duracao[i])
  fimpara
  se (estoque[1] < 0) ou (estoque[2] < 0) ou (baseForca < 0) ou (baseDefesa < 0) ou (bonus[1] < 0) ou (bonus[2] < 0) ou (duracao[1] < 0) ou (duracao[1] > 5) ou (duracao[2] < 0) ou (duracao[2] > 5) entao
    escreval("Dados inválidos")
  senao
    para i de 1 ate 2 faca
      possivel <- verdadeiro
      para j de 1 ate 2 faca
        se estoque[j] < receita[i,j] entao
          possivel <- falso
        fimse
      fimpara
      ativa[i] <- possivel
      se possivel entao
        para j de 1 ate 2 faca
          estoque[j] <- estoque[j]-receita[i,j]
        fimpara
        escreval("Poção ", i, " produzida")
      senao
        escreval("Ingredientes insuficientes para poção ", i)
      fimse
    fimpara
    para turno de 1 ate 5 faca
      forcaAtual <- baseForca
      defesaAtual <- baseDefesa
      se ativa[1] e (turno <= duracao[1]) entao
        forcaAtual <- forcaAtual+bonus[1]
      fimse
      se ativa[2] e (turno <= duracao[2]) entao
        defesaAtual <- defesaAtual+bonus[2]
      fimse
      escreval("Turno ", turno, ": força ", forcaAtual, ", defesa ", defesaAtual)
    fimpara
  fimse''',
    'Receita 1 usa duas ervas e um cristal e melhora força; receita 2 usa uma erva e dois cristais e melhora defesa. Produza cada poção somente se houver ingredientes, descontando-os, e aplique os efeitos nos cinco turnos.',
    'Três ervas e três cristais permitem as duas receitas; força e defesa recebem bônus enquanto cada duração estiver ativa.',
    'Duração zero não ativa efeito; poção não produzida não modifica atributos.',
    'Cada receita verifica o estoque antes de descontar. Em cada turno, recalcule força e defesa a partir dos valores base e acrescente os bônus ativos.',
    ['Guarde custos em matriz.', 'Desconte apenas receitas completas.', 'Recalcule atributos a cada turno.'])

add(10, '''  osso, pedra, criatura, quantidade: inteiro''', '''  escreva("Ossos disponíveis: ")
  leia(osso)
  escreva("Pedras mágicas disponíveis: ")
  leia(pedra)
  escreva("Criatura (1 esqueleto: 3 ossos; 2 golem: 2 ossos e 1 pedra; 0 sair): ")
  leia(criatura)
  enquanto criatura <> 0 faca
    escreva("Quantidade desejada: ")
    leia(quantidade)
    se quantidade <= 0 entao
      escreval("Quantidade inválida")
    senao
      se criatura = 1 entao
        se osso >= 3 * quantidade entao
          osso <- osso - 3 * quantidade
          escreval("Esqueletos criados: ", quantidade)
        senao
          escreval("Ossos insuficientes")
        fimse
      senao
        se criatura = 2 entao
          se (osso >= 2 * quantidade) e (pedra >= quantidade) entao
            osso <- osso - 2 * quantidade
            pedra <- pedra - quantidade
            escreval("Golems criados: ", quantidade)
          senao
            escreval("Componentes insuficientes")
          fimse
        fimse
      fimse
    fimse
    escreval("Saldo: ", osso, " ossos e ", pedra, " pedras")
    escreva("Criatura (1 esqueleto, 2 golem, 0 sair): ")
    leia(criatura)
  fimenquanto''',
    'Crie esqueletos com três ossos cada ou golems com dois ossos e uma pedra cada. Toda criação deve caber integralmente no inventário.',
    'Com 8 ossos e 2 pedras, dois golems usam 4 ossos e 2 pedras',
    'Pedido acima do inventário é recusado sem gasto parcial.',
    'A receita escolhida define o consumo antes de qualquer desconto de componentes.',
    ['Defina custo por criatura.', 'Multiplique pela quantidade.', 'Valide os dois saldos antes de subtrair.'])

add(11, '''  nome: vetor[1..5] de caractere
  inicioMin, duracao: vetor[1..5] de inteiro
  i, j, troca, fimAnterior: inteiro
  trocaNome: caractere''', '''  para i de 1 ate 5 faca
    escreva("Atividade ", i, ": ")
    leia(nome[i])
    escreva("Hora de início (0 a 23): ")
    leia(inicioMin[i])
    escreva("Duração em horas: ")
    leia(duracao[i])
    se inicioMin[i] < 18 entao
      inicioMin[i] <- inicioMin[i] + 24
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se inicioMin[j] < inicioMin[i] entao
        troca <- inicioMin[i]
        inicioMin[i] <- inicioMin[j]
        inicioMin[j] <- troca
        troca <- duracao[i]
        duracao[i] <- duracao[j]
        duracao[j] <- troca
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  fimAnterior <- 18
  para i de 1 ate 5 faca
    escreval(nome[i], ": da hora ", inicioMin[i] mod 24, " até ", (inicioMin[i] + duracao[i]) mod 24)
    se inicioMin[i] < fimAnterior entao
      escreval("Conflito com atividade anterior")
    fimse
    se inicioMin[i] + duracao[i] > fimAnterior entao
      fimAnterior <- inicioMin[i] + duracao[i]
    fimse
  fimpara''',
    'A noite começa às 18h e termina às 18h seguintes. Converta horas 0–17 para dia seguinte, ordene cinco atividades e sinalize sobreposição.',
    'Atividade 23h por 2h termina à 1h do dia seguinte',
    'Durações não negativas e horas 0–23 são pré-condições de entrada.',
    'Representar a madrugada como horas 24–41 mantém a ordem cronológica contínua.',
    ['Converta horas da madrugada.', 'Ordene por início convertido.', 'Compare início com o maior fim anterior.'])

add(12, '''  teia: vetor[1..7, 1..7] de caractere
  linha, coluna, intersecoes: inteiro''', '''  intersecoes <- 0
  para linha de 1 ate 7 faca
    para coluna de 1 ate 7 faca
      teia[linha, coluna] <- " "
      se (linha = 4) ou (coluna = 4) ou (linha = coluna) ou (linha + coluna = 8) entao
        teia[linha, coluna] <- "*"
      fimse
      se (linha = 4) e (coluna = 4) entao
        teia[linha, coluna] <- "O"
        intersecoes <- intersecoes + 1
      fimse
      escreva(teia[linha, coluna])
    fimpara
    escreval("")
  fimpara
  escreval("Interseção central: ", intersecoes)''',
    'Desenhe teia 7×7: linha e coluna centrais e as duas diagonais recebem asterisco; o cruzamento central recebe O.',
    '*  *  *\n * * * \n  ***  \n***O***\n  ***  \n * * * \n*  *  *\nInterseção central: 1',
    'Células que pertencem a mais de uma linha são impressas uma só vez na matriz.',
    'Condições de linha, coluna e diagonais determinam os pontos da figura.',
    ['Percorra matriz 7×7.', 'Teste eixos e diagonais.', 'Marque o centro por último.'])

add(13, '''  chave1, chave2, porta1, porta2: inteiro
  acao: inteiro''', '''  chave1 <- 0
  chave2 <- 0
  porta1 <- 0
  porta2 <- 0
  escreva("Ação (1 pegar chave 1, 2 abrir porta 1, 3 pegar chave 2, 4 abrir porta 2, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escolha acao
      caso 1
        chave1 <- 1
        escreval("Primeira chave encontrada")
      caso 2
        se chave1 = 1 entao
          porta1 <- 1
          escreval("Porta 1 aberta")
        senao
          escreval("Porta 1 trancada")
        fimse
      caso 3
        se porta1 = 1 entao
          chave2 <- 1
          escreval("Segunda chave encontrada")
        senao
          escreval("A chave 2 está atrás da porta 1")
        fimse
      caso 4
        se (porta1 = 1) e (chave2 = 1) entao
          porta2 <- 1
          escreval("Porta 2 aberta; castelo concluído")
        senao
          escreval("Porta 2 trancada")
        fimse
    fimescolha
    escreva("Próxima ação (0 sair): ")
    leia(acao)
  fimenquanto
  escreval("Portas abertas: ", porta1 + porta2)''',
    'A porta 1 exige chave 1; atrás dela está chave 2; a porta 2 exige que porta 1 esteja aberta e chave 2 tenha sido encontrada.',
    'Pegar chave 1 → abrir porta 1 → pegar chave 2 → abrir porta 2',
    'Tentar pegar chave 2 antes de abrir porta 1 é recusado.',
    'Quatro estados lógicos inteiros representam chaves obtidas e portas abertas.',
    ['Guarde as chaves.', 'Valide pré-requisito de cada porta.', 'Atualize estados após ação válida.'])

add(14, '''  faseInicial, dia, fase: inteiro''', '''  escreva("Fase inicial (1 nova, 2 crescente, 3 cheia, 4 minguante): ")
  leia(faseInicial)
  se (faseInicial < 1) ou (faseInicial > 4) entao
    escreval("Fase inválida")
  senao
    para dia de 1 ate 28 faca
      fase <- ((faseInicial - 1 + (dia - 1) div 7) mod 4) + 1
      escreva("Dia ", dia, ": ")
      escolha fase
        caso 1
          escreval("nova")
        caso 2
          escreval("crescente")
        caso 3
          escreval("cheia")
        caso 4
          escreval("minguante")
      fimescolha
    fimpara
  fimse''',
    'O calendário fictício dura 28 dias em quatro fases de sete dias. Comece na fase 1–4 informada e avance ciclicamente a cada sete dias.',
    'Fase inicial nova: dias 1–7 nova, 8–14 crescente, 15–21 cheia, 22–28 minguante',
    'Após a fase 4, o índice volta à fase 1.',
    'Divisão inteira por sete encontra quantas mudanças ocorreram; módulo quatro fecha o ciclo.',
    ['Agrupe dias em blocos de sete.', 'Some o deslocamento à fase inicial.', 'Use mod 4.'])

add(15, '''  vida, defesa, energia, fraqueza: vetor[1..2] de inteiro
  turno, atacante, alvo, dano, pocao: inteiro''', '''  para atacante de 1 ate 2 faca
    escreva("Monstro ", atacante, " vida, defesa e energia: ")
    leia(vida[atacante], defesa[atacante], energia[atacante])
    escreva("Fraqueza a poção? (0/1): ")
    leia(fraqueza[atacante])
  fimpara
  pocao <- 2
  para turno de 1 ate 8 faca
    atacante <- 1
    alvo <- 2
    se turno mod 2 = 0 entao
      atacante <- 2
      alvo <- 1
    fimse
    se (vida[1] > 0) e (vida[2] > 0) entao
      escreva("Usar poção neste turno? (0/1): ")
      leia(dano)
      se (dano = 1) e (pocao > 0) entao
        pocao <- pocao - 1
        dano <- 4
        se fraqueza[alvo] = 1 entao
          dano <- 8
        fimse
      senao
        dano <- 6
        se energia[atacante] > 0 entao
          energia[atacante] <- energia[atacante] - 1
        senao
          dano <- 0
        fimse
      fimse
      dano <- dano - defesa[alvo]
      se dano < 0 entao
        dano <- 0
      fimse
      vida[alvo] <- vida[alvo] - dano
      se vida[alvo] < 0 entao
        vida[alvo] <- 0
      fimse
      escreval("Turno ", turno, ": dano ", dano, "; vida alvo ", vida[alvo], "; poções ", pocao)
    fimse
  fimpara
  escreval("Vida final: ", vida[1], " x ", vida[2])''',
    'Dois monstros alternam oito turnos. Ataque comum custa uma energia e causa 6 menos defesa. Há duas poções; cada uma causa 4 ou 8 contra alvo fraco, também reduzidas pela defesa.',
    'Poção contra alvo fraco de defesa 2 → 6 de dano',
    'Sem energia, ataque comum causa zero; vida e dano nunca ficam negativos.',
    'A escolha de ação usa recursos diferentes e a fraqueza altera apenas a poção.',
    ['Alterne monstros.', 'Confira energia ou poções.', 'Aplique fraqueza e defesa antes de reduzir vida.'])

add(16, '''  nome: vetor[1..4] de caractere
  nota, penalidade, finalNota: vetor[1..4] de real
  i, j, troca: inteiro
  trocaR: real
  trocaNome: caractere''', '''  para i de 1 ate 4 faca
    escreva("Monstro ", i, ": ")
    leia(nome[i])
    escreva("Nota de criatividade (peso 2): ")
    leia(nota[i])
    escreva("Nota de fantasia (peso 1): ")
    leia(finalNota[i])
    escreva("Penalidade: ")
    leia(penalidade[i])
    finalNota[i] <- (2 * nota[i] + finalNota[i]) / 3 - penalidade[i]
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se finalNota[j] > finalNota[i] entao
        trocaR <- finalNota[i]
        finalNota[i] <- finalNota[j]
        finalNota[j] <- trocaR
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    escreval(i, "º ", nome[i], ": ", finalNota[i])
    se (i > 1) e (finalNota[i] = finalNota[i - 1]) entao
      escreval("Empatado com a posição anterior")
    fimse
  fimpara''',
    'Quatro monstros recebem criatividade com peso 2, fantasia com peso 1 e penalidade subtraída. Ordene e mostre pódio dos três primeiros, indicando empates.',
    'Criatividade 9, fantasia 6, penalidade 1 → nota final 7',
    'Empate mantém ordem de cadastro e é sinalizado no pódio.',
    'A média ponderada precede a penalidade; a ordenação mantém nome e nota juntos.',
    ['Aplique pesos 2 e 1.', 'Subtraia penalidade.', 'Ordene e compare notas vizinhas.'])

add(17, '''  sala, acao, chave, venceu: inteiro''', '''  sala <- 1
  chave <- 0
  venceu <- 0
  enquanto venceu = 0 faca
    escreval("Sala ", sala, " (1 salão, 2 biblioteca, 3 torre, 4 saída)")
    escreva("Ação (1 salão, 2 biblioteca, 3 torre, 4 saída, 5 explorar, 0 encerrar): ")
    leia(acao)
    escolha acao
      caso 0
        venceu <- 2
      caso 1
        sala <- 1
      caso 2
        se (sala = 1) ou (sala = 2) entao
          sala <- 2
        senao
          escreval("Porta não conecta estas salas")
        fimse
      caso 3
        se (sala = 2) ou (sala = 3) entao
          sala <- 3
        senao
          escreval("Passe pela biblioteca")
        fimse
      caso 4
        se (sala = 3) e (chave = 1) entao
          sala <- 4
          venceu <- 1
          escreval("Você escapou!")
        senao
          escreval("Saída trancada ou distante")
        fimse
      caso 5
        se sala = 2 entao
          chave <- 1
          escreval("Chave encontrada")
        senao
          escreval("Nada encontrado")
        fimse
    fimescolha
  fimenquanto''',
    'Salão liga à biblioteca, biblioteca à torre, torre à saída. A chave está na biblioteca e é necessária para abrir a saída.',
    'Salão → biblioteca → explorar → torre → saída → vitória',
    'Tentar sair da sala errada ou sem chave não move o jogador.',
    'Uma variável guarda a sala atual e outra registra a chave encontrada.',
    ['Defina conexões das salas.', 'Guarde a chave.', 'Valide porta e condição de vitória.'])

add(18, '''  casa: vetor[1..10] de inteiro
  i, numero, doces, total: inteiro''', '''  para i de 1 ate 10 faca
    casa[i] <- 0
  fimpara
  total <- 0
  para i de 1 ate 12 faca
    escreva("Casa visitada (1 a 10): ")
    leia(numero)
    escreva("Doces oferecidos: ")
    leia(doces)
    se (numero >= 1) e (numero <= 10) e (doces >= 0) entao
      se casa[numero] = 0 entao
        casa[numero] <- 1
        total <- total + doces
        escreval("Visita registrada")
      senao
        escreval("Casa repetida; doces não contados")
      fimse
    fimse
  fimpara
  escreval("Doces contabilizados: ", total)''',
    'Doze tentativas de visita escolhem casas numeradas 1–10. Conte doces somente da primeira visita válida a cada casa.',
    'Casa 3 oferece 5 doces na primeira e 5 na segunda → total contado 5',
    'Número fora de 1–10 não acessa o vetor.',
    'Um vetor de estados marca casas já visitadas para impedir contagem duplicada.',
    ['Valide o número da casa.', 'Consulte se já foi visitada.', 'Some doces apenas na primeira vez.'])

add(19, '''  ingrediente1, ingrediente2, efeito: inteiro''', '''  escreva("Primeiro ingrediente (1 erva, 2 cristal, 3 flor): ")
  leia(ingrediente1)
  escreva("Segundo ingrediente (1 erva, 2 cristal, 3 flor): ")
  leia(ingrediente2)
  efeito <- 0
  se ((ingrediente1 = 1) e (ingrediente2 = 2)) ou ((ingrediente1 = 2) e (ingrediente2 = 1)) entao
    efeito <- 1
  fimse
  se ((ingrediente1 = 1) e (ingrediente2 = 3)) ou ((ingrediente1 = 3) e (ingrediente2 = 1)) entao
    efeito <- 2
  fimse
  se ((ingrediente1 = 2) e (ingrediente2 = 3)) ou ((ingrediente1 = 3) e (ingrediente2 = 2)) entao
    efeito <- 3
  fimse
  escolha efeito
    caso 1
      escreval("Poção de força")
    caso 2
      escreval("Poção de cura")
    caso 3
      escreval("Poção de visão")
    outrocaso
      escreval("Combinação sem receita")
  fimescolha''',
    'Misture dois ingredientes entre erva, cristal e flor. Erva+cristal dá força, erva+flor cura, cristal+flor visão; ordem não importa.',
    'Cristal + erva → poção de força',
    'Ingredientes iguais ou códigos inválidos não formam receita.',
    'Condições simétricas reconhecem cada par em qualquer ordem.',
    ['Liste os três pares válidos.', 'Considere as duas ordens.', 'Associe o efeito.'])

add(20, '''  i, consecutivas, alertas: inteiro
  visibilidade, limite: real''', '''  escreva("Limite crítico de visibilidade (m): ")
  leia(limite)
  consecutivas <- 0
  alertas <- 0
  para i de 1 ate 12 faca
    escreva("Visibilidade da leitura ", i, ": ")
    leia(visibilidade)
    se visibilidade < limite entao
      consecutivas <- consecutivas + 1
      se consecutivas = 3 entao
        alertas <- alertas + 1
        escreval("Alerta de névoa acionado")
      fimse
    senao
      consecutivas <- 0
    fimse
  fimpara
  escreval("Períodos com alerta: ", alertas)''',
    'Em doze leituras, acione um alerta quando se completarem três valores críticos consecutivos abaixo do limite. Um período longo gera apenas um alerta.',
    'Leituras 50,40,30 com limite 60 → alerta na terceira',
    'Leitura no limite interrompe a sequência.',
    'O alerta dispara ao atingir exatamente três; o contador segue acima de três sem novo disparo até sair da faixa.',
    ['Conte leituras críticas seguidas.', 'Zere no valor seguro.', 'Dispare ao chegar a três.'])

add(21, '''  carga, acao, custo, posicao: inteiro''', '''  carga <- 20
  posicao <- 1
  escreva("Trajeto (1 curto custa 3, 2 longo custa 5, 3 recarregar 10, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    custo <- 0
    se acao = 1 entao
      custo <- 3
    fimse
    se acao = 2 entao
      custo <- 5
    fimse
    se custo > 0 entao
      se carga >= custo entao
        carga <- carga - custo
        posicao <- posicao + 1
        escreval("Avançou ao ponto ", posicao)
      senao
        escreval("Carga insuficiente")
      fimse
    fimse
    se acao = 3 entao
      carga <- carga + 10
      se carga > 20 entao
        carga <- 20
      fimse
    fimse
    escreval("Carga ", carga, "/20, ponto ", posicao)
    escreva("Próximo trajeto (0 sair): ")
    leia(acao)
  fimenquanto''',
    'Lanterna começa com 20 unidades. Trajeto curto custa 3, longo custa 5; recarga acrescenta até 10 sem exceder 20. Só avance se houver energia.',
    'Carga 4: trajeto longo é recusado; curto avança e deixa carga 1',
    'Carga nunca desce abaixo de zero nem supera 20.',
    'O custo do trajeto é validado antes de atualizar carga e posição.',
    ['Associe ação a custo.', 'Compare custo com carga.', 'Atualize posição só após gastar energia.'])

add(22, '''  grade: vetor[1..3, 1..8] de caractere
  voz, turno: inteiro''', '''  para voz de 1 ate 3 faca
    para turno de 1 ate 8 faca
      grade[voz, turno] <- "."
    fimpara
  fimpara
  para turno de 1 ate 8 faca
    voz <- ((turno - 1) mod 3) + 1
    grade[voz, turno] <- "B"
    se turno mod 4 = 0 entao
      grade[1, turno] <- "B"
      grade[2, turno] <- "B"
      grade[3, turno] <- "B"
    fimse
  fimpara
  para voz de 1 ate 3 faca
    escreva("Voz ", voz, ": ")
    para turno de 1 ate 8 faca
      escreva(grade[voz, turno], " ")
    fimpara
    escreval("")
  fimpara''',
    'Em oito turnos, três vozes entram alternadamente. A cada quarto turno, todas cantam juntas. B marca entrada, ponto marca silêncio.',
    'Turnos 1,2,3 ativam vozes 1,2,3; turno 4 ativa as três',
    'A grade fixa tem três linhas e oito colunas.',
    'Módulo três alterna a voz solo; a regra do quarto turno sobrescreve a coluna para canto coletivo.',
    ['Inicialize a grade com pontos.', 'Marque a voz do turno.', 'Sobrescreva múltiplos de quatro.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')

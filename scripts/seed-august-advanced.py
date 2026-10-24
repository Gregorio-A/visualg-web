#!/usr/bin/env python3
"""Curated advanced August exercises based on the challenge CSV."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'08-{day:02d}'
    prompt = rows[date]['avancado_enunciado']
    code = f'algoritmo "Desafio08{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/avancado'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  nome: vetor[1..10] de caractere
  pontos: vetor[1..10] de inteiro
  i, j, troca: inteiro
  trocaNome: caractere''', '''  para i de 1 ate 10 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
    escreva("Pontuação: ")
    leia(pontos[i])
  fimpara
  para i de 1 ate 9 faca
    para j de i + 1 ate 10 faca
      se pontos[j] > pontos[i] entao
        troca <- pontos[i]
        pontos[i] <- pontos[j]
        pontos[j] <- troca
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º ", nome[i], ": ", pontos[i], " pontos")
  fimpara''',
    'Cadastre dez jogadores. Ordene por pontuação decrescente e mostre os cinco primeiros com seus nomes.',
    'Ana 100, Beto 80 → Ana antes de Beto',
    'Empate preserva a ordem de cadastro.',
    'As trocas movem nomes e pontuações juntos para não perder a ligação entre eles.',
    ['Guarde nome e pontuação no mesmo índice.', 'Compare pontos.', 'Troque os dois campos juntos.'])

add(2, '''  vida, defesa, energia: vetor[1..2] de inteiro
  turno, atacante, alvo, dano, bloqueio: inteiro''', '''  para atacante de 1 ate 2 faca
    escreva("Vida do personagem ", atacante, ": ")
    leia(vida[atacante])
    escreva("Defesa: ")
    leia(defesa[atacante])
    escreva("Energia: ")
    leia(energia[atacante])
  fimpara
  para turno de 1 ate 6 faca
    atacante <- 1
    alvo <- 2
    se turno mod 2 = 0 entao
      atacante <- 2
      alvo <- 1
    fimse
    se (vida[1] > 0) e (vida[2] > 0) entao
      se energia[atacante] >= 2 entao
        energia[atacante] <- energia[atacante] - 2
        dano <- 5 - defesa[alvo]
        se dano < 0 entao
          dano <- 0
        fimse
        vida[alvo] <- vida[alvo] - dano
        se vida[alvo] < 0 entao
          vida[alvo] <- 0
        fimse
        escreval("Turno ", turno, ": personagem ", atacante, " causou ", dano, " de dano")
      senao
        energia[atacante] <- energia[atacante] + 1
        escreval("Turno ", turno, ": personagem ", atacante, " recuperou 1 energia")
      fimse
    fimse
  fimpara
  escreval("Vida final: P1 ", vida[1], ", P2 ", vida[2])''',
    'Dois personagens alternam seis turnos. Ataque custa 2 de energia e causa máximo entre 0 e 5 menos defesa do alvo; sem energia, recupera 1.',
    'Alvo com defesa 2 recebe 3 de dano de ataque normal',
    'Vida não desce abaixo de zero. Sem personagens vivos, os turnos restantes não alteram o estado.',
    'Vetores guardam atributos dos dois personagens e os índices alternam a cada turno.',
    ['Alterne atacante por paridade.', 'Consuma energia antes do ataque.', 'Limite dano e vida inferiormente.'])

add(3, '''  obstaculo: vetor[1..5, 1..5] de inteiro
  linha, coluna, i, novaL, novaC: inteiro
  tecla: caractere''', '''  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      obstaculo[linha, coluna] <- 0
    fimpara
  fimpara
  obstaculo[2, 2] <- 1
  obstaculo[3, 3] <- 1
  obstaculo[4, 4] <- 1
  linha <- 1
  coluna <- 1
  para i de 1 ate 10 faca
    escreva("Tecla ", i, " (W/A/S/D): ")
    leia(tecla)
    novaL <- linha
    novaC <- coluna
    escolha maiusc(tecla)
      caso "W"
        novaL <- novaL - 1
      caso "S"
        novaL <- novaL + 1
      caso "A"
        novaC <- novaC - 1
      caso "D"
        novaC <- novaC + 1
    fimescolha
    se (novaL >= 1) e (novaL <= 5) e (novaC >= 1) e (novaC <= 5) entao
      se obstaculo[novaL, novaC] = 0 entao
        linha <- novaL
        coluna <- novaC
      senao
        escreval("Obstáculo na posição desejada")
      fimse
    senao
      escreval("Limite da grade")
    fimse
    escreval("Posição: (", linha, ",", coluna, ")")
  fimpara''',
    'Mova um personagem dez vezes numa grade 5×5. Comece em (1,1); obstáculos fixos ocupam (2,2), (3,3) e (4,4). Não atravesse bordas nem obstáculos.',
    'De (1,1), D → (1,2); S tenta (2,2), mas permanece (1,2)',
    'Tecla diferente de W/A/S/D não move o personagem.',
    'Cada comando propõe uma nova célula; a posição só é atualizada quando a célula é válida e livre.',
    ['Guarde linha e coluna.', 'Calcule a posição candidata.', 'Valide borda e obstáculo antes de mover.'])

add(4, '''  fps: vetor[1..10] de real
  i, baixos: inteiro
  soma, menor: real''', '''  soma <- 0
  menor <- 999999999
  baixos <- 0
  para i de 1 ate 10 faca
    escreva("FPS da medição ", i, ": ")
    leia(fps[i])
    se fps[i] < 0 entao
      fps[i] <- 0
    fimse
    soma <- soma + fps[i]
    se fps[i] < menor entao
      menor <- fps[i]
    fimse
    se fps[i] < 30 entao
      baixos <- baixos + 1
    fimse
  fimpara
  escreval("Média: ", soma / 10, " FPS")
  escreval("Mínima: ", menor, " FPS")
  escreval("Abaixo de 30 FPS: ", baixos * 10, "%")''',
    'Leia dez medições de FPS. Calcule média, mínimo e a porcentagem de amostras estritamente abaixo de 30.',
    'Três amostras abaixo de 30 em dez → 30%',
    'Valor negativo é tratado como zero nesta simulação.',
    'Com dez amostras, cada ocorrência abaixo de 30 equivale a dez pontos percentuais.',
    ['Some leituras para a média.', 'Guarde o menor valor.', 'Conte as leituras abaixo de 30.'])

add(5, '''  nome: vetor[1..10] de caractere
  tamanho: vetor[1..10] de inteiro
  i, acao, usado, capacidade, pedido, achado: inteiro
  busca: caractere''', '''  escreva("Capacidade total de memória: ")
  leia(capacidade)
  usado <- 0
  para i de 1 ate 10 faca
    nome[i] <- ""
    tamanho[i] <- 0
  fimpara
  escreva("Ação (1 reservar, 2 liberar, 3 consultar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      escreva("Identificador do bloco: ")
      leia(busca)
      escreva("Tamanho: ")
      leia(pedido)
      achado <- 0
      para i de 1 ate 10 faca
        se nome[i] = busca entao
          achado <- -1
        fimse
      fimpara
      se achado = 0 entao
        para i de 10 ate 1 passo -1 faca
          se nome[i] = "" entao
            achado <- i
          fimse
        fimpara
      fimse
      se (achado > 0) e (pedido > 0) e (usado + pedido <= capacidade) entao
        nome[achado] <- busca
        tamanho[achado] <- pedido
        usado <- usado + pedido
        escreval("Bloco reservado")
      senao
        escreval("Reserva recusada")
      fimse
    senao
      se acao = 2 entao
        escreva("Identificador a liberar: ")
        leia(busca)
        achado <- 0
        para i de 1 ate 10 faca
          se nome[i] = busca entao
            achado <- i
          fimse
        fimpara
        se achado > 0 entao
          usado <- usado - tamanho[achado]
          nome[achado] <- ""
          tamanho[achado] <- 0
          escreval("Bloco liberado")
        senao
          escreval("Bloco não encontrado")
        fimse
      senao
        se acao = 3 entao
          escreval("Usado: ", usado, "; livre: ", capacidade - usado)
        fimse
      fimse
    fimse
    escreva("Ação (1 reservar, 2 liberar, 3 consultar, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Simule até dez blocos identificados por nome. Reserva exige nome novo, tamanho positivo, vaga no catálogo e capacidade livre; liberação devolve o espaço.',
    'Capacidade 100; reserva A=30 → livre 70; libera A → livre 100',
    'Identificador duplicado ou bloco inexistente é recusado.',
    'Vetores guardam o tamanho de cada bloco; a soma usada é atualizada nas reservas e liberações.',
    ['Guarde nome e tamanho de cada bloco.', 'Valide a capacidade antes de reservar.', 'Subtraia o tamanho exato ao liberar.'])

add(6, '''  usuario, senha: vetor[1..3] de caractere
  falhas, bloqueado: vetor[1..3] de inteiro
  i, tentativa, encontrado: inteiro
  busca, digitada: caractere''', '''  para i de 1 ate 3 faca
    escreva("Usuário ", i, ": ")
    leia(usuario[i])
    escreva("Senha: ")
    leia(senha[i])
    falhas[i] <- 0
    bloqueado[i] <- 0
  fimpara
  para tentativa de 1 ate 8 faca
    escreva("Login: ")
    leia(busca)
    escreva("Senha: ")
    leia(digitada)
    encontrado <- 0
    para i de 1 ate 3 faca
      se usuario[i] = busca entao
        encontrado <- i
      fimse
    fimpara
    se encontrado = 0 entao
      escreval("Usuário não encontrado")
    senao
      se bloqueado[encontrado] = 1 entao
        escreval("Perfil bloqueado")
      senao
        se senha[encontrado] = digitada entao
          falhas[encontrado] <- 0
          escreval("Acesso liberado")
        senao
          falhas[encontrado] <- falhas[encontrado] + 1
          se falhas[encontrado] >= 3 entao
            bloqueado[encontrado] <- 1
            escreval("Perfil bloqueado após três falhas")
          senao
            escreval("Senha incorreta")
          fimse
        fimse
      fimse
    fimse
  fimpara''',
    'Cadastre três usuários com nomes únicos. Oito tentativas de login são processadas; três senhas incorretas consecutivas bloqueiam o perfil.',
    'Ana erra três vezes → bloqueada; senha correta posterior não abre o perfil',
    'Um acerto antes do bloqueio zera falhas. O exercício é uma simulação didática, sem armazenamento seguro de senhas.',
    'Vetores por usuário mantêm senha, número de falhas e bloqueio independentes.',
    ['Procure o usuário.', 'Conte falhas por perfil.', 'Bloqueie ao chegar a três.'])

add(7, '''  cliques: vetor[1..10] de inteiro
  i, janela, soma, melhor, inicioMelhor: inteiro''', '''  para i de 1 ate 10 faca
    escreva("Cliques no segundo ", i, ": ")
    leia(cliques[i])
    se cliques[i] < 0 entao
      cliques[i] <- 0
    fimse
  fimpara
  melhor <- -1
  para janela de 1 ate 8 faca
    soma <- cliques[janela] + cliques[janela + 1] + cliques[janela + 2]
    se soma > melhor entao
      melhor <- soma
      inicioMelhor <- janela
    fimse
  fimpara
  escreval("Melhor janela de 3 segundos: ", inicioMelhor, " a ", inicioMelhor + 2, "; ", melhor, " cliques")''',
    'Leia dez contagens por segundo. Encontre a janela consecutiva de três segundos com maior soma de cliques.',
    'Contagens 1, 5, 4, 0... → janela 1–3 soma 10',
    'Empate preserva a janela mais cedo. Contagem negativa é tratada como zero.',
    'A janela desliza uma posição por vez e compara as oito somas possíveis.',
    ['Guarde dez contagens.', 'Some três posições consecutivas.', 'Guarde o melhor início.'])

add(8, '''  saldo, estoque, inventario: vetor[1..3] de inteiro
  preco: vetor[1..3] de inteiro
  i, moedas, acao, item, quantidade, valor: inteiro''', '''  escreva("Moedas iniciais: ")
  leia(moedas)
  para i de 1 ate 3 faca
    escreva("Preço do item ", i, ": ")
    leia(preco[i])
    escreva("Estoque da loja: ")
    leia(estoque[i])
    inventario[i] <- 0
  fimpara
  escreva("Ação (1 comprar, 2 vender, 3 consultar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao = 1) ou (acao = 2) entao
      escreva("Item (1 a 3): ")
      leia(item)
      escreva("Quantidade: ")
      leia(quantidade)
      se (item < 1) ou (item > 3) ou (quantidade <= 0) entao
        escreval("Pedido inválido")
      senao
        valor <- preco[item] * quantidade
        se (acao = 1) e (quantidade <= estoque[item]) e (valor <= moedas) e (preco[item] >= 0) entao
          moedas <- moedas - valor
          estoque[item] <- estoque[item] - quantidade
          inventario[item] <- inventario[item] + quantidade
          escreval("Compra concluída")
        senao
          se (acao = 2) e (quantidade <= inventario[item]) e (preco[item] >= 0) entao
            moedas <- moedas + valor div 2
            inventario[item] <- inventario[item] - quantidade
            estoque[item] <- estoque[item] + quantidade
            escreval("Venda concluída por ", valor div 2, " moeda(s)")
          senao
            escreval("Operação recusada")
          fimse
        fimse
      fimse
    senao
      se acao = 3 entao
        escreval("Moedas: ", moedas)
        para i de 1 ate 3 faca
          escreval("Item ", i, ": loja ", estoque[i], ", mochila ", inventario[i])
        fimpara
      fimse
    fimse
    escreva("Ação (1 comprar, 2 vender, 3 consultar, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Compre itens inteiros se houver estoque e moedas. Venda itens da mochila à metade do preço de tabela, arredondada para baixo.',
    'Item custa 10 moedas: compra por 10, venda por 5',
    'Compra sem saldo ou venda sem item é recusada sem alterar inventário.',
    'Três vetores acompanham preço, estoque da loja e inventário do jogador.',
    ['Valide saldo para comprar.', 'Valide inventário para vender.', 'Atualize moedas e quantidades juntos.'])

add(9, '''  limite: vetor[1..5] de inteiro
  nivel, xp, ganho, i: inteiro''', '''  limite[1] <- 10
  limite[2] <- 20
  limite[3] <- 30
  limite[4] <- 40
  limite[5] <- 50
  xp <- 0
  nivel <- 1
  para i de 1 ate 8 faca
    escreva("XP ganho na etapa ", i, ": ")
    leia(ganho)
    se ganho > 0 entao
      xp <- xp + ganho
    fimse
    enquanto nivel <= 5 faca
      se xp >= limite[nivel] entao
        xp <- xp - limite[nivel]
        nivel <- nivel + 1
        escreval("Subiu para nível ", nivel)
      senao
        interrompa
      fimse
    fimenquanto
    escreval("Etapa ", i, ": nível ", nivel, ", XP restante ", xp)
  fimpara''',
    'Cinco custos sucessivos de nível são 10, 20, 30, 40 e 50 XP. Leia oito ganhos e suba quantos níveis a XP acumulada permitir.',
    'Ganho de 35 XP no nível 1 → paga 10 e 20; chega ao nível 3 com 5 XP',
    'Nível máximo 6 não consome XP adicional.',
    'O laço interno desconta custos sucessivos até faltar XP ou atingir o máximo.',
    ['Guarde XP restante.', 'Use tabela de custos.', 'Repita subidas enquanto houver XP suficiente.'])

add(10, '''  frequencia: vetor[1..6] de inteiro
  i, dado, atual, maior, anterior: inteiro''', '''  para i de 1 ate 6 faca
    frequencia[i] <- 0
  fimpara
  atual <- 0
  maior <- 0
  anterior <- 0
  para i de 1 ate 12 faca
    escreva("Lançamento ", i, " (1 a 6): ")
    leia(dado)
    se (dado >= 1) e (dado <= 6) entao
      frequencia[dado] <- frequencia[dado] + 1
      se dado = anterior entao
        atual <- atual + 1
      senao
        atual <- 1
      fimse
      anterior <- dado
      se atual > maior entao
        maior <- atual
      fimse
    senao
      atual <- 0
      anterior <- 0
    fimse
  fimpara
  para i de 1 ate 6 faca
    escreval("Face ", i, ": ", frequencia[i], " vez(es)")
  fimpara
  escreval("Maior sequência da mesma face: ", maior)''',
    'Leia doze resultados de um dado. Conte a frequência de cada face e a maior sequência consecutiva da mesma face.',
    'Resultados 2,2,2,4 → face 2 três vezes; maior sequência 3',
    'Resultado fora de 1–6 interrompe a sequência e não entra nas frequências.',
    'O vetor conta faces; dois contadores acompanham sequência atual e máxima.',
    ['Conte cada face por índice.', 'Compare com lançamento anterior.', 'Atualize o maior trecho.'])

add(11, '''  precoCpu, precoMem, precoDisco: vetor[1..3] de real
  geracaoCpu, geracaoMem: vetor[1..3] de inteiro
  i, cpu, mem, disco: inteiro
  teto, total, melhor: real
  melhorCpu, melhorMem, melhorDisco: inteiro''', '''  escreva("Orçamento máximo: ")
  leia(teto)
  para i de 1 ate 3 faca
    escreva("CPU ", i, ": preço e geração (1 ou 2): ")
    leia(precoCpu[i], geracaoCpu[i])
    escreva("Memória ", i, ": preço e geração (1 ou 2): ")
    leia(precoMem[i], geracaoMem[i])
    escreva("Disco ", i, ": preço: ")
    leia(precoDisco[i])
  fimpara
  melhor <- -1
  para cpu de 1 ate 3 faca
    para mem de 1 ate 3 faca
      para disco de 1 ate 3 faca
        total <- precoCpu[cpu] + precoMem[mem] + precoDisco[disco]
        se (geracaoCpu[cpu] = geracaoMem[mem]) e (precoCpu[cpu] >= 0) e (precoMem[mem] >= 0) e (precoDisco[disco] >= 0) e (total <= teto) entao
          se total > melhor entao
            melhor <- total
            melhorCpu <- cpu
            melhorMem <- mem
            melhorDisco <- disco
          fimse
        fimse
      fimpara
    fimpara
  fimpara
  se melhor < 0 entao
    escreval("Nenhuma montagem compatível cabe no orçamento")
  senao
    escreval("CPU ", melhorCpu, ", memória ", melhorMem, ", disco ", melhorDisco, "; R$ ", melhor)
  fimse''',
    'Escolha uma CPU, uma memória e um disco entre três opções de cada. CPU e memória são compatíveis quando suas gerações coincidem; maximize o uso do orçamento.',
    'CPU geração 2 e memória geração 2 podem formar um conjunto; gerações 1 e 2 não podem',
    'Preço negativo invalida uma peça. Empate preserva a primeira montagem encontrada.',
    'Três laços percorrem as 27 combinações; filtros de geração e teto selecionam as viáveis.',
    ['Combine uma peça de cada categoria.', 'Confira a geração.', 'Compare o preço total com o teto.'])

add(12, '''  nome: vetor[1..10] de caractere
  tamanho, categoria: vetor[1..10] de inteiro
  capacidade, usado, acao, i, livre, encontrado, novoTamanho: inteiro
  busca: caractere''', '''  escreva("Capacidade do disco em MB: ")
  leia(capacidade)
  usado <- 0
  para i de 1 ate 10 faca
    nome[i] <- ""
    tamanho[i] <- 0
  fimpara
  escreva("Ação (1 incluir, 2 excluir, 3 relatório, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      escreva("Nome do arquivo: ")
      leia(busca)
      escreva("Tamanho em MB: ")
      leia(novoTamanho)
      escreva("Categoria (1 foto, 2 vídeo, 3 outro): ")
      leia(livre)
      encontrado <- 0
      para i de 1 ate 10 faca
        se nome[i] = busca entao
          encontrado <- -1
        fimse
      fimpara
      se encontrado = 0 entao
        para i de 10 ate 1 passo -1 faca
          se nome[i] = "" entao
            encontrado <- i
          fimse
        fimpara
      fimse
      se (encontrado > 0) e (novoTamanho > 0) e (livre >= 1) e (livre <= 3) e (usado + novoTamanho <= capacidade) entao
        nome[encontrado] <- busca
        tamanho[encontrado] <- novoTamanho
        categoria[encontrado] <- livre
        usado <- usado + novoTamanho
        escreval("Arquivo incluído")
      senao
        escreval("Inclusão recusada")
      fimse
    senao
      se acao = 2 entao
        escreva("Nome a excluir: ")
        leia(busca)
        encontrado <- 0
        para i de 1 ate 10 faca
          se nome[i] = busca entao
            encontrado <- i
          fimse
        fimpara
        se encontrado > 0 entao
          usado <- usado - tamanho[encontrado]
          nome[encontrado] <- ""
          tamanho[encontrado] <- 0
          escreval("Arquivo excluído")
        senao
          escreval("Arquivo não encontrado")
        fimse
      senao
        se acao = 3 entao
          escreval("Usado: ", usado, " MB; livre: ", capacidade - usado, " MB")
          para i de 1 ate 10 faca
            se nome[i] <> "" entao
              escreval(nome[i], ": ", tamanho[i], " MB, categoria ", categoria[i])
            fimse
          fimpara
        fimse
      fimse
    fimse
    escreva("Ação (1 incluir, 2 excluir, 3 relatório, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Simule até dez arquivos nomeados. Inclusão exige nome único, categoria 1–3, tamanho positivo e espaço suficiente; exclusão libera o tamanho ocupado.',
    'Disco 100 MB; inclui foto de 20 MB → 80 MB livres; exclui → 100 MB livres',
    'Nome duplicado é recusado. Capacidade menor que o arquivo impede inclusão.',
    'Vetores guardam nome, tamanho e categoria de cada arquivo; o uso é atualizado em cada operação.',
    ['Procure nome antes de incluir.', 'Valide espaço disponível.', 'Devolva o espaço na exclusão.'])

add(13, '''  consumo: vetor[1..5] de inteiro
  sessao, carga, primeiro: inteiro''', '''  escreva("Carga inicial (0 a 100): ")
  leia(carga)
  primeiro <- 0
  para sessao de 1 ate 5 faca
    escreva("Consumo previsto da sessão ", sessao, " em pontos percentuais: ")
    leia(consumo[sessao])
    se consumo[sessao] < 0 entao
      consumo[sessao] <- 0
    fimse
    se primeiro = 0 entao
      se carga < consumo[sessao] entao
        primeiro <- sessao
        escreval("Recarregar antes da sessão ", sessao)
      senao
        carga <- carga - consumo[sessao]
        escreval("Carga após sessão ", sessao, ": ", carga, "%")
      fimse
    fimse
  fimpara
  se primeiro = 0 entao
    escreval("Todas as sessões concluídas; carga final ", carga, "%")
  fimse''',
    'Leia carga inicial e consumo de cinco sessões. Execute em ordem sem recarga automática e informe a primeira sessão que exigiria recarregar.',
    'Carga 30%; sessões gastam 10%, 15%, 10% → recarga antes da terceira',
    'Consumo negativo é tratado como zero; carga inicial deve estar entre 0 e 100.',
    'O saldo diminui por sessão até não cobrir o consumo previsto.',
    ['Guarde carga restante.', 'Compare com consumo da próxima sessão.', 'Registre a primeira insuficiente.'])

add(14, '''  resultado: vetor[1..10] de inteiro
  i, vitorias, atual, maior: inteiro''', '''  vitorias <- 0
  atual <- 0
  maior <- 0
  para i de 1 ate 10 faca
    escreva("Partida ", i, " (1 vitória, 0 derrota): ")
    leia(resultado[i])
    se resultado[i] = 1 entao
      vitorias <- vitorias + 1
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Maior sequência de vitórias: ", maior)
  escreval("Aproveitamento: ", vitorias * 10, "%")''',
    'Em dez partidas, 1 significa vitória e 0 derrota. Conte vitórias, a maior sequência consecutiva e o percentual de aproveitamento.',
    'Resultados 1,1,0,1 → maior sequência 2',
    'Entrada diferente de 1 é tratada como derrota.',
    'Cada vitória em dez partidas representa dez pontos percentuais de aproveitamento.',
    ['Conte vitórias totais.', 'Reinicie a sequência na derrota.', 'Compare com o máximo.'])

add(15, '''  volume: vetor[1..3] de inteiro
  mudo: vetor[1..3] de inteiro
  i, acao, canal, valor, soma: inteiro''', '''  para i de 1 ate 3 faca
    volume[i] <- 50
    mudo[i] <- 0
  fimpara
  escreva("Ação (1 volume, 2 mudo, 3 relatório, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao = 1) ou (acao = 2) entao
      escreva("Canal (1 a 3): ")
      leia(canal)
      se (canal >= 1) e (canal <= 3) entao
        se acao = 1 entao
          escreva("Novo volume (0 a 100): ")
          leia(valor)
          se (valor >= 0) e (valor <= 100) entao
            volume[canal] <- valor
          fimse
        senao
          mudo[canal] <- 1 - mudo[canal]
        fimse
      fimse
    senao
      se acao = 3 entao
        soma <- 0
        para i de 1 ate 3 faca
          se mudo[i] = 0 entao
            soma <- soma + volume[i]
            escreval("Canal ", i, ": ", volume[i])
          senao
            escreval("Canal ", i, ": mudo")
          fimse
        fimpara
        escreval("Volume médio efetivo: ", soma / 3)
      fimse
    fimse
    escreva("Ação (1 volume, 2 mudo, 3 relatório, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Controle três canais de 0 a 100. Mudo alterna entre ligado e desligado sem apagar o ajuste. A média efetiva inclui canais mudos como zero.',
    'Canais 30, 60 e 90; terceiro mudo → média efetiva 30',
    'Volume fora de 0–100 é recusado e mantém o ajuste anterior.',
    'Dois vetores separam nível configurado e estado de mudo.',
    ['Guarde nível e mudo separadamente.', 'Alterne mudo com 1 menos estado.', 'Some zero para canal mudo.'])

add(16, '''  concluida, liberada: vetor[1..5] de inteiro
  fase, acao, i: inteiro''', '''  para i de 1 ate 5 faca
    concluida[i] <- 0
    liberada[i] <- 0
  fimpara
  liberada[1] <- 1
  escreva("Fase concluída (1 a 5; 0 encerra): ")
  leia(fase)
  enquanto fase <> 0 faca
    se (fase < 1) ou (fase > 5) entao
      escreval("Fase inválida")
    senao
      se liberada[fase] = 0 entao
        escreval("Fase bloqueada")
      senao
        concluida[fase] <- 1
        escreval("Fase ", fase, " concluída")
        se fase < 5 entao
          liberada[fase + 1] <- 1
        fimse
      fimse
    fimse
    para i de 1 ate 5 faca
      escreval("Fase ", i, ": liberada ", liberada[i], ", concluída ", concluida[i])
    fimpara
    escreva("Fase concluída (1 a 5; 0 encerra): ")
    leia(fase)
  fimenquanto''',
    'Cinco fases formam uma sequência. Só a primeira inicia liberada; concluir uma fase libera a seguinte.',
    'Concluir fase 1 libera fase 2; tentar fase 3 antes disso é recusado',
    'Repetir uma fase já concluída mantém os estados.',
    'Vetores distintos guardam liberação e conclusão de cada etapa.',
    ['Inicialize somente fase 1 liberada.', 'Recuse fase bloqueada.', 'Libere a próxima ao concluir.'])

add(17, '''  quantidade, limite, pesoUnidade: vetor[1..3] de inteiro
  i, acao, item, unidades, pesoMaximo, pesoAtual, pesoNovo: inteiro''', '''  escreva("Peso máximo da mochila: ")
  leia(pesoMaximo)
  pesoAtual <- 0
  para i de 1 ate 3 faca
    quantidade[i] <- 0
    escreva("Limite de pilha do item ", i, ": ")
    leia(limite[i])
    escreva("Peso por unidade: ")
    leia(pesoUnidade[i])
  fimpara
  escreva("Ação (1 guardar, 2 retirar, 3 consultar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao = 1) ou (acao = 2) entao
      escreva("Item (1 a 3): ")
      leia(item)
      escreva("Unidades: ")
      leia(unidades)
      se (item < 1) ou (item > 3) ou (unidades <= 0) entao
        escreval("Operação inválida")
      senao
        pesoNovo <- unidades * pesoUnidade[item]
        se (acao = 1) e (quantidade[item] + unidades <= limite[item]) e (pesoAtual + pesoNovo <= pesoMaximo) entao
          quantidade[item] <- quantidade[item] + unidades
          pesoAtual <- pesoAtual + pesoNovo
          escreval("Item guardado")
        senao
          se (acao = 2) e (unidades <= quantidade[item]) entao
            quantidade[item] <- quantidade[item] - unidades
            pesoAtual <- pesoAtual - pesoNovo
            escreval("Item retirado")
          senao
            escreval("Operação recusada")
          fimse
        fimse
      fimse
    senao
      se acao = 3 entao
        escreval("Peso: ", pesoAtual, "/", pesoMaximo)
        para i de 1 ate 3 faca
          escreval("Item ", i, ": ", quantidade[i], "/", limite[i])
        fimpara
      fimse
    fimse
    escreva("Ação (1 guardar, 2 retirar, 3 consultar, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Mochila aceita três tipos de item. Cada um tem limite de pilha e peso unitário; guardar exige respeitar tanto a pilha quanto o peso máximo.',
    'Limite 5 itens, peso 2 cada, mochila de 10 → até 5 unidades desse item',
    'Retirada maior que o saldo é recusada. Pesos e limites informados devem ser não negativos.',
    'A mesma operação atualiza quantidade e peso, mantendo os dois limites coerentes.',
    ['Valide o limite da pilha.', 'Calcule o peso agregado.', 'Atualize peso na guarda e na retirada.'])

add(18, '''  nome: vetor[1..8] de caractere
  fase: vetor[1..8] de inteiro
  rodada, partida, a, b, vencedor, destino, i, numeroJogadores: inteiro''', '''  para i de 1 ate 8 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
  fimpara
  numeroJogadores <- 8
  rodada <- 1
  enquanto numeroJogadores > 1 faca
    destino <- 0
    escreval("Rodada ", rodada)
    para partida de 1 ate numeroJogadores div 2 faca
      a <- 2 * partida - 1
      b <- 2 * partida
      escreval(partida, ": ", nome[a], " x ", nome[b])
      escreva("Vencedor (1 primeiro, 2 segundo): ")
      leia(vencedor)
      destino <- destino + 1
      se vencedor = 2 entao
        nome[destino] <- nome[b]
      senao
        nome[destino] <- nome[a]
      fimse
    fimpara
    numeroJogadores <- destino
    rodada <- rodada + 1
  fimenquanto
  escreval("Campeão: ", nome[1])''',
    'Oito jogadores competem em eliminação simples. Em cada partida, informe 1 para o primeiro nome ou 2 para o segundo; vencedores avançam.',
    'Oito jogadores geram quatro partidas, depois duas semifinais e uma final',
    'Entrada diferente de 2 é tratada como vitória do primeiro; use apenas 1 ou 2.',
    'Após cada rodada, os vencedores substituem as primeiras posições do vetor.',
    ['Agrupe jogadores de dois em dois.', 'Copie vencedores para o início.', 'Repita até restar um.'])

add(19, '''  imagem: vetor[1..5, 1..5] de caractere
  filaL, filaC: vetor[1..25] de inteiro
  linha, coluna, inicioFila, fimFila, atualL, atualC, novoL, novoC, direcao, total: inteiro
  original, novaCor: caractere''', '''  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      escreva("Pixel (", linha, ",", coluna, ") como letra: ")
      leia(imagem[linha, coluna])
    fimpara
  fimpara
  escreva("Linha e coluna iniciais: ")
  leia(linha, coluna)
  escreva("Nova letra de cor: ")
  leia(novaCor)
  total <- 0
  se (linha >= 1) e (linha <= 5) e (coluna >= 1) e (coluna <= 5) entao
    original <- imagem[linha, coluna]
    se original <> novaCor entao
      inicioFila <- 1
      fimFila <- 1
      filaL[1] <- linha
      filaC[1] <- coluna
      imagem[linha, coluna] <- novaCor
      total <- 1
      enquanto inicioFila <= fimFila faca
        atualL <- filaL[inicioFila]
        atualC <- filaC[inicioFila]
        inicioFila <- inicioFila + 1
        para direcao de 1 ate 4 faca
          novoL <- atualL
          novoC <- atualC
          escolha direcao
            caso 1
              novoL <- novoL - 1
            caso 2
              novoL <- novoL + 1
            caso 3
              novoC <- novoC - 1
            caso 4
              novoC <- novoC + 1
          fimescolha
          se (novoL >= 1) e (novoL <= 5) e (novoC >= 1) e (novoC <= 5) entao
            se imagem[novoL, novoC] = original entao
              imagem[novoL, novoC] <- novaCor
              fimFila <- fimFila + 1
              filaL[fimFila] <- novoL
              filaC[fimFila] <- novoC
              total <- total + 1
            fimse
          fimse
        fimpara
      fimenquanto
    fimse
  fimse
  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      escreva(imagem[linha, coluna])
    fimpara
    escreval("")
  fimpara
  escreval("Pixels alterados: ", total)''',
    'Leia imagem 5×5 de letras. A partir de um pixel, substitua a cor de toda a área conexa da mesma cor por outra letra; conexão é vertical ou horizontal.',
    'Pixels A em (1,1) e (1,2) mudam juntos para B; A apenas diagonal não muda',
    'Se a nova cor já for igual à original, nenhuma célula muda.',
    'Uma fila percorre a região e pinta cada pixel antes de inseri-lo para não visitá-lo duas vezes.',
    ['Guarde cor original.', 'Explore quatro vizinhos válidos.', 'Pinte ao inserir na fila.'])

add(20, '''  restante: vetor[1..3] de inteiro
  i, banda, livre, rodadas, ativa, cota: inteiro''', '''  escreva("Banda disponível por rodada (MB): ")
  leia(banda)
  para i de 1 ate 3 faca
    escreva("MB restantes da tarefa ", i, ": ")
    leia(restante[i])
  fimpara
  se banda <= 0 entao
    escreval("Banda inválida")
  senao
    rodadas <- 0
    ativa <- 1
    enquanto (ativa > 0) e (rodadas < 1000) faca
      ativa <- 0
      para i de 1 ate 3 faca
        se restante[i] > 0 entao
          ativa <- ativa + 1
        fimse
      fimpara
      se ativa > 0 entao
        rodadas <- rodadas + 1
        cota <- banda div ativa
        se cota < 1 entao
          cota <- 1
        fimse
        livre <- banda
        para i de 1 ate 3 faca
          se (restante[i] > 0) e (livre > 0) entao
            se cota > livre entao
              cota <- livre
            fimse
            se restante[i] < cota entao
              livre <- livre - restante[i]
              restante[i] <- 0
            senao
              restante[i] <- restante[i] - cota
              livre <- livre - cota
            fimse
          fimse
        fimpara
        escreval("Após rodada ", rodadas, ": ", restante[1], ", ", restante[2], ", ", restante[3], " MB")
      fimse
    fimenquanto
    escreval("Rodadas realizadas: ", rodadas)
  fimse''',
    'Três downloads disputam banda inteira em MB por rodada. Divida a banda igualmente entre tarefas ativas; cada uma recebe até sua cota, respeitando o total.',
    'Banda 6 MB, três tarefas ativas → até 2 MB por tarefa na primeira rodada',
    'Um limite de mil rodadas evita simulação infinita com entradas extremas.',
    'A cada rodada a contagem de tarefas ativas redefine a cota e os saldos restantes são reduzidos.',
    ['Conte tarefas ativas.', 'Divida banda por essa contagem.', 'Desconte de cada tarefa sem ultrapassar a banda.'])

add(21, '''  vida, defesa, energia: vetor[1..2] de inteiro
  turno, atacante, alvo, critico, dano, efeito: inteiro''', '''  para atacante de 1 ate 2 faca
    escreva("Vida do personagem ", atacante, ": ")
    leia(vida[atacante])
    escreva("Defesa: ")
    leia(defesa[atacante])
    escreva("Energia: ")
    leia(energia[atacante])
  fimpara
  efeito <- 0
  para turno de 1 ate 8 faca
    atacante <- 1
    alvo <- 2
    se turno mod 2 = 0 entao
      atacante <- 2
      alvo <- 1
    fimse
    se (vida[1] > 0) e (vida[2] > 0) entao
      se energia[atacante] >= 2 entao
        energia[atacante] <- energia[atacante] - 2
        escreva("Golpe crítico pré-definido? (0/1): ")
        leia(critico)
        dano <- 6
        se critico = 1 entao
          dano <- 12
        fimse
        dano <- dano - defesa[alvo]
        se dano < 0 entao
          dano <- 0
        fimse
        vida[alvo] <- vida[alvo] - dano
        se vida[alvo] < 0 entao
          vida[alvo] <- 0
        fimse
        escreval("Turno ", turno, ": dano ", dano, "; vida alvo ", vida[alvo])
      senao
        energia[atacante] <- energia[atacante] + 1
        escreval("Turno ", turno, ": recupera 1 energia")
      fimse
    fimse
  fimpara
  escreval("Vida final: ", vida[1], " x ", vida[2])''',
    'Dois personagens alternam oito turnos. Ataque custa 2 de energia e causa 6 de dano base ou 12 se o crítico informado ocorrer, menos a defesa do alvo.',
    'Ataque crítico contra defesa 3 → dano 9',
    'Sem energia, o turno recupera uma unidade. Vida não cai abaixo de zero.',
    'A chance crítica é representada por entrada 0/1, tornando a simulação reproduzível.',
    ['Alterne atacante e alvo.', 'Leia o crítico só em ataque.', 'Subtraia defesa e limite dano inferiormente.'])

add(22, '''  minuto: vetor[1..10] de inteiro
  descricao: vetor[1..10] de caractere
  time: vetor[1..10] de inteiro
  i, j, troca, golsA, golsB: inteiro
  trocaNome: caractere''', '''  para i de 1 ate 10 faca
    escreva("Minuto do evento ", i, ": ")
    leia(minuto[i])
    escreva("Descrição: ")
    leia(descricao[i])
    escreva("Time do gol (0 sem gol, 1 A, 2 B): ")
    leia(time[i])
  fimpara
  para i de 1 ate 9 faca
    para j de i + 1 ate 10 faca
      se minuto[j] < minuto[i] entao
        troca <- minuto[i]
        minuto[i] <- minuto[j]
        minuto[j] <- troca
        troca <- time[i]
        time[i] <- time[j]
        time[j] <- troca
        trocaNome <- descricao[i]
        descricao[i] <- descricao[j]
        descricao[j] <- trocaNome
      fimse
    fimpara
  fimpara
  golsA <- 0
  golsB <- 0
  para i de 1 ate 10 faca
    se time[i] = 1 entao
      golsA <- golsA + 1
    fimse
    se time[i] = 2 entao
      golsB <- golsB + 1
    fimse
    escreval(minuto[i], " min: ", descricao[i], " — placar ", golsA, " x ", golsB)
  fimpara''',
    'Cadastre dez eventos com minuto, descrição e time do gol opcional. Ordene por minuto e gere uma linha do tempo com placar atualizado.',
    'Evento aos 5 min: gol A → placar 1×0; aos 8 min: falta → placar 1×0',
    'Eventos no mesmo minuto preservam cadastro.',
    'Ordenar eventos antes de processá-los garante que o placar mostrado corresponda à cronologia.',
    ['Guarde três campos por evento.', 'Ordene todos juntos pelo minuto.', 'Atualize gols durante a impressão.'])

add(23, '''  frequencia: vetor[1..26] de inteiro
  textoEntrada, letra: caractere
  i, codigo, digitos, letras, outros, maior, indiceMaior: inteiro''', '''  para i de 1 ate 26 faca
    frequencia[i] <- 0
  fimpara
  escreva("Texto sem espaços: ")
  leia(textoEntrada)
  digitos <- 0
  letras <- 0
  outros <- 0
  para i de 1 ate compr(textoEntrada) faca
    letra <- maiusc(copia(textoEntrada, i, 1))
    codigo <- asc(letra)
    se (codigo >= 65) e (codigo <= 90) entao
      frequencia[codigo - 64] <- frequencia[codigo - 64] + 1
      letras <- letras + 1
    senao
      se (codigo >= 48) e (codigo <= 57) entao
        digitos <- digitos + 1
      senao
        outros <- outros + 1
      fimse
    fimse
  fimpara
  escreval("Letras: ", letras, "; dígitos: ", digitos, "; outros: ", outros)
  para i de 1 ate 26 faca
    se frequencia[i] > 0 entao
      escreval(carac(i + 64), ": ", frequencia[i])
    fimse
  fimpara''',
    'Leia texto sem espaços. Conte letras A–Z, dígitos 0–9 e demais caracteres; mostre histograma das letras encontradas.',
    'A1A! → letras 2, dígitos 1, outros 1; A aparece 2 vezes',
    'Letras acentuadas entram em outros nesta classificação ASCII.',
    'O código ASCII da letra maiúscula determina seu índice no vetor de 26 frequências.',
    ['Converta letra para maiúscula.', 'Use intervalos ASCII.', 'Conte cada letra no índice correspondente.'])

add(24, '''  latencia: vetor[1..10] de real
  i, j, p90, p50, picos: inteiro
  troca, limite: real''', '''  escreva("Limite de pico em ms: ")
  leia(limite)
  picos <- 0
  para i de 1 ate 10 faca
    escreva("Latência ", i, " em ms: ")
    leia(latencia[i])
    se latencia[i] > limite entao
      picos <- picos + 1
    fimse
  fimpara
  para i de 1 ate 9 faca
    para j de i + 1 ate 10 faca
      se latencia[j] < latencia[i] entao
        troca <- latencia[i]
        latencia[i] <- latencia[j]
        latencia[j] <- troca
      fimse
    fimpara
  fimpara
  escreval("Picos acima do limite: ", picos)
  escreval("Mediana: ", (latencia[5] + latencia[6]) / 2, " ms")
  escreval("Percentil 90 por posição (9º de 10): ", latencia[9], " ms")''',
    'Leia dez latências, conte valores estritamente acima do limite e ordene as amostras. A mediana é a média das posições 5 e 6; P90 usa a 9ª posição.',
    'Amostras 1 a 10 ms → mediana 5,5 ms; P90 por posição 9 ms',
    'Este P90 usa a regra de posto mais próximo, sem interpolação.',
    'Ordenar as dez amostras coloca mediana e percentil em posições conhecidas.',
    ['Conte picos antes da ordenação.', 'Ordene crescente.', 'Leia as posições centrais e a nona.'])

add(25, '''  extensao: vetor[1..5] de caractere
  tamanho: vetor[1..5] de real
  i, fotos, videos, outros: inteiro
  original, reduzido, taxa: real''', '''  original <- 0
  reduzido <- 0
  fotos <- 0
  videos <- 0
  outros <- 0
  para i de 1 ate 5 faca
    escreva("Extensão do arquivo ", i, " (jpg, mp4 ou outra): ")
    leia(extensao[i])
    escreva("Tamanho em MB: ")
    leia(tamanho[i])
    taxa <- 0
    se minusc(extensao[i]) = "jpg" entao
      taxa <- 0.3
      fotos <- fotos + 1
    senao
      se minusc(extensao[i]) = "mp4" entao
        taxa <- 0.1
        videos <- videos + 1
      senao
        outros <- outros + 1
      fimse
    fimse
    se tamanho[i] >= 0 entao
      original <- original + tamanho[i]
      reduzido <- reduzido + tamanho[i] * (1 - taxa)
    fimse
  fimpara
  escreval("JPG: ", fotos, "; MP4: ", videos, "; outros: ", outros)
  escreval("Original: ", original, " MB; estimado: ", reduzido, " MB; economia: ", original - reduzido, " MB")''',
    'Classifique cinco arquivos por extensão. Estime redução de 30% para JPG, 10% para MP4 e 0% para outras extensões.',
    'JPG de 10 MB → 7 MB estimados; economia 3 MB',
    'Tamanho negativo é ignorado nos totais.',
    'A taxa depende da extensão e o tamanho estimado é calculado arquivo por arquivo.',
    ['Classifique extensão.', 'Aplique a taxa adequada.', 'Acumule original e reduzido.'])

add(26, '''  x, y, zona, normalizadoX, normalizadoY: real''', '''  escreva("Eixo X (-100 a 100): ")
  leia(x)
  escreva("Eixo Y (-100 a 100): ")
  leia(y)
  escreva("Zona morta (0 a 100): ")
  leia(zona)
  se (x < -100) ou (x > 100) ou (y < -100) ou (y > 100) ou (zona < 0) ou (zona >= 100) entao
    escreval("Dados inválidos")
  senao
    normalizadoX <- 0
    normalizadoY <- 0
    se x > zona entao
      normalizadoX <- (x - zona) / (100 - zona)
    fimse
    se x < 0 - zona entao
      normalizadoX <- (x + zona) / (100 - zona)
    fimse
    se y > zona entao
      normalizadoY <- (y - zona) / (100 - zona)
    fimse
    se y < 0 - zona entao
      normalizadoY <- (y + zona) / (100 - zona)
    fimse
    escreval("Eixo calibrado: X=", normalizadoX, ", Y=", normalizadoY)
  fimse''',
    'Normalize eixos de -100 a 100 para -1 a 1. Valores na zona morta simétrica viram zero; fora dela, reescale o trecho restante.',
    'Zona 20; X=20 → 0; X=60 → 0,5; X=100 → 1',
    'Zona 100 seria divisão por zero e é recusada.',
    'A transformação remove a zona central e preserva os extremos do eixo.',
    ['Trate três faixas: negativa, morta e positiva.', 'Subtraia a zona.', 'Divida pela amplitude restante.'])

add(27, '''  nome: vetor[1..4] de caractere
  rodada: vetor[1..4, 1..3] de inteiro
  pontos, vitorias, ordem: vetor[1..4] de inteiro
  i, j, r, troca: inteiro''', '''  para i de 1 ate 4 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
    pontos[i] <- 0
    vitorias[i] <- 0
    ordem[i] <- i
    para r de 1 ate 3 faca
      escreva("Pontos da rodada ", r, ": ")
      leia(rodada[i, r])
      se rodada[i, r] > 0 entao
        pontos[i] <- pontos[i] + rodada[i, r]
        vitorias[i] <- vitorias[i] + 1
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
    escreval(i, "º ", nome[ordem[i]], ": ", pontos[ordem[i]], " pontos; ", vitorias[ordem[i]], " rodadas pontuadas")
  fimpara''',
    'Registre quatro jogadores em três rodadas. Classifique por pontos acumulados, desempate pelo número de rodadas com pontos positivos e depois pela ordem de cadastro.',
    'Ana soma 20 com duas rodadas pontuadas; Beto soma 20 com três → Beto à frente',
    'Pontuação não positiva não aumenta pontos nem rodadas pontuadas.',
    'O vetor de ordem permite classificar sem perder os índices da matriz de rodadas.',
    ['Some cada linha da matriz.', 'Conte rodadas positivas.', 'Ordene índices por dois critérios.'])

add(28, '''  dia: vetor[1..10] de inteiro
  i, sequencia, bonus, total: inteiro''', '''  sequencia <- 0
  total <- 0
  para i de 1 ate 10 faca
    escreva("Registrou presença no dia ", i, "? (0/1): ")
    leia(dia[i])
    se dia[i] = 1 entao
      sequencia <- sequencia + 1
      bonus <- 10 + 2 * (sequencia - 1)
      total <- total + bonus
      escreval("Dia ", i, ": bônus ", bonus, "; total ", total)
    senao
      sequencia <- 0
      escreval("Dia ", i, ": ausência; sequência reiniciada")
    fimse
  fimpara
  escreval("Recompensa acumulada: ", total)''',
    'Em dez dias, presença dá 10 moedas mais 2 por dia anterior da sequência. Ausência zera a sequência, mas não retira moedas já ganhas.',
    'Presenças 1,1,0,1 → bônus 10,12,0,10; total 32',
    'Entrada diferente de 1 é ausência.',
    'A sequência corrente determina o bônus do dia e reinicia após ausência.',
    ['Conte presenças consecutivas.', 'Calcule bônus conforme a posição na sequência.', 'Some ao saldo acumulado.'])

add(29, '''  jogadores, capacidade, sala, ocupacao, salas: inteiro''', '''  escreva("Jogadores disponíveis: ")
  leia(jogadores)
  escreva("Capacidade por sala: ")
  leia(capacidade)
  se (jogadores < 0) ou (capacidade <= 0) entao
    escreval("Dados inválidos")
  senao
    salas <- jogadores div capacidade
    se jogadores mod capacidade <> 0 entao
      salas <- salas + 1
    fimse
    para sala de 1 ate salas faca
      ocupacao <- capacidade
      se jogadores < capacidade entao
        ocupacao <- jogadores
      fimse
      jogadores <- jogadores - ocupacao
      se ocupacao = capacidade entao
        escreval("Sala ", sala, ": completa com ", ocupacao)
      senao
        escreval("Sala ", sala, ": incompleta com ", ocupacao, "; faltam ", capacidade - ocupacao)
      fimse
    fimpara
  fimse''',
    'Distribua jogadores em salas de capacidade fixa, preenchendo cada sala antes de abrir a próxima. Informe quais ficaram incompletas.',
    '10 jogadores, capacidade 4 → salas 4, 4 e 2; faltam 2 na última',
    'Zero jogador cria zero sala.',
    'O número de salas é a divisão arredondada para cima; a distribuição consome a quantidade restante.',
    ['Calcule quantas salas são necessárias.', 'Preencha até a capacidade.', 'Sinalize a última sala parcial.'])

add(30, '''  posicao, vida, recurso, salvoPosicao, salvoVida, salvoRecurso, temSalvo, acao, valor: inteiro''', '''  posicao <- 1
  vida <- 10
  recurso <- 3
  temSalvo <- 0
  escreva("Ação (1 mover, 2 dano, 3 usar recurso, 4 salvar, 5 restaurar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escolha acao
      caso 1
        escreva("Passos à frente: ")
        leia(valor)
        se valor > 0 entao
          posicao <- posicao + valor
        fimse
      caso 2
        escreva("Dano recebido: ")
        leia(valor)
        se valor > 0 entao
          vida <- vida - valor
          se vida < 0 entao
            vida <- 0
          fimse
        fimse
      caso 3
        se recurso > 0 entao
          recurso <- recurso - 1
        fimse
      caso 4
        salvoPosicao <- posicao
        salvoVida <- vida
        salvoRecurso <- recurso
        temSalvo <- 1
        escreval("Checkpoint salvo")
      caso 5
        se temSalvo = 1 entao
          posicao <- salvoPosicao
          vida <- salvoVida
          recurso <- salvoRecurso
          escreval("Checkpoint restaurado")
        senao
          escreval("Nenhum checkpoint")
        fimse
    fimescolha
    escreval("Posição ", posicao, "; vida ", vida, "; recursos ", recurso)
    escreva("Ação (1 mover, 2 dano, 3 usar recurso, 4 salvar, 5 restaurar, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Simule posição, vida e recursos de um personagem. O checkpoint copia todos os três atributos; restaurar repõe exatamente o estado salvo.',
    'Salve com vida 10, receba 4 de dano, restaure → vida volta a 10',
    'Restaurar antes de salvar não altera o estado.',
    'Variáveis separadas guardam o estado atual e a cópia do último checkpoint.',
    ['Guarde os três atributos ao salvar.', 'Reponha os três ao restaurar.', 'Indique se existe checkpoint.'])

add(31, '''  resultado: vetor[1..12] de inteiro
  i, vitorias, empates, sequencia, maior, pontos: inteiro''', '''  vitorias <- 0
  empates <- 0
  sequencia <- 0
  maior <- 0
  pontos <- 0
  para i de 1 ate 12 faca
    escreva("Resultado da partida ", i, " (1 vitória, 2 empate, 0 derrota): ")
    leia(resultado[i])
    se resultado[i] = 1 entao
      vitorias <- vitorias + 1
      pontos <- pontos + 3
      sequencia <- sequencia + 1
      se sequencia > maior entao
        maior <- sequencia
      fimse
    senao
      sequencia <- 0
      se resultado[i] = 2 entao
        empates <- empates + 1
        pontos <- pontos + 1
      fimse
    fimse
  fimpara
  escreval("Vitórias: ", vitorias, "; empates: ", empates, "; derrotas: ", 12 - vitorias - empates)
  escreval("Maior sequência de vitórias: ", maior)
  escreval("Aproveitamento em vitórias: ", 100 * vitorias / 12, "%")
  escreval("Pontos de temporada: ", pontos)''',
    'Leia doze resultados: vitória vale 3 pontos, empate 1 e derrota 0. Relate contagens, maior sequência de vitórias, percentual de vitórias e pontos.',
    'Vitória, vitória, empate → 7 pontos e sequência máxima 2',
    'Entrada diferente de 1 ou 2 é tratada como derrota.',
    'Um percurso do histórico mantém todos os acumuladores e reinicia a sequência fora de vitória.',
    ['Conte os três resultados.', 'Reinicie sequência no empate ou derrota.', 'Calcule percentual e pontos no final.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')

#!/usr/bin/env python3
"""Curated simple February exercises."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/challenge-solutions.json"
entries = json.loads(CATALOG.read_text(encoding="utf-8"))
rows = {r["data_mm_dd"]: r for r in csv.DictReader((ROOT / "data/visualg_365_dias_730_desafios.csv").open(encoding="utf-8"))}


def add(day, variables, body, rules, example, edge, explanation, hints=None):
    date = f"02-{day:02d}"
    prompt = rows[date]["simples_enunciado"]
    code = f'algoritmo "Desafio02{day:02d}S"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f"{date}/simples"] = dict(
        code=code, objective=prompt[0].upper() + prompt[1:] + " O resultado deve aparecer no console após a leitura dos dados.",
        rules=rules, example=example, edge=edge, explanation=explanation,
        hints=hints or ["Identifique o tipo das entradas antes de declarar variáveis.",
                        "Separe leitura, cálculo e impressão do resultado.",
                        "Confira o caso de fronteira antes de abrir a solução."])


add(1, '  cor: caractere', '''  escreva("Cor da máscara: ")
  leia(cor)
  escreval("Minha máscara será ", cor, "!")''',
    'Leia o nome de uma cor como texto e inclua esse valor em uma frase completa.',
    'Cor da máscara: azul\nMinha máscara será azul!',
    'Uma cor composta, como “azul claro”, deve permanecer completa na mensagem.',
    'A variável de texto é inserida entre trechos fixos por `escreval`.')

add(2, '  limite, i: inteiro', '''  escreva("Limite: ")
  leia(limite)
  se limite >= 1 entao
    para i de 1 ate limite faca
      escreval(i)
    fimpara
  senao
    escreval("Não há números positivos no intervalo.")
  fimse''',
    'Leia um limite inteiro e imprima, em ordem, os inteiros de 1 até ele.',
    'Limite: 3\n1\n2\n3',
    'Se o limite for menor que 1, não execute o laço.',
    '`para` percorre cada número uma vez e o imprime em linha própria.')

add(3, '  adultos, criancas, total: inteiro', '''  escreva("Adultos: ")
  leia(adultos)
  escreva("Crianças: ")
  leia(criancas)
  se (adultos >= 0) e (criancas >= 0) entao
    total <- adultos + criancas
    escreval("Participantes: ", total)
  senao
    escreval("Quantidades inválidas.")
  fimse''',
    'Some as quantidades de adultos e crianças para encontrar todos os participantes.',
    'Adultos: 8\nCrianças: 5\nParticipantes: 13',
    'A soma de dois grupos vazios é zero. Quantidades negativas são rejeitadas.',
    'A variável `total` recebe apenas a soma de entradas válidas.')

add(4, '  preco, desconto, final: real', '''  escreva("Preço da fantasia: ")
  leia(preco)
  escreva("Desconto (%): ")
  leia(desconto)
  se (preco >= 0) e (desconto >= 0) e (desconto <= 100) entao
    final <- preco * (100 - desconto) / 100
    escreval("Preço final: ", final)
  senao
    escreval("Dados inválidos.")
  fimse''',
    'Informe preço e percentual de desconto. Calcule somente para preço não negativo e percentual de 0 a 100.',
    'Preço da fantasia: 100\nDesconto (%): 20\nPreço final: 80',
    'Desconto de 100% produz preço zero.',
    'Multiplicar pela parte restante do percentual evita subtrair uma taxa sem escala.')

add(5, '  palavra: caractere\n  i: inteiro', '''  escreva("Palavra: ")
  leia(palavra)
  para i de 1 ate 4 faca
    escreval(palavra)
  fimpara''',
    'Leia uma palavra uma vez e mostre-a quatro vezes, cada ocorrência em uma linha.',
    'Palavra: tum\ntum\ntum\ntum\ntum',
    'O laço executa exatamente quatro iterações.',
    'A entrada é guardada antes do laço; cada iteração reutiliza a mesma palavra.')

add(6, '  a, b, c, media: real', '''  escreva("Avaliação 1: ")
  leia(a)
  escreva("Avaliação 2: ")
  leia(b)
  escreva("Avaliação 3: ")
  leia(c)
  media <- (a + b + c) / 3
  escreval("Média: ", media)''',
    'Leia as três avaliações e calcule sua média aritmética, sem pesos diferentes.',
    'Avaliação 1: 7\nAvaliação 2: 8\nAvaliação 3: 9\nMédia: 8',
    'Quando todas as notas são iguais, a média reproduz essa nota.',
    'Somar antes de dividir garante que as três avaliações participem do cálculo.')

add(7, '  idade, minima: inteiro', '''  escreva("Idade: ")
  leia(idade)
  escreva("Idade mínima: ")
  leia(minima)
  se idade >= minima entao
    escreval("Entrada permitida.")
  senao
    escreval("Entrada não permitida.")
  fimse''',
    'Compare a idade de uma pessoa com a idade mínima exigida pelo evento.',
    'Idade: 16\nIdade mínima: 14\nEntrada permitida.',
    'Idade exatamente igual ao mínimo também permite entrada.',
    'A comparação `>=` inclui o limite como valor válido.')

add(8, '  preco1, preco2, total: real\n  qtd1, qtd2: inteiro', '''  escreva("Preço do item 1: ")
  leia(preco1)
  escreva("Quantidade do item 1: ")
  leia(qtd1)
  escreva("Preço do item 2: ")
  leia(preco2)
  escreva("Quantidade do item 2: ")
  leia(qtd2)
  se (qtd1 >= 0) e (qtd2 >= 0) entao
    total <- preco1 * qtd1 + preco2 * qtd2
    escreval("Total do carrinho: ", total)
  senao
    escreval("Quantidade inválida.")
  fimse''',
    'Para cada um dos dois itens, multiplique o preço pela quantidade e some os subtotais.',
    'Preço do item 1: 5\nQuantidade do item 1: 2\nPreço do item 2: 3\nQuantidade do item 2: 4\nTotal do carrinho: 22',
    'Quantidade zero contribui com zero ao total.',
    'A expressão tem dois produtos, um por item, unidos por uma soma.')

add(9, '  pessoas, minutosPorPessoa, total: inteiro', '''  escreva("Pessoas na fila: ")
  leia(pessoas)
  escreva("Minutos fixos por atendimento: ")
  leia(minutosPorPessoa)
  se (pessoas >= 0) e (minutosPorPessoa >= 0) entao
    total <- pessoas * minutosPorPessoa
    escreval("Tempo estimado (minutos): ", total)
  senao
    escreval("Dados inválidos.")
  fimse''',
    'Estime o tempo para atender uma fila multiplicando pessoas pela duração fixa de cada atendimento.',
    'Pessoas na fila: 6\nMinutos fixos por atendimento: 4\nTempo estimado (minutos): 24',
    'Fila vazia tem tempo estimado zero.',
    'A estimativa supõe que os atendimentos ocorram um após outro, sem intervalos.')

add(10, '  nome: caractere', '''  escreva("Nome do convidado: ")
  leia(nome)
  escreval("Você está convidado para a festa, ", nome, "!")''',
    'Leia o nome de uma pessoa e inclua-o em uma mensagem de convite.',
    'Nome do convidado: Ana\nVocê está convidado para a festa, Ana!',
    'Nomes compostos devem aparecer integralmente.',
    'O valor lido é inserido entre o texto fixo do convite.')

add(11, '  primeiro, segundo, terceiro: caractere', '''  escreva("Primeiro nome: ")
  leia(primeiro)
  escreva("Segundo nome: ")
  leia(segundo)
  escreva("Terceiro nome: ")
  leia(terceiro)
  escreval(primeiro)
  escreval(segundo)
  escreval(terceiro)''',
    'Leia três nomes e apresente-os exatamente na ordem de digitação.',
    'Primeiro nome: Ana\nSegundo nome: Bia\nTerceiro nome: Caio\nAna\nBia\nCaio',
    'Não classifique nem inverta os nomes.',
    'Cada variável guarda uma entrada; as três saídas repetem a mesma sequência.')

add(12, '  rodada: inteiro', '''  para rodada de 1 ate 10 faca
    se rodada mod 2 = 1 entao
      escreval(rodada, ": LIGADO")
    senao
      escreval(rodada, ": DESLIGADO")
    fimse
  fimpara''',
    'Execute dez rodadas numeradas, alternando LIGADO nas ímpares e DESLIGADO nas pares.',
    '1: LIGADO\n2: DESLIGADO\n3: LIGADO\n...\n10: DESLIGADO',
    'A décima e última rodada deve mostrar DESLIGADO.',
    'O resto da divisão por dois determina se o número da rodada é ímpar ou par.')

add(13, '  a, b, c, soma: real', '''  escreva("Nota de acabamento 1: ")
  leia(a)
  escreva("Nota de acabamento 2: ")
  leia(b)
  escreva("Nota de acabamento 3: ")
  leia(c)
  soma <- a + b + c
  escreval("Soma das notas: ", soma)''',
    'Leia as três notas de acabamento e some os valores sem calcular média.',
    'Nota de acabamento 1: 2\nNota de acabamento 2: 3\nNota de acabamento 3: 4\nSoma das notas: 9',
    'Nota zero não altera a soma.',
    'A variável `soma` recebe a adição das três avaliações.')

add(14, '  cor: caractere\n  quantidade, i: inteiro', '''  escreva("Cor: ")
  leia(cor)
  escreva("Repetições: ")
  leia(quantidade)
  para i de 1 ate quantidade faca
    escreval(cor)
  fimpara''',
    'Leia uma cor e um número positivo de repetições; mostre a cor uma vez por linha.',
    'Cor: vermelho\nRepetições: 3\nvermelho\nvermelho\nvermelho',
    'Com zero repetições, o laço não apresenta nenhuma cor.',
    'A variável de controle percorre cada ocorrência pedida.')

add(15, '  sequencias, passos: inteiro', '''  escreva("Sequências de oito passos: ")
  leia(sequencias)
  se sequencias >= 0 entao
    passos <- sequencias * 8
    escreval("Total de passos: ", passos)
  senao
    escreval("Quantidade inválida.")
  fimse''',
    'Cada sequência de dança tem oito passos. Multiplique a quantidade de sequências por oito.',
    'Sequências de oito passos: 4\nTotal de passos: 32',
    'Zero sequências representam zero passos.',
    'A multiplicação substitui a soma repetida de oito passos por sequência.')

add(16, '  compra, porPessoa: real', '''  escreva("Valor da compra: ")
  leia(compra)
  porPessoa <- compra / 2
  escreval("Cada pessoa paga: ", porPessoa)''',
    'Divida o valor da compra em duas partes iguais.',
    'Valor da compra: 35\nCada pessoa paga: 17.5',
    'A divisão pode produzir centavos; use uma variável real.',
    'Como o número de participantes é fixo, basta dividir o valor por dois.')

add(17, '  valor, limiteP, limiteM: real', '''  escreva("Medida: ")
  leia(valor)
  escreva("Limite superior de P: ")
  leia(limiteP)
  escreva("Limite superior de M: ")
  leia(limiteM)
  se limiteP <= limiteM entao
    se valor <= limiteP entao
      escreval("P")
    senao
      se valor <= limiteM entao
        escreval("M")
      senao
        escreval("G")
      fimse
    fimse
  senao
    escreval("Faixas inválidas.")
  fimse''',
    'Leia uma medida e dois limites crescentes: até o primeiro é P, até o segundo é M, acima dele é G.',
    'Medida: 42\nLimite superior de P: 38\nLimite superior de M: 44\nM',
    'Valor igual ao limite de P permanece em P; igual ao limite de M permanece em M.',
    'As condicionais aninhadas mantêm as três faixas sem sobreposição.')

add(18, '  iniciais, estourados, restantes: inteiro', '''  escreva("Balões iniciais: ")
  leia(iniciais)
  escreva("Balões estourados: ")
  leia(estourados)
  se (iniciais >= 0) e (estourados >= 0) e (estourados <= iniciais) entao
    restantes <- iniciais - estourados
    escreval("Balões restantes: ", restantes)
  senao
    escreval("Quantidades inválidas.")
  fimse''',
    'Subtraia do total inicial o número de balões estourados.',
    'Balões iniciais: 20\nBalões estourados: 7\nBalões restantes: 13',
    'Se todos estouraram, restam zero balões; não aceite mais balões estourados que iniciais.',
    'A validação garante uma contagem restante não negativa.')

add(19, '  volume, limite: real', '''  escreva("Volume medido: ")
  leia(volume)
  escreva("Limite permitido: ")
  leia(limite)
  se volume > limite entao
    escreval("Volume acima do limite.")
  senao
    escreval("Volume dentro do limite.")
  fimse''',
    'Compare um volume numérico com o limite fornecido.',
    'Volume medido: 81\nLimite permitido: 80\nVolume acima do limite.',
    'Valor igual ao limite não o ultrapassa.',
    'A condição estrita `>` separa excesso de conformidade.')

add(20, '  senha: inteiro', '''  escreva("Senha numérica: ")
  leia(senha)
  se senha = 2468 entao
    escreval("Senha correta.")
  senao
    escreval("Senha incorreta.")
  fimse''',
    'Leia um número inteiro e compare-o com a senha fixa 2468 deste exercício.',
    'Senha numérica: 2468\nSenha correta.',
    'Uma diferença de apenas um dígito torna a senha incorreta.',
    'O operador `=` verifica igualdade numérica.')

add(21, '  impressos, entregues, restantes: inteiro', '''  escreva("Convites impressos: ")
  leia(impressos)
  escreva("Convites entregues: ")
  leia(entregues)
  se (impressos >= 0) e (entregues >= 0) e (entregues <= impressos) entao
    restantes <- impressos - entregues
    escreval("Convites restantes: ", restantes)
  senao
    escreval("Quantidades inválidas.")
  fimse''',
    'Leia impressos e entregues; calcule quantos convites ainda podem ser distribuídos.',
    'Convites impressos: 100\nConvites entregues: 35\nConvites restantes: 65',
    'Entregar exatamente todos os convites deixa saldo zero.',
    'A validação impede entregar mais convites do que foram impressos.')

add(22, '  a, b, c, total: real', '''  escreva("Trecho 1 (km): ")
  leia(a)
  escreva("Trecho 2 (km): ")
  leia(b)
  escreva("Trecho 3 (km): ")
  leia(c)
  total <- a + b + c
  escreval("Percurso total (km): ", total)''',
    'Some as distâncias de três trechos consecutivos na mesma unidade.',
    'Trecho 1 (km): 1\nTrecho 2 (km): 2.5\nTrecho 3 (km): 0.5\nPercurso total (km): 4',
    'Um trecho de distância zero não altera o percurso.',
    'A soma de trechos fornece a distância percorrida.')

add(23, '  unidades: inteiro\n  preco, total: real', '''  escreva("Pulseiras vendidas: ")
  leia(unidades)
  escreva("Preço unitário: ")
  leia(preco)
  se unidades >= 0 entao
    total <- unidades * preco
    escreval("Arrecadação: ", total)
  senao
    escreval("Quantidade inválida.")
  fimse''',
    'Multiplique o número de unidades vendidas pelo preço de cada uma.',
    'Pulseiras vendidas: 12\nPreço unitário: 5\nArrecadação: 60',
    'Sem vendas, a arrecadação é zero.',
    'O produto unidades × preço calcula o valor total recebido.')

add(24, '  chuva: caractere', '''  escreva("Vai chover? (SIM/NÃO): ")
  leia(chuva)
  se (chuva = "SIM") ou (chuva = "sim") entao
    escreval("Use o espaço coberto.")
  senao
    se (chuva = "NÃO") ou (chuva = "não") ou (chuva = "NAO") ou (chuva = "nao") entao
      escreval("Use o espaço aberto.")
    senao
      escreval("Resposta inválida.")
    fimse
  fimse''',
    'Receba SIM ou NÃO e escolha um local de festa: espaço coberto para chuva, aberto caso contrário.',
    'Vai chover? (SIM/NÃO): SIM\nUse o espaço coberto.',
    'O programa aceita SIM/sim e NÃO/não/NAO/nao; outra resposta é inválida.',
    'A condição primeiro reconhece chuva, depois ausência de chuva, sem tratar texto desconhecido como NÃO.')

add(25, '  palavra: caractere\n  i: inteiro', '''  escreva("Palavra: ")
  leia(palavra)
  para i de compr(palavra) ate 1 passo -1 faca
    escreva(copia(palavra, i, 1))
  fimpara
  escreval("")''',
    'Leia uma palavra e mostre seus caracteres na ordem inversa.',
    'Palavra: festa\natsef',
    'Uma palavra com um caractere aparece igual.',
    '`compr` encontra a última posição; `copia` extrai um caractere por vez enquanto o laço recua.')

add(26, '  convidados, coposPorPessoa, total: inteiro', '''  escreva("Convidados: ")
  leia(convidados)
  escreva("Copos por pessoa: ")
  leia(coposPorPessoa)
  se (convidados >= 0) e (coposPorPessoa >= 0) entao
    total <- convidados * coposPorPessoa
    escreval("Copos necessários: ", total)
  senao
    escreval("Quantidades inválidas.")
  fimse''',
    'Multiplique o número de convidados pela quantidade de copos prevista para cada um.',
    'Convidados: 20\nCopos por pessoa: 2\nCopos necessários: 40',
    'Com zero convidados, não são necessários copos.',
    'A multiplicação calcula a necessidade total supondo a mesma quantidade por convidado.')

add(27, '  nota, maior: real\n  i: inteiro', '''  para i de 1 ate 4 faca
    escreva("Nota ", i, ": ")
    leia(nota)
    se (i = 1) ou (nota > maior) entao
      maior <- nota
    fimse
  fimpara
  escreval("Maior nota: ", maior)''',
    'Leia quatro notas e acompanhe o maior valor encontrado.',
    'Notas: 5, 9, 7, 8\nMaior nota: 9',
    'Mesmo se todas as notas forem negativas, a maior é identificada corretamente porque a primeira inicializa a referência.',
    'Cada nota após a primeira substitui `maior` somente se for superior.')

add(28, '  participacao, total: inteiro\n  i: inteiro', '''  total <- 0
  para i de 1 ate 4 faca
    escreva("Participantes da festa ", i, ": ")
    leia(participacao)
    se participacao >= 0 entao
      total <- total + participacao
    senao
      escreval("Quantidade inválida ignorada.")
    fimse
  fimpara
  escreval("Participação total: ", total)''',
    'Some as participações registradas em quatro festas.',
    'Participantes: 10, 20, 15, 5\nParticipação total: 50',
    'Uma festa com zero participantes contribui com zero. Valor negativo é ignorado.',
    'O acumulador `total` começa em zero e recebe cada contagem válida.')

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catalog contains {len(entries)} reviewed challenge solutions")

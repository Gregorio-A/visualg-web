#!/usr/bin/env python3
"""Curated advanced March exercises."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/challenge-solutions.json"
entries = json.loads(CATALOG.read_text(encoding="utf-8"))
rows = {r["data_mm_dd"]: r for r in csv.DictReader((ROOT / "data/visualg_365_dias_730_desafios.csv").open(encoding="utf-8"))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f"03-{day:02d}"
    prompt = rows[date]["avancado_enunciado"]
    code = f'algoritmo "Desafio03{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f"{date}/avancado"] = dict(
        code=code, objective=prompt[0].upper() + prompt[1:] + " Apresente um resultado verificável no console.",
        rules=rules, example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  alunos, turmas: vetor[1..5] de caractere
  consulta: caractere
  i: inteiro
  encontrou: logico''', '''  para i de 1 ate 5 faca
    escreva("Aluno ", i, ": ")
    leia(alunos[i])
    escreva("Turma: ")
    leia(turmas[i])
  fimpara
  escreva("Nome a consultar (FIM encerra): ")
  leia(consulta)
  enquanto consulta <> "FIM" faca
    encontrou <- falso
    para i de 1 ate 5 faca
      se alunos[i] = consulta entao
        escreval(alunos[i], " pertence à turma ", turmas[i])
        encontrou <- verdadeiro
      fimse
    fimpara
    se nao encontrou entao
      escreval("Aluno não encontrado.")
    fimse
    escreva("Nome a consultar (FIM encerra): ")
    leia(consulta)
  fimenquanto''',
    'Cadastre cinco pares aluno/turma em vetores paralelos. Depois consulte nomes exatos até digitar FIM.',
    'Cadastro: Ana/7A, Bia/7B, mais três alunos\nConsulta Ana → Ana pertence à turma 7A',
    'Nome ausente produz aviso. A comparação distingue maiúsculas e minúsculas.',
    'O mesmo índice dos dois vetores relaciona cada aluno à sua turma.',
    ['Guarde nome e turma na mesma posição.', 'Percorra o vetor para cada consulta.', 'Avise quando nenhum nome corresponder.'])

add(2, '''  nome: vetor[1..5] de caractere
  preco: vetor[1..5] de real
  categoria: vetor[1..5] de inteiro
  orcamento, total, totalCategoria: real
  i, j: inteiro''', '''  escreva("Orçamento total: ")
  leia(orcamento)
  total <- 0
  para i de 1 ate 5 faca
    escreva("Material ", i, ": ")
    leia(nome[i])
    escreva("Categoria (1 a 3): ")
    leia(categoria[i])
    escreva("Preço: ")
    leia(preco[i])
    total <- total + preco[i]
    se preco[i] > orcamento entao
      escreval("Item isolado acima do orçamento: ", nome[i])
    fimse
  fimpara
  para j de 1 ate 3 faca
    totalCategoria <- 0
    para i de 1 ate 5 faca
      se categoria[i] = j entao
        totalCategoria <- totalCategoria + preco[i]
      fimse
    fimpara
    escreval("Categoria ", j, ": ", totalCategoria)
  fimpara
  escreval("Total: ", total)
  se total > orcamento entao
    escreval("Compras acima do orçamento em ", total - orcamento)
  fimse''',
    'Cadastre cinco materiais com preço e categoria 1, 2 ou 3. Mostre os totais por categoria, itens que sozinhos excedem o orçamento e quanto o conjunto excede o orçamento.',
    'Orçamento 50; caderno categoria 1 custa 30, estojo categoria 2 custa 25, demais itens custam 0\nTotal: 55\nCompras acima do orçamento em 5',
    'Uma compra exatamente igual ao orçamento não gera alerta.',
    'Os vetores guardam itens para a soma por categoria; o total geral é acumulado durante o cadastro.',
    ['Guarde preço e categoria do mesmo item no mesmo índice.', 'Compare itens isolados e total geral separadamente.', 'Some os preços de cada categoria em outra passagem.'])

add(3, '''  aluno: vetor[1..5] de caractere
  notas: vetor[1..5, 1..3] de real
  media: vetor[1..5] de real
  i, prova, j, posicao: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Aluno ", i, ": ")
    leia(aluno[i])
    media[i] <- 0
    para prova de 1 ate 3 faca
      escreva("Nota da prova ", prova, ": ")
      leia(notas[i, prova])
      media[i] <- media[i] + notas[i, prova]
    fimpara
    media[i] <- media[i] / 3
  fimpara
  para i de 1 ate 5 faca
    posicao <- 1
    para j de 1 ate 5 faca
      se media[j] > media[i] entao
        posicao <- posicao + 1
      fimse
    fimpara
    escreval(aluno[i], ": média ", media[i], ", posição ", posicao)
  fimpara''',
    'Registre cinco alunos e três notas por aluno. Calcule a média aritmética de cada um e atribua posições por média decrescente, com empate na mesma posição.',
    'Ana: notas 6, 6, 6 → média 6; Bia: 9, 9, 9 → média 9\nBia fica antes de Ana no ranking',
    'Se todos tiverem a mesma média, todos aparecem em primeiro lugar.',
    'A linha da matriz representa um aluno; a posição é um mais o número de médias superiores.',
    ['Use matriz aluno × prova.', 'Calcule a média de cada linha.', 'Conte quantas médias são estritamente maiores para obter a posição.'])

add(4, '''  disciplina: vetor[1..5] de caractere
  minutos: vetor[1..5] de inteiro
  cargaMaxima, ocupada, i: inteiro''', '''  escreva("Carga máxima diária (min): ")
  leia(cargaMaxima)
  ocupada <- 0
  para i de 1 ate 5 faca
    escreva("Disciplina ", i, ": ")
    leia(disciplina[i])
    escreva("Duração do bloco (min): ")
    leia(minutos[i])
    se (minutos[i] > 0) e (ocupada + minutos[i] <= cargaMaxima) entao
      escreval(disciplina[i], ": do minuto ", ocupada, " ao ", ocupada + minutos[i])
      ocupada <- ocupada + minutos[i]
    senao
      escreval(disciplina[i], " não cabe no dia.")
    fimse
  fimpara
  escreval("Carga usada: ", ocupada)''',
    'Leia cinco disciplinas com duração de seus blocos. Na ordem informada, aceite somente blocos positivos que caibam na carga máxima diária.',
    'Limite 120 min; Matemática 60, História 45, Arte 30\nMatemática 0–60; História 60–105; Arte não cabe',
    'Um bloco que termina exatamente no limite cabe. Blocos rejeitados não ocupam tempo.',
    'O acumulador `ocupada` indica o começo do próximo bloco aceito.',
    ['Use minutos para todas as durações.', 'Compare `ocupada + bloco` com o limite antes de aceitar.', 'Mostre início e fim de cada bloco aceito.'])

add(5, '''  presenca: vetor[1..4, 1..5] de inteiro
  faltas, limite, aluno, dia: inteiro''', '''  escreva("Limite de faltas para alerta: ")
  leia(limite)
  para aluno de 1 ate 4 faca
    faltas <- 0
    para dia de 1 ate 5 faca
      escreva("Aluno ", aluno, ", dia ", dia, " (1 presente, 0 ausente): ")
      leia(presenca[aluno, dia])
      se presenca[aluno, dia] = 0 entao
        faltas <- faltas + 1
      fimse
    fimpara
    escreval("Aluno ", aluno, ": ", faltas, " falta(s)")
    se faltas >= limite entao
      escreval("Alerta de frequência para aluno ", aluno)
    fimse
  fimpara''',
    'Registre presença (1) ou ausência (0) de quatro alunos em cinco dias. Conte faltas por aluno e emita alerta quando atingir o limite informado.',
    'Limite 2; aluno 1: 1, 0, 1, 0, 1\nAluno 1: 2 faltas\nAlerta de frequência',
    'Igualdade com o limite já gera alerta.',
    'Cada linha da matriz contém os cinco dias de um aluno; os zeros são contados como faltas.',
    ['Use linhas para alunos e colunas para dias.', 'Zere o contador antes de cada aluno.', 'Compare o total de faltas com o limite depois de ler os cinco dias.'])

add(6, '''  tarefa: vetor[1..5] de caractere
  prazo, concluida: vetor[1..5] de inteiro
  hoje, i: inteiro''', '''  escreva("Dia atual: ")
  leia(hoje)
  para i de 1 ate 5 faca
    escreva("Atividade ", i, ": ")
    leia(tarefa[i])
    escreva("Dia do prazo: ")
    leia(prazo[i])
    escreva("Concluída? (1 sim, 0 não): ")
    leia(concluida[i])
  fimpara
  para i de 1 ate 5 faca
    se (concluida[i] = 0) e (prazo[i] < hoje) entao
      escreval("Atrasada: ", tarefa[i], " (dia ", prazo[i], ")")
    fimse
  fimpara''',
    'Cadastre cinco atividades com dia numérico de prazo e status concluída/pendente. Considere atrasada uma tarefa pendente cujo prazo já passou.',
    'Hoje é dia 10; tarefa A tem prazo 9 e está pendente; tarefa B tem prazo 9 e foi concluída\nAtrasada: tarefa A',
    'Uma tarefa que vence hoje ainda não está atrasada.',
    'O filtro combina duas condições: não concluída e prazo menor que o dia atual.',
    ['Guarde prazo e status junto ao nome da atividade.', 'Compare prazos na mesma escala de dias.', 'Não mostre atividade já concluída como atrasada.'])

add(7, '''  materia: vetor[1..5] de caractere
  carga: vetor[1..5] de inteiro
  i, j, aux: inteiro
  auxNome: caractere''', '''  para i de 1 ate 5 faca
    escreva("Matéria ", i, ": ")
    leia(materia[i])
    escreva("Carga horária: ")
    leia(carga[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se carga[j] > carga[i] entao
        aux <- carga[i]
        carga[i] <- carga[j]
        carga[j] <- aux
        auxNome <- materia[i]
        materia[i] <- materia[j]
        materia[j] <- auxNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º: ", materia[i], " — ", carga[i], " hora(s)")
  fimpara''',
    'Cadastre cinco matérias e cargas horárias. Ordene do maior número de horas para o menor, conservando a associação entre nome e carga.',
    'Matérias: Matemática 6h, História 3h, Arte 2h, Inglês 4h, Ciências 5h\nOrdem: Matemática, Ciências, Inglês, História, Arte',
    'Em empate, a ordem de cadastro é mantida.',
    'A cada troca por carga horária, o nome correspondente também troca de posição.',
    ['Guarde nomes e cargas em vetores paralelos.', 'Compare cargas em ordem decrescente.', 'Troque os nomes quando trocar cargas.'])

add(8, '''  inicioMin, fimMin, alunos: vetor[1..4] de inteiro
  ocupacao: vetor[1..60] de inteiro
  capacidade, i, minuto: inteiro
  cabe: logico''', '''  escreva("Capacidade do pátio: ")
  leia(capacidade)
  para minuto de 1 ate 60 faca
    ocupacao[minuto] <- 0
  fimpara
  para i de 1 ate 4 faca
    escreva("Início da turma ", i, " (minuto 1 a 60): ")
    leia(inicioMin[i])
    escreva("Fim exclusivo: ")
    leia(fimMin[i])
    escreva("Alunos da turma: ")
    leia(alunos[i])
    cabe <- (inicioMin[i] >= 1) e (fimMin[i] <= 61) e (fimMin[i] > inicioMin[i]) e (alunos[i] >= 0)
    se cabe entao
      para minuto de inicioMin[i] ate fimMin[i] - 1 faca
        se ocupacao[minuto] + alunos[i] > capacidade entao
          cabe <- falso
        fimse
      fimpara
    fimse
    se cabe entao
      para minuto de inicioMin[i] ate fimMin[i] - 1 faca
        ocupacao[minuto] <- ocupacao[minuto] + alunos[i]
      fimpara
      escreval("Turma ", i, " agendada.")
    senao
      escreval("Turma ", i, " não cabe no pátio.")
    fimse
  fimpara''',
    'Leia capacidade do pátio e quatro pedidos de recreio, com início, fim exclusivo e tamanho da turma. Aceite uma turma somente se nenhum minuto de seu intervalo ultrapassar a capacidade.',
    'Capacidade 30; turma A 20 alunos, minutos 10–20; turma B 15, minutos 15–25\nA aceita; B recusada porque haveria 35 alunos entre 15 e 19',
    'Turmas adjacentes não se sobrepõem. Um pedido recusado não altera a ocupação.',
    'O vetor `ocupacao` guarda quantos alunos estarão no pátio em cada minuto da janela.',
    ['Teste todos os minutos antes de registrar um pedido.', 'Use fim exclusivo para permitir horários adjacentes.', 'Só atualize a ocupação depois que todo o intervalo couber.'])

add(9, '''  titulo: vetor[1..10] de caractere
  emprestado: vetor[1..10] de logico
  i, livro, acao: inteiro''', '''  para i de 1 ate 10 faca
    escreva("Livro ", i, ": ")
    leia(titulo[i])
    emprestado[i] <- falso
  fimpara
  escreva("Ação (1 retirar, 2 devolver, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Número do livro (1 a 10): ")
    leia(livro)
    se (livro >= 1) e (livro <= 10) entao
      se (acao = 1) e (nao emprestado[livro]) entao
        emprestado[livro] <- verdadeiro
        escreval("Retirado: ", titulo[livro])
      senao
        se (acao = 2) e emprestado[livro] entao
          emprestado[livro] <- falso
          escreval("Devolvido: ", titulo[livro])
        senao
          escreval("Operação incompatível com o estado do livro.")
        fimse
      fimse
    senao
      escreval("Número inválido.")
    fimse
    escreva("Ação (1 retirar, 2 devolver, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Cadastre dez títulos. O estado de cada exemplar começa disponível; retirar muda para emprestado, devolver muda para disponível. Recuse operações incompatíveis.',
    'Livro 1: Algoritmos\nRetirar 1 → retirado\nRetirar 1 novamente → operação incompatível\nDevolver 1 → devolvido',
    'Número de livro fora de 1 a 10 é rejeitado antes de acessar o vetor.',
    'Um vetor lógico representa diretamente a disponibilidade de cada exemplar.',
    ['Associe título e estado pelo mesmo índice.', 'Valide o número informado.', 'Altere o estado apenas quando a operação fizer sentido.'])

add(10, '''  nome: vetor[1..4] de caractere
  peso, nota: vetor[1..3] de real
  somaPesos, media, total: real
  i, prova: inteiro''', '''  somaPesos <- 0
  para prova de 1 ate 3 faca
    escreva("Peso da avaliação ", prova, ": ")
    leia(peso[prova])
    somaPesos <- somaPesos + peso[prova]
  fimpara
  se somaPesos > 0 entao
    para i de 1 ate 4 faca
      escreva("Aluno ", i, ": ")
      leia(nome[i])
      total <- 0
      para prova de 1 ate 3 faca
        escreva("Nota ", prova, ": ")
        leia(nota[prova])
        total <- total + nota[prova] * peso[prova]
      fimpara
      media <- total / somaPesos
      escreval(nome[i], ": média ponderada ", media)
    fimpara
  senao
    escreval("A soma dos pesos deve ser positiva.")
  fimse''',
    'Leia três pesos uma vez e notas de quatro alunos em três avaliações. Divida a soma dos produtos nota × peso pela soma dos pesos.',
    'Pesos: 2, 1, 1; notas de Ana: 8, 10, 10\nMédia ponderada de Ana: 9',
    'Soma dos pesos igual a zero não permite média.',
    'Usar os mesmos pesos para todos os alunos torna as médias comparáveis.',
    ['Some os pesos antes de percorrer os alunos.', 'Calcule a soma ponderada de cada aluno separadamente.', 'Divida pelo total de pesos.'])

add(11, '''  paginas: vetor[1..7] de inteiro
  i, atual, maior, inicioAtual, inicioMaior: inteiro''', '''  atual <- 0
  maior <- 0
  para i de 1 ate 7 faca
    escreva("Páginas lidas no dia ", i, ": ")
    leia(paginas[i])
    se paginas[i] > 0 entao
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
  escreval("Maior sequência de leitura: ", maior, " dia(s)")
  se maior > 0 entao
    escreval("Dias ", inicioMaior, " a ", inicioMaior + maior - 1)
  fimse''',
    'Leia páginas lidas em sete dias. Um dia de progresso tem pelo menos uma página; encontre a maior sequência de dias consecutivos de progresso.',
    'Páginas: 2, 3, 0, 1, 5, 2, 0\nMaior sequência: 3 dias, do dia 4 ao 6',
    'Se ninguém leu páginas na semana, a sequência é zero.',
    'O contador atual zera quando aparecem zero páginas e o maior guarda a melhor sequência.',
    ['Defina progresso como páginas > 0.', 'Conte dias consecutivos com progresso.', 'Guarde o começo da sequência mais longa.'])

add(12, '''  termo, definicao: vetor[1..5] de caractere
  busca, nova: caractere
  i, encontrado, acao: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Termo ", i, ": ")
    leia(termo[i])
    escreva("Definição: ")
    leia(definicao[i])
  fimpara
  escreva("Ação (1 buscar, 2 atualizar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Termo procurado: ")
    leia(busca)
    encontrado <- 0
    para i de 1 ate 5 faca
      se termo[i] = busca entao
        encontrado <- i
      fimse
    fimpara
    se encontrado > 0 entao
      se acao = 2 entao
        escreva("Nova definição: ")
        leia(nova)
        definicao[encontrado] <- nova
      fimse
      escreval(termo[encontrado], ": ", definicao[encontrado])
    senao
      escreval("Termo não encontrado.")
    fimse
    escreva("Ação (1 buscar, 2 atualizar, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Cadastre cinco pares termo/definição. Permita busca exata por termo e atualização da definição encontrada.',
    'Termo vetor → coleção indexada\nAtualização para “lista indexada”\nBusca vetor → lista indexada',
    'Termo ausente não altera nenhuma definição.',
    'Os dois vetores são paralelos: a posição localizada na busca indica qual definição pode ser lida ou substituída.',
    ['Guarde termo e definição no mesmo índice.', 'Procure o termo antes de editar.', 'Uma atualização altera apenas a definição correspondente.'])

add(13, '''  resposta, gabarito: inteiro
  i, acertos: inteiro
  percentual: real''', '''  acertos <- 0
  para i de 1 ate 5 faca
    escreva("Questão ", i, ": quanto é ", i, " x 2? ")
    leia(resposta)
    gabarito <- i * 2
    se resposta = gabarito entao
      acertos <- acertos + 1
      escreval("Correto.")
    senao
      escreval("Resposta correta: ", gabarito)
    fimse
  fimpara
  percentual <- acertos * 100 / 5
  escreval("Acertos: ", acertos, "/5 (", percentual, "%)")''',
    'Faça cinco perguntas de tabuada do dois, com dificuldade fixa. Corrija imediatamente e apresente a taxa final de acertos.',
    'Respostas 2, 4, 6, 8, 10\nAcertos: 5/5 (100%)',
    'Com nenhuma resposta certa, a taxa é 0%.',
    'O gabarito da pergunta i é `i * 2`; cada acerto soma uma unidade ao contador.',
    ['Gere perguntas de dificuldade igual por uma regra simples.', 'Compare cada resposta com o gabarito calculado.', 'Divida acertos pelo total fixo de cinco.'])

add(14, '''  gabarito, resposta: vetor[1..5] de caractere
  i, acertos: inteiro''', '''  acertos <- 0
  para i de 1 ate 5 faca
    escreva("Gabarito da questão ", i, " (A/B/C): ")
    leia(gabarito[i])
  fimpara
  para i de 1 ate 5 faca
    escreva("Resposta da questão ", i, ": ")
    leia(resposta[i])
    se resposta[i] = gabarito[i] entao
      acertos <- acertos + 1
    fimse
  fimpara
  escreval("Pontuação: ", acertos, "/5")
  para i de 1 ate 5 faca
    se resposta[i] <> gabarito[i] entao
      escreval("Rever questão ", i, ": sua resposta ", resposta[i], ", correta ", gabarito[i])
    fimse
  fimpara''',
    'Cadastre o gabarito de cinco perguntas e leia cinco respostas. Cada acerto vale um ponto. Ao final, mostre somente as questões erradas para revisão.',
    'Gabarito A,B,C,A,B; respostas A,B,A,A,B\nPontuação: 4/5\nRever questão 3: sua resposta A, correta C',
    'Se tudo estiver correto, não haverá linhas de revisão.',
    'Os vetores permitem comparar as mesmas posições novamente após calcular a pontuação.',
    ['Guarde gabarito e respostas separadamente.', 'Conte igualdade posição a posição.', 'Depois percorra de novo para explicar os erros.'])

add(15, '''  notas: vetor[1..7] de real
  i, j: inteiro
  soma, minimo, maximo, mediana, aux: real''', '''  soma <- 0
  para i de 1 ate 7 faca
    escreva("Nota ", i, ": ")
    leia(notas[i])
    soma <- soma + notas[i]
    se (i = 1) ou (notas[i] < minimo) entao
      minimo <- notas[i]
    fimse
    se (i = 1) ou (notas[i] > maximo) entao
      maximo <- notas[i]
    fimse
  fimpara
  para i de 1 ate 6 faca
    para j de i + 1 ate 7 faca
      se notas[j] < notas[i] entao
        aux <- notas[i]
        notas[i] <- notas[j]
        notas[j] <- aux
      fimse
    fimpara
  fimpara
  mediana <- notas[4]
  escreval("Mínima: ", minimo)
  escreval("Máxima: ", maximo)
  escreval("Média: ", soma / 7)
  escreval("Mediana: ", mediana)''',
    'Leia sete notas e calcule mínimo, máximo, média aritmética e mediana. Como há sete valores, a mediana é o quarto após ordenação.',
    'Notas: 1, 2, 3, 4, 5, 6, 7\nMínima: 1; máxima: 7; média: 4; mediana: 4',
    'Notas repetidas permanecem na ordenação e entram normalmente na média e mediana.',
    'A soma é feita antes da ordenação; mínimo e máximo são observados na leitura; a mediana vem da posição central do vetor ordenado.',
    ['Calcule a soma durante a leitura.', 'Ordene as sete notas.', 'A quarta posição é a mediana para quantidade ímpar de sete.'])

add(16, '''  notaAtual, pesoAtual, pesoFinal, minimo, precisa, simulada, media: real
  i: inteiro''', '''  escreva("Nota já obtida: ")
  leia(notaAtual)
  escreva("Peso da nota já obtida: ")
  leia(pesoAtual)
  escreva("Peso da avaliação final: ")
  leia(pesoFinal)
  escreva("Média mínima: ")
  leia(minimo)
  se pesoFinal > 0 entao
    precisa <- (minimo * (pesoAtual + pesoFinal) - notaAtual * pesoAtual) / pesoFinal
    escreval("Nota necessária na avaliação final: ", precisa)
    para i de 1 ate 3 faca
      escreva("Cenário ", i, " — nota final simulada: ")
      leia(simulada)
      media <- (notaAtual * pesoAtual + simulada * pesoFinal) / (pesoAtual + pesoFinal)
      escreval("Média do cenário: ", media)
      se media >= minimo entao
        escreval("Aprovado neste cenário.")
      senao
        escreval("Ainda abaixo da média.")
      fimse
    fimpara
  senao
    escreval("O peso final deve ser positivo.")
  fimse''',
    'Leia nota atual, seus pesos e média mínima. Calcule a nota necessária na avaliação final e permita testar três notas finais hipotéticas.',
    'Nota atual 6, peso 1; final peso 1; mínimo 7\nNota necessária: 8\nCenário final 8 → média 7, aprovado',
    'Nota necessária acima de dez indica que a meta não seria alcançável em uma avaliação limitada a dez pontos.',
    'A equação da média ponderada é isolada para encontrar a nota final; cada cenário reaplica a fórmula completa.',
    ['Escreva a fórmula da média ponderada.', 'Isole a nota final desconhecida.', 'Recalcule a média para cada cenário digitado.'])

add(17, '''  versao: vetor[1..10] de caractere
  i: inteiro''', '''  para i de 1 ate 10 faca
    se i mod 2 = 1 entao
      versao[i] <- "A"
    senao
      versao[i] <- "B"
    fimse
  fimpara
  para i de 1 ate 10 faca
    escreval("Assento ", i, ": versão ", versao[i])
  fimpara''',
    'Distribua duas versões de prova por dez assentos em uma fileira. Assentos vizinhos devem receber versões diferentes.',
    'Assentos 1 a 4 → A, B, A, B',
    'A alternância garante que nenhum par de assentos consecutivos compartilhe a versão.',
    'A paridade do número do assento escolhe entre A e B.',
    ['Atribua A a posições ímpares.', 'Atribua B a posições pares.', 'Percorra os dez assentos para conferir a alternância.'])

add(18, '''  titulo, borda: caractere
  largura, i: inteiro''', '''  escreva("Título: ")
  leia(titulo)
  largura <- compr(titulo) + 4
  borda <- ""
  para i de 1 ate largura faca
    borda <- borda + "*"
  fimpara
  escreval(borda)
  escreval("* ", titulo, " *")
  escreval(borda)''',
    'Leia um título e desenhe uma moldura retangular com uma margem de um espaço em cada lado.',
    'Título: Aula\n********\n* Aula *\n********',
    'A largura da borda é o comprimento do título mais quatro caracteres: dois asteriscos laterais e dois espaços.',
    'O laço constrói uma linha de asteriscos da largura calculada, reutilizada acima e abaixo.',
    ['Conte os caracteres do título.', 'Some quatro para a largura externa.', 'Use a mesma borda no topo e na base.'])

add(19, '''  notas: vetor[1..5] de real
  i: inteiro
  antes: real''', '''  para i de 1 ate 5 faca
    escreva("Nota original ", i, ": ")
    leia(notas[i])
    antes <- notas[i]
    se notas[i] < 5 entao
      notas[i] <- notas[i] + 2
    senao
      se notas[i] < 8 entao
        notas[i] <- notas[i] + 1
      fimse
    fimse
    se notas[i] > 10 entao
      notas[i] <- 10
    fimse
    escreval("Nota ", i, ": ", antes, " -> ", notas[i])
  fimpara''',
    'Aplique uma política de bônus a cinco notas: abaixo de 5 ganham 2 pontos; de 5 a menos de 8 ganham 1; de 8 em diante não ganham bônus. Teto final: 10.',
    'Notas originais 4, 6, 9 → notas finais 6, 7, 9',
    'Uma nota 5 recebe um ponto; uma nota 8 não recebe bônus.',
    'O programa guarda cada valor original antes da alteração para mostrar a mudança feita.',
    ['Separe faixas sem sobreposição.', 'Aplique o teto depois de somar bônus.', 'Mostre antes e depois de cada posição.'])

add(20, '''  sala: vetor[1..3, 1..3] de caractere
  nomeAuxiliar: caractere
  linhaA, colunaA, linhaB, colunaB, i, j: inteiro''', '''  para i de 1 ate 3 faca
    para j de 1 ate 3 faca
      escreva("Aluno da posição ", i, ",", j, ": ")
      leia(sala[i, j])
    fimpara
  fimpara
  escreva("Linha do primeiro assento: ")
  leia(linhaA)
  escreva("Coluna do primeiro assento: ")
  leia(colunaA)
  escreva("Linha do segundo assento: ")
  leia(linhaB)
  escreva("Coluna do segundo assento: ")
  leia(colunaB)
  se (linhaA >= 1) e (linhaA <= 3) e (colunaA >= 1) e (colunaA <= 3) e (linhaB >= 1) e (linhaB <= 3) e (colunaB >= 1) e (colunaB <= 3) entao
    nomeAuxiliar <- sala[linhaA, colunaA]
    sala[linhaA, colunaA] <- sala[linhaB, colunaB]
    sala[linhaB, colunaB] <- nomeAuxiliar
    para i de 1 ate 3 faca
      para j de 1 ate 3 faca
        escreval(i, ",", j, ": ", sala[i, j])
      fimpara
    fimpara
  senao
    escreval("Posição inválida.")
  fimse''',
    'Represente nove assentos em uma matriz 3 × 3. Leia nomes, escolha duas posições válidas e troque os estudantes dessas posições.',
    'Posição 1,1: Ana; posição 2,2: Bia\nTroca entre 1,1 e 2,2\nNovo 1,1: Bia; novo 2,2: Ana',
    'Trocar uma posição com ela mesma preserva a sala. Índices fora de 1 a 3 são recusados.',
    'Uma variável auxiliar guarda o nome da primeira posição enquanto a segunda é movida para ela.',
    ['Use linha e coluna para localizar cada assento.', 'Valide os quatro índices antes de acessar a matriz.', 'Troque usando uma variável auxiliar.'])

add(21, '''  gabarito: vetor[1..5] de caractere
  acertosQuestao: vetor[1..5] de inteiro
  resposta: caractere
  aluno, questao, acertos: inteiro''', '''  para questao de 1 ate 5 faca
    escreva("Gabarito da questão ", questao, ": ")
    leia(gabarito[questao])
    acertosQuestao[questao] <- 0
  fimpara
  para aluno de 1 ate 3 faca
    acertos <- 0
    para questao de 1 ate 5 faca
      escreva("Aluno ", aluno, ", questão ", questao, ": ")
      leia(resposta)
      se resposta = gabarito[questao] entao
        acertos <- acertos + 1
        acertosQuestao[questao] <- acertosQuestao[questao] + 1
      fimse
    fimpara
    escreval("Aluno ", aluno, ": ", acertos, "/5")
  fimpara
  para questao de 1 ate 5 faca
    escreval("Questão ", questao, ": ", acertosQuestao[questao], " acerto(s)")
  fimpara''',
    'Leia gabarito de cinco questões e as respostas de três alunos. Mostre acertos por aluno e, depois, quantos alunos acertaram cada questão.',
    'Se os três alunos acertarem a questão 1, o relatório mostra “Questão 1: 3 acertos”.',
    'Nenhum acerto em uma questão produz contagem zero.',
    'A cada resposta correta são atualizados o total do aluno e a contagem daquela questão.',
    ['Inicie uma contagem por questão.', 'Zere o total antes de cada aluno.', 'Atualize os dois contadores no mesmo acerto.'])

add(22, '''  sala, professor: vetor[1..5] de caractere
  inicioMin, fimMin: vetor[1..5] de inteiro
  i, j: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Sala da aula ", i, ": ")
    leia(sala[i])
    escreva("Professor: ")
    leia(professor[i])
    escreva("Início em minutos: ")
    leia(inicioMin[i])
    escreva("Fim em minutos: ")
    leia(fimMin[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se (inicioMin[i] < fimMin[j]) e (inicioMin[j] < fimMin[i]) entao
        se sala[i] = sala[j] entao
          escreval("Conflito de sala entre aulas ", i, " e ", j)
        fimse
        se professor[i] = professor[j] entao
          escreval("Conflito de professor entre aulas ", i, " e ", j)
        fimse
      fimse
    fimpara
  fimpara''',
    'Cadastre cinco aulas com sala, professor, início e fim em minutos. Compare todos os pares: horários sobrepostos geram conflito se compartilham sala ou professor.',
    'Aula 1: sala A, Ana, 600–650; aula 2: sala A, Bia, 630–680\nConflito de sala entre aulas 1 e 2',
    'Aulas adjacentes, com início de uma igual ao fim da outra, não conflitam.',
    'O par de intervalos cruza quando cada início precede o fim do outro; só então se comparam recursos.',
    ['Percorra pares sem repetir a ordem inversa.', 'Detecte sobreposição de horários antes de comparar nomes.', 'Informe sala e professor de forma independente.'])

add(23, '''  dadas, presencas, restantes, faltasFuturas: inteiro
  previstas, frequencia: real''', '''  escreva("Aulas já dadas: ")
  leia(dadas)
  escreva("Presenças até agora: ")
  leia(presencas)
  escreva("Aulas restantes: ")
  leia(restantes)
  escreva("Faltas previstas nas restantes: ")
  leia(faltasFuturas)
  se (dadas >= 0) e (presencas >= 0) e (presencas <= dadas) e (restantes >= 0) e (faltasFuturas >= 0) e (faltasFuturas <= restantes) e (dadas + restantes > 0) entao
    previstas <- presencas + restantes - faltasFuturas
    frequencia <- previstas * 100 / (dadas + restantes)
    escreval("Frequência final estimada: ", frequencia, "%")
  senao
    escreval("Contagens inválidas.")
  fimse''',
    'Leia aulas dadas e presenças já registradas, depois aulas restantes e faltas futuras previstas. Calcule a frequência sobre o total de aulas do período.',
    'Dadas 20, presenças 18; restam 10, faltas futuras 2\nPresenças finais 26 de 30\nFrequência estimada: 86,67%',
    'Se não houver nenhuma aula no período, a porcentagem não é definida.',
    'Presenças futuras são aulas restantes menos faltas previstas. O denominador inclui aulas já dadas e futuras.',
    ['Calcule as presenças futuras.', 'Some-as às presenças atuais.', 'Divida pelo total final de aulas.'])

add(24, '''  total: vetor[1..3] de real
  contagem: vetor[1..3] de inteiro
  disciplina, registros, i, j: inteiro
  duracao: real''', '''  para j de 1 ate 3 faca
    total[j] <- 0
    contagem[j] <- 0
  fimpara
  escreva("Número de registros: ")
  leia(registros)
  para i de 1 ate registros faca
    escreva("Disciplina (1 a 3): ")
    leia(disciplina)
    escreva("Duração da aula (min): ")
    leia(duracao)
    se (disciplina >= 1) e (disciplina <= 3) e (duracao >= 0) entao
      total[disciplina] <- total[disciplina] + duracao
      contagem[disciplina] <- contagem[disciplina] + 1
    fimse
  fimpara
  para j de 1 ate 3 faca
    se contagem[j] > 0 entao
      escreval("Disciplina ", j, ": média ", total[j] / contagem[j], " min")
    senao
      escreval("Disciplina ", j, ": sem registros")
    fimse
  fimpara''',
    'Leia registros de aula para três disciplinas identificadas por códigos. A média de cada disciplina é a soma de suas durações dividida pela quantidade de registros dela.',
    'Registros: disciplina 1, 40 min; disciplina 1, 60 min; disciplina 2, 45 min\nMédias: disciplina 1 = 50; disciplina 2 = 45; disciplina 3 sem registros',
    'Não divida por zero quando uma disciplina não tiver aulas cadastradas.',
    'Os vetores guardam soma e contagem por disciplina para calcular três médias independentes.',
    ['Use o código da disciplina como índice.', 'Guarde soma e contagem separadas.', 'Calcule apenas quando a contagem for positiva.'])

add(25, '''  carteira: vetor[1..3, 1..4] de inteiro
  i, j, livres, ocupadas, interditadas: inteiro''', '''  livres <- 0
  ocupadas <- 0
  interditadas <- 0
  para i de 1 ate 3 faca
    para j de 1 ate 4 faca
      escreva("Carteira ", i, ",", j, " (0 livre, 1 ocupada, 2 interditada): ")
      leia(carteira[i, j])
      se carteira[i, j] = 0 entao
        livres <- livres + 1
      senao
        se carteira[i, j] = 1 entao
          ocupadas <- ocupadas + 1
        senao
          se carteira[i, j] = 2 entao
            interditadas <- interditadas + 1
          fimse
        fimse
      fimse
    fimpara
  fimpara
  escreval("Livres: ", livres)
  escreval("Ocupadas: ", ocupadas)
  escreval("Interditadas: ", interditadas)''',
    'Modele uma sala de três linhas por quatro colunas. Use 0 para carteira livre, 1 ocupada e 2 interditada; conte cada estado.',
    'Doze posições: 5 livres, 6 ocupadas e 1 interditada\nRelatório: 5, 6 e 1',
    'Códigos diferentes de 0, 1 e 2 não entram em nenhuma contagem.',
    'A matriz preserva a posição das carteiras enquanto os contadores resumem os estados.',
    ['Use dois laços para percorrer todas as posições.', 'Trate os três códigos separadamente.', 'Confira se os três totais somam doze quando todas as entradas são válidas.'])

add(26, '''  valores: vetor[1..10] de real
  diferenca, razao: real
  aritmetica, geometrica: logico
  i: inteiro''', '''  para i de 1 ate 10 faca
    escreva("Valor ", i, ": ")
    leia(valores[i])
  fimpara
  diferenca <- valores[2] - valores[1]
  aritmetica <- verdadeiro
  geometrica <- verdadeiro
  para i de 3 ate 10 faca
    se valores[i] - valores[i - 1] <> diferenca entao
      aritmetica <- falso
    fimse
  fimpara
  se valores[1] = 0 entao
    para i de 2 ate 10 faca
      se valores[i] <> 0 entao
        geometrica <- falso
      fimse
    fimpara
  senao
    razao <- valores[2] / valores[1]
    para i de 2 ate 10 faca
      se valores[i] <> valores[i - 1] * razao entao
        geometrica <- falso
      fimse
    fimpara
  fimse
  se aritmetica entao
    escreval("Progressão aritmética")
  fimse
  se geometrica entao
    escreval("Progressão geométrica")
  fimse
  se (nao aritmetica) e (nao geometrica) entao
    escreval("Nenhuma das duas progressões")
  fimse''',
    'Leia dez valores reais. Uma progressão aritmética tem diferença constante; uma geométrica tem razão constante. Uma sequência constante pode satisfazer ambas.',
    'Valores: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20\nProgressão aritmética',
    'Dez zeros são PA e PG. Se o primeiro valor for zero e houver valor posterior não nulo, não classifique como PG.',
    'As diferenças são comparadas com a primeira diferença. A razão só é calculada se o primeiro valor não for zero.',
    ['Compare diferenças consecutivas para PA.', 'Evite dividir por zero ao investigar PG.', 'Não force uma escolha única se a sequência satisfizer ambas.'])

add(27, '''  alunos: vetor[1..6] de caractere
  i, rodada, posicao: inteiro''', '''  para i de 1 ate 6 faca
    escreva("Aluno ", i, ": ")
    leia(alunos[i])
  fimpara
  para rodada de 1 ate 3 faca
    escreval("Rodada ", rodada)
    para posicao de 1 ate 6 faca
      i <- ((posicao + rodada - 2) mod 6) + 1
      escreval(posicao, "º: ", alunos[i])
    fimpara
  fimpara''',
    'Cadastre seis alunos e monte três rodadas de apresentação. Em cada rodada, todos aparecem uma vez; o primeiro nome gira uma posição a cada rodada.',
    'Alunos A,B,C,D,E,F\nRodada 1: A,B,C,D,E,F\nRodada 2: B,C,D,E,F,A',
    'Nenhum aluno se repete dentro da mesma rodada.',
    'O cálculo com `mod 6` circula pelos seis índices sem sair do vetor.',
    ['Guarde os seis nomes.', 'Use deslocamento diferente por rodada.', 'A operação `mod` permite voltar ao primeiro índice.'])

add(28, '''  pedido: vetor[1..4] de inteiro
  estoque, entregue, faltante, i: inteiro''', '''  escreva("Apostilas em estoque: ")
  leia(estoque)
  para i de 1 ate 4 faca
    escreva("Pedido da turma ", i, ": ")
    leia(pedido[i])
  fimpara
  para i de 1 ate 4 faca
    entregue <- pedido[i]
    se entregue > estoque entao
      entregue <- estoque
    fimse
    se entregue < 0 entao
      entregue <- 0
    fimse
    estoque <- estoque - entregue
    faltante <- pedido[i] - entregue
    escreval("Turma ", i, ": entregue ", entregue, ", falta ", faltante)
  fimpara
  escreval("Estoque final: ", estoque)''',
    'Leia estoque e pedidos de quatro turmas. Atenda na ordem informada, até acabar o estoque. Para cada turma, mostre unidades entregues e faltantes.',
    'Estoque 5; pedidos 3, 4, 1, 1\nEntregas 3, 2, 0, 0; faltas 0, 2, 1, 1',
    'Pedido igual ao saldo disponível é atendido integralmente e deixa estoque zero.',
    'A quantidade entregue é o menor valor entre pedido e estoque restante.',
    ['Mantenha o estoque restante.', 'Atenda cada turma em ordem.', 'Calcule falta como pedido menos entrega.'])

add(29, '''  turma: vetor[1..5] de caractere
  dia, mes: vetor[1..5] de inteiro
  i, j: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Turma da avaliação ", i, ": ")
    leia(turma[i])
    escreva("Dia: ")
    leia(dia[i])
    escreva("Mês: ")
    leia(mes[i])
    se (dia[i] < 1) ou (dia[i] > 31) ou (mes[i] < 1) ou (mes[i] > 12) entao
      escreval("Data fora da faixa geral.")
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se (turma[i] = turma[j]) e (dia[i] = dia[j]) e (mes[i] = mes[j]) entao
        escreval("Conflito para turma ", turma[i], " entre avaliações ", i, " e ", j)
      fimse
    fimpara
  fimpara''',
    'Cadastre cinco avaliações com turma, dia e mês. Avise se a mesma turma tiver duas avaliações na mesma data.',
    'Avaliações 1 e 3: turma 7A em 10/05\nConflito para turma 7A entre avaliações 1 e 3',
    'Turmas diferentes podem ter prova na mesma data. A validação de datas deste exercício verifica apenas faixas gerais, não dias específicos de cada mês.',
    'O laço interno compara cada avaliação somente com as posteriores para evitar avisos duplicados.',
    ['Guarde turma e data em vetores da mesma posição.', 'Compare pares com índices diferentes.', 'Exija igualdade de turma, dia e mês para marcar conflito.'])

add(30, '''  exercicios: vetor[1..3, 1..4] de inteiro
  aluno, semana: inteiro
  evolucao: real''', '''  para aluno de 1 ate 3 faca
    para semana de 1 ate 4 faca
      escreva("Aluno ", aluno, ", semana ", semana, ": ")
      leia(exercicios[aluno, semana])
    fimpara
    se exercicios[aluno, 1] > 0 entao
      evolucao <- (exercicios[aluno, 4] - exercicios[aluno, 1]) * 100 / exercicios[aluno, 1]
      escreval("Aluno ", aluno, ": evolução ", evolucao, "%")
    senao
      escreval("Aluno ", aluno, ": evolução percentual indefinida (primeira semana zero)")
    fimse
  fimpara''',
    'Leia exercícios feitos por três alunos em quatro semanas. Compare a quarta semana com a primeira usando variação percentual.',
    'Aluno: semanas 5, 6, 7, 10\nEvolução da primeira à quarta: 100%',
    'Se a primeira semana tiver zero exercícios, a variação percentual é indefinida; evite divisão por zero.',
    'A fórmula `(final - inicial) / inicial × 100` mede o crescimento relativo ao ponto de partida.',
    ['Guarde semanas em colunas de uma matriz.', 'Use a primeira como base.', 'Trate base zero separadamente.'])

add(31, '''  nome: vetor[1..4] de caractere
  media: real
  frequencia: real
  i: inteiro''', '''  para i de 1 ate 4 faca
    escreva("Nome do aluno ", i, ": ")
    leia(nome[i])
    escreva("Média final (0 a 10): ")
    leia(media)
    escreva("Frequência (%): ")
    leia(frequencia)
    se (media >= 7) e (frequencia >= 75) entao
      escreval("CERTIFICADO — ", nome[i], " concluiu o curso.")
    senao
      escreval(nome[i], " ainda não atende aos critérios.")
    fimse
  fimpara''',
    'Cadastre quatro alunos e gere certificado textual somente para quem alcançar média mínima 7 e frequência mínima 75%.',
    'Ana: média 8, frequência 80% → certificado\nBia: média 8, frequência 70% → sem certificado',
    'Igualdade com os dois limites é suficiente. Cumprir apenas um deles não basta.',
    'A condição usa `e`, pois ambos os requisitos precisam ser verdadeiros.',
    ['Leia média e frequência de cada aluno.', 'Use comparação inclusiva nos dois limites.', 'Combine as condições com `e`.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catalog contains {len(entries)} reviewed challenge solutions")

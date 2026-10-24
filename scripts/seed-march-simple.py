#!/usr/bin/env python3
"""Curated simple March exercises."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/challenge-solutions.json"
entries = json.loads(CATALOG.read_text(encoding="utf-8"))
rows = {r["data_mm_dd"]: r for r in csv.DictReader((ROOT / "data/visualg_365_dias_730_desafios.csv").open(encoding="utf-8"))}


def add(day, variables, body, rules, example, edge, explanation):
    date = f"03-{day:02d}"
    prompt = rows[date]["simples_enunciado"]
    code = f'algoritmo "Desafio03{day:02d}S"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f"{date}/simples"] = dict(
        code=code, objective=prompt[0].upper() + prompt[1:] + " O resultado deve ser mostrado ao estudante.",
        rules=rules, example=example, edge=edge, explanation=explanation,
        hints=["Separe os dados informados dos valores que o algoritmo precisa calcular.",
               "Escolha a operação ou comparação adequada antes de escrever a saída.",
               "Teste a situação normal e o caso de fronteira indicado."])


add(1, '  nome, turma: caractere', '''  escreva("Nome: ")
  leia(nome)
  escreva("Turma: ")
  leia(turma)
  escreval("Estudante: ", nome, " — turma ", turma)''',
    'Leia dois textos, nome e turma, e reúna-os em uma identificação de uma linha.',
    'Nome: Ana\nTurma: 7A\nEstudante: Ana — turma 7A',
    'Uma turma com letras e números deve ser tratada como texto.',
    'As duas variáveis são impressas na mesma ordem em que foram solicitadas.')

add(2, '  caderno, lapis, borracha, total: real', '''  escreva("Preço do caderno: ")
  leia(caderno)
  escreva("Preço do lápis: ")
  leia(lapis)
  escreva("Preço da borracha: ")
  leia(borracha)
  total <- caderno + lapis + borracha
  escreval("Total: ", total)''',
    'Leia três preços na mesma moeda e some-os para obter o custo do material.',
    'Caderno: 10; lápis: 2; borracha: 3\nTotal: 15',
    'Um item de preço zero não altera a soma.',
    'A variável `total` conserva a soma dos três itens.')

add(3, '  nota, minima: real', '''  escreva("Nota: ")
  leia(nota)
  escreva("Média mínima: ")
  leia(minima)
  se nota >= minima entao
    escreval("Alcançou a média mínima.")
  senao
    escreval("Não alcançou a média mínima.")
  fimse''',
    'Compare uma nota com o valor mínimo informado. Igualdade conta como alcance da média.',
    'Nota: 7\nMédia mínima: 6\nAlcançou a média mínima.',
    'Nota igual ao mínimo também produz “alcançou”.',
    'A comparação inclusiva `>=` representa corretamente o limite.')

add(4, '  horas, minutos: real', '''  escreva("Horas de estudo: ")
  leia(horas)
  minutos <- horas * 60
  escreval("Minutos: ", minutos)''',
    'Leia horas, inclusive valores fracionários, e multiplique por sessenta.',
    'Horas de estudo: 1.5\nMinutos: 90',
    'Zero hora corresponde a zero minuto.',
    'Usar tipo real permite representar meia hora sem perder informação.')

add(5, '  total, presencas: inteiro\n  percentual: real', '''  escreva("Total de aulas: ")
  leia(total)
  escreva("Comparecimentos: ")
  leia(presencas)
  se (total > 0) e (presencas >= 0) e (presencas <= total) entao
    percentual <- presencas * 100 / total
    escreval("Presença: ", percentual, "%")
  senao
    escreval("Contagens inválidas.")
  fimse''',
    'Leia total de aulas e quantidade de comparecimentos. Divida comparecimentos pelo total e multiplique por 100.',
    'Total de aulas: 20\nComparecimentos: 15\nPresença: 75%',
    'Total zero é inválido porque impede calcular a porcentagem.',
    'A validação também evita percentuais inferiores a zero ou superiores a cem.')

add(6, '  resposta: caractere', '''  escreva("Tarefa entregue? (SIM/NÃO): ")
  leia(resposta)
  se (resposta = "SIM") ou (resposta = "sim") entao
    escreval("ENTREGUE")
  senao
    se (resposta = "NÃO") ou (resposta = "não") ou (resposta = "NAO") ou (resposta = "nao") entao
      escreval("PENDENTE")
    senao
      escreval("Resposta inválida")
    fimse
  fimse''',
    'Leia uma resposta SIM ou NÃO. Mostre ENTREGUE para SIM e PENDENTE para NÃO.',
    'Tarefa entregue? (SIM/NÃO): NÃO\nPENDENTE',
    'Texto diferente das respostas esperadas é sinalizado como inválido.',
    'As duas respostas reconhecidas têm saídas distintas e explícitas.')

add(7, '  a, b, c: caractere', '''  escreva("Disciplina 1: ")
  leia(a)
  escreva("Disciplina 2: ")
  leia(b)
  escreva("Disciplina 3: ")
  leia(c)
  escreval(a)
  escreval(b)
  escreval(c)''',
    'Leia os nomes de três disciplinas e imprima cada uma em sua própria linha, preservando a ordem.',
    'Entradas: Matemática, História, Arte\nMatemática\nHistória\nArte',
    'Nomes com espaços são preservados.',
    'Não há ordenação: a saída acompanha exatamente a sequência digitada.')

add(8, '  inicioMin, duracao, fimMin: inteiro', '''  escreva("Início (minutos): ")
  leia(inicioMin)
  escreva("Duração do recreio (minutos): ")
  leia(duracao)
  se (inicioMin >= 0) e (duracao >= 0) entao
    fimMin <- inicioMin + duracao
    escreval("Fim (minutos): ", fimMin)
  senao
    escreval("Horário inválido.")
  fimse''',
    'Leia início e duração em minutos desde uma mesma referência e some os valores.',
    'Início: 600\nDuração: 20\nFim: 620',
    'Duração zero produz fim igual ao início.',
    'A adição resulta no horário final na mesma escala de minutos.')

add(9, '  disponiveis, emprestados, restantes: inteiro', '''  escreva("Livros disponíveis inicialmente: ")
  leia(disponiveis)
  escreva("Livros emprestados: ")
  leia(emprestados)
  se (emprestados >= 0) e (emprestados <= disponiveis) entao
    restantes <- disponiveis - emprestados
    escreval("Livros restantes: ", restantes)
  senao
    escreval("Contagens inválidas.")
  fimse''',
    'Subtraia os livros emprestados dos exemplares disponíveis antes dos empréstimos.',
    'Disponíveis: 30\nEmprestados: 8\nLivros restantes: 22',
    'Emprestar todos os exemplares deixa zero livro disponível.',
    'A validação impede que a contagem final fique negativa.')

add(10, '  a, b, c, d, media: real', '''  escreva("Nota 1: ")
  leia(a)
  escreva("Nota 2: ")
  leia(b)
  escreva("Nota 3: ")
  leia(c)
  escreva("Nota 4: ")
  leia(d)
  media <- (a + b + c + d) / 4
  escreval("Média: ", media)''',
    'Leia quatro notas de mesmo peso e divida sua soma por quatro.',
    'Notas: 5, 7, 9, 7\nMédia: 7',
    'Quatro notas iguais têm média igual a cada uma delas.',
    'Os parênteses aplicam a divisão à soma completa.')

add(11, '  quantidade, pagina: inteiro', '''  escreva("Última página: ")
  leia(quantidade)
  para pagina de 1 ate quantidade faca
    escreval("Página ", pagina)
  fimpara''',
    'Leia N e imprima os números das páginas de 1 até N.',
    'Última página: 3\nPágina 1\nPágina 2\nPágina 3',
    'Se N for zero, não existe página a mostrar.',
    'O contador do laço representa diretamente o número da página.')

add(12, '  palavra: caractere\n  caracteres: inteiro', '''  escreva("Palavra: ")
  leia(palavra)
  caracteres <- compr(palavra)
  escreval("Caracteres: ", caracteres)''',
    'Leia uma palavra e use seu comprimento para contar caracteres.',
    'Palavra: escola\nCaracteres: 6',
    'Uma cadeia vazia contém zero caractere.',
    'A função `compr` retorna o número de caracteres do texto lido.')

add(13, '  numero, i: inteiro', '''  escreva("Número: ")
  leia(numero)
  para i de 1 ate 10 faca
    escreval(numero, " x ", i, " = ", numero * i)
  fimpara''',
    'Leia um número inteiro e mostre dez produtos, do multiplicador 1 ao 10.',
    'Número: 3\n3 x 1 = 3\n...\n3 x 10 = 30',
    'A tabuada do zero apresenta dez resultados zero.',
    'O laço fornece cada multiplicador e a multiplicação calcula a linha.')

add(14, '  numero: inteiro', '''  escreva("Número inteiro: ")
  leia(numero)
  se numero mod 2 = 0 entao
    escreval("Par")
  senao
    escreval("Ímpar")
  fimse''',
    'Leia um inteiro e confira o resto da divisão por dois.',
    'Número inteiro: 7\nÍmpar',
    'Zero é par; números negativos também podem ser classificados.',
    'Resto zero identifica um múltiplo de dois.')

add(15, '  a, b, c, maior: real', '''  escreva("Nota 1: ")
  leia(a)
  escreva("Nota 2: ")
  leia(b)
  escreva("Nota 3: ")
  leia(c)
  maior <- a
  se b > maior entao
    maior <- b
  fimse
  se c > maior entao
    maior <- c
  fimse
  escreval("Maior nota: ", maior)''',
    'Leia três notas e compare cada uma com o maior valor observado até então.',
    'Notas: 6, 9, 8\nMaior nota: 9',
    'Se todas forem iguais, a maior é esse valor comum.',
    'Inicializar `maior` com a primeira nota funciona mesmo para valores negativos.')

add(16, '  media, minima: real', '''  escreva("Média do aluno: ")
  leia(media)
  escreva("Média mínima para aprovação: ")
  leia(minima)
  se media >= minima entao
    escreval("Aprovado")
  senao
    escreval("Reprovado")
  fimse''',
    'Leia a média alcançada e o mínimo necessário. Use comparação inclusiva para aprovar.',
    'Média do aluno: 7\nMédia mínima: 6\nAprovado',
    'Média exatamente igual ao mínimo é aprovada.',
    'A condição `>=` traduz “alcançar a média mínima”.')

add(17, '  quantidade, aluno: inteiro', '''  escreva("Número de alunos: ")
  leia(quantidade)
  para aluno de 1 ate quantidade faca
    escreval("Aluno ", aluno)
  fimpara''',
    'Leia N e imprima uma numeração de alunos de 1 até N.',
    'Número de alunos: 3\nAluno 1\nAluno 2\nAluno 3',
    'Com zero alunos, nenhuma linha numerada é impressa.',
    'A variável de controle fornece automaticamente o próximo número.')

add(18, '  quantidade, i: inteiro', '''  escreva("Quantidade de asteriscos: ")
  leia(quantidade)
  para i de 1 ate quantidade faca
    escreva("*")
  fimpara
  escreval("")''',
    'Leia N e escreva exatamente N asteriscos na mesma linha.',
    'Quantidade de asteriscos: 5\n*****',
    'Para N igual a zero, a linha fica vazia.',
    '`escreva` não quebra a linha a cada asterisco; `escreval` encerra a linha após o laço.')

add(19, '  nota, final: real', '''  escreva("Nota antes do bônus: ")
  leia(nota)
  final <- nota + 1
  se final > 10 entao
    final <- 10
  fimse
  escreval("Nota final: ", final)''',
    'Some um ponto de bônus à nota, mas limite o resultado a dez.',
    'Nota antes do bônus: 9.5\nNota final: 10',
    'Nota 10 continua 10 após o bônus.',
    'A comparação posterior à soma impede nota superior ao teto.')

add(20, '  assentoA, assentoB, auxiliar: inteiro', '''  escreva("Número do assento A: ")
  leia(assentoA)
  escreva("Número do assento B: ")
  leia(assentoB)
  auxiliar <- assentoA
  assentoA <- assentoB
  assentoB <- auxiliar
  escreval("Novo assento A: ", assentoA)
  escreval("Novo assento B: ", assentoB)''',
    'Leia dois números de assento e troque os valores usando uma terceira variável.',
    'Assento A: 3; assento B: 8\nNovo assento A: 8\nNovo assento B: 3',
    'Se os números forem iguais, a troca conserva ambos.',
    '`auxiliar` guarda o valor antigo de A antes que A receba o valor de B.')

add(21, '  questoes, acertos: inteiro\n  percentual: real', '''  escreva("Questões: ")
  leia(questoes)
  escreva("Acertos: ")
  leia(acertos)
  se (questoes > 0) e (acertos >= 0) e (acertos <= questoes) entao
    percentual <- acertos * 100 / questoes
    escreval("Acertos: ", percentual, "%")
  senao
    escreval("Contagens inválidas.")
  fimse''',
    'Leia total de questões e acertos. Divida acertos pelo total e multiplique por cem.',
    'Questões: 20\nAcertos: 15\nAcertos: 75%',
    'Total zero não permite porcentagem; acertos não podem exceder questões.',
    'O cálculo só ocorre depois da validação das contagens.')

add(22, '  inicioMin, fimMin: inteiro', '''  escreva("Início (minutos): ")
  leia(inicioMin)
  escreva("Fim (minutos): ")
  leia(fimMin)
  se fimMin >= inicioMin entao
    escreval("Duração: ", fimMin - inicioMin, " minuto(s)")
  senao
    escreval("Intervalo inválido no mesmo dia.")
  fimse''',
    'Leia início e fim em minutos do mesmo dia e subtraia o início do fim.',
    'Início: 480\nFim: 530\nDuração: 50 minuto(s)',
    'Horários iguais produzem duração zero; fim anterior ao início é inválido.',
    'A diferença entre dois horários na mesma escala fornece o tempo transcorrido.')

add(23, '  primeiro, segundo, terceiro, total: inteiro', '''  escreva("Faltas do mês 1: ")
  leia(primeiro)
  escreva("Faltas do mês 2: ")
  leia(segundo)
  escreva("Faltas do mês 3: ")
  leia(terceiro)
  se (primeiro >= 0) e (segundo >= 0) e (terceiro >= 0) entao
    total <- primeiro + segundo + terceiro
    escreval("Total de faltas: ", total)
  senao
    escreval("Contagem inválida.")
  fimse''',
    'Leia três contagens mensais não negativas e apresente a soma.',
    'Faltas: 2, 1, 3\nTotal de faltas: 6',
    'Três meses sem faltas produzem total zero.',
    'A soma reúne as três contagens sem aplicar média.')

add(24, '  aulaA, aulaB: inteiro', '''  escreva("Duração da aula A (min): ")
  leia(aulaA)
  escreva("Duração da aula B (min): ")
  leia(aulaB)
  se aulaA > aulaB entao
    escreval("A aula A é mais longa.")
  senao
    se aulaB > aulaA entao
      escreval("A aula B é mais longa.")
    senao
      escreval("As aulas têm a mesma duração.")
    fimse
  fimse''',
    'Leia as durações de duas aulas em minutos e informe qual é maior ou se há empate.',
    'Aula A: 50; aula B: 45\nA aula A é mais longa.',
    'Durações iguais devem produzir mensagem de empate.',
    'As duas comparações estritas deixam a igualdade para o último ramo.')

add(25, '  carteira, inicioFaixa, fimFaixa: inteiro', '''  escreva("Número da carteira: ")
  leia(carteira)
  escreva("Primeira carteira válida: ")
  leia(inicioFaixa)
  escreva("Última carteira válida: ")
  leia(fimFaixa)
  se (inicioFaixa <= fimFaixa) e (carteira >= inicioFaixa) e (carteira <= fimFaixa) entao
    escreval("Carteira dentro do intervalo.")
  senao
    escreval("Carteira fora do intervalo.")
  fimse''',
    'Leia o número de carteira e as extremidades inclusivas de uma faixa válida.',
    'Carteira: 12; intervalo: 1 a 30\nCarteira dentro do intervalo.',
    'Os dois extremos pertencem ao intervalo.',
    'O programa verifica simultaneamente limite inferior, superior e ordem da faixa.')

add(26, '  numero, i: inteiro', '''  escreva("Número: ")
  leia(numero)
  para i de 1 ate 5 faca
    escreval(numero * i)
  fimpara''',
    'Leia um número inteiro e mostre seus múltiplos obtidos por fatores de 1 a 5.',
    'Número: 4\n4\n8\n12\n16\n20',
    'Para número zero, os cinco múltiplos mostrados são zero.',
    'O laço gera exatamente cinco fatores e imprime cada produto.')

add(27, '  quantidade, i: inteiro', '''  escreva("Alunos a saudar: ")
  leia(quantidade)
  para i de 1 ate quantidade faca
    escreval("Olá, aluno ", i, "!")
  fimpara''',
    'Leia N e mostre uma saudação numerada para cada aluno de 1 a N.',
    'Alunos a saudar: 2\nOlá, aluno 1!\nOlá, aluno 2!',
    'Com N zero, nenhuma saudação aparece.',
    'A variável do laço indica para qual aluno cada mensagem foi emitida.')

add(28, '  quantidade: inteiro\n  preco, total: real', '''  escreva("Quantidade de apostilas: ")
  leia(quantidade)
  escreva("Preço de uma apostila: ")
  leia(preco)
  se quantidade >= 0 entao
    total <- quantidade * preco
    escreval("Valor total: ", total)
  senao
    escreval("Quantidade inválida.")
  fimse''',
    'Leia quantidade e preço unitário; multiplique-os para obter o valor da compra.',
    'Quantidade: 5; preço unitário: 12\nValor total: 60',
    'Quantidade zero representa compra de valor zero.',
    'Cada apostila tem o mesmo preço, portanto multiplicação substitui soma repetida.')

add(29, '  dia, mes: inteiro', '''  escreva("Dia: ")
  leia(dia)
  escreva("Mês: ")
  leia(mes)
  se (dia >= 1) e (dia <= 31) e (mes >= 1) e (mes <= 12) entao
    se dia < 10 entao
      escreva("0")
    fimse
    escreva(dia, "/")
    se mes < 10 entao
      escreva("0")
    fimse
    escreval(mes)
  senao
    escreval("Data inválida.")
  fimse''',
    'Leia dia e mês numéricos e mostre dois dígitos em cada parte da data.',
    'Dia: 3\nMês: 9\n03/09',
    'O exercício valida faixas gerais, mas não verifica quantos dias cada mês realmente possui.',
    '`escreva` mantém as partes na mesma linha; o zero é adicionado quando o número tem um só dígito.')

add(30, '  concluidos, total, semana: inteiro', '''  total <- 0
  para semana de 1 ate 4 faca
    escreva("Exercícios concluídos na semana ", semana, ": ")
    leia(concluidos)
    se concluidos >= 0 entao
      total <- total + concluidos
    senao
      escreval("Contagem inválida ignorada.")
    fimse
  fimpara
  escreval("Total do mês: ", total)''',
    'Leia quatro contagens semanais e some apenas valores não negativos.',
    'Semanas: 3, 4, 5, 2\nTotal do mês: 14',
    'Semana com zero exercícios é válida.',
    'O acumulador `total` reúne as quatro semanas sem guardar cada contagem depois de somá-la.')

add(31, '  nome: caractere', '''  escreva("Nome do estudante: ")
  leia(nome)
  escreval(nome, ", continue praticando: cada exercício ajuda você a aprender!")''',
    'Leia o nome do estudante e inclua-o em uma frase motivadora.',
    'Nome do estudante: Ana\nAna, continue praticando: cada exercício ajuda você a aprender!',
    'Um nome composto permanece completo na mensagem.',
    'O texto fixo e a entrada formam uma mensagem personalizada.')

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catalog contains {len(entries)} reviewed challenge solutions")

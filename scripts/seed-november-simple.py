#!/usr/bin/env python3
"""Curated introductory November exercises based on the challenge CSV."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'11-{day:02d}'
    prompt = rows[date]['simples_enunciado']
    code = f'algoritmo "Desafio11{day:02d}S"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/simples'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '  bytes: inteiro', '''  escreva("Bytes: ")
  leia(bytes)
  se bytes < 0 entao
    escreval("Quantidade inválida")
  senao
    escreval("Bits: ", bytes * 8)
  fimse''', 'Um byte contém oito bits.',
    '3 bytes → 24 bits', 'Zero byte é zero bit.',
    'Multiplicar por oito converte a quantidade.',
    ['Leia bytes.', 'Multiplique por oito.', 'Mostre bits.'])

add(2, '  numero: inteiro', '''  escreva("Número inteiro: ")
  leia(numero)
  se numero mod 2 = 0 entao
    escreval("Par")
  senao
    escreval("Ímpar")
  fimse''', 'Número par deixa resto zero na divisão por dois.',
    '8 → par; 7 → ímpar', 'Zero é par; números negativos também podem ser classificados.',
    'O operador mod fornece o resto da divisão.',
    ['Leia inteiro.', 'Use mod 2.', 'Compare com zero.'])

add(3, '  entrada: inteiro', '''  escreva("Estado (1 ligado, 0 desligado): ")
  leia(entrada)
  se entrada = 1 entao
    escreval("LIGADO")
  senao
    escreval("Não ligado")
  fimse''', 'A saída LIGADO ocorre somente para entrada igual a 1.',
    '1 → LIGADO', 'Qualquer outro valor não ativa a saída.',
    'Uma comparação exata decide o estado.',
    ['Leia um inteiro.', 'Compare com 1.', 'Mostre o estado.'])

add(4, '  tensao, resistencia: real', '''  escreva("Tensão em volts: ")
  leia(tensao)
  escreva("Resistência em ohms: ")
  leia(resistencia)
  se resistencia <= 0 entao
    escreval("Resistência deve ser positiva")
  senao
    escreval("Corrente: ", tensao / resistencia, " A")
  fimse''', 'Use a lei de Ohm I=V/R para resistência positiva.',
    '12 V e 6 ohms → 2 A', 'Resistência zero impede o cálculo.',
    'Dividir tensão pela resistência fornece a corrente.',
    ['Leia V e R.', 'Valide R > 0.', 'Divida.'])

add(5, '  i: inteiro', '''  para i de 1 ate 5 faca
    escreval("LIGADO")
    escreval("DESLIGADO")
  fimpara''', 'Repita o par de palavras cinco vezes, na ordem LIGADO e DESLIGADO.',
    'Primeiro ciclo: LIGADO, DESLIGADO', 'O programa não requer entrada.',
    'Cada passagem do laço escreve as duas linhas.',
    ['Use para 1 até 5.', 'Imprima as duas palavras.', 'Mantenha a ordem.'])

add(6, '  leitura, limite: real', '''  escreva("Leitura: ")
  leia(leitura)
  escreva("Limite mínimo: ")
  leia(limite)
  se leitura < limite entao
    escreval("Abaixo do limite")
  senao
    escreval("No limite ou acima")
  fimse''', 'Avise apenas se a leitura for estritamente menor que o limite.',
    'Leitura 4, limite 5 → aviso', 'Igualdade não está abaixo.',
    'A comparação < separa os dois casos.',
    ['Leia valor e limite.', 'Use <.', 'Mostre o resultado.'])

add(7, '  tamanho, taxa: real', '''  escreva("Tamanho do download em MB: ")
  leia(tamanho)
  escreva("Taxa em MB/s: ")
  leia(taxa)
  se (tamanho < 0) ou (taxa <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Tempo estimado: ", tamanho / taxa, " s")
  fimse''', 'Use tamanho em MB e taxa em MB por segundo.',
    '100 MB a 10 MB/s → 10 s', 'Taxa zero impede a divisão.',
    'Tamanho dividido por taxa fornece segundos.',
    ['Confira unidades.', 'Valide taxa.', 'Divida.'])

add(8, '  paginas, folhas: inteiro', '''  escreva("Páginas a imprimir: ")
  leia(paginas)
  se paginas < 0 entao
    escreval("Quantidade inválida")
  senao
    folhas <- paginas div 2
    se paginas mod 2 <> 0 entao
      folhas <- folhas + 1
    fimse
    escreval("Folhas necessárias: ", folhas)
  fimse''', 'Cada folha recebe até duas páginas, uma em cada face.',
    '5 páginas → 3 folhas', 'Zero página exige zero folha.',
    'Resto na divisão por dois exige folha adicional.',
    ['Divida por dois.', 'Confira resto.', 'Arredonde para cima.'])

add(9, '  limite, i: inteiro', '''  escreva("Contar até: ")
  leia(limite)
  se limite < 0 entao
    escreval("Limite inválido")
  senao
    para i de 0 ate limite faca
      escreval(i)
    fimpara
  fimse''', 'Conte de zero até o inteiro informado, inclusive.',
    'N=3 → 0,1,2,3', 'N=0 imprime somente zero.',
    'O contador do laço percorre o intervalo.',
    ['Comece em zero.', 'Termine em N.', 'Imprima cada valor.'])

add(10, '  x, y: inteiro', '''  escreva("Coordenada X: ")
  leia(x)
  escreva("Coordenada Y: ")
  leia(y)
  escreval("Posição: (", x, ", ", y, ")")''',
    'Leia dois inteiros e apresente a posição no formato (X, Y).',
    'X=2, Y=3 → Posição: (2, 3)', 'Coordenadas negativas são aceitas.',
    'A saída combina os dois valores com pontuação fixa.',
    ['Leia X.', 'Leia Y.', 'Formate a saída.'])

add(11, '  percentual: real', '''  escreva("Percentual de bateria: ")
  leia(percentual)
  se (percentual < 0) ou (percentual > 100) entao
    escreval("Percentual inválido")
  senao
    se percentual < 20 entao
      escreval("Abaixo de 20%")
    senao
      escreval("20% ou mais")
    fimse
  fimse''', 'A condição usa menos de 20%, sem incluir 20%.',
    '19% → abaixo; 20% → não abaixo', 'Percentual fora de 0–100 é inválido.',
    'A comparação estrita exclui o limite.',
    ['Valide percentual.', 'Use <20.', 'Mostre o estado.'])

add(12, '  usada, total: real', '''  escreva("Memória total: ")
  leia(total)
  escreva("Memória usada: ")
  leia(usada)
  se (total <= 0) ou (usada < 0) ou (usada > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Memória ocupada: ", 100 * usada / total, "%")
  fimse''', 'Os dois valores de memória estão na mesma unidade.',
    '4 GB usados de 8 GB → 50%', 'Memória total zero impede cálculo.',
    'A razão usada/total vira percentual ao multiplicar por cem.',
    ['Leia total e uso.', 'Valide.', 'Divida e multiplique por cem.'])

add(13, '  leitura, limite: real', '''  escreva("Leitura do sensor: ")
  leia(leitura)
  escreva("Limite configurado: ")
  leia(limite)
  se leitura > limite entao
    escreval("Acima do limite")
  senao
    se leitura < limite entao
      escreval("Abaixo do limite")
    senao
      escreval("Exatamente no limite")
    fimse
  fimse''', 'Classifique a leitura em abaixo, igual ou acima do limite.',
    'Leitura 5, limite 5 → exatamente no limite', 'Leituras negativas são comparáveis.',
    'Três relações possíveis cobrem qualquer par numérico.',
    ['Compare >.', 'Compare <.', 'Trate igualdade.'])

add(14, '  nome: caractere', '''  escreva("Nome do arquivo sem extensão: ")
  leia(nome)
  escreval("Arquivo: ", nome, ".txt")''',
    'A entrada deve ser apenas o nome, sem extensão.',
    'anotacoes → anotacoes.txt', 'Nome vazio deve ser evitado pelo usuário.',
    'Concatenar o sufixo forma o nome completo.',
    ['Leia texto.', 'Acrescente literal .txt.', 'Mostre o resultado.'])

add(15, '  a, b: caractere', '''  escreva("Primeiro texto: ")
  leia(a)
  escreva("Segundo texto: ")
  leia(b)
  se a = b entao
    escreval("Textos iguais")
  senao
    escreval("Textos diferentes")
  fimse''', 'Compare textos exatamente, inclusive maiúsculas e minúsculas.',
    'abc e abc → iguais', 'Abc e abc são diferentes.',
    'O operador de igualdade compara os valores completos.',
    ['Leia dois textos.', 'Use =.', 'Mostre o resultado.'])

add(16, '  largura, altura: inteiro', '''  escreva("Largura em pixels: ")
  leia(largura)
  escreva("Altura em pixels: ")
  leia(altura)
  se (largura < 0) ou (altura < 0) entao
    escreval("Dimensão inválida")
  senao
    escreval("Pixels: ", largura * altura)
  fimse''',
    'Multiplique largura e altura da imagem em pixels.',
    '800×600 → 480000 pixels', 'Uma dimensão zero produz zero pixel.',
    'O produto conta as células da grade.',
    ['Leia duas dimensões.', 'Multiplique.', 'Mostre pixels.'])

add(17, '  vermelho, verde, azul, media: inteiro', '''  escreva("Canais RGB (0 a 255): ")
  leia(vermelho, verde, azul)
  se (vermelho < 0) ou (vermelho > 255) ou (verde < 0) ou (verde > 255) ou (azul < 0) ou (azul > 255) entao
    escreval("Canal inválido")
  senao
    media <- (vermelho + verde + azul) div 3
    escreval("Média inteira: ", media)
  fimse''',
    'Use média inteira com divisão que descarta a parte fracionária.',
    'R=0, G=0, B=255 → média 85', 'Canais devem estar entre 0 e 255.',
    'A soma dos três canais dividida por três produz a intensidade média.',
    ['Valide RGB.', 'Some os canais.', 'Use div 3.'])

add(18, '  a, b, c: inteiro', '''  escreva("Falhas dos três tipos: ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Contagem inválida")
  senao
    escreval("Falhas totais: ", a + b + c)
  fimse''',
    'Some as ocorrências registradas dos três tipos de falha.',
    '2, 3 e 1 → 6 falhas', 'Tipo sem ocorrência contribui com zero.',
    'A soma representa a contagem conjunta.',
    ['Leia três contagens.', 'Some.', 'Mostre total.'])

add(19, '  pastas, subpastas: inteiro', '''  escreva("Pastas principais: ")
  leia(pastas)
  escreva("Subpastas: ")
  leia(subpastas)
  se (pastas < 0) ou (subpastas < 0) entao
    escreval("Contagem inválida")
  senao
    escreval("Total de pastas: ", pastas + subpastas)
  fimse''',
    'Conte pastas e subpastas como diretórios distintos.',
    '3 pastas e 5 subpastas → 8 diretórios', 'Zero subpasta é válido.',
    'A soma fornece o total de diretórios.',
    ['Leia ambas as quantidades.', 'Some.', 'Mostre total.'])

add(20, '  valor: inteiro', '''  escreva("Valor atual (0 a 100): ")
  leia(valor)
  se (valor < 0) ou (valor > 100) entao
    escreval("Valor inicial inválido")
  senao
    valor <- valor + 10
    se valor > 100 entao
      valor <- 100
    fimse
    escreval("Valor após aumento: ", valor)
  fimse''',
    'Some dez unidades e limite o resultado a cem.',
    '95 → 100; 70 → 80', 'Valor inicial fora de 0–100 é inválido.',
    'O teto impede que o aumento extrapole a escala.',
    ['Some dez.', 'Compare com cem.', 'Ajuste se ultrapassar.'])

add(21, '  atual, alarme: inteiro', '''  escreva("Minuto atual desde 00:00: ")
  leia(atual)
  escreva("Minuto do alarme desde 00:00: ")
  leia(alarme)
  se (atual < 0) ou (atual > 1439) ou (alarme < 0) ou (alarme > 1439) entao
    escreval("Horário inválido")
  senao
    se atual >= alarme entao
      escreval("Alarme já chegou")
    senao
      escreval("Faltam ", alarme - atual, " minutos")
    fimse
  fimse''',
    'Compare dois horários do mesmo dia representados em minutos desde a meia-noite.',
    'Atual 480, alarme 540 → faltam 60 min', 'Igualdade significa que o alarme chegou.',
    'A subtração mede o intervalo quando o alarme está no futuro do mesmo dia.',
    ['Use minutos 0–1439.', 'Compare horários.', 'Subtraia se ainda não chegou.'])

add(22, '  potencia: real', '''  escreva("Potência em W: ")
  leia(potencia)
  se potencia < 0 entao
    escreval("Potência inválida")
  senao
    se potencia < 100 entao
      escreval("Baixa")
    senao
      se potencia <= 500 entao
        escreval("Média")
      senao
        escreval("Alta")
      fimse
    fimse
  fimse''',
    'Classifique abaixo de 100 W como baixa, de 100 a 500 W como média e acima de 500 W como alta.',
    '50 W → baixa; 100 W → média; 501 W → alta', 'Potência negativa é inválida.',
    'Condições ordenadas separam as três faixas.',
    ['Valide não negativa.', 'Teste 100.', 'Depois teste 500.'])

add(23, '  a, b, c: inteiro', '''  escreva("Durações das três etapas em segundos: ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Duração inválida")
  senao
    escreval("Duração total: ", a + b + c, " s")
  fimse''',
    'Some os tempos de três etapas na mesma unidade.',
    '10, 20 e 30 s → 60 s', 'Etapa de zero segundo é válida.',
    'A duração total é a soma das parcelas.',
    ['Leia três tempos.', 'Some.', 'Mostre segundos.'])

add(24, '  kilobytes: real', '''  escreva("Tamanho em kilobytes: ")
  leia(kilobytes)
  se kilobytes < 0 entao
    escreval("Tamanho inválido")
  senao
    escreval("Bytes: ", kilobytes * 1024)
  fimse''',
    'Use o fator binário 1 KB = 1024 bytes.',
    '2 KB → 2048 bytes', 'Zero KB é zero byte.',
    'A conversão multiplica o valor por 1024.',
    ['Leia KB.', 'Multiplique por 1024.', 'Mostre bytes.'])

add(25, '  comando: inteiro', '''  escreva("Comando (1 a 4): ")
  leia(comando)
  escolha comando
    caso 1
      escreval("Abrir")
    caso 2
      escreval("Salvar")
    caso 3
      escreval("Executar")
    caso 4
      escreval("Fechar")
    outrocaso
      escreval("Comando desconhecido")
  fimescolha''',
    'Associe 1 abrir, 2 salvar, 3 executar e 4 fechar.',
    '3 → Executar', 'Fora de 1–4 é desconhecido.',
    'A seleção produz a descrição textual do código.',
    ['Leia número.', 'Use escolha.', 'Inclua outrocaso.'])

add(26, '  tarefas, i: inteiro\n  nome: caractere', '''  escreva("Número de tarefas: ")
  leia(tarefas)
  se tarefas < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate tarefas faca
      escreva("Nome da tarefa ", i, ": ")
      leia(nome)
      escreval(i, ". ", nome)
    fimpara
  fimse''',
    'Cadastre N nomes de tarefas e mostre cada um com seu número.',
    'Tarefas estudar, revisar → 1. estudar; 2. revisar', 'Zero tarefa produz lista vazia.',
    'O contador do laço fornece a numeração.',
    ['Leia N.', 'Repita a leitura de nome.', 'Imprima i e nome.'])

add(27, '  livre, minimo: real', '''  escreva("Espaço livre: ")
  leia(livre)
  escreva("Mínimo necessário: ")
  leia(minimo)
  se (livre < 0) ou (minimo < 0) entao
    escreval("Dados inválidos")
  senao
    se livre < minimo entao
      escreval("Espaço insuficiente")
    senao
      escreval("Espaço suficiente")
    fimse
  fimse''',
    'O espaço fica insuficiente quando está estritamente abaixo do mínimo.',
    'Livre 4, mínimo 5 → insuficiente', 'Igualdade é suficiente.',
    'A comparação < verifica a falta.',
    ['Leia valores.', 'Compare <.', 'Mostre o resultado.'])

add(28, '  concluidos, total: inteiro', '''  escreva("Blocos totais: ")
  leia(total)
  escreva("Blocos concluídos: ")
  leia(concluidos)
  se (total <= 0) ou (concluidos < 0) ou (concluidos > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Progresso: ", 100 * concluidos / total, "%")
  fimse''',
    'Divida blocos concluídos pelo total e multiplique por cem.',
    '25 de 100 blocos → 25%', 'Total zero impede cálculo.',
    'A razão concluído/total expressa a fração concluída.',
    ['Valide o total.', 'Divida.', 'Multiplique por cem.'])

add(29, '  conectado: logico', '''  escreva("Conectado? (verdadeiro/falso): ")
  leia(conectado)
  se conectado entao
    escreval("ONLINE")
  senao
    escreval("OFFLINE")
  fimse''',
    'Use entrada lógica verdadeira ou falsa.',
    'verdadeiro → ONLINE; falso → OFFLINE', 'Outros textos não são entradas lógicas válidas.',
    'A condição testa diretamente o valor booleano.',
    ['Declare variável lógica.', 'Leia o estado.', 'Use se.'])

add(30, '  a, b, c: real', '''  escreva("Três avaliações (0 a 5): ")
  leia(a, b, c)
  se (a < 0) ou (a > 5) ou (b < 0) ou (b > 5) ou (c < 0) ou (c > 5) entao
    escreval("Avaliação inválida")
  senao
    escreval("Média: ", (a + b + c) / 3)
  fimse''',
    'Considere avaliações na escala de zero a cinco, todas com mesmo peso.',
    '4, 5 e 3 → média 4', 'Zero é avaliação válida.',
    'A média aritmética divide a soma por três.',
    ['Valide a escala.', 'Some.', 'Divida por três.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')

#!/usr/bin/env python3
"""Curated simple May exercises; shared arithmetic builder keeps formulas explicit."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/challenge-solutions.json"
entries = json.loads(CATALOG.read_text(encoding="utf-8"))
rows = {r["data_mm_dd"]: r for r in csv.DictReader((ROOT / "data/visualg_365_dias_730_desafios.csv").open(encoding="utf-8"))}


def add(day, declarations, body, rules, example, edge, explanation):
    date = f"05-{day:02d}"
    prompt = rows[date]["simples_enunciado"]
    code = f'algoritmo "Desafio05{day:02d}S"\nvar\n{declarations.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f"{date}/simples"] = dict(
        code=code, objective=prompt[0].upper() + prompt[1:] + " Mostre o valor obtido de forma clara.",
        rules=rules, example=example, edge=edge, explanation=explanation,
        hints=["Identifique as entradas e suas unidades.", "Escreva a conta ou comparação antes do comando de saída.",
               "Confira o exemplo e o caso de fronteira."])


def calc(day, inputs, expression, result_label, rules, sample, expected, edge):
    declarations = "  " + ", ".join(name for name, _ in inputs) + ", resultado: real"
    reads = "\n".join(f'  escreva("{label}: ")\n  leia({name})' for name, label in inputs)
    body = f'{reads}\n  resultado <- {expression}\n  escreval("{result_label}: ", resultado)'
    example_inputs = "\n".join(f"{label}: {value}" for (_, label), value in zip(inputs, sample))
    add(day, declarations, body, rules,
        f"{example_inputs}\n{result_label}: {expected}", edge,
        f"A expressão `{expression}` calcula o resultado a partir das entradas lidas; o valor é exibido depois de guardado em `resultado`.")


calc(1, [('horas', 'Horas trabalhadas'), ('valorHora', 'Valor por hora')], 'horas * valorHora', 'Pagamento',
     'Leia horas trabalhadas e valor pago por hora. Multiplique para obter o pagamento bruto.', [8, 15], 120,
     'Zero hora trabalhada gera pagamento zero.')
calc(2, [('preco', 'Preço unitário'), ('quantidade', 'Quantidade vendida')], 'preco * quantidade', 'Valor da venda',
     'Leia preço unitário e quantidade vendida; multiplique-os.', [10, 3], 30,
     'Quantidade zero produz venda de valor zero.')
calc(3, [('venda', 'Valor da venda'), ('taxa', 'Comissão (%)')], 'venda * taxa / 100', 'Comissão',
     'Leia o valor vendido e a taxa percentual; aplique a taxa sobre a venda.', [200, 5], 10,
     'Comissão de 0% produz zero.')
calc(4, [('preco', 'Preço original'), ('aumento', 'Aumento (%)')], 'preco * (100 + aumento) / 100', 'Preço reajustado',
     'Leia preço e percentual de aumento. Some o aumento proporcional ao preço original.', [100, 20], 120,
     'Aumento de 0% conserva o preço original.')

add(5, '  pago, compra: real', '''  escreva("Valor pago: ")
  leia(pago)
  escreva("Total da compra: ")
  leia(compra)
  se (compra >= 0) e (pago >= compra) entao
    escreval("Troco: ", pago - compra)
  senao
    escreval("Compra inválida ou pagamento insuficiente.")
  fimse''',
    'Leia o total da compra e o valor entregue. Somente quando o pagamento cobre a compra, subtraia compra de pagamento.',
    'Valor pago: 50\nTotal da compra: 35\nTroco: 15',
    'Pagamento exatamente igual ao preço gera troco zero.',
    'A validação evita apresentar troco negativo como se fosse dinheiro a devolver.')

add(6, '  estoque, meta, faltam: inteiro', '''  escreva("Estoque atual: ")
  leia(estoque)
  escreva("Meta de estoque: ")
  leia(meta)
  faltam <- meta - estoque
  se faltam < 0 entao
    faltam <- 0
  fimse
  escreval("Itens faltantes: ", faltam)''',
    'Subtraia estoque atual da meta. Quando o estoque já alcançou ou ultrapassou a meta, a falta é zero.',
    'Estoque atual: 8\nMeta de estoque: 12\nItens faltantes: 4',
    'Estoque 15 para meta 12 não gera “-3 itens”; a falta é zero.',
    'A comparação corrige o resultado negativo da subtração quando a meta já foi atingida.')

add(7, '  compra, limite: real', '''  escreva("Valor da compra: ")
  leia(compra)
  escreva("Limite para desconto: ")
  leia(limite)
  se compra >= limite entao
    escreval("Desconto disponível.")
  senao
    escreval("Desconto indisponível.")
  fimse''',
    'Compare o valor da compra com o limite mínimo para oferecer desconto.',
    'Valor da compra: 120\nLimite para desconto: 100\nDesconto disponível.',
    'Compra igual ao limite já alcança a condição.',
    'A comparação inclusiva `>=` traduz “alcançar o limite”.')

calc(8, [('dias', 'Dias trabalhados'), ('diaria', 'Pagamento por dia')], 'dias * diaria', 'Pagamento',
     'Leia o número de dias e o valor de uma diária. Multiplique para obter o pagamento.', [5, 80], 400,
     'Com zero dia, o pagamento é zero.')
calc(9, [('comprimento', 'Comprimento da loja (m)'), ('largura', 'Largura da loja (m)')],
     'comprimento * largura', 'Área (m²)', 'Leia comprimento e largura em metros e calcule a área retangular.', [10, 4], 40,
     'Se uma dimensão for zero, a área é zero.')

add(10, '  producao, meta, salario, bonus: real', '''  escreva("Produção alcançada: ")
  leia(producao)
  escreva("Meta: ")
  leia(meta)
  escreva("Pagamento base: ")
  leia(salario)
  escreva("Bônus fixo: ")
  leia(bonus)
  se producao >= meta entao
    salario <- salario + bonus
  fimse
  escreval("Pagamento final: ", salario)''',
    'Leia produção, meta, pagamento base e bônus fixo. Some o bônus somente quando a produção alcançar a meta.',
    'Produção: 10; meta: 10; base: 100; bônus: 20\nPagamento final: 120',
    'Produção igual à meta recebe bônus.',
    'O pagamento base é preservado quando a condição da meta é falsa.')

calc(11, [('a', 'Material 1'), ('b', 'Material 2'), ('c', 'Material 3'), ('d', 'Material 4')],
     'a + b + c + d', 'Total dos materiais', 'Leia os preços de quatro materiais e some os quatro valores.',
     [2, 3, 4, 5], 14, 'Material de preço zero não altera a soma.')

add(12, '  caixas, i: inteiro', '''  escreva("Número de caixas: ")
  leia(caixas)
  para i de 1 ate caixas faca
    escreval("Caixa ", i)
  fimpara''',
    'Leia N e mostre os números de caixa de 1 até N.',
    'Número de caixas: 3\nCaixa 1\nCaixa 2\nCaixa 3',
    'N igual a zero não produz nenhuma caixa numerada.',
    'O índice do laço já corresponde ao número de cada caixa.')

calc(13, [('compra', 'Valor da compra'), ('taxa', 'Taxa fixa')], 'compra + taxa', 'Total com taxa',
     'Some ao valor de uma compra uma taxa fixa informada, sem aplicar porcentagem.', [30, 5], 35,
     'Taxa zero não altera o total.')

add(14, '  trabalhadas, contratadas: real', '''  escreva("Horas trabalhadas: ")
  leia(trabalhadas)
  escreva("Carga contratada: ")
  leia(contratadas)
  se trabalhadas > contratadas entao
    escreval("Horas acima da carga contratada.")
  senao
    escreval("Carga não ultrapassada.")
  fimse''',
    'Compare horas trabalhadas e carga contratada. Há excesso somente se o primeiro valor for maior.',
    'Horas trabalhadas: 9\nCarga contratada: 8\nHoras acima da carga contratada.',
    'Trabalhar exatamente a carga contratada não a ultrapassa.',
    'A condição estrita `>` separa excesso de igualdade.')

add(15, '  primeiro, segundo: real', '''  escreva("Preço 1: ")
  leia(primeiro)
  escreva("Preço 2: ")
  leia(segundo)
  se primeiro <= segundo entao
    escreval("Menor preço: ", primeiro)
  senao
    escreval("Menor preço: ", segundo)
  fimse''',
    'Leia dois preços e apresente o menor.',
    'Preço 1: 10\nPreço 2: 8\nMenor preço: 8',
    'Se os preços forem iguais, o valor comum é exibido.',
    'A comparação escolhe o primeiro quando ele é menor ou igual ao segundo.')

calc(16, [('area', 'Área do piso (m²)'), ('custo', 'Custo por m²')], 'area * custo', 'Custo do piso',
     'Leia área em metros quadrados e custo por metro quadrado; multiplique.', [20, 30], 600,
     'Área zero produz custo zero.')

add(17, '  prevista, efetiva: inteiro', '''  escreva("Dia previsto: ")
  leia(prevista)
  escreva("Dia da entrega: ")
  leia(efetiva)
  se efetiva < prevista entao
    escreval("Entrega antecipada.")
  senao
    se efetiva = prevista entao
      escreval("Entrega no prazo.")
    senao
      escreval("Entrega atrasada em ", efetiva - prevista, " dia(s).")
    fimse
  fimse''',
    'Compare números de dia do mesmo período. Informe antecipação, entrega no prazo ou atraso.',
    'Dia previsto: 10\nDia da entrega: 12\nEntrega atrasada em 2 dia(s).',
    'Dias iguais representam entrega no prazo.',
    'A diferença só é calculada no caso de atraso.')

add(18, '  clientes, i: inteiro', '''  escreva("Clientes: ")
  leia(clientes)
  para i de 1 ate clientes faca
    escreval("Cliente ", i, ": atendimento iniciado")
  fimpara''',
    'Leia N e mostre uma mensagem de atendimento para cada cliente numerado de 1 a N.',
    'Clientes: 2\nCliente 1: atendimento iniciado\nCliente 2: atendimento iniciado',
    'Com zero clientes, nenhuma mensagem é emitida.',
    'O laço executa uma vez por cliente.')

calc(19, [('a', 'Serviço 1'), ('b', 'Serviço 2'), ('c', 'Serviço 3')], 'a + b + c', 'Total dos serviços',
     'Leia três preços de serviços e some-os.', [10, 20, 30], 60,
     'Serviço gratuito contribui com zero.')
calc(20, [('peso', 'Peso vendido (kg)'), ('preco', 'Preço por kg')], 'peso * preco', 'Custo da compra',
     'Leia peso do produto em quilogramas e preço por quilograma; multiplique.', [2.5, 8], 20,
     'Peso zero produz custo zero.')
calc(21, [('manha', 'Pedidos da manhã'), ('tarde', 'Pedidos da tarde')], 'manha + tarde', 'Pedidos totais',
     'Leia quantidades de pedidos de dois períodos e some-as.', [8, 12], 20,
     'Um período sem pedidos contribui com zero.')
calc(22, [('preco', 'Preço do produto'), ('frete', 'Frete')], 'preco + frete', 'Preço entregue',
     'Leia preço do produto e valor do frete; some-os.', [50, 10], 60,
     'Frete gratuito não altera o preço.')

add(23, '  ferramentas, necessidade: inteiro', '''  escreva("Ferramentas disponíveis: ")
  leia(ferramentas)
  escreva("Ferramentas necessárias: ")
  leia(necessidade)
  se ferramentas >= necessidade entao
    escreval("Quantidade suficiente.")
  senao
    escreval("Faltam ", necessidade - ferramentas, " ferramenta(s).")
  fimse''',
    'Compare ferramentas disponíveis com a quantidade necessária.',
    'Disponíveis: 3\nNecessárias: 5\nFaltam 2 ferramenta(s).',
    'Igualdade entre disponível e necessário significa quantidade suficiente.',
    'A diferença é exibida somente quando há falta.')

calc(24, [('salario', 'Salário atual'), ('reajuste', 'Reajuste (%)')],
     'salario * (100 + reajuste) / 100', 'Novo salário',
     'Leia salário e porcentagem de reajuste; aplique o aumento ao salário original.', [1000, 10], 1100,
     'Reajuste de 0% conserva o salário.')

add(25, '  inicioMin, fimMin: inteiro', '''  escreva("Início da pausa (min): ")
  leia(inicioMin)
  escreva("Fim da pausa (min): ")
  leia(fimMin)
  se fimMin >= inicioMin entao
    escreval("Duração da pausa: ", fimMin - inicioMin, " minuto(s)")
  senao
    escreval("Horários inválidos no mesmo dia.")
  fimse''',
    'Leia início e fim da pausa em minutos desde a mesma referência e subtraia.',
    'Início: 720\nFim: 750\nDuração da pausa: 30 minuto(s)',
    'Horários iguais produzem pausa de zero minuto.',
    'A validação rejeita fim anterior ao início no mesmo dia.')

calc(26, [('horas', 'Horas de produção'), ('taxa', 'Peças por hora')], 'horas * taxa', 'Produção estimada',
     'Leia horas trabalhadas e taxa fixa de peças por hora; multiplique.', [5, 12], 60,
     'Zero hora de operação produz zero peça.')
calc(27, [('a', 'Preço 1'), ('b', 'Preço 2'), ('c', 'Preço 3')], '(a + b + c) / 3', 'Preço médio',
     'Leia três preços e calcule a média aritmética.', [10, 20, 30], 20,
     'Três preços iguais produzem média igual ao preço comum.')
calc(28, [('inicioMin', 'Início (minutos)'), ('duracao', 'Duração (minutos)')],
     'inicioMin + duracao', 'Hora prevista (minutos)',
     'Leia início e duração na mesma unidade. Some para prever o horário final.', [600, 45], 645,
     'Duração zero conserva o horário inicial.')

add(29, '  produto: caractere\n  preco, desconto, promocional: real', '''  escreva("Produto: ")
  leia(produto)
  escreva("Preço original: ")
  leia(preco)
  escreva("Desconto (%): ")
  leia(desconto)
  promocional <- preco * (100 - desconto) / 100
  escreval(produto, " — preço promocional: ", promocional)''',
    'Leia nome, preço e porcentagem de desconto de um produto. Mostre o nome junto do preço após desconto.',
    'Produto: Caderno\nPreço original: 20\nDesconto: 10%\nCaderno — preço promocional: 18',
    'Desconto zero conserva o preço original.',
    'O nome fica em texto e o preço promocional resulta da conta percentual.')

calc(30, [('inicial', 'Saldo inicial'), ('final', 'Saldo final')], 'final - inicial', 'Variação do caixa',
     'Leia os saldos no início e no fim do dia. Calcule final menos inicial; sinal positivo indica aumento.',
     [100, 140], 40, 'Se os saldos forem iguais, a variação é zero.')

add(31, '  resultado, soma: real\n  dia: inteiro', '''  soma <- 0
  para dia de 1 ate 5 faca
    escreva("Resultado do dia ", dia, ": ")
    leia(resultado)
    soma <- soma + resultado
  fimpara
  escreval("Soma dos cinco dias: ", soma)''',
    'Leia cinco resultados diários e some todos os valores.',
    'Resultados: 1, 2, 3, 4, 5\nSoma dos cinco dias: 15',
    'Um resultado zero não altera a soma.',
    'O acumulador `soma` começa em zero e recebe cada dia uma vez.')

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catalog contains {len(entries)} reviewed challenge solutions")

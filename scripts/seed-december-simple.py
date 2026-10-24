#!/usr/bin/env python3
"""December beginner solutions, written against the supplied challenge CSV."""
import csv
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
catalog = root / "data/challenge-solutions.json"
entries = json.loads(catalog.read_text(encoding="utf-8"))
rows = {r["data_mm_dd"]: r for r in csv.DictReader((root / "data/visualg_365_dias_730_desafios.csv").open(encoding="utf-8"))}

def add(day, variables, body, rule, example, edge, insight):
    date = f"12-{day:02d}"
    prompt = rows[date]["simples_enunciado"]
    code = f'algoritmo "Desafio12{day:02d}S"\nvar\n{variables}\ninicio\n{body}\nfimalgoritmo'
    entries[f"{date}/simples"] = dict(
        code=code, objective=prompt[0].upper()+prompt[1:], rules=rule, example=example,
        edge=edge, explanation=insight,
        hints=["Identifique e leia as entradas mencionadas no enunciado.",
               "Faça o cálculo ou a comparação descrita nas regras.",
               "Confira o caso de fronteira antes de imprimir o resultado."])

add(1,"  n, i: inteiro",'''  escreva("Iniciar em: ")
  leia(n)
  se n < 0 entao
    escreval("Valor inválido")
  senao
    para i de n ate 0 passo -1 faca
      escreval(i)
    fimpara
  fimse''',"Leia N não negativo; imprima N até zero, inclusive.","3 → 3, 2, 1, 0","Se N = 0, imprima apenas 0.","O laço usa passo -1 e inclui o zero.")

add(2,"  cordoes, lampadas: inteiro",'''  escreva("Cordões: ")
  leia(cordoes)
  escreva("Lâmpadas por cordão: ")
  leia(lampadas)
  se (cordoes < 0) ou (lampadas < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total: ", cordoes * lampadas)
  fimse''',"Todos os cordões têm a mesma quantidade de lâmpadas.","4 cordões de 15 → 60 lâmpadas","Sem cordões, o total é zero.","Multiplique cordões por lâmpadas em cada cordão.")

add(3,"  a, b, c: real",'''  escreva("Preço 1: ")
  leia(a)
  escreva("Preço 2: ")
  leia(b)
  escreva("Preço 3: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Preço inválido")
  senao
    escreval("Total: R$ ", a+b+c:0:2)
  fimse''',"Some exatamente três preços não negativos.","10 + 20 + 5 → R$ 35,00","Preço zero é permitido.","Some os três valores lidos.")

add(4,"  largura, comprimento: real",'''  escreva("Largura: ")
  leia(largura)
  escreva("Comprimento: ")
  leia(comprimento)
  se (largura <= 0) ou (comprimento <= 0) entao
    escreval("Medida inválida")
  senao
    escreval("Área: ", largura * comprimento:0:2)
  fimse''',"Calcule apenas uma face retangular; as duas medidas usam a mesma unidade.","2 m × 3 m → 6 m²","Medida zero não forma retângulo.","A área é largura multiplicada por comprimento.")

add(5,"  nome: caractere",'''  escreva("Nome: ")
  leia(nome)
  se compr(nome) = 0 entao
    escreval("Informe um nome")
  senao
    escreval("Boas festas, ", nome, "!")
  fimse''',"Inclua o nome lido na saudação.","Ana → Boas festas, Ana!","Nome vazio precisa ser informado novamente.","O comando escreval junta texto fixo e o nome.")

add(6,"  n, linha, coluna: inteiro",'''  escreva("Altura (1 a 30): ")
  leia(n)
  se (n < 1) ou (n > 30) entao
    escreval("Altura inválida")
  senao
    para linha de 1 ate n faca
      para coluna de 1 ate linha faca
        escreva("*")
      fimpara
      escreval("")
    fimpara
  fimse''',"A linha i tem i asteriscos; o triângulo é alinhado à esquerda.","N = 3 → *, **, ***","N = 1 produz um asterisco.","O laço externo percorre linhas e o interno desenha cada uma.")

add(7,"  fornadas, unidades: inteiro",'''  escreva("Fornadas: ")
  leia(fornadas)
  escreva("Biscoitos por fornada: ")
  leia(unidades)
  se (fornadas < 0) ou (unidades < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Biscoitos: ", fornadas * unidades)
  fimse''',"Cada fornada tem o mesmo rendimento.","3 fornadas de 12 → 36 biscoitos","Sem fornadas, nenhum biscoito foi feito.","Multiplique rendimento por fornadas.")

add(8,"  total, enviados: inteiro",'''  escreva("Total de convites: ")
  leia(total)
  escreva("Já enviados: ")
  leia(enviados)
  se (total < 0) ou (enviados < 0) ou (enviados > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Faltam: ", total - enviados)
  fimse''',"Convites enviados não podem superar o total.","50 convites, 18 enviados → faltam 32","Com todos enviados, faltam zero.","Subtraia enviados do total.")

add(9,"  litros: real\n  copos: inteiro",'''  escreva("Litros disponíveis: ")
  leia(litros)
  se litros < 0 entao
    escreval("Volume inválido")
  senao
    copos <- int(litros * 1000 / 200)
    escreval("Copos completos: ", copos)
  fimse''',"Converta litros em mililitros e conte somente copos completos de 200 ml.","1,1 L → 5 copos","Sobra inferior a 200 ml não enche outro copo.","Multiplique por mil, divida por duzentos e descarte a fração.")

add(10,"  preco, taxa: real",'''  escreva("Preço: ")
  leia(preco)
  escreva("Desconto (%): ")
  leia(taxa)
  se (preco < 0) ou (taxa < 0) ou (taxa > 100) entao
    escreval("Dados inválidos")
  senao
    escreval("Preço final: R$ ", preco * (1 - taxa/100):0:2)
  fimse''',"A taxa de desconto deve ficar entre 0% e 100%.","R$ 80 com 25% → R$ 60","100% produz preço zero.","Transforme porcentagem em fração e desconte do preço.")

add(11,"  ida: real",'''  escreva("Distância de ida em km: ")
  leia(ida)
  se ida < 0 entao
    escreval("Distância inválida")
  senao
    escreval("Ida e volta: ", 2*ida:0:2, " km")
  fimse''',"A volta percorre a mesma distância da ida.","12,5 km de ida → 25 km","Distância zero permanece zero.","Some duas vezes a distância de ida.")

add(12,"  caixas: inteiro\n  altura: real",'''  escreva("Caixas: ")
  leia(caixas)
  escreva("Altura de cada caixa: ")
  leia(altura)
  se (caixas < 0) ou (altura < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Altura empilhada: ", caixas*altura:0:2)
  fimse''',"As caixas têm altura igual e são empilhadas sem folga.","5 caixas de 30 cm → 150 cm","Zero caixas produz altura zero.","Multiplique a altura unitária pela quantidade.")

add(13,"  meias, pessoas: inteiro",'''  escreva("Meias: ")
  leia(meias)
  escreva("Pessoas: ")
  leia(pessoas)
  se (meias < 0) ou (pessoas < 0) entao
    escreval("Dados inválidos")
  senao
    se meias >= pessoas entao
      escreval("Suficientes; sobram ", meias-pessoas)
    senao
      escreval("Insuficientes; faltam ", pessoas-meias)
    fimse
  fimse''',"Cada pessoa precisa de uma meia.","8 meias para 10 pessoas → faltam 2","Sem pessoas, o estoque é suficiente.","Compare estoque e demanda e informe a diferença.")

add(14,"  a, b, c, aux: inteiro",'''  escreva("Primeiro: ")
  leia(a)
  escreva("Segundo: ")
  leia(b)
  escreva("Terceiro: ")
  leia(c)
  se a > b entao
    aux <- a
    a <- b
    b <- aux
  fimse
  se b > c entao
    aux <- b
    b <- c
    c <- aux
  fimse
  se a > b entao
    aux <- a
    a <- b
    b <- aux
  fimse
  escreval(a, ", ", b, ", ", c)''',"Aceite também números repetidos e negativos.","7, 2, 5 → 2, 5, 7","7, 7, 2 → 2, 7, 7.","Três comparações e trocas deixam os valores em ordem.")

add(15,"  convidados, lugares: inteiro",'''  escreva("Convidados: ")
  leia(convidados)
  escreva("Lugares: ")
  leia(lugares)
  se (convidados < 0) ou (lugares < 0) entao
    escreval("Dados inválidos")
  senao
    se convidados > lugares entao
      escreval("Faltam ", convidados-lugares)
    senao
      escreval("Faltam 0; livres: ", lugares-convidados)
    fimse
  fimse''',"Cada convidado ocupa um lugar.","12 convidados, 9 lugares → faltam 3","Se quantidades iguais, faltam zero.","A falta é a diferença positiva entre demanda e capacidade.")

add(16,"  fatias, pessoas: inteiro",'''  escreva("Fatias: ")
  leia(fatias)
  escreva("Pessoas: ")
  leia(pessoas)
  se (fatias < 0) ou (pessoas <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Por pessoa: ", fatias div pessoas)
    escreval("Sobra: ", fatias mod pessoas)
  fimse''',"Distribua fatias inteiras de forma igual.","17 fatias para 5 pessoas → 3 cada e sobram 2","Sem pessoas a divisão é inválida.","Divisão inteira dá a cota; módulo dá a sobra.")

add(17,"  metros: real",'''  escreva("Metros: ")
  leia(metros)
  se metros < 0 entao
    escreval("Medida inválida")
  senao
    escreval("Centímetros: ", metros*100:0:2)
  fimse''',"Um metro tem cem centímetros.","2,4 m → 240 cm","Zero permanece zero.","Multiplique a medida em metros por cem.")

add(18,"  camisas, calcas, casacos: inteiro",'''  escreva("Camisas: ")
  leia(camisas)
  escreva("Calças: ")
  leia(calcas)
  escreva("Casacos: ")
  leia(casacos)
  se (camisas < 0) ou (calcas < 0) ou (casacos < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total de peças: ", camisas+calcas+casacos)
  fimse''',"Conte três categorias sem duplicar peças.","2 camisas, 3 calças e 1 casaco → 6 peças","Uma categoria pode estar vazia.","Some as quantidades das categorias.")

add(19,"  a, b, c: real",'''  escreva("Nota 1: ")
  leia(a)
  escreva("Nota 2: ")
  leia(b)
  escreva("Nota 3: ")
  leia(c)
  se (a < 0) ou (a > 10) ou (b < 0) ou (b > 10) ou (c < 0) ou (c > 10) entao
    escreval("Nota inválida")
  senao
    escreval("Média: ", (a+b+c)/3:0:2)
  fimse''',"As avaliações vão de 0 a 10 e têm peso igual.","8, 9, 10 → média 9","Três notas iguais preservam esse valor.","Divida a soma das notas por três.")

add(20,"  hi, mi, hf, mf, inicioMin, fimMin, duracao: inteiro",'''  escreva("Hora inicial: ")
  leia(hi)
  escreva("Minuto inicial: ")
  leia(mi)
  escreva("Hora final: ")
  leia(hf)
  escreva("Minuto final: ")
  leia(mf)
  se (hi < 0) ou (hi > 23) ou (hf < 0) ou (hf > 23) ou (mi < 0) ou (mi > 59) ou (mf < 0) ou (mf > 59) entao
    escreval("Horário inválido")
  senao
    inicioMin <- hi*60+mi
    fimMin <- hf*60+mf
    se fimMin < inicioMin entao
      fimMin <- fimMin+1440
    fimse
    duracao <- fimMin-inicioMin
    escreval("Duração: ", duracao div 60, " h e ", duracao mod 60, " min")
  fimse''',"Se o horário final precede o inicial, considere o dia seguinte; horários iguais duram zero.","23:30 a 01:00 → 1 h e 30 min","23:59 a 00:01 dura 2 minutos.","Converta em minutos e acrescente um dia ao fim após a virada.")

add(21,"  pessoas: inteiro",'''  escreva("Pessoas: ")
  leia(pessoas)
  se pessoas < 0 entao
    escreval("Quantidade inválida")
  senao
    escreval("Presentes: ", 2*pessoas)
  fimse''',"Cada pessoa recebe dois presentes.","7 pessoas → 14 presentes","Zero pessoas exigem zero presentes.","Multiplique por dois.")

add(22,"  dias, porDia: inteiro",'''  escreva("Dias: ")
  leia(dias)
  escreva("Mensagens por dia: ")
  leia(porDia)
  se (dias < 0) ou (porDia < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Total: ", dias*porDia)
  fimse''',"A quantidade enviada por dia é fixa.","6 dias com 4 mensagens → 24","Zero dia produz zero mensagem.","Multiplique duração pela taxa diária.")

add(23,"  custo, limite: real",'''  escreva("Custo: ")
  leia(custo)
  escreva("Orçamento: ")
  leia(limite)
  se (custo < 0) ou (limite < 0) entao
    escreval("Valor inválido")
  senao
    se custo <= limite entao
      escreval("Dentro do orçamento; sobra R$ ", limite-custo:0:2)
    senao
      escreval("Acima do orçamento em R$ ", custo-limite:0:2)
    fimse
  fimse''',"Custo igual ao limite cabe no orçamento.","R$ 120 contra R$ 100 → excede R$ 20","Valores iguais deixam sobra zero.","Compare custo com limite e mostre a diferença.")

add(24,"  i, marcada, concluidas: inteiro",'''  concluidas <- 0
  para i de 1 ate 5 faca
    escreva("Tarefa ", i, " concluída (1 sim, 0 não): ")
    leia(marcada)
    se (marcada = 0) ou (marcada = 1) entao
      concluidas <- concluidas + marcada
    senao
      escreval("Resposta inválida; não contada")
    fimse
  fimpara
  escreval("Concluídas: ", concluidas, " de 5")''',"Leia cinco marcas binárias, uma por tarefa.","1, 0, 1, 1, 0 → 3 concluídas","Todas desmarcadas produzem zero.","Conte as respostas iguais a um.")

add(25,"  a, b, c: real",'''  escreva("Trecho 1 em km: ")
  leia(a)
  escreva("Trecho 2 em km: ")
  leia(b)
  escreva("Trecho 3 em km: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Distância inválida")
  senao
    escreval("Total: ", a+b+c:0:2, " km")
  fimse''',"Os três trechos usam quilômetros e pertencem ao mesmo percurso.","5, 8 e 2 km → 15 km","Um trecho zero não altera o total.","Some as três distâncias.")

add(26,"  a, b, c: real",'''  escreva("Doação 1: ")
  leia(a)
  escreva("Doação 2: ")
  leia(b)
  escreva("Doação 3: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Doação inválida")
  senao
    escreval("Total: R$ ", a+b+c:0:2)
  fimse''',"As doações são valores não negativos em reais.","R$ 5 + R$ 10 + R$ 15 → R$ 30","Uma doação pode ser zero.","Some os três valores recebidos.")

add(27,"  porcoes, capacidade, potes: inteiro",'''  escreva("Porções: ")
  leia(porcoes)
  escreva("Capacidade do pote: ")
  leia(capacidade)
  se (porcoes < 0) ou (capacidade <= 0) entao
    escreval("Dados inválidos")
  senao
    potes <- (porcoes+capacidade-1) div capacidade
    escreval("Potes necessários: ", potes)
  fimse''',"Cada pote guarda a mesma quantidade positiva de porções inteiras.","10 porções, 4 por pote → 3 potes","Sem porções, nenhum pote é necessário.","Arredonde a divisão por capacidade para cima.")

add(28,"  dia: inteiro",'''  escreva("Dia de dezembro: ")
  leia(dia)
  se (dia < 1) ou (dia > 31) entao
    escreval("Dia inválido")
  senao
    escreval("Faltam ", 31-dia, " dia(s)")
  fimse''',"Considere apenas dias válidos de dezembro.","Dia 28 → faltam 3 dias","No dia 31 faltam zero.","Subtraia o dia de 31.")

add(29,"  a, b, c, d: real",'''  escreva("Meta 1 (%): ")
  leia(a)
  escreva("Meta 2 (%): ")
  leia(b)
  escreva("Meta 3 (%): ")
  leia(c)
  escreva("Meta 4 (%): ")
  leia(d)
  se (a < 0) ou (a > 100) ou (b < 0) ou (b > 100) ou (c < 0) ou (c > 100) ou (d < 0) ou (d > 100) entao
    escreval("Percentual inválido")
  senao
    escreval("Média: ", (a+b+c+d)/4:0:2, "%")
  fimse''',"As quatro metas têm o mesmo peso e vão de 0% a 100%.","50%, 100%, 75%, 75% → 75%","Todas em zero dão média zero.","Divida a soma dos quatro percentuais por quatro.")

add(30,"  segundos: inteiro",'''  escreva("Segundos restantes: ")
  leia(segundos)
  se segundos < 0 entao
    escreval("Tempo inválido")
  senao
    escreval(segundos div 60, " minuto(s) e ", segundos mod 60, " segundo(s)")
  fimse''',"Mostre minutos completos e segundos restantes.","125 segundos → 2 minutos e 5 segundos","59 segundos → 0 minuto e 59 segundos.","Divisão inteira dá os minutos; resto dá os segundos.")

add(31,"  meta: caractere",'''  escreva("Sua meta para o ano novo: ")
  leia(meta)
  se compr(meta) = 0 entao
    escreval("Informe uma meta")
  senao
    escreval("Feliz ano novo! Sua meta é: ", meta)
  fimse''',"Inclua a meta informada em uma mensagem personalizada.","Aprender algoritmos → Feliz ano novo! Sua meta é: Aprender algoritmos","Texto vazio não identifica uma meta.","Leia texto livre e insira-o na saudação.")

hint_steps = {
    1: ("Leia um inteiro não negativo.", "Percorra os valores em ordem decrescente.", "Inclua zero na saída."),
    2: ("Descubra quantos cordões existem.", "Leia a quantidade igual em cada cordão.", "Multiplique as duas contagens."),
    3: ("Use variáveis reais para dinheiro.", "Rejeite preços negativos.", "Some os três preços."),
    4: ("Use medidas na mesma unidade.", "Multiplique largura por comprimento.", "Identifique a unidade quadrada."),
    5: ("Leia o nome como caractere.", "Confira se há algum texto.", "Junte o nome à saudação."),
    6: ("Controle a linha no laço externo.", "Use o número da linha como limite interno.", "Quebre a linha após os asteriscos."),
    7: ("Leia o número de fornadas.", "Leia o rendimento de uma fornada.", "Multiplique para obter o total."),
    8: ("Leia total e enviados.", "Verifique se enviados não excede o total.", "Subtraia para achar os pendentes."),
    9: ("Converta litros para mililitros.", "Divida por 200 ml.", "Conte só copos completos."),
    10: ("Transforme a taxa percentual dividindo por 100.", "Calcule o valor descontado.", "Subtraia do preço original."),
    11: ("Leia apenas a distância de ida.", "A volta tem distância igual.", "Multiplique por dois."),
    12: ("Leia quantidade e altura unitária.", "Confirme que não há medidas negativas.", "Multiplique para obter a pilha."),
    13: ("Considere uma meia por pessoa.", "Compare estoque e demanda.", "Mostre a diferença como sobra ou falta."),
    14: ("Compare o primeiro par.", "Compare o segundo par.", "Revise o primeiro par após as trocas."),
    15: ("Leia convidados e lugares.", "Calcule a diferença.", "Mostre falta somente quando convidados superarem lugares."),
    16: ("Evite divisão por zero.", "Use div para fatias inteiras por pessoa.", "Use mod para as fatias restantes."),
    17: ("Lembre que um metro tem 100 centímetros.", "Leia um comprimento não negativo.", "Multiplique por cem."),
    18: ("Guarde as contagens por categoria.", "Rejeite quantidades negativas.", "Some as três categorias."),
    19: ("Leia notas de 0 a 10.", "Some as três avaliações.", "Divida por três."),
    20: ("Converta cada horário para minutos.", "Some 1440 ao fim se houver virada.", "Subtraia e decomponha em horas e minutos."),
    21: ("Cada pessoa recebe exatamente dois.", "Leia a quantidade de pessoas.", "Multiplique por dois."),
    22: ("Defina dias e mensagens por dia.", "Use a mesma taxa em todos os dias.", "Multiplique período pela taxa."),
    23: ("Leia custo e limite.", "Compare os dois valores.", "Mostre sobra ou excesso conforme o caso."),
    24: ("Percorra as cinco tarefas.", "Aceite 1 para concluída e 0 para pendente.", "Acumule as marcações positivas."),
    25: ("Leia as três distâncias em quilômetros.", "Confirme que não há trecho negativo.", "Some o percurso."),
    26: ("Use reais para valores monetários.", "Leia as três doações.", "Some e apresente duas casas decimais."),
    27: ("Exija capacidade positiva.", "Divida porções pela capacidade.", "Arredonde para cima quando houver resto."),
    28: ("Considere apenas dezembro.", "Valide um dia de 1 a 31.", "Subtraia o dia de 31."),
    29: ("Leia os quatro percentuais.", "Verifique a faixa 0 a 100.", "Divida a soma por quatro."),
    30: ("Divisão inteira por 60 dá minutos.", "Resto por 60 dá segundos.", "Mostre ambas as partes."),
    31: ("Leia a meta como texto.", "Evite mensagem com meta vazia.", "Inclua a meta na saudação."),
}
for day, hints in hint_steps.items():
    entries[f"12-{day:02d}/simples"]["hints"] = list(hints)

catalog.write_text(json.dumps(entries, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
print(f"Catalogued {len(entries)} challenge solutions")

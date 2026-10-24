#!/usr/bin/env python3
"""Build daily challenge pages from the source CSV and solution catalog.

Only catalog entries with a concrete implementation are published. This avoids
silently advertising a generic exercise as a solved CSV challenge.
"""

import csv
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
CSV = ROOT / "data/visualg_365_dias_730_desafios.csv"
CATALOG = ROOT / "data/challenge-solutions.json"
OUTPUT = ROOT / "src/desafios"
MONTHS = ("", "janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro")
GENERIC_OBJECTIVE_ENDINGS = (
    "O resultado deve ser mostrado ao estudante.",
    "Apresente um resultado verificável no console.",
    "Mostre o valor obtido de forma clara.",
    "Ao final, apresente os valores necessários para conferir o resultado.",
    "Mostre o resultado no console.",
    "Informe também quando não houver resposta válida.",
    "O resultado deve aparecer no console após a leitura dos dados.",
    "O programa deve apresentar resultados que permitam conferir os registros feitos.",
)
GLOSSARY = (
    (r"\bvetores? paralelos?\b", "Vetores paralelos", "São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa."),
    (r"\bprogramação dinâmica\b", "Programação dinâmica", "É guardar resultados já calculados para não repetir o mesmo trabalho."),
    (r"\bmédia ponderada\b", "Média ponderada", "É uma média em que algumas notas têm mais importância, definida pelos pesos."),
    (r"\bmatriz(?:es)?\b", "Matriz", "É uma tabela de linhas e colunas; cada posição guarda um valor."),
    (r"\bvetor(?:es)?\b", "Vetor", "É uma lista de valores com posições numeradas, como notas[1] e notas[2]."),
    (r"\bíndices?\b", "Índice", "É o número da posição de um item em uma lista."),
    (r"\blaços?\b", "Laço", "É um trecho do algoritmo que se repete."),
    (r"\bacumulador(?:es)?\b", "Acumulador", "É uma variável que guarda um total e recebe novos valores aos poucos."),
    (r"\brecurs(?:ão|ivo|iva)\b", "Recursão", "É quando uma função ou procedimento chama a si mesmo para resolver uma parte menor."),
    (r"\bquociente\b", "Quociente", "É o resultado de uma divisão."),
    (r"\bresto da divisão\b", "Resto da divisão", "É o que sobra quando uma divisão inteira não é exata. Por exemplo, 7 dividido por 3 deixa resto 1."),
    (r"\bporcentagem\b", "Porcentagem", "É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100."),
    (r"\bvariáve(?:l|is) lógic(?:a|as)\b", "Variável lógica", "Guarda apenas verdadeiro ou falso, como uma resposta de sim ou não."),
    (r"\bdiv\b", "div", "É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2."),
    (r"\bmod\b", "mod", "Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1."),
    (r"\bdiagonais?\b", "Diagonal", "É uma sequência de posições que atravessa uma tabela de um canto a outro."),
    (r"\bprocedimentos?\b", "Procedimento", "É um bloco de comandos com nome que pode ser chamado quando necessário."),
    (r"\bfunç(?:ão|ões)\b", "Função", "É um bloco de comandos com nome que devolve um valor."),
    (r"\bpermutaç(?:ão|ões)\b", "Permutação", "É uma ordem possível para os mesmos itens. Por exemplo, A-B-C e B-A-C são duas ordens diferentes."),
)
GENERIC_SIMPLE_HINT_STARTS = (
    "Anote quais valores",
    "Separe os dados informados",
    "Identifique as entradas e suas unidades",
    "Identifique entradas e saída",
    "Identifique o tipo das entradas",
)


def objective_text(prompt, objective):
    prompt = prompt[0].upper() + prompt[1:]
    objective = objective.strip()
    if objective.casefold().startswith(prompt.casefold()):
        objective = objective[len(prompt):].strip()
    for ending in GENERIC_OBJECTIVE_ENDINGS:
        if objective.endswith(ending):
            objective = objective[:-len(ending)].strip()
    if not objective:
        return prompt
    return f"{prompt}\n\n{objective}"


def glossary_text(entry):
    content = " ".join((entry["objective"], entry["rules"], entry["edge"], entry["explanation"], *entry.get("hints", [])))
    found = []
    for pattern, title, meaning in GLOSSARY:
        if re.search(pattern, content, re.IGNORECASE):
            if title == "Vetor" and any(item[0] == "Vetores paralelos" for item in found):
                continue
            found.append((title, meaning))
        if len(found) == 3:
            break
    if not found:
        return ""
    return "\n\n### Palavras úteis\n\n" + "\n".join(f"- **{title}:** {meaning}" for title, meaning in found)


def useful_hints(level, entry):
    hints = entry.get("hints") or []
    if level != "simples" or not hints or not hints[0].startswith(GENERIC_SIMPLE_HINT_STARTS):
        return hints
    code = entry["code"].lower()
    if "leia(" in code:
        first = "Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável."
    else:
        first = "Este exercício não pede entrada. Prepare os valores que o próprio programa usará."
    if re.search(r"\b(para|enquanto|repita)\b", code):
        second = "Use uma repetição para executar a mesma tarefa várias vezes."
    elif re.search(r"\bse\b", code):
        second = "Use uma condição `se` para escolher a resposta de acordo com o valor recebido."
    elif re.search(r"(?m)^\s*\w+\s*<-.*[+*/\\-]", code):
        second = "Faça a conta antes de mostrar o resultado. Guarde o valor calculado em uma variável."
    else:
        second = "Monte a mensagem de saída com os dados lidos, na ordem pedida."
    return [first, second, "Depois de testar o exemplo, experimente o caso especial descrito acima."]


def render(row, level, entry):
    month, day = map(int, row["data_mm_dd"].split("-"))
    title = row[f"{level}_titulo"]
    prompt = row[f"{level}_enunciado"].strip()
    code = entry["code"].strip()
    hints = useful_hints(level, entry) or [
        "Identifique as entradas e declare variáveis com os tipos adequados.",
        "Separe a leitura, o cálculo e a apresentação do resultado.",
        "Confira o caso de fronteira indicado antes de comparar sua resposta com a solução.",
    ]
    hints_text = "\n".join(f"{i}. {hint}" for i, hint in enumerate(hints, 1))
    display_level = "Avançado" if level == "avancado" else "Simples"
    objective = objective_text(prompt, entry["objective"])
    glossary = glossary_text(entry)
    example = "\n".join(line.rstrip() for line in entry["example"].strip().splitlines())
    example_note = '\n**Como ler o exemplo:** a seta → significa "resulta em".\n' if "→" in example else ""
    return f"""# {title}

**Data:** {day} de {MONTHS[month]} · **Nível:** {display_level}

## Objetivo

{objective}

## Como funciona

{entry['rules'].strip()}{glossary}

## Exemplo de execução

```text
{example}
```
{example_note}
{entry['edge'].strip()}

## Dicas para resolução

{hints_text}

## Solução

```visualg
{code}
```

{entry['explanation'].strip()}
"""


def main():
    entries = json.loads(CATALOG.read_text(encoding="utf-8"))
    rows = {r["data_mm_dd"]: r for r in csv.DictReader(CSV.open(encoding="utf-8", newline=""))}
    expected = {f"{date}/{level}" for date in rows for level in ("simples", "avancado")}
    missing = expected - entries.keys()
    extra = entries.keys() - expected
    if len(rows) != 365 or missing or extra:
        raise ValueError(
            f"Challenge coverage mismatch: {len(rows)} dates, "
            f"{len(missing)} missing entries, {len(extra)} extra entries"
        )
    for key, entry in entries.items():
        date, level = key.rsplit("/", 1)
        if date not in rows or level not in ("simples", "avancado"):
            raise ValueError(f"Invalid catalog key: {key}")
        if not all(entry.get(field) for field in ("objective", "rules", "example", "edge", "code", "explanation")):
            raise ValueError(f"Incomplete catalog entry: {key}")
        if not re.search(r"(?im)^fimalgoritmo\s*$", entry["code"]):
            raise ValueError(f"Incomplete solution: {key}")
        destination = OUTPUT / date.replace("-", "/") / f"{level}.md"
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(render(rows[date], level, entry), encoding="utf-8")
    print(f"Wrote {len(entries)} challenge pages")


if __name__ == "__main__":
    main()

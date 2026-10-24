"""Generate the daily challenge index from the reviewed CSV source."""

import csv
import json
from datetime import date, timedelta
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "data" / "visualg_365_dias_730_desafios.csv"
TARGET = ROOT / "src" / "desafios" / "calendario.json"


def main():
    with SOURCE.open(encoding="utf-8-sig", newline="") as source:
        rows = list(csv.DictReader(source))
    if len(rows) != 365:
        raise ValueError(f"Esperados 365 dias; encontrados {len(rows)}")

    challenges = []
    for index, row in enumerate(rows):
        expected = (date(2025, 1, 1) + timedelta(days=index)).strftime("%m-%d")
        if row["data_mm_dd"] != expected or int(row["dia_do_ano"]) != index + 1:
            raise ValueError(f"Dia fora de ordem: {row['data_mm_dd']}")
        for field in ("simples_titulo", "simples_enunciado", "avancado_titulo", "avancado_enunciado"):
            if not row[field].strip():
                raise ValueError(f"Campo vazio em {expected}: {field}")
        challenges.append({
            "dia": expected,
            "tema": row["tema"],
            "simples": {"titulo": row["simples_titulo"], "enunciado": row["simples_enunciado"]},
            "avancado": {"titulo": row["avancado_titulo"], "enunciado": row["avancado_enunciado"]},
        })

    TARGET.parent.mkdir(parents=True, exist_ok=True)
    TARGET.write_text(json.dumps(challenges, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{len(challenges)} dias e {len(challenges) * 2} enunciados em {TARGET}")


if __name__ == "__main__":
    main()

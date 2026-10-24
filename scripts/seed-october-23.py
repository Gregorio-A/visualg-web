#!/usr/bin/env python3
"""Bring the two previously hand-written October 23 pages into the catalog."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
catalog = root / "data/challenge-solutions.json"
entries = json.loads(catalog.read_text(encoding="utf-8"))
fence = chr(96) * 3

def section(markdown, title, next_title):
    start = markdown.index(f"## {title}\n") + len(title) + 4
    end = markdown.index(f"## {next_title}\n", start)
    return markdown[start:end].strip()

for level in ("simples", "avancado"):
    markdown = (root / f"src/desafios/10/23/{level}.md").read_text(encoding="utf-8")
    example_section = section(markdown, "Exemplo de execução", "Dicas para resolução")
    match_example = re.search(fence + r"text\n(.*?)\n" + fence, example_section, re.S)
    solution_section = markdown.split("## Solução\n", 1)[1]
    match_code = re.search(fence + r"visualg\n(.*?)\n" + fence, solution_section, re.S)
    entries[f"10-23/{level}"] = dict(
        objective=section(markdown, "Objetivo", "Como funciona"),
        rules=section(markdown, "Como funciona", "Exemplo de execução"),
        example=match_example.group(1),
        edge=example_section[match_example.end():].strip(),
        hints=[re.sub(r"^\d+\.\s*", "", line) for line in section(markdown, "Dicas para resolução", "Solução").splitlines() if line.strip()],
        code=match_code.group(1),
        explanation=solution_section[match_code.end():].strip(),
    )

catalog.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catalogued {len(entries)} challenge solutions")

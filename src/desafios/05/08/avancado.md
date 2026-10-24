# Escala de equipes

**Data:** 8 de maio · **Nível:** Avançado

## Objetivo

Associe funcionários a turnos e identifique conflitos de disponibilidade.

## Como funciona

Associe cinco funcionários a manhã (8h–12h) ou tarde (12h–18h), com disponibilidade informada em minutos. Marque conflito se a disponibilidade não tocar o turno designado.

## Exemplo de execução

```text
Ana no turno manhã, disponível 780–1000 min
Conflito com turno da manhã
```

Disponibilidade que toca apenas uma extremidade do turno é tratada como compatível nesta versão.

## Dicas para resolução

1. Converta horários para minutos.
2. Defina as faixas dos turnos.
3. Compare início e fim disponíveis com a faixa escolhida.

## Solução

```visualg
algoritmo "Desafio0508A"
var
nome: vetor[1..5] de caractere
  inicioMin, fimMin, turno: vetor[1..5] de inteiro
  i, j: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Funcionário ", i, ": ")
    leia(nome[i])
    escreva("Turno (1 manhã, 2 tarde): ")
    leia(turno[i])
    escreva("Disponível de (min): ")
    leia(inicioMin[i])
    escreva("Disponível até (min): ")
    leia(fimMin[i])
    se (turno[i] = 1) e ((inicioMin[i] > 720) ou (fimMin[i] < 480)) entao
      escreval(nome[i], ": conflito com turno da manhã")
    fimse
    se (turno[i] = 2) e ((inicioMin[i] > 1080) ou (fimMin[i] < 720)) entao
      escreval(nome[i], ": conflito com turno da tarde")
    fimse
  fimpara
fimalgoritmo
```

Cada turno possui faixa fixa; o código compara a janela pessoal à faixa atribuída.

# Previsão de frequência

**Data:** 23 de março · **Nível:** Avançado

## Objetivo

Estime a frequência final considerando aulas restantes e faltas futuras.

## Como funciona

Leia aulas dadas e presenças já registradas, depois aulas restantes e faltas futuras previstas. Calcule a frequência sobre o total de aulas do período.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
Dadas 20, presenças 18; restam 10, faltas futuras 2
Presenças finais 26 de 30
Frequência estimada: 86,67%
```

Se não houver nenhuma aula no período, a porcentagem não é definida.

## Dicas para resolução

1. Calcule as presenças futuras.
2. Some-as às presenças atuais.
3. Divida pelo total final de aulas.

## Solução

```visualg
algoritmo "Desafio0323A"
var
dadas, presencas, restantes, faltasFuturas: inteiro
  previstas, frequencia: real
inicio
escreva("Aulas já dadas: ")
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
  fimse
fimalgoritmo
```

Presenças futuras são aulas restantes menos faltas previstas. O denominador inclui aulas já dadas e futuras.

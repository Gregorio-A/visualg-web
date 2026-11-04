# Porta combinada

**Data:** 23 de outubro · **Nível:** Avançado

## Objetivo

Procure em uma lista duas chaves cujos códigos somem o valor da fechadura.

Leia uma lista de cinco códigos e o valor esperado pela fechadura. Identifique o primeiro par de **chaves distintas** cuja soma seja igual ao valor informado. Se não existir tal par, avise o usuário.

## Como funciona

1. Leia cinco números inteiros e guarde-os em um vetor.
2. Leia o valor procurado pela fechadura.
3. Compare cada posição com as posições posteriores. Assim, a mesma chave não será usada duas vezes e o mesmo par não será examinado em ordem inversa.
4. Mostre os índices e os códigos do primeiro par encontrado. Caso nenhum par funcione, mostre uma mensagem clara.

Índices começam em 1. Dois códigos iguais são permitidos quando estiverem em posições diferentes.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.
- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Chave 1: 4
Chave 2: 9
Chave 3: 2
Chave 4: 7
Chave 5: 5
Valor da fechadura: 11
Chaves 1 e 4: 4 + 7 = 11
```

Se o valor procurado for `30`, o programa deve informar que nenhuma combinação foi encontrada.

## Dicas para resolução

1. Use `vetor[1..5] de inteiro` para guardar os códigos.
2. Percorra a lista com dois laços: o segundo começa uma posição depois do primeiro.
3. Guarde os índices quando encontrar uma soma igual ao alvo. Uma variável lógica evita substituir o primeiro par por outro.

## Solução

```visualg
algoritmo "PortaCombinada"
var
  chaves: vetor[1..5] de inteiro
  i, j, alvo, indice1, indice2: inteiro
  encontrou: logico
inicio
  para i de 1 ate 5 faca
    escreva("Chave ", i, ": ")
    leia(chaves[i])
  fimpara

  escreva("Valor da fechadura: ")
  leia(alvo)
  encontrou <- falso
  indice1 <- 0
  indice2 <- 0

  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se (nao encontrou) e (chaves[i] + chaves[j] = alvo) entao
        encontrou <- verdadeiro
        indice1 <- i
        indice2 <- j
      fimse
    fimpara
  fimpara

  se encontrou entao
    escreval("Chaves ", indice1, " e ", indice2, ": ", chaves[indice1], " + ", chaves[indice2], " = ", alvo)
  senao
    escreval("Nenhuma combinação de duas chaves foi encontrada.")
  fimse
fimalgoritmo
```

O laço externo escolhe a primeira chave e o interno escolhe somente chaves posteriores. A variável `encontrou` preserva o primeiro par válido. O algoritmo faz no máximo dez comparações de pares para cinco chaves.

# Bilhete criptografado

**Data:** 25 de fevereiro · **Nível:** Avançado

## Objetivo

Codifique e decodifique mensagens com deslocamento alfabético configurável.

## Como funciona

Use uma cifra de César com deslocamento configurável de 0 a 25. Codificação avança letras; decodificação recua. Preserve espaços e sinais.

### Palavras úteis

- **Resto da divisão:** É o que sobra quando uma divisão inteira não é exata. Por exemplo, 7 dividido por 3 deixa resto 1.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
Mensagem: abc xyz; deslocamento: 2; operação: codificar
Resultado: cde zab
```

O exercício trabalha com letras minúsculas sem acentos. Deslocamento zero conserva a mensagem.

## Dicas para resolução

1. Trabalhe com o código de cada caractere.
2. Use resto da divisão por 26 para circular pelo alfabeto.
3. Preserve caracteres que não sejam letras minúsculas.

## Solução

```visualg
algoritmo "Desafio0225A"
var
mensagem, transformada, letra: caractere
  deslocamento, opcao, i, codigo: inteiro
inicio
escreva("Mensagem (letras minúsculas sem acentos): ")
  leia(mensagem)
  escreva("Deslocamento (0 a 25): ")
  leia(deslocamento)
  escreva("Operação (1 codificar, 2 decodificar): ")
  leia(opcao)
  transformada <- ""
  se (deslocamento >= 0) e (deslocamento <= 25) e ((opcao = 1) ou (opcao = 2)) entao
    para i de 1 ate compr(mensagem) faca
      letra <- copia(mensagem, i, 1)
      codigo <- asc(letra)
      se (codigo >= 97) e (codigo <= 122) entao
        se opcao = 1 entao
          codigo <- ((codigo - 97 + deslocamento) mod 26) + 97
        senao
          codigo <- ((codigo - 97 - deslocamento + 26) mod 26) + 97
        fimse
        transformada <- transformada + carac(codigo)
      senao
        transformada <- transformada + letra
      fimse
    fimpara
    escreval("Resultado: ", transformada)
  senao
    escreval("Parâmetros inválidos.")
  fimse
fimalgoritmo
```

Os códigos ASCII 97 a 122 correspondem a `a` até `z`; `mod 26` faz a volta após `z` ou antes de `a`.

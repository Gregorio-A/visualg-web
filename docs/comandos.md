# Comandos Especiais

Esta aba lista comandos da linguagem que não se encaixam diretamente nas seções de entrada, saída, repetição ou condicionais.

## limpatela

`limpatela` limpa o console do VisuAlg Web.

```visualg
algoritmo "LimparConsole"
inicio
  escreval("Esta linha aparece primeiro")
  limpatela
  escreval("Depois do limpatela")
fimalgoritmo
```

## interrompa

`interrompa` encerra imediatamente o laço atual. Ele pode ser usado em `para`, `enquanto`, `repita...ate` e `repita...fimrepita`.

```visualg
algoritmo "Busca"
var
  i: inteiro
inicio
  para i de 1 ate 10 faca
    se i = 4 entao
      escreval("Encontrado: ", i)
      interrompa
    fimse
  fimpara
fimalgoritmo
```

## aleatorio

Substitui leituras numéricas e de texto por valores gerados automaticamente. Variáveis lógicas continuam pedindo entrada.

```visualg
aleatorio
aleatorio on
aleatorio 50
aleatorio -10, 10
aleatorio off
```

Sem faixa, usa `0..100`. Com um valor, usa `0..valor`. Com dois, usa `minimo..maximo`; a ordem é corrigida se estiver invertida. Textos aleatórios têm cinco letras maiúsculas.

## arquivo

Deve aparecer antes da seção `var`/`inicio` e só pode ser usado uma vez. Se o arquivo já existe, cada `leia` consome o próximo valor. Se ainda não existe, as entradas digitadas são registradas para as próximas execuções.

```visualg
arquivo "turma/dados.txt"
```

No navegador, o nome identifica dados persistentes isolados pelo site. No aplicativo Electron, corresponde a um arquivo de texto físico na pasta de dados do VisuAlg Web.

## timer

Aplica um atraso antes de cada comando seguinte. `timer on` usa 500 ms; valores são limitados ao intervalo de 0 a 10.000 ms.

```visualg
timer on
timer 1000
timer off
```

## pausa e debug

`pausa` interrompe sempre e `debug` interrompe apenas quando sua expressão lógica é verdadeira. Confirme pelo terminal para continuar.

```visualg
pausa
debug contador > 10
```

## eco

Controla se os valores obtidos por `leia` são reproduzidos no console. O padrão é ligado.

```visualg
eco off
eco on
```

## cronometro

Mede o tempo entre os comandos de início e fim e escreve o resultado em segundos e milissegundos.

```visualg
cronometro on
// comandos medidos
cronometro off
```

## Recursos da interface

Algumas ações de depuração são recursos da interface, não comandos da linguagem:

| Ação | Onde usar |
| --- | --- |
| Executar | Botão `Executar` ou atalho indicado na interface. |
| Passo a passo | Botão `Passo a passo`. |
| Parar | Botão `Parar` durante a execução. |
| Limpar console | Botão de limpeza no painel `Console` ou comando `limpatela`. |
| Detecção de loop infinito | `Configurações > Gerais > Detecção de loop infinito`. |

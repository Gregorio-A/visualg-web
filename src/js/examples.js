// ============================================
// VisuAlg Web IDE - Exemplos prontos
// ============================================

(function () {
    'use strict';

    window.VisuAlgExamples = [
        {
            id: 'ola-mundo',
            title: 'Olá, mundo!',
            level: 'Primeiros passos',
            description: 'Execute seu primeiro algoritmo e veja uma mensagem no console.',
            source: [
                'Algoritmo "OlaMundo"',
                '',
                'Inicio',
                '  escreval("Olá, mundo!")',
                'fimalgoritmo'
            ].join('\n'),
            expected: 'Olá, mundo!'
        },
        {
            id: 'media-escolar',
            title: 'Média escolar',
            level: 'Variáveis',
            description: 'Use variáveis reais, uma expressão aritmética e saída formatada.',
            source: [
                'Algoritmo "MediaEscolar"',
                'Var',
                '  nota1, nota2, media: real',
                '',
                'Inicio',
                '  nota1 <- 8',
                '  nota2 <- 7.5',
                '  media <- (nota1 + nota2) / 2',
                '  escreval("Média final: ", media:1:1)',
                'fimalgoritmo'
            ].join('\n'),
            expected: 'Média final: 7.8'
        },
        {
            id: 'aprovacao',
            title: 'Aluno aprovado?',
            level: 'Condição',
            description: 'Tome uma decisão com se, então e senão.',
            source: [
                'Algoritmo "Aprovacao"',
                'Var',
                '  media: real',
                '',
                'Inicio',
                '  media <- 8.2',
                '  se media >= 7 entao',
                '    escreval("Aluno aprovado!")',
                '  senao',
                '    escreval("Aluno em recuperação.")',
                '  fimse',
                'fimalgoritmo'
            ].join('\n'),
            expected: 'Aluno aprovado!'
        },
        {
            id: 'tabuada',
            title: 'Tabuada do 7',
            level: 'Repetição',
            description: 'Repita comandos com para e acompanhe os resultados no console.',
            source: [
                'Algoritmo "Tabuada"',
                'Var',
                '  i: inteiro',
                '',
                'Inicio',
                '  para i de 1 ate 10 faca',
                '    escreval("7 x ", i, " = ", 7 * i)',
                '  fimpara',
                'fimalgoritmo'
            ].join('\n'),
            expected: [
                '7 x 1 = 7',
                '7 x 2 = 14',
                '7 x 3 = 21',
                '7 x 4 = 28',
                '7 x 5 = 35',
                '7 x 6 = 42',
                '7 x 7 = 49',
                '7 x 8 = 56',
                '7 x 9 = 63',
                '7 x 10 = 70'
            ].join('\n')
        },
        {
            id: 'vetores',
            title: 'Soma de um vetor',
            level: 'Vetores',
            description: 'Preencha um vetor, percorra seus elementos e calcule uma soma.',
            source: [
                'Algoritmo "SomaVetor"',
                'Var',
                '  numeros: vetor [1..5] de inteiro',
                '  i, soma: inteiro',
                '',
                'Inicio',
                '  soma <- 0',
                '  para i de 1 ate 5 faca',
                '    numeros[i] <- i * i',
                '    soma <- soma + numeros[i]',
                '  fimpara',
                '  escreval("Soma dos quadrados: ", soma)',
                'fimalgoritmo'
            ].join('\n'),
            expected: 'Soma dos quadrados: 55'
        }
    ];
})();

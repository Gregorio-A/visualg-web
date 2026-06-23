// ============================================
// VisuAlg Web IDE - Interpreter
// Lexer, Parser, and async Executor
// ============================================

(function () {
    'use strict';

    var MAX_ITERATIONS = 1000;

    // ==========================================
    // TOKEN TYPES
    // ==========================================
    var T = {
        KEYWORD: 'KEYWORD',
        IDENT: 'IDENT',
        NUMBER: 'NUMBER',
        STRING: 'STRING',
        OPERATOR: 'OPERATOR',
        ASSIGN: 'ASSIGN',       // <-
        LPAREN: 'LPAREN',
        RPAREN: 'RPAREN',
        LBRACKET: 'LBRACKET',
        RBRACKET: 'RBRACKET',
        COMMA: 'COMMA',
        COLON: 'COLON',
        DOTDOT: 'DOTDOT',       // ..
        NEWLINE: 'NEWLINE',
        EOF: 'EOF'
    };

    var KEYWORDS = [
        'algoritmo', 'var', 'inicio', 'fimalgoritmo',
        'se', 'entao', 'senao', 'fimse',
        'enquanto', 'faca', 'fimenquanto',
        'para', 'de', 'ate', 'passo', 'fimpara',
        'repita', 'fimrepita',
        'escolha', 'caso', 'outrocaso', 'fimescolha',
        'escreva', 'escreval', 'leia',
        'procedimento', 'fimprocedimento',
        'funcao', 'fimfuncao', 'retorne',
        'interrompa', 'limpatela',
        'e', 'ou', 'nao', 'xou', 'mod', 'div',
        'verdadeiro', 'falso',
        'inteiro', 'real', 'caractere', 'logico', 'vetor'
    ];

    var BUILTIN_FUNCTIONS = [
        'abs', 'quad', 'raizq', 'exp', 'log', 'logn',
        'sen', 'cos', 'tan', 'cotan', 'arcsen', 'arccos', 'arctan',
        'grauprad', 'radpgrau', 'int', 'pi', 'rand', 'randi',
        'compr', 'copia', 'maiusc', 'minusc', 'asc', 'carac',
        'pos', 'caracpnum', 'numpcarac'
    ];

    var KEYWORD_ALIASES = {
        'então': 'entao',
        'senão': 'senao',
        'até': 'ate',
        'faça': 'faca',
        'início': 'inicio',
        'lógico': 'logico',
        'não': 'nao'
    };

    // ==========================================
    // LEXER
    // ==========================================
    function Token(type, value, line) {
        this.type = type;
        this.value = value;
        this.line = line;
    }

    function Lexer(source) {
        this.source = source;
        this.pos = 0;
        this.line = 1;
        this.tokens = [];
    }

    Lexer.prototype.peek = function () {
        return this.pos < this.source.length ? this.source[this.pos] : null;
    };

    Lexer.prototype.advance = function () {
        var ch = this.source[this.pos++];
        if (ch === '\n') this.line++;
        return ch;
    };

    Lexer.prototype.tokenize = function () {
        while (this.pos < this.source.length) {
            var ch = this.peek();

            // Skip spaces and tabs
            if (ch === ' ' || ch === '\t' || ch === '\r') {
                this.advance();
                continue;
            }

            // Newline
            if (ch === '\n') {
                this.advance();
                // Collapse multiple newlines
                if (this.tokens.length > 0 && this.tokens[this.tokens.length - 1].type !== T.NEWLINE) {
                    this.tokens.push(new Token(T.NEWLINE, '\\n', this.line - 1));
                }
                continue;
            }

            // Comments: //
            if (ch === '/' && this.pos + 1 < this.source.length && this.source[this.pos + 1] === '/') {
                while (this.pos < this.source.length && this.source[this.pos] !== '\n') {
                    this.pos++;
                }
                continue;
            }

            // Block comments: { }
            if (ch === '{') {
                this.advance();
                while (this.pos < this.source.length && this.source[this.pos] !== '}') {
                    if (this.source[this.pos] === '\n') this.line++;
                    this.pos++;
                }
                if (this.pos < this.source.length) this.advance(); // skip }
                continue;
            }

            // String
            if (ch === '"') {
                this.tokens.push(this.readString());
                continue;
            }

            // Number
            if (this.isDigit(ch)) {
                this.tokens.push(this.readNumber());
                continue;
            }

            // Identifier or keyword
            if (this.isAlpha(ch) || ch === '_') {
                this.tokens.push(this.readIdent());
                continue;
            }

            // Two-char operators
            if (ch === '<') {
                this.advance();
                var next = this.peek();
                if (next === '-') {
                    this.advance();
                    this.tokens.push(new Token(T.ASSIGN, '<-', this.line));
                } else if (next === '=') {
                    this.advance();
                    this.tokens.push(new Token(T.OPERATOR, '<=', this.line));
                } else if (next === '>') {
                    this.advance();
                    this.tokens.push(new Token(T.OPERATOR, '<>', this.line));
                } else {
                    this.tokens.push(new Token(T.OPERATOR, '<', this.line));
                }
                continue;
            }

            if (ch === '>') {
                this.advance();
                if (this.peek() === '=') {
                    this.advance();
                    this.tokens.push(new Token(T.OPERATOR, '>=', this.line));
                } else {
                    this.tokens.push(new Token(T.OPERATOR, '>', this.line));
                }
                continue;
            }

            // Dot-dot (..)
            if (ch === '.' && this.pos + 1 < this.source.length && this.source[this.pos + 1] === '.') {
                this.advance(); this.advance();
                this.tokens.push(new Token(T.DOTDOT, '..', this.line));
                continue;
            }

            // Single char tokens
            this.advance();
            switch (ch) {
                case '(': this.tokens.push(new Token(T.LPAREN, '(', this.line)); break;
                case ')': this.tokens.push(new Token(T.RPAREN, ')', this.line)); break;
                case '[': this.tokens.push(new Token(T.LBRACKET, '[', this.line)); break;
                case ']': this.tokens.push(new Token(T.RBRACKET, ']', this.line)); break;
                case ',': this.tokens.push(new Token(T.COMMA, ',', this.line)); break;
                case ':':
                    if (this.peek() === '=') {
                        this.advance();
                        this.tokens.push(new Token(T.ASSIGN, ':=', this.line));
                    } else {
                        this.tokens.push(new Token(T.COLON, ':', this.line));
                    }
                    break;
                case '+': this.tokens.push(new Token(T.OPERATOR, '+', this.line)); break;
                case '-': this.tokens.push(new Token(T.OPERATOR, '-', this.line)); break;
                case '*': this.tokens.push(new Token(T.OPERATOR, '*', this.line)); break;
                case '/': this.tokens.push(new Token(T.OPERATOR, '/', this.line)); break;
                case '\\': this.tokens.push(new Token(T.OPERATOR, '\\', this.line)); break;
                case '%': this.tokens.push(new Token(T.OPERATOR, '%', this.line)); break;
                case '^': this.tokens.push(new Token(T.OPERATOR, '^', this.line)); break;
                case '=': this.tokens.push(new Token(T.OPERATOR, '=', this.line)); break;
                default:
                    // ignore unknown
                    break;
            }
        }

        this.tokens.push(new Token(T.EOF, null, this.line));
        return this.tokens;
    };

    Lexer.prototype.readString = function () {
        var line = this.line;
        this.advance(); // skip opening "
        var str = '';
        while (this.pos < this.source.length && this.source[this.pos] !== '"') {
            str += this.source[this.pos];
            if (this.source[this.pos] === '\n') this.line++;
            this.pos++;
        }
        if (this.pos < this.source.length) this.advance(); // skip closing "
        return new Token(T.STRING, str, line);
    };

    Lexer.prototype.readNumber = function () {
        var line = this.line;
        var num = '';
        while (this.pos < this.source.length && this.isDigit(this.source[this.pos])) {
            num += this.advance();
        }
        if (this.peek() === '.' && this.pos + 1 < this.source.length &&
            this.source[this.pos + 1] !== '.') {
            num += this.advance(); // .
            while (this.pos < this.source.length && this.isDigit(this.source[this.pos])) {
                num += this.advance();
            }
        }
        return new Token(T.NUMBER, parseFloat(num), line);
    };

    Lexer.prototype.readIdent = function () {
        var line = this.line;
        var id = '';
        while (this.pos < this.source.length && this.isAlphaNum(this.source[this.pos])) {
            id += this.advance();
        }
        var lower = id.toLowerCase();
        if (KEYWORDS.indexOf(lower) !== -1) {
            return new Token(T.KEYWORD, lower, line);
        }
        if (KEYWORD_ALIASES.hasOwnProperty(lower)) {
            return new Token(T.KEYWORD, KEYWORD_ALIASES[lower], line);
        }
        if (BUILTIN_FUNCTIONS.indexOf(lower) !== -1) {
            return new Token(T.IDENT, lower, line);
        }
        return new Token(T.IDENT, lower, line);
    };

    Lexer.prototype.isDigit = function (ch) {
        return ch >= '0' && ch <= '9';
    };

    Lexer.prototype.isAlpha = function (ch) {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_' ||
               /[áàâãéèêíìîóòôõúùûçÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ]/.test(ch);
    };

    Lexer.prototype.isAlphaNum = function (ch) {
        return this.isAlpha(ch) || this.isDigit(ch);
    };

    // ==========================================
    // PARSER
    // ==========================================
    function Parser(tokens) {
        this.tokens = tokens;
        this.pos = 0;
    }

    Parser.prototype.current = function () {
        return this.tokens[this.pos];
    };

    Parser.prototype.eat = function (type, value) {
        var tok = this.current();
        if (tok.type === type && (value === undefined || tok.value === value)) {
            this.pos++;
            return tok;
        }
        throw new Error('Linha ' + tok.line + ': Esperado ' + (value || type) +
            ', encontrado "' + tok.value + '"');
    };

    Parser.prototype.match = function (type, value) {
        var tok = this.current();
        return tok.type === type && (value === undefined || tok.value === value);
    };

    Parser.prototype.skipNewlines = function () {
        while (this.current().type === T.NEWLINE) {
            this.pos++;
        }
    };

    Parser.prototype.expectNewline = function () {
        if (this.current().type === T.NEWLINE) {
            this.pos++;
        }
        this.skipNewlines();
    };

    Parser.prototype.parse = function () {
        this.skipNewlines();

        // algoritmo "nome"
        this.eat(T.KEYWORD, 'algoritmo');
        var name = this.eat(T.STRING).value;
        this.expectNewline();

        // var declarations
        var varDecls = [];
        var procedures = [];
        var functions = [];

        if (this.match(T.KEYWORD, 'var')) {
            this.eat(T.KEYWORD, 'var');
            this.expectNewline();
            varDecls = this.parseVarDecls();
        }

        // Procedures and functions (before inicio)
        while (this.match(T.KEYWORD, 'procedimento') || this.match(T.KEYWORD, 'funcao')) {
            if (this.match(T.KEYWORD, 'procedimento')) {
                procedures.push(this.parseProcedure());
            } else {
                functions.push(this.parseFunction());
            }
            this.skipNewlines();
        }

        // inicio
        this.eat(T.KEYWORD, 'inicio');
        this.expectNewline();

        // body
        var body = this.parseStatements('fimalgoritmo');
        this.eat(T.KEYWORD, 'fimalgoritmo');

        return {
            type: 'Program',
            name: name,
            variables: varDecls,
            procedures: procedures,
            functions: functions,
            body: body
        };
    };

    Parser.prototype.parseVarDecls = function () {
        var decls = [];
        var declaredNames = {};
        while (!this.match(T.KEYWORD, 'inicio') &&
               !this.match(T.KEYWORD, 'procedimento') &&
               !this.match(T.KEYWORD, 'funcao') &&
               !this.match(T.EOF)) {
            if (this.match(T.NEWLINE)) {
                this.skipNewlines();
                continue;
            }
            if (this.match(T.IDENT)) {
                var decl = this.parseVarDecl();
                for (var k = 0; k < decl.names.length; k++) {
                    if (declaredNames.hasOwnProperty(decl.names[k])) {
                        throw new Error('Linha ' + decl.line + ': Variavel "' + decl.names[k] + '" ja declarada');
                    }
                    declaredNames[decl.names[k]] = true;
                }
                decls.push(decl);
                this.skipNewlines();
            } else {
                break;
            }
        }
        return decls;
    };

    Parser.prototype.parseVarDecl = function () {
        var names = [];
        var ident = this.eat(T.IDENT);
        var line = ident.line;
        if (ident.value.length > 30) {
            throw new Error('Linha ' + ident.line + ': Nome de variavel "' + ident.value + '" excede 30 caracteres');
        }
        names.push(ident.value);
        while (this.match(T.COMMA)) {
            this.eat(T.COMMA);
            ident = this.eat(T.IDENT);
            if (ident.value.length > 30) {
                throw new Error('Linha ' + ident.line + ': Nome de variavel "' + ident.value + '" excede 30 caracteres');
            }
            names.push(ident.value);
        }
        this.eat(T.COLON);

        var isVector = false;
        var dimensions = [];
        var dataType;

        if (this.match(T.KEYWORD, 'vetor')) {
            this.eat(T.KEYWORD, 'vetor');
            isVector = true;
            this.eat(T.LBRACKET);
            dimensions.push(this.parseRange());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                dimensions.push(this.parseRange());
            }
            this.eat(T.RBRACKET);
            this.eat(T.KEYWORD, 'de');
            dataType = this.eat(T.KEYWORD).value;
        } else {
            dataType = this.eat(T.KEYWORD).value;
        }

        return {
            type: 'VarDecl',
            names: names,
            dataType: dataType,
            isVector: isVector,
            dimensions: dimensions,
            line: line
        };
    };

    Parser.prototype.parseRange = function () {
        var low = this.parseExpression();
        this.eat(T.DOTDOT);
        var high = this.parseExpression();
        return { low: low, high: high };
    };

    Parser.prototype.parseProcedure = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'procedimento');
        var name = this.eat(T.IDENT).value;

        var params = [];
        if (this.match(T.LPAREN)) {
            params = this.parseParams();
        }
        this.expectNewline();

        var localVars = [];
        if (this.match(T.KEYWORD, 'var')) {
            this.eat(T.KEYWORD, 'var');
            this.expectNewline();
            localVars = this.parseVarDecls();
        }

        this.eat(T.KEYWORD, 'inicio');
        this.expectNewline();

        var body = this.parseStatements('fimprocedimento');
        this.eat(T.KEYWORD, 'fimprocedimento');
        this.skipNewlines();

        return {
            type: 'ProcDecl',
            name: name,
            params: params,
            localVars: localVars,
            body: body,
            line: line
        };
    };

    Parser.prototype.parseFunction = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'funcao');
        var name = this.eat(T.IDENT).value;

        var params = [];
        if (this.match(T.LPAREN)) {
            params = this.parseParams();
        }
        this.eat(T.COLON);
        var returnType = this.eat(T.KEYWORD).value;
        this.expectNewline();

        var localVars = [];
        if (this.match(T.KEYWORD, 'var')) {
            this.eat(T.KEYWORD, 'var');
            this.expectNewline();
            localVars = this.parseVarDecls();
        }

        this.eat(T.KEYWORD, 'inicio');
        this.expectNewline();

        var body = this.parseStatements('fimfuncao');
        this.eat(T.KEYWORD, 'fimfuncao');
        this.skipNewlines();

        return {
            type: 'FuncDecl',
            name: name,
            params: params,
            returnType: returnType,
            localVars: localVars,
            body: body,
            line: line
        };
    };

    Parser.prototype.parseParams = function () {
        this.eat(T.LPAREN);
        var params = [];
        if (!this.match(T.RPAREN)) {
            params = params.concat(this.parseParamGroup());
            while (this.match(T.OPERATOR, ';') || this.match(T.COMMA) ||
                   (this.current().type === T.IDENT) || this.match(T.KEYWORD, 'var')) {
                // VisuAlg uses ; to separate param groups, but some use ,
                if (this.match(T.OPERATOR, ';') || this.match(T.COMMA)) {
                    this.pos++;
                }
                if (this.match(T.RPAREN)) break;
                params = params.concat(this.parseParamGroup());
            }
        }
        this.eat(T.RPAREN);
        return params;
    };

    Parser.prototype.parseParamGroup = function () {
        var byRef = false;
        if (this.match(T.KEYWORD, 'var')) {
            this.eat(T.KEYWORD, 'var');
            byRef = true;
        }
        var names = [];
        names.push(this.eat(T.IDENT).value);
        while (this.match(T.COMMA)) {
            this.eat(T.COMMA);
            names.push(this.eat(T.IDENT).value);
        }
        this.eat(T.COLON);
        var dataType = this.eat(T.KEYWORD).value;

        return names.map(function (n) {
            return { name: n, type: dataType, byRef: byRef };
        });
    };

    Parser.prototype.parseStatements = function (endKeyword) {
        var stmts = [];
        this.skipNewlines();
        while (!this.match(T.KEYWORD, endKeyword) && !this.match(T.EOF)) {
            var stmt = this.parseStatement();
            if (stmt) stmts.push(stmt);
            this.skipNewlines();
        }
        return stmts;
    };

    Parser.prototype.parseStatement = function () {
        var tok = this.current();

        if (tok.type === T.NEWLINE) {
            this.skipNewlines();
            return null;
        }

        if (tok.type === T.KEYWORD) {
            switch (tok.value) {
                case 'escreva':
                case 'escreval':
                    return this.parseEscreva();
                case 'leia':
                    return this.parseLeia();
                case 'se':
                    return this.parseSe();
                case 'enquanto':
                    return this.parseEnquanto();
                case 'para':
                    return this.parsePara();
                case 'repita':
                    return this.parseRepita();
                case 'escolha':
                    return this.parseEscolha();
                case 'retorne':
                    return this.parseRetorne();
                case 'interrompa':
                    this.eat(T.KEYWORD, 'interrompa');
                    return { type: 'Interrompa', line: tok.line };
                case 'limpatela':
                    this.eat(T.KEYWORD, 'limpatela');
                    return { type: 'Limpatela', line: tok.line };
                default:
                    // Unknown keyword as statement - skip
                    this.pos++;
                    return null;
            }
        }

        if (tok.type === T.IDENT) {
            return this.parseAssignmentOrCall();
        }

        // Skip unknown tokens
        this.pos++;
        return null;
    };

    Parser.prototype.parseEscreva = function () {
        var tok = this.current();
        var newline = (tok.value === 'escreval');
        this.pos++;
        this.eat(T.LPAREN);

        var args = [];
        if (!this.match(T.RPAREN)) {
            args.push(this.parseEscrevaArg());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                args.push(this.parseEscrevaArg());
            }
        }
        this.eat(T.RPAREN);

        return { type: 'Escreva', args: args, newline: newline, line: tok.line };
    };

    Parser.prototype.parseEscrevaArg = function () {
        var expr = this.parseExpression();
        var width = null;
        var decimals = null;

        // Format: expr:width or expr:width:decimals
        if (this.match(T.COLON)) {
            this.eat(T.COLON);
            width = this.parseExpression();
            if (this.match(T.COLON)) {
                this.eat(T.COLON);
                decimals = this.parseExpression();
            }
        }

        return { expr: expr, width: width, decimals: decimals };
    };

    Parser.prototype.parseLeia = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'leia');
        this.eat(T.LPAREN);

        var targets = [];
        targets.push(this.parseVarRef());
        while (this.match(T.COMMA)) {
            this.eat(T.COMMA);
            targets.push(this.parseVarRef());
        }
        this.eat(T.RPAREN);

        return { type: 'Leia', targets: targets, line: line };
    };

    Parser.prototype.parseVarRef = function () {
        var name = this.eat(T.IDENT).value;
        var indices = [];
        if (this.match(T.LBRACKET)) {
            this.eat(T.LBRACKET);
            indices.push(this.parseExpression());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                indices.push(this.parseExpression());
            }
            this.eat(T.RBRACKET);
        }
        return { name: name, indices: indices };
    };

    Parser.prototype.parseSe = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'se');
        var condition = this.parseExpression();
        this.eat(T.KEYWORD, 'entao');
        this.expectNewline();

        var thenBlock = this.parseStatements('fimse');

        var elseBlock = [];
        if (this.match(T.KEYWORD, 'senao')) {
            this.eat(T.KEYWORD, 'senao');
            this.expectNewline();
            elseBlock = this.parseStatements('fimse');
        }

        this.eat(T.KEYWORD, 'fimse');

        return {
            type: 'Se',
            condition: condition,
            thenBlock: thenBlock,
            elseBlock: elseBlock,
            line: line
        };
    };

    // Override parseStatements for 'se' to handle senao as stop
    var origParseStatements = Parser.prototype.parseStatements;
    Parser.prototype.parseStatements = function (endKeyword) {
        var stmts = [];
        this.skipNewlines();
        while (!this.match(T.KEYWORD, endKeyword) && !this.match(T.EOF)) {
            // For se blocks, also stop at senao
            if (endKeyword === 'fimse' && this.match(T.KEYWORD, 'senao')) break;
            // For escolha blocks, stop at caso / outrocaso
            if ((endKeyword === 'fimescolha' || endKeyword === '__caso__') &&
                (this.match(T.KEYWORD, 'caso') || this.match(T.KEYWORD, 'outrocaso'))) break;

            var stmt = this.parseStatement();
            if (stmt) stmts.push(stmt);
            this.skipNewlines();
        }
        return stmts;
    };

    Parser.prototype.parseEnquanto = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'enquanto');
        var condition = this.parseExpression();
        this.eat(T.KEYWORD, 'faca');
        this.expectNewline();

        var body = this.parseStatements('fimenquanto');
        this.eat(T.KEYWORD, 'fimenquanto');

        return { type: 'Enquanto', condition: condition, body: body, line: line };
    };

    Parser.prototype.parsePara = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'para');
        var variable = this.eat(T.IDENT).value;
        this.eat(T.KEYWORD, 'de');
        var from = this.parseExpression();
        this.eat(T.KEYWORD, 'ate');
        var to = this.parseExpression();

        var step = null;
        if (this.match(T.KEYWORD, 'passo')) {
            this.eat(T.KEYWORD, 'passo');
            step = this.parseExpression();
        }
        this.eat(T.KEYWORD, 'faca');
        this.expectNewline();

        var body = this.parseStatements('fimpara');
        this.eat(T.KEYWORD, 'fimpara');

        return {
            type: 'Para',
            variable: variable,
            from: from,
            to: to,
            step: step,
            body: body,
            line: line
        };
    };

    Parser.prototype.parseRepita = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'repita');
        this.expectNewline();

        // repita...ate or repita...fimrepita
        var body = [];
        this.skipNewlines();
        while (!this.match(T.KEYWORD, 'ate') && !this.match(T.KEYWORD, 'fimrepita') && !this.match(T.EOF)) {
            var stmt = this.parseStatement();
            if (stmt) body.push(stmt);
            this.skipNewlines();
        }

        var condition = null;
        if (this.match(T.KEYWORD, 'ate')) {
            this.eat(T.KEYWORD, 'ate');
            condition = this.parseExpression();
        } else {
            this.eat(T.KEYWORD, 'fimrepita');
        }

        return { type: 'Repita', body: body, condition: condition, line: line };
    };

    Parser.prototype.parseEscolha = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'escolha');
        var expr = this.parseExpression();
        this.expectNewline();

        var cases = [];
        var otherwise = null;

        this.skipNewlines();
        while (this.match(T.KEYWORD, 'caso')) {
            this.eat(T.KEYWORD, 'caso');
            var values = [];
            values.push(this.parseExpression());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                values.push(this.parseExpression());
            }
            this.expectNewline();
            var caseBody = this.parseStatements('__caso__');
            cases.push({ values: values, body: caseBody });
            this.skipNewlines();
        }

        if (this.match(T.KEYWORD, 'outrocaso')) {
            this.eat(T.KEYWORD, 'outrocaso');
            this.expectNewline();
            otherwise = this.parseStatements('fimescolha');
        }

        this.eat(T.KEYWORD, 'fimescolha');

        return {
            type: 'Escolha',
            expr: expr,
            cases: cases,
            otherwise: otherwise,
            line: line
        };
    };

    Parser.prototype.parseRetorne = function () {
        var line = this.current().line;
        this.eat(T.KEYWORD, 'retorne');
        var expr = this.parseExpression();
        return { type: 'Retorne', expr: expr, line: line };
    };

    Parser.prototype.parseAssignmentOrCall = function () {
        var line = this.current().line;
        var name = this.eat(T.IDENT).value;

        // Array index
        var indices = [];
        if (this.match(T.LBRACKET)) {
            this.eat(T.LBRACKET);
            indices.push(this.parseExpression());
            while (this.match(T.COMMA)) {
                this.eat(T.COMMA);
                indices.push(this.parseExpression());
            }
            this.eat(T.RBRACKET);
        }

        if (this.match(T.ASSIGN)) {
            this.eat(T.ASSIGN);
            var expr = this.parseExpression();
            return {
                type: 'Assignment',
                target: name,
                indices: indices,
                expr: expr,
                line: line
            };
        }

        // Function/procedure call
        var args = [];
        if (this.match(T.LPAREN)) {
            this.eat(T.LPAREN);
            if (!this.match(T.RPAREN)) {
                args.push(this.parseExpression());
                while (this.match(T.COMMA)) {
                    this.eat(T.COMMA);
                    args.push(this.parseExpression());
                }
            }
            this.eat(T.RPAREN);
        }

        return { type: 'Call', name: name, args: args, line: line };
    };

    // ==========================================
    // EXPRESSION PARSER (Precedence climbing)
    // ==========================================
    Parser.prototype.parseExpression = function () {
        return this.parseOr();
    };

    Parser.prototype.parseOr = function () {
        var left = this.parseAnd();
        while (this.match(T.KEYWORD, 'ou') || this.match(T.KEYWORD, 'xou')) {
            var op = this.current().value;
            this.pos++;
            var right = this.parseAnd();
            left = { type: 'BinaryOp', op: op, left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parseAnd = function () {
        var left = this.parseNot();
        while (this.match(T.KEYWORD, 'e')) {
            this.pos++;
            var right = this.parseNot();
            left = { type: 'BinaryOp', op: 'e', left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parseNot = function () {
        if (this.match(T.KEYWORD, 'nao')) {
            this.pos++;
            var expr = this.parseNot();
            return { type: 'UnaryOp', op: 'nao', operand: expr };
        }
        return this.parseComparison();
    };

    Parser.prototype.parseComparison = function () {
        var left = this.parseAddSub();
        while (this.match(T.OPERATOR, '=') || this.match(T.OPERATOR, '<>') ||
               this.match(T.OPERATOR, '<') || this.match(T.OPERATOR, '>') ||
               this.match(T.OPERATOR, '<=') || this.match(T.OPERATOR, '>=')) {
            var op = this.current().value;
            this.pos++;
            var right = this.parseAddSub();
            left = { type: 'BinaryOp', op: op, left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parseAddSub = function () {
        var left = this.parseMulDiv();
        while (this.match(T.OPERATOR, '+') || this.match(T.OPERATOR, '-')) {
            var op = this.current().value;
            this.pos++;
            var right = this.parseMulDiv();
            left = { type: 'BinaryOp', op: op, left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parseMulDiv = function () {
        var left = this.parsePower();
        while (this.match(T.OPERATOR, '*') || this.match(T.OPERATOR, '/') ||
               this.match(T.OPERATOR, '\\') || this.match(T.KEYWORD, 'div') ||
               this.match(T.KEYWORD, 'mod') || this.match(T.OPERATOR, '%')) {
            var op = this.current().value;
            this.pos++;
            var right = this.parsePower();
            left = { type: 'BinaryOp', op: op, left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parsePower = function () {
        var left = this.parseUnary();
        while (this.match(T.OPERATOR, '^')) {
            this.pos++;
            var right = this.parseUnary();
            left = { type: 'BinaryOp', op: '^', left: left, right: right };
        }
        return left;
    };

    Parser.prototype.parseUnary = function () {
        if (this.match(T.OPERATOR, '-')) {
            this.pos++;
            var expr = this.parseUnary();
            return { type: 'UnaryOp', op: '-', operand: expr };
        }
        if (this.match(T.OPERATOR, '+')) {
            this.pos++;
            return this.parseUnary();
        }
        return this.parsePrimary();
    };

    Parser.prototype.parsePrimary = function () {
        var tok = this.current();

        // Number
        if (tok.type === T.NUMBER) {
            this.pos++;
            return { type: 'NumberLit', value: tok.value, line: tok.line };
        }

        // String
        if (tok.type === T.STRING) {
            this.pos++;
            return { type: 'StringLit', value: tok.value, line: tok.line };
        }

        // Boolean
        if (tok.type === T.KEYWORD && (tok.value === 'verdadeiro' || tok.value === 'falso')) {
            this.pos++;
            return { type: 'BoolLit', value: tok.value === 'verdadeiro', line: tok.line };
        }

        // Parenthesized expression
        if (tok.type === T.LPAREN) {
            this.eat(T.LPAREN);
            var expr = this.parseExpression();
            this.eat(T.RPAREN);
            return expr;
        }

        // Identifier (variable or function call)
        if (tok.type === T.IDENT) {
            this.pos++;
            var name = tok.value;

            // Function call
            if (this.match(T.LPAREN)) {
                this.eat(T.LPAREN);
                var args = [];
                if (!this.match(T.RPAREN)) {
                    args.push(this.parseExpression());
                    while (this.match(T.COMMA)) {
                        this.eat(T.COMMA);
                        args.push(this.parseExpression());
                    }
                }
                this.eat(T.RPAREN);
                return { type: 'FuncCall', name: name, args: args, line: tok.line };
            }

            // Array access
            if (this.match(T.LBRACKET)) {
                this.eat(T.LBRACKET);
                var indices = [];
                indices.push(this.parseExpression());
                while (this.match(T.COMMA)) {
                    this.eat(T.COMMA);
                    indices.push(this.parseExpression());
                }
                this.eat(T.RBRACKET);
                return { type: 'ArrayAccess', name: name, indices: indices, line: tok.line };
            }

            return { type: 'VarRef', name: name, line: tok.line };
        }

        throw new Error('Linha ' + tok.line + ': Expressao inesperada "' + tok.value + '"');
    };

    // ==========================================
    // EXECUTOR
    // ==========================================
    function Executor(terminal, variablesPanel) {
        this.terminal = terminal;
        this.variablesPanel = variablesPanel;
        this.variables = new Map();
        this.procedures = {};
        this.functions = {};
        this.running = false;
        this.stepMode = false;
        this.stepResolve = null;
        this.callStack = [];
        this.breakFlag = false;
        this.returnValue = undefined;
    }

    Executor.prototype.run = async function (ast) {
        this.running = true;
        this.breakFlag = false;

        // Register procedures and functions
        for (var i = 0; i < ast.procedures.length; i++) {
            this.procedures[ast.procedures[i].name] = ast.procedures[i];
        }
        for (var i = 0; i < ast.functions.length; i++) {
            this.functions[ast.functions[i].name] = ast.functions[i];
        }

        // Declare global variables
        this.declareVariables(ast.variables, this.variables);
        this.updateVarsPanel();

        // Execute body
        try {
            await this.execBlock(ast.body);
        } catch (e) {
            if (e.message !== '__STOP__') {
                throw e;
            }
        }

        this.running = false;
    };

    Executor.prototype.declareVariables = function (decls, scope) {
        for (var i = 0; i < decls.length; i++) {
            var decl = decls[i];
            for (var j = 0; j < decl.names.length; j++) {
                var name = decl.names[j];
                if (decl.isVector) {
                    var arr = this.createArray(decl.dimensions, decl.dataType);
                    scope.set(name, { type: 'vetor de ' + decl.dataType, value: arr, dataType: decl.dataType, dimensions: decl.dimensions });
                } else {
                    scope.set(name, { type: decl.dataType, value: this.defaultValue(decl.dataType) });
                }
            }
        }
    };

    Executor.prototype.createArray = function (dimensions, dataType) {
        // For simplicity, store as a flat object with string keys
        return {};
    };

    Executor.prototype.defaultValue = function (type) {
        switch (type) {
            case 'inteiro': return 0;
            case 'real': return 0.0;
            case 'caractere': return '';
            case 'logico': return false;
            default: return 0;
        }
    };

    Executor.prototype.updateVarsPanel = function () {
        this.variablesPanel.update(this.variables);
    };

    Executor.prototype.checkRunning = function () {
        if (!this.running) throw new Error('__STOP__');
    };

    Executor.prototype.waitForStep = function () {
        var self = this;
        return new Promise(function (resolve) {
            self.stepResolve = resolve;
        });
    };

    Executor.prototype.nextStep = function () {
        if (this.stepResolve) {
            var resolve = this.stepResolve;
            this.stepResolve = null;
            resolve();
        }
    };

    Executor.prototype.execBlock = async function (stmts) {
        for (var i = 0; i < stmts.length; i++) {
            this.checkRunning();
            if (this.breakFlag) return;
            if (this.returnValue !== undefined) return;
            await this.execStatement(stmts[i]);
        }
    };

    Executor.prototype.execStatement = async function (stmt) {
        this.checkRunning();

        if (this.stepMode && stmt.line !== undefined) {
            if (window.VisualGEditor) {
                window.VisualGEditor.highlightLine(stmt.line - 1);
            }
            await this.waitForStep();
        }

        switch (stmt.type) {
            case 'Escreva': await this.execEscreva(stmt); await this.yield(); break;
            case 'Leia': await this.execLeia(stmt); break;
            case 'Assignment': await this.execAssignment(stmt); break;
            case 'Se': await this.execSe(stmt); break;
            case 'Enquanto': await this.execEnquanto(stmt); break;
            case 'Para': await this.execPara(stmt); break;
            case 'Repita': await this.execRepita(stmt); break;
            case 'Escolha': await this.execEscolha(stmt); break;
            case 'Call': await this.execCall(stmt); break;
            case 'Retorne': await this.execRetorne(stmt); break;
            case 'Interrompa': this.breakFlag = true; break;
            case 'Limpatela': this.terminal.clear(); break;
        }

        this.updateVarsPanel();
    };

    Executor.prototype.execEscreva = async function (stmt) {
        function formatVal(val) {
            if (typeof val === 'boolean') return val ? 'VERDADEIRO' : 'FALSO';
            return String(val);
        }

        var output = '';
        for (var i = 0; i < stmt.args.length; i++) {
            var arg = stmt.args[i];
            var val = await this.evalExpr(arg.expr);

            var str;
            if (arg.decimals !== null && arg.decimals !== undefined) {
                var w = arg.width ? await this.evalExpr(arg.width) : 0;
                var d = await this.evalExpr(arg.decimals);
                str = Number(val).toFixed(d);
                if (w > 0) str = str.padStart(w);
            } else if (arg.width !== null && arg.width !== undefined) {
                var w = await this.evalExpr(arg.width);
                str = formatVal(val);
                if (w > 0) str = str.padStart(w);
            } else {
                str = formatVal(val);
            }
            output += str;
        }

        if (stmt.newline) {
            this.terminal.writeln(output);
        } else {
            this.terminal.write(output);
        }
    };

    Executor.prototype.execLeia = async function (stmt) {
        for (var i = 0; i < stmt.targets.length; i++) {
            var target = stmt.targets[i];
            var varInfo = this.getVar(target.name);
            var prompt = '';
            var input = await this.terminal.readInput(prompt);

            var value = this.convertInput(input, varInfo.type);
            this.setVarValue(target.name, target.indices, value);
        }
    };

    Executor.prototype.convertInput = function (input, type) {
        var baseType = type;
        if (type.indexOf('vetor de ') === 0) {
            baseType = type.substring(9);
        }
        switch (baseType) {
            case 'inteiro': return parseInt(input, 10) || 0;
            case 'real': return parseFloat(input) || 0.0;
            case 'caractere': return input;
            case 'logico':
                return input.toLowerCase() === 'verdadeiro' || input.toLowerCase() === 'v';
            default: return input;
        }
    };

    Executor.prototype.execAssignment = async function (stmt) {
        var value = await this.evalExpr(stmt.expr);
        this.setVarValue(stmt.target, stmt.indices, value);
    };

    Executor.prototype.setVarValue = function (name, indices, value) {
        var varInfo = this.getVar(name);
        if (indices && indices.length > 0) {
            // Array assignment - evaluate indices synchronously (they should be simple)
            var key = '';
            for (var i = 0; i < indices.length; i++) {
                // indices are already evaluated or are AST nodes
                if (typeof indices[i] === 'object' && indices[i].type) {
                    // Need sync eval - but we're in async context, so this was already evaluated
                    key += (i > 0 ? ',' : '') + String(indices[i]);
                } else {
                    key += (i > 0 ? ',' : '') + String(indices[i]);
                }
            }
            varInfo.value[key] = value;
        } else {
            // Coerce types
            varInfo.value = this.coerceType(value, varInfo.type);
        }
    };

    Executor.prototype.setVarValueAsync = async function (name, indices, value) {
        var varInfo = this.getVar(name);
        if (indices && indices.length > 0) {
            var keys = [];
            for (var i = 0; i < indices.length; i++) {
                keys.push(await this.evalExpr(indices[i]));
            }
            var key = keys.join(',');
            varInfo.value[key] = value;
        } else {
            varInfo.value = this.coerceType(value, varInfo.type);
        }
    };

    Executor.prototype.coerceType = function (value, type) {
        switch (type) {
            case 'inteiro':
                return Math.trunc(Number(value)) || 0;
            case 'real':
                return Number(value) || 0;
            case 'caractere':
                return String(value);
            case 'logico':
                if (typeof value === 'boolean') return value;
                if (typeof value === 'string') return value.toLowerCase() === 'verdadeiro';
                return Boolean(value);
            default:
                return value;
        }
    };

    Executor.prototype.getVar = function (name) {
        // Check call stack (local scope first)
        for (var i = this.callStack.length - 1; i >= 0; i--) {
            if (this.callStack[i].has(name)) {
                return this.callStack[i].get(name);
            }
        }
        // Global scope
        if (this.variables.has(name)) {
            return this.variables.get(name);
        }
        throw new Error('Variavel "' + name + '" nao declarada');
    };

    Executor.prototype.execSe = async function (stmt) {
        var cond = await this.evalExpr(stmt.condition);
        if (cond) {
            await this.execBlock(stmt.thenBlock);
        } else if (stmt.elseBlock.length > 0) {
            await this.execBlock(stmt.elseBlock);
        }
    };

    Executor.prototype.checkIterationLimit = function (iter) {
        if (localStorage.getItem('visualg-loop-detection') === 'off') return Promise.resolve();
        if (iter.count <= MAX_ITERATIONS) return Promise.resolve();
        iter.count = 0;
        var overlay = document.getElementById('loopLimitOverlay');
        overlay.classList.remove('hidden');
        var self = this;
        return new Promise(function (resolve, reject) {
            document.getElementById('btn-loop-continue').onclick = function () {
                overlay.classList.add('hidden');
                resolve();
            };
            document.getElementById('btn-loop-stop').onclick = function () {
                overlay.classList.add('hidden');
                self.running = false;
                reject(new Error('__STOP__'));
            };
        });
    };

    Executor.prototype.execEnquanto = async function (stmt) {
        var iter = { count: 0 };
        while (await this.evalExpr(stmt.condition)) {
            iter.count++;
            await this.checkIterationLimit(iter);
            this.checkRunning();
            this.breakFlag = false;
            await this.execBlock(stmt.body);
            if (this.breakFlag) { this.breakFlag = false; break; }
            if (this.returnValue !== undefined) return;
            // Yield to avoid blocking UI
            await this.yield();
        }
    };

    Executor.prototype.execPara = async function (stmt) {
        var from = await this.evalExpr(stmt.from);
        var to = await this.evalExpr(stmt.to);
        var step = stmt.step ? await this.evalExpr(stmt.step) : 1;

        this.setVarValue(stmt.variable, [], from);

        var ascending = step > 0;
        var iter = { count: 0 };
        while (true) {
            iter.count++;
            await this.checkIterationLimit(iter);
            this.checkRunning();
            var current = this.getVar(stmt.variable).value;
            if (ascending && current > to) break;
            if (!ascending && current < to) break;

            this.breakFlag = false;
            await this.execBlock(stmt.body);
            if (this.breakFlag) { this.breakFlag = false; break; }
            if (this.returnValue !== undefined) return;

            this.setVarValue(stmt.variable, [], current + step);
            await this.yield();
        }
    };

    Executor.prototype.execRepita = async function (stmt) {
        var iter = { count: 0 };
        while (true) {
            iter.count++;
            await this.checkIterationLimit(iter);
            this.checkRunning();
            this.breakFlag = false;
            await this.execBlock(stmt.body);
            if (this.breakFlag) { this.breakFlag = false; break; }
            if (this.returnValue !== undefined) return;

            if (stmt.condition) {
                var cond = await this.evalExpr(stmt.condition);
                if (cond) break;
            } else {
                break;
            }
            await this.yield();
        }
    };

    Executor.prototype.execEscolha = async function (stmt) {
        var val = await this.evalExpr(stmt.expr);
        var matched = false;

        for (var i = 0; i < stmt.cases.length; i++) {
            var caso = stmt.cases[i];
            for (var j = 0; j < caso.values.length; j++) {
                var caseVal = await this.evalExpr(caso.values[j]);
                if (val === caseVal || (typeof val === 'string' && typeof caseVal === 'string' &&
                    val.toLowerCase() === caseVal.toLowerCase())) {
                    matched = true;
                    break;
                }
            }
            if (matched) {
                await this.execBlock(caso.body);
                break;
            }
        }

        if (!matched && stmt.otherwise) {
            await this.execBlock(stmt.otherwise);
        }
    };

    Executor.prototype.execCall = async function (stmt) {
        // Check if it's a procedure
        if (this.procedures[stmt.name]) {
            await this.callProcedure(stmt.name, stmt.args);
        } else {
            // Might be a built-in or unknown - try as function
            await this.callBuiltin(stmt.name, stmt.args);
        }
    };

    Executor.prototype.execRetorne = async function (stmt) {
        this.returnValue = await this.evalExpr(stmt.expr);
    };

    Executor.prototype.callProcedure = async function (name, argExprs) {
        var proc = this.procedures[name];
        if (!proc) throw new Error('Procedimento "' + name + '" nao encontrado');

        var localScope = new Map();
        // Evaluate arguments and bind to params
        for (var i = 0; i < proc.params.length; i++) {
            var param = proc.params[i];
            if (param.byRef) {
                // Pass by reference: share the same var entry
                var argName = argExprs[i] && argExprs[i].type === 'VarRef' ? argExprs[i].name : null;
                if (argName) {
                    localScope.set(param.name, this.getVar(argName));
                }
            } else {
                var val = i < argExprs.length ? await this.evalExpr(argExprs[i]) : this.defaultValue(param.type);
                localScope.set(param.name, { type: param.type, value: val });
            }
        }

        // Declare local variables
        this.declareVariables(proc.localVars, localScope);

        this.callStack.push(localScope);
        this.returnValue = undefined;
        await this.execBlock(proc.body);
        this.returnValue = undefined;
        this.callStack.pop();
    };

    Executor.prototype.callFunction = async function (name, argExprs) {
        var func = this.functions[name];
        if (!func) throw new Error('Funcao "' + name + '" nao encontrada');

        var localScope = new Map();
        for (var i = 0; i < func.params.length; i++) {
            var param = func.params[i];
            if (param.byRef) {
                var argName = argExprs[i] && argExprs[i].type === 'VarRef' ? argExprs[i].name : null;
                if (argName) {
                    localScope.set(param.name, this.getVar(argName));
                }
            } else {
                var val = i < argExprs.length ? await this.evalExpr(argExprs[i]) : this.defaultValue(param.type);
                localScope.set(param.name, { type: param.type, value: val });
            }
        }

        // Return variable (same name as function)
        localScope.set(name, { type: func.returnType, value: this.defaultValue(func.returnType) });

        this.declareVariables(func.localVars, localScope);

        this.callStack.push(localScope);
        this.returnValue = undefined;
        await this.execBlock(func.body);

        var result = this.returnValue !== undefined ? this.returnValue : localScope.get(name).value;
        this.returnValue = undefined;
        this.callStack.pop();

        return result;
    };

    Executor.prototype.yield = function () {
        return new Promise(function (resolve) { setTimeout(resolve, 0); });
    };

    // ==========================================
    // EXPRESSION EVALUATOR
    // ==========================================
    Executor.prototype.evalExpr = async function (node) {
        if (!node) return null;

        switch (node.type) {
            case 'NumberLit': return node.value;
            case 'StringLit': return node.value;
            case 'BoolLit': return node.value;

            case 'VarRef':
                return this.getVar(node.name).value;

            case 'ArrayAccess': {
                var varInfo = this.getVar(node.name);
                var keys = [];
                for (var i = 0; i < node.indices.length; i++) {
                    keys.push(await this.evalExpr(node.indices[i]));
                }
                var key = keys.join(',');
                var val = varInfo.value[key];
                return val !== undefined ? val : this.defaultValue(varInfo.dataType || 'inteiro');
            }

            case 'BinaryOp': {
                var left = await this.evalExpr(node.left);
                var right = await this.evalExpr(node.right);
                return this.evalBinaryOp(node.op, left, right);
            }

            case 'UnaryOp': {
                var operand = await this.evalExpr(node.operand);
                if (node.op === '-') return -operand;
                if (node.op === 'nao') return !operand;
                return operand;
            }

            case 'FuncCall':
                return await this.evalFuncCall(node.name, node.args);

            default:
                throw new Error('Expressao desconhecida: ' + node.type);
        }
    };

    Executor.prototype.evalBinaryOp = function (op, left, right) {
        switch (op) {
            case '+':
                if (typeof left === 'string' || typeof right === 'string') {
                    return String(left) + String(right);
                }
                return left + right;
            case '-': return left - right;
            case '*': return left * right;
            case '/': return left / right;
            case '\\':
            case 'div':
                return Math.trunc(left / right);
            case 'mod':
            case '%':
                return left % right;
            case '^': return Math.pow(left, right);
            case '=':
                if (typeof left === 'string' && typeof right === 'string') {
                    return left.toLowerCase() === right.toLowerCase();
                }
                return left === right;
            case '<>':
                if (typeof left === 'string' && typeof right === 'string') {
                    return left.toLowerCase() !== right.toLowerCase();
                }
                return left !== right;
            case '<': return left < right;
            case '>': return left > right;
            case '<=': return left <= right;
            case '>=': return left >= right;
            case 'e': return left && right;
            case 'ou': return left || right;
            case 'xou': return (left && !right) || (!left && right);
            default:
                throw new Error('Operador desconhecido: ' + op);
        }
    };

    Executor.prototype.evalFuncCall = async function (name, argNodes) {
        var lower = name.toLowerCase();

        // Built-in functions
        switch (lower) {
            case 'abs': return Math.abs(await this.evalExpr(argNodes[0]));
            case 'quad': { var v = await this.evalExpr(argNodes[0]); return v * v; }
            case 'raizq': {
                var v = await this.evalExpr(argNodes[0]);
                if (v < 0) throw new Error('Não é possível calcular a raiz quadrada de um número negativo (' + v + ')');
                return Math.sqrt(v);
            }
            case 'exp': {
                var base = await this.evalExpr(argNodes[0]);
                var exponent = await this.evalExpr(argNodes[1]);
                return Math.pow(base, exponent);
            }
            case 'log': return Math.log10(await this.evalExpr(argNodes[0]));
            case 'logn': return Math.log(await this.evalExpr(argNodes[0]));
            case 'sen': return Math.sin(await this.evalExpr(argNodes[0]));
            case 'cos': return Math.cos(await this.evalExpr(argNodes[0]));
            case 'tan': return Math.tan(await this.evalExpr(argNodes[0]));
            case 'cotan': return 1 / Math.tan(await this.evalExpr(argNodes[0]));
            case 'arcsen': return Math.asin(await this.evalExpr(argNodes[0]));
            case 'arccos': return Math.acos(await this.evalExpr(argNodes[0]));
            case 'arctan': return Math.atan(await this.evalExpr(argNodes[0]));
            case 'grauprad': return (await this.evalExpr(argNodes[0])) * Math.PI / 180;
            case 'radpgrau': return (await this.evalExpr(argNodes[0])) * 180 / Math.PI;
            case 'int': return Math.trunc(await this.evalExpr(argNodes[0]));
            case 'pi': return Math.PI;
            case 'rand': return Math.random();
            case 'randi': return Math.floor(Math.random() * (await this.evalExpr(argNodes[0])));
            case 'compr': return String(await this.evalExpr(argNodes[0])).length;
            case 'copia': {
                var str = String(await this.evalExpr(argNodes[0]));
                var pos = await this.evalExpr(argNodes[1]);
                var len = await this.evalExpr(argNodes[2]);
                return str.substr(pos - 1, len);
            }
            case 'maiusc': return String(await this.evalExpr(argNodes[0])).toUpperCase();
            case 'minusc': return String(await this.evalExpr(argNodes[0])).toLowerCase();
            case 'asc': {
                var ch = String(await this.evalExpr(argNodes[0]));
                return ch.length > 0 ? ch.charCodeAt(0) : 0;
            }
            case 'carac': return String.fromCharCode(await this.evalExpr(argNodes[0]));
            case 'pos': {
                var sub = String(await this.evalExpr(argNodes[0]));
                var str = String(await this.evalExpr(argNodes[1]));
                var idx = str.indexOf(sub);
                return idx >= 0 ? idx + 1 : 0;
            }
            case 'caracpnum': return parseFloat(await this.evalExpr(argNodes[0])) || 0;
            case 'numpcarac': return String(await this.evalExpr(argNodes[0]));
            default:
                break;
        }

        // User-defined function
        if (this.functions[name]) {
            return await this.callFunction(name, argNodes);
        }

        // User-defined procedure called as expression (shouldn't happen but handle gracefully)
        if (this.procedures[name]) {
            await this.callProcedure(name, argNodes);
            return 0;
        }

        throw new Error('Funcao "' + name + '" nao encontrada');
    };

    Executor.prototype.callBuiltin = async function (name, argNodes) {
        // Some builtins that can be called as statements
        // For now just try calling as a procedure
        if (this.procedures[name]) {
            await this.callProcedure(name, argNodes);
        }
    };

    // ==========================================
    // EXPORTS
    // ==========================================
    window.VisuAlgLexer = Lexer;
    window.VisuAlgParser = Parser;
    window.VisuAlgExecutor = Executor;
})();

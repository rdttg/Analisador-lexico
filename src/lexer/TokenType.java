package lexer;

public enum TokenType {
    IDENTIFIER,
    NUMBER,
    PLUS,      // +
    MINUS,     // -
    STAR,      // *
    SLASH,     // /
    LPAREN,    // (
    RPAREN,    // )
    EOF,       // fim do texto
    UNKNOWN    // qualquer coisa que eu não sei classificar
}

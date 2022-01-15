export class Argument {
    id;
    type;
    flagPrefixOption;
    flagPrefixValue;
    flagMiddleSyntaxOption;
    flagArgumentValue;
    positionalArgumentValue;

    constructor(properties = {}) {
        this.type = properties.type ?? TYPES.POSITIONAL;
        this.flagPrefixOption = properties.flagPrefixOption ?? FLAG_PREFIX_OPTIONS.HYPHEN;
        this.flagPrefixValue = properties.flagPrefixValue;
        this.flagMiddleSyntaxOption = properties.flagMiddleSyntaxOption ?? FLAG_MIDDLE_SYNTAX_LIST.WHITESPACE_SYMBOL;
        this.flagArgumentValue = properties.flagArgumentValue;
        this.positionalArgumentValue = properties.positionalArgumentValue;
    }
}

export const FLAG_PREFIX_OPTIONS = Object.freeze({
    HYPHEN: "-",
    DOUBLE_HYPHEN: "--"
});

export const FLAG_MIDDLE_SYNTAX_LIST = Object.freeze({
    WHITESPACE_SYMBOL: " ",
    EQUALS_SYMBOL: "="
});

export const TYPES = Object.freeze({
    POSITIONAL: "Positional",
    FLAG: "Flag"
})
import Symbol from "./Symbol.model";

export default class ExistSymbol {
    exist: Boolean;
    field: keyof Symbol;
    value: string | number;
}
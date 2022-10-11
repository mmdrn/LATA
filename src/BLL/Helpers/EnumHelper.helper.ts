export class EnumHelper {
    hasValue(value: number | string, type: Object): Boolean {
        if (Object.values(type).includes(value)) return true;
        return false
    }

    hasKey(key: string, type: Object): Boolean {
        if (Object.keys(type).includes(key)) return true;
        return false
    }
}
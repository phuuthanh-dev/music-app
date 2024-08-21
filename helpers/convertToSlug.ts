import unidecode from "unidecode";

export const convertToSlug = (text: string) => {
    const unidecodeText: string = unidecode(text.trim());
    return unidecodeText.replace(/\s+/g, "-");
}
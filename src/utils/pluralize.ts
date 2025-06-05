export default function pluralize(word: string): string {
    if (word.endsWith("y") && !/[aeiou]y$/.test(word)) {
      return word.slice(0, -1) + "ies";
    } else if (/(s|sh|ch|x|z)$/.test(word)) {
      return word + "es";
    } else {
      return word + "s";
    }
  }
  
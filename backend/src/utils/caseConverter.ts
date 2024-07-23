type AnyObject<T> = { [key: string]: T };

export const toCamelCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v)) as T;
  } else if (obj !== null && obj?.constructor === Object) {
    return Object.keys(obj).reduce((result: AnyObject<T>, key: string) => {
      const camelKey = key.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
      result[camelKey] = toCamelCase((obj as AnyObject<T>)[key]);
      return result;
    }, {}) as T;
  }
  return obj;
};

export const toSnakeCase = <T>(obj: T): T => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v)) as T;
  } else if (obj !== null && obj?.constructor === Object) {
    return Object.keys(obj).reduce((result: AnyObject<T>, key: string) => {
      const snakeKey = key.replace(/([A-Z])/g, (g) => `_${g.toLowerCase()}`);
      result[snakeKey] = toSnakeCase((obj as AnyObject<T>)[key]);
      return result;
    }, {}) as T;
  }
  return obj;
};
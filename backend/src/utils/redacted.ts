export default class Redacted<T = string> {
  constructor(private readonly _value: T) {}

  public static make<T>(value: T): Redacted<T> {
    return new Redacted<T>(value);
  }

  public static value<T>(redacted: Redacted<T>): T {
    return redacted._value;
  }

  public toString(): string {
    return '<redacted>';
  }

  public toJSON(): string {
    return '<redacted>';
  }

  [Symbol.for('node.util.inspect.custom')](): string {
    return '<redacted>';
  }

  public inspect(): string {
    return '<redacted>';
  }
}

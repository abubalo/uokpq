import kleur from 'kleur';

export class Logging {
  public static log = (args: unknown) => this.info(args);

  public static info = (args: unknown) =>
    console.log(
      kleur.blue(`[${new Date().toLocaleString()}][INFO]`),
      typeof args === 'string' ? kleur.blue().bold(args) : args
    );

  public static warn = (args: unknown) =>
    console.log(
      kleur.yellow(`[${new Date().toLocaleString()}][WARN]`),
      typeof args === 'string' ? kleur.yellow().bold(args) : args
    );

  public static error = (args: unknown) =>
    console.log(
      kleur.red(`[${new Date().toLocaleString()}][ERROR]`),
      typeof args === 'string' ? kleur.red().bold(args) : args
    );
}

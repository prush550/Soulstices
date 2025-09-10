declare module "bcryptjs" {
  export function hash(
    s: string | Buffer,
    salt: number
  ): Promise<string>;
  export function compare(
    s: string | Buffer,
    hash: string
  ): Promise<boolean>;
}

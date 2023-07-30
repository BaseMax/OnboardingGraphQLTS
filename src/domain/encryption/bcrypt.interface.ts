export interface ICompareSchema {
  raw: string;
  hash: string;
}

export interface IBcryptService {
  hash: (raw: string) => Promise<string>;
  compare: (rawAndHash: ICompareSchema) => Promise<boolean>;
}

import { BigNumber } from "bignumber.js";
export class Transaction {
  constructor(
    private hash: string,
    private nonce: number,
    private blockHash: string,
    private from: string,
    private to: string,
    private value: BigNumber,
    private gasPrice: BigNumber,
    private gas: number,
    private input: string
  ) {}
}

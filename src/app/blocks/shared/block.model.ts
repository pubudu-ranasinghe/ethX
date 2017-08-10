export class Block {
  height: number;
  timestamp: string;
  transactions: number;
  miner: string;
  hash: string;
  size: number;

  constructor(
  height: number,
  timestamp: string,
  transactions: number,
  miner: string,
  hash: string,
  size: number
  ) {
    this.height = height;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.miner = miner;
    this.hash = hash;
    this.size = size;
  }
}
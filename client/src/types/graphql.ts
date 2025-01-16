export interface Block {
    hash: string;
    confirmations: number;
    size: number;
    strippedSize: number;
    weight: number;
    height: number;
    version: number;
    versionHex: string;
    merkeRoot: string;
    time: number;
    medianTime: number;
    nonce: number;
    bits: string;
    difficulty: number;
    chainwork: string;
    nTx: number;
    previousBlockHash: string;
    nextBlockHash: string;
  }
  
  export interface LatestBlocksResponse {
    height: number;
    blocks: Block[];
  }
  
  export interface BalanceResponse {
    address: string;
    balance: number;
  }
  
  export interface Transaction {
    hex: string;
    txId: string;
    hash: string;
    size: number;
    vsize: number;
    weight: number;
    version: number;
    locktime: number;
    blockHash: string;
    confirmations: number;
    blockTime: number;
    time: number;
  }
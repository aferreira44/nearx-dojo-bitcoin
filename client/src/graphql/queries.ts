import { gql } from '@apollo/client';

export const GET_LATEST_BLOCKS = gql`
  query GetLatestBlocks($count: Int!) {
    getLatestBlocks(count: $count) {
      height
      blocks {
        hash
        height
        time
        nTx
        size
        weight
        previousBlockHash
        nextBlockHash
      }
    }
  }
`;

export const GET_BALANCE = gql`
  query GetBalance($address: String!) {
    getBalanceByAddress(address: $address) {
      address
      balance
    }
  }
`;

export const GET_TRANSACTION = gql`
  query GetTransaction($txId: String!) {
    getTransactionByTxId(txId: $txId) {
      txId
      hash
      size
      blockTime
      confirmations
      blockHash
    }
  }
`;
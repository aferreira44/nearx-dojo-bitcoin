package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.63

import (
	"context"
	"fmt"
	"server/graph/model"
	"server/internal/rpc"
)

// GetLatestBlocks is the resolver for the getLatestBlocks field.
func (r *queryResolver) GetLatestBlocks(ctx context.Context, count int32) (*model.LatestBlocksResponse, error) {
	client := rpc.NewRpcClient()

	var blockchainInfoResponse struct {
		Result struct {
			Blocks int32 `json:"blocks"`
		} `json:"result"`
		Error interface{} `json:"error"`
	}

	err := client.Call("getblockchaininfo", []interface{}{}, &blockchainInfoResponse)
	if err != nil {
		return nil, fmt.Errorf("RPC call failed: %v", err)
	}

	latestBlockHeight := blockchainInfoResponse.Result.Blocks

	var blocks []*model.Block

	for i := latestBlockHeight; i > latestBlockHeight-int32(count); i-- {
		block, err := r.GetBlockByHeight(ctx, i)
		if err != nil {
			return nil, fmt.Errorf("failed to get block by height: %v", err)
		}
		blocks = append(blocks, block)
	}

	return &model.LatestBlocksResponse{Height: latestBlockHeight, Blocks: blocks}, nil
}

// GetBalanceByAddress is the resolver for the getBalanceByAddress field.
func (r *queryResolver) GetBalanceByAddress(ctx context.Context, address string) (*model.BalanceResponse, error) {
	client := rpc.NewRpcClient()

	var response struct {
		Result []struct {
			Amount float64 `json:"amount"`
		} `json:"result"`
		Error interface{} `json:"error"`
	}

	err := client.Call("listunspent", []interface{}{0, 9999999, []string{address}}, &response)
	if err != nil {
		return nil, fmt.Errorf("RPC call failed: %v", err)
	}

	// Calculate total balance
	var totalBalance float64
	for _, utxo := range response.Result {
		totalBalance += utxo.Amount
	}

	// Convert to satoshis (1 BTC = 100,000,000 satoshis)
	balanceInSatoshis := int32(totalBalance * 100000000)

	return &model.BalanceResponse{
		Address: address,
		Balance: balanceInSatoshis,
	}, nil
}

// GetTransactionByTxID is the resolver for the getTransactionByTxId field.
func (r *queryResolver) GetTransactionByTxID(ctx context.Context, txID string) (*model.Transaction, error) {
	client := rpc.NewRpcClient()

	var response struct {
		Result struct {
			Hex           string `json:"hex"`
			TxID          string `json:"txId"`
			Hash          string `json:"hash"`
			Size          int32  `json:"size"`
			Vsize         int32  `json:"vsize"`
			Weight        int32  `json:"weight"`
			Version       int32  `json:"version"`
			Locktime      int32  `json:"locktime"`
			BlockHash     string `json:"blockHash"`
			Confirmations int32  `json:"confirmations"`
			BlockTime     int32  `json:"blockTime"`
			Time          int32  `json:"time"`
		} `json:"result"`
		Error interface{} `json:"error"`
	}

	err := client.Call("getrawtransaction", []interface{}{txID, 1}, &response)
	if err != nil {
		return nil, fmt.Errorf("RPC call failed: %v", err)
	}

	return (*model.Transaction)(&response.Result), nil
}

// GetBlockByHeight is the resolver for the getBlockByHeight field.
func (r *queryResolver) GetBlockByHeight(ctx context.Context, height int32) (*model.Block, error) {
	client := rpc.NewRpcClient()

	// First get the block hash for the given height
	var blockHashResponse struct {
		Result string      `json:"result"`
		Error  interface{} `json:"error"`
	}

	err := client.Call("getblockhash", []interface{}{height}, &blockHashResponse)
	if err != nil {
		return nil, fmt.Errorf("RPC call failed: %v", err)
	}

	fmt.Println("Block hash:", blockHashResponse.Result)

	var blockResponse struct {
		Result struct {
			Hash              string  `json:"hash"`
			Confirmations     int32   `json:"confirmations"`
			Size              int32   `json:"size"`
			StrippedSize      int32   `json:"strippedsize"`
			Weight            int32   `json:"weight"`
			Height            int32   `json:"height"`
			Version           int32   `json:"version"`
			VersionHex        string  `json:"versionHex"`
			MerkeRoot         string  `json:"merkeRoot"`
			Time              int32   `json:"time"`
			MedianTime        int32   `json:"mediantime"`
			Nonce             int32   `json:"nonce"`
			Bits              string  `json:"bits"`
			Difficulty        float64 `json:"difficulty"`
			Chainwork         string  `json:"chainwork"`
			NTx               int32   `json:"nTx"`
			PreviousBlockHash string  `json:"previousblockhash"`
			NextBlockHash     string  `json:"nextblockhash"`
		} `json:"result"`
		Error interface{} `json:"error"`
	}

	err = client.Call("getblock", []interface{}{blockHashResponse.Result, 1}, &blockResponse)
	if err != nil {
		return nil, fmt.Errorf("RPC call failed: %v", err)
	}

	return (*model.Block)(&blockResponse.Result), nil
}

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }

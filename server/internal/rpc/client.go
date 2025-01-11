package rpc

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
)

// Client represents a Bitcoin RPC client
type RpcClient struct {
	url      string
	username string
	password string
	client   *http.Client
}

// NewClient creates a new RPC client
func NewRpcClient() *RpcClient {
	nodeURL := os.Getenv("BITCOIN_NODE_URL")
	if nodeURL == "" {
		nodeURL = "http://localhost:18443" // fallback
	}

	return &RpcClient{
		url:      nodeURL,
		username: os.Getenv("BITCOIN_NODE_USER"),
		password: os.Getenv("BITCOIN_NODE_PASS"),
		client:   &http.Client{},
	}
}

// RPCRequest represents a JSON-RPC request
type RPCRequest struct {
	JSONRPC string        `json:"jsonrpc"`
	ID      string        `json:"id"`
	Method  string        `json:"method"`
	Params  []interface{} `json:"params"`
}

// Call makes a JSON-RPC call to the Bitcoin node
func (c *RpcClient) Call(method string, params []interface{}, response interface{}) error {
	// Create the request body
	requestBody := RPCRequest{
		JSONRPC: "1.0",
		ID:      "curltest",
		Method:  method,
		Params:  params,
	}

	jsonBody, err := json.Marshal(requestBody)
	if err != nil {
		return fmt.Errorf("error marshaling request: %v", err)
	}

	// Create the request
	req, err := http.NewRequest("POST", c.url, bytes.NewBuffer(jsonBody))
	if err != nil {
		return fmt.Errorf("error creating request: %v", err)
	}

	// Set headers
	req.SetBasicAuth(c.username, c.password)
	req.Header.Set("Content-Type", "application/json")

	// Make the request
	resp, err := c.client.Do(req)
	if err != nil {
		return fmt.Errorf("error making request: %v", err)
	}
	defer resp.Body.Close()

	// Decode the response
	if err := json.NewDecoder(resp.Body).Decode(response); err != nil {
		return fmt.Errorf("error decoding response: %v", err)
	}

	return nil
}

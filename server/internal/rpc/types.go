package rpc

type RPCError struct {
	Code    float64 `json:"code"`
	Message string  `json:"message"`
}

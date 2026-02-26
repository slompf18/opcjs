// Message types of OPC UA Connection Protocol
// https://reference.opcfoundation.org/Core/Part6/v105/docs/7.1
export const MsgTypeReverseHello = 'R'.charCodeAt(0) | 'H'.charCodeAt(0)<<8 | 'E'.charCodeAt(0)<<16 | 'F'.charCodeAt(0)<<24;
export const MsgTypeHello        = 'H'.charCodeAt(0) | 'E'.charCodeAt(0)<<8 | 'L'.charCodeAt(0)<<16 | 'F'.charCodeAt(0)<<24;
export const MsgTypeAck          = 'A'.charCodeAt(0) | 'C'.charCodeAt(0)<<8 | 'K'.charCodeAt(0)<<16 | 'F'.charCodeAt(0)<<24;
export const MsgTypeError        = 'E'.charCodeAt(0) | 'R'.charCodeAt(0)<<8 | 'R'.charCodeAt(0)<<16 | 'F'.charCodeAt(0)<<24;
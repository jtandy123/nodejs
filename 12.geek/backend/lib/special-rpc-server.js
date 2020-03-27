const RPC = require('./rpc-server');

module.exports = function(protobufRequestSchema, protobufResponseSchema) {
  return new RPC({
    // 解码请求包
    decodeRequest(buffer) {
      const seq = buffer.readUInt32BE();

      return {
        seq,
        result: protobufRequestSchema.decode(buffer.slice(8))
      }
    },
    // 判断请求包是否接收完成
    isCompleteRequest(buffer) {
      if (buffer.length < 8) {
        return 0;
      }
      const bodyLength = buffer.readUInt32BE(4);
      return 8 + bodyLength;
    },
    // 编码返回包
    encodeResponse(data, seq) {
      const body = protobufResponseSchema.encode(data);

      const head = Buffer.alloc(8);
      head.writeUInt32BE(seq);
      head.writeUInt32BE(body.length, 4);

      return Buffer.concat([head, body]);
    }
  });
}
const net = require('net');
const LESSON_IDS = [
  136797,
  136798,
  136799,
  136800,
  136801,
  136803,
  136804,
  136806,
  136807,
  136808,
  136809,
  141994,
  143517,
  143557,
  143564,
  143644,
  146470,
  146569,
  146582
];

const socket = new net.Socket({});

socket.connect({
  host: '127.0.0.1',
  port: 4000
});

let id = Math.floor(Math.random() * LESSON_IDS.length);

let oldBuffer = null;
socket.on('data', (buffer) => {
  if (oldBuffer) {
    buffer = Buffer.concat([oldBuffer, buffer]);
  }
  let completeLength = 0;

  while(completeLength = checkComplete(buffer)) {
    const pkg = buffer.slice(0, completeLength);
    buffer = buffer.slice(completeLength);

    const result = decode(pkg);
    console.log(`包${result.seq}，返回值是${result.data}`);
  }

  oldBuffer = buffer;
});

let seq = 0;

/**
 * 二进制包编码
 * 在一段rpc调用里，客户端需要经常编码rpc调用时，业务数据的请求包
 */
function encode(data) {
  // 正常情况下，应该使用protobuf来encode一段代表业务数据的数据包
  const body = Buffer.alloc(4);
  body.writeInt32BE(LESSON_IDS[data.id]);

  // 一般来说，一个rpc调用的数据包会分为定长的包头和不定长的包体两部分
  // 包头的作用就是用来记载包的序号和包的长度，以实现全双工通信
  const header = Buffer.alloc(6);
  header.writeInt16BE(seq);
  header.writeInt32BE(body.length, 2);

  const buffer = Buffer.concat([header, body]);

  console.log(`${seq}的id为${LESSON_IDS[data.id]}`);
  seq++;
  return buffer;
}

/**
 * 二进制包解码函数
 * 在一段rpc调用里，客户端需要经常解码rpc调用时，业务数据的返回包
 */
function decode(buffer) {
  const header = buffer.slice(0, 6);
  const seq = header.readInt16BE();

  const body = buffer.slice(6);

  return {
    seq,
    data: body.toString()
  }
}

/**
 * 检查一段buffer是不是一个完整的数据包
 * 判断header的bodyLength字段，看看这段buffer是不是长于header和body的总长
 * @param {} buffer 
 */
function checkComplete(buffer) {
  if (buffer.length < 6) {
    return 0;
  }

  const bodyLength = buffer.readInt32BE(2);
  return 6 + bodyLength;
}

for(let k = 0; k < 100; k++) {
  id = Math.floor(Math.random() * LESSON_IDS.length);
  socket.write(encode({id}));
}

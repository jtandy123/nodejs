const fs = require('fs');
const protobuf = require('protocol-buffers');
const schemas = protobuf(
  fs.readFileSync(`${__dirname}/../detail/detail.proto`)
);

const columnData = require('./mockdata/column');

const server = require('./lib/special-rpc-server')(schemas.ColumnRequest, schemas.ColumnResponse);

server.createServer((request, response) => {
  // 用columnid去数据库获取数据
  const columnid = request.body;

  response.end({
    column: columnData[0],
    recommendColumns: [columnData[1], columnData[2]]
  });
})
.listen(4000, () => {
  console.log('rpc server listened: 4000')
});
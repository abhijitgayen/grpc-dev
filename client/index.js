const GrpcClient = require("./grpc_client");

// Usage
const PROTO_PATH = "./protobuf/service.proto";
const ADDRESS = "0.0.0.0:50051";
const METHOD_NAME = "SayHello";
const REQUEST_DATA = { name: "Abhijit" };

const grpcClient = new GrpcClient(PROTO_PATH, ADDRESS);
grpcClient.loadProto();
grpcClient.createClient();
grpcClient.callMethod(METHOD_NAME, REQUEST_DATA, (error, response) => {
  if (!error) {
    console.log("Greeting:", response.message);
  } else {
    console.error(error);
  }
});

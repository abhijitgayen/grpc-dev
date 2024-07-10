const GrpcServer = require("./grpc_server");

// Usage
const PROTO_PATH = "./protobuf/service.proto";
const ADDRESS = "0.0.0.0:50051";

// Define a generic handler that can handle multiple RPC methods
const methodHandlers = {
  SayHello: (call, callback) => {
    const response = { message: "Hello " + call.request.name };
    callback(null, response);
  },
};

const grpcServer = new GrpcServer(PROTO_PATH, ADDRESS);
grpcServer.loadProto();
grpcServer.addServiceHandlers(methodHandlers);
grpcServer.start();

// Optional: Stop the server after a certain time for demonstration
// setTimeout(() => {
//   grpcServer.stop();
// }, 60000); // Stop the server after 1 minute

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

class GrpcServer {
  constructor(protoPath, address) {
    this.protoPath = protoPath;
    this.address = address;
    this.server = new grpc.Server();
    this.myProto = null;
  }

  loadProto() {
    const packageDefinition = protoLoader.loadSync(this.protoPath, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });
    this.myProto = grpc.loadPackageDefinition(packageDefinition);

    if (!this.myProto || !this.myProto.MyService) {
      throw new Error("Failed to load proto file");
    }
  }

  addServiceHandlers(handlers) {
    this.server.addService(this.myProto.MyService.service, handlers);
  }

  start() {
    this.server.bindAsync(
      this.address,
      grpc.ServerCredentials.createInsecure(),
      (error, port) => {
        if (error) {
          console.error("Server error:", error);
          return;
        }
        this.server.start();
        console.log(`Server running at http://${this.address}`);
      },
    );
  }

  // Define a method to stop the server
  stop() {
    this.server.forceShutdown();
    console.log("Server stopped");
  }
}

module.exports = GrpcServer;

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

class GrpcClient {
  constructor(protoPath, address) {
    this.protoPath = protoPath;
    this.address = address;
    this.myProto = null;
    this.client = null;
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

  createClient() {
    this.client = new this.myProto.MyService(
      this.address,
      grpc.credentials.createInsecure(),
    );
  }

  callMethod(methodName, requestData, callback) {
    if (!this.client[methodName]) {
      throw new Error(`Method ${methodName} not found on the client`);
    }
    this.client[methodName](requestData, callback);
  }
}

module.exports = GrpcClient;

import { getHttpOperationsFromResource } from "@stoplight/prism-http";
import { createServer } from "@stoplight/prism-http-server";
import { tryCatch } from "fp-ts/lib/TaskEither";

class MyCustomLogger {
  static WriteInfoLog(m: any): void {
    console.log(m);
  }
  static WriteErrorLog(m: any): void {
    console.log(m);
  }
  static StartTraceLog(m: string): void {
    console.log(m);
  }
  static StopTraceLog(m: string): void {
    console.log(m);
  }
  static logConnectorCall(m: string): void {
    console.log(m);
  }
  static logSPCall(m: string): void {
    console.log(m);
  }
}

async function createMockServer() {
  const operations = await getHttpOperationsFromResource("../petstore.yaml");
  return createServer(operations, {
    components: { logger: MyCustomLogger },
    config: {
      checkSecurity: true,
      validateRequest: true,
      validateResponse: true,
      errors: false,
      mock: { dynamic: false }
    },
    cors: true
  });
}

tryCatch(createMockServer, () => new Error("server failed to start"))
  .fold(
    (e: Error) => console.error(e),
    () => console.log("server started")
  )
  .run();

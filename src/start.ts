import Application from "./usecases/application";
import container from "./container";

const app = new Application(container.cradle);

app.shutdown = () => {
    // clean up your resources and exit
    process.exit(1);
  };
app.start().catch((error) => {
    console.log({ appStartError: error });
    container.cradle.logger.error(error);
    app.shutdown();
  });
  
process.on("SIGINT", function onSigint(error) {
    console.log({ terminationSignal: error });
    app.shutdown();
  });
  
process.on("SIGTERM", function onSigterm(error) {
    console.log({ terminationSignal: error });
    app.shutdown();
  });

process.on("unhandledRejection", (error) => {
    console.log(
      "\n\n--------Unhandled promise rejection error - Please handle all rejection--------\n\n"
    );
    container.cradle.logger.error(error);
    throw error;
  });
  
import { Container } from "typedi";
import LoggerInstance from "./logger";

// Inject dependencies to services. For now only need logger
// Will add any needed dependency in the services
export default () => {
  try {
    // models.forEach(m => {
    //   Container.set(m.name, m.model);
    // });

    Container.set("logger", LoggerInstance);
    LoggerInstance.info("Logger set in container");
  } catch (e) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};

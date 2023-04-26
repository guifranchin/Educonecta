import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { routes } from "./routes";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server listening on portt ${PORT}`);
});

export default app;

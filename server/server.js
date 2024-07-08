import express from "express";
import bodyParser from "body-parser";
import xss from "xss";
import { extractIOC } from "ioc-extractor";

const app = express();

app.use(bodyParser.json({ limit: "100kb", extended: true }));

const PORT = 8443;

app.post("/parse", (request, response) => {
  const reqBody = xss(request.body.iocs);
  const iocs = extractIOC(reqBody);
  let filteredIOCs = {};

  Object.keys(iocs).forEach((key) => {
    if (iocs[key].length > 0) {
      filteredIOCs[key] = iocs[key];
    }
  });

  response.json(filteredIOCs);
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

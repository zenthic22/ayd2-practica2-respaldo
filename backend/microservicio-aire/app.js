const express = require("express");
const cors = require("cors");
const aireRoutes = require("./routes/aireRoutes");

const app = express();
app.use(cors());
const PORT = 3002;

app.use("/micro-aire", aireRoutes);

app.listen(PORT, () => {
  console.log(`Microservicio de calidad de aire corriendo en puerto ${PORT}`);
});


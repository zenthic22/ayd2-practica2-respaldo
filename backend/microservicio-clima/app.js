const express = require("express");
const cors = require("cors")
const climaRoutes = require("./routes/climaRoutes");

const app = express();
app.use(cors({ origin: "*" }));
app.use(cors())
const PORT = 3001;

app.use("/micro-clima", climaRoutes);

app.listen(PORT, () => {
    console.log(`Microservicio de clima corriendo en puerto ${PORT}`);
});
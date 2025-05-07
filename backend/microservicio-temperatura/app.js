const express = require("express");
const cors = require("cors")
const climaRoutes = require("./routes/temperaturaRoutes");

const app = express();
app.use(cors({ origin: "*" }));
app.use(cors())
const PORT = 3000;

app.use("/micro-temperattura", climaRoutes);

app.listen(PORT, () => {
    console.log(`Microservicio de temperatura corriendo en puerto ${PORT}`);
});
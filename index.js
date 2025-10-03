const express = require("express");
const path = require("path");

const usersRouter = require("./server/routes/users.router");
const productsRouter = require("./server/routes/products.router");
const ordersRouter = require("./server/routes/orders.router");
const postsRouter = require("./server/routes/posts.router");
const screen1EventsRouter = require("./server/routes/screen1Events.router");

const PORT = 5050;

const app = express();

// Middlewares
app.use(express.json());

// Servir archivos estáticos de la app directamente en la raíz
app.use("/", express.static(path.join(__dirname, "app")));

// Routes para la API REST
app.use("/", usersRouter);
app.use("/", productsRouter);
app.use("/", ordersRouter);
app.use("/", postsRouter);
app.use("/", screen1EventsRouter);

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);

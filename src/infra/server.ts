import fastify from "fastify";
import userRoutes from "./routes/routes";

const app = fastify();

app.register(userRoutes);

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running!");
});

import connection from "./DB/connection.js";
import authRoutes from "./modules/auth/auth.controller.js";

const bootstrap = (app, express) => {
  app.use(express.json());
  app.get("/", (req, res) =>
    res.status(200).json({ message: "Welcome to our app" })
  );

  app.use("/auth", authRoutes);

  connection;

  app.all("*", (req, res) => {
    return res.status(404).json({ message: "API Not Found" });
  });
};

export default bootstrap;

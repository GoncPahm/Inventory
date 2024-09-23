import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dashboardRoutes from "./routes/dashboard.route";
import productRoutes from "./routes/product.route";
import userRoutes from "./routes/user.route";
import expenseRoutes from "./routes/expense.route";
dotenv.config();
const port = process.env.PORT || 3001;

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(helmet());
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin",
    })
);
app.use(morgan("common"));

//

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

app.listen(port, () => {
    console.log("Server is running on port", port);
});

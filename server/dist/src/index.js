"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dashboard_route_1 = __importDefault(require("./routes/dashboard.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const expense_route_1 = __importDefault(require("./routes/expense.route"));
dotenv_1.default.config();
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({
    policy: "cross-origin",
}));
app.use((0, morgan_1.default)("common"));
//
app.use("/api/dashboard", dashboard_route_1.default);
app.use("/api/products", product_route_1.default);
app.use("/api/users", user_route_1.default);
app.use("/api/expenses", expense_route_1.default);
app.listen(port, () => {
    console.log("Server is running on port", port);
});

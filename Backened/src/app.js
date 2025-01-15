import express, { urlencoded } from "express";
import cors from "cors";
const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

import MealRouter from "./routes/Meal.routes.js";
import ContactRouter from "./routes/Contact.routes.js";
import TableReservationRouter from "./routes/TableReservation.routes.js";
import AdminRouter from "./routes/Admin.routes.js";
import CheckoutRouter from "./routes/Checkout.routes.js";
import EmailRouter from "./routes/Email.routes.js";

app.use("/api/v1/", MealRouter);
app.use("/api/v1/", ContactRouter);
app.use("/api/v1/", TableReservationRouter);
app.use("/api/v1/", AdminRouter);
app.use("/api/v1/", CheckoutRouter);
app.use("/api/v1/", EmailRouter);

export { app };

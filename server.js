const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static front-end files

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/orders", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define Mongoose Schema and Model
const orderSchema = new mongoose.Schema({
    cart: { type: Array, required: true },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// Handle Order Submission
app.post("/order", async (req, res) => {
    try {
        const { cart, total } = req.body;

        // Validate input
        if (!cart || !Array.isArray(cart) || cart.length === 0) {
            return res.status(400).send("Cart cannot be empty.");
        }
        if (typeof total !== "number" || total <= 0) {
            return res.status(400).send("Invalid total amount.");
        }

        // Save order to database
        const newOrder = new Order({ cart, total });
        await newOrder.save();

        console.log("New Order Saved:", { cart, total });
        res.status(200).send("Order saved to the database!");
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).send("Internal server error.");
    }
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


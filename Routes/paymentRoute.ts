import express from "express";
import Payment from "../models/payment";

const router = express.Router();


router.get("/payment", async (req, res) => {
    try {
        const paymentList = await Payment.find();
        res.json(paymentList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/payment/:id", async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/payment", async (req, res) => {
    try {
        const newPayment = await Payment.create(req.body);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/payment/:id", async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
        if (!deletedPayment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/payment/:id", async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedPayment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.json(updatedPayment);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
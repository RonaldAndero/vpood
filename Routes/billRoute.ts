import express from "express";
import Bill from "../models/bill";
import mongoose from "mongoose";
const router = express.Router();


router.get("/bill", async (req, res) => {
    try {
        const billRow = await Bill.find();
        res.json(billRow);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/bill/:id", async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (!bill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        res.json(bill);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/bill", async (req, res) => {
    try {
        const newBill = await Bill.create(req.body);
        res.status(201).json(newBill);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/bill/:id", async (req, res) => {
    try {
        const deletedBill = await Bill.findByIdAndDelete(req.params.id);
        if (!deletedBill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/bill/unpaid", async (req, res) => {
    try {
        const unpaidInvoices = await Bill.find({ total: { $gt: 0 } });
        res.json(unpaidInvoices);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/bill/unpaid/expired", async (req, res) => {
    try {
        const currentDate = new Date();
        const overdueInvoices = await Bill.find({
            total: { $gt: 0 },
            date: { $lt: currentDate },
        });
        res.json(overdueInvoices);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/bill/unpaid/client/:id", async (req, res) => {
    try {
        const unpaidInvoices = await Bill.find({
            client_fk: req.params.id,
            total: { $gt: 0 },
        });
        res.json(unpaidInvoices);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/bill/unpaid/expired/client/:id", async (req, res) => {
    try {
        const currentDate = new Date();
        const overdueInvoices = await Bill.find({
            client_fk: req.params.id,
            total: { $gt: 0 },
            date: { $lt: currentDate },
        });
        res.json(overdueInvoices);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/bill/client/:id", async (req, res) => {
    try {
        const clientInvoices = await Bill.find({ client_fk: req.params.id });
        res.json(clientInvoices);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/bill/total/client/:id", async (req, res) => {
    try {
        const totalInvoiceSum = await Bill.aggregate([
            {
                $match: { client_fk: new mongoose.Types.ObjectId(req.params.id) },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$total" },
                },
            },
        ]);
        res.json(totalInvoiceSum);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});



router.put("/bill/:id", async (req, res) => {
    try {
        const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedBill) {
            return res.status(404).json({ error: "Bill not found" });
        }
        res.json(updatedBill);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
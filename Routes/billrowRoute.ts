import express from "express";
import Billrow from "../models/billrow";

const router = express.Router();


router.get("/billrow", async (req, res) => {
    try {
        const billrowList = await Billrow.find();
        res.json(billrowList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/billrow/:id", async (req, res) => {
    try {
        const billrow = await Billrow.findById(req.params.id);
        if (!billrow) {
            return res.status(404).json({ error: "Billrow not found" });
        }
        res.json(billrow);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/billrow", async (req, res) => {
    try {
        const newBillrow = await Billrow.create(req.body);
        res.status(201).json(newBillrow);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/billrow/:id", async (req, res) => {
    try {
        const deletedBillrow = await Billrow.findByIdAndDelete(req.params.id);
        if (!deletedBillrow) {
            return res.status(404).json({ error: "Billrow not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/billrow/:id", async (req, res) => {
    try {
        const updatedBillrow = await Billrow.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedBillrow) {
            return res.status(404).json({ error: "Billrow not found" });
        }
        res.json(updatedBillrow);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
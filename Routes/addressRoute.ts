import express from "express";
import Address from "../models/address";

const router = express.Router();


router.get("/address", async (req, res) => {
    try {
        const addressList = await Address.find();
        res.json(addressList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/address/:id", async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);
        if (!address) {
            return res.status(404).json({ error: "Address not found" });
        }
        res.json(address);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/address", async (req, res) => {
    try {
        const newAddress = await Address.create(req.body);
        res.status(201).json(newAddress);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/address/:id", async (req, res) => {
    try {
        const deletedAddress = await Address.findByIdAndDelete(req.params.id);
        if (!deletedAddress) {
            return res.status(404).json({ error: "Address not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/address/:id", async (req, res) => {
    try {
        const updatedAddress = await Address.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedAddress) {
            return res.status(404).json({ error: "Address not found" });
        }
        res.json(updatedAddress);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
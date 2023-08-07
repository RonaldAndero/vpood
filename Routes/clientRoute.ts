import express from "express";
import Client from "../models/client";

const router = express.Router();


router.get("/client", async (req, res) => {
    try {
        const clientList = await Client.find();
        res.json(clientList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/client/:id", async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/client", async (req, res) => {
    try {
        const newClient = await Client.create(req.body);
        res.status(201).json(newClient);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/client/:id", async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);
        if (!deletedClient) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/client/:id", async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedClient) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.json(updatedClient);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
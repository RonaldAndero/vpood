
import express from "express";
import Contacts from "../models/contacts";

const router = express.Router();


router.get("/contacts", async (req, res) => {
    try {
        const ContactsList = await Contacts.find();
        res.json(ContactsList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/contacts/:id", async (req, res) => {
    try {
        const contacts = await Contacts.findById(req.params.id);
        if (!contacts) {
            return res.status(404).json({ error: "Contacts not found" });
        }
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/contacts", async (req, res) => {
    try {
        const newContacts = await Contacts.create(req.body);
        res.status(201).json(newContacts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/contacts/:id", async (req, res) => {
    try {
        const deletedContacts = await Contacts.findByIdAndDelete(req.params.id);
        if (!deletedContacts) {
            return res.status(404).json({ error: "Contacts not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/contacts/:id", async (req, res) => {
    try {
        const updatedContacts = await Contacts.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedContacts) {
            return res.status(404).json({ error: "Contacts not found" });
        }
        res.json(updatedContacts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
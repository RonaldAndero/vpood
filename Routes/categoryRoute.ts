
import express from "express";
import Category from "../models/category";

const router = express.Router();


router.get("/category", async (req, res) => {
    try {
        const categoryList = await Category.find();
        res.json(categoryList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/category/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/category", async (req, res) => {
    try {
        const newCategory = await Category.create(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/category/:id", async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/category/:id", async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
import express from "express";
import Product from "../models/product";

const router = express.Router();


router.get("/product", async (req, res) => {
    try {
        const productList = await Product.find();
        res.json(productList);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/product/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/product", async (req, res) => {
    try {
        const { expire_date, Price } = req.body;


        if (expire_date < Date.now()) {
            return res.status(400).json({ error: "Expiry date cant be in the past" });
        }


        if (Price <= 0) {
            return res.status(400).json({ error: "Price cant be negative or 0" });
        }

        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/product/expired", async (req, res) => {
    try {
        const currentDate = new Date();
        const expiredProducts = await Product.find({ expire_date: { $lt: currentDate } });
        res.json(expiredProducts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/product/payment", async (req, res) => {
    try {
        const totalProductCost = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: "$Price" },
                },
            },
        ]);
        res.json(totalProductCost);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/product/payment/expired", async (req, res) => {
    try {
        const currentDate = new Date();
        const totalExpiredProductCost = await Product.aggregate([
            {
                $match: { expire_date: { $lt: currentDate } },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$Price" },
                },
            },
        ]);
        res.json(totalExpiredProductCost);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/product/inactive", async (req, res) => {
    try {
        const inactiveProducts = await Product.find({ active: false });
        res.json(inactiveProducts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/product/active", async (req, res) => {
    try {
        const activeProducts = await Product.find({ active: true });
        res.json(activeProducts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/product", async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.delete("/product/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.put("/product/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
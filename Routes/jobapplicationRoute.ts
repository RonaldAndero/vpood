import { Request, Response, Router } from "express";
import JobApplication from "../models/JobApplication";
const router = Router();

// Endpoint for accepting job applications
router.post("/admin1/", async (req: Request, res: Response) => {
    try {
        const { page, per_page, total, total_pages, data } = req.body;

        const jobApplication = new JobApplication({
            page,
            per_page,
            total,
            total_pages,
            data: [
                {
                    id: data.id,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    avatar: data.avatar,
                },
            ],
        });

        const savedJobApplication = await jobApplication.save();

        res.status(201).json({ message: "Job application received successfully", savedJobApplication });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({ error: "Internal server error" });
    }
});



export default router;
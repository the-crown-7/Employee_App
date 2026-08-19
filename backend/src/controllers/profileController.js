import db from "../config/db.js";

export const getProfile = async (req, res) => {
    try {
        const employeeId = req.user.employee_id;

        const [rows] = await db.query(
            "SELECT name, email, employee_id FROM employees WHERE employee_id = ?",
            [employeeId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.json({
            success: true,
            profile: rows[0]
        });

    } catch (error) {
        console.log("DB ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
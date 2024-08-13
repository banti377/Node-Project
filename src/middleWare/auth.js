import jwt from "jsonwebtoken";
import { config } from "../config";
import { modals } from "../model";

export const auth = async (req, res, next) => {
    try {
        const token = req.headers["x-token"];
        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const decoded = jwt.verify(token, config.secret_key);
        const user = await modals.User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid token." });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid or expired token." });
    }
};

export const adminAuth = (req, res, next) => {
    if (req.user && req.user.userType === "admin") {
        next();
    } else {
        return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }
};

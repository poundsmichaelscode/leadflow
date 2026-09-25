import { checkDatabaseHealth } from "../services/health.service.js";
export async function healthCheck(_req, res, next) {
    try {
        await checkDatabaseHealth();
        res.status(200).json({
            status: "ok",
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=health.controller.js.map
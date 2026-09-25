import { createLead, getAllLeads, } from "../services/lead.service.js";
import { sendSuccess } from "../utils/api-response.js";
export async function listLeads(_req, res, next) {
    try {
        const leads = await getAllLeads();
        sendSuccess(res, 200, leads);
    }
    catch (error) {
        next(error);
    }
}
export async function addLead(req, res, next) {
    try {
        const lead = await createLead(req.body);
        sendSuccess(res, 201, lead, "Lead created successfully");
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=lead.controller.js.map
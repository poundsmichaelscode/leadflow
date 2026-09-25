export function sendSuccess(res, statusCode, data, message) {
    return res.status(statusCode).json({
        success: true,
        ...(message ? { message } : {}),
        data,
    });
}
//# sourceMappingURL=api-response.js.map
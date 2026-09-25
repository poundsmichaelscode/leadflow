export function validate(schema) {
    return (req, _res, next) => {
        const result = schema.safeParse({
            body: req.body,
            params: req.params,
            query: req.query,
        });
        if (!result.success) {
            next(result.error);
            return;
        }
        if (result.data &&
            typeof result.data === "object" &&
            "body" in result.data) {
            req.body = result.data.body;
        }
        next();
    };
}
//# sourceMappingURL=validate.middleware.js.map
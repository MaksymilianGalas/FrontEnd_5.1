export const transformMiddleware = (req, res, next) => {
    if (req.body) {
        for (const key in req.body) {
            if (typeof req.body[key] === "string") {
                req.body[key] = req.body[key].toLowerCase();
            }
        }
    }

    const originalSend = res.json.bind(res);
    res.json = (data) => {
        const transformedData = Array.isArray(data)
            ? data.map((item) => ({ ...item, timestamp: new Date().toISOString() }))
            : { ...data, timestamp: new Date().toISOString() };
        originalSend(transformedData);
    };
    next();
};

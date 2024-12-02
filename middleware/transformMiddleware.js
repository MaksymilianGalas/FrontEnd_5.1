export const transformMiddleware = (req, res, next) => {
    if (req.body) {
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
                req.body[key] = req.body[key].toLowerCase();
            }
        }
    }

    const originalSend = res.json;
    res.json = (data) => {
        if (Array.isArray(data)) {
            data = data.map((item) => ({ ...item, timestamp: new Date().toISOString() }));
        } else if (typeof data === 'object') {
            data = { ...data, timestamp: new Date().toISOString() };
        }
        originalSend.call(res, data);
    };

    next();
};

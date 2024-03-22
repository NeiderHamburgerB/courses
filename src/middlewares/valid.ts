const validateData = (schema:any) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    } catch (error) {
        return res.status(400).json({ error: error.errors });
    }
};

export { validateData };
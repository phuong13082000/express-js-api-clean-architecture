const validateRequest = (schema) => {
    return (req, res, next) => {
        const {error, value} = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details.map((d) => d.message),
            });
        }

        req.body = value;
        next();
    }
}

export default validateRequest;

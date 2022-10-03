import rentalSchema from "../schemas/rentalSchema.js";
import dayjs from 'dayjs';

async function rentalMiddleware(req, res, next) {

    const validation = rentalSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(value => value.message)
        return res.status(400).send(errors)
    }
    next();
}

export { rentalMiddleware };
import joi from 'joi';
import dayjs from 'dayjs';

const costumerSchema = joi.object({
    name: joi.string().min(3).required(),
    phone: joi.string().required().min(10).max(11),
    cpf: joi.string().length(11).required(),
    birthday: joi.date().required()
})

export default costumerSchema 
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const singUp = async (body) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    let payload = {
        name: body.name,
        lastname: body.lastname,
        email: body.email,
        password: hashedPassword,
        birthdate: body.birthdate
    }
    
    let data = await User.create(payload);
    return data;

}

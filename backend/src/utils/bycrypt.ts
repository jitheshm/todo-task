import bcrypt from 'bcryptjs'

const salt = 10
export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
}

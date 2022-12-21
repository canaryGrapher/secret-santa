import { createCipheriv, createDecipheriv } from 'crypto'

const encryptFile = (data: string, password: string, IV: string): string => {
    const cipher = createCipheriv('aes-256-cbc', Buffer.from(password), IV);
    let initial_encrypted = cipher.update(data);
    let encrypted = Buffer.concat([initial_encrypted, cipher.final()]);
    return encrypted.toString('hex')
}

const decryptFile = (text: string, password: string, iv: string): string => {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = createDecipheriv('aes-256-cbc', Buffer.from(password), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

export { encryptFile, decryptFile }
import { Buffer } from 'buffer';

 class PasswordEncrypter {
    static encrypt(password: string): string {
        let encodedValue = '';
        try {
            encodedValue = Buffer.from(password, 'utf-8').toString('base64');
        } catch (e) {
            console.log('Password was not Encrypted.');
        }
        return encodedValue;
    }

    static decrypt(encryptedPassword: string): string {
        let decodedString = '';
        try {
            decodedString = Buffer.from(encryptedPassword, 'base64').toString('utf-8');
        } catch (e) {
            console.log('Password was not Decrypted.');
        }
        return decodedString;
    }
}
export { PasswordEncrypter };

// Example usage
const password = 'bgPB3Aw3SomeGvtF@lk!';
const encryptedPassword = PasswordEncrypter.encrypt(password);
console.log('Encrypted Password: ' + encryptedPassword);
const decryptedPassword = PasswordEncrypter.decrypt(encryptedPassword);
console.log('Decrypted Password: ' + decryptedPassword);

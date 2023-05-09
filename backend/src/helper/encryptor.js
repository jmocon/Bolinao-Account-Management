import crypto from 'crypto';
const algorithm = 'aes-256-cbc';
const key = Buffer.from(
  '41403d3dd29ae746aeaed2cab04f95369678e6eeee0dc0b5fc208a9f2b5c4466',
  'hex'
);
const iv = Buffer.from('668bc9be9ef35cc81bceaa04044cecf9', 'hex');

export const encrypt = (text = '') => {
  if (!text) {
    return '';
  }
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString('hex');
};

export const decrypt = (text) => {
  if (!text) {
    return '';
  }
  const encryptedText = Buffer.from(text.encryptedData, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

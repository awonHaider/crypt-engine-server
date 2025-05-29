const oneTimePadEncrypt = (plainText, key) => {
  if (plainText.length !== key.length) {
    throw new Error("Key must be the same length as the plaintext.");
  }

  const toCharCode = (char) => char.toUpperCase().charCodeAt(0) - 65; // A=0
  const toChar = (code) => String.fromCharCode((code % 26) + 65);     // 0=A

  let cipherText = '';

  for (let i = 0; i < plainText.length; i++) {
    const pChar = toCharCode(plainText[i]);
    const kChar = toCharCode(key[i]);

    if (pChar < 0 || pChar > 25 || kChar < 0 || kChar > 25) {
      throw new Error("Only alphabetic characters are allowed.");
    }

    const sum = (pChar + kChar) % 26;
    cipherText += toChar(sum);
  }

  return cipherText;
};

export { oneTimePadEncrypt }; 
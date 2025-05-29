const monoalphabeticEncrypt = (plainText, key) => {
  if (key.length !== 26 || !/^[A-Z]+$/i.test(key)) {
    throw new Error("Key must be a 26-letter alphabet string.");
  }

  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const lowerKey = key.toLowerCase();
  
  return plainText.split('').map(char => {
    const isUpper = char === char.toUpperCase();
    const lowerChar = char.toLowerCase();

    if (alphabet.includes(lowerChar)) {
      const index = alphabet.indexOf(lowerChar);
      const substitute = lowerKey[index];
      return isUpper ? substitute.toUpperCase() : substitute;
    }
    return char;
  }).join('');
};

export { monoalphabeticEncrypt }; 
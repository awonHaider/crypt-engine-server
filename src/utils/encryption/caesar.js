const caesarEncrypt = (plainText, key) => {
  return plainText.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const base = char === char.toUpperCase() ? 65 : 97;
      return String.fromCharCode(((char.charCodeAt(0) - base + key) % 26) + base);
    }
    return char; // return non-alphabet characters as-is
  }).join('');
};

export { caesarEncrypt }; 
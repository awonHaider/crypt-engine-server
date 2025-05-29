const transpositionEncrypt = (plainText, key) => {
  plainText = plainText.replace(/[^a-zA-Z]/g, '').toUpperCase();
  let n = key.length;
  let keyArray = key.split('').map(Number);
  let keySet = new Set(keyArray);
  if (keySet.size !== n || !Array.from(keySet).every(d => d >= 1 && d <= n)) {
      throw new Error("Invalid key: must be a permutation of digits from 1 to n.");
  }
  let m = plainText.length;
  let r = Math.ceil(m / n);
  while (plainText.length < r * n) {
      plainText += 'X';
  }
  let matrix = [];
  for (let i = 0; i < r; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
          let index = i * n + j;
          matrix[i][j] = plainText[index];
      }
  }
  let order = Array.from({length: n}, (_, i) => i).sort((a, b) => keyArray[a] - keyArray[b]);
  let ciphertext = '';
  for (let col of order) {
      for (let row = 0; row < r; row++) {
          ciphertext += matrix[row][col];
      }
  }
  return ciphertext;
};

export { transpositionEncrypt }; 
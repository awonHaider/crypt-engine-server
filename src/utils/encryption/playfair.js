const buildPlayfairMatrix = (key) => {
  key = key.toLowerCase().replace(/j/g, 'i'); // Replace J with I
  let matrixSet = new Set();
  let matrix = [];

  // Add key characters
  for (let char of key) {
    if (/[a-z]/.test(char) && !matrixSet.has(char)) {
      matrixSet.add(char);
    }
  }

  // Add remaining letters
  for (let char of 'abcdefghijklmnopqrstuvwxyz') {
    if (char !== 'j' && !matrixSet.has(char)) {
      matrixSet.add(char);
    }
  }

  // Convert to 5x5 matrix
  return Array.from(matrixSet).reduce((rows, char, index) => {
    if (index % 5 === 0) rows.push([]);
    rows[rows.length - 1].push(char);
    return rows;
  }, []);
};

const findPosition = (matrix, char) => {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (matrix[row][col] === char) return { row, col };
    }
  }
  return null;
};

const playfairEncrypt = (plainText, key) => {
  let matrix = buildPlayfairMatrix(key);
  plainText = plainText.toLowerCase().replace(/j/g, 'i').replace(/[^a-z]/g, '');

  // Split into pairs
  let pairs = [];
  for (let i = 0; i < plainText.length; i += 2) {
    let a = plainText[i];
    let b = plainText[i + 1] || 'x';
    if (a === b) {
      b = 'x';
      i--; // re-evaluate b next time
    }
    pairs.push([a, b]);
  }

  let cipherText = '';
  for (let [a, b] of pairs) {
    const posA = findPosition(matrix, a);
    const posB = findPosition(matrix, b);

    if (!posA || !posB) continue;

    if (posA.row === posB.row) {
      // Same row
      cipherText += matrix[posA.row][(posA.col + 1) % 5];
      cipherText += matrix[posB.row][(posB.col + 1) % 5];
    } else if (posA.col === posB.col) {
      // Same column
      cipherText += matrix[(posA.row + 1) % 5][posA.col];
      cipherText += matrix[(posB.row + 1) % 5][posB.col];
    } else {
      // Rectangle swap
      cipherText += matrix[posA.row][posB.col];
      cipherText += matrix[posB.row][posA.col];
    }
  }

  return cipherText.toUpperCase();
};

export { playfairEncrypt }; 
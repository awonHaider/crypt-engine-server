import {
  caesarEncrypt,
  monoalphabeticEncrypt,
  oneTimePadEncrypt,
  playfairEncrypt,
  transpositionEncrypt,
} from "../utils/encryption/index.js";

const caesarController = (req, res) => {
  const { key, plainText } = req.body;

  if (typeof key !== "number" || typeof plainText !== "string") {
    return res
      .status(400)
      .json({
        error:
          "Invalid input: key must be a number and plainText must be a string.",
      });
  }

  const cipherText = caesarEncrypt(plainText, key);
  res.json({ cipherText });
};

const monoalphabeticController = (req, res) => {
  const { key, plainText } = req.body;

  if (typeof key !== "string" || typeof plainText !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid input: key and plainText must be strings." });
  }

  try {
    const cipherText = monoalphabeticEncrypt(plainText, key);
    res.json({ cipherText });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const playfairController = (req, res) => {
  const { key, plainText } = req.body;

  if (typeof key !== "string" || typeof plainText !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid input: key and plainText must be strings." });
  }

  try {
    const cipherText = playfairEncrypt(plainText, key);
    res.json({ cipherText });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Encryption failed", details: error.message });
  }
};

const oneTimePadController = (req, res) => {
  const { plainText, key } = req.body;

  if (typeof plainText !== "string" || typeof key !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid input: plainText and key must be strings." });
  }

  const cleanedPlainText = plainText.replace(/[^a-zA-Z]/g, "").toUpperCase();
  const cleanedKey = key.replace(/[^a-zA-Z]/g, "").toUpperCase();

  if (cleanedPlainText.length !== cleanedKey.length) {
    return res
      .status(400)
      .json({
        error: "Key must be the same length as the plaintext (letters only).",
      });
  }

  try {
    const cipherText = oneTimePadEncrypt(cleanedPlainText, cleanedKey);
    res.json({ cipherText });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const transpositionController = (req, res) => {
  const { plainText, key } = req.body;
  if (typeof plainText !== "string" || typeof key !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid input: plainText and key must be strings." });
  }
  try {
    const cipherText = transpositionEncrypt(plainText, key);
    res.json({ cipherText });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { playfairController };
export { monoalphabeticController };
export { caesarController };
export { oneTimePadController };
export { transpositionController };

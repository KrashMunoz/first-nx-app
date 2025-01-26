function generateShortId() {
  /**
   * Generates a shorter unique random ID.
   * @returns {string} A short unique random ID string.
   */
  const array = new Uint8Array(16); // 16 random bytes
  crypto.getRandomValues(array); // Fill array with cryptographically secure random values
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); // Base64 URL-safe encoding
}

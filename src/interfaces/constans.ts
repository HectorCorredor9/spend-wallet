/**
 * RootLayout
 *
 * @typeParam children: React.ReactNode
 */
export type RootLayout = {
  children?: React.ReactNode;
};

/**
 * Result type for decryption operations.
 */
export type DecryptResult = {
  success: boolean;
  data: string; // Always present: decrypted content OR '-'
  error?: string; // Only present on failure
};

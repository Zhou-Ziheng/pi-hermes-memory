import { jaccardSimilarity, tokenizeForSimilarity } from "./skill-utils.js";

/** Similarity selects candidates for review, never authorizes deletion or replacement. */
export function memorySimilarity(left: string, right: string): number {
  const leftTokens = tokenizeForSimilarity(left);
  const rightTokens = tokenizeForSimilarity(right);
  return jaccardSimilarity(leftTokens, rightTokens);
}

export function isSimilarMemory(left: string, right: string): boolean {
  const leftTokens = new Set(tokenizeForSimilarity(left));
  const rightTokens = new Set(tokenizeForSimilarity(right));
  const shared = [...leftTokens].filter((token) => rightTokens.has(token)).length;
  return shared >= 4 && memorySimilarity(left, right) >= 0.55;
}

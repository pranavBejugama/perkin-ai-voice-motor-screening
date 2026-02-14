export const SCRIPT_PASSAGE = `The rainbow is a beautiful natural phenomenon that occurs when sunlight passes through water droplets in the atmosphere. This interaction causes the light to refract and reflect, creating a spectrum of colors that we can see in the sky. Each rainbow displays seven distinct colors: red, orange, yellow, green, blue, indigo, and violet. These colors always appear in the same order, with red on the outer edge and violet on the inner edge. Rainbows are most commonly seen when the sun is shining during or after a rain shower. The observer must be positioned with the sun behind them and rain in front of them to witness this spectacular display of natural beauty.`;

export type WordState = 'default' | 'correct' | 'incorrect' | 'current';

function normalizeWord(w: string): string {
  return w.toLowerCase().replace(/[.,!?;:]/g, '').trim();
}

export function splitIntoWords(text: string): string[] {
  return text.trim().split(/\s+/).filter(Boolean);
}

export function matchTranscriptToScript(scriptWords: string[], transcript: string): WordState[] {
  const transcriptWords = splitIntoWords(transcript).map(normalizeWord);
  const result: WordState[] = [];
  let tIdx = 0;

  for (let i = 0; i < scriptWords.length; i++) {
    if (tIdx >= transcriptWords.length) {
      result.push('default');
      continue;
    }
    const scriptNorm = normalizeWord(scriptWords[i]);
    const transcriptNorm = transcriptWords[tIdx];
    if (scriptNorm === transcriptNorm) {
      result.push('correct');
      tIdx++;
    } else {
      result.push('incorrect');
      tIdx++;
    }
  }
  const firstDefault = result.indexOf('default');
  return result.map((s, i) => (s === 'default' && firstDefault === i ? 'current' : s));
}

export function getCurrentWordIndexDuringRecording(
  scriptWords: string[],
  elapsedSeconds: number,
  estimatedWpm: number = 120
): number {
  const wordsPerSecond = estimatedWpm / 60;
  const estimatedWords = Math.floor(elapsedSeconds * wordsPerSecond);
  return Math.min(estimatedWords, scriptWords.length);
}

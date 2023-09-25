import { format as formatSync } from '@prettier/sync';
import type { AstPath, ParserOptions, Doc, Printer } from 'prettier';

function createPrinter(parserName: 'babel' | 'typescript'): Printer {
  function main(
    path: AstPath,
    options: ParserOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    print: (path: AstPath) => Doc,
  ): Doc {
    // @ts-ignore
    const comments = options[Symbol.for('comments')];

    if (comments) {
      comments.forEach((comment: any) => {
        // eslint-disable-next-line no-param-reassign
        comment.printed = true;
      });
    }

    const { originalText } = options;
    const formattedText = formatSync(originalText, {
      parser: parserName,
      endOfLine: 'lf',
    });
    console.dir([
      '='.repeat(40),
      '[v3 printer]',
      formattedText,
      '='.repeat(40),
    ]);

    return originalText;
  }

  return {
    print: main,
  };
}

export const printers: { [astFormat: string]: Printer } = {
  'babel-ast': createPrinter('babel'),
  'typescript-ast': createPrinter('typescript'),
};

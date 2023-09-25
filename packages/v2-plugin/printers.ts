import type { AstPath, ParserOptions, Doc, Printer } from 'prettier';
import { format } from 'prettier';

function createPrinter(parserName: 'babel' | 'typescript'): Printer {
  function main(
    path: AstPath,
    options: ParserOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    print: (path: AstPath) => Doc,
  ): Doc {
    const node = path.getValue();

    if (node?.comments) {
      node.comments.forEach((comment: any) => {
        // eslint-disable-next-line no-param-reassign
        comment.printed = true;
      });
    }

    const { originalText } = options;
    const formattedText = format(originalText, {
      parser: parserName,
      endOfLine: 'lf',
    });
    console.dir([
      '='.repeat(40),
      '[v2 printer]',
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

export class MetaDataParser {
    static parseAndRemoveMetadata(text: string): {text: string, metadata: QuestionMetadata[]} {

        const metadata: QuestionMetadata[] = [];

        const sanitizedText = text.replace(/@(\w+)\((.*)\)/g, function (match, fname, argsStr: string) {

            metadata.push({functionName: fname, functionArgs: argsStr})

            return '';
        });

        return {text: sanitizedText, metadata}
    }
}

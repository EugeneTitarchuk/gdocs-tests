import { Question } from "../../Question";

interface IMetadataFunction{
    functionName: string;

    apply(question: Question, metadata: QuestionMetadata, questions: Question[]): void;
}

class TextFieldFunction implements IMetadataFunction {
    functionName: string = "TextField";
    lineTemplate = '___________________________________________________________________________';

    apply(question: Question, metadata: QuestionMetadata, questions: Question[]): void {
        let lines = parseInt(metadata.functionArgs);
        if (Number.isNaN(lines)){
            lines = 1;
        }

        var text = this.lineTemplate;
        for (var i = 1; i < lines; i++) {
            text += '\n' + this.lineTemplate;
        }

        //
        question
    }
}

class NotWithFunction implements IMetadataFunction {
    functionName: string = "NotWith";

    apply(question: Question, metadata: QuestionMetadata, questions: Question[]): void {
        throw new Error("Method not implemented.");
    }
}

class TagFunction implements IMetadataFunction {
    functionName: string = "Tag";

    apply(question: Question, metadata: QuestionMetadata, questions: Question[]): void {
        throw new Error("Method not implemented.");
    }
}

class MultipleOptionsFunction implements IMetadataFunction {
    functionName: string = "MultipleOptions";

    apply(question: Question, metadata: QuestionMetadata, questions: Question[]): void {
        throw new Error("Method not implemented.");
    }
}

class TopicFunction implements IMetadataFunction {
    functionName: string = "Topic";

    apply(question: Question, metadata: QuestionMetadata, questions: Question[]): void {
        throw new Error("Method not implemented.");
    }
}

export class MetaDataFunction{
    static functions: IMetadataFunction[] = [
        new TextFieldFunction(),
        new NotWithFunction(),
        new TagFunction(),
        new MultipleOptionsFunction(),
        new TopicFunction()
    ]

    /**
     * Apply metadata to the question
     * @param question Question where metadata should be applied
     * @param metadata Metadata that should be applied
     * @param questions All questions
     */
    static apply(question: Question, metadata: QuestionMetadata[], questions: Question[]){
        for (const metadataItem of metadata){
            const metaFunction = MetaDataFunction.functions
                .find(s => s.functionName == metadataItem.functionName);

            if (!metaFunction){
                Logger.log(`Function '${metadataItem.functionName}' not found for question '${question.id}'`);
                continue;
            }

            metaFunction.apply(question, metadataItem, questions);
        }
    }
}

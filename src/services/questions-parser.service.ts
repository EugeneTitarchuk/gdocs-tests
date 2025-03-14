import { Question } from "../Question";
import { MetaDataFunction } from "./questions-parser/meta-data-functions";
import { MetaDataParser } from "./questions-parser/meta-data-parser";

// variant contains dot
function isQuestionIndex(s: string) {
    return s.indexOf(".") == -1;
}

export class QuestionsParserService{
    static parse(){
        var body = DocumentApp.getActiveDocument().getBody();
        var bodyText = body.getText().replace(/\n\s*\n/g, '\n');

        // cut all text to questions and answers
        var globalRegExp = /(^\d(.|\n[^(^\d)])*)/gim;

        // match question or answer with digit and text
        var questionRegExp = /^([\d.]+)\s((.|\n)*)$/i;

        var questionTokens = bodyText.match(globalRegExp);

        if (!questionTokens || questionTokens.length == 0) {
            throw 'Не знайдено жодного запитання!';
        }

        // form questions list
        const questions: Question[] = [];
        let currentQuestion: Question | null = null;

        for (var i = 0; i < questionTokens.length; i++) {
            var qStr = questionTokens[i];
            try {
                var tokens = questionRegExp.exec(qStr);
                if (tokens != null && isQuestionIndex(tokens[1])) {
                    // question
                    const questionId = parseInt(tokens[1]);
                    const { text, metadata } = MetaDataParser.parseAndRemoveMetadata(tokens[2]);

                    currentQuestion = new Question(questionId, text, metadata);
                    questions.push(currentQuestion);
                } else {
                    // variant
                    if (questions.length == 0)
                        throw (`Помилка (${i}) - не можна починати з варіантів: ${questionTokens[i]}`);

                    const { text, metadata } = MetaDataParser.parseAndRemoveMetadata(tokens![2]);
                    currentQuestion?.options.push(new )
                    questions[questions.length - 1].addOption(tokens![2]);
                }
            } catch (e) {
                Logger.log(
                    'Error on parsing question: ' + qStr + ', exception: ' + e
                );
                throw 'Помилка при розборі питання ' + qStr;
            }
        }

        questions.forEach(q => MetaDataFunction.apply(q, q.metadata, questions));

        questions.forEach(function (q) {
            q.incompatible.forEach(function (v, idx) {
                questions[idx - 1].incompatible[q.id] = v;
            });
        });

        return questions;
    }
}


import { Question } from "../Question";
import { QuestionsParser } from "../QuestionsParser";
import { Stats } from "../models/stats.model";

export class StatsService{
    getStats(): Stats{
        let questions: Question[];
        try {
            questions = QuestionsParser.parse(); //parseQuestions()
        } catch (e) {
            Logger.log('Exception occured ', e);
            DocumentApp.getUi().alert('Помилка при генерації документу: ' + e);
            return { total: 0, topics: [] };
        }

        var topics: { [key: string]: number } = {};

        questions.forEach((q) =>
            q.topics.forEach((topic) => {
                topics[topic] = (topics[topic] ?? 0) + 1;
            })
        );

        var list: { topic: string; count: number }[] = [];

        for (const [topic, count] of Object.entries(topics)) {
            list.push({ topic, count: <number>count });
        }

        list.sort((a, b) => b.count - a.count);

        return {
            total: questions.length,
            topics: list,
        };
    }
}

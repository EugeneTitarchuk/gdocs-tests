export class QuestionModel {

    public id: number;
    public text: string;
    public options: string[] = [];
    public usedTimes = 0;
    public incompatible: number[] = [];
    public tags: number[] = [];
    public topics: string[] = [];
    public correctOptions: (number | string)[] = [1]; // reserved
    public index = 0;

    constructor(id: number, text: string) {
        this.id = id;

        this.text = text;
    }
}

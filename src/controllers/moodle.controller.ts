import { Question } from "../Question";
import { QuestionsParser } from "../QuestionsParser";
import { MoodleExportService } from "../services/moodle-export.service";

export class MoodleController{
    moodleExportService: MoodleExportService;

    constructor(){
        this.moodleExportService = new MoodleExportService();
    }

    exportMoodle(){
        var questions: Question[];

        try {
          questions = QuestionsParser.parse()
        }  catch(e) {
          Logger.log("Exception occured ", e)
          DocumentApp.getUi().alert("Помилка при генерації документу: " + e)
          return ;
        }

        const doc = this.moodleExportService.export(questions);

        const xml = XmlService.getPrettyFormat().format(doc)

        const curDoc = DocumentApp.getActiveDocument()
        const docFile = DriveApp.getFileById(curDoc.getId())
        const name = docFile.getName() + ".xml"
        const firstDir = docFile.getParents().next()

        if (!firstDir) {
          DocumentApp.getUi().alert('Не вдалось визначити батьківську директорію файлу')
          return ;
        }

        const generatedFile = firstDir.createFile(name, xml)
        const url = generatedFile.getUrl()

        DocumentApp.getUi()
          .alert('Згенерований файл: ' + url)
    }
}

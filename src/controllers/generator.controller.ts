import { GenerateDocumentService } from "../services/generate-document.service";

export class GeneratorController {
    generateService: GenerateDocumentService;

    constructor(){
        this.generateService = new GenerateDocumentService();
    }

    showGenerateDialog(){
        const template = HtmlService.createTemplateFromFile('views/generator.view');
        const html = template.evaluate();

        DocumentApp.getUi().showModalDialog(html, 'Генерація колоквіуму');
    }

    generateDocument(
        documentName: string,
        variantsCount: number,
        questionsPerVariantCount: number,
        pagesPerTestCount: number,
        stats: boolean
    ) {
        Logger.log('test');
        const docName = documentName ?? 'col-test';
        const varsCount = variantsCount ?? 50;
        const questionsCount = questionsPerVariantCount ?? 15;
        const pagesPerTest = pagesPerTestCount ?? 4;

        const document = DocumentApp.create(docName);

        try {
            this.generateService.generate(document, varsCount, questionsCount, pagesPerTest, stats);
            document.saveAndClose();

            const generatedId = document.getId();
            const generatedFile = DriveApp.getFileById(generatedId);
            const directParents = DriveApp.getFileById(
                DocumentApp.getActiveDocument().getId()
            ).getParents();

            while (directParents.hasNext()) {
                generatedFile.moveTo(directParents.next());
            }

            var recipient = Session.getActiveUser().getEmail();
            var subject = 'Колоквіум ' + docName + ' готовий';
            var body =
                'Лінк на тести ' +
                documentName +
                '\n' +
                generatedFile.getUrl() +
                '\n';
            MailApp.sendEmail(recipient, subject, body);

            return generatedFile.getUrl();
        } catch (e) {
            Logger.log('Exception occured ', e);
            DocumentApp.getUi().alert('Помилка при генерації документу: ' + e);
            DriveApp.getFileById(document.getId()).setTrashed(true);
        }
    }
}

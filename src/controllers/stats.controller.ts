import { StatsService } from "../services/stats.service";

export class StatsController {
    statsService = new StatsService();

    showStatsDialog(){
        const template = HtmlService.createTemplateFromFile('views/topics.view');

        // todo: convert to request from UI
        template.stats = this.statsService.getStats();
        const html = template.evaluate();

        DocumentApp.getUi().showModalDialog(html, 'Звіт по темам');
    }
}

import { GeneratorController } from './controllers/generator.controller';
import { MoodleController } from './controllers/moodle.controller';
import { StatsController } from './controllers/stats.controller';

/**
 * The Script that generates test variants from the list of test questions stored in the Google Document.
 *
 * Extending Google Docs developer guide:
 *     https://developers.google.com/apps-script/guides/docs
 *
 * Document service reference documentation:
 *     https://developers.google.com/apps-script/reference/document/
 */
export function onOpen() {
    DocumentApp.getUi()
        .createMenu('Колоквіум')
        .addItem('Генератор...', 'generateDialog')
        .addItem('Статистика...', 'topicsDialog')
        .addItem('Екпорт в Moodle', 'moodleExport')
        .addToUi();
}

export function generateDialog() {
    var controller = new GeneratorController();
    controller.showGenerateDialog();
}

export function topicsDialog() {
    const controller = new StatsController();
    controller.showStatsDialog();
}

export function moodleExport() {
    const controller = new MoodleController();
    controller.exportMoodle();
}

export function generateDocument(
    documentName: string,
    variantsCount: number,
    questionsPerVariantCount: number,
    pagesPerTestCount: number,
    stats: boolean
) {
    const controller = new GeneratorController();
    return controller.generateDocument(
        documentName,
        variantsCount,
        questionsPerVariantCount,
        pagesPerTestCount,
        stats
    );
}

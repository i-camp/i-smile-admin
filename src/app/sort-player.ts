import { GameProgress } from '@app/game';
import { chain } from 'lodash';

export class SortPlayer {

    private sortList: SortedPlayersList = {
        photographer: [],
        subject: []
    };

    sortData(data: GameProgress): SortedPlayersList {

        // TODO orderで同着の考慮ができていない

        // 撮影側の集計
        const _photographerScore: {photographerId: string, count: number}[] = chain(data.snapEvents)
            .countBy('photographerId')
            .map((a, b) => ({ photographerId: b, count: a }))
            .orderBy(['count'], ['desc'])
            .value();
        const _photographerScoreOrder: number[] = chain(data.snapEvents)
            .countBy('photographerId')
            .values()
            .orderBy([], ['desc'])
            .uniq()
            .value();
        const photographerScore: { photographerId: string, count: number, order: number }[] = chain(_photographerScore)
            .map((a) => Object.assign({order: _photographerScoreOrder.findIndex((c) => c === a.count) + 1}, a))
            .value();

        // 被写体側の集計
        const _subjectScore: {subjectId: string, count: number}[] = chain(data.snapEvents)
            .countBy('subjectId')
            .map((a, b) => ({ subjectId: b, count: a }))
            .orderBy(['count'], ['desc'])
            .value();
        const _subjectScoreOrder: number[] = chain(data.snapEvents)
            .countBy('subjectId')
            .values()
            .orderBy([], ['desc'])
            .uniq()
            .value();
        const subjectScore: { subjectId: string, count: number, order: number }[] = chain(_subjectScore)
            .map((a) => Object.assign({order: _subjectScoreOrder.findIndex((c) => c === a.count) + 1}, a))
            .value();

        // nameと連結しsortListにpush（撮影スコア）
        for (const value of photographerScore) {
            const photographer = data.players.find(obj => obj.id === value.photographerId);
            if (!photographer) {
                continue;
            }

            this.sortList.photographer.push({
                photographerId: value.photographerId,
                name: photographer.name,
                count: value.count,
                order: value.order
            });
        }

        // nameと連結しsortListにpush（被写体スコア）
        for (const value of subjectScore) {
            const subject = data.players.find(obj => obj.id === value.subjectId);
            if (!subject) {
                continue;
            }

            this.sortList.subject.push({
                subjectId: value.subjectId,
                name: subject.name,
                count: value.count,
                order: value.order
            });
        }

        return this.sortList;
    }
}

interface SortedPlayersList {
    photographer:
    {
        photographerId: string;
        name: string;
        count: number;
        order: number;
    }[];
    subject:
    {
        subjectId: string;
        name: string;
        count: number;
        order: number;
    }[];
}

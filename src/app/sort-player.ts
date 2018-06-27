import { GameProgress } from '@app/game';
import { chain } from 'lodash';

export class SortPlayer {

    private sortList: SortedPlayersList = {
        photographer: [],
        subject: []
    };

    sortData(data: GameProgress): SortedPlayersList {

        // 撮影側の集計
        const photographerScore = chain(data.snapEvents)
            .countBy('photographerId')
            .map((a, b) => ({ photographerId: b, count: a }))
            .orderBy(['count'], ['desc'])
            .value();

        // 被写体側の集計
        const subjectScore = chain(data.snapEvents)
            .countBy('subjectId')
            .map((a, b) => ({ subjectId: b, count: a }))
            .orderBy(['count'], ['desc'])
            .value();

        // nameと連結しsortListにpush（撮影スコア）
        for (const value of photographerScore) {
            this.sortList.photographer.push({
                photographerId: value.photographerId,
                name: data.players.find(obj => obj.id === value.photographerId).name,
                count: value.count
            });
        }

        // nameと連結しsortListにpush（被写体スコア）
        for (const value of subjectScore) {
            this.sortList.subject.push({
                subjectId: value.subjectId,
                name: data.players.find(obj => obj.id === value.subjectId).name,
                count: value.count
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
    }[];
    subject:
    {
        subjectId: string;
        name: string;
        count: number;
    }[];
}

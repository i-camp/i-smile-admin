import { GameProgress } from '@app/game';
import { chain } from 'lodash';

export class SortPlayer {
    private sortList: SortedPlayersList = {
        photographer: [
            {
                photographerId: null,
                name: null
            }
        ],
        subject: [
            {
                subjectId: null,
                name: null
            }
        ]
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

        // idとnameの対応リスト作成
        const idNameList = data.players
            .filter((obj, i, self) => self.findIndex(obj2 => obj2.id === obj.id) === i);

        // nameと連結しsortListにpush（撮影スコア）
        for (const value of photographerScore) {
            this.sortList.photographer.push({
                photographerId: value.photographerId,
                name: idNameList.find(obj => obj.id === value.photographerId).name
            });
        }

        // nameと連結しsortListにpush（被写体スコア）
        for (const value of subjectScore) {
            this.sortList.subject.push({
                subjectId: value.subjectId,
                name: idNameList.find(obj => obj.id === value.subjectId).name
            });
        }

        this.sortList.photographer = this.sortList.photographer.filter(obj => obj.photographerId !== null);
        this.sortList.subject = this.sortList.subject.filter(obj => obj.subjectId !== null);

        return this.sortList;
    }
}

interface SortedPlayersList {
    photographer:
    {
        photographerId: string;
        name: string;
    }[];
    subject:
    {
        subjectId: string;
        name: string;
    }[];
}

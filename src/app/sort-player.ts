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

    private nameList: PlayerNameList = {
        PlayerName: {
            key: '',
        }
    };

    private testObj: GameProgress = {
        players: [
            { id: 'p001', name: 'yasu' },
            { id: 'p002', name: 'tsukamoto' },
            { id: 'p003', name: 'yoshimatsu' },
        ],
        snapEvents: [
            {
                photographerId: 'p001',
                subjectId: 'p002',
                photoUrl: 'http://test',
                photoPath: '//test_path',
                createdAt: new Date('2018-06-19T23:38:52.037Z')
            },
            {
                photographerId: 'p002',
                subjectId: 'p003',
                photoUrl: 'http://test',
                photoPath: '//test_path',
                createdAt: new Date('2018-06-19T23:38:52.037Z')
            },
            {
                photographerId: 'p003',
                subjectId: 'p001',
                photoUrl: 'http://test',
                photoPath: '//test_path',
                createdAt: new Date('2018-06-19T23:38:52.037Z')
            },
            {
                photographerId: 'p002',
                subjectId: 'p003',
                photoUrl: 'http://test',
                photoPath: '//test_path',
                createdAt: new Date('2018-06-19T23:38:52.037Z')
            },
            {
                photographerId: 'p002',
                subjectId: 'p001',
                photoUrl: 'http://test',
                photoPath: '//test_path',
                createdAt: new Date('2018-06-19T23:38:52.037Z')
            },
            {
                photographerId: 'p003',
                subjectId: 'p001',
                photoUrl: 'http://test',
                photoPath: '//test_path',
                createdAt: new Date('2018-06-19T23:38:52.037Z')
            }]
    };

    sortData(data: GameProgress): SortedPlayersList {

        // 撮影側の集計
        const photographerScore = chain(this.testObj.snapEvents)
            .countBy('photographerId')
            .map((a, b) => ({ photographerId: b, count: a }))
            .orderBy(['count'], ['desc'])
            .value();

        console.log('photographerScore');
        console.log(photographerScore);

        // 被写体側の集計
        const subjectScore = chain(this.testObj.snapEvents)
            .countBy('subjectId')
            .map((a, b) => ({ subjectId: b, count: a }))
            .orderBy(['count'], ['desc'])
            .value();

        console.log('subjectScore');
        console.log(subjectScore);


        // idとnameの対応リスト
        const idNameList = chain(this.testObj.players)
            .filter((obj, i, self) => self.findIndex(obj2 => obj2.id === obj.id) === i)
            .value();

        console.log('idNameList');
        console.log(idNameList);

        // nameと連結しsortListにpush
        for (const value of photographerScore) {
            this.sortList.photographer.push({
                photographerId: value.photographerId,
                name: idNameList.find(obj => obj.id === value.photographerId).name
            });
        }

        // nameと連結しsortListにpush
        for (const value of subjectScore) {
            this.sortList.subject.push({
                subjectId: value.subjectId,
                name: idNameList.find(obj => obj.id === value.subjectId).name
            });
        }

        this.sortList.photographer = this.sortList.photographer.filter(obj => obj.photographerId !== null);
        this.sortList.subject = this.sortList.subject.filter(obj => obj.subjectId !== null);

        console.log('sortlist');
        console.log(this.sortList);
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

interface PlayerNameList {
    PlayerName: { key: string };
}

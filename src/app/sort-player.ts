import { GameProgress } from '@app/game';

export class SortPlayer {
    private sortList: SortedPlayersList;
    private countList: CountPlayerList;
    private nameList: PlayerNameList;
    private testObj: GameProgress;

    sortData(data: GameProgress): SortedPlayersList {

        this.testObj = {
            players: [
                { id: 'p001', name: 'yasu' },
                { id: 'p002', name: 'tsukamoto' },
                { id: 'p003', name: 'yoshimatsu' },
                { id: 'p002', name: 'tsukamoto' },
                { id: 'p002', name: 'tsukamoto' },
                { id: 'p001', name: 'yasu' },
            ],
            snapEvents: [
                {
                    photographerId: 'p001',
                    subjectId: 's001',
                    photoUrl: 'http://test',
                    photoPath: '//test_path',
                    createdAt: new Date('2018-06-19T23:38:52.037Z')
                },
                {
                    photographerId: 'p001',
                    subjectId: 's002',
                    photoUrl: 'http://test',
                    photoPath: '//test_path',
                    createdAt: new Date('2018-06-19T23:38:52.037Z')
                },
                {
                    photographerId: 'p002',
                    subjectId: 's003',
                    photoUrl: 'http://test',
                    photoPath: '//test_path',
                    createdAt: new Date('2018-06-19T23:38:52.037Z')
                },
                {
                    photographerId: 'p002',
                    subjectId: 's001',
                    photoUrl: 'http://test',
                    photoPath: '//test_path',
                    createdAt: new Date('2018-06-19T23:38:52.037Z')
                },
                {
                    photographerId: 'p002',
                    subjectId: 's001',
                    photoUrl: 'http://test',
                    photoPath: '//test_path',
                    createdAt: new Date('2018-06-19T23:38:52.037Z')
                },
                {
                    photographerId: 'p003',
                    subjectId: 's001',
                    photoUrl: 'http://test',
                    photoPath: '//test_path',
                    createdAt: new Date('2018-06-19T23:38:52.037Z')
                }]
        };


        this.nameList = {
            string: null
        };


        this.countList = {
            photographerScore: [{
                id: null,
                name: null,
                count: 0
            }]
        };

        this.sortList = {
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

        // playerと名前の対応オブジェクト作成
        for (const value of this.testObj.players) {
            if (value.id in this.nameList) {
            } else {
                this.nameList[value.id] = value.name;
            }
        }

        // playerごとの撮影した枚数をカウントし格納Ï
        for (const value of this.testObj.snapEvents) {

            // if (value.photographerId in this.countList.photographerScore['id']) {
            if (this.countList.photographerScore.find(x => x.id === value.photographerId)) {
                this.countList.photographerScore.map((obj) => {
                    obj.count++;
                });
            } else {
                this.countList.photographerScore.push({
                    id: value.photographerId,
                    name: this.nameList[value.photographerId],
                    count: 1
                });
            }
        }

        function removeSpace(x: any) {
            return x.id !== '';
        }
        const countListRemove = this.countList.photographerScore.filter(removeSpace);

        // 撮影した枚数の多いプレイヤー順にソート
        function sortPlayerScore(a: any, b: any) {
            return b.count - a.count;
        }
        const countListSort = countListRemove.sort(sortPlayerScore);

        for (const value of this.countList.photographerScore) {
            this.sortList.photographer.push({ photographerId: value.id, name: value.name });
        }

        console.log(this.sortList);
        return this.sortList;
    }
}

interface SortedPlayersList {
    photographer: [
        {
            photographerId: string;
            name: string;
        }
    ];
    subject: [
        {
            subjectId: string;
            name: string;
        }
    ];
}

interface CountPlayerList {
    photographerScore: [
        {
            id: string;
            name: string;
            count: number;
        }
    ];
}

interface PlayerNameList {
    string: string;
}

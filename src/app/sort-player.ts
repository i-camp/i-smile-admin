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
        console.log('first this.countList');
        console.log(this.countList);

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

        console.log('from this.testObj.players');
        console.log(this.testObj.players);
        // playerと名前の対応オブジェクト作成
        for (const value of this.testObj.players) {
            if (value.id in this.nameList) {
            } else {
                this.nameList[value.id] = value.name;
            }
        }
        console.log('to this.nameList');
        console.log(this.nameList);

        console.log('from this.testObj.snapEcents');
        console.log(this.testObj.snapEvents);
        // playerごとの撮影した枚数をカウントし格納Ï
        for (const value of this.testObj.snapEvents) {
            console.log('aaaaaaaaaaaaaaaaa');
            console.log(this.countList.photographerScore);

            if (this.countList.photographerScore.find(x => x.id === value.photographerId)) {
                this.countList.photographerScore.map((obj) => {
                    obj.count++;
                    console.log('if //////////////////////');
                    console.log('value.photographerId');
                    console.log(value.photographerId);
                    console.log('obj.name + obj.count');
                    console.log(obj.name + obj.count);
                    console.log('//////////////////////');
                });
            } else {
                console.log('else //////////////////////');
                console.log(value.photographerId);
                console.log(this.nameList[value.photographerId]);
                console.log('//////////////////////');
                this.countList.photographerScore.push({
                    id: value.photographerId,
                    name: this.nameList[value.photographerId],
                    count: 1
                });
            }
            console.log(this.countList.photographerScore);
        }
        console.log('to this.countList.photographerScore');
        console.log(this.countList.photographerScore);

        // photographerIdが空白の撮影者を除外する関数
        function removeSpace(x: any) {
            return x.id !== '';
        }
        const countListRemove = this.countList.photographerScore.filter(removeSpace);

        console.log('to countListremove');
        console.log(countListRemove);

        // 撮影した枚数の多いプレイヤー順にソート
        function sortPlayerScore(a: any, b: any) {
            return b.count - a.count;
        }
        const countListSort = countListRemove.sort(sortPlayerScore);

        console.log('to countListremove');
        console.log(countListSort);

        // ranking.service.tsの private aggregateGameProgress(): Observable<RankingEvent>に合わせて返す
        // for (const value of this.countList.photographerScore) {
        for (const value of countListSort) {
            this.sortList.photographer.push({ photographerId: value.id, name: value.name });
        }

        console.log('to this.sortList.photographer');
        console.log(this.sortList.photographer);

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

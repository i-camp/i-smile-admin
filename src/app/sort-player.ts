export class SortPlayer {
    private sortList: SortedPlayersList;
    private countList: CountPlayerList;
    private nameList: PlayerNameList;
    private testObj: GameProgress;

    sortData(data: GameProgress): SortedPlayersList {

        this.testObj = {
            gameId: 'aaa',
            players: [
                {id: 'p001', name: 'p002'},
                {id: 'yasu', name: 'tsukamoto'}
            ],
            snapEvents: [{
                photographerId: 'p001',
                subjectId: 's001',
                photoUrl: 'http://test',
                photoPath: '//test_path',
                createdAt: new Date('2018-06-19T23:38:52.037Z')
            }]
        };

        this.nameList = {
            string: ''
        };

        this.countList = {
            photographerScore: [{
                id: '',
                name: '',
                count: 0
            }]
        };

        this.sortList = {
            gameId: '',
            photographer: [
                {
                    photographerId: '',
                    name: ''
                }
            ],
            subject: [
                {
                    subjectId: '',
                    name: ''
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

        // playerごとの撮影した枚数をカウントし格納
        for (const value of this.testObj.snapEvents) {
            if (value.photographerId in this.countList) {
                this.countList[value.photographerId].count++;
            } else {
                this.countList[value.photographerId] = {
                    name: this.nameList[value.photographerId],
                    count: 1,
                };
            }
        }

        // 撮影した枚数の多いプレイヤー順にソート
        this.countList.photographerScore.sort((a: any, b: any) => {
            return b.count - a.count;
        });

        for (const value of this.countList.photographerScore) {
            this.sortList.photographer.push({ photographerId: value.id, name: value.name });
        }

        return this.sortList;
    }
}

interface GameProgress {
    gameId: string;
    players: [
        {
            id: string,
            name: string
        }
    ];
    snapEvents: [
        {
            photographerId: string;
            subjectId: string;
            photoUrl: string;
            photoPath: string;
            createdAt: Date;
        }
    ];
}

interface SortedPlayersList {
    gameId: string;
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

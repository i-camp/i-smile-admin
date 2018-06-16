export class SortPlayer {
    private sortList: SortedPlayersList;
    private countList: CountPlayerList;
    private nameList: PlayerNameList;
    hoge(data: GameProgress): SortedPlayersList {

        // playerと名前の対応オブジェクト作成
        for (const value of data.players) {
            if (value.id in this.nameList) {
            } else {
                this.nameList[value.id] = value.name;
            }
        }
        // playerごとの撮影した枚数をカウントし格納
        for (const value of data.snapEvents) {
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
/*
interface CountPlayerList {
    photographerScore: {
        string: {
            name: string;
            count: number;
        }
    };
}
*/

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

import { GameProgress } from '@app/game';
import { chain } from 'lodash';

export class SortPlayer {

    sortData(data: GameProgress): SortedPlayersList {
        const photographerScores: { uuid: string, score: number }[] =
          this.aggregateByUuid(data, 'photographerId');
        const subjectScores: { uuid: string, score: number }[] =
          this.aggregateByUuid(data, 'photographerId');

        const psWithOrder: { uuid: string, score: number, order: number }[] = this.addOrder(photographerScores);
        const ssWithOrder: { uuid: string, score: number, order: number }[] = this.addOrder(subjectScores);

        const psWithPlayerName: { uuid: string, name: string, score: number, order: number }[] =
          this.addPlayerName(psWithOrder, data);
        const ssWithPlayerName: { uuid: string, name: string, score: number, order: number }[] =
          this.addPlayerName(ssWithOrder, data);

        return { photographer: psWithPlayerName, subject: ssWithPlayerName};
    }

    private aggregateByUuid(data: GameProgress, uuidIdName: 'photographerId'|'subjectId'): { uuid: string, score: number}[] {
      return chain(data.snapEvents)
        .countBy(uuidIdName)
        .map((a, b) => ({ uuid: b, score: a }))
        .orderBy(['score'], ['desc'])
        .value();
    }

    private addOrder(target: { uuid: string, score: number}[]): { uuid: string, score: number, order: number }[] {
      const scoreSummary: { score: number, countOfPlayer: number }[] = chain(target.slice())
        .countBy('score')
        .map((a, b) => ({ score: parseInt(b, 10), countOfPlayer: a }))
        .orderBy(['score'], ['desc'])
        .value();

      return target.map((score) => {
        const index: number = scoreSummary.findIndex((so) => so.score === score.score);
        const order: number = scoreSummary.slice(0, index)
          .map(a => a.countOfPlayer)
          .reduce((a, b) => a + b, 0) + 1;
        return Object.assign({order: order}, score);
      });
    }

    private addPlayerName(target: { uuid: string, score: number, order: number }[], data: GameProgress): { uuid: string, name: string, score: number, order: number }[]{
      const scores =  [];
      for (const value of target) {
        const player = data.players.find(obj => obj.id === value.uuid);
        if (!player) {
          continue;
        }

        scores.push({
          uuid: value.uuid,
          name: player.name,
          score: value.score,
          order: value.order
        });
      }
      return scores;
    }
}

interface SortedPlayersList {
    photographer:
    {
        uuid: string;
        name: string;
        score: number;
        order: number;
    }[];
    subject:
    {
        uuid: string;
        name: string;
        score: number;
        order: number;
    }[];
}

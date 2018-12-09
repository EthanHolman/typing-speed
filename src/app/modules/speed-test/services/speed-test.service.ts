import { Injectable } from '@angular/core';
import { WordLoaderService } from '../../core/services/word-loader.service';
import { WordListApiService } from '../../core/services/word-list-api.service';

@Injectable()
export class SpeedTestService {
    selectedSpeedTestId: number = 1;
    words: string[] = [];
    lines: any[] = [];

    constructor(private _wordLoader: WordLoaderService,
                private _WordListApiService: WordListApiService) { }

    reset(): void {
        this.loadWords();
    }

    getNextWord(): string {
        return this.words[this.getRandomNumber(0, this.words.length - 1)];
    }

    getRandomWordLine(): string[] {
        let wordLength = 0;
        const words: string[] = [];

        while (wordLength < 25) {
            const word = this.getNextWord();
            words.push(word);
            wordLength += word.length;
        }

        return words;
    }

    onLineCompleted(): void {
        this.lines.splice(0, 1);
        this.lines.push(this.getRandomWordLine());
    }

    private getRandomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1));
    }

    private loadWords(): void {
        this._WordListApiService.getWordList('300mostcommon.txt')
            .subscribe((data: any) => {
                this.words = data;
                this.onWordsLoaded();
            }, (error: any) => {
                this.words = [];
                console.error(error);
            });
    }

    private onWordsLoaded(): void {
        for (let i = 0; i < 3; i++) {
            this.lines.push(this.getRandomWordLine());
        }
    }
}

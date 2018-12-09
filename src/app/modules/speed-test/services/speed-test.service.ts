import { Injectable } from '@angular/core';
import { WordLoaderService } from '../../core/services/word-loader.service';
import { WordListApiService } from '../../core/services/word-list-api.service';
import { TypingTestApiService } from '../../core/services/typing-test-api.service';
import { TypingTestMode } from '../../core/models/typing-test-mode';

@Injectable()
export class SpeedTestService {
    typingTests: TypingTestMode[] = [];
    selectedSpeedTestId: number = 1;
    words: string[] = [];
    lines: any[] = [];

    constructor(private _wordLoader: WordLoaderService,
                private _wordListApiService: WordListApiService,
                private _typingTestApiService: TypingTestApiService) {
        this.loadTypingTests();
    }

    reset(): void {
        this.words = [];
        this.lines = [];
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

    loadTest(testId: number): void {
        this.selectedSpeedTestId = testId;
        this.reset();
    }

    private loadTypingTests(): void {
        this._typingTestApiService.getTypingTests()
            .subscribe((tests: TypingTestMode[]) => {
                this.typingTests = tests;
            }, (error: any) => {
                console.error('Could not load typing tests');
                this.typingTests = [];
            });
    }

    private getRandomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1));
    }

    private loadWords(): void {
        const textFileName = this.typingTests.find(x => x.id === this.selectedSpeedTestId).textFileName;

        this._wordListApiService.getWordList(textFileName)
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

import { Injectable } from '@angular/core';
import { WordLoaderService } from '../../core/services/word-loader.service';
import { WordListApiService } from '../../core/services/word-list-api.service';
import { TypingTestApiService } from '../../core/services/typing-test-api.service';
import { TypingTestMode } from '../../core/models/typing-test-mode';
import { TypingStats } from '../models/typing-stats';
import { TypedWord } from '../models/typed-word';

@Injectable()
export class SpeedTestService {
    typingTests: TypingTestMode[] = [];
    selectedSpeedTestId: number = 1;
    words: string[] = [];
    lines: any[] = [];
    currentWordIndex = 0;
    typingStats: TypingStats = new TypingStats();
    startTime: number = undefined;

    constructor(private _wordLoader: WordLoaderService,
                private _wordListApiService: WordListApiService,
                private _typingTestApiService: TypingTestApiService) {
        this.loadTypingTests();
    }

    reset(): void {
        this.words = [];
        this.lines = [];
        this.startTime = undefined;
        this.typingStats = new TypingStats();
        this.loadWords();
    }

    wordTyped(word: TypedWord): void {
        const incorrectLetters = this.calcIncorrectLetters(this.getCurrentWord(), word.word);
        this.typingStats.numLettersTyped += word.word.length;
        this.typingStats.numIncorrectLetters += incorrectLetters;
        this.typingStats.numExpectedLetters += this.getCurrentWord().length;
        if (incorrectLetters > 0) { this.typingStats.incorrectWordCount++; }
        this.typingStats.wordsTyped++;

        if (this.currentWordIndex === this.lines[0].length - 1) {
            this.onLineCompleted();
            this.currentWordIndex = 0;
        } else {
            this.currentWordIndex++;
        }
    }

    letterTyped(): void {
        if (!this.startTime) { this.startTime = Date.now(); }
        this.updateStats();
    }

    getCurrentWord(): string {
        return this.lines[0][this.currentWordIndex];
    }

    updateStats(): void {
        const minElapsed = (Date.now() - this.startTime) / 60000;
        this.typingStats.avgWpm = ((this.typingStats.numLettersTyped / 4.7) - this.typingStats.incorrectWordCount) / minElapsed;
        this.typingStats.avgAccuracy = 100 - ((this.typingStats.numIncorrectLetters / this.typingStats.numExpectedLetters) * 100);
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

    private calcIncorrectLetters(word: string, typedWord: string): number {
        let incorrectCount = 0;
        if (typedWord.length > word.length) { incorrectCount += (typedWord.length - word.length); }

        for (let i = 0; i < Math.min(typedWord.length, word.length); i++) {
            if (word.charAt(i) !== typedWord.charAt(i)) { incorrectCount++; }
        }

        return incorrectCount;
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

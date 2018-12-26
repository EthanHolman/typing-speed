import { Injectable } from '@angular/core';
import { WordLoaderService } from '../../core/services/word-loader.service';
import { WordListApiService } from '../../core/services/word-list-api.service';
import { TypingTestApiService } from '../../core/services/typing-test-api.service';
import { TypingTestMode } from '../../core/models/typing-test-mode';
import { TypingStats } from '../models/typing-stats';
import { Timer } from '../../shared/utilities/timer';
import { Subject } from 'rxjs';
import { WordMode } from '../../core/enums/word-mode.enum';

@Injectable()
export class SpeedTestService {
    private _timer: Timer = new Timer(60);
    typingTests: TypingTestMode[] = [];
    selectedTest: TypingTestMode;
    wordLoadIndex = 0;
    words: string[] = [];
    lines: any[] = [];
    currentWordIndex = 0;
    currentTypedVal = '';
    typingStats: TypingStats = new TypingStats();
    isTestComplete: boolean = false;
    get currentTime(): number { return this._timer.counter; }
    get isTestRunning(): boolean { return this._timer.isRunning; }

    constructor(private _wordLoader: WordLoaderService,
                private _wordListApiService: WordListApiService,
                private _typingTestApiService: TypingTestApiService) {
        this.loadTypingTests();
        this._timer.tick.subscribe(_ => this.onTimerTick());
        this._timer.complete.subscribe(_ => this.onTestComplete());
    }

    reset(): void {
        this.isTestComplete = false;
        this.wordLoadIndex = 0;
        this.currentWordIndex = 0;
        this.words = [];
        this.lines = [];
        this.currentTypedVal = '';
        this.typingStats = new TypingStats();
        this._timer.reset();
        this.loadWords();
    }

    isLastWord(): boolean {
        return this.selectedTest.wordMode === WordMode.Standard && this.lines[0].length - 1 ===  this.currentWordIndex && this.lines[1].length === 0;
    }

    wordTyped(word: string): void {
        if (!word) return;
        if (this.isLastWord()) { this.onTestComplete(); }

        const incorrectLetters = this.calcIncorrectLetters(this.getCurrentWord(), word);
        this.typingStats.numLettersTyped += word.length;
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

    letterTyped(currentVal: string): void {
        if (!this._timer.isRunning && !this._timer.isComplete && !this.isTestComplete) { this._timer.start(); }
        this.currentTypedVal = currentVal;
    }

    getCurrentWord(): string {
        return this.lines[0][this.currentWordIndex];
    }

    updateStats(): void {
        const minElapsed = (this._timer.duration - this._timer.counter) / 60;
        this.typingStats.avgWpm = ((this.typingStats.numLettersTyped / 4.7) - this.typingStats.incorrectWordCount) / minElapsed;
        this.typingStats.avgAccuracy = 100 - ((this.typingStats.numIncorrectLetters / this.typingStats.numExpectedLetters) * 100);
    }

    onLineCompleted(): void {
        this.lines.splice(0, 1);
        this.lines.push(this.getWordLine());
    }

    loadTest(testId: number): void {
        this.selectedTest = this.typingTests.find(x => x.id === testId);
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

    private getWordLine(): string[] {
        let wordLength = 0;
        const words: string[] = [];

        while (wordLength < 35) {
            const word = this.getNextWord();
            if (!word) break;
            words.push(word);
            wordLength += word.length;
        }

        return words;
    }

    private getNextWord(previewOnly?: boolean): string {
        let word = undefined;
        if (this.selectedTest.wordMode === WordMode.Standard) {
            if (this.words.length > this.wordLoadIndex) {
                word = this.words[this.wordLoadIndex];
                if (!previewOnly) this.wordLoadIndex++;
            }
        } else {
            word = this.words[this.getRandomNumber(0, this.words.length - 1)];
        }

        return word;
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
        this._timer.reset(this.selectedTest.timeLimit);
        this._wordListApiService.getWordList(this.selectedTest.textFileName, this.selectedTest.wordMode)
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
            this.lines.push(this.getWordLine());
        }
    }

    private onTimerTick(): void {
        this.updateStats();
    }

    private onTestComplete(): void {
        this._timer.stop();
        this.updateStats();
        this.isTestComplete = true;
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WordListService } from 'src/app/modules/core/services/word-list.service';
import { takeUntil, max } from 'rxjs/operators';
import { TypedWord } from '../../models/typed-word';
import { TypedWordResult } from '../../models/typed-word-result';
import { SpeedTestService } from '../../services/speed-test.service';

@Component({
    selector: 'app-speed-tester',
    templateUrl: './speed-tester.component.html',
    styleUrls: ['./speed-tester.component.scss']
})
export class SpeedTesterComponent implements OnInit, OnDestroy {
    private _unsubscribe = new Subject<void>();
    words: string[] = [];
    lines: any[] = [];
    currentWordIndex = 0;
    wordsTyped: number = 0;
    avgWpm: number = 0;
    avgAccuracy: number = 0;
    startTime: number = undefined;
    numLettersTyped: number = 0;
    numIncorrectLetters: number = 0;
    numExpectedLetters: number = 0;
    incorrectWordCount: number = 0;

    constructor(private _wordListService: WordListService,
                private _speedTestService: SpeedTestService) {}

    ngOnInit(): void {
        this.loadWords();
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    getCurrentWord(): string {
        return this.lines[0][this.currentWordIndex];
    }

    getNextWord(): string {
        return this.words[this.getRandomNumber(0, this.words.length - 1)];
    }

    letterTyped(): void {
        if (!this.startTime) { this.startTime = Date.now(); }
    }

    wordTyped(word: TypedWord): void {
        const incorrectLetters = this.calcIncorrectLetters(this.getCurrentWord(), word.word);
        this.numLettersTyped += word.word.length;
        this.numIncorrectLetters += incorrectLetters;
        this.numExpectedLetters += this.getCurrentWord().length;
        if (incorrectLetters > 0) { this.incorrectWordCount++; }
        this.wordsTyped++;

        this.updateStats();

        if (this.currentWordIndex === this.lines[0].length - 1) {
            this.lines.splice(0, 1);
            this.lines.push(this.getRandomWords());
            this.currentWordIndex = 0;
        } else {
            this.currentWordIndex++;
        }
    }

    updateStats(): void {
        const minElapsed = (Date.now() - this.startTime) / 60000;
        this.avgWpm = ((this.numLettersTyped / 4.7) - this.incorrectWordCount) / minElapsed;
        this.avgAccuracy = 100 - ((this.numIncorrectLetters / this.numExpectedLetters) * 100);
    }

    private calcIncorrectLetters(word: string, typedWord: string): number {
        let incorrectCount = 0;
        if (typedWord.length > word.length) { incorrectCount += (typedWord.length - word.length); }

        for (let i = 0; i < Math.min(typedWord.length, word.length); i++) {
            if (word.charAt(i) !== typedWord.charAt(i)) { incorrectCount++; }
        }

        return incorrectCount;
    }

    private getRandomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1));
    }

    private loadWords(): void {
        this._wordListService.getWordList('300mostcommon.txt')
            .pipe(takeUntil(this._unsubscribe))
            .subscribe((data: any) => {
                this.words = data;
                this.onWordsLoaded();
            }, (error: any) => {
                this.words = [];
                console.error(error);
            });
    }

    private getRandomWords(): string[] {
        let wordLength = 0;
        const words: string[] = [];

        while (wordLength < 25) {
            const word = this.getNextWord();
            words.push(word);
            wordLength += word.length;
        }

        return words;
    }

    private onWordsLoaded(): void {
        // Initial words loadup
        for (let i = 0; i < 3; i++) {
            this.lines.push(this.getRandomWords());
        }
    }
}

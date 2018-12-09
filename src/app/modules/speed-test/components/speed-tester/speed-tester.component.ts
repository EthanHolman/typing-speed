import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { TypedWord } from '../../models/typed-word';
import { SpeedTestService } from '../../services/speed-test.service';

@Component({
    selector: 'app-speed-tester',
    templateUrl: './speed-tester.component.html',
    styleUrls: ['./speed-tester.component.scss']
})
export class SpeedTesterComponent implements OnInit, OnDestroy {
    private _unsubscribe = new Subject<void>();
    currentWordIndex = 0;
    get lines() { return this._speedTestService.lines; }
    wordsTyped: number = 0;
    avgWpm: number = 0;
    avgAccuracy: number = 0;
    startTime: number = undefined;
    numLettersTyped: number = 0;
    numIncorrectLetters: number = 0;
    numExpectedLetters: number = 0;
    incorrectWordCount: number = 0;

    constructor(private _speedTestService: SpeedTestService) { }

    ngOnInit(): void {
        this._speedTestService.reset();
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    letterTyped(): void {
        if (!this.startTime) { this.startTime = Date.now(); }
        this.updateStats();
    }

    getCurrentWord(): string {
        return this.lines[0][this.currentWordIndex];
    }

    wordTyped(word: TypedWord): void {
        const incorrectLetters = this.calcIncorrectLetters(this.getCurrentWord(), word.word);
        this.numLettersTyped += word.word.length;
        this.numIncorrectLetters += incorrectLetters;
        this.numExpectedLetters += this.getCurrentWord().length;
        if (incorrectLetters > 0) { this.incorrectWordCount++; }
        this.wordsTyped++;

        if (this.currentWordIndex === this._speedTestService.lines[0].length - 1) {
            this._speedTestService.onLineCompleted();
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
}

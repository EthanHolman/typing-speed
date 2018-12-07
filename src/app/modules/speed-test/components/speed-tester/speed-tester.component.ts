import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { WordListService } from 'src/app/modules/core/services/word-list.service';
import { takeUntil, max } from 'rxjs/operators';
import { TypedWord } from '../../models/typed-word';
import { TypedWordResult } from '../../models/typed-word-result';

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
    typedResults: TypedWordResult[] = [];
    avgWpm: number = 0;
    avgAccuracy: number = 0;

    constructor(private _wordListService: WordListService) {}

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

    wordTyped(word: TypedWord): void {
        this.typedResults.push({
            wpm: 60000 / word.duration,
            accuracy: this.calculateAccuracy(this.getCurrentWord(), word.word),
            actualWord: this.getCurrentWord(),
            typedWord: word.word
        });

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
        let wpmTotal = 0;
        let accuracyTotal = 0;

        this.typedResults.forEach(x => {
            wpmTotal += x.wpm;
            accuracyTotal += x.accuracy;
        });

        this.avgWpm = wpmTotal / this.typedResults.length;
        this.avgAccuracy = accuracyTotal / this.typedResults.length;
    }

    private calculateAccuracy(word: string, typedWord: string): number {
        let numCorrect = 0;
        for (let i = 0; i < typedWord.length; i++) {
            if (word.length > i) {
                if (word.charAt(i) === typedWord.charAt(i)) { numCorrect++; }
            }
        }

        return numCorrect / Math.max(word.length, typedWord.length);
    }

    private getRandomNumber(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1));
    }

    private loadWords(): void {
        this._wordListService.getWordList('100mostcommon.txt')
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

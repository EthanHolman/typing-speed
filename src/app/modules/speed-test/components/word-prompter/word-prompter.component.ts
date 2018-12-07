import { Component, OnDestroy, OnInit } from '@angular/core';
import { WordListService } from 'src/app/modules/core/services/word-list.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-word-prompter',
    templateUrl: 'word-prompter.component.html',
    styleUrls: ['word-prompter.component.scss']
})
export class WordPrompterComponent implements OnInit, OnDestroy {
    private _unsubscribe = new Subject<void>();
    words: string[] = [];
    lines: any[] = [[], [], []];

    constructor(private _wordListService: WordListService) {}

    ngOnInit(): void {
        this.loadWords();
    }

    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }

    getNextWord(): string {
        return this.words[this.getRandomNumber(0, this.words.length - 1)];
    }

    private getRandomNumber(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + 1;
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

    private onWordsLoaded(): void {
        // Load up lines with random words (don't put too many per line)
        for (let i = 0; i < this.lines.length; i++) {
            let wordLength = 0;
            while (wordLength < 25) {
                const word = this.getNextWord();
                this.lines[i].push(word);
                wordLength += word.length;
            }
        }
    }
}

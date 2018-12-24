import { Component } from '@angular/core';
import { SpeedTestService } from '../../services/speed-test.service';

@Component({
    selector: 'app-word-prompter',
    templateUrl: 'word-prompter.component.html',
    styleUrls: ['word-prompter.component.scss']
})
export class WordPrompterComponent {
    get lines(): any[] { return this._speedTestService.lines; }
    get currentWord(): string { return this._speedTestService.getCurrentWord(); }

    constructor(private _speedTestService: SpeedTestService) { }

    getWordClass(lineIndex, wordIndex): string {
        const currentWord = lineIndex === 0 && wordIndex === this._speedTestService.currentWordIndex;
        if (!currentWord) return '';

        let curWordInvalid = false;
        const curWord = this._speedTestService.getCurrentWord();
        const curVal = this._speedTestService.currentTypedVal;
        for (let i = 0; i < curVal.length; i++) {
            if (curVal.charAt(i) !== curWord.charAt(i)) { curWordInvalid = true; }
        }

        return (curWordInvalid) ? 'word-invalid' : 'current-word';
    }

    currentWordError(): boolean {
        const curWord = this._speedTestService.getCurrentWord();
        const curVal = this._speedTestService.currentTypedVal;
        for (let i = 0; i < curVal.length; i++) {
            if (curVal.charAt(i) !== curWord.charAt(i)) { return true; }
        }

        return false;
    }
}

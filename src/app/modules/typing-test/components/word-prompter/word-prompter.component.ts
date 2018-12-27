import { Component } from '@angular/core';
import { TypingTestService } from '../../services/typing-test.service';

@Component({
    selector: 'app-word-prompter',
    templateUrl: 'word-prompter.component.html',
    styleUrls: ['word-prompter.component.scss']
})
export class WordPrompterComponent {
    get lines(): any[] { return this._typingTestService.lines; }
    get currentWord(): string { return this._typingTestService.getCurrentWord(); }

    constructor(private _typingTestService: TypingTestService) { }

    getWordClass(lineIndex, wordIndex): string {
        const currentWord = lineIndex === 0 && wordIndex === this._typingTestService.currentWordIndex;
        if (!currentWord) return '';

        let curWordInvalid = false;
        const curWord = this._typingTestService.getCurrentWord();
        const curVal = this._typingTestService.currentTypedVal;
        for (let i = 0; i < curVal.length; i++) {
            if (curVal.charAt(i) !== curWord.charAt(i)) { curWordInvalid = true; }
        }

        return (curWordInvalid) ? 'word-invalid' : 'current-word';
    }

    currentWordError(): boolean {
        const curWord = this._typingTestService.getCurrentWord();
        const curVal = this._typingTestService.currentTypedVal;
        for (let i = 0; i < curVal.length; i++) {
            if (curVal.charAt(i) !== curWord.charAt(i)) { return true; }
        }

        return false;
    }
}

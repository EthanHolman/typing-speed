import { Component } from '@angular/core';
import { TypingTestService } from '../../services/typing-test.service';

@Component({
    selector: 'app-word-input',
    templateUrl: './word-input.component.html',
    styleUrls: ['./word-input.component.scss']
})
export class WordInputComponent {
    currentVal: string = '';
    get timerRunning(): boolean { return this._typingTestService.isTestRunning; }

    constructor(private _typingTestService: TypingTestService) { }

    placeholder(): string {
        return (this.timerRunning) ? '' : 'Begin Typing...';
    }

    onType(): void {
        this._typingTestService.letterTyped(this.currentVal.trim());
    }

    onValueChange(newVal: string): void {
        if (newVal.charAt(newVal.length - 1) === ' ') {
            this._typingTestService.wordTyped(this.currentVal.trim());
            this.currentVal = '';
        }

        this.onType();
    }
}

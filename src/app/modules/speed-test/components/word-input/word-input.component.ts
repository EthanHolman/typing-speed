import { Component } from '@angular/core';
import { SpeedTestService } from '../../services/speed-test.service';

@Component({
    selector: 'app-word-input',
    templateUrl: './word-input.component.html',
    styleUrls: ['./word-input.component.scss']
})
export class WordInputComponent {
    currentVal: string = '';
    get isTimerRunning(): boolean { return this._speedTestService.timer.isTimerRunning(); }

    constructor(private _speedTestService: SpeedTestService) { }

    placeholder(): string {
        return (this.isTimerRunning) ? '' : 'Begin Typing...';
    }

    onType(): void {
        this._speedTestService.letterTyped(this.currentVal.trim());
    }

    onValueChange(newVal: string): void {
        if (newVal.charAt(newVal.length - 1) === ' ') {
            this._speedTestService.wordTyped(this.currentVal.trim());
            this.currentVal = '';
        }

        this.onType();
    }
}

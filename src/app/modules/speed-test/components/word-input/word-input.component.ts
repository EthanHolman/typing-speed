import { Component } from '@angular/core';
import { SpeedTestService } from '../../services/speed-test.service';

@Component({
    selector: 'app-word-input',
    templateUrl: './word-input.component.html',
    styleUrls: ['./word-input.component.scss']
})
export class WordInputComponent {
    currentVal: string = '';
    startedCounter = false;
    startTime: number;
    stopTime: number;

    constructor(private _speedTestService: SpeedTestService) { }

    onType(): void {
        this._speedTestService.letterTyped();
    }

    onValueChange(newVal: string): void {
        this.onType();

        if (!this.startedCounter) {
            this.startTime = Date.now();
            this.startedCounter = true;
        }

        if (newVal.charAt(newVal.length - 1) === ' ') {
            this.stopTime = Date.now();
            this._speedTestService.wordTyped({
                word: this.currentVal.trim(),
                duration: this.stopTime - this.startTime
            });
            this.startTime = Date.now();
            this.currentVal = '';
        }
    }
}

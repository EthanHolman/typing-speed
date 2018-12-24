import { Component } from '@angular/core';
import { SpeedTestService } from '../../services/speed-test.service';

@Component({
    selector: 'app-word-input',
    templateUrl: './word-input.component.html',
    styleUrls: ['./word-input.component.scss']
})
export class WordInputComponent {
    currentVal: string = '';

    constructor(private _speedTestService: SpeedTestService) { }

    onType(): void {
        this._speedTestService.letterTyped();
    }

    onValueChange(newVal: string): void {
        this.onType();

        if (newVal.charAt(newVal.length - 1) === ' ') {
            this._speedTestService.wordTyped(this.currentVal.trim());
            this.currentVal = '';
        }
    }
}

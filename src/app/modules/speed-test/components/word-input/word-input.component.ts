import { Component } from '@angular/core';

@Component({
    selector: 'app-word-input',
    templateUrl: './word-input.component.html',
    styleUrls: ['./word-input.component.scss']
})
export class WordInputComponent {
    currentVal: string = '';

    constructor() {}

    onValueChange(newVal: string): void {
        if (newVal.charAt(newVal.length - 1) === ' ') {
            this.currentVal = '';
        }
    }
}

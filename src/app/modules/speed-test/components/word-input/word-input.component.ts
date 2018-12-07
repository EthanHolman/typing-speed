import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-word-input',
    templateUrl: './word-input.component.html',
    styleUrls: ['./word-input.component.scss']
})
export class WordInputComponent {
    currentVal: string = '';
    @Output() wordComplete = new EventEmitter<string>();

    constructor() { }

    onValueChange(newVal: string): void {
        if (newVal.charAt(newVal.length - 1) === ' ') {
            this.wordComplete.emit(this.currentVal);
            this.currentVal = '';
        }
    }
}

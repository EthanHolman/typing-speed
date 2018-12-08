import { Component, EventEmitter, Output } from '@angular/core';
import { TypedWord } from '../../models/typed-word';

@Component({
    selector: 'app-word-input',
    templateUrl: './word-input.component.html',
    styleUrls: ['./word-input.component.scss']
})
export class WordInputComponent {
    currentVal: string = '';
    @Output() wordComplete = new EventEmitter<TypedWord>();
    @Output() letterTyped = new EventEmitter<void>();
    startedCounter = false;
    startTime: number;
    stopTime: number;

    constructor() { }

    onType(): void {
        this.letterTyped.emit();
    }

    onValueChange(newVal: string): void {
        this.onType();

        if (!this.startedCounter) {
            this.startTime = Date.now();
            this.startedCounter = true;
        }

        if (newVal.charAt(newVal.length - 1) === ' ') {
            this.stopTime = Date.now();
            this.wordComplete.emit({
                word: this.currentVal.trim(),
                duration: this.stopTime - this.startTime
            });
            this.startTime = Date.now();
            this.currentVal = '';
        }
    }
}

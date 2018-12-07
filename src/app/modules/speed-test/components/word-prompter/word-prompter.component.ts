import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-word-prompter',
    templateUrl: 'word-prompter.component.html',
    styleUrls: ['word-prompter.component.scss']
})
export class WordPrompterComponent {
    @Input() lines: any[];
    @Input() currentWordIndex: number;

    isCurrentWord(val: string): boolean {
        return val === this.lines[0][this.currentWordIndex];
    }
}

import { Component } from '@angular/core';
import { SpeedTestService } from '../../services/speed-test.service';

@Component({
    selector: 'app-word-prompter',
    templateUrl: 'word-prompter.component.html',
    styleUrls: ['word-prompter.component.scss']
})
export class WordPrompterComponent {
    get lines(): any[] { return this._speedTestService.lines; }

    constructor(private _speedTestService: SpeedTestService) { }

    isCurrentWord(lineIndex, wordIndex): boolean {
        return lineIndex === 0 && wordIndex === this._speedTestService.currentWordIndex;
    }
}

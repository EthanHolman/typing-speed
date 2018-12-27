import { Component } from '@angular/core';
import { TypingStats } from '../../models/typing-stats';
import { TypingTestService } from '../../services/typing-test.service';

@Component({
    selector: 'app-typing-statistics-preview',
    templateUrl: './typing-statistics-preview.component.html',
    styleUrls: ['./typing-statistics-preview.component.scss']
})
export class TypingStatisticsPreviewComponent {
    get typingStats(): TypingStats { return this._typingTestService.typingStats; }
    get time(): number { return this._typingTestService.currentTime; }

    constructor(private _typingTestService: TypingTestService) { }
}

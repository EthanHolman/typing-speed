import { Component } from '@angular/core';
import { SpeedTestService } from '../../services/speed-test.service';
import { TypingStats } from '../../models/typing-stats';

@Component({
    selector: 'app-speed-statistics-preview',
    templateUrl: './speed-statistics-preview.component.html',
    styleUrls: ['./speed-statistics-preview.component.scss']
})
export class SpeedStatisticsPreviewComponent {
    get typingStats(): TypingStats { return this._speedTestService.typingStats; }
    get time(): number { return this._speedTestService.timer.counter; }

    constructor(private _speedTestService: SpeedTestService) { }
}

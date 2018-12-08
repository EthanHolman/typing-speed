import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-speed-statistics-preview',
    templateUrl: './speed-statistics-preview.component.html',
    styleUrls: ['./speed-statistics-preview.component.scss']
})
export class SpeedStatisticsPreviewComponent {
    @Input() wordCount: number;
    @Input() mistakeWordCount: number;
    @Input() avgWpm: number;
    @Input() avgAccuracy: number;
}

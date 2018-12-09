import { Component } from '@angular/core';
import { SpeedTestService } from '../../services/speed-test.service';
import { TypingTestMode } from '../../models/typing-test-mode';

@Component({
    selector: 'app-speed-test-selector',
    templateUrl: './speed-test-selector.component.html',
    styleUrls: ['./speed-test-selector.component.scss']
})
export class SpeedTestSelectorComponent {
    tests: TypingTestMode[] = [
        {
            id: 1,
            name: 'Easy',
            description: 'Top 100 common English words',
            textFileName: '100mostcommon.txt'
        },
        {
            id: 2,
            name: 'Normal',
            description: 'Top 300 common English words',
            textFileName: '300mostcommon.txt'
        }
    ];

    get selectedSpeedTestId(): number { return this._speedTestService.selectedSpeedTestId; }

    constructor(private _speedTestService: SpeedTestService) { }
}

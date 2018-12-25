import { Component } from '@angular/core';
import { SpeedTestService } from '../../services/speed-test.service';
import { TypingTestMode } from 'src/app/modules/core/models/typing-test-mode';

@Component({
    selector: 'app-speed-test-selector',
    templateUrl: './speed-test-selector.component.html',
    styleUrls: ['./speed-test-selector.component.scss']
})
export class SpeedTestSelectorComponent {
    get selectedSpeedTest(): TypingTestMode { return this._speedTestService.selectedTest; }
    get tests(): TypingTestMode[] { return this._speedTestService.typingTests; }

    constructor(private _speedTestService: SpeedTestService) { }

    changeTest(testId: number): void {
        this._speedTestService.loadTest(testId);
    }
}

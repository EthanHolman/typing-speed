import { Component, OnInit } from '@angular/core';
import { SpeedTestService } from '../../services/speed-test.service';

@Component({
    selector: 'app-speed-tester',
    templateUrl: './speed-tester.component.html',
    styleUrls: ['./speed-tester.component.scss']
})
export class SpeedTesterComponent implements OnInit {
    get testComplete(): boolean { return this._speedTestService.timer.isComplete; }

    constructor(private _speedTestService: SpeedTestService) { }

    ngOnInit(): void {
        // TODO: load default test from api?
        this._speedTestService.loadTest(2);
    }
}

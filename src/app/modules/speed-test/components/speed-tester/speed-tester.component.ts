import { Component, OnInit } from '@angular/core';
import { SpeedTestService } from '../../services/speed-test.service';

@Component({
    selector: 'app-speed-tester',
    templateUrl: './speed-tester.component.html',
    styleUrls: ['./speed-tester.component.scss']
})
export class SpeedTesterComponent implements OnInit {
    constructor(private _speedTestService: SpeedTestService) { }

    ngOnInit(): void {
        this._speedTestService.reset();
    }
}

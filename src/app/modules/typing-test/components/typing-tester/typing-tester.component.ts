import { Component, OnInit } from '@angular/core';
import { TypingTestService } from '../../services/typing-test.service';

@Component({
    selector: 'app-typing-tester',
    templateUrl: './typing-tester.component.html',
    styleUrls: ['./typing-tester.component.scss']
})
export class TypingTesterComponent implements OnInit {
    get testComplete(): boolean { return this._typingTestService.isTestComplete; }

    constructor(private _typingTestService: TypingTestService) { }

    ngOnInit(): void {
        // TODO: load default test from api?
        this._typingTestService.loadTest(2);
    }
}

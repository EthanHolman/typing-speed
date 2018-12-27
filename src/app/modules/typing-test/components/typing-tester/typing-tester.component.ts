import { Component, OnInit } from '@angular/core';
import { TypingTestService } from '../../services/typing-test.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: './typing-tester.component.html',
    styleUrls: ['./typing-tester.component.scss']
})
export class TypingTesterComponent implements OnInit {
    get testComplete(): boolean { return this._typingTestService.isTestComplete; }

    constructor(private _activatedRoute: ActivatedRoute,
                private _typingTestService: TypingTestService) { }

    ngOnInit(): void {
        // TODO: this should use switchMap like in ng documentation
        this._activatedRoute.params.subscribe((params: Params) => {
            this._typingTestService.loadTest(parseInt(params.id));
        });
    }
}

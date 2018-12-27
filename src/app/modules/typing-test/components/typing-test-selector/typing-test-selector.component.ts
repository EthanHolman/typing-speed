import { Component } from '@angular/core';
import { TypingTestService } from '../../services/typing-test.service';
import { TypingTestMode } from 'src/app/modules/core/models/typing-test-mode';

@Component({
    selector: 'app-typing-test-selector',
    templateUrl: './typing-test-selector.component.html',
    styleUrls: ['./typing-test-selector.component.scss']
})
export class TypingTestSelectorComponent {
    get tests(): TypingTestMode[] { return this._typingTestService.typingTests; }

    constructor(private _typingTestService: TypingTestService) { }
}

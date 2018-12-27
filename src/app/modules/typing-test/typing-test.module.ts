import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TypingTestRoutingModule } from './typing-test-routing.module';
import { TypingTestPageComponent } from './components/typing-test-page/typing-test-page.component';
import { TypingTesterComponent } from './components/typing-tester/typing-tester.component';
import { WordPrompterComponent } from './components/word-prompter/word-prompter.component';
import { WordInputComponent } from './components/word-input/word-input.component';
import { TypingStatisticsPreviewComponent } from './components/typing-statistics-preview/typing-statistics-preview.component';
import { TypingTestSelectorComponent } from './components/typing-test-selector/typing-test-selector.component';
import { TypingTestService } from './services/typing-test.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TypingTestRoutingModule
    ],
    exports: [],
    declarations: [
        TypingTestPageComponent,
        TypingTesterComponent,
        WordPrompterComponent,
        WordInputComponent,
        TypingStatisticsPreviewComponent,
        TypingTestSelectorComponent
    ],
    providers: [
        TypingTestService,
    ]
})
export class TypingTestModule {}

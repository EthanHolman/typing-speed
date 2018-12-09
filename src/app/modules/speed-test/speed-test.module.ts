import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpeedTestPageComponent } from './components/speed-test-page/speed-test-page.component';
import { WordPrompterComponent } from './components/word-prompter/word-prompter.component';
import { SpeedTestRoutingModule } from './speed-test-routing.module';
import { CommonModule } from '@angular/common';
import { WordInputComponent } from './components/word-input/word-input.component';
import { SpeedTestService } from './services/speed-test.service';
import { SpeedTesterComponent } from './components/speed-tester/speed-tester.component';
import { SpeedStatisticsPreviewComponent } from './components/speed-statistics-preview/speed-statistics-preview.component';
import { SpeedTestSelectorComponent } from './components/speed-test-selector/speed-test-selector.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SpeedTestRoutingModule
    ],
    exports: [],
    declarations: [
        SpeedTestPageComponent,
        SpeedTesterComponent,
        WordPrompterComponent,
        WordInputComponent,
        SpeedStatisticsPreviewComponent,
        SpeedTestSelectorComponent
    ],
    providers: [
        SpeedTestService,
    ]
})
export class SpeedTestModule {}

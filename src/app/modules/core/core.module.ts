import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WordListService } from './services/word-list.service';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [WordListService]
})
export class CoreModule {}

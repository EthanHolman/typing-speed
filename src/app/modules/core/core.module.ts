import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WordListApiService } from './services/word-list-api.service';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [WordListApiService]
})
export class CoreModule { }

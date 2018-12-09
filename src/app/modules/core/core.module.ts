import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { WordListApiService } from './services/word-list-api.service';
import { WordLoaderService } from './services/word-loader.service';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: [
        WordListApiService,
        WordLoaderService,
    ]
})
export class CoreModule { }

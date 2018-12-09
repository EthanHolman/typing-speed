import { Injectable } from '@angular/core';
import { WordListApiService } from './word-list-api.service';

@Injectable()
export class WordLoaderService {
    constructor(private _WordListApiService: WordListApiService) { }
}

import { Injectable } from '@angular/core';
import { WordLoaderService } from '../../core/services/word-loader.service';

@Injectable()
export class SpeedTestService {
    constructor(private _wordLoader: WordLoaderService) { }
}

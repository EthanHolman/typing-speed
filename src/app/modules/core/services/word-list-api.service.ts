import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { WordMode } from '../enums/word-mode.enum';

@Injectable()
export class WordListApiService {
    constructor(private _http: HttpClient) {}
    getWordLists(): Observable<string[]> {
        return of([
            '100mostcommon.txt'
        ]);
    }

    getWordList(name: string, wordMode: WordMode): Observable<string[]> {
        const delimiter = (wordMode === WordMode.Standard) ? ' ' : ',';
        
        return this._http.get(`${environment.apiPath}/assets/text-files/${name}`, {responseType: 'text'})
        .pipe(map((data: string) => {
            return data.split(delimiter);
        }));
    }
}

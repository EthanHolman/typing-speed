import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TypingTestMode } from '../models/typing-test-mode';
import { WordMode } from '../enums/word-mode.enum';

@Injectable()
export class TypingTestApiService {
    getTypingTests(): Observable<TypingTestMode[]> {
        const tests: TypingTestMode[] = [
            {
                id: 1,
                name: 'Easy',
                wordMode: WordMode.Random,
                description: 'Top 100 common English words',
                textFileName: '100mostcommon.txt',
                timeLimit: 60
            },
            {
                id: 2,
                name: 'Normal',
                wordMode: WordMode.Random,
                description: 'Top 300 common English words',
                textFileName: '300mostcommon.txt',
                timeLimit: 60
            },
            {
                id: 3,
                name: 'Quick Brown Fox',
                wordMode: WordMode.Standard,
                description: 'Regular text',
                textFileName: 'quickbrownfox.txt',
                timeLimit: -1
            }
        ];

        return of(tests);
    }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TypingTestMode } from '../models/typing-test-mode';

@Injectable()
export class TypingTestApiService {
    getTypingTests(): Observable<TypingTestMode[]> {
        const tests: TypingTestMode[] = [
            {
                id: 1,
                name: 'Easy',
                description: 'Top 100 common English words',
                textFileName: '100mostcommon.txt'
            },
            {
                id: 2,
                name: 'Normal',
                description: 'Top 300 common English words',
                textFileName: '300mostcommon.txt'
            }
        ];

        return of(tests);
    }
}

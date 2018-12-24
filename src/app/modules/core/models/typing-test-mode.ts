import { WordMode } from '../enums/word-mode.enum';

export class TypingTestMode {
    id: number;
    name: string;
    wordMode: WordMode;
    description: string;
    textFileName: string;
    timeLimit: number;
}

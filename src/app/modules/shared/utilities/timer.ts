import { Observable, interval, Subscription, Subject } from 'rxjs';

export class Timer {
    private _timer: Observable<number>;
    private _subscription: Subscription;
    private _duration: number = -1;
    private _counter: number = -1;
    private _isComplete: boolean = false;
    complete: Subject<void> = new Subject<void>();
    tick: Subject<void> = new Subject<void>();
    get counter(): number { return this._counter; }
    get duration(): number { return this._duration; }
    get isComplete(): boolean { return this._isComplete; }

    constructor(duration: number, tickInterval?: number) {
        this._timer = interval(tickInterval || 1000);
        this._subscription = undefined;
        this._duration = duration;
        this.reset();
    }

    reset(newDuration?: number): void {
        this.stop();
        this._isComplete = false;
        if (newDuration) { this._duration = newDuration; }
        this._counter = this._duration;
    }

    isTimerRunning(): boolean {
        return (!!this._subscription);
    }

    start(): void {
        this._subscription = this._timer.subscribe(x => {
            this.onTick();
        });
    }

    stop(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
            this._subscription = undefined;
        }
    }

    private onTick(): void {
        this.tick.next();

        if (this._counter === 0) {
            this.stop();
            this._isComplete = true;
            this.complete.next();
        } else {
            this._counter--;
        }
    }
}

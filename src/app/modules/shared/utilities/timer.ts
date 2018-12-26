import { Observable, interval, Subscription, Subject } from 'rxjs';

enum TimerMode {
    CountDown, // Provide a duration greater than 0
    CountUp    // Provide a duration of -1
}

export class Timer {
    private _timer: Observable<number>;
    private _subscription: Subscription = undefined;
    private _duration: number;
    private _counter: number;
    private _isComplete: boolean;
    private _timerMode: TimerMode;
    complete: Subject<void> = new Subject<void>();
    tick: Subject<void> = new Subject<void>();
    get counter(): number { return this._counter; }
    get duration(): number { return this._duration; }
    get isComplete(): boolean { return this._isComplete; }
    get isRunning(): boolean { return (!!this._subscription); }

    constructor(duration: number) {
        this._timer = interval(1000);
        this.reset(duration);
    }

    reset(newDuration?: number): void {
        this.stop();
        this._isComplete = false;
        if (newDuration) {
            if (newDuration < 0) {
                this._duration = 0;
                this._timerMode = TimerMode.CountUp;
            } else {
                this._duration = newDuration;
                this._timerMode = TimerMode.CountDown;
            }
        }
        this._counter = this._duration;
    }

    start(): void {
        this._subscription = this._timer.subscribe(x => this.onTick());
    }

    stop(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
            this._subscription = undefined;
        }
    }

    private onTick(): void {
        this.tick.next();

        if (this._timerMode === TimerMode.CountDown) {
            if (this._counter === 0) {
                this.stop();
                this._isComplete = true;
                this.complete.next();
            } else {
                this._counter--;
            }
        } else {
            this._counter++;
        }
    }
}

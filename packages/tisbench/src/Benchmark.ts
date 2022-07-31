import { performance } from 'perf_hooks';
import { green, bold } from 'picocolors';
export interface Result {
    times: number[];
    first?: number;
    last?: number;
    average?: number;
    name: string;
}
export interface Options {
    name: string;
    functionToTest: (...args: any[]) => any;
    log?: boolean;
    length?: number;
    args?: any[];
}
export class Benchmark {
    function: (...any) => any;
    length?: number;
    args?: any[];
    name: string;
    result: Result;
    log?: boolean;
    constructor(options: Options) {
        this.function = options.functionToTest;
        this.args = options.args;
        this.length = options.length || 60;
        this.name = options.name;
        this.log = options.log;
        this.result = { times: [], name: this.name };
    }
    _getTimesToRun() {
        const a = performance.now();
        this.function(...(this.args || []));
        const b = performance.now();
        this.result.times.push(b - a);
        // we change the length to seconds + 50ms per second because my calculations are terrible so we want to account for that
        return Math.max(Math.round((this.length * 1050) / (b - a)), 3);
    }
    async _runNTimes(n: number) {
        for (let i = 0; i < n; i++) {
            const a = performance.now();
            await this.function(...(this.args || []));
            const b = performance.now();
            const time = b - a;
            if (i === 0) {
                this.result.first = time;
            }
            this.result.times.push(time);
        }
        this.result.last = this.result.times.at(-1);
        this.result.average = this.result.times.reduce((a, b) => a + b) / this.result.times.length;
        if (this.log) this._log();
    }
    _log() {
        console.log(
            `${green(bold(this.name))}
Average time: ${this.result.average.toFixed(2)}ms
Slowest time: ${Math.max(...this.result.times).toFixed(2)}ms
Fastest time: ${Math.min(...this.result.times).toFixed(2)}ms
Amount of runs: ${this.result.times.length}`
        );
    }
    async run() {
        const n = this._getTimesToRun();
        await this._runNTimes(n - 1);
        return this.result;
    }
}

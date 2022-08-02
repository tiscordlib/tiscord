import { Result } from './Benchmark';
import { green, red, bold } from 'picocolors';
export async function compare(first: Result, second: Result) {
    const char = '▇';
    const speedArray = [first, second].sort((a, b) => a.average - b.average);
    const fasterCharCount = Math.floor((speedArray[0].average / speedArray.at(1).average) * 20);
    const slowerChar = char.repeat(20);
    const fasterChar = char.repeat(fasterCharCount);
    const longerName = speedArray[0].name.length > speedArray.at(1).name.length ? 0 : 1;
    const padding = ' '.repeat(speedArray.at(longerName).name.length - speedArray.at(1 - longerName).name.length);
    const charPadding = ' '.repeat(19 - fasterCharCount);
    console.log(`Comparing ${green(bold(speedArray[0].name))} to ${red(bold(speedArray[1].name))}\n`);
    console.log(
        `${bold(green(speedArray[0].name))}${
            longerName === 0 ? '' : padding
        } ${fasterChar} ${charPadding} ${speedArray[0].average.toFixed(2)}ms 
${bold(red(speedArray[1].name))}${longerName === 1 ? '' : padding} ${slowerChar} ${speedArray[1].average.toFixed(2)}ms`
    );
}

/* 命令空间 */
namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean
    }

    const lettersRegexp = /^[A-Za-z]+$/
    const numberRegexp  = /^[0-9]+$/

    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s: string) {
            return lettersRegexp.test(s)
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string) {
            return s.length === 5 && numberRegexp.test(s)
        }
    }
}

let validators: { [s: string]: Validation.StringValidator } = {}
validators["Letters only"] = new Validation.LettersOnlyValidator()


export {}
import path from "path";

const ROOT = path.resolve(__dirname, "..");
const SUBSITENAME = ""; // '/Subsite'

export function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    const result = path.join.apply(path, [ROOT].concat(args));
    return result;
}

export function subsite(arg) {
    if (arg[0] != "/") {
        arg = "/" + arg;
    }
    return SUBSITENAME.concat(arg);
}

export enum IndexConfig {
    Client = 0,
    Server = 1
}

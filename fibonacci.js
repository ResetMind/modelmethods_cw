const e = 0.001;
let fibList = new Array();

function getMin(a, b) {
    let n = (b - a) / e;
    getFibList(n);
    let y_res = 0, x_res = 0;
    for (let k = 2; k <= fibList.length; k++) {
        let x1 = b - fibList[fibList.length - k] * (b - a) / fibList[fibList.length - k + 1];
        let x2 = a + fibList[fibList.length - k] * (b - a) / fibList[fibList.length - k + 1];
        let l1 = getConcStat(x1).l;
        let l2 = getConcStat(x2).l;
        let y1 = l1[l1.length - 1];
        let y2 = l2[l2.length - 1];
        if (y1 < y2) {
            x_res = x1;
            y_res = y1;
            b = x2;
        } else {
            x_res = x2;
            y_res = y2;
            a = x1;
        }
    }
    return [x_res, y_res];
}

function getFibList(n) {
    let f0 = 1, f1 = 1;
    fibList.push(f0);
    fibList.push(f1);
    do {
        if (n > fibList[fibList.length - 2] && n < fibList[fibList.length - 1]) {
            break;
        }
        fibList.push(fibList[fibList.length - 2] + fibList[fibList.length - 1]);
    } while (true);
}
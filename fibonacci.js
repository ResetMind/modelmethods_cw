const e = 0.001;
let fibList = new Array();

function getMin(a, b) {
    let n = (b - a) / e;
    getFibList(n);
    let x1 = b - fibList[fibList.length - 2] * (b - a) / fibList[fibList.length - 1];
    let x2 = a + fibList[fibList.length - 2] * (b - a) / fibList[fibList.length - 1];
    let l1 = getConcStat(x1).l;
    let l2 = getConcStat(x2).l;
    let y1 = l1[l1.length - 1];
    let y2 = l2[l2.length - 1];
    /*let y1 = s(x1);
    let y2 = s(x2);*/
    for (let k = 3; k <= fibList.length; k++) {
        if (y1 < y2) {
            b = x2;
            x2 = x1;
            y2 = y1;
            x1 = b - fibList[fibList.length - k] * (b - a) / fibList[fibList.length - k + 1];
            l1 = getConcStat(x1).l;
            y1 = l1[l1.length - 1];
            //y1 = s(x1);
        } else {
            a = x1;
            x1 = x2;
            y1 = y2;
            x2 = a + fibList[fibList.length - k] * (b - a) / fibList[fibList.length - k + 1];
            l2 = getConcStat(x2).l;
            y2 = l2[l2.length - 1];
            //y2 = s(x2);
        }
    }
    let x_res, y_res;
    if(y1 < y2) {
        x_res = x1;
        y_res = y1;
    } else {
        x_res = x2;
        y_res = y2;
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
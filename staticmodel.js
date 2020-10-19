const a1 = 2000;
const a2 = 70000;
const a3 = 7000;
const e1 = Math.pow(10, 5);
const e2 = 135000;
const e3 = 97000;
const ro = 1.8;
const u = 0.1;
const r = 8.31;
const delta_l = 0.001;
const m1 = 0.06005; // кг/моль
const m2 = 0.0420367; // кг/моль
const m3 = 0.01801528; // кг/моль
const m4 = 0.10209; // кг/моль

function getConcStat(t) {
    let c1_list = new Array();
    let c2_list = new Array();
    let c3_list = new Array();
    let c4_list = new Array(); 
    let l_list = new Array();
    let c1 = toMole(100, m1);
    let c2 = 0;
    let c3 = 0;
    let c4 = 0;
    c1_list.push(fromMole(c1, m1));
    c2_list.push(fromMole(c2, m2));
    c3_list.push(fromMole(c3, m3));
    c4_list.push(fromMole(c4, m4));
    l_list.push(0);
    for (let l = delta_l; ; l += delta_l) {
        let c3_old = c3;
        let c2_old = c2;
        let c1_old = c1;
        c4 = get_c4(c1_old, c2_old, c4, t);
        c3 = get_c3(c1_old, c2_old, c3_old, t);
        c2 = get_c2(c1_old, c2_old, c3_old, t);
        c1 = get_c1(c1_old, c2_old, c3_old, t);
        c1_list.push(fromMole(c1, m1));
        c2_list.push(fromMole(c2, m2));
        c3_list.push(fromMole(c3, m3));
        c4_list.push(fromMole(c4, m4));
        l_list.push(l);
        if (c4_list[c4_list.length - 1] >= 70) {
            break;
        }
    }

    return res = {
        c1: c1_list, 
        c2: c2_list, 
        c3: c3_list, 
        c4: c4_list, 
        l: l_list
    };
}

function get_c1(c1_old, c2_old, c3_old, t) {
    return c1_old + delta_l * (-k1(t) * c1_old + k2(t) * c2_old * c3_old - k3(t) * c1_old * c2_old) / u;
}

function get_c2(c1_old, c2_old, c3_old, t) {
    return c2_old + delta_l * (-k2(t) * c2_old * c3_old + k1(t) * c1_old - k3(t) * c1_old * c2_old) / u;
}

function get_c3(c1_old, c2_old, c3_old, t) {
    return c3_old + delta_l * (k1(t) * c1_old - k2(t) * c2_old * c3_old) / u;
}

function get_c4(c1_old, c2_old, c4_old, t) {
    return c4_old + delta_l * (k3(t) * c2_old * c1_old) / u;
}

function k1(t) {
    return a1 * Math.exp(-e1 / r / t);
}

function k2(t) {
    return a2 * Math.exp(-e2 / r / t);
}

function k3(t) {
    return a3 * Math.exp(-e3 / r / t);
}

function fromMole(c, m) {
    return 100 * m * c / ro;
}

function toMole(c, m) {
    return c * ro / 100 / m;
}

function s(x) {
    return Math.pow(x, 3) - 15 * x * x + 63 * x + 12;
}
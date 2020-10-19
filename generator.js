const lambda1 = Math.pow(5, 10);
const lambda2 = Math.pow(3, 9);
const m0 = 20;
const sigma0 = 4;
const alpha0 = 0.06;
const n = 200;
const A1 = 7.98,
    A2 = 12.43;

/*const lambda1 = Math.pow(5, 10);
const lambda2 = Math.pow(3, 9);
const m0 = 250;
const sigma0 = 3600;
const alpha0 = 0.15;
const n = 200;
const A1 = 1, A2 = 1;*/
function generate() {
    let xi = getX();
    let mx = m(xi);
    let sigmax = sigma(xi, mx);
    let zi = getZ();
    let mz = m(zi);
    let sigmaz = sigma(zi, mz);
    let ks = getK();
    let alphaz = getAlpha(ks[0]);
    /*let offset_m = Math.abs(100 - 100 * mz / m0);
    let offset_s = Math.abs(100 - 100 * sigmaz / sigma0);
    let offset_a = Math.abs(100 - 100 * alphaz / alpha0);
    console.log(offset_m + " " + offset_s + " " + offset_a);*/
    let exp = getExp();
    console.log(m0 + " " + sigma0 + " " + alpha0);
    console.log(mz + " " + sigmaz + " " + alphaz);

    function getX() {
        let x_temp = 1;
        let xi = [];
        xi.push(x_temp / lambda2 - 0.5);
        for (let i = 1; i < n; i++) { // 200 значений х
            x_temp = (lambda1 * x_temp) % lambda2;
            xi.push(x_temp / lambda2 - 0.5);
        }
        return xi;
    }

    function getZ() {
        let zi = [];
        const ns = 10;
        for (let k = 0; k < n - ns; k++) { // 200 - ns значений z
            let zk = 0;
            for (let i = k; i < k + ns; i++) {
                zk += (xi[i] * Math.sqrt(sigma0 / (sigmax * alpha0 * A2)) *
                    A1 * Math.exp(-A2 * alpha0 * (i - k)));
            }
            zk = zk / ns + m0;
            zi.push(zk);
        }
        return zi;
    }

    function getK() {
        let ks = [];
        for (let s = 0; s < 20; s++) {
            let k = 0;
            for (let i = 0; i < zi.length - s; i++) {
                k += (zi[i] - mz) * (zi[s + i] - mz);
            }
            k /= (zi.length - s);
            ks.push(k);
        }
        return ks;
    }

    function getAlpha(sigmas) {
        let alphaz = 0;
        let delta0 = 0,
            delta1 = 0;
        for (let s = 0; s < 20; s++) {
            delta0 += Math.abs(sigmas * Math.exp(-alphaz * s) - ks[s]);
        }
        delta1 = delta0;
        do {
            alphaz += 0.01;
            delta0 = delta1;
            delta1 = 0;
            for (let s = 0; s < 20; s++) {
                delta1 += Math.abs(sigmas * Math.exp(-alphaz * s) - ks[s]);
            }
        } while (delta1 < delta0);
        return alphaz;
    }

    function getExp() {
        let exp = [];
        for (let s = 0; s < ks.length; s++) {
            exp.push(sigmaz * Math.exp(-alphaz * s));
        }
        return exp;
    }

    return res = {
        mx: mx.toFixed(6),
        sigmax: sigmax.toFixed(6),
        mz: mz.toFixed(6),
        sigmaz: sigmaz.toFixed(6),
        alphaz: alphaz.toFixed(6),
        xi: xi,
        zi: zi,
        ks: ks,
        exp: exp
    };
}

function m(arr) {
    let m = 0;
    arr.forEach(a => { m += a; });
    m /= arr.length;
    return m;
}

function sigma(arr, m) {
    let sigma = 0;
    arr.forEach(a => { sigma += Math.pow(a - m, 2); });
    sigma /= arr.length;
    return sigma;
}
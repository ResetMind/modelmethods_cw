let c1_tau, T, L, k1_t, k2_t, k3_t, x = [], y = [], z4 = [], y_slice = [], z4_slice = [];
const delta_a = 0.3, delta_b = 0.2;

function getConcDin() {
    let tau_max = c1_tau.length - 1;
    k1_t = k1(T);
    k2_t = k2(T);
    k3_t = k3(T);
    let tau_s = L / u;
    let alpha, alpha_max;
    let beta = -tau_s / 2;
    let beta_max = 0;
    while (beta <= beta_max) {
        alpha = -beta;
        alpha_max = beta + tau_s
        c1 = get_c14_l();
        c2 = get_c14_l();
        c3 = get_c14_l();
        c4 = get_c14_l();
        addToMesh(get_l(alpha, beta), get_tau(alpha, beta), fromMole(c4, m4));
        while (alpha <= alpha_max) {
            c3_old = c3;
            c2_old = c2;
            c1_old = c1;
            c4 = get_c4_din(c1_old, c2_old, c4);
            c3 = get_c3_din(c1_old, c2_old, c3_old);
            c2 = get_c2_din(c1_old, c2_old, c3_old);
            c1 = get_c1_din(c1_old, c2_old, c3_old);
            addToMesh(get_l(alpha, beta), get_tau(alpha, beta), fromMole(c4, m4));
            alpha += delta_a;
        }
        beta += delta_b;
        addToSlice(get_tau(alpha, beta), fromMole(c4, m4));
    }
    beta = 0;
    beta_max = (tau_max - tau_s) / 2;
    while (beta <= beta_max) {
        alpha = beta
        alpha_max = beta + tau_s
        c1 = get_c1_tau(Math.round(2 * beta));
        c2 = get_c24_tau();
        c3 = get_c24_tau();
        c4 = get_c24_tau();
        addToMesh(get_l(alpha, beta), get_tau(alpha, beta), fromMole(c4, m4));
        while (alpha <= alpha_max) {
            c3_old = c3;
            c2_old = c2;
            c1_old = c1;
            c4 = get_c4_din(c1_old, c2_old, c4);
            c3 = get_c3_din(c1_old, c2_old, c3_old);
            c2 = get_c2_din(c1_old, c2_old, c3_old);
            c1 = get_c1_din(c1_old, c2_old, c3_old);
            addToMesh(get_l(alpha, beta), get_tau(alpha, beta), fromMole(c4, m4));
            alpha += delta_a;
        }
        beta += delta_b;
        addToSlice(get_tau(alpha, beta), fromMole(c4, m4));
    }
    beta = (tau_max - tau_s) / 2;
    beta_max = tau_max / 2;
    while (beta < beta_max) {
        alpha = beta;
        alpha_max = -beta + tau_max;
        c1 = get_c1_tau(Math.round(2 * beta));
        c2 = get_c24_tau();
        c3 = get_c24_tau();
        c4 = get_c24_tau();
        addToMesh(get_l(alpha, beta), get_tau(alpha, beta), fromMole(c4, m4));
        while (alpha <= alpha_max) {
            c3_old = c3;
            c2_old = c2;
            c1_old = c1;
            c4 = get_c4_din(c1_old, c2_old, c4);
            c3 = get_c3_din(c1_old, c2_old, c3_old);
            c2 = get_c2_din(c1_old, c2_old, c3_old);
            c1 = get_c1_din(c1_old, c2_old, c3_old);
            addToMesh(get_l(alpha, beta), get_tau(alpha, beta), fromMole(c4, m4));
            alpha += delta_a;
        }
        beta += delta_b;
        addToSlice(get_tau(alpha, beta), fromMole(c4, m4));
    }
    return [x, y, z4, y_slice, z4_slice];
}

function get_c1_din(c1_old, c2_old, c3_old) {
    return c1_old + delta_a * (-k1_t * c1_old + k2_t * c2_old * c3_old - k3_t * c1_old * c2_old);
}

function get_c2_din(c1_old, c2_old, c3_old) {
    return c2_old + delta_a * (-k2_t * c2_old * c3_old + k1_t * c1_old - k3_t * c1_old * c2_old);
}

function get_c3_din(c1_old, c2_old, c3_old) {
    return c3_old + delta_a * (k1_t * c1_old - k2_t * c2_old * c3_old);
}

function get_c4_din(c1_old, c2_old, c4_old) {
    return c4_old + delta_a * (k3_t * c2_old * c1_old);
}

function get_c1_tau(tau) { //c1(tau, 0)
    return c1_tau[tau];
}

function get_c24_tau() { //c2-4(tau, 0)
    return 0;
}

function get_c14_l() { //c1-4(0, l)
    return 0;
}

function get_l(alpha, beta) {
    return u * (alpha - beta);
}

function get_tau(alpha, beta) {
    return alpha + beta;
}

function addToMesh(x_, y_, z4_) {
    x.push(x_);
    y.push(y_);
    z4.push(z4_);
}

function addToSlice(y_, z4_) {
    y_slice.push(y_);
    z4_slice.push(z4_);
}
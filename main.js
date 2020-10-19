let content = document.querySelectorAll(".content");
content[0].style.display = "block";
let content_c = document.querySelectorAll(".content_c");
content_c[0].style.display = "block";
let content_im = document.querySelectorAll(".content_im");
content_im[0].style.display = "block";
let radios_main = document.querySelectorAll(".tabs_main input[type=\"radio\"]");
let radios_cnt1 = document.querySelectorAll(".tabs_content1 input[type=\"radio\"]");
let radios_cnt2 = document.querySelectorAll(".tabs_content2 input[type=\"radio\"]");
let c_chart = document.querySelectorAll(".c_chart");
let im_chart = document.querySelectorAll(".im_chart");
let selected_content = content_c[0];
let selected_chart = c_chart[0];
let span_min = document.querySelector(".min");
let span_mx = document.querySelector(".mx");
let span_sx = document.querySelector(".sx");
let span_mz = document.querySelector(".mz");
let span_sz = document.querySelector(".sz");
let span_az = document.querySelector(".az");
const t1 = 920; //K
const t2 = 1060;
let data_c1_s = [], data_c2_s = [], data_c3_s = [], data_c4_s = [],
    data_c1_d = [], data_c2_d = [], data_c3_d = [], data_c4_d = [],
    data_xi = [], data_zi = [], data_ks = [];
radioOnCheck();
createStaticCharts();
getLTMin();
createGeneratorCharts();
createDinamicCharts();

function createStaticCharts() {
    for (let t = t1; t <= t2; t += 20) {
        let res = getConcStat(t);
        data_c1_s = addToData(data_c1_s, res.l, res.c1, null, t, false);
        data_c2_s = addToData(data_c2_s, res.l, res.c2, null, t, false);
        data_c3_s = addToData(data_c3_s, res.l, res.c3, null, t, false);
        data_c4_s = addToData(data_c4_s, res.l, res.c4, null, t, false);
    }
    Plotly.newPlot(c_chart[0], data_c1_s, set2DLayout("C1(l)", "l", "C1", content_c[0]), { scrollZoom: true, responsive: true });
    Plotly.newPlot(c_chart[1], data_c2_s, set2DLayout("C2(l)", "l", "C2", content_c[1]), { scrollZoom: true, responsive: true });
    Plotly.newPlot(c_chart[2], data_c3_s, set2DLayout("C3(l)", "l", "C3", content_c[2]), { scrollZoom: true, responsive: true });
    Plotly.newPlot(c_chart[3], data_c4_s, set2DLayout("C4(l)", "l", "C4", content_c[3]), { scrollZoom: true, responsive: true });
}

function getLTMin() {
    [T, L] = getMin(t1, t2);
    span_min.innerHTML = "T=" + T + " K; L=" + L + " м.";
}

function createGeneratorCharts() {
    let res = generate();
    span_mx.innerHTML = res.mx;
    span_sx.innerHTML = res.sigmax;
    span_mz.innerHTML = res.mz;
    span_sz.innerHTML = res.sigmaz;
    span_az.innerHTML = res.alphaz;
    data_xi = addToData(data_xi, [...range(0, res.xi.length)], res.xi, null, "x(i)", false);
    data_zi = addToData(data_zi, [...range(0, res.zi.length)], res.zi, null, "z(i)", false);
    data_ks = addToData(data_ks, [...range(0, res.ks.length)], res.ks, null, "k(s)", false);
    data_ks = addToData(data_ks, [...range(0, res.exp.length)], res.exp, null, "exp", false);
    Plotly.newPlot(im_chart[0], data_xi, set2DLayout("x(i)", "i", "x", content_im[0]), { scrollZoom: true, responsive: true });
    Plotly.newPlot(im_chart[1], data_zi, set2DLayout("z(i)", "i", "z", content_im[1]), { scrollZoom: true, responsive: true });
    Plotly.newPlot(im_chart[2], data_ks, set2DLayout("K(S)", "S", "K", content_im[2]), { scrollZoom: true, responsive: true });
    c1_tau = res.zi;
}

function createDinamicCharts() {
    data_c1_d = addToData(data_c1_d, a, b, c, null, true);
    Plotly.newPlot(im_chart[3], data_c1_d, set3DLayout("C1(tau, l)", "l",  "tau", "C1", content_im[0]));*/
    let [l, tau, c1, c2, c3, c4] = getConcDin();
    data_c1_d = addToData(data_c1_d, l, tau, c1, null, true);
    Plotly.newPlot(im_chart[3], data_c1_d, set3DLayout("C1(tau, l)", "l",  "tau", "C1", content_im[0]));
    data_c2_d = addToData(data_c2_d, l, tau, c2, null, true);
    Plotly.newPlot(im_chart[4], data_c2_d, set3DLayout("C2(tau, l)", "l",  "tau", "C2", content_im[0]));
    data_c3_d = addToData(data_c3_d, l, tau, c3, null, true);
    Plotly.newPlot(im_chart[5], data_c3_d, set3DLayout("C3(tau, l)", "l",  "tau", "C3", content_im[0]));
    data_c4_d = addToData(data_c4_d, l, tau, c4, null, true);
    Plotly.newPlot(im_chart[6], data_c4_d, set3DLayout("C4(tau, l)", "l",  "tau", "C4", content_im[0]));
}

function addToData(data, x, y, z, name, mesh) {
    let trace;
    if (!mesh) {
        trace = { x: x, y: y, type: "scatter", mode: "lines", name: name };
    } else {
        trace = { x: x, y: y, z: z, type: "mesh3d", intensity: z, colorscale: "Bluered" };
    }
    data.push(trace);
    return data;
}

function set2DLayout(title, x_title, y_title, content) {
    return {
        autosize: false,
        height: content.clientHeight,
        width: content.clientWidth,
        showlegend: true,
        title: title,
        xaxis: { title: x_title },
        yaxis: { title: y_title }
    };
}

function set3DLayout(title, x_title, y_title, z_title, content) {
    return {
        autosize: false,
        height: content.clientHeight,
        width: content.clientWidth,
        showlegend: true,
        title: title,
        scene: {
            xaxis: { title: x_title },
            yaxis: { title: y_title },
            zaxis: { title: z_title }
        }
    };
}

function updateLayout(content, chart) {
    for (let i = 0; i < content.length; i++) {
        if (content[i].clientHeight == 0) {
            continue;
        }
        let update = {
            height: content[i].clientHeight,
            width: content[i].clientWidth
        };
        Plotly.relayout(chart[i], update);
    }

}

function range(from, to, step = 1) {
    return {
        *[Symbol.iterator]() {
            for (let val = from; val < to; val += step) {
                yield val;
            }
        }
    }
}

function radioOnCheck() {
    for (let i = 0; i < radios_main.length; i++) {
        radios_main[i].addEventListener("change", function () {
            content.forEach(elem => { elem.style.display = "none"; });
            content[i].style.display = "block";
            updateLayout(content_c, c_chart);
            updateLayout(content_im, im_chart);
        });
    }
    for (let i = 0; i < radios_cnt1.length; i++) {
        radios_cnt1[i].addEventListener("change", function () {
            content_c.forEach(elem => { elem.style.display = "none"; });
            content_c[i].style.display = "block";
            updateLayout(content_c, c_chart);
        });
    }
    for (let i = 0; i < radios_cnt2.length; i++) {
        radios_cnt2[i].addEventListener("change", function () {
            content_im.forEach(elem => { elem.style.display = "none"; });
            content_im[i].style.display = "block";
            updateLayout(content_im, im_chart);
        });
    }
}

window.onresize = function () {
    updateLayout(content_c, c_chart);
    updateLayout(content_im, im_chart);
}
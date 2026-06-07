// Coordinate converter logic
(function () {
    'use strict';

    let dir = 'ow'; // 'ow' = overworld→nether, 'nether' = nether→overworld

    const $ = id => document.getElementById(id);

    const btnOw     = $('btn-ow');
    const btnNether = $('btn-nether');
    const inX = $('in-x'), inY = $('in-y'), inZ = $('in-z');
    const outX = $('out-x'), outY = $('out-y'), outZ = $('out-z');
    const legendIn  = $('legend-input');
    const legendOut = $('legend-output');
    const swapBtn   = $('swap-btn');
    const copyBtn   = $('copy-btn');
    const copyText  = $('copy-text');

    const outSide   = document.querySelector('.converter__side--out');

    function convert() {
        const x = parseFloat(inX.value);
        const y = parseFloat(inY.value);
        const z = parseFloat(inZ.value);

        const empty = isNaN(x) && isNaN(y) && isNaN(z);

        const calc = (v, axis) => {
            if (isNaN(v)) return '—';
            if (axis === 'y') return v;
            return dir === 'ow' ? Math.floor(v / 8) : v * 8;
        };

        set(outX, empty ? '—' : calc(x, 'x'));
        set(outY, empty ? '—' : calc(y, 'y'));
        set(outZ, empty ? '—' : calc(z, 'z'));
    }

    function set(el, val) {
        el.textContent = val;
        el.classList.toggle('has-value', val !== '—');
    }

    function setDir(d) {
        dir = d;
        btnOw.classList.toggle('active', d === 'ow');
        btnNether.classList.toggle('active', d === 'nether');

        if (outSide) {
            outSide.classList.toggle('target-nether', d === 'ow');
            outSide.classList.toggle('target-ow', d === 'nether');
        }

        legendIn.innerHTML = d === 'ow'
            ? '<span class="legend-dot legend-dot--ow"></span> Overworld'
            : '<span class="legend-dot legend-dot--nether"></span> Nether';
        legendOut.innerHTML = d === 'ow'
            ? '<span class="legend-dot legend-dot--nether"></span> Nether'
            : '<span class="legend-dot legend-dot--ow"></span> Overworld';

        convert();
    }

    function swap() {
        const ox = outX.textContent, oy = outY.textContent, oz = outZ.textContent;
        if (ox !== '—') inX.value = ox;
        if (oy !== '—') inY.value = oy;
        if (oz !== '—') inZ.value = oz;
        setDir(dir === 'ow' ? 'nether' : 'ow');
    }

    function copy() {
        const vals = [outX.textContent, outY.textContent, outZ.textContent];
        if (vals.every(v => v === '—')) return;
        navigator.clipboard.writeText(vals.join(' ')).then(() => {
            copyBtn.classList.add('copied');
            copyText.textContent = 'Скопировано';
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyText.textContent = 'Копировать всё';
            }, 1500);
        });
    }

    btnOw.addEventListener('click', () => setDir('ow'));
    btnNether.addEventListener('click', () => setDir('nether'));
    swapBtn.addEventListener('click', swap);
    copyBtn.addEventListener('click', copy);
    [inX, inY, inZ].forEach(i => i.addEventListener('input', convert));

    // Initialize state
    setDir('ow');
})();

let a, b, c, d, e, f, g, h, i, j, k, l, m;
let totalErrors = {
  arcsin: 0,
  arccos: 0,
  sqrt: 0,
  division: 0,
  ln: 0
};
const totalCycles = 1000;

document.getElementById('process-btn').addEventListener('click', function() {
    processEquation();
});

function processEquation() {
    totalErrors = {
        arcsin: 0,
        arccos: 0,
        sqrt: 0,
        division: 0,
        ln: 0
    };

    for (let cycle = 0; cycle < totalCycles; cycle++) {
        a = getRandomValue();
        b = getRandomValue();
        c = getRandomValue();
        d = getRandomValue();
        e = getRandomValue();
        f = getRandomValue();
        g = getRandomValue();
        h = getRandomValue();
        i = getRandomValue();
        j = getRandomValue();
        k = getRandomValue();
        l = getRandomValue();
        m = getRandomValue();
        
        calculateYWithErrors(a, b, c, d, e, f, g, h, i, j, k, l, m);
    }

    displayResults(totalErrors);
}

function calculateYWithErrors(a, b, c, d, e, f, g, h, i, j, k, l, m) {
    try {
        if (a + Math.sqrt(b) <= 0) totalErrors.ln++;
        const term1 = Math.log(a + Math.sqrt(b));

        if (c / Math.sqrt(d) < -1 || c / Math.sqrt(d) > 1) totalErrors.arcsin++;
        const term2 = Math.asin(c / Math.sqrt(d));

        if (e / f < -1 || e / f > 1) totalErrors.arccos++;
        const term3 = Math.acos(e / f);

        if (g < -1 || g > 1) totalErrors.arcsin++;
        const term4 = Math.asin(g);

        if (h < -1 || h > 1) totalErrors.arccos++;
        const term5 = Math.acos(h);

        if (i * j <= 0) totalErrors.ln++;
        const term6 = Math.log(i * j);

        if (k - Math.acos(l / m) < 0) totalErrors.sqrt++;
        const term7 = Math.sqrt(k - Math.acos(l / m));

        if (term6 === 0) totalErrors.division++;

        const numerator = term1 + term2 + term3;
        const denominator = (term4 + term5) / term6;

        if (denominator === 0) totalErrors.division++;

        if (f === 0) totalErrors.division++;

        if (m === 0) totalErrors.division++;

        const Y = numerator / denominator + term7;
        return { Y, totalErrors };
    } catch (error) {
        console.error("Error en el cálculo de la ecuación: ", error);
        return { Y: null, totalErrors };
    }
}

function getRandomValue() {
    return Math.random() * 2 - 1;
}

function displayResults(totalErrors) {
    const table = document.getElementById('results-table');

    const totalErrorsSum = totalErrors.arcsin + totalErrors.arccos + totalErrors.sqrt + totalErrors.division + totalErrors.ln;

    const arcsinPercentage = ((totalErrors.arcsin / totalCycles) * 100).toFixed(2);
    const arccosPercentage = ((totalErrors.arccos / totalCycles) * 100).toFixed(2);
    const sqrtPercentage = ((totalErrors.sqrt / totalCycles) * 100).toFixed(2);
    const divisionPercentage = ((totalErrors.division / totalCycles) * 100).toFixed(2);
    const lnPercentage = ((totalErrors.ln / totalCycles) * 100).toFixed(2);

    table.innerHTML = `
        <tr>
            <th>Total de errores de arcoseno</th><td>${totalErrors.arcsin}</td><td>${arcsinPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de arcocoseno</th><td>${totalErrors.arccos}</td><td>${arccosPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de raíz cuadrada</th><td>${totalErrors.sqrt}</td><td>${sqrtPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de división</th><td>${totalErrors.division}</td><td>${divisionPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores de logaritmo natural</th><td>${totalErrors.ln}</td><td>${lnPercentage}%</td>
        </tr>
        <tr>
            <th>Total de errores</th><td>${totalErrorsSum}</td><td></td>
        </tr>
    `;

    drawChart(totalErrors);
}

function drawChart(totalErrors) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(function() {
        var data = google.visualization.arrayToDataTable([
            ['Tipo de Error', 'Cantidad'],
            ['Arcoseno', totalErrors.arcsin],
            ['Arcocoseno', totalErrors.arccos],
            ['Raíz Cuadrada', totalErrors.sqrt],
            ['División', totalErrors.division],
            ['Logaritmo Natural', totalErrors.ln]
        ]);

        var options = {
            title: 'Distribución de Errores',
            is3D: true,
            pieHole: 0.4
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart'));
        chart.draw(data, options);
    });
}

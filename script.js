let fields = Array(9).fill(null);
let currentShape = 'cross';
let gameOver = false;

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');

    let tableHtml = '<table id="gameTable">';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const symbol = fields[index] === 'circle'
                ? generateAnimatedCircleSVG()
                : fields[index] === 'cross'
                ? generateAnimatedCrossSVG()
                : '';
            tableHtml += `<td id="cell-${index}" onclick="handleClick(${index}, this)">${symbol}</td>`;
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>';

    contentDiv.innerHTML = tableHtml;
}

function handleClick(index, tdElement) {
    if (fields[index] || gameOver) return;

    fields[index] = currentShape;

    if (currentShape === 'circle') {
        tdElement.innerHTML = generateCircleSVG();
        currentShape = 'cross';
    } else {
        tdElement.innerHTML = generateCrossSVG();
        currentShape = 'circle';
    }

    tdElement.onclick = null;

    const winnerData = checkWinner();
    if (winnerData) {
        gameOver = true;
        drawWinLine(winnerData.combination);
    }
}

// Gewinnkombis: Index-Trios
const winningCombinations = [
    [0, 1, 2], // oben
    [3, 4, 5], // mitte
    [6, 7, 8], // unten
    [0, 3, 6], // links
    [1, 4, 7], // mitte
    [2, 5, 8], // rechts
    [0, 4, 8], // diagonal \
    [2, 4, 6]  // diagonal /
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            return { winner: fields[a], combination: combo };
        }
    }
    return null;
}

function drawWinLine(combination) {
    const td0 = document.getElementById(`cell-${combination[0]}`);
    const td2 = document.getElementById(`cell-${combination[2]}`);

    const rect0 = td0.getBoundingClientRect();
    const rect2 = td2.getBoundingClientRect();

    const centerX1 = rect0.left + rect0.width / 2;
    const centerY1 = rect0.top + rect0.height / 2;
    const centerX2 = rect2.left + rect2.width / 2;
    const centerY2 = rect2.top + rect2.height / 2;

    const length = Math.hypot(centerX2 - centerX1, centerY2 - centerY1);

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '10';

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';

    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', centerX1);
    line.setAttribute('y1', centerY1);
    line.setAttribute('x2', centerX2);
    line.setAttribute('y2', centerY2);
    line.setAttribute('stroke', 'white');
    line.setAttribute('stroke-width', '10');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-dasharray', length);
    line.setAttribute('stroke-dashoffset', length);

    const animate = document.createElementNS(svgNS, 'animate');
    animate.setAttribute('attributeName', 'stroke-dashoffset');
    animate.setAttribute('from', length);
    animate.setAttribute('to', '0');
    animate.setAttribute('dur', '0.5s');
    animate.setAttribute('fill', 'freeze');

    line.appendChild(animate);
    svg.appendChild(line);
    container.appendChild(svg);
    document.body.appendChild(container);
}

// Animiertes SVG für Erst-Rendering
function generateAnimatedCircleSVG() {
    return `
    <svg width="120" height="120" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <circle
            cx="35"
            cy="35"
            r="30"
            stroke="#00B0EF"
            stroke-width="5"
            fill="none"
            stroke-dasharray="188.4"
            stroke-dashoffset="188.4"
        >
            <animate attributeName="stroke-dashoffset" from="188.4" to="0" dur="1s" fill="freeze" />
        </circle>
    </svg>`.trim();
}

function generateAnimatedCrossSVG() {
    return `
    <svg width="140" height="140" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <line x1="15" y1="15" x2="55" y2="55" stroke="#FFC000" stroke-width="5" stroke-dasharray="56.57" stroke-dashoffset="56.57">
            <animate attributeName="stroke-dashoffset" from="56.57" to="0" dur="0.5s" fill="freeze" />
        </line>
        <line x1="55" y1="15" x2="15" y2="55" stroke="#FFC000" stroke-width="5" stroke-dasharray="56.57" stroke-dashoffset="56.57">
            <animate attributeName="stroke-dashoffset" from="56.57" to="0" dur="0.5s" begin="0.5s" fill="freeze" />
        </line>
    </svg>`.trim();
}

// Statische SVGs für Klick-Einsatz (ohne Animation)
function generateCircleSVG() {
    return `
    <svg width="120" height="120" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <circle
            cx="35"
            cy="35"
            r="30"
            stroke="#00B0EF"
            stroke-width="5"
            fill="none"
        />
    </svg>`.trim();
}

function generateCrossSVG() {
    return `
    <svg width="140" height="140" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <line x1="15" y1="15" x2="55" y2="55" stroke="#FFC000" stroke-width="5" />
        <line x1="55" y1="15" x2="15" y2="55" stroke="#FFC000" stroke-width="5" />
    </svg>`.trim();
}
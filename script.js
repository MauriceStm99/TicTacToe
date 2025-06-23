let fields = [
    'circle',
    null,
    null,
    null,
    null,
    null,
    null,
    'cross',
    null,
];


function init(){
    render();
}

function render(){
    const contentDiv = document.getElementById('content');


    let tableHtml = '<table>';
    for (let i = 0; i < 3; i++) {
        tableHtml += '<tr>';
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateAnimatedCircleSVG();
            } else if (fields[index] === 'cross'){
                symbol = generateAnimatedCrossSVG();
            }
                tableHtml += `<td>${symbol}</td>`;
            }
            tableHtml += '</tr>';
        }
        tableHtml += '</table>';

        contentDiv.innerHTML = tableHtml;
    }

    function generateAnimatedCircleSVG() {
        return `
      <svg width="100" height="100" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
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
          <animate
            attributeName="stroke-dashoffset"
            from="188.4"
            to="0"
            dur="2s"
            fill="freeze"
            repeatCount="1"
          />
        </circle>
      </svg>
        `.trim();
      }

      function generateAnimatedCrossSVG() {
        return `
      <svg width="120" height="120" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <line
          x1="15" y1="15"
          x2="55" y2="55"
          stroke="red"
          stroke-width="5"
          stroke-dasharray="56.57"
          stroke-dashoffset="56.57"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="56.57"
            to="0"
            dur="1s"
            fill="freeze"
          />
        </line>
        <line
          x1="55" y1="15"
          x2="15" y2="55"
          stroke="red"
          stroke-width="5"
          stroke-dasharray="56.57"
          stroke-dashoffset="56.57"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="56.57"
            to="0"
            dur="1s"
            begin="1s"
            fill="freeze"
          />
        </line>
      </svg>
        `.trim();
      }
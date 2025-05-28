function calcularPrecoJustoComLpaVpa() {
    const lpa = parseFloat(document.getElementById('lpa').value);
    const vpa = parseFloat(document.getElementById('vpa').value);
    const valorJusto = document.getElementById('valorJusto');

    if (isNaN(lpa) || isNaN(vpa)) {
        return valorJusto.innerHTML = 0;
    }

    // Resultado é a raiz quadrada do produto de lpa e vpa e 22.5;

    const resultado = Math.sqrt(lpa * vpa * 22.5);
    valorJusto.innerHTML = resultado.toFixed(2);
}
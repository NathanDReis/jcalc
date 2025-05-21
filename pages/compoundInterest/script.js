function formated(numero) {
  numero = defValue(numero);
  const valor = parseFloat((numero).toFixed(2));
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function defValue(value, def) {
  return value && value != 0 ? Number(value) : def ? Number(def) : 0;
}

function textColor(value) {
  return value > 0 ? "text-primary" :
  value < 0 ? "text-danger"  : "";
}

function amount(capital, taxa, tempo, aporte, eAnual) {  
  capital = defValue(capital); 

  aporte = defValue(aporte); 
  
  taxa = eAnual ? defValue(taxa) / 12 : defValue(taxa);
  taxa /= 100;

  tempo = eAnual ? defValue(tempo) * 12 : defValue(tempo); 

  const resultadoCapital = capital * ((1 + taxa)**tempo);
  const resultadoAporte = aporte * (((1 + taxa)**tempo - 1)/taxa);

  const totalInvestido = (aporte * tempo) + capital;
  const total = defValue((resultadoCapital + resultadoAporte), totalInvestido);
  const totalJuros = total - totalInvestido;

  return {
    totalFinal: total,
    totalInvestido: totalInvestido,
    totalJuros: totalJuros,
  }
}

function fillAmount({ totalFinal, totalInvestido, totalJuros }) {
  const legend = document.querySelector("legend input");
  const investido = document.querySelector("#investido");
  const juros = document.querySelector("#juros");

  legend.value = formated(totalFinal);
  investido.innerHTML = formated(totalInvestido);
  juros.innerHTML = formated(totalJuros);

  legend.classList = "form-control " + textColor(totalFinal);
  investido.classList = textColor(totalInvestido);
  juros.classList = textColor(totalJuros);
}

const form = document.querySelector("form");
form.oninput = () => {
  const taxa = form.taxa.value;
  const tempo = form.tempo.value;
  const aporte = form.aporte.value;
  const capital = form.capital.value;
  const periodo = form.periodo.value == "anual";

  const resultado = amount(capital, taxa, tempo, aporte, periodo);
  fillAmount(resultado);
}
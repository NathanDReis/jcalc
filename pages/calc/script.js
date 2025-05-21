const input = document.getElementById('calc-input');
const keyboard = document.getElementById('custom-keyboard');

input.addEventListener('focus', () => {
  keyboard.style.display = 'block';
});

document.addEventListener('click', (e) => {
  if (!(!keyboard.contains(e.target) && e.target !== input)) return;
  
  keyboard.style.display = 'none';
});

keyboard.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;

  const key = e.target.getAttribute('data-key');

  if (key === 'C')
    return input.value = '';

  if (key === 'back') 
    return input.value = input.value.toString().slice(0, -1);
  
  if (key !== '=') 
    return input.value += key;

  try {
    const expression = eval(input.value).toString();
    input.value = expression;
  } catch (error) {
    input.value = 'Erro';
    console.error('Erro ao calcular a expressão:', error);
  }
});
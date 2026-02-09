const btnEl = document.getElementById('btn');
const bmiResult = document.getElementById('bmi-result');
const weightConditionEl = document.getElementById('weight-condition');

btnEl.addEventListener('click', () => {
  const heightValue = document.getElementById('height').value / 100;
  const weightValue = document.getElementById('weight').value;

  const bmiValue = (weightValue / (heightValue * heightValue)).toFixed(2);
  
  bmiResult.value = bmiValue;

  if (bmiValue < 18.5) {
    weightConditionEl.innerText = 'Underweight';
  } else if (bmiValue < 25) {
    weightConditionEl.innerText = 'Normal';
  } else if (bmiValue < 30) {
    weightConditionEl.innerText = 'Overweight';
  } else {
    weightConditionEl.innerText = 'Obese';
  }
});



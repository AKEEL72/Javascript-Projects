 const btnEl = document.querySelectorAll('button');
 const inpEl = document.getElementById('result');
 for(let i=0; i<btnEl.length; i++){
  btnEl[i].addEventListener('click', () => {
    const buttonValue = btnEl[i].textContent;
    if(buttonValue === 'C'){
      clearResult();
    } else if(buttonValue === '='){
      calculateResult();
    } else if(buttonValue === 'B/S'){
      removeLastValue();
    } else{
      appendValue(buttonValue);
    }
  })
 }

 function clearResult() {
  inpEl.value = "";
 };

 function calculateResult() {
  inpEl.value = eval(inpEl.value)
 };

 function appendValue(buttonValue) {
  inpEl.value += buttonValue;
 };

 function removeLastValue(){
  inpEl.value = inpEl.value.slice(0,-1);
 }
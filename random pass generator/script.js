const btnEl = document.querySelector('.btn');
const inpEl = document.getElementById('input');
const copyEl = document.querySelector('.fa-copy')
const alertBox = document.querySelector('.alert-container');

copyEl.addEventListener('click', () => {
  navigator.clipboard.writeText(inpEl.value);

  if(inpEl.value){
    alertBox.classList.add('active');

    setTimeout(() => {
      alertBox.classList.remove('active')
    }, 1000);
  }
});

btnEl.addEventListener('click', () => {
  createPassword();
});

function createPassword() {
  const chars = "0123456789abcdefghijklmnopqrstuvwxtz!@#$%^&*()_+?:{}[]ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 14;
  let password = '';

  for (let i = 0; i < passwordLength; i++) { 
    const randomNum = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNum, randomNum + 1);
    console.log(password);
  }
  inpEl.value = password;
};


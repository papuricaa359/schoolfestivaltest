//ログイン
function login(event) {
  event.preventDefault();
  const name = document.getElementById('login-name').value;
  const loginButton = document.getElementById('loginButton');
  const resultDiv = document.getElementById('result');

  loginButton.textContent = '送信中...';
  loginButton.disabled = true;

  fetch(`https://script.google.com/macros/s/AKfycbylh9pKaxGZ0brO7Arr_1uabT3PDljMyW7FcHyI-0DUpuZ6hVpIAs5Y5jCuIHDE34NZEA/exec?name=${encodeURIComponent(name)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('エラー: ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        resultDiv.textContent = `エラー: ${data.error}`;
      } else {
        document.querySelector('.login').style.display = 'none';
        document.querySelector('.show').style.display = 'flex';
        fetch(`https://script.google.com/macros/s/AKfycbylh9pKaxGZ0brO7Arr_1uabT3PDljMyW7FcHyI-0DUpuZ6hVpIAs5Y5jCuIHDE34NZEA/exec?name=${name}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            displayError(`エラー: ${data.error}`);
          } else {
            displayResult(data);
          }
        })
        .catch(error => {
          console.error('Error:', error);
          displayError('データの取得に失敗しました。');
        });
      }
    })
    .catch(error => {
      console.error('エラー:', error);
      resultDiv.textContent = `データの取得に失敗しました。${error.message}`;
    })
    .finally(() => {
      loginButton.textContent = '食券を取得する';
      loginButton.disabled = false;
    });
}

//表示
function displayResult(data) {
  const idElement = document.getElementById('idshow');
  const nameElement = document.getElementById('nameshow');
  const daytimeElement = document.getElementById('daytimeshow');
  const quaElement = document.getElementById('quashow');
  const beniElement = document.getElementById('benishow');

  idElement.textContent = `${data.id}`;
  nameElement.textContent = `${data.name}様`;
  daytimeElement.textContent = `${data.daytime}`;
  quaElement.textContent = `${data.qua} 個`;
  beniElement.textContent = `紅しょうが${data.beni}`;

  document.querySelectorAll('.hidden').forEach(element => {
    element.classList.remove('hidden');
  });
}

function displayError(message) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `<div class="error-message">${message}</div>`;
}

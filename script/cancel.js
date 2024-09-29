function input(event) {
    event.preventDefault();
    const name = document.getElementById('input-name').value;
    const resultdiv = document.getElementById('result');

    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
    if (!name) {
        resultdiv.textContent = 'ニックネームを入力してください。';
        return;
    }
    fetch(`https://script.google.com/macros/s/AKfycbywR9VB7-5lwP3Pd1wGhf09JKLyYrsCjps0aI2__revFz0NPsR9WWSrQlzYaX9QZ6Mc/exec?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
            document.querySelector('.loading').style.display = 'none';
            document.querySelector('.overlay').style.display = 'none';
            if (data.error) {
                resultdiv.textContent = `エラー: ${data.error}`;
            } else {
                orderData = data;
                showOrderInfo(data);
            }
        })
        .catch(error => {
            console.error('エラー:', error);
            document.querySelector('.loading').style.display = 'none';
            document.querySelector('.overlay').style.display = 'none';
            resultdiv.textContent = 'データの取得に失敗しました。';
        });
}
function showOrderInfo(data) {
    document.querySelector('.container').style.display = 'none';
    document.querySelector('.check').style.display = 'block';
    document.getElementById('orderID').textContent = `注文ID: ${data.orderID}`;
    document.getElementById('name').textContent = `名前: ${data.name}`;
    document.getElementById('daytime').textContent = `日時: ${data.daytime}`;
    document.getElementById('qua').textContent = `数量: ${data.qua}`;
    document.getElementById('beni').textContent = `紅しょうが: ${data.beni}`;
}
document.getElementById('noButton').addEventListener('click', function () {
    document.querySelector('.check').style.display = 'none';
    document.querySelector('.container').style.display = 'block';
});

document.getElementById('yesButton').addEventListener('click', function () {
    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
    if (orderData) {
        fetch(`https://script.google.com/macros/s/AKfycbywR9VB7-5lwP3Pd1wGhf09JKLyYrsCjps0aI2__revFz0NPsR9WWSrQlzYaX9QZ6Mc/exec?name=${encodeURIComponent(orderData.name)}&action=cancel`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.querySelector('.check').style.display = 'none';
                    document.querySelector('.loading').style.display = 'none';
                    document.querySelector('.overlay').style.display = 'none';
                    document.querySelector('.success').style.display = 'block';
                } else {
                    resultDiv.textContent = `エラー: ${data.error}`;
                }
            })
            .catch(error => {
                console.error('エラー:', error);
                resultDiv.textContent = 'キャンセル処理に失敗しました。';
            });
    }
});
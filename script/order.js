//注文画面
let name = '';
let day = '';
let hour = '';
let minute = '';
let qua = '';
let beni = '';
let nameflag = 0;
let timeflag = 0;
let orderflag = 0;
function hourset() {
    const now = new Date();
    const currentDate = now.getDate();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const daySelectElement = document.getElementById('day');
    const hourSelectElement = document.getElementById('hour');
    const minuteSelectElement = document.getElementById('minute');
    function addTimeOptionsToSelect(selectElement, startHour, endHour) {
        selectElement.innerHTML = '';
        for (let hour = startHour; hour <= endHour; hour++) {
            const optionElement = document.createElement('option');
            const displayHour = hour < 10 ? `0${hour}` : hour;
            optionElement.value = displayHour;
            optionElement.textContent = `${displayHour}時`;
            selectElement.appendChild(optionElement);
        }
    }
    function addMinuteOptionsToSelect(selectElement, availableMinutes) {
        selectElement.innerHTML = '';
        availableMinutes.forEach(minute => {
            const optionElement = document.createElement('option');
            optionElement.value = minute;
            optionElement.textContent = `${minute}分`;
            selectElement.appendChild(optionElement);
        });
    }
    function isToday(selectedDay) {
        const selectedDate = parseInt(selectedDay, 10);
        return selectedDate === currentDate;
    }
    function updateMinutesBasedOnHour(selectedHour) {
        if (parseInt(selectedHour, 10) === currentHour) {
            const availableMinutes = currentMinute < 15 ? ['15', '30', '45'] :
                currentMinute < 30 ? ['30', '45'] :
                    currentMinute < 45 ? ['45'] : ['00', '15', '30', '45'];
            addMinuteOptionsToSelect(minuteSelectElement, availableMinutes);
        } else {
            addMinuteOptionsToSelect(minuteSelectElement, ['00', '15', '30', '45']);
        }
    }
    function setTimeAndMinutesBasedOnDay(selectedDay) {
        if (isToday(selectedDay)) {
            if (currentMinute >= 45) {
                addTimeOptionsToSelect(hourSelectElement, currentHour + 1, 23);
                addMinuteOptionsToSelect(minuteSelectElement, ['00', '15', '30', '45']);
            } else {
                addTimeOptionsToSelect(hourSelectElement, currentHour, 23);
                updateMinutesBasedOnHour(hourSelectElement.value);
            }
        } else {
            addTimeOptionsToSelect(hourSelectElement, 0, 23);
            addMinuteOptionsToSelect(minuteSelectElement, ['00', '15', '30', '45']);
        }
    }
    daySelectElement.addEventListener('change', function () {
        const selectedDay = daySelectElement.value;
        setTimeAndMinutesBasedOnDay(selectedDay);
    });
    hourSelectElement.addEventListener('change', function () {
        const selectedHour = hourSelectElement.value;
        updateMinutesBasedOnHour(selectedHour);
    });
    setTimeAndMinutesBasedOnDay(daySelectElement.value);
}


document.addEventListener('DOMContentLoaded', function () {
    hourset();
    document.querySelector('.name').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
});

document.addEventListener('DOMContentLoaded', function () {
    hourset();
    document.querySelector('.name').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
});

function validateName() {
    const inputField = document.getElementById('NameInput');
    const errorMessage = document.getElementById('error-message');
    const inputValue = inputField.value;
    errorMessage.textContent = '';

    if (inputValue.length > 10) {
        errorMessage.textContent = '10文字以内で入力してください。';
        inputField.value = '';
        return false;
    } else {
        name = inputValue;
        document.getElementById('namearea').textContent = name;

        if (nameflag === 0) {
            document.querySelector('.name').style.display = 'none';
            document.querySelector('.time').style.display = 'block';
            nameflag = 1;
        } else {
            document.querySelector('.overlay').style.display = 'none';
            document.querySelector('.name').style.display = 'none';
        }
        return false;
    }
}

function validatetime() {
    day = document.getElementById('day').value;
    hour = document.getElementById('hour').value;
    minute = document.getElementById('minute').value;

    document.getElementById('dayarea').textContent = day + "日";
    document.getElementById('hourarea').textContent = hour + "時";
    document.getElementById('minutearea').textContent = minute + "分";

    if (timeflag === 0) {
        document.querySelector('.time').style.display = 'none';
        document.querySelector('.order').style.display = 'block';
        timeflag = 1;
    } else {
        document.querySelector('.time').style.display = 'none';
        document.querySelector('.overlay').style.display = 'none';
    }
    return false;
}

function validateOrder() {
    qua = document.getElementById('qua').value;
    beni = document.getElementById('beni').checked ? "あり" : "なし";

    document.getElementById('quaarea').textContent = qua + "個";
    document.getElementById('pricearea').textContent = qua * 400 + "円";

    if (orderflag === 0) {
        document.querySelector('.order').style.display = 'none';
        document.querySelector('.overlay').style.display = 'none';
        orderflag = 1;
    } else {
        document.querySelector('.order').style.display = 'none';
        document.querySelector('.overlay').style.display = 'none';
    }
    return false;
}

function namechange() {
    document.querySelector('.name').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}

function timechange() {
    document.querySelector('.time').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}

function orderchange() {
    document.querySelector('.order').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
}

function check() {
    document.querySelector('.check').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';
    return false;
}

function checkcancel() {
    document.querySelector('.check').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    return false;
}

function send() {
    document.querySelector('.check').style.display = 'none';
    document.querySelector('.sendnow').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';

    fetch(`https://script.google.com/macros/s/AKfycbzxrkvc2JJaaK7GYLXhL1wRjEESZ6XoxFXZSt8hfFKAZ32gE2vnzMXirX_j-diRuCqA/exec?username=${encodeURIComponent(name)}&daytime=${encodeURIComponent(day + "日" + hour + ":" + minute)}&qua=${encodeURIComponent(qua)}`)
        .then(response => response.json())
        .then(data => {
            if (data.userExists === "true") {
                alert("入力したニックネームは既に登録されています。別のニックネームを入力してください。");
                document.querySelector('.sendnow').style.display = 'none';
                document.querySelector('.overlay').style.display = 'none';
            } else if (data.quaExists === "true") {
                alert("入力した時間は既に枠が終了しております。別の時間を入力してください。");
                document.querySelector('.sendnow').style.display = 'none';
                document.querySelector('.overlay').style.display = 'none';
            } else {
                register();
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("エラーが発生しました。もう一度お試しください。");
            document.querySelector('.sendnow').style.display = 'none';
            document.querySelector('.overlay').style.display = 'none';
        });
}

function register() {
    var daytime = day + "日" + hour + ":" + minute;
    var formData = new FormData();
    formData.append("name", name);
    formData.append("daytime", daytime);
    formData.append("qua", qua);
    formData.append("beni", beni);
    document.querySelector('.sendnow').style.display = 'block';
    document.querySelector('.overlay').style.display = 'block';

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                document.querySelector('.sendnow').style.display = 'none';
                document.querySelector('.overlay').style.display = 'none';
                document.querySelector('.form').style.display = 'none';
                document.querySelector('.success').style.display = 'block';
                show();
            } else {
                alert('登録に失敗しました。再度お試しください。');
            }
            document.querySelector('.overlay').style.display = 'none';
        }
    };
    xhr.open("POST", "https://script.google.com/macros/s/AKfycbzxrkvc2JJaaK7GYLXhL1wRjEESZ6XoxFXZSt8hfFKAZ32gE2vnzMXirX_j-diRuCqA/exec");
    xhr.send(formData);
}
//成功
function show() {
    fetch(`https://script.google.com/macros/s/AKfycbzxrkvc2JJaaK7GYLXhL1wRjEESZ6XoxFXZSt8hfFKAZ32gE2vnzMXirX_j-diRuCqA/exec?name=${encodeURIComponent(name)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('result').textContent = '注文情報が見つかりませんでした。';
            } else {
                document.getElementById('orderIDshow').textContent = data.orderID;
                document.getElementById('nameshow').textContent = data.name;
                document.getElementById('daytimeshow').textContent = data.daytime;
                document.getElementById('quashow').textContent = data.qua;
                document.getElementById('benishow').textContent = data.beni;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'エラーが発生しました。もう一度お試しください。';
        });
}
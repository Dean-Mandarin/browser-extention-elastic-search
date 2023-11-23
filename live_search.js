document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.elastic');

  // Загрузить данные из файла data.json
  fetch('data.json')
      .then(response => response.json())
      .then(data => {
        // Замапить элементы из массива
        data.forEach(item => {
          const li = document.createElement('li');
          const question = document.createElement('p');
          question.textContent = item.question;
          const answer = document.createElement('span');
          answer.classList.add('ans');

          // Если answer - массив, добавить <br> между элементами
          if (Array.isArray(item.answer)) {
            item.answer.forEach((answerPart, index) => {
              answer.innerHTML += answerPart;
              if (index < item.answer.length - 1) {
                answer.innerHTML += '<br> <br> ';
              }
            });
          } else {
            answer.textContent = item.answer;
          }

          li.appendChild(question);
          li.appendChild(answer);
          container.appendChild(li);
        });

        // Добавить обработчик для живого поиска
        document.querySelector('#elastic').addEventListener('input', function () {
          let val = this.value.trim().toLowerCase();
          let elasticItems = document.querySelectorAll('.elastic li p');

          elasticItems.forEach(function (elem) {
            let text = elem.textContent.toLowerCase();
            let index = text.indexOf(val);

            if (index === -1) {
              elem.closest('li').classList.add('hide');
            } else {
              elem.closest('li').classList.remove('hide');
              let markedText = elem.textContent.substring(index, index + val.length);
              elem.innerHTML = insertMark(text, index, val.length);
            }
          });
        });
      })
      .catch(error => console.error('Error loading data:', error));
});

function insertMark(string, pos, len) {
  return string.slice(0, pos) + '<mark>' + string.slice(pos, pos + len) + '</mark>' + string.slice(pos + len);
}

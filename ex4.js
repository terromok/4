//массив с цветами, которые потом будем перемешивать случайным образом
const leters = ['A', 'B', 'C', 'D','E', 'F', 'G', 'H'];

let cl = 0;  
let cl1;
let cl2;  
let tdElem1;
let tdElem2;  
let timer;          

//отрисовываем таблицу 4х4 и задаем каждой ячейке 
//класс с названием цвета
const map = {
  init() {
    // Контейнер, где будут наши ячейки, первоначально его очистим.
    const table = document.getElementById('game');
    table.innerHTML = "";
    // Цикл запустится столько раз, сколько у нас количество строк.
    for (let row = 0; row < 10; row++) {
      // Создаем строку, добавляем ей класс, после добавляем ее в таблицу.
      const tr = document.createElement('tr');
      tr.classList.add('row');
      table.appendChild(tr);
      // Цикл запустится столько раз, сколько у нас количество колонок.
      for (let col = 0; col < 10; col++) {
        // Создаем ячейку, добавляем ячейке класс cell и id с номером строки и столбца.
        const td = document.createElement('td');
        td.id = (`col${col.toString()}_row${row.toString()}`);
        
        tr.appendChild(td);
      }
    };
  },

  setColor() {
    for (let row = 1; row < 9; row++) {
      for (let col = 1; col < 9; col++) {
        const tdBlack =document.getElementById(`col${col.toString()}_row${row.toString()}`);
        tdBlack.classList.add(`cell`);
        if ((col + row)%2 == 1) {
          tdBlack.style.backgroundColor = "black";
        }
      }
    }
  },

  setIndex(i) {
    for (let row = 8; row >0 ; row--) {
      const tdIndex =document.getElementById(`col${i}_row${row.toString()}`);
      tdIndex.textContent = `${9-row}`;
      tdIndex.classList.add(`index`);
    }
  },

  setLetter(i) {
    for (let col = 1; col < 9; col++) {
      const tdLetter =document.getElementById(`col${col.toString()}_row${i}`);
      tdLetter.textContent = `${leters[col-1]}`;
      tdLetter.classList.add(`index`);
    }
  }
};


function twoClick() {
   
  $('#game').on('click', function(e){
    if (cl === 0) { //проверяем, открыта или нет первая ячейка
      tdElem1 =document.getElementById(`${e.target.attributes[0].value}`);
      tdElem1.style.backgroundColor = `${e.target.attributes[2].value}`; //меняем стиль цвета фона ячейки
      cl1 = `${e.target.attributes[2].value}`; //для сравнения с цветом у второй ячейки
      cl = 1;} //флаг о том, что первая ячека открыта
    else { //если первая ячейка открыта, то
      tdElem2 =document.getElementById(`${e.target.attributes[0].value}`);
      tdElem2.style.backgroundColor = `${e.target.attributes[2].value}`;//меняем стиль цвета фона ячейки
      cl2 = `${e.target.attributes[2].value}`;//для сравнения с цветом у первой ячейки
      cl = 0;//флаг о том, что вторая ячека открыта
      if (cl1 != cl2) { //если цвета разные, то
        setTimeout(clearBackGr, 100); //показываем обе ячейки еще 100 мс
        function clearBackGr() {
          tdElem1.style.backgroundColor = ""; //фон первой ячейки очищаем
          tdElem2.style.backgroundColor = ""; //фон второй ячейки очищаем
        }
      } else { // если цвета совпадают, то
        timer++; //счетчик для остановки таймера (при 8)
        return}; 
    }
  })
}


(function($) {
  map.init();
  map.setColor();
  map.setIndex(0);
  map.setIndex(9);
  map.setLetter(0);
  map.setLetter(9);
  $('#playButton').on('click', function(e){
    timer = 0;
      
    startTimer();
  });
  
  twoClick();
})(jQuery);
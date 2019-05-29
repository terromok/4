//массив с буквами для доски
const letters = ['A', 'B', 'C', 'D','E', 'F', 'G', 'H'];

let tdMove;

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
        // Создаем ячейку, добавляем ячейке id с номером строки и столбца.
        const td = document.createElement('td');
        td.id = (`col${col.toString()}_row${row.toString()}`);
        tr.appendChild(td);
      }
    };
  },

  setColor() { //раскрашиваем нужные квадраты в черный цвет
    for (let row = 1; row < 9; row++) {
      for (let col = 1; col < 9; col++) {
        const tdBlack =document.getElementById(`col${col.toString()}_row${row.toString()}`);
        tdBlack.classList.add(`cell`);
        if ((col + row)%2 == 1) { //нечетные черные
          tdBlack.style.backgroundColor = "black";
        }
      }
    }
  },

  setIndex(i) { //отрисовывает цифры на доске
    for (let row = 8; row >0 ; row--) {
      const tdIndex =document.getElementById(`col${i}_row${row.toString()}`);
      tdIndex.textContent = `${9-row}`;
      tdIndex.classList.add(`index`);
    }
  },

  setLetter(l) { //отрисовывает буквы на доске
    for (let col = 1; col < 9; col++) {
      const tdLetter =document.getElementById(`col${col.toString()}_row${l}`);
      tdLetter.textContent = `${letters[col-1]}`;
      tdLetter.classList.add(`index`);
    }
  },
};

function tableReset() { //отрисовывает чистую шахматную доску
    map.init();
    map.setColor();
    map.setIndex(0); //первый столбец
    map.setIndex(9); //последний столбец
    map.setLetter(0); //первая строчка
    map.setLetter(9); //последняя строчка
  }

function clickOnTable() {

  $('.cell').on('click', function(e){
      tableReset(); //не знаю, почему не срабатывет, но хотябы не дает реагировать на последующие клики
      const tdHorse =document.getElementById(`${e.target.attributes[0].value}`);
      const horse = `${e.target.attributes[0].value}`;
      const point = horse.split(''); //col1_row4, например, разложим по знакам
      let ind = +point[8]; //последний знак
      let letter = +point[3]; //4-й знак

      //console.log(`${9 - ind}`);
      tdHorse.style.backgroundColor = 'blue'; //красим положение коня синим цветом
      //рассматриваем все варианты и отрисовываем зеленым возможные ходы
      if((letter-3)>=0 && (ind-1)>0) {
        tdMove = document.getElementById(`col${letter-2}_row${ind-1}`);
        tdMove.style.backgroundColor = 'green';
      };
      if((letter-3)>=0 && (ind+0)<8) {
        tdMove = document.getElementById(`col${letter-2}_row${ind+1}`);
        tdMove.style.backgroundColor = 'green';
      };
      if((letter-2)>=0 && (ind-2)>0) {
        tdMove = document.getElementById(`col${letter-1}_row${ind-2}`);
        tdMove.style.backgroundColor = 'green';
      };
      if((letter-2)>=0 && (ind+1)<8) {
        tdMove = document.getElementById(`col${letter-1}_row${ind+2}`);
        tdMove.style.backgroundColor = 'green';
      };
      if((letter+1)<8 && (ind-1)>0) {
        tdMove = document.getElementById(`col${letter+2}_row${ind-1}`);
        tdMove.style.backgroundColor = 'green';
      };
      if((letter+1)<8 && ind<8) {
        tdMove = document.getElementById(`col${letter+2}_row${ind+1}`);
        tdMove.style.backgroundColor = 'green';
      };
      if(letter<8 && (ind-2)>0) {
        tdMove = document.getElementById(`col${letter+1}_row${ind-2}`);
        tdMove.style.backgroundColor = 'green';
      };
      if(letter<8 && (ind+1)<8) {
        tdMove = document.getElementById(`col${letter+1}_row${ind+2}`);
        tdMove.style.backgroundColor = 'green';
      };     
  })
}


(function($) {
  tableReset();
  clickOnTable();
  $('.button').on('click', function(e){
      tableReset();
      clickOnTable();
  })
})(jQuery);
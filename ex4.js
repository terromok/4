//массив с цветами, которые потом будем перемешивать случайным образом
const letters = ['A', 'B', 'C', 'D','E', 'F', 'G', 'H'];

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

  setLetter(l) {
    for (let col = 1; col < 9; col++) {
      const tdLetter =document.getElementById(`col${col.toString()}_row${l}`);
      tdLetter.textContent = `${letters[col-1]}`;
      tdLetter.classList.add(`index`);
    }
  },

  tableReset() {
    this.init();
    this.setColor();
    this.setIndex(0);
    this.setIndex(9);
    this.setLetter(0);
    this.setLetter(9);
  }
};


function clickOnTable() {
  $('.cell').on('click', function(e){
      //map.tableReset();
      const tdHorse =document.getElementById(`${e.target.attributes[0].value}`);
      const horse = `${e.target.attributes[0].value}`;
      const point = horse.split('');
      let ind = point[8];
      let letter = point[3];
      console.log(`${9 - ind}`);
      tdHorse.style.backgroundColor = 'blue';
      if((letter-3)>=0 && (ind-2)>0) {

        const tdMove = document.getElementById(`col${letter-2}_row${ind-1}`);
        tdMove.style.backgroundColor = 'green';
      };
     
  })
}


(function($) {
  map.tableReset();
  clickOnTable();
})(jQuery);
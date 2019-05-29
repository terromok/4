//массив с цветами, которые потом будем перемешивать случайным образом
const colors = ['green', 'yellow', 'red', 'blue','green', 'yellow', 'red', 'blue',
                'orange', 'white', 'purple', 'grey', 'orange', 'white', 'purple', 'grey'];

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
        td.classList.add(`cell`);
        tr.appendChild(td);
      }
    };
  },

  setColor() {
    //перемешаем цвета в массиве colors
    /*let colorsRandom = colors.sort(function(){
      return Math.random() - 0.5;
    });*/
    //let j=0; счетчик перебора ячеек
    for (let row = 1; row < 9; row++) {
      for (let col = 1; col < 9; col++) {
        if ((col + row)%2 == 1) {
          const tdBlack =document.getElementById(`col${col.toString()}_row${row.toString()}`);
          tdBlack.style.backgroundColor = "black";
        }
        //перебираем каждую ячейку
        
        //j++;
      }
    }
  }/**/
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

function startTimer() {
    if (timer == 8) {return}; //если все ячейки открыты
    var my_timer = document.getElementById("my_timer");
    var time = my_timer.innerHTML;
    var arr = time.split(":");
    var m = arr[0];
    var s = arr[1];
    var ms = arr[2];
    ms= +ms + 10;
    if (ms < 100) ms = "0" + ms;
    if (ms == 1000) {
      ms = 0;
      s++;
      if (s < 10) s = "0" + s;
      if (s == 60) {
        s = "0" + 0;
        m++;
        if (m < 10) m = "0" + m;
      }
    }
    
    document.getElementById("my_timer").innerHTML = m+":"+s+":"+ms;
    setTimeout(startTimer, 10); //
  }

(function($) {
  map.init();
  map.setColor();
  $('#playButton').on('click', function(e){
    timer = 0;
      
    startTimer();
  });
  
  twoClick();
})(jQuery);
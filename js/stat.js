// stat.js
'use strict';
window.renderStatistics = function (ctx, names, times) {
  // рисую тень белого прямоугольного облака
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // рисую белое прямоугольное облако
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  // рисую текст сообщения
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'bottom';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // нахожу худшее время
  // null передаю в качестве контекста
  var max = Math.max.apply(null, times);

  var histogramHeight = 150; // высота гистограммы
  var step = histogramHeight / (max - 0); // [?] не понял зачем
  // в лекции использовали (max - 0). 0 - это минимум?

  // объявляю функцию, которая возвращает случайное значение
  // Полученное значение будем подставлять в значение s формата цвета hsl для изменения насыщенности
  var getRandomSatur = function () {
    return Math.random() * 100;
  };

  var barWidth = 40; // ширина колонки
  var indent = 50; // расстояние между колонками
  var initialX = 140; // координата X первой колонки
  var initialY = 90; // координата Y первой колонки
  var nameInitialY = 245; // координата Y (высота) имени игрока
  var timeInitialY = 65; // координата Y (высота) результата игрока

  ctx.textBaseline = 'top';

  for (var i = 0; i < times.length; i++) {
    // с помощью условию определяю, чья колонка, игрока Вы или другого игрока
    if (names[i] === 'Вы') {
      // задаю цвет колонки игрока Вы
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      // задаю цвета колонок других игроков — синие,
      // а насыщенность задается случайным образом.
      ctx.fillStyle = 'hsl(240, ' + getRandomSatur() + '%, 50%)';
    }

    var barHeight = times[i] * step; // расчет высоты колонки
    // рисую колонку
    ctx.fillRect(
        initialX + ((barWidth + indent) * i), // задаю координату X каждой колонке
        initialY + histogramHeight - barHeight, // задаю координату Y каждой колонке
        barWidth, // ширина колонки
        times[i] * step); // расчитываю высоту колонки
    ctx.fillStyle = '#000'; // меняю цвет на черный для имен игроков и результатов
    // указываю имя игрока и его координаты
    ctx.fillText(
        names[i], // вывожу имя игрока
        initialX + ((barWidth + indent) * i), // расчет координаты X имени игрока
        nameInitialY); // расчет координаты Y имени игрока
    // указываю результат игрока и его координаты
    ctx.fillText(
        parseInt(times[i], 10), // вывожу результат игрока
        initialX + ((barWidth + indent) * i), // расчет координаты X результата
        timeInitialY + histogramHeight - barHeight); // расчет координаты Y результата
  }
};

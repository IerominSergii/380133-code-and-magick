// stat.js
'use strict';
window.renderStatistics = function (ctx, names, times) {
  // рисую белое прямоугольное облако
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // рисую тень белого прямоугольного облака
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  // рисую текст сообщения
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'bottom';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var max = -1;
  var maxIndex = -1;

  // нахожу худшее время
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
      maxIndex = i;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / (max - 0); // [?] не понял зачем
  //в лекции использовали (max - 0). 0 - это минимум?

  // объявляю функцию, которая возвращает случайное значение
  // Полученное значение будем подставлять в значение s формата цвета hsl для изменения насыщенности
  var getRandomSatur = function () {
    return Math.random() * 100;
  };

  var barWidth = 40;
  var indent = 50;
  var initialX = 140;
  var initialY = 90;
  var nameInitialY = 245;
  var timeInitialY = 65;

  ctx.textBaseline = 'top';

  for (i = 0; i < times.length; i++) {
    ctx.fillStyle = names[i] == 'Вы' ? 'rgba(255, 0, 0, 1)' :
    'hsl(240, ' + getRandomSatur() + '%, 50%)';//нашел способ подставления
    //переменных или функций в hsl, но не понятно зачем плюсы по сторонам ' + getRandomSatur() + '%
    var barHeight = times[i] * step;
    ctx.fillRect(
       initialX + ((barWidth + indent) * i),
       initialY + histogramHeight - barHeight,
       barWidth,
       times[i] * step);
    ctx.fillStyle = '#000';
    ctx.fillText(
      names[i],
      initialX + ((barWidth + indent) * i),
      nameInitialY);
    ctx.fillText(
      parseInt(times[i]),
      initialX + ((barWidth + indent) * i),
      timeInitialY + histogramHeight - barHeight);
  }
};

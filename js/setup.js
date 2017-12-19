'use strict';

var userDialog = document.querySelector('.setup');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template');

var wizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

var wizardSecondNames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

var coatsColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];

var eyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green',
];

var totalWizards = 4;// Количество магов

// функция генерации случайных данных в зависимости от длины массива
// max - это значение свойства length массива
var randomProperty = function (max) {
  return Math.floor(Math.random() * max);
};

// функция создания объектов со случайными значениями свойств
// и добавлением их в массив
var getWizards = function (total) {
  var array = [];
  for (var i = 0; i < total; i++) {

    var nameIndex1 = randomProperty(wizardNames.length);
    var nameIndex2 = randomProperty(wizardSecondNames.length);
    var coatIndex = randomProperty(coatsColor.length);
    var eyeIndex = randomProperty(eyesColor.length);
    var object = {};

    if (Math.round(Math.random())) {
      object.name = wizardNames[nameIndex1] + ' ' + wizardSecondNames[nameIndex2];
    } else {
      object.name = wizardSecondNames[nameIndex2] + ' ' + wizardNames[nameIndex1];
    }

    object.coatsColor = coatsColor[coatIndex];
    object.eyesColor = eyesColor[eyeIndex];

    array.push(object);
  }

  return array;
};

// функция создания DOM-элемента на основе JS-объекта
var wizards = getWizards(totalWizards);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.content.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatsColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// функция заполнения блока DOM-элементами на основе массива JS-объектов
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// перемещаю fragment в .setup-similar-list
similarListElement.appendChild(fragment);

// показываю блок .setup-similar
userDialog.querySelector('.setup-similar').classList.remove('hidden');

// Открытие/закрытие окна настройки персонажа
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupOpen = document.querySelector('.setup-open'); // иконка пользователя
var setup = document.querySelector('.setup'); // окна настройки персонажа
var setupClose = setup.querySelector('.setup-close'); // крестик закрытия диалог окна
var submitButton = setup.querySelector('.setup-submit'); // кнопкa Сохранить
var setupUserName = setup.querySelector('input.setup-user-name'); // форма ввода имени

// изначальные координаты диалог окна
var initCoords = {
  x: null,
  y: null,
};

// функция закрытия диалог окна при нажатии кнопки ESC
var onPopupEscPress = function (evt) {
  // Если фокус находится на форме ввода имени,
  // то при нажатии кнопки ESC диалог окно не закрывается
  if (evt.keyCode === ESC_KEYCODE && evt.target !== setupUserName) {
    closePopup();
  }
};

// функция закрытия диалог окна при нажатии кнопки ENTER
var pressEnterToClosePopup = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

// функция открытия диалог окна и добавление обработчика нажатия клавиши
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);

  // сохранение исходный координат диалог окна в объект initCoords
  if (initCoords.x === null && initCoords.y === null) {
    initCoords.x = setup.offsetTop;
    initCoords.y = setup.offsetLeft;
  }
};

// функция закрытия диалог окна и удаления обработчика нажатия клавиши
// при закрытии диалог окна его координаты возвращаются к исходным
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);

  // возврат к исходным координатам диалог окна
  setup.style.cssText = 'top: ' + initCoords.x + 'px; left: ' + initCoords.y + 'px';
};

// Диалоговое окно .setup открывается по нажатию на иконку пользователя .setup-open
setupOpen.addEventListener('click', function () {
  openPopup();
});

// Когда иконка пользователя .setup-open-icon в фокусе tabindex,
// то диалог настройки открывается по нажатию кнопки ENTER
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Диалог окно .setup закрывается по нажатию на элемент .setup-close, расположенный внутри окна
setupClose.addEventListener('click', function () {
  closePopup();
});

// Если диалог открыт и фокус находится на крестике,
// то нажатие клавиши ENTER приводит к закрытию диалога
setupClose.addEventListener('keydown', function (evt) {
  pressEnterToClosePopup(evt);
});

// Если диалог открыт, нажатие на кнопку «Сохранить» приводит к закрытию диалога
submitButton.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup();
});

// Если диалог открыт и фокус находится на кнопке «Сохранить»,
// нажатие на ENTER приводит к закрытию диалога
submitButton.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  pressEnterToClosePopup(evt);
});

// Задачи 3-5
// 3. Изменение цвета мантии персонажа по нажатию
// 4. Изменение цвета глаз персонажа по нажатию
// 5. Изменение цвета фаерболов по нажатию
var wizardCoat = document.querySelector('.wizard-coat');// мантия персонажа
var wizardEyes = setup.querySelector('.wizard-eyes');// глаза персонажа
var setupFireball = setup.querySelector('.setup-fireball-wrap');// файербол
// цвета файербола
var fireballColors = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

// 3. Изменение цвета мантии персонажа в диалог окне по клику на мантию
wizardCoat.addEventListener('click', function (evt) {
  evt.preventDefault();
  wizardCoat.style.fill = coatsColor[randomProperty(coatsColor.length)];
});

// 4. Изменение цвета глаз персонажа по нажатию
wizardEyes.addEventListener('click', function (evt) {
  evt.preventDefault();
  wizardEyes.style.fill = eyesColor[randomProperty(eyesColor.length)];
});

// 5. Изменение цвета фаерболов по нажатию
setupFireball.addEventListener('click', function (evt) {
  evt.preventDefault();
  setupFireball.style.background = fireballColors[randomProperty(fireballColors.length)];
});

// Move the setup window
var dialogHandle = setup.querySelector('.setup-user-pic');
var avatarInput = setup.querySelector('.upload input');

var moveElement = function (evt, elem) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY,
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    elem.style.top = (elem.offsetTop - shift.y) + 'px';
    elem.style.left = (elem.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

avatarInput.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  moveElement(evt, setup);
});

// input 'avatarInput' disabled temporary
avatarInput.addEventListener('click', function (upEvt) {
  upEvt.preventDefault();
});

dialogHandle.addEventListener('mousedown', function (evt) {
  moveElement(evt, setup);
});

// Drag and Drop section
// Drag and Drop Artifacts
var shopElement = document.querySelector('.setup-artifacts-shop');
var draggedItem = null;

var artifactsElement = document.querySelector('.setup-artifacts');

shopElement.addEventListener('dragstart', function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    draggedItem = evt.target.cloneNode(true);
    evt.dataTransfer.setData('text/plain', evt.target.alt);

    // draggedItem.style.transform = 'scale(2)';
    artifactsElement.style.outlineWidth = '2px';
    artifactsElement.style.outlineStyle = 'dashed';
    artifactsElement.style.outlineColor = 'red';
  }
});

shopElement.addEventListener('dragend', function () {
  draggedItem.style.transform = 'scale(1)';
  artifactsElement.style.outlineWidth = '';
  artifactsElement.style.outlineStyle = '';
  artifactsElement.style.outlineColor = '';
});

artifactsElement.addEventListener('dragover', function (evt) {
  evt.preventDefault();
  return false;
});

artifactsElement.addEventListener('drop', function (evt) {
  evt.target.style.backgroundColor = '';
  var targetClick = evt.target;

  // ограничиваю всплытие блоком artifactsElement
  while (targetClick !== artifactsElement) {

    // если нахожу нужный элемент setup-artifacts-cell, то выполняю функцию
    if (targetClick.classList.contains('setup-artifacts-cell')) {

      // если ячейка пуста, то добавляю артифакт в эту ячейку
      if (targetClick.children.length < 1) {
        targetClick.appendChild(draggedItem);
      }

      break;
    }

    // поднимаюсь выше к родителю, чтоб проверить не содержит ли он setup-artifacts-cell
    targetClick = targetClick.parentElement;
  }

  draggedItem.style.transform = 'scale(1)';
  artifactsElement.style.outlineWidth = '';
  artifactsElement.style.outlineStyle = '';
  artifactsElement.style.outlineColor = '';
  evt.preventDefault();
});

artifactsElement.addEventListener('dragenter', function (evt) {
  evt.target.style.backgroundColor = 'yellow';
  evt.preventDefault();
});

artifactsElement.addEventListener('dragleave', function (evt) {
  evt.target.style.backgroundColor = '';
  evt.preventDefault();
});

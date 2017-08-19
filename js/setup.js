'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template');

var wizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария, Кристоф',
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

var coatColor = [
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
var wizards = [];

// функция генерации случайных данных в зависимости от длины массива
var randomProperty = function (arr) {
  var rand = Math.random() * arr.length;
  rand = Math.floor(rand);
  return rand;
};

// функция создания объекта со случайными значениями свойств
var createWizard = function () {
  var nameIndex1 = randomProperty(wizardNames);
  var nameIndex2 = randomProperty(wizardSecondNames);
  var coatIndex = randomProperty(coatColor);
  var eyeIndex = randomProperty(eyesColor);
  var object = {};

  if (Math.round(Math.random())) {
    object.name = wizardNames[nameIndex1] + ' ' + wizardSecondNames[nameIndex2];
  } else {
    object.name = wizardSecondNames[nameIndex2] + ' ' + wizardNames[nameIndex1];
  }

  object.coatColor = coatColor[coatIndex];
  object.eyesColor = eyesColor[eyeIndex];

  return object;
};

// функция добавления объектов в массив
var addWizardToArr = function (total, array) {
  for (var i = 0; i < total; i++) {
    array.push(createWizard());
  }

  return array;
};

// функция создания DOM-элемента на основе JS-объекта
addWizardToArr(totalWizards, wizards);

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.content.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;

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

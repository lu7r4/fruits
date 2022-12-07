const fruitsList = document.querySelector('.fruits__list');
const shuffleButton = document.querySelector('.shuffle__btn');
const filterButton = document.querySelector('.filter__btn');
const sortKindLabel = document.querySelector('.sort__kind');
const sortTimeLabel = document.querySelector('.sort__time');
const sortChangeButton = document.querySelector('.sort__change__btn');
const sortActionButton = document.querySelector('.sort__action__btn');
const kindInput = document.querySelector('.kind__input');
const colorInput = document.querySelector('.color__input');
const weightInput = document.querySelector('.weight__input');
const addActionButton = document.querySelector('.add__action__btn');
const minWeight = document.querySelector('.minweight__input');
const maxWeight = document.querySelector('.maxweight__input');
let tempor;



let fruitsJSON = `[
    {"kind": "Ява яблоко", "color": "Красный", "weight": 153},
    {"kind": "Физалис", "color": "Оранжевый", "weight": 130},
    {"kind": "Ананас", "color": "Желтый", "weight": 193},
    {"kind": "Манго зеленое", "color": "Зеленый", "weight": 97},
    {"kind": "Мангостин", "color": "Голубой", "weight": 102},
    {"kind": "Лонган", "color": "Синий", "weight": 36},
    {"kind": "Питахайя", "color": "Фиолетовый", "weight": 74}
]`;

let fruits = JSON.parse(fruitsJSON);

// карточки

const display = () => {
    fruitsList.innerHTML='';

    for (let i = 0; i <fruits.length; i++) {
    let newFruit = document.createElement("li");
        newFruit.classList.add("fruit__item");
        if (fruits[i].color=="Красный"){
            newFruit.classList.add("fruit_red");
            } else 
            if (fruits[i].color=="Оранжевый"){
                newFruit.classList.add("fruit_orange");
            } else
            if (fruits[i].color=="Желтый"){
                newFruit.classList.add("fruit_yellow");
            } else 
            if (fruits[i].color=="Зеленый"){
                newFruit.classList.add("fruit_green");
            } else 
            if (fruits[i].color=="Голубой"){
                newFruit.classList.add("fruit_skyblue");
            } else
            if (fruits[i].color=="Синий"){
                newFruit.classList.add("fruit_blue");
            } else
            if (fruits[i].color=="фиолетовый"){
                newFruit.classList.add("fruit_violet");
            } else newFruit.classList.add("fruit_violet");
        
            
        let fruitInfo=document.createElement("div");
            fruitInfo.classList.add("fruit__info");

        let indexFruit=document.createElement("div"),
            indexFruitContent=document.createTextNode("index: "+i); 
            indexFruit.appendChild(indexFruitContent); 

        let kindFruit=document.createElement("div"),
            kindFruitContent=document.createTextNode("kind: "+fruits[i].kind);
            kindFruit.appendChild(kindFruitContent);

        let colorFruit=document.createElement("div"),
            colorFruitContent=document.createTextNode("color: "+fruits[i].color);
            colorFruit.appendChild(colorFruitContent);

        let weightFruit=document.createElement("div"),
            weightFruitContent=document.createTextNode("weight (кг): "+fruits[i].weight);
            weightFruit.appendChild(weightFruitContent);

        fruitInfo.appendChild(indexFruit);
        fruitInfo.appendChild(kindFruit);
        fruitInfo.appendChild(colorFruit);
        fruitInfo.appendChild(weightFruit);

        newFruit.appendChild(fruitInfo);
        fruitsList.appendChild(newFruit);
    }
};
display();

// перемешивание

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max) ;
};
const shuffle = () => {
    let result = [];
    let i=0;
    while (fruits.length > 0) {
        let y = getRandomInt(fruits.length);
            result.splice(i++,0,fruits[y]);
            fruits.splice(y,1);
        }
    
        if (fruits===result) {
            shuffle = false;
            alert('Уточните данные')
        }
    fruits = result;
};

shuffleButton.addEventListener('click', () => {
    shuffle();
    display();
});

  // фильтрация 

const filterFruits = () => {
    let weightMin = (minWeight.value);
    let weightMax = (maxWeight.value);
    
let filteredFruits = fruits.filter((item) => {
    return item.weight >= weightMin && item.weight <= weightMax;
    
});
    tempor = fruits;
    fruits = filteredFruits;
};

filterButton.addEventListener('click', () => {
    filterFruits();
    display();
    fruits = tempor;
    });

let sortKind = 'bubbleSort';
let sortTime = '-'; 
let priority = ['Фиолетовый', 'Синий', 'Голубой', 'Зеленый', 'Желтый', 'Оранжевый', "Красный"];

const comparationColor = (a, b) => {
    const priority1 = priority.indexOf(a.color);
    const priority2 = priority.indexOf(b.color);
    return priority1 > priority2;
};

const sortAPI = {

bubbleSort(arr, comparationColor) {
    const f = arr.length;
    for (let i = 0; i < f-1; i++) { 
        for (let j = 0; j < f-1-i; j++) { 
            if (comparationColor(arr[j], arr[j+1])) { 
            let tempor = arr[j+1]; 
            arr[j+1] = arr[j]; 
            arr[j] = tempor; 
            }
        }
    }                    
},

// quickSort не сделано

startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
    }
};


sortTimeLabel.textContent = sortTime;
sortKindLabel.textContent = sortKind;

sortChangeButton.addEventListener('click', () => {
    sortKind='bubbleSort';
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = '';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ не сделано ***/


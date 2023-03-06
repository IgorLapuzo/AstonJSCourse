const DEFAULT_PROP = {
  durability: 100,
  speed: 10,
  trackLength: 200,
	fuel: 5,
};
const civilianCar = {
  name: 'Гражданский',
  fuel: 2,
  lowFuelConsumption: 2,
  durability: 2,
  speed: 4,
};
const sportCar = {
  name: 'Спортивный',
  fuel: 2,
  lowFuelConsumption: 1,
  durability: 1,
  speed: 6,
};
const militaryCar = {
  name: 'Военный',
  fuel: 2,
  lowFuelConsumption: 2,
  durability: 4,
  speed: 2,
};

const selectCar = document.querySelector('.select-car');
const gameSettings = document.querySelector('.game-settings');
const specifications = document.querySelector('specifications')
const carType = document.querySelector('.car-type');
const confirmCar = document.querySelector('.confirm-car');
const confirmTuning = document.querySelector('.confirm-tuning');
const confirmRivals = document.querySelector('.confirm-rivals');
const showResultTable = document.querySelector('.show-result-table');
const table = document.getElementsByTagName("td");
const specificationsTable = document.querySelector(".specifications-table");
const textChoseCar = document.querySelector('.text-chose-car');
const textImpruveCar = document.querySelector('.text-impruve-car');
const gameResult = document.querySelector('.game-result');
const rivalsLeft = document.querySelector('rivals-left');
const rivalsRight = document.querySelector('rivals-right');
const rivalsNumber = document.getElementById('rivals-number');
const rivalsTable = document.querySelector('.rivals-table');


let selectedCar = null;
let userCar = null;
let cars =[];

class Car {
  constructor(name = 'New car') {
    this.name = name;
    this.fuel = 0;
    this.lowFuelConsumption = 0;
    this.durability = 0;
    this.speed = 0;
  }

	addTuning(feature) {
		const totalPoints =
			this.fuel + this.lowFuelConsumption + this.durability + this.speed;
		if (totalPoints < 12) {
			this[feature] += 1;
		}
		if (totalPoints === 12) {
			alert('Превышен лимит распределяемых очков');
		}
		return this;
	}

  removeTuning(feature) {
    let minPoints = 0;
    switch(userCar.name) {
      case 'Гражданский автомобиль':
        minPoints = civilianCar[feature];
        break;
      case 'Спортивный автомобиль':
        minPoints = sportCar[feature];
        break; 
      case 'Военный автомобиль':
        minPoints = militaryCar[feature];
        break;
    }
    if (this[feature] <= minPoints) {
			alert('Значение не может быть меньше стандартного');
		}
		if (this[feature] > minPoints) {
			this[feature] -= 1;
		}
		return this;
	}

	addRivals(amount) {
    const rivals = [];
    for (let i = 0; i < amount; i++) {
      const types = ['Гражданский', 'Спортивный', 'Военный']
      const randomType = types[Math.floor(Math.random() * types.length)];
      if (randomType === 'Гражданский') {
        rivals.push(new Civilian(`Соперник ${i + 1}`));
        }
      if (randomType === 'Спортивный') {
        rivals.push(new Sport(`Соперник ${i + 1}`));
      }
      if (randomType === 'Военный') {
        rivals.push(new Military(`Соперник ${i + 1}`));
      }
      rivals[i].randomTuningRivals().randomTuningRivals();
    }
    return rivals;
  }

	randomTuningRivals() {
    const features = ['fuel', 'lowFuelConsumption', 'durability', 'speed'];
    const randomFeature = features[Math.floor(Math.random() * features.length)];
    this[randomFeature] += 1;
    return this;
  }

  getFuelDistance() {
    const totalFuel = this.fuel + DEFAULT_PROP.fuel;
    const totalDistance = totalFuel * DEFAULT_PROP.trackLength + totalFuel * 0.1 * DEFAULT_PROP.trackLength * this.lowFuelConsumption;
    return totalDistance;
  }

  getDurability() {
    const totalDurability =
      DEFAULT_PROP.durability + this.durability * 0.1 * DEFAULT_PROP.durability;
    return totalDurability;
  }

  getSpeed() {
    const totalspeed =
      DEFAULT_PROP.speed + this.speed * 0.05 * DEFAULT_PROP.speed;
    return totalspeed;
  }
}

class Civilian extends Car {
  constructor(name = 'Гражданский автомобиль') {
    super(name);
    this.fuel = civilianCar.fuel;
    this.lowFuelConsumption = civilianCar.lowFuelConsumption;
    this.durability = civilianCar.durability;
    this.speed = civilianCar.speed;
  }
}

class Sport extends Car {
  constructor(name = 'Спортивный автомобиль') {
    super(name);
    this.fuel = sportCar.fuel;
    this.lowFuelConsumption = sportCar.lowFuelConsumption;
    this.durability = sportCar.durability;
    this.speed = sportCar.speed;
  }
}

class Military extends Car {
  constructor(name = 'Военный автомобиль') {
    super(name);
    this.fuel = militaryCar.fuel;
    this.lowFuelConsumption = militaryCar.lowFuelConsumption;
    this.durability = militaryCar.durability;
    this.speed = militaryCar.speed;
  }
}

function firstScreen() {
  const firstScreenHandler = (e) => {
    if (e.target.id === 'civilian') {
      table[6].innerHTML = civilianCar.name;
      table[10].innerHTML  = civilianCar.fuel;
      table[14].innerHTML  = civilianCar.lowFuelConsumption;
      table[18].innerHTML  = civilianCar.durability;
      table[22].innerHTML  = civilianCar.speed;
      selectedCar = e.target.id;
      confirmCar.classList.remove('hidden');
    } 
    if (e.target.id === 'sport') {
      table[6].innerHTML = sportCar.name;
      table[10].innerHTML  = sportCar.fuel;
      table[14].innerHTML  = sportCar.lowFuelConsumption;
      table[18].innerHTML  = sportCar.durability;
      table[22].innerHTML  = sportCar.speed;
      selectedCar = e.target.id;
      confirmCar.classList.remove('hidden');
    } 
    if (e.target.id === 'military') {
      table[6].innerHTML = militaryCar.name;
      table[10].innerHTML  = militaryCar.fuel;
      table[14].innerHTML  = militaryCar.lowFuelConsumption;
      table[18].innerHTML  = militaryCar.durability;
      table[22].innerHTML  = militaryCar.speed;
      selectedCar = e.target.id;
      confirmCar.classList.remove('hidden');
    }
  }
  carType.addEventListener('click', firstScreenHandler);
  confirmCar.addEventListener('click', (e) =>{
    if (selectedCar === 'civilian') {
      userCar = new Civilian();
    }
    if (selectedCar === 'sport') {
      userCar = new Sport();
    }
    if (selectedCar === 'military') {
      userCar = new Military();
    }
  
  secondScreen();
  })
}

function secondScreen() {
  confirmCar.classList.add('hidden');
  confirmTuning.classList.remove('hidden');
  textChoseCar.classList.add('hidden');
  textImpruveCar.classList.remove('hidden');
  carType.classList.add('hidden');
  table[9].classList.remove('hidden');
  table[11].classList.remove('hidden');
  table[13].classList.remove('hidden');
  table[15].classList.remove('hidden');
  table[17].classList.remove('hidden');
  table[19].classList.remove('hidden');
  table[21].classList.remove('hidden');
  table[23].classList.remove('hidden');
  table[9].innerHTML = '<';
  table[11].innerHTML = '>';
  table[13].innerHTML = '<';
  table[15].innerHTML = '>';
  table[17].innerHTML = '<';
  table[19].innerHTML = '>';
  table[21].innerHTML = '<';
  table[23].innerHTML = '>';

  specificationsTable.addEventListener('click', (e)=> {
    switch(e.target.id) {
      case 'left-arrow-fuel hidden': 
        userCar.removeTuning('fuel')
        table[10].innerHTML = userCar.fuel;
        break;
      case 'right-arrow-fuel hidden': 
        userCar.addTuning('fuel')
        table[10].innerHTML = userCar.fuel;
        break;
      case 'left-arrow-lowFuelConsumption hidden': 
        userCar.removeTuning('lowFuelConsumption')
        table[14].innerHTML = userCar.lowFuelConsumption;
        break;  
      case 'right-arrow-lowFuelConsumption hidden': 
        userCar.addTuning('lowFuelConsumption')
        table[14].innerHTML = userCar.lowFuelConsumption;
        break;
      case 'left-arrow-durability hidden': 
        userCar.removeTuning('durability')
        table[18].innerHTML = userCar.durability;
        break;
      case 'right-arrow-durability hidden': 
        userCar.addTuning('durability')
        table[18].innerHTML = userCar.durability;
        break;
      case 'left-arrow-speed hidden': 
        userCar.removeTuning('speed')
        table[22].innerHTML = userCar.speed;
        break;
      case 'right-arrow-speed hidden': 
        userCar.addTuning('speed')
        table[22].innerHTML = userCar.speed;
        break;
    }
  });
  confirmTuning.addEventListener('click', (e) =>{
    thirdScreen();
    confirmTuning.classList.add('hidden');
  })
}

function thirdScreen() {
  selectCar.classList.add('hidden');
  gameSettings.classList.remove('hidden');
  confirmRivals.classList.remove('hidden');
  let count = 0;
  rivalsTable.addEventListener('click', (e) => {
    if (e.target.id === 'rivals-right') {
      count += 1;
    }
    if (e.target.id === 'rivals-left') {
      count -= 1;
    }
    rivalsNumber.textContent = count;
  })
  confirmRivals.addEventListener('click', (e) => {
    cars = userCar.addRivals(count);
    cars.unshift(userCar);
    fourthScreen();
  })
}

const compare = (cars) => {
  const statsArr = cars.map((item) => {
    return {
      name: item.name,
      fuelDistance: item.getFuelDistance(),
      durability: item.getDurability(),
      speed: item.getSpeed(),
    };
  });
  return statsArr;
}

const resultTable = (cars) => {
  const comparativeMatrix = document.getElementById('comparative-matrix');
  const compareListArr = compare(cars);
  compareListArr.forEach((item) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.name}</td> <td>${item.fuelDistance}</td> <td>${item.durability}</td> <td>${item.speed}</td>`;
    comparativeMatrix.appendChild(tr);
  });
};

function fourthScreen() {
  gameSettings.classList.add('hidden');
  confirmRivals.classList.add('hidden');
  gameResult.classList.remove('hidden');
  resultTable(cars);
}

firstScreen()

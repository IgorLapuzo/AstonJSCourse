const DEFAULT_PROP = {
  durability: 100,
  speed: 10,
  trackLength: 800,
	fuel: 5,
};
const civilianCar = {
  name: 'Гражданский',
  fuel: 2,
  lowFuelConsumption: 2,
  durability: 2,
  speed: 4,
}
const sportCar = {
  name: 'Спортивный',
  fuel: 2,
  lowFuelConsumption: 1,
  durability: 1,
  speed: 6,
}
const militaryCar = {
  name: 'Военный',
  fuel: 2,
  lowFuelConsumption: 2,
  durability: 4,
  speed: 2,
}

const selectCar = document.querySelector('.select-car');
const gameSettings = document.querySelector('.game-settings');
const specifications = document.querySelector('specifications')
const carType = document.querySelector('.car-type');
const confirmCar = document.querySelector('.confirm');
const table = document.getElementsByTagName("td");

let selectedCar = null;
let userCar = null;

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
			console.log(totalPoints);
			this[feature] += 1;
		}
		if (totalPoints === 12) {
			console.log(totalPoints);
			console.log('Превышен лимит распределяемых очков');
		}
		return this;
	}

	addRivals(amount) {
    const rivals = [];
    for (let i = 0; i < amount; i++) {
      rivals.push(new this.constructor(`Соперник ${i + 1}`));
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

carType.addEventListener('click', (e)=> {
  if (e.target.id === 'civilian') {
    table[3].innerHTML = civilianCar.name;
    table[5].innerHTML  = civilianCar.fuel;
    table[7].innerHTML  = civilianCar.lowFuelConsumption;
    table[9].innerHTML  = civilianCar.durability;
    table[11].innerHTML  = civilianCar.speed;
    selectedCar = e.target.id;
  } 
  if (e.target.id === 'sport') {
    table[3].innerHTML = sportCar.name
    table[5].innerHTML  = sportCar.fuel
    table[7].innerHTML  = sportCar.lowFuelConsumption
    table[9].innerHTML  = sportCar.durability
    table[11].innerHTML  = sportCar.speed
    selectedCar = e.target.id;
  } 
  if (e.target.id === 'military') {
    table[3].innerHTML = militaryCar.name
    table[5].innerHTML  = militaryCar.fuel
    table[7].innerHTML  = militaryCar.lowFuelConsumption
    table[9].innerHTML  = militaryCar.durability
    table[11].innerHTML  = militaryCar.speed
    selectedCar = e.target.id;
  } 
});

confirmCar.addEventListener('click', (e)=> {
  if (selectedCar === 'civilian') {
    userCar = new Civilian();
    console.log(userCar)
    selectCar.classList.add('hidden');
    gameSettings.classList.remove('hidden');
  }
  if (selectedCar === 'sport') {
    userCar = new Sport();
    console.log(userCar)
    selectCar.classList.add('hidden');
    gameSettings.classList.remove('hidden');
  }
  if (selectedCar === 'military') {
    userCar = new Military();
    console.log(userCar)
    selectCar.classList.add('hidden');
    gameSettings.classList.remove('hidden');
  }
});

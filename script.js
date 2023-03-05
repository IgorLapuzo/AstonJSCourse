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
const textChoseCar = document.querySelector('.text-chose-car');
const textImpruveCar = document.querySelector('.text-impruve-car');

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

  getFuelDistance() {
    const totalFuel = this.fuel + DEFAULT_PROP.FUEL;
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

const findMax = (arr, param) => {
  const max = arr.reduce((acc, item) => {
    item[param] >= acc ? acc = item[param] : acc
    return acc;
  }, 0);
  return max;
};

const compare = (carsArray) => {
  const statsArr = carsArray.map((item) => {
    return {
      name: item.name,
      fuelDistance: item.getFuelDistance(),
      durability: item.getDurability(),
      speed: item.getSpeed(),
    };
  });
}

carType.addEventListener('click', (e)=> {
  if (e.target.id === 'civilian') {
    table[6].innerHTML = civilianCar.name;
    table[10].innerHTML  = civilianCar.fuel;
    table[14].innerHTML  = civilianCar.lowFuelConsumption;
    table[18].innerHTML  = civilianCar.durability;
    table[22].innerHTML  = civilianCar.speed;
    selectedCar = e.target.id;
  } 
  if (e.target.id === 'sport') {
    table[6].innerHTML = sportCar.name
    table[10].innerHTML  = sportCar.fuel
    table[14].innerHTML  = sportCar.lowFuelConsumption
    table[18].innerHTML  = sportCar.durability
    table[22].innerHTML  = sportCar.speed
    selectedCar = e.target.id;
  } 
  if (e.target.id === 'military') {
    table[6].innerHTML = militaryCar.name
    table[10].innerHTML  = militaryCar.fuel
    table[14].innerHTML  = militaryCar.lowFuelConsumption
    table[18].innerHTML  = militaryCar.durability
    table[22].innerHTML  = militaryCar.speed
    selectedCar = e.target.id;
  } 
  console.log(table)
});

confirmCar.addEventListener('click', (e)=> {
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
  textChoseCar.classList.add('hidden');
  textImpruveCar.classList.remove('hidden');
  carType.classList.add('hidden');

  if (selectedCar === 'civilian') {
    userCar = new Civilian();
    console.log(userCar)
  }
  if (selectedCar === 'sport') {
    userCar = new Sport();
    console.log(userCar)
    //selectCar.classList.add('hidden');
    //gameSettings.classList.remove('hidden');
  }
  if (selectedCar === 'military') {
    userCar = new Military();
    console.log(userCar)
    //selectCar.classList.add('hidden');
    //gameSettings.classList.remove('hidden');
  }
});

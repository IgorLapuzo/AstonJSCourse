const DEFAULT_PROP = {
  durability: 100,
  speed: 10,
  trackLength: 800,
	fuel: 5,
};
const defaultCar = { 
  name: 'Без автомобиля',
  fuel: 0,
  lowFuelConsumption: 0,
  durability: 0,
  speed: 0,
};
const civilianCar = {
  name: 'Гражданский автомобиль',
  fuel: 2,
  lowFuelConsumption: 2,
  durability: 2,
  speed: 4,
}
const sportCar = {
  name: 'Спортивный автомобиль',
  fuel: 2,
  lowFuelConsumption: 1,
  durability: 1,
  speed: 6,
}
const militaryCar = {
  name: 'Военный автомобиль',
  fuel: 2,
  lowFuelConsumption: 2,
  durability: 4,
  speed: 2,
}
const selectCar = document.querySelector('.select-car');
const specifications = document.querySelector('specifications')
const carType = document.querySelector('.car-type');

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

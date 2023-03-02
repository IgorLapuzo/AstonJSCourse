const DEFAULT_PROP = {
  durability: 100,
  speed: 10,
  trackLength: 800,
	fuel: 5,
};

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
    this.fuel = 2;
    this.lowFuelConsumption = 2;
    this.durability = 2;
    this.speed = 4;
  }
}

class Sport extends Car {
  constructor(name = 'Спортивный автомобиль') {
    super(name);
    this.fuel = 2;
    this.lowFuelConsumption = 1;
    this.durability = 1;
    this.speed = 6;
  }
}

class Military extends Car {
  constructor(name = 'Военный автомобиль') {
    super(name);
    this.fuel = 2;
    this.lowFuelConsumption = 2;
    this.durability = 4;
    this.speed = 2;
  }
}

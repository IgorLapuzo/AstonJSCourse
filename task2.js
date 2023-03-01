function Company (name, salary) {
	let profit = 0;
	Object.defineProperties(this, {
		name: {
			writable: false,
			configurable: false,
			value: name,
		},
		profit: {
      get() {
        return profit;
      },
      configurable: false,
      enumerable: false,
    },
	})
	this.income = (value) => (profit += value - salary);
  this.spend = (value) => (profit -= value);
	Company.addStaff(this);
}

Object.defineProperties(Company, {
  staffList: {
    value: [],
    configurable: false,
    enumerable: false,
  },
  countStaff: {
    get() {
      return this.staffList.length;
    },
    configurable: false,
    enumerable: false,
  },
  money: {
    get() {
      return this.staffList.reduce((money, staff) => {
        return (money += staff.profit);
      }, 0);
    },
    configurable: false,
    enumerable: false,
  },
	store: {
    get() {
      return {
        staffList: this.staffList.map((staff) => ({
          name: staff.name,
          income: staff.profit,
        })),
        countStaff: this.countStaff,
        money: this.money,
      };
    },
    configurable: false
  },
}) 

Company.addStaff = function (staff) {
  this.staffList.push(staff);
}

Company.getLeaders = function () {
  let maxProfitStaff = this.staffList.reduce((prev,cur) => cur.profit >= prev.profit ? cur : prev, {profit: -Infinity});
  return this.staffList
		.filter((staff) => staff.profit === maxProfitStaff.profit)
		.map((staff) => ({
			name: staff.name,
			income: staff.profit,
		}));
}

function createLiker() {
	return {
		rating: 0,
		dislike() { 
			this.rating -= 1;
			return this;
		},
		like() {
			this.rating += 1;
			return this;
		},
		val() {
			return this.rating;
		},
	}
}

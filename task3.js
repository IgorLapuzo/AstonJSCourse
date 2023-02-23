function createPerson({name = 'New User', skills = []}) {
  return {
    name,
    skills,
    addSkill(skill) {
      if (!skills.includes(skill)) {
        skills.push(skill);  
      }
      return this;
    },
    removeSkill(skill) {
      if (skills.includes(skill)) {
        skills.splice(skills.findIndex(x => x === skill), 1);
      }
      return this;
    },
    addName(newName) {
      this.name = newName;
      return this;
    },
  }
}
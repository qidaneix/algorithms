class LazyMan {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log("Hi, Im " + name);
      this.next();
    };
    this.tasks.push(task);
    setTimeout(() => {
      this.next();
    });
  }

  sleep(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time);
    };
    this.tasks.push(task);
    return this;
  }

  sleepFirst(time) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time);
    };
    this.tasks.unshift(task);
    return this;
  }

  eat(food) {
    const task = () => {
      console.log(`Eat ${food}`);
      this.next();
    };
    this.tasks.push(task);
    return this;
  }

  next() {
    const task = this.tasks.shift();
    if (task) task();
  }
}

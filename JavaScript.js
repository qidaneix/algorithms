// class Person {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getName() {
//     return this.name;
//   }
//   getAge() {
//     return this.age;
//   }
// }

// class Student extends Person {
//   constructor(name, age, className, grade) {
//     super(name, age);
//     this.className = className;
//     this.grade = grade;
//   }
//   getClassName() {
//     return this.className;
//   }
//   getGrade() {
//     return this.grade;
//   }
// }

// const stu = new Student("Jim", 19, "六班", "初三");

// for (const key in stu) {
//   console.log("for in", key, stu[key]);
// }

// Object.keys(stu).forEach((key) => {
//   console.log("keys", key, stu[key]);
// });

const obj = Object.create({ a: 1, b: 2 });
obj.c = 3;
obj.d = 4;

for (const key in obj) {
  console.log("for in", key, obj[key]);
}

Object.keys(obj).forEach((key) => {
  console.log("keys", key, obj[key]);
});

/**
 * 类
 */
function object(prototype) {
  const F = new Function();
  F.prototype = prototype;
  return F;
}
function setPrototype(supClass) {
  const F = object(supClass.prototype);
  F.prototype.constructor = supClass;
  return new F();
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function () {
  return this.name;
};
Person.prototype.setAge = function (age) {
  this.age = age;
};

function Man(name, age, job, brave) {
  Person.call(this, name, age);
  this.job = job;
  this.brave = brave;
}
Man.prototype = setPrototype(Person);
Man.prototype.setBrave = function (brave) {
  this.brave = brave;
};
Man.prototype.getJob = function () {
  return this.job;
};

const xiaojin = new Man("肖金", 29, "工程师", "非常");

// javascript 发布订阅模式
class EventEmitter {
  constructor() {
    // 缓存列表
    this.listener = {};
  }

  // 订阅
  on(eventName, fn) {
    const callbacks = this.listener[eventName];
    if (callbacks) callbacks.push({ fn, once: false });
    else this.listener[eventName] = [{ fn, once: false }];
  }

  // 取消订阅
  off(eventName, fn) {
    const callbacks = this.listener[eventName];
    if (!callbacks || !callbacks.length) return false;
    if (!fn) callbacks.splice(0, callbacks.length - 1);
    else
      this.listener[eventName] = callbacks.filter((event) => event.fn !== fn);
  }

  // 执行一次
  once(eventName, fn) {
    const callbacks = this.listener[eventName];
    if (callbacks) callbacks.push({ fn, once: true });
    else this.listener[eventName] = [{ fn, once: true }];
  }

  // 发布
  emit(eventName, data) {
    const callbacks = this.listener[eventName];
    if (callbacks && callbacks.length) {
      callbacks.forEach((event) => {
        event.fn(data);
      });
      this.listener[eventName] = callbacks.filter((event) => !event.once);
    }
  }
}

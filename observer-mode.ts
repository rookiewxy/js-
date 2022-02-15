/*
 * @Description: 观察者模式
 * @Autor: wxy
 * @Date: 2022-02-15 18:13:43
 * @LastEditors: wxy
 * @LastEditTime: 2022-02-15 18:14:57
 */

// !观察者模式，它定义了一种一对多的关系，让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象，使得它们能够自动更新自己。
interface Observer {
  notify: Function;
}

class ConcreteObserver implements Observer{
  constructor(private name: string) {}

  notify() {
    console.log(`${this.name} has been notified.`);
  }
}

class Subject { 
  private observers: Observer[] = [];

  public addObserver(observer: Observer): void {
    console.log(observer, "is pushed!");
    this.observers.push(observer);
  }

  public deleteObserver(observer: Observer): void {
    console.log("remove", observer);
    const n: number = this.observers.indexOf(observer);
    n != -1 && this.observers.splice(n, 1);
  }

  public notifyObservers(): void {
    console.log("notify all the observers", this.observers);
    this.observers.forEach(observer => observer.notify());
  }
}

const subject: Subject = new Subject();
const xiaoQin = new ConcreteObserver("小秦");
const xiaoWang = new ConcreteObserver("小王");
subject.addObserver(xiaoQin);
subject.addObserver(xiaoWang);
subject.notifyObservers();

subject.deleteObserver(xiaoQin);
subject.notifyObservers();

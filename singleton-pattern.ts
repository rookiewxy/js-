/*
 * @Description: 单例模式
 * @Autor: wxy
 * @Date: 2022-02-15 17:46:23
 * @LastEditors: wxy
 * @LastEditTime: 2022-02-15 17:52:32
 */

// !有一些对象我们往往只需要一个，比如全局缓存、浏览器中的 window 对象等。单例模式用于保证一个类仅有一个实例，并提供一个访问它的全局访问点。

class Singleton {
  private static singleton: Singleton;
  private constructor() { }
  // 提供一个静态的方法来获取对象实例
  public static getInstance(): Singleton {
    if (!Singleton.singleton) {
      Singleton.singleton = new Singleton();
    }
    return Singleton.singleton;
  }
}

let instance1 = Singleton.getInstance();
let instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // true

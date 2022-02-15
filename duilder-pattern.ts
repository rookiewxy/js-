/*
 * @Description: 建造者模式
 * @Autor: wxy
 * @Date: 2022-02-15 16:58:48
 * @LastEditors: wxy
 * @LastEditTime: 2022-02-15 17:17:28
 */

// !需要生成的产品对象有复杂的内部结构，这些产品对象通常包含多个成员属性。
// !需要生成的产品对象的属性相互依赖，需要指定其生成顺序。
// !隔离复杂对象的创建和使用，并使得相同的创建过程可以创建不同的产品。

class Car {
  constructor(
    public engine: string,
    public chassis: string, 
    public body: string
  ) {}
}

class CarBuilder {
  engine!: string; // 引擎
  chassis!: string; // 底盘
  body!: string; // 车身

  addChassis(chassis: string) {
    this.chassis = chassis;
    return this;
  }

  addEngine(engine: string) {
    this.engine = engine;
    return this;
  }

  addBody(body: string) {
    this.body = body;
    return this;
  }

  build() {
    return new Car(this.engine, this.chassis, this.body);
  }
}

const car = new CarBuilder()
  .addEngine('v12')
  .addBody('镁合金')
  .addChassis('复合材料')
  .build();

  console.log(car, 'car')
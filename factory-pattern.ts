/*
 * @Description: 工厂模式（简单工厂，工厂模式，抽象工厂）
 * @Autor: wxy
 * @Date: 2022-02-15 17:18:27
 * @LastEditors: wxy
 * @LastEditTime: 2022-02-15 17:43:21
 */

/**
 * @description 简单工厂
 */

// !简单工厂模式又叫 静态方法模式
// !工厂类负责创建的对象比较少：由于创建的对象比较少，不会造成工厂方法中业务逻辑过于复杂。
// !客户端只需知道传入工厂类静态方法的参数，而不需要关心创建对象的细节。

abstract class BMW {
  abstract run(): void;
}

class BMW730 extends BMW {
  run(): void {
    console.log("BMW730 发动咯");
  }
}

class BMW840 extends BMW {
  run(): void {
    console.log("BMW840 发动咯");
  }
}

class BMWFactory {
  public static produceBMW(model: "730" | "840"): BMW {
    if (model === "730") {
      return new BMW730();
    } else {
      return new BMW840();
    }
  }
}

const bmw730 = BMWFactory.produceBMW("730");
const bmw840 = BMWFactory.produceBMW("840");

bmw730.run();
bmw840.run();

/**
 * @deprecated 工厂方法模式（Factory Method Pattern）又称为工厂模式
 */

class BMW730Factory extends BMWFactory {
  produceBMW(): BMW {
    return new BMW730();
  }
}

class BMW840Factory extends BMWFactory {
  produceBMW(): BMW {
    return new BMW840();
  }
}

const bmw730Factory = new BMW730Factory();
const bmw840Factory = new BMW840Factory();

const bmw7302 = bmw730Factory.produceBMW();
const bmw8402 = bmw840Factory.produceBMW();

bmw7302.run();
bmw8402.run();


/**
 * @description抽象工厂
 */

// !有时候我们需要一个工厂可以提供多个产品对象，而不是单一的产品对象。
class ConcreteBMWFactory extends BMWFactory {
  produce730BMW(): BMW730 {
    return new BMW730();
  }

  produce840BMW(): BMW840 {
    return new BMW840();
  }
}

const bmwFactory = new ConcreteBMWFactory();

const bmw7303 = bmwFactory.produce730BMW();
const bmw8403 = bmwFactory.produce840BMW();

bmw7303.run();
bmw8403.run();

/*
 * @Description: 策略模式
 * @Autor: wxy
 * @Date: 2022-02-15 18:18:29
 * @LastEditors: wxy
 * @LastEditTime: 2022-02-15 18:20:00
 */

// !一个系统需要动态地在几种算法中选择一种时，可将每个算法封装到策略类中。
interface Strategy {
  authenticate(...args: any): any;
}

class Authenticator {
  strategy: any;
  constructor() {
    this.strategy = null;
  }

  setStrategy(strategy: any) {
    this.strategy = strategy;
  }

  authenticate(...args: any) {
    if (!this.strategy) {
      console.log('尚未设置认证策略');
      return;
    }
    return this.strategy.authenticate(...args);
  }
}

class WechatStrategy implements Strategy {
  authenticate(wechatToken: string) {
    if (wechatToken !== '123') {
      console.log('无效的微信用户');
      return;
    }
    console.log('微信认证成功');
  }
}

class LocalStrategy implements Strategy {
  authenticate(username: string, password: string) {
    if (username !== 'abao' && password !== '123') {
      console.log('账号或密码错误');
      return;
    }
    console.log('账号和密码认证成功');
  }
}

const auth = new Authenticator();

auth.setStrategy(new WechatStrategy());
auth.authenticate('123456');

auth.setStrategy(new LocalStrategy());
auth.authenticate('abao', '123');

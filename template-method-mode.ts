/*
 * @Description: 模板方法模式
 * @Autor: wxy
 * @Date: 2022-02-15 18:20:41
 * @LastEditors: wxy
 * @LastEditTime: 2022-02-15 18:20:41
 */
 
// !通常在抽象父类中封装了子类的算法框架，也包括实现一些公共方法以及封装子类中所有方法的执行顺序
import fs from 'fs';

abstract class DataParser {
  data: string = '';
  out: any = null;

  // 这就是所谓的模板方法
  parse(pathUrl: string) {
    this.readFile(pathUrl);
    this.doParsing();
    this.printData();
  }

  readFile(pathUrl: string) {
    this.data = fs.readFileSync(pathUrl, 'utf8');
  }

  abstract doParsing(): void;
  
  printData() {
    console.log(this.out);
  }
}

class CSVParser extends DataParser {
  doParsing() {
    this.out = this.data.split(',');
  }
}

class MarkupParser extends DataParser {
  doParsing() {
    this.out = this.data.match(/<\w+>.*<\/\w+>/gim);
  }
}

const csvPath = './data.csv';
const mdPath = './design-pattern.md';

new CSVParser().parse(csvPath);
new MarkupParser().parse(mdPath);

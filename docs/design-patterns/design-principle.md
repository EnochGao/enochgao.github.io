# 设计原则(SOLID)

设计原则是用来指导我们程序设计的指南，保证程序的健壮性和可维护性。它们是前辈们的总结，设计模式是对它们的实现

## 单一职责原则（SRP）

单一职责原则（Single Responsibility Principle）一个类只负责一个功能领域，一个类应该只有一个引起它变化的原因。

## 开闭原则（OCP）

开闭原则（Open Closed Principle）对扩展开放，对修改关闭。一个类去做扩展，但不能修改。

## 里氏替换原则（LSP）

里氏替换原则（Liskov Substitution Principle）父类出现的地方，可以被子类替换，子类可以扩展父类的功能，但不能更改父类的功能。

## 接口隔离原则（ISP）

接口隔离原则（Interface Segregation Principle）子类不应该继承基类中不使用的方法，应该调整基类或者拆分多个接口

## 依赖倒转原则（DIP）

依赖倒转原则（Dependency Inversion Principal）抽象不应该依赖于细节，细节应该依赖于抽象，高层模块不应该直接依赖低层模块，应该都依赖于抽象，不能直接依赖具体类。

## 迪米特法则（LOD）

迪米特法则（Law of Demeter）一个对象应该对其他对象有最少的了解

## 合成复用原则（CRP）

合成复用原则（Composite Reuse Principle）尽量使用组合/聚合的方式，而不是使用继承。

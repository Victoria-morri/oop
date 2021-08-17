class Food {
    constructor(){
        this.cal={'coffee': 20,
                    'cola': 40,
                    'small': 20,
                    'large': 40,
                    'chesse': 20,
                    'salad': 5,
                    'potato': 10,
                    'olivie': 80,
                    'cezar': 20 };
        this.price={'coffee': 80,
                    'cola': 50,
                    'small': 50,
                    'large': 100,
                    'chesse': 10,
                    'salad': 20,
                    'potato': 15,
                    'olivie': 50,
                    'cezar': 100 };
    }
    getCalories(...args){
        let calories = 0;
        if (args.length===0){
            throw new Error("Choose the type of food");
        }
        if(args.length>1 && typeof args[1] === 'number'){// проверка , что второй арг это number значит салат, считаем по другому
            this.checkValidityCal([args[0]]);
            calories += (this.cal[args[0]] / 100 * args[1]);
        } else{
            this.checkValidityCal(args);
            for(let i = 0; i< args.length; i++){
                calories += this.cal[args[i]];
            }
        }
        return calories;
    }
    checkValidityCal(args){// Проверка на наличие позиции в словаре каллорий
        if(args.filter((elem)=>{
            return this.cal[elem] === undefined;
        }).length > 0){
            throw new Error(`have not this position`);
        }
    }

    checkValidityPrice(args){// Проверка на наличие позиции в словаре цен
        if(args.filter((elem)=>{
            return this.price[elem] === undefined;
        }).length > 0){
            throw new Error(`have not this position in menu`);
        }
    }

    getPrice(...args) {
        let price = 0;
        if (args.length===0){
            throw new Error("Choose the type of food");
        }
        if(args.length>1 && typeof args[1] === 'number'){
            this.checkValidityPrice([args[0]]);
            price += (this.price[args[0]] / 100 * args[1]);
        } else{
            this.checkValidityPrice(args);
            for(let i = 0; i< args.length; i++){
                price += this.price[args[i]];
            }
        }
        return price;
    }
}
/**
* Класс, объекты которого описывают параметры гамбургера.
*
* @constructor
* @param size        Размер
* @param stuffing    Начинка
*/
class Hamburger extends Food{
    constructor(size, stuffing) {
        super();
        switch(size){
            case 'small':
            this.SIZE_SMALL = size;
            break;
            case 'large':
            this.SIZE_LARGE = size;
            break;
            default:
            break;
        }

        switch(stuffing){
            case 'chesse':
            this.STUFFING_CHEESE = stuffing;
            break;
            case 'salad':
            this.STUFFING_SALAD = stuffing;
            break;
            case 'potato':
            this.STUFFING_POTATO = stuffing;
            break;
            default:
            break;
        }
    }

/**
 * Узнать размер гамбургера
 */
getSize() {
    return this.SIZE_SMALL || this.SIZE_LARGE;
}

/**
 * Узнать начинку гамбургера
 */
getStuffing() {
    return this.STUFFING_CHEESE || this.STUFFING_SALAD || this.STUFFING_POTATO;
}
/**
 * Узнать цену гамбургера
 * @return {Number} Цена в тугриках
 */
calculatePrice() {
    // композиция
    const price = this.getPrice(this.getSize(), this.getStuffing());
    return price;
}
/**
 * Узнать калорийность
 * @return {Number} Калорийность в калориях
 */
calculateCalories(){
    // композиция
    const calories = this.getCalories(this.getSize(), this.getStuffing());
    return calories;
}
}

class Salad extends Food{
    constructor(salad_type, weight){
        super();
        switch(salad_type){
            case 'olivie':
            this.SALAD_OLIVIE = salad_type;
            break;
            case 'cezar':
            this.SALAD_CEZAR = salad_type;
            break;
            default:
                break;
        }
        this.SALAD_WEIGHT=weight;
    }
    getSaladType(){
        return this.SALAD_OLIVIE || this.SALAD_CEZAR;
    }
    getSaladWeight(){
        return this.SALAD_WEIGHT;
    }
    calculatePrice(){
        const price = this.getPrice(this.getSaladType(), this.getSaladWeight());
        return price;
    }
    calculateCalories(){
        const calories = this.getCalories(this.getSaladType(), this.getSaladWeight());
        return calories;
    }
}

class Drink extends Food{
    constructor(drink){
        super();
        switch(drink){
            case('cola'):
            this.DRINK_COLA = drink;
            break;
            case('coffee'):
            this.DRINK_COFFEE = drink;
            break;
            default:
                break;
        }
    }

    getDrink(){
        return  this.DRINK_COLA || this.DRINK_COFFEE;
    }
    calculatePrice(){
        const price = this.getPrice(this.getDrink());
        return price;
    }
    calculateCalories(){
        const calories = this.getCalories(this.getDrink());
        return calories;
    }
}
/**
* Класс, объекты которого добавляют и удаляют позиции, подсчитывают общую стоимость и фиксируют заказ после оплаты.
*
*/
class Order{
    constructor(){
        this.HAMBUGER_LIST = [];
        this.SALAD_LIST = [];
        this.DRINK  = [];
        this.ORDER_PAID = false;// флаг, при true нельзя изменять объект
    }

    addHamburger(size, stuffing){
        if(this.ORDER_PAID){// проверка, оплачен ли заказ и можно ли его менять
            return console.log('Order already paid, you can`t edit the order');
        }else{
            if (!size || !stuffing) {// проверка , а все ли аргументы переданы
                return console.log("Choose the size of your hamburger and the stuffing");
            }
           if(this.HAMBUGER_LIST.filter(item=>item.includes(size)&&item.includes(stuffing)).length>0){// проверка, есть ли данная позиция в заказе
            return console.log('Order already has this position, choose ahother one');
           }else{
            this.HAMBUGER_LIST.push([size, stuffing]);
           }
        }
    }

    removeHamburger(size, stuffing){
        if(this.ORDER_PAID){
            return console.log('Order already paid, you can`t edit the order');
        }else{
            if (!size || !stuffing) {
                return console.log("Choose the size of your hamburger and the stuffing");
            }
           if(this.HAMBUGER_LIST.filter(item=>item.includes(size)&&item.includes(stuffing)).length===0){
            return console.log('Order has not this position, choose ahother one');
           }else{
            let index = this.HAMBUGER_LIST.findIndex(function(item){
            return item.includes(size)&&item.includes(stuffing)
            });
            this.HAMBUGER_LIST.splice(index, 1);
           }
        }
    }

    addSalad(salad_type, weight){
        if(this.ORDER_PAID){
            return console.log('Order already paid, you can`t edit the order');
        }else{
            if (!salad_type || !weight) {
                return console.log("Choose the salad type or weight");
            }
           if(this.SALAD_LIST.filter(item=>item.includes(salad_type)&&item.includes(weight)).length>0){
            return console.log('Order already has this position, choose ahother one');
           }else{
            this.SALAD_LIST.push([salad_type, weight]);
           }
        }
    }
    removeSalad(salad_type, weight){
        if(this.ORDER_PAID){
            return console.log('Order already paid, you can`t edit the order');
        }else{
            if (!salad_type || !weight) {
                return console.log("Choose the salad type or weight");
            }
           if(this.SALAD_LIST.filter(item=>item.includes(salad_type)&&item.includes(weight)).length===0){
            return console.log('Order has not this position, choose ahother one');
           }else{
              // console.log(this.HAMBUGER_LIST);
            let index = this.SALAD_LIST.findIndex(function(item){
            return item.includes(salad_type)&&item.includes(weight)
            });
            this.SALAD_LIST.splice(index, 1);
            console.log(this.SALAD_LIST);
           }
        }
    }
    addDrink(drink){
        if(this.ORDER_PAID){
            return console.log('Order already paid, you can`t edit the order');
        }else{
            if (!this.DRINK) {
                return console.log("Choose the drink");
            }
           if(this.DRINK.includes(drink)){
            return console.log('Order already has this position, choose ahother one');
           }else{
            this.DRINK.push(drink);
           }
        }
    }
    removeDrink(drink){
        if(this.ORDER_PAID){
            return console.log('Order already paid, you can`t edit the order');
        }else{
            if (!drink) {
                return console.log("Choose the drink");
            }
           if(!this.DRINK.includes(drink)){
            return console.log('Order has not this position, choose ahother one');
           }else{
            let index = this.DRINK.indexOf(drink);
            this.DRINK.splice(index, 1);
           }
        }
    }

    getOrderList(){// возвращаем массив заказа(видим что заказали)
        return [this.HAMBUGER_LIST, this.SALAD_LIST, this.DRINK];
    }

    getOrderPrice(){// суммируем стоимость всего заказа
        let price = 0;
        this.HAMBUGER_LIST.forEach((item)=>{
          let ham = new Hamburger(item[0],item[1]);
          price += ham.calculatePrice();
        });
        this.SALAD_LIST.forEach((item)=>{
            let salad = new Salad(item[0],item[1]);
            price += salad.calculatePrice();
          });
        this.DRINK.forEach((item)=>{
            let drink = new Drink(item);
            price += drink.calculatePrice();
        });
        return price;
    }

    getOrderCalories(){// суммируем каллории всего заказа
        let calories = 0;
        this.HAMBUGER_LIST.forEach((item)=>{
          let ham = new Hamburger(item[0],item[1]);
          calories += ham.calculateCalories();
        });
        this.SALAD_LIST.forEach((item)=>{
            let salad = new Salad(item[0],item[1]);
            calories += salad.calculateCalories();
          });
        this.DRINK.forEach((item)=>{
            let drink = new Drink(item);
            calories += drink.calculateCalories();
        });
        return calories;
    }

     payOrder(){
        this.ORDER_PAID = true;
    }
}
// код для тестирования
// const ord1 = new Order();
// ord1.addHamburger('large','chesse');
// ord1.addHamburger('large','potato');// добавляет позицию т.к. начинка отличается
// ord1.removeHamburger('large','chesse');
// ord1.addHamburger('large','salad');
// ord1.addSalad('olivie', 120);
// ord1.addSalad('cezar', 120);
// ord1.removeSalad('olivie', 120);
// ord1.addDrink('coffee');
// ord1.addDrink('coffee');// выводит в консоль ошибку, т.к. позиция уже есть в заказе
// ord1.addDrink('cola');
// ord1.removeDrink('cola');

// ord1.addDrink('cola');// добавляет колу т.к. в заказе она отсутствует(прошлая удалена)
// ord1.payOrder();
// console.log(ord1.getOrderPrice());
// console.log(ord1.getOrderCalories());
// ord1.addDrink('cola');
// console.log(ord1.getOrderList());
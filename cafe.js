class Food{
    constructor(options){
        this.name = options.name;
    }
    getName(){
        return this.name;
    }
}
class Hamburger extends Food{
    constructor(options){
        super(options);
        this.SIZES = [{size: 'small', price: '50', calories: '20'}, {size: 'large', price: '100', calories: '40'}];
        this.STUFFINGS = [{stuffing: 'cheese', price: '10', calories: '20'},
            {stuffing: 'salad', price: '20', calories: '5'},
            {stuffing: 'potato', price: '15', calories: '10'}
        ];
        this.stuffing = options.stuffing;
        this.size = options.size;
    }

    calculatePrice(){
        if(!this.SIZES.find((elem)=>{return elem.size === this.size})||!this.STUFFINGS.find((elem)=>{return elem.stuffing === this.stuffing})){
            throw new Error(`have not this position in menu`);
        };
        const priceOfSize = Number(this.SIZES.find((elem)=>{return elem.size === this.size}).price);
        const priceOfStuffing = Number(this.STUFFINGS.find((elem)=>{return elem.stuffing === this.stuffing}).price);
        const price = priceOfSize + priceOfStuffing;
        return price;
    }

    calculateCalories(){
        if(!this.SIZES.find((elem)=>{return elem.size === this.size})||!this.STUFFINGS.find((elem)=>{return elem.stuffing === this.stuffing})){
            throw new Error(`have not this position in menu`);
        };
        const caloriesOfSize = Number(this.SIZES.find((elem)=>{return elem.size === this.size}).calories);
        const caloriesOfStuffing = Number(this.STUFFINGS.find((elem)=>{return elem.stuffing === this.stuffing}).calories);
        const calories = caloriesOfSize + caloriesOfStuffing;
        return calories;
    }
}
class Salad extends Food{
    constructor(options){
    super(options);
    this.type = options.type;
    this.weight = options.weight;
    this.TYPES = [{type: 'olivie', price: '50', calories: '80'}, {type: 'caesar', price: '100', calories: '20'}];
    this.SERVING_WEIGHT = 100;
    }

    calculatePrice(){
        if(!this.TYPES.find((elem)=>{return elem.type === this.type})){
            throw new Error(`have not this position in menu`);
        };
        const priceOfType = Number(this.TYPES.find((elem)=>{return elem.type === this.type}).price)/this.SERVING_WEIGHT;
        const price = priceOfType * Number(this.weight);
        return price;
    }
    calculateCalories(){
        if(!this.TYPES.find((elem)=>{return elem.type === this.type})){
            throw new Error(`have not this position in menu`);
        };
        const calsOfType = Number(this.TYPES.find((elem)=>{return elem.type === this.type}).calories)/this.SERVING_WEIGHT;
        const calories = calsOfType * Number(this.weight);
        return calories;
    }
}

class Drink extends Food{
    constructor(options){
        super(options);
        this.type = options.type;
        this.TYPES = [{type: 'cola', price: '50', calories: '40'}, {type: 'coffee', price: '80', calories: '20'}];
    }

    calculatePrice(){
        const price = Number(this.TYPES.find((elem)=>{return elem.type === this.type}).price);
        return price;
    }
    calculateCalories(){
        const calories = Number(this.TYPES.find((elem)=>{return elem.type === this.type}).calories);
        return calories;
    }
}
class Order{
    constructor(){
        this.HAMBUGER_LIST = [];
        this.SALAD_LIST = [];
        this.DRINK  = [];
        this.ORDER_PAID = false;// флаг, при true нельзя изменять объект
    }

    addItem(order){
        if(this.ORDER_PAID){// проверка, оплачен ли заказ и можно ли его менять
            return console.log('Order already paid, you can`t edit the order');
        };
        switch (order.name){
            case 'hamburger':
                if(!order.size || !order.stuffing){// проверка , а все ли аргументы переданы
                    return console.log("Choose the size of your hamburger and the stuffing");
                };
                if(this.HAMBUGER_LIST.filter(item=>item.size===order.size&&item.stuffing===order.stuffing).length>0){// проверка, есть ли данная позиция в заказе
                return console.log('Order already has this position, choose ahother one');
                }else{
                this.HAMBUGER_LIST.push(order);
                };
                break;
            case 'salad':
                if(!order.type || !order.weight){
                    return console.log("Choose the salad type or weight");
                };
                if(this.SALAD_LIST.find(item=>item.type === order.type&&item.weight===order.weight)){
                return console.log('Order already has this position, choose ahother one');
                }else{
                this.SALAD_LIST.push(order);
                };
                break;
            case 'drink':
                if(!order.type){
                    return console.log("Choose the drink");
                };
                if(this.DRINK.find(item=>item.type === order.type)){
                return console.log('Order already has this position, choose ahother one');
                }else{
                this.DRINK.push(order);
                };
                break;
        }

    }

    removeItem(order){
        if(this.ORDER_PAID){// проверка, оплачен ли заказ и можно ли его менять
            return console.log('Order already paid, you can`t edit the order');
        }
        switch (order.name){
            case 'hamburger':
                if(!order.size || !order.stuffing){
                    return console.log("Choose the size of your hamburger and the stuffing");
                };
                if(this.HAMBUGER_LIST.filter(item=>item.size===order.size&&item.stuffing===order.stuffing).length===0){
                return console.log('Order has not this position, choose ahother one');
                }else{
                let index = this.HAMBUGER_LIST.findIndex(function(item){
                return item.size&&item.stuffing;
                });
                this.HAMBUGER_LIST.splice(index, 1);
                }
                break;
            case 'salad':
                if(!order.type || !order.weight){
                    return console.log("Choose the salad type or weight");
                };
                if(!this.SALAD_LIST.find(item=>item.type === order.type&&item.weight===order.weight)){
                return console.log('Order has not this position, choose ahother one');
                }else{
                let index = this.SALAD_LIST.findIndex(function(item){
                return item.type === order.type&&item.weight===order.weight
                });
                this.SALAD_LIST.splice(index, 1);
                };
                break;
            case 'drink':
                if(!order.type){
                    return console.log("Choose the drink");
                };
                if(!this.DRINK.find(item=>item.type === order.type)){
                return console.log('Order has not this position, choose ahother one');
                }else{
                let index = this.DRINK.findIndex((item)=>{return item.type === order.type});
                this.DRINK.splice(index, 1);
                };
                break;
        }
    }

    getOrderList(){// возвращаем массив заказа(видим что заказали)
        return [this.HAMBUGER_LIST, this.SALAD_LIST, this.DRINK];
    }

    getOrderPrice(){// суммируем стоимость всего заказа
        let price = 0;
        this.HAMBUGER_LIST.forEach((item)=>{
          let ham = new Hamburger(item);
          price += ham.calculatePrice();
        });
        this.SALAD_LIST.forEach((item)=>{
            let salad = new Salad(item);
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
          let ham = new Hamburger(item);
          calories += ham.calculateCalories();
        });
        this.SALAD_LIST.forEach((item)=>{
            let salad = new Salad(item);
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
// code for test
// const ord1 = new Order();
// ord1.addItem({name:'hamburger', stuffing:'cheese', size:'large'});
// ord1.addItem({name:'hamburger', stuffing:'potato', size:'large'});
// ord1.addItem({name:'hamburger', stuffing:'cheese', size:'large'});
// ord1.removeItem({name:'hamburger', stuffing:'cheese', size:'large'});
// ord1.addItem({name:'hamburger', stuffing:'salad', size:'large'});
// ord1.addItem({name:'salad', type:'olivie', weight: '120'})
// ord1.addItem({name:'salad', type:'olivie', weight: '120'})
// ord1.removeItem({name:'salad', type:'olivie', weight: '120'})
// ord1.addItem({name:'salad', type:'caesar', weight: '120'})
// ord1.addItem({name:'salad', type:'olivie', weight: '120'})
// ord1.getOrderPrice();
// ord1.getOrderCalories();
// ord1.addItem({name: 'drink', type: 'coffee'});
// ord1.addItem({name: 'drink', type: 'coffee'});
// ord1.addItem({name: 'drink', type: 'cola'});
// ord1.removeItem({name: 'drink', type: 'cola'});
// ord1.addItem({name: 'drink', type: 'coffee'});
// console.log(ord1.getOrderList());
// console.log(ord1.getOrderPrice());
// console.log(ord1.getOrderCalories());

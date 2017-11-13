export class Friend{
    public id : number;
    public name: string;
    public cost: number;
    public power: number;
    public level: number;

    constructor(id :number ,name: string, cost:number,power:number){
        this.id= id;
        this.name = name;
        this.cost = cost;
        this.power = power;
    }
    
    getId():number{
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    getCost(): number{
        return this.cost;
    }
    
    getPower(): number{
        return this.power;
    }
    getLevel():number{
        return this.level;
    }
    setLevel(level){
        this.level=level;
    }
}
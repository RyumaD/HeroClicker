export class Monster{
    public exp: number;
    public id : number;
    public name: string;
    public hp: number;
    public gold:number;
    public picture:string;

    constructor(id:number,name: string){
        this.id = id;
        this.name = name;
    }
    getPicture():string{
        return this.picture;
    }
    setPicture(picture){
        this.picture = picture;
    }
    getId():number{
        return this.id;
    }

    getName(): string{
        return this.name;
    }
    
    getHp(): number{
        return this.hp;
    }

    getGold():number{
        return this.gold;
    }

    getExp():number{
        return this.exp;
    }

    setHp(hp){
        this.hp=hp;
    }

    setGold(gold){
        this.gold=gold;
    }

    setExp(exp){
        this.exp=exp;
    }
}
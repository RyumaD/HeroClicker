export class User{
    public level: number;
    public exp: number;
    public gold: number;
    public id : number;
    public username: string;
    public password: string;
    public power: number;

    constructor(username: string, password:string){
        this.id= 0;
        this.username = username;
        this.password = password;
    }
    
    getId():number{
        return this.id;
    }

    getUsername(): string{
        return this.username;
    }

    getPassword(): string{
        return this.password;
    }
    
    getPower(): number{
        return this.power;
    }

    getGold():number{
        return this.gold;
    }

    getExp():number{
        return this.exp;
    }

    getLevel():number{
        return this.level;
    }

    setId(id){
        this.id=id;
    }
    
    setPower(power){
        this.power=power;
    }

    setGold(gold){
        this.gold=gold;
    }

    setExp(exp){
        this.exp=exp;
    }

    setLevel(level){
        this.level=level;
    }
}
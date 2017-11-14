import { Component, trigger, state, animate, transition, style, keyframes } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../class/User';
import { HttpClient } from '@angular/common/http';
import { Monster } from '../class/Monster';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService],
  animations: [
    trigger('flyInOut', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 0.1s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ]),
  ]
})

export class AppComponent {
  public pourcentage: string;
  public hp: number;
  public monster: Monster;
  public totalMonster: number;
  public flaglog: boolean = true;
  public flagplayer: boolean = false;
  public flaglifebar: boolean = false;
  public player: User;
  title = 'app';
  public menuchoice: string='';
  public display:boolean = false;
  public display1:boolean = false;
  public display2:boolean = false;
  public display3:boolean = false;
  public display4:boolean = false;
  public login:User = new User('ryumad','azertyuiop');
  public signin:User = new User('','');
   

  constructor(private service: ApiService){
    this.AllMonster()
  }

  choiceMenu(display){
    switch (display) {
      case "hero":
        if(this.display1 == false){
          if(this.display == true){
            this.display2 = false;
            this.display3 = false;
            this.display4 = false;
          }
          this.display = true;
          this.display1 = true;
        }
        else{
          this.display = false;
          this.display1 = false;
        }
        break;

      case "team":
        if(this.display2 == false){
          if(this.display == true){
            this.display1 = false;
            this.display3 = false;
            this.display4 = false;
          }
          this.display = true;
          this.display2 = true;
        }
        else{
          this.display = false;
          this.display2 = false;
        }
        break;

      case "object":
        if(this.display3 == false){
          if(this.display == true){
            this.display2 = false;
            this.display1 = false;
            this.display4 = false;
          }
          this.display = true;
          this.display3 = true;
        }
        else{
          this.display = false;
          this.display3 = false;
        }
        break;

      case "option":
        if(this.display4 == false){
          if(this.display == true){
            this.display2 = false;
            this.display3 = false;
            this.display1 = false;
          }
          this.display = true;
          this.display4 = true;
        }
        else{
          this.display = false;
          this.display4 = false;
        }
        break;
    }
  }
  hit(power){
    let mob = document.getElementById('Monster');
    mob.className='animate';
    setTimeout(function() {
      mob.classList.remove('animate');
    }, 100);
    
    if(this.hp>0){
      this.hp = this.hp - power;
      this.LifeBar();
      if(this.hp<=0){
        this.recolt();
        this.RandomMonsterById();
      }
    }
  }

  LogIn(){
    let user:User = new User(this.login.getUsername(),this.login.getPassword())
    this.service.postLogIn(user)
      .then( (data) => {
        if(data.json().success == true){
            let player = new User(data.json().id.username,data.json().id.password);
            player.setId(data.json().id.id);
            player.setLevel(data.json().id.level);
            player.setGold(data.json().id.gold);
            let power = data.json().id.power
            for(let i=0; i<data.json().id.level;i++){
              power = power + 3
            }
            player.setPower(power);
            player.setExp(data.json().id.exp);
            this.player= player;
            this.flagplayer = true;
            this.flaglog = false;

          }
          
      } );
  }

  SignIn(){
    let user:User = new User(this.signin.getUsername(),this.signin.getPassword())
    this.service.postSignin(user).then( (data) => {  } );
  }

  RandomMonsterById(){
    setTimeout(()=>{
      let id = this.getRandomIntInclusive(1,this.totalMonster)
      this.service.getMonsterById(id)
      .then( (data) => {
        console.log(data);
        let level = this.player.getLevel();
        let monster = new Monster(data.json().id.id,data.json().id.name);
        let gold = data.json().id.gold*(level*2);
        monster.setGold(gold);
        let hp = data.json().id.hp*(level*2);
        monster.setHp(hp);
        let exp = data.json().id.exp*(level*2);
        monster.setExp(exp);
        monster.setPicture(data.json().id.picture);
        let img = document.getElementById("Monster");
        img.style.backgroundImage = "url('assets/"+monster.getPicture()+"')";
        this.monster = monster;
        this.hp = this.monster.getHp();
        this.LifeBar();
        this.flaglifebar=true;
      } );
    },500)
    
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

  AllMonster(){
    this.service.getAllMonster().then( (data) => {
      let i = 0
      for(let monster of data.json().id){
        i++;
      }
      this.totalMonster = i;
    } );
  }

  LifeBar() {
    if(this.flaglifebar==true){
      let progressBar = document.getElementById( "progressBar" );
      progressBar.style.width = (this.hp*100)/this.monster.getHp()+'%'
      this.pourcentage = (this.hp*100)/this.monster.getHp()+'%'
      
    }
    
  }

  recolt(){
    this.service.getUserById(this.player).then( (data) => {
      let exp = this.monster.getExp() + data.json().id.exp;
      let gold = this.monster.getGold() + data.json().id.gold;
      let level = this.player.getLevel() + 1;
      this.player.setExp(exp);
      this.player.setGold(gold);
      this.player.setLevel(level);
      let power = 0
      for(let i=0; i<this.player.getLevel();i++){
        power = power + 3
      }
      this.player.setPower(power)
      this.service.userGold(gold, this.player.id)
      .then( (data) => {
      } );
      this.service.userExp(exp, this.player.id)
      .then( (data) => {
      } );
      this.service.userLevel(level, this.player.id)
      .then( (data) => {
      } );
    } );
    
  }
}
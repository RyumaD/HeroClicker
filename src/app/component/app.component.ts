import { Component, trigger, state, animate, transition, style, keyframes } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../class/User';
import { HttpClient } from '@angular/common/http';

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
    ])
  ]
})

export class AppComponent {
  public flaglog: boolean = true;
  public flagplayer: boolean = false;
  public player: User;
  title = 'app';
  public menuchoice: string='';
  public display:boolean = false;
  public display1:boolean = false;
  public display2:boolean = false;
  public display3:boolean = false;
  public display4:boolean = false;
  public login:User = new User('','');
  public signin:User = new User('','');
   

  constructor(private service: ApiService){

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
  hit(){ 
    console.log("hey");
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
            player.setPower(data.json().id.power);
            player.setExp(data.json().id.exp);
            this.player= player;
            console.log(player);
            this.flagplayer = true;
            this.flaglog = false;

          }
          console.log(data);
      } );
  }

  SignIn(){
    let user:User = new User(this.signin.getUsername(),this.signin.getPassword())
    this.service.postSignin(user);
  }

}
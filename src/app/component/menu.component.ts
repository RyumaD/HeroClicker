import { Component, trigger, state, animate, transition, style, keyframes, Input, OnChanges } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Object } from '../class/Object';
import { Friend } from '../class/Friend';
import { User } from '../class/User';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})

export class MenuComponent implements OnChanges {
    public myfriends: [{}] = [""];
    public myobjects: [{}] = [""];
    public friends:[{}] = [""];
    public flagobj:boolean = false;
    public flagteam:boolean = false;
    public actualobject: Object;
    public actualfriend: Friend;
    public objects:[{}] = [""];

    @Input() 
    public menuchoice: string;

    @Input() 
    public player: User;


    constructor( private service: ApiService ){}

    showAllObject(){
       this.service.getAllObject()
        .then( (data) => {
            for(let object of data.json().id){
                let obj = new Object(object.id,object.name,object.cost,object.power)
                this.objects.push(obj);
            }
        } )
    }
    showObject(ids){
        this.service.getObjectById(ids)
         .then( (data) => {
            this.actualobject = new Object(data.json().id.id,data.json().id.name,data.json().id.cost,data.json().id.power)
            this.flagobj=true;
         } )
         
    }
    showMyObject(ids){
        this.service.getMyObjectById(ids)
        .then( (data) => {
            for(let object of data.json().id){
                this.showMyObjectExt(object)
            }
        } )
    }

    showMyObjectExt(object){
        this.service.getObjectById(object.objectid)
         .then( (data) => {
            let obj = new Object(data.json().id.id,data.json().id.name,data.json().id.cost,data.json().id.power);
            obj.setLevel(object.level);
            this.myobjects.push(obj);
         } )
         
    }
    
    showAllFriend(){
        this.service.getAllFriend()
        .then( (data) => {
            for(let friend of data.json().id){
                let frnd = new Friend(friend.id,friend.name,friend.cost,friend.power)
                this.friends.push(frnd);
            }
        } )
    }
    showFriend(ids){
        this.service.getFriendById(ids)
         .then( (data) => {
            this.actualfriend = new Friend(data.json().id.id,data.json().id.name,data.json().id.cost,data.json().id.power)
            this.flagteam=true;
         } )
         
    }
    showMyFriend(ids){
        this.service.getMyFriendById(ids)
        .then( (data) => {
            console.log(data.json().id);
            for(let friend of data.json().id){
                this.showMyFriendExt(friend)
            }
        } )
    }

    showMyFriendExt(friend){
        console.log("ah");
        this.service.getFriendById(friend.friendid)
         .then( (data) => {
            console.log(data+"ahahahahahaha");
            let frnd = new Friend(data.json().id.id,data.json().id.name,data.json().id.cost,data.json().id.power);
            frnd.setLevel(friend.level);
            this.myfriends.push(frnd);
         } )
         
    }

    ngOnChanges(): void {
        if(this.menuchoice == "object"){
            this.objects = [""];
            this.myobjects = [""];
            this.showAllObject();
            this.showMyObject(this.player.getId());
        }
        if(this.menuchoice == "team"){
            this.friends = [""];
            this.myfriends = [""];
            this.showAllFriend();
            this.showMyFriend(this.player.getId());
        }
        if(this.menuchoice == "hero"){

        }
    }
}
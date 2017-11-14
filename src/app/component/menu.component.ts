import { Component, trigger, state, animate, transition, style, keyframes, Input, OnChanges } from '@angular/core';
import { ApiService } from '../service/api.service';
import { Object } from '../class/Object';
import { Friend } from '../class/Friend';
import { User } from '../class/User';
import { Monster } from '../class/Monster';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})

export class MenuComponent implements OnChanges {
    public canbuy:boolean = false;
    public unbuyobject: Object[] = [];
    public unbuyfriend: Friend[] = [];
    public myfriends: Friend[] = [];
    public myobjects: Object[] = [];
    public friends:Friend[] = [];
    public flagobj:boolean = false;
    public flagteam:boolean = false;
    public actualobject: Object;
    public actualfriend: Friend;
    public objects:Object[] = [];

    @Input() 
    public menuchoice: string;

    @Input() 
    public player: User;

    @Input()
    public monster:Monster;


    constructor( private service: ApiService ){}

    showAllObject(){
       this.service.getAllObject()
        .then( (data) => {
            let i = 0;
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
            if(data.json().id.cost <= this.player.getGold()){
                this.canbuy = true;
            }
            else{
                this.canbuy = false;
            }
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
            if(data.json().id.cost <= this.player.getGold()){
                this.canbuy = true;
            }
            else{
                this.canbuy = false;
            }
         } )
         
    }
    showMyFriend(ids){
        this.service.getMyFriendById(ids)
        .then( (data) => {
            for(let friend of data.json().id){
                this.showMyFriendExt(friend)
            }
        } )
    }

    showMyFriendExt(friend){
        this.service.getFriendById(friend.friendid)
         .then( (data) => {
            let frnd = new Friend(data.json().id.id,data.json().id.name,data.json().id.cost,data.json().id.power);
            frnd.setLevel(friend.level);
            this.myfriends.push(frnd);
         } )
         
    }

    sortObject(){
      setTimeout(()=>{
            for(let object of this.objects){
                for(let myobject of this.myobjects){
                    if(object.id == myobject.id){

                    }
                    else{
                        this.unbuyobject.push(object);
                    }
                }
            }  
        }, 500);
    }

    sortFriend(){
        setTimeout(()=>{
            for(let friend of this.friends){
                for(let myfriend of this.myfriends){
                    if(friend.id == myfriend.id){

                    }
                    else{
                        this.unbuyfriend.push(friend);
                    }
                }
            }  
        }, 500);
    }

    levelUpFriend(friend){
        friend.level = friend.level+1;
        this.service.friendLevel(friend.id,friend.level)
        .then( (data) => {
        } )
        let gold = this.player.getGold() - friend.cost;
        this.service.userGold( gold,this.player.id)
        .then( (data) => {
        } )
    }
    levelUpObject(object){
        object.level = object.level+1;
        this.service.objectLevel(object.id,object.level)
        .then( (data) => {
        } )
        let gold = this.player.getGold() - object.cost;
        this.service.userGold( gold,this.player.id)
        .then( (data) => {
        } )
    }
    ngOnChanges(): void {
        if(this.menuchoice == "object"){
            this.objects = [];
            this.myobjects = [];
            this.unbuyobject = [];
            this.showAllObject();
            this.showMyObject(this.player.getId());
            this.sortObject();
        }
        if(this.menuchoice == "team"){
            this.friends = [];
            this.myfriends = [];
            this.unbuyfriend = [];
            this.showAllFriend();
            this.showMyFriend(this.player.getId());
            this.sortFriend();
        }
        if(this.menuchoice == "hero"){

        }
    }
}
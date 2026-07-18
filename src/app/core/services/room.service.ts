import { Injectable } from '@angular/core';
import { Room } from '../Models/room.model';



@Injectable({
  providedIn:'root'
})
export class RoomService {



private STORAGE_KEY='rooms';



private rooms:Room[]=[];





constructor(){

  this.load();

}






private load():void{


const data =
localStorage.getItem(this.STORAGE_KEY);



if(data){


  this.rooms=JSON.parse(data);


}

else{


this.rooms=[


{
id:1,
roomNumber:'A101',
houseId:1,
floor:1,
roomType:'Single',
capacity:1,
occupied:0,
monthlyRent:250000,
status:'Available',
description:'Single self-contained room'
},



{
id:2,
roomNumber:'B201',
houseId:1,
floor:2,
roomType:'Double',
capacity:2,
occupied:1,
monthlyRent:450000,
status:'Available',
description:'Double room with balcony'
}



];



this.save();


}




}









private save():void{


localStorage.setItem(

this.STORAGE_KEY,

JSON.stringify(this.rooms)

);


}










getAll():Room[]{


return this.rooms;


}







getById(id:number):Room|undefined{


return this.rooms.find(
room=>room.id===id
);


}








getByHouseId(houseId:number):Room[]{


return this.rooms.filter(
room=>room.houseId===houseId
);


}








add(room:Room):void{


const id =
this.rooms.length
?
Math.max(
...this.rooms.map(r=>r.id)
)+1
:
1;





this.rooms.push({

...room,

id

});



this.save();



}









update(room:Room):void{


const index =
this.rooms.findIndex(
r=>r.id===room.id
);





if(index!==-1){


this.rooms[index]=room;


this.save();


}



}









delete(id:number):void{


this.rooms =
this.rooms.filter(
room=>room.id!==id
);



this.save();



}








updateStatus(room:Room):void{


if(room.occupied>=room.capacity){


room.status='Occupied';


}

else{


room.status='Available';


}



this.update(room);



}








getAvailableRooms():Room[]{



return this.rooms.filter(

room=>room.status==='Available'

);



}






}
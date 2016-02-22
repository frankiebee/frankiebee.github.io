//what goes in player?
//health
//inventory of stuff
var troll = {
	health: 40,
	damage: 8,
}
var  player={
	turns: 0,
	health: 30,
	damage: 3,

};
player.inventory = ["Sword", "flint stone", "health potion"];
player.playerActions = {
	attack: function(){return (Math.floor(Math.random() * (10 - 1)) + 1) + player.damage;},
	take: function(thing){
		if (player.inventory.length < 15){
		player.inventory.push(thing);
		return "Taken!"
		}
		else{ return "You have to many things you cant carry them all.";}
	},
	drop: function(thing){var
		remove = player.inventory.indexOf(thing);
		player.inventory.splice(remove)
		return "Dropped!"},
};
troll.attack = function(){return (Math.floor(Math.random() * (10 - 1)) + 1) + player.damage;};
var Scenes = {//1 is allways the answer!
		0: "You are standing at the entrance to a cave at the bottom of a small hill and, you hear the far off rumble of what possibly could be a Troll. To the left of the cave is a sign it says: \"Beware the man eater!\". Below the sign hangs a extinguished torch.", //scene 1
		1: ["You enter the cave. You can barley see a thing but you can hear the sound of birds and the rustling of trees behind you.",
		"You are in the cave and their are 3 passageways. There is one going to the LEFT that has a strange smell coming from it, one going to the RIGHT with a faint flicker further down the cave and one straight ahead."],//scene 2
		2: [
			"You are in a giant cavern and (dramatic pause)Oh no! You are facing the man eating Troll! Behind him in a cage next to the giant boiling pot of soup, is the Marsh Prince. What do you do?",	//left[0]
			"You have found your self in cavern with a pile of hay that could resemble a bed. Next to the pile of hay is a small bottle with a little fairy in it.she says:\"If you free me from this bottle i will open the special door for you.\"",	//right [1]
			"You walk down the cavern for some time And have found your self at a locked door. The door is huge and majestic painted with beautiful patterns and colors so wonderful that the only thing comparable could be the sunset it self. You want to go in but the door does not open. And your torch goes out."	//straight [2]
		],//scene 3
		3: ["its pitch black","The fairy's light is just bright enough to see her materialize the key out of thin air with her magic. A key hole that was not there before glows bright. She puts the key In the key hole and both the key and hole disappear. The doors slowly swing open."],//scene 4
		4: "You enter to find a giant Wizard Lizard siting at his giant desk reading by giant candle light. \"Oh hello You are quiet small aren't you? and i see you have freed the blue spec of dust lilly from her tinny bottle.\"the fairy in a huff leaves. The wizard lizard continues\"Well you seam to be a nice fellow you must be here to deal with that awful troll fellow. I wish to help, TAKE this sword and potion of good fortune to win!\" " , //scene 5
			5: ["Its dark, your torch is out", "behind you is the door huge and majestic painted with beautiful patterns and colors so wonderful that the only thing comparable could be the sunset it self With the Wizard Lizard inside. In front of you is a cave passage "],



			};			// scene 6
// function pasingCommands(input,passable){
// 		for (var check = 0; check <= input.length; check +=1){
// 				for (var real = 0; real <= passable.length; real+=1;){
// 						if(input[check] === passable[real]){

// 						}
// 				}
// 		}
// }
Scenes.rightOrder = [
					Scenes[0],
					Scenes[1][1],
					Scenes[2][1],
					Scenes[1][1],
					Scenes[3][1],
					Scenes[4],
					Scenes[5][0],//unless torch was lit while in scene 4
					Scenes[5][1],
					Scenes[1][1],
					Scenes[2][0],
					];
Scenes.valid_command{
	0: ["go","forward","take","torch"],
	1: [["light","torch","go","back"],["go","forward","right","left"]],
	2: [["attack","troll","go","back"],["take","open","bottle","light","hay","go","back"],["open","door","go","back"]],
	3: [["light","torch"],["go","forward","back"]],
	4: ["take","sword","potion","go","back"],
	5: [["light","torch"],["go","forward","back"]]
};
player.command = [];
player.scene = [Scenes[0]];
Scenes.checkOrder = function(command){
	player.command.push(command);
	var check = player.scenes.length
	if (Scenes.rightOrder.slice(0,check) === player.scenes){
		return true
	}
}
function toMove(scene_num,direction){
	switch (scene_num){
		case 0:
			if(valid(direction)){
				message = 1;
				if(player.torch){ sub_message = 1;}
				else{ sub_message = 0;}
			}
			else{ message = message; return false;}
			break;
		case 1:
			if(valid(direction)){
				message += 1;
				switch(direction){
					case "left":
						sub_message = 0;
						return true;
					case "right":
						sub_message = 1;
						return true;
					case "forward":
						sub_message = 2;
						player.torch = false;
						return true;
					default: return false;
				}
			}
			else{ message = message; return false;}
		case 2:
			switch(sub_message){
				case 0:
					if(valid(direction)){
						message = 1;
						if (player.torch) {sub_mesage = 1;};
						else{sub_mesage = 0;}
						return true;
					}
				case 1:
					if(valid(direction)){
						message = 1;
						if (player.torch) {sub_mesage = 1;};
						else{sub_mesage = 0;}
						return true;
					}
				case 2:
					if(valid(direction)){
						message = 1;
						if (player.fairyFriend) {sub_mesage = 1;};
						else{sub_mesage = 0;}
						return true;
					}
				}
		case 3:
			if(player.torch || player.fairyFriend){
				if (valid(direction)){
					switch(direction){
						case "forward":
							message = 4
							return true;
						case "back":
							message = 1
							sub_mesage= 1;
							return true;
						default: return false;
					}
				}
			}
		case 4:
			player.fairyFriend = false; ////////////!!!!!!!!!!!! must finish
			if(player.torch){sub_mesage = 1;}
			else{sub_mesage = 0;}
		case 5:

	}

}
function apropMesage(scene_num,input,valid_commands,curent_scene){
	function valid(com){
		for (var thing = 0; thing < valid_command.length; thig += 1){
			if (Scenes.valid_command[thing] === com){return true;}
		}
		return false;
	}
	switch (input[0]){
		case "help":
			return "Well... heres the help: You can \" go directions\", check your\"inventory\", \"attack\" and \"take\\drop stuff\".";
		case "inventory":
			return player.inventory;

		case "drop":
				if (player.inventory.indexOf(input[1]) > -1){
					Scenes[scene_num] = Scenes[scene_num] + " As well as a " +input[1] + " on the ground.";
					return player.inventory.remove(inventory.indexOf(input[1], 1));
				}
				else{
					return "You don have that in your inventory.";
				}

		case "take":
				if (!valid(input[0],valid_commands)){
					return "There is nothing to take here.";
				}
				if (valid(input[1],valid_commands)){
					Scenes[scene_num] = Scenes[scene_num] + " Well at least there was until you took it ";
					if (input[1] === "fairy"){player.fairyFriend = false;}
					return player.playerActions.take(input[1]);
				}
				else{
					return "You can't take that"
				}

		case "light":
			if (valid(input[1],valid_commands)) {
					if (player.inventory.indexOf("torch") > -1){
						player.torch = true;
						return "Torch is lit";
					}
					else if (scene_num === 0){return "Torch is lit.";}
					else{return "You dont have a torch.";}
			}
		case "go":
			if (valid(input[1],valid_commands)) {
				switch (input[1]){
					case "forward":
						if (scene_num === 5 || scene_num === 1){
							if (player.torch){
								if(scene_num === 5){message = 1;}
								else{
									if (player.fairyFriend)
								}
								sub_message = 1
							}
							else
						}

						if (curent_scene === Scenes[1][1]){sub_message = 2;}
						return Scenes[message][sub_message];


					case "back":
						message -= 1;
						if (player.torch && message > 1){
							sub_message = 1;
							return Scenes[message][sub_message];
						}
						return Scenes[message];
					case "right":

					case "left":
			}
			else{
				return "Where do you want to go?"
				}
			}
		case "attack":
			if (valid(input[0],valid_commands)){
				if (valid(input[1],valid_commands)){
						if (player.playerActions.attack() > troll.attack()){
							troll.health -= player.damage;
							if (troll.health <= 0 ){
								return "You have defeated the troll! And have freed the prince, Congratulations you WIN! Hit ENTER to reset.";
							}
							else{
								return "You attack the troll and he goes to block the swing of your sword but he misses, and you land a hit!";
							}
						}
						else {
							player.health -= troll.damage;
							if (player.health > 0){
								return "You go to attack and the troll doges your blade! He then through a mad punch at you and lands it right in the tum! Woof that hurts, your health has gone down to " + player.health;
							}
							else {
								message = 0;
								sub_message = 0;
								player.torch = false;
								player.health = 30
								player.damage = 3
								"Oh NOoo! You went to swing your sword and the troll crushed your skull in! You are dead. Hit ENTER to reset";
							}
						}

				}
			}
			else{
				return "There is nothing to attack here";
			}
			case "look":
				if (input.length == 1) {
					return curent_scene;
				}
	//
	//
			default:
				return = "I don't understand what you want to do.";


	}
}
// var story_measge = document.getElementById("story").innerHTML = text;
// story line:
// you are at the entrance to a cave and you must
// rescue the prince of the Marsh lands. what do you do?
// You have entered the cave
//Befor you lies three passage ways
var message = -1, sub_message = 0, input = '', new_in = new Object();
function handle(event){
	if(event.keyCode === 13){
		input = document.getElementById("command").value.toLowerCase().split(" ");
		document.getElementById("form").reset();
		console.log(input[0]);
		console.log(input[1]);
		console.log(message);
		console.log(sub_message);
		var story_line = Scenes[message];
		document.getElementById("story").innerHTML = story_line;
	}
	return false;
}
	// switch(message){
	//
	// 	case 1:
	//
	// 		else if (input[0] ==="go"){
	// 			if (sub_message === 1){
	// 				if (input[1] === "forward"){
	// 					sub_message = 2;
	// 					message += 1;
	// 					story_line = Scenes[message][sub_message];
	// 				}
	// 				else if (input[1] === "back"){
	// 					if (player.torch === 1) {sub_message = 1;}
	// 					story_line = story_line[message][sub_message];
	// 				}
	// 				else if (input[1] === "left"){
	// 					sub_message = 0;
	// 					message += 1;
	// 					story_line = Scenes[message][sub_message];
	// 					sub_message = 1
	// 				}
	// 				else if (input[1] === "right"){
	// 					sub_message = 1;
	// 					message += 1;
	// 					story_line = Scenes[message][sub_message];
	// 				}
	// 				else{
	// 				story_line = "Where do you want to go?";
	// 				}

	// 			}
	// 			else if (input[1] === "back"){
	// 				message -= 1;
	// 				story_line = story_line[message];
	// 			}
	// 			else {
	// 				story_line = "Its to dark to go anywhere";
	// 			}
	// 		}
	// 		else if (input[0] === "attack"){
	// 			story_line = "There is nothing to attack here";
	// 		}
	// 		else if (input.length === 1 && input[0] === "look"){
	// 			story_line = Scenes[message][story_line];
	// 		}
	// 		else{
	// 			story_line = "I don't understand what you want to do.";
	// 		}

	// 		player.turns += 1;
	// 		break;
	// 	case 2:
	// 		if (input[0] === "help"){
	// 			story_line = "Well... heres the help: You can \" go directions\", check your\"inventory\", \"attack\" and \"take\\drop stuff\".";
	// 		}
	// 		else if (input[0] === "inventory"){
	// 			story_line = player.inventory;
	// 		}
	// 		else if (input[0]==="drop"){
	// 			if (player.inventory.indexOf(input[1]) > -1){
	// 				story_line = player.inventory.remove(inventory.indexOf(input[1], 1));
	// 				Scenes[message] = Scenes[message] + " As well as a " +input[1] + " on the ground.";
	// 			}
	// 			else{
	// 				story_line = "You don have that in your inventory.";
	// 			}
	// 		}
	// 		else if (input[0] === "look"){
	// 			story_line = Scenes[message][sub_message];
	// 		}
	// 		else{
	// 			story_line = "I don't understand what you want to do.";
	// 		}

	// 		switch(sub_message){
	// 			case 0://left
	// 			break;

	// 			case 1://right
	// 				switch(input[0]){
	// 					case "open":
	// 						if (input[1] === "bottle"){
	// 							console.log("free");
	// 							console.log(message);
	// 							story_line = "YO! Thanks for freeing me my name is lilly. I can open the door for you. Just GO BACK to the first cavern and then GO FORWARD down the passageway";
	// 							Scenes[message][sub_message] = "You have found your self in a cavern with a pile of hay that could resemble a bed.";
	// 							player.fairyFriend = 1;
	// 							sub_message = 1

	// 						}
	// 						else{
	// 							story_line = "Open what?"
	// 						}
	// 						break;
	// 					case "go":
	// 						if (input[1] === "back"){
	// 							message = 1;
	// 							sub_message = 1;
	// 							story_line = Scenes[message][sub_message];
	// 						}
	// 						else{
	// 							story_line = "You cant go there.";
	// 						}
	// 						break;
	// 					case "take":
	// 						if (input[1] === "bottle"){
	// 							story_line = player.playerActions.take("bottle");
	// 							player.fairyFriend = 0;
	// 						}
	// 						else{
	// 							story_line = "You cant take that.";
	// 						}
	// 						break;
	// 				}
	// 			case 2://straight
	// 				if (player.fairyFriend === 1){
	// 						sub_message = 1;
	// 						console.log("not here yet")
	// 				}
	// 				else{
	// 					sub_message = 0	;
	// 				}
	// 			}

	// // story_line = Scenes[message][sub_message]
	// // document.getElementById("story").innerHTML = story_line;
	// // break
	// // switch (input[0]){
	// // 	case player.fairyFriend:
	// // 		if (player.fairyFriend === true){
	// // 			switch (input[1]){
	// // 				case "forward":
	// // 				message += 1;
	// // 				story_line= scenes[message];
	// // 				break;
	// //	}



	// //}
	// //}
	// //story_line = scenes[message][sub_message]
	// 		player.turns += 1;
	// 		break;
	// // case 3:
	// //     code block
	// //     break;
	// // case 4:
	// //   code block
	// //   break;
	// // case 5:
	// //     code block
	// //     break;
	// 	default:
	// 		if (message === -1){
	// 			story_line = scenes[0];
	// 			message += 1;
	// 			console.log("Why am i here?")
	// 		break;
	// 		}
	// 		else if (input[0] === ""){
	// 			story_line = story_line[message];
	// 			player.turns += 1;

	// 		}
	// }
	// 	document.getElementById("story").innerHTML = story_line;
	// 	console.log(input);
	// 	console.log(message)
	// 	return false
	// }

// 		return false;
// 	}
// }

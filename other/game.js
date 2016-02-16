//what goes in player?
//health
//inventory of stuff
var troll = new Object();
var  player={
	turns: 0,
	health: 15,
	damage: 3,

}
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
									drop: function(thing){var remove = player.inventory.indexOf(thing); return "Dropped!"},
								};
var scenes = [//1 is allways the answer!
		"You are standing at the entrance to a cave at the bottom of a small hill and, you hear the far off rumble of what possibly could be a Troll. To the left of the cave is a sign it says: \"Beware the man eater!\". Below the sign hangs a extinguished torch.", //scene 1
		["You enter the cave. You can barley see a thing but you can hear the sound of birds and the rustling of trees behind you.",
		"You are in the cave and their are 3 passageways. There is one going to the LEFT that has a strange smell coming from it, one going to the RIGHT with a faint flicker further down the cave and one straight ahead."],//scene 2
		[
			"You are in a giant cavern and (dramatic pause)Oh no! You are facing the man eating Troll! Behind him in a cage next to the giant boiling pot of soup, is the Marsh Prince. What do you do?",	//left[0]
			"You have found your self in cavern with a pile of hay that could resemble a bed. Next to the pile of hay is a small bottle with a little fairy in it.she says:\"If you free me from this bottle i will open the special door for you.\"",	//right [1]
			"You walk down the cavern for some time And have found your self at a locked door. The door is huge and majestic painted with beautiful patterns and colors so wonderful that the only thing comparable could be the sunset it self. You want to go in but the door does not open. And your torch goes out."	//straight [2]
		],//scene 3
		["its pitch black","The fairy's light is just bright enough to see her materialize the key out of thin air with her magic. A key hole that was not there before glows bright. She puts the key In the key hole and both the key and hole disappear. The doors slowly swing open."],//scene 4
		"You enter to find a giant Wizard Lizard siting at his giant desk reading by giant candle light. \"Oh hello You are quiet small aren't you? and i see you have freed the blue spec of dust lilly from her tinny bottle.\"the fairy in a huff leaves. The wizard lizard continues\"Well you seam to be a nice fellow you must be here to deal with that awful troll fellow. I wish to help, TAKE this sword and potion of good fortune to win!\" " , //scene 5
			["Its dark, your torch is out", "behind you is the door huge and majestic painted with beautiful patterns and colors so wonderful that the only thing comparable could be the sunset it self. In front of you is a cave passage "],
			"YOU WIN! Hit enter to reset."
			];			// scene 6
// function pasingCommands(input,passable){
// 		for (var check = 0; check <= input.length; check +=1){
// 				for (var real = 0; real <= passable.length; real+=1;){
// 						if(input[check] === passable[real]){

// 						}
// 				}
// 		}
// }


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
		console.log(message)
		console.log(sub_message)
		var story_line = scenes[message];
		document.getElementById("story").innerHTML = story_line;
	switch(message){
		case 0:
			if (input[0] === "help"){
			story_line = "Well... heres the help: You can \" go directions\", check your\"inventory\", \"attack\" and \"take\\drop stuff\".";
			}
			else if (input[0] === "take" ){
				if (input[1] === "torch"){
					story_line= player.playerActions.take("torch");
					scenes[message] = scenes[message] + " Well at least there was until you took it ";
				}
				else{
					story_line = "You can't take that"
				}
			}
			else if (input[0] ==="light") {
				if (input[1] === "torch"){
					if (player.inventory.indexOf("torch") > -1){
						sub_message = 1;
						player.torch = 1;
					}
					story_line = "Torch is lit";
				}
			}
			else if (input[0] === "inventory"){
				story_line = player.inventory;
			}
			else if (input[0]==="drop"){
				if (player.inventory.indexOf(input[1]) > -1){
					story_line = player.inventory.remove(inventory.indexOf(input[1], 1));
					scenes[message] = scenes[message] + " As well as a " +input[1] + " on the ground.";
				}
				else{
					story_line = "You don have that in your inventory.";
				}
			}
			else if (input[0] ==="go"){
				if (input[1] === "forward"){
					message += 1;
					story_line = scenes[message][sub_message];
			}
				else if (input[1] === "back"){
					story_line = "Can't go back this is the beginning.";
				}
				else{
					story_line = "Where do you want to go?"
				}
			}
			else if (input[0] === "attack"){
				story_line = "There is nothing to attack here";
			}
			else if (input.length === 1 && input[0] === "look"){
				story_line = scenes[message]
			}
			else{
				story_line = "I don't understand what you want to do.";
			}

			player.turns += 1;
			break;

		case 1:
			if (input[0] === "help"){
				story_line = "Well... heres the help: You can \" go directions\", check your\"inventory\", \"attack\" and \"take\\drop stuff\".";
			}
			else if (input[0] === "inventory"){
				story_line = player.inventory;
			}
			else if (input[0] === "take" ){
				scenes[message] = "There is nothing to take here.";
			}

			else if (input[0] ==="light") {
				if (input[1] === "torch"){
					if (player.inventory.indexOf("torch") > -1){
						sub_message = 1;
						story_line = scenes[message][sub_message];
						story_line = "Torch is lit";
					}
					else{
						story_line = "you don't have a torch.";
					}
				}
			}

			else if (input[0]==="drop"){
				if (player.inventory.indexOf(input[1]) > -1){
					story_line = player.inventory.remove(inventory.indexOf(input[1], 1));
					scenes[message] = scenes[message] + " As well as a " +input[1] + " on the ground.";
				}
				else{
					story_line = "You don't have that in your inventory.";
				}
			}
			else if (input[0] === "look"){
				story_line = scenes[message][sub_message]
			}

			else if (input[0] ==="go"){
				if (sub_message === 1){
					if (input[1] === "forward"){
						sub_message = 2;
						message += 1;
						story_line = scenes[message][sub_message];
					}
					else if (input[1] === "back"){
						if (player.torch === 1) {sub_message = 1;}
						story_line = story_line[message][sub_message];
					}
					else if (input[1] === "left"){
						sub_message = 0;
						message += 1;
						story_line = scenes[message][sub_message];
						sub_message = 1
					}
					else if (input[1] === "right"){
						sub_message = 1;
						message += 1;
						story_line = scenes[message][sub_message];
					}
					else{
					story_line = "Where do you want to go?";
					}

				}
				else if (input[1] === "back"){
					message -= 1;
					story_line = story_line[message];
				}
				else {
					story_line = "Its to dark to go anywhere";
				}
			}
			else if (input[0] === "attack"){
				story_line = "There is nothing to attack here";
			}
			else if (input.length === 1 && input[0] === "look"){
				story_line = scenes[message][story_line];
			}
			else{
				story_line = "I don't understand what you want to do.";
			}

			player.turns += 1;
			break;
		case 2:
			if (input[0] === "help"){
				story_line = "Well... heres the help: You can \" go directions\", check your\"inventory\", \"attack\" and \"take\\drop stuff\".";
			}
			else if (input[0] === "inventory"){
				story_line = player.inventory;
			}
			else if (input[0]==="drop"){
				if (player.inventory.indexOf(input[1]) > -1){
					story_line = player.inventory.remove(inventory.indexOf(input[1], 1));
					scenes[message] = scenes[message] + " As well as a " +input[1] + " on the ground.";
				}
				else{
					story_line = "You don have that in your inventory.";
				}
			}
			else if (input[0] === "look"){
				story_line = scenes[message][sub_message];
			}
			else{
				story_line = "I don't understand what you want to do.";
			}

			switch(sub_message){
				case 0://left
				break;

				case 1://right
					switch(input[0]){
						case "open":
							if (input[1] === "bottle"){
								console.log("free");
								console.log(message);
								story_line = "YO! Thanks for freeing me my name is lilly. I can open the door for you. Just GO BACK to the first cavern and then GO FORWARD down the passageway";
								scenes[message][sub_message] = "You have found your self in a cavern with a pile of hay that could resemble a bed.";
								player.fairyFriend = 1;
								sub_message = 1

							}
							else{
								story_line = "Open what?"
							}
							break;
						case "go":
							if (input[1] === "back"){
								message = 1;
								sub_message = 1;
								story_line = scenes[message][sub_message];
							}
							else{
								story_line = "You cant go there.";
							}
							break;
						case "take":
							if (input[1] === "bottle"){
								story_line = player.playerActions.take("bottle");
								player.fairyFriend = 0;
							}
							else{
								story_line = "You cant take that.";
							}
							break;
					}
				case 2://straight
					if (player.fairyFriend === 1){
							sub_message = 1;
							console.log("not here yet")
					}
					else{
						sub_message = 0	;
					}
				}

	// story_line = scenes[message][sub_message]
	// document.getElementById("story").innerHTML = story_line;
	// break
	// switch (input[0]){
	// 	case player.fairyFriend:
	// 		if (player.fairyFriend === true){
	// 			switch (input[1]){
	// 				case "forward":
	// 				message += 1;
	// 				story_line= scenes[message];
	// 				break;
	//	}



	//}
	//}
	//story_line = scenes[message][sub_message]
			player.turns += 1;
			break;
	// case 3:
	//     code block
	//     break;
	// case 4:
	//   code block
	//   break;
	// case 5:
	//     code block
	//     break;
		default:
			if (message === -1){
				story_line = scenes[0];
				message += 1;
				console.log("Why am i here?")
			break;
			}
			else if (input[0] === ""){
				story_line = story_line[message];
				player.turns += 1;

			}
	}
		document.getElementById("story").innerHTML = story_line;
		console.log(input);
		console.log(message)
		return false
	}

		return false;
}


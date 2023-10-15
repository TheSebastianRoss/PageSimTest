"use strict";
class GameView {
	constructor(balls, strikes, bases, inning, inningBottom, message, gameOver) {
		this.balls        = balls        || 0;
		this.strikes      = strikes      || 0;
		this.bases        = bases        || [];
		this.inning       = inning       || 0;
		this.inningBottom = inningBottom || false;
		this.message      = message      || "";
		this.gameOver     = gameOver     || false;
	}
};

let view = {
	gameViews: [],
	tickerMessage: "Hyped for Season 12j"
};

let model = {
	simulationStarted: false,
	subscriberUpdateFunctions: [],
	update: function() {
		let terminate = false;

		// To-do: simulation logic
		// To-do: view recalculation logic
		// To-do: termination logic
		terminate = true;
		
		for(let subscriberUpdateFunction of model.subscriberUpdateFunctions) {
			subscriberUpdateFunction(view);
		}

		return terminate;
	},
	startSimulation: async function() {
		if(model.simulationStarted === true) {
			return;
		}
		model.simulationStarted = true;
		let terminate = false;
		while(terminate === false) {
			terminate = model.update();
		}
	}
};

let controller = {
	startSimulation: function() {
		model.startSimulation();
	},
	subscibeToView: function(updateFunction) {
		model.subscriberUpdateFunctions.push(updateFunction);
	}
};

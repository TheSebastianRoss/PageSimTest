"use strict";

function mulberry32(a) {
    return function() {
      var t = a += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

const globalRandomizerSeed = 14;
const globalRandomizer = mulberry32(globalRandomizerSeed);

class GameView {
	static gameIDRandomizer = mulberry32(globalRandomizer());
	constructor(homeScore, awayScore, balls, strikes, bases, inning, inningBottom, message, gameOver) {
		this.homeScore    = homeScore    || 0;
		this.awayScore    = awayScore    || 0;
		this.balls        = balls        || 0;
		this.strikes      = strikes      || 0;
		this.bases        = bases        || [null, null, null];
		this.inning       = inning       || 0;
		this.inningBottom = inningBottom || false;
		this.message      = message      || "";
		this.gameOver     = gameOver     || false;
		this.gameID       = (new Date().getTime()).toString(36) + gameIDRandomizer();
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
		let game1View = new GameView(6, 9, 1, 2, ["Lenny Crumb", null, null], 1, false, "Lenny Crumb hit a single!", false);
		// To-do: view recalculation logic
		view.gameViews[0] = game1View;
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

import { Constants } from "./constants";
import { GameState } from "./gameState";
import { Buttons } from "./buttons";
/**
 * GameTime Class.
 * [TODO]: add explanation!
 */
export class GameTime {
  private nextTimeToTick: number = null;
  private gameState: GameState = null;
  constructor() {
    this.gameState = new GameState();
    this.nextTimeToTick = Date.now();
    Buttons.initButtons(this.gameState.handleUserAction.bind(this.gameState));
  }

  /**
   * Initialized Fox Game.
   * [TODO]: add explanation!
   */
  public async init(): Promise<number> {
    return this.nextAnimationFrame();
  }

  /**
   * nextAnimationFrame of fox game.
   * [TODO]: add explanation!
   */
  private nextAnimationFrame(): number {
    const now = Date.now();
    if (this.nextTimeToTick <= now) {
      this.gameState.tick();
      this.nextTimeToTick = now + Constants.TICK_RATE; //TICK_RATE
    }
    return requestAnimationFrame(this.nextAnimationFrame.bind(this));
  }
}

const time = new GameTime();
time.init();

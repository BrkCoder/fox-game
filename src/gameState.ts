import { Constants } from "./constants";
import { UI } from "./ui";

/**
 * GameState class.
 * [TODO]: add explanation!
 */
export class GameState {
  private current: string;
  private clock: number;
  private wakeTime: number;
  private sleepTime: number;
  private hungryTime: number;
  private dieTime: number;
  private poopTime: number;
  private timeToStartCelebrating: number;
  private timeToEndCelebrating: number;
  private scene: number;
  constructor() {
    this.current = "INIT";
    this.clock = 1;
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
    this.scene = 0;
  }

  /**
   * tick method.
   * [TODO]: add explanation!
   */
  public tick(): number {
    this.clock++;
    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
      this.poop();
    } else if (this.clock === this.dieTime) {
      this.die();
    }

    return this.clock;
  }

  /**
   * handleUserAction method.
   * [TODO]: add explanation!
   * @param icon
   */
  public handleUserAction(icon): void {
    // can't do actions while in these states
    if (
      ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)
    ) {
      // do nothing
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }

    // execute the currently selected action
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  }

  /**
   * startGame method.
   * [TODO]: add explanation!
   */
  private startGame(): void {
    this.current = "HATCHING";
    this.wakeTime = this.clock + 3;
    UI.modFox("egg");
    UI.modScene("day");
    UI.writeModal();
  }

  /**
   * wake method.
   * [TODO]: add explanation!
   */
  private wake(): void {
    this.current = "IDLING";
    this.wakeTime = -1;
    UI.modFox("idling");
    this.scene = Math.random() > Constants.RAIN_CHANCE ? 0 : 1;
    UI.modScene(Constants.SCENES[this.scene]);
    this.determineFoxState();
    this.sleepTime = this.clock + Constants.DAY_LENGTH;
    this.hungryTime = Constants.getNextHungerTime(this.clock);
  }
  private changeWeather(): void {
    this.scene = (1 + this.scene) % Constants.SCENES.length;
    UI.modScene(Constants.SCENES[this.scene]);
    this.determineFoxState();
  }

  /**
   * cleanUpPoop method.
   * [TODO]: add explanation!
   */
  private cleanUpPoop(): void {
    if (this.current === "POOPING") {
      this.dieTime = -1;
      UI.togglePoopBag(true);
      this.startCelebrating();
      this.hungryTime = Constants.getNextHungerTime(this.clock);
    }
  }

  /**
   * poop method.
   * [TODO]: add explanation!
   */
  private poop(): void {
    this.current = "POOPING";
    this.poopTime = -1;
    this.dieTime = Constants.getNextDieTime(this.clock);
    UI.modFox("pooping");
  }

  /**
   * feed method.
   * [TODO]: add explanation!
   */
  private feed(): void {
    // can only feed when hungry
    if (this.current !== "HUNGRY") {
      return;
    }

    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = Constants.getNextPoopTime(this.clock);
    UI.modFox("eating");
    this.timeToStartCelebrating = this.clock + 2;
  }

  /**
   * startCelebrating method.
   * [TODO]: add explanation!
   */
  private startCelebrating(): void {
    this.current = "CELEBRATING";
    UI.modFox("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  }

  /**
   * endCelebrating method.
   * [TODO]: add explanation!
   */
  private endCelebrating(): void {
    this.timeToEndCelebrating = -1;
    this.current = "IDLING";
    this.determineFoxState();
    UI.togglePoopBag(false);
  }

  /**
   * determineFoxState method.
   * [TODO]: add explanation!
   */
  private determineFoxState(): void {
    if (this.current === "IDLING") {
      if (Constants.SCENES[this.scene] === "rain") {
        UI.modFox("rain");
      } else {
        UI.modFox("idling");
      }
    }
  }

  /**
   * clearTimes method.
   * [TODO]: add explanation!
   */
  private clearTimes(): void {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
  }

  /**
   * sleep method.
   * [TODO]: add explanation!
   */
  private sleep(): void {
    this.current = "SLEEP";
    UI.modFox("sleep");
    UI.modScene("night");
    this.clearTimes();
    this.wakeTime = this.clock + Constants.NIGHT_LENGTH;
  }

  /**
   * getHungry method.
   * [TODO]: add explanation!
   */
  private getHungry(): void {
    this.current = "HUNGRY";
    this.dieTime = Constants.getNextDieTime(this.clock);
    this.hungryTime = -1;
    UI.modFox("hungry");
  }
  /**
   * die method.
   * [TODO]: add explanation!
   */
  private die(): void {
    this.current = "DEAD";
    UI.modScene("dead");
    UI.modFox("dead");
    this.clearTimes();
    UI.writeModal("The fox died :( <br/> Press the middle button to start");
  }
}

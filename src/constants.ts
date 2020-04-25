/**
 * Constants Game Class
 * [TODO]: add explanation!
 */
export class Constants {
  public static ICONS = ["fish", "poop", "weather"];
  public static SCENES = ["day", "rain"];
  public static TICK_RATE = 3000;
  public static RAIN_CHANCE = 0.2;
  public static DAY_LENGTH = 60;
  public static NIGHT_LENGTH = 5;

  /**
   * Returns next hunger time of fox according to clock param.
   * [TODO]: add explanation!
   * @param clock
   */
  public static getNextHungerTime(clock: number): number {
    return Math.floor(Math.random() * 3) + 8 + clock;
  }

  /**
   * Returns next die time of fox according to clock param.
   * [TODO]: add explanation!
   * @param clock
   */
  public static getNextDieTime(clock: number): number {
    return Math.floor(Math.random() * 3) + 3 + clock;
  }

  /**
   * Returns next poop time of fox according to clock param.
   * [TODO]: add explanation!
   * @param clock
   */
  public static getNextPoopTime(clock: number): number {
    return Math.floor(Math.random() * 3) + 8 + clock;
  }
}

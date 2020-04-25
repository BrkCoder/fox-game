/**
 * UI Game Class.
 * [TODO]: add explanation!
 */
export class UI {
  /**
   * modFox method.
   * [TODO]: add explanation!
   * @param state
   */
  public static modFox(state): void {
    document.querySelector(".fox").className = `fox fox-${state}`;
  }

  /**
   * modScene method.
   * [TODO]: add explanation!
   * @param state
   */
  public static modScene(state): void {
    document.querySelector(".game").className = `game ${state}`;
  }

  /**
   * togglePoopBag method.
   * [TODO]: add explanation!
   * @param show
   */
  public static togglePoopBag(show): void {
    document.querySelector(".poop-bag").classList.toggle("hidden", !show);
  }

  /**
   * writeModal method.
   * [TODO]: add explanation!
   * @param text
   */
  public static writeModal(text = ""): void {
    document.querySelector(
      ".modal"
    ).innerHTML = `<div class="modal-inner">${text}</div>`;
  }
}

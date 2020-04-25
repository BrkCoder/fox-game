import { Constants } from "./constants";

/**
 * Buttons Class.
 * [TODO]: add explanation!
 */
export class Buttons {
  public static selectedIcon = 0;
  /**
   * initButtons method.
   * [TODO]: add explanation!
   * @param handleUserAction
   */
  public static initButtons(handleUserAction: Function): void {
    document
      .querySelector(".buttons")
      .addEventListener("click", ({ target }) => {
        Buttons.buttonClick(target, handleUserAction);
      });
  }
  /**
   * buttonClick method.
   * [TODO]: add explanation!
   * @param target
   * @param handleUserAction
   */
  private static buttonClick(
    target: HTMLElement,
    handleUserAction: Function
  ): void {
    if (target.classList.contains("left-btn")) {
      Buttons.toggleHighlighted(Buttons.selectedIcon, false);
      Buttons.selectedIcon =
        (2 + Buttons.selectedIcon) % Constants.ICONS.length;
      Buttons.toggleHighlighted(Buttons.selectedIcon, true);
    } else if (target.classList.contains("right-btn")) {
      Buttons.toggleHighlighted(Buttons.selectedIcon, false);
      Buttons.selectedIcon =
        (1 + Buttons.selectedIcon) % Constants.ICONS.length;
      Buttons.toggleHighlighted(Buttons.selectedIcon, true);
    } else {
      handleUserAction(Constants.ICONS[Buttons.selectedIcon]);
    }
  }

  /**
   * toggleHighlighted method.
   * [TODO]: add explanation!
   * @param icon
   * @param show
   */
  private static toggleHighlighted(icon, show): void {
    document
      .querySelector(`.${Constants.ICONS[icon]}-icon`)
      .classList.toggle("highlighted", show);
  }
}

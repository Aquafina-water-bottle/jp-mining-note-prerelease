import { RunnableModule } from '../module';
import { getCardSide, hybridClick, isAndroid, paIndicator } from '../utils';
import { fieldsAnyFilled, fieldsAllFilled } from '../fields';
import { translatorStrs } from '../consts';
import {addKeybindFunc, hasKey} from './keybinds';
import {getOption} from '../options';

// this function has to be moved out of the class in order for the kebind to run???
function toggleHighlightWord() {
  const sentenceShownAttr = "data-sentence-shown";

  let paButton = document.getElementById("pa_button");
  let d = document.getElementById("display");
  if (paButton === null || d === null) {
    return;
  }

  if (paButton.hasAttribute(sentenceShownAttr)) {
    // (currently) shown -> hide
    paButton.removeAttribute(sentenceShownAttr);
    paButton.textContent = translatorStrs['show-word-button'];
    d.classList.toggle("highlight-bold", false);

  } else {
    // (currently) hidden -> show
    paButton.setAttribute(sentenceShownAttr, "true");
    paButton.textContent = translatorStrs['hide-word-button'];
    d.classList.toggle("highlight-bold", true);
  }
}


export class MainCardUtils extends RunnableModule {
  constructor() {
    super("mainCardUtils");
  }

  // TODO how to do keybinds???
  private sentenceKeybinds(e: KeyboardEvent) {
    if (hasKey(e, getOption("keybinds.toggleHybridSentence"))) {
      hybridClick();
    }

    if (hasKey(e, getOption("keybinds.toggleHighlightWord"))) {
      toggleHighlightWord();
      //let paButton = document.getElementById("pa_button");
      //if (paButton !== null) {
      //  this.toggleHighlightWord();
      //}
    }
  }

  playSilence() {
    let elem = document.querySelector("#pa_silence_audio .soundLink, #pa_silence_audio .replaybutton");
    if (elem) {
      (elem as HTMLAnchorElement).click();
    }
  }

  main() {
    addKeybindFunc("sentenceKeybinds", this.sentenceKeybinds);

    if (getCardSide() === "back" && fieldsAllFilled("IsClickCard") && getOption("clickCardRevealSentenceOnBackSide")) {
      hybridClick();
    }

    if (fieldsAnyFilled('PAShowInfo')) {
      const paIndicators = document.querySelectorAll('.pa-indicator');
      for (const paInd of paIndicators) {
        let circ = paInd.children[0].children[0];
        let svgTitle = circ.children[0];

        svgTitle.textContent =
          translatorStrs['pa-indicator-prefix'] + paIndicator.tooltip;
        circ.classList.add(paIndicator.className);
      }

      let paButton = document.getElementById("pa_button");
      if (paButton !== null) {
        paButton.onclick = () => {
          toggleHighlightWord();
        };
      }

      // auto-plays silence
      if (isAndroid()) {
        // for some reason, without the delay, it freezes the entire card
        // so the front side no longer loads :(
        // I'm guessing it's some weird race condition happening
        setTimeout(() => {
          this.playSilence();
        }, 5000);
      } else {
        // plays it instantly because why not
        this.playSilence()
      }

    }
  }
}
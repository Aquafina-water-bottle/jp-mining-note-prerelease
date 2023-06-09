{% include "jp-mining-note/partials/anki_persistence.js" %}

{% from "modules/main.html" import modules with context %}

{% for m in modules.values() %}
{% if m.js is defined and m.js.globals.get(note.card_type, note.side, modules.keys()) %}
// GLOBALS: {{ m.id }}
{{ m.js.globals.get(note.card_type, note.side, modules.keys()) }}
{% endif %}
{% endfor %}




(function () { // restricts ALL javascript to hidden scope

{% if "time-performance" in modules.keys() %}
{{ modules["time-performance"].functions_manual }}
{% endif %}


const TAGS_LIST = "{{ T('Tags') }}".split(" ");


// "global" variables within the hidden scope
let note = (function () {
  let my = {};
  return my;
}());



/*
 * Toggles the display of any given details tag
 */
function toggleDetailsTag(ele) {
  if (ele.hasAttribute('open')) {
    ele.removeAttribute('open');
  } else {
    ele.setAttribute("open", "true");
  }
}

function popupMenuMessage(message, isHTML=false) {
  let popupMenu = document.getElementById("popup_menu");

  // creates message
  const popupMessageDiv = document.createElement("div");
  if (isHTML) {
    popupMessageDiv.innerHTML = message;
  } else {
    popupMessageDiv.innerText = message;
  }
  popupMessageDiv.classList.add("popup-menu--animate");

  popupMenu.appendChild(popupMessageDiv);

  // kills the popup after the animations play
  setTimeout(() => {
    popupMenu.removeChild(popupMessageDiv);
    LOGGER.debug(`Removed popup: "${message}"`, 2);
  }, 1000*(0.6+3+0.75))
}



// START_BLOCK: js_functions
{% block js_functions %}
{% endblock %}
// END_BLOCK: js_functions

{% for mid, m in modules.items() %}
{% if m.js is defined %}

{{ m.js.functions.get(note.card_type, note.side, modules.keys()) }}

{% endif %}
{% endfor %}




{% if COMPILE_OPTIONS("keybinds-enabled").item() %}
// a general function to implement all keybinds necessary by the card.
// NOTICE: we MUST use document.onkeyup instead of document.addEventListener(...)
// because functions persist and cannot be easily removed within anki,
// whereas .onkeyup = ... replaces the previous function with the current.
document.onkeyup = (e => {
  LOGGER.debug(`KeyboardEvent: code=${e.code}`, 0);

  let keys = null;
  let ele = null;

  // START_BLOCK: js_keybind_settings
{% filter indent(width=2) %}
{% block js_keybind_settings %}
{% endblock %}
{% endfilter %}
  // END_BLOCK: js_keybind_settings

{% for m in modules.values() %}
{% if m.js is defined and m.js.keybinds.get(note.card_type, note.side, modules.keys()) %}
{% filter indent(width=2) %}
  // KEYBINDS: {{ m.id }}
  {{ m.js.keybinds.get(note.card_type, note.side, modules.keys()) }}

{% endfilter %}
{% endif %}
{% endfor %}

  /// {% call IF("WordAudio") %}
  keys = {{ utils.opt("keybinds", "play-word-audio") }};

  if (keys !== null && keys.includes(e.code)) {
    ele = document.querySelector("#word-audio .soundLink, #word-audio .replaybutton");
    if (ele) {
      ele.click();
    }
  }
  /// {% endcall %}

  /// {% call IF("SentenceAudio") %}
  keys = {{ utils.opt("keybinds", "play-sentence-audio") }};
  if (keys !== null && keys.includes(e.code)) {

    let hSent = document.getElementById("hybrid-sentence");

    /// {% if note.card_type == "main" and note.side == "front" %}
    if ({{ utils.opt("hybrid-sentence-open-on-play-sentence") }}
        && '{{ utils.any_of_str("IsHoverCard", "IsClickCard") }}'
        && '{{ utils.any_of_str("IsTargetedSentenceCard", "IsSentenceCard") }}'
        && hSent !== null && !hSent.classList.contains("override-display-inline-block")) {
      hybridClick();
    } else {
    /// {% endif %}
      ele = document.querySelector("#sentence-audio .soundLink, #sentence-audio .replaybutton");
      if (ele) {
        ele.click();
      }
    /// {% if note.card_type == "main" and note.side == "front" %}
    }
    /// {% endif %}
  }
  /// {% endcall %}

  keys = {{ utils.opt("keybinds", "toggle-front-full-sentence-display") }};
  ele = document.getElementById("full_sentence_front_details");
  if (keys !== null && ele && keys.includes(e.code)) {
    toggleDetailsTag(ele)
  }

  /// {% call IF("Hint") %}
  keys = {{ utils.opt("keybinds", "toggle-hint-display") }};
  ele = document.getElementById("hint_details");
  if (keys !== null && ele && keys.includes(e.code)) {
    toggleDetailsTag(ele)
  }
  /// {% endcall %}

  /// {% if note.side == "back" %}
  /// {% call IF("SecondaryDefinition") %}
  keys = {{ utils.opt("keybinds", "toggle-secondary-definitions-display") }};
  ele = document.getElementById("secondary_definition_details");
  if (keys !== null && ele && keys.includes(e.code)) {
    toggleDetailsTag(ele)
  }
  /// {% endcall %}

  /// {% call IF("AdditionalNotes") %}
  keys = {{ utils.opt("keybinds", "toggle-additional-notes-display") }};
  ele = document.getElementById("additional_notes_details");
  if (keys !== null && ele && keys.includes(e.code)) {
    toggleDetailsTag(ele)
  }
  /// {% endcall %}

  /// {% call IF("ExtraDefinitions") %}
  keys = {{ utils.opt("keybinds", "toggle-extra-definitions-display") }};
  ele = document.getElementById("extra_definitions_details");
  if (keys !== null && ele && keys.includes(e.code)) {
    toggleDetailsTag(ele)
  }
  /// {% endcall %}

  if ('{{ utils.any_of_str("PAGraphs", "UtilityDictionaries") }}') {
    keys = {{ utils.opt("keybinds", "toggle-extra-info-display") }};
    ele = document.getElementById("extra_info_details");
    if (keys !== null && ele && keys.includes(e.code)) {
      toggleDetailsTag(ele)
    }
  }
  /// {% endif %} {# note.side == back #}

})
/// {% endif %} {# keybinds-enabled #}





function main() {
  {% if "time-performance" in modules.keys() %}
  TIME_PERFORMANCE.start("main");
  {% endif %}

  {% if "time-performance" in modules.keys() %}
  TIME_PERFORMANCE.start("main_top");
  {% endif %}


  // sanity check: options
  /// {% if not COMPILE_OPTIONS("hardcoded-runtime-options").item() %}
  if (typeof JPMNOpts === 'undefined') {
    LOGGER.warn('JPMNOpts was not defined in the options file. Was there an error? ' +
      'Click <a href="https://aquafina-water-bottle.github.io/jp-mining-note/faq/#warning-jpmnopts-was-not-defined-in-the-options-file-was-there-an-error">here</a> for basic troubleshooting.', isHtml=true);
  }
  /// {% endif %} {# COMPILE_OPTIONS("hardcoded-runtime-options").item() #}

  // sanity check: checks that both `IsHoverCard` and `IsClickCard` are both not activated
  /// {% call IF("IsHoverCard") %}
  /// {% call IF("IsClickCard") %}
  LOGGER.warn("Both `IsHoverCard` and `IsClickCard` are filled. At most one should be filled at once.");
  /// {% endcall %}
  /// {% endcall %}


  // Stylizes the play button for ankidroid
  if (isMobile()) {
    const betterPlayBtn = `<svg class="android-play-button-svg" viewBox="0 0 64 64" version="1.1"> <circle cx="32" cy="32" r="29"></circle> <path d="M56.502,32.301l-37.502,20.101l0.329,-40.804l37.173,20.703Z"></path> </svg>`

    function generateSVG() {
      const x = document.createElement("span");
      x.innerHTML = betterPlayBtn;
      return x.children[0];
    }

    const eles = document.querySelectorAll(".android .replaybutton svg");
    for (const ele of eles) {
      ele.parentNode.replaceChild(generateSVG(), ele);
    }
  }


  // START_BLOCK: js_run
{% filter indent(width=2) %}
{% block js_run %}
{% endblock %}
{% endfilter %}
  // END_BLOCK: js_run

  {% if "time-performance" in modules.keys() %}
  TIME_PERFORMANCE.stop("main_top");
  {% endif %}



{% for m in modules.values() %}
{% if m.js is defined and m.js.run.get(note.card_type, note.side, modules.keys()) %}
  try { // RUN: {{ m.id }}

    {% if "time-performance" in modules.keys() %}
    if ({{ utils.opt("modules", "time-performance", "time-modules") }}) {
      TIME_PERFORMANCE.start("{{ m.id }}");
    }
    {% endif %}

    {% filter indent(width=4) %}
    {{ m.js.run.get(note.card_type, note.side, modules.keys()) }}
    {% endfilter %}

    {% if "time-performance" in modules.keys() %}
    if ({{ utils.opt("modules", "time-performance", "time-modules") }}) {
      TIME_PERFORMANCE.stop("{{ m.id }}");
    }
    {% endif %}

  } catch (error) {
    LOGGER.error("Error in module {{ m.id }}:");
    LOGGER.errorStack(error.stack);
  }

{% endif %}
{% endfor %}

  {% if "time-performance" in modules.keys() %}
  TIME_PERFORMANCE.stop("main");

  TIME_PERFORMANCE.dump();
  {% endif %}

}


{% if "time-performance" in modules.keys() %}
TIME_PERFORMANCE.stop("functions");
{% endif %}


main();



}());

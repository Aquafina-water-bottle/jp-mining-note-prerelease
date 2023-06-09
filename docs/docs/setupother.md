
# Overview

This page contains all setup steps that are purely optional, as well as random miscellaneous info.
It is expected that you have [Anki](setupanki.md) and [Yomichan](setupyomichan.md)
already setup, and the note is already working.

---

# Yomichan Appearance
If you want to follow my exact Yomichan popup appearance:

* Go to (Yomichan settings) →  `Popup Appearance`.
* Set `Compact glossaries` to ON.
* Set `Compact tags` to OFF.

There are also plenty of css customizations for Yomichan listed out
in the [JP Resources page](jpresources.md){:target="_blank"}.

---

# JMdict
If you are planning on using the JMdict dictionary,
the ones provided from most sources
(TMW's google drive, Matt's video on Yomichan, and Yomichan's main github page)
are all somewhat outdated, which usually means less accurate definitions and less coverage.

To get the most recent version of JMdict,
download it from the
[official site](https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project)
(download `JMdict_e.gz`)
and use [yomichan-import](https://github.com/FooSoft/yomichan-import)
to get the latest JMdict version available.

If you don't want to compile it from source, I provide a download link
[here](https://github.com/Aquafina-water-bottle/jmdict-english-yomichan),
which should only be a few months stale at most.

<!-- TODO github actions to re-compile it daily -->

---


# JMdict Surface Forms
[(Download Link)](https://github.com/FooSoft/yomichan/issues/2183)

This is a dictionary placed in the `UtilityDictionaries` field by default.
Although I don't use it when studying Anki, it helps to use this when creating Anki notes
for monolingual definitions.
See [this section](jpresources.md#orthographic-variants-fix-sentence-and-frequency){:target="_blank"}
for more information.


---

# Local Audio Server for Yomichan
See
[here](jpresources.md#local-audio-server-for-yomichan)
if you want to be able to create Anki cards nearly instanteously,
and fetch audio without a working internet connection.

I personally recommend using this setup if you can.

---


# Various Anki Resources
This documentation is primarily focused on how to use this note,
rather than Anki itself, so little will be written about the details of Anki here.

Instead, here is a small list of resources on setting up and using Anki itself:

* [Cade's blog: Optimizing Anki for Language Learning](https://cademcniven.com/posts/20210410/) (recommended)
* [Tatsumoto's blog: Setting up Anki](https://tatsumoto.neocities.org/blog/setting-up-anki.html)
* [Lazy Guide: Anki](https://rentry.co/lazyXel#anki)
    * Showcases an example note type, addons used and tips
* [Refold's Recommended Anki Setup](https://refold.la/roadmap/stage-1/a/anki-setup)

---


# Other Anki Add-ons

If you're interested in copying my setup, I provide the list of addons I personally use here.
I also provide a small list of other popular add-ons that I don't use, but may be useful for you.

??? example "List of Add-ons I use *(click here)*"

    **Documented above** (I use all required and optional addons for the note type):

    * [Anki-Connect](https://ankiweb.net/shared/info/2055492159)
    * [CSS Injector](https://ankiweb.net/shared/info/181103283)
    * [AJT Furigana](https://ankiweb.net/shared/info/1344485230)
    * [AJT Pitch Accent](https://ankiweb.net/shared/info/1225470483)

    **Algorithm Changing:**

    * [Straight Reward](https://ankiweb.net/shared/info/957961234)

    **Stats:**

    * [Learning Step and Review Interval Retention](https://ankiweb.net/shared/info/1949865265)
    * [True Retention by Card Maturity Simplfied](https://ankiweb.net/shared/info/1779060522)
    * [Kanji Grid](https://ankiweb.net/shared/info/909972618)

    **Usability:**

    * [Adjust Sound Volume](https://ankiweb.net/shared/info/2123044452)
        * Used to normalize volume automatically (so adjusting the volume of recorded files is not necessary)
    * [Advanced Browser](https://ankiweb.net/shared/info/874215009)
        * Used for [sorting notes by frequency](fieldref.md#frequencysort-field)
    * [AJT Flexible Grading](https://ankiweb.net/shared/info/1715096333)
        * I use this to change Anki to pass/fail
        * If you are using Anki dark mode, I recommend these colors (change in the config):
            * Again: `#ff8c74`
            * Good: `#9cff98`
    * [Paste Images As WebP](https://ankiweb.net/shared/info/1151815987)


??? example "Popular Add-ons that I don't use *(click here)*"
    * [AJT Mortician](https://ankiweb.net/shared/info/1255924302)
    * [Edit Field During Review Cloze](https://ankiweb.net/shared/info/385888438)
    * [Review Heatmap](https://ankiweb.net/shared/info/1771074083)

---


# Separate Pitch Accent Deck
If you want card types to go to a different deck by default, you can change it by doing the following:

!!! example "Instructions"

    `Browse` (top middle) <br>
    →  `Cards...` (around the middle of the screen, right above first field of the note. This is NOT the `Cards` dropdown menu at the top right corner) <br>
    →  `Card Type` dropdown (top of the screen) <br>
    →  (choose pitch accent card type) <br>
    →  `Options` (the first `Options` you see at the very top of the screen) <br>
    →  `Deck Override...`





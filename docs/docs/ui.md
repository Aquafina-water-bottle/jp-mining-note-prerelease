This entire section is dedicated to showcasing various aspects of the
common user interface.


# Summary
Most of the user interface is already shown off in the [GUI demo](/jp-mining-note/#demos){:target="_blank"},
and I would recommend watching it before continuing.

However, to dispell any mysteries, here is a fully annotated summary of the user interface.

{{ img("UI annotated summary", "assets/eg_fushinnsha_diagram.png") }}

Additional information on some parts of the UI is stated below.

---

# Info Circle

=== "Default"
    <figure markdown>
      {{ img("info circle example", "assets/info_circle.gif") }}
      <figcaption>
        On hover, the info circle on the top left corner just shows some basic info.
        However, it also serves as a notification system to the user, when it has a color.
      </figcaption>
    </figure>

=== "Error"
    <figure markdown>
      {{ img("info circle error example", "assets/info_circle_error.gif") }}
      <figcaption>
        This should only appear when some javascript code fails.
        In other words, this should **not** appear under normal circumstances.
        If you get this without modifying the note in any way,
        please see [this section](faq.md#errors){:target="_blank"} for basic troubleshooting.
      </figcaption>
    </figure>

=== "Warning"
    <figure markdown>
      {{ img("info circle error example", "assets/info_circle_warning.gif") }}
      <figcaption>
        This serves to warn the user about something.
        It can appear without completely breaking the functionality of the card.
        In other words, you can choose to ignore it.
      </figcaption>
    </figure>

=== "Leech"
    <figure markdown>
      {{ img("info circle error example", "assets/info_circle_leech.gif") }}
      <figcaption>
        When the card is a leech, the circle is highlighted yellow (or blue in light mode)
        to indicate that it is a leech.
        This is only shown on the back side of the card.
      </figcaption>
    </figure>




## Locking the Info Circle

{{ feature_version("0.10.3.0") }}

You can toggle (click on) the info circle to lock the tooltip in place.
This may be useful for copying/pasting errors and other debugging purposes.

---


# Kanji Hover
Kanji hover shows you if you have seen the kanji in previous cards or not.
This is useful if you want to check whether you have seen the reading
in a previous card, to differentiate between similar kanjis, etc.

By default, it searches for the kanji within the "Word" field,
within "JP Mining Note" types.

{{ img("kanji hover demo", "assets/kanji_hover.gif") }}

You may have noticed that some results are greyed out.
These represent words from cards that have not been reviewed yet.
Conversely, as non-greyed out results come from cards that you have already reviewed,
they should represent words that you already know.

Additionally, pitch accents are also shown when you hover over a particular word
within the tooltip.
{{ bleeding_edge_only("0.11.0.0")}}

See [here](tooltipresults.md) for information on how the examples are chosen,
and how to customize it.

??? example "Related Programs *(click here)*"

    [**Cade's Kanji Hover**](https://cademcniven.com/projects/kanjihover/)

    - Hover over a kanji to see its readings, meanings (english), and other info.
    - This does not show example words from other cards.
    - My implmentation of kanji hover was heavily inspired by this.


    [**Hanzi Web for Anki**](https://github.com/elizagamedev/anki-hanziweb)

    - The end result of this is to this note's implementation of kanji-hover,
        in the sense that it is used to see kanjis that have been used in other notes.
        However, it differs primarily in the fact that all the information must be
        mass-generated. This indeed has several advantages, such as being able to
        use the infomation on Android, where Anki-Connect isn't full supported.


    !!! warning
        None of the above will work with jp-mining-note by default.
        In fact, it's almost guaranteed that Cade's Kanji Hover will conflict with
        this note's kanji hover ability.




---

# Same Reading Indicator
{{ feature_version("0.11.0.0") }}

When there are multiple words with the same reading in your Anki collection,
an indicator will be shown.
This indicator will be yellow (or blue on light mode) for new cards only.
After the first review, the indicator will be the same color as the info circle.

{{ img("same reading indicator eg", "assets/same_reading_indicator.gif") }}

As you can see from the above, the query ignores pitch accent.
The word 自身 is still shown, despite having a different pitch accent
compared to 地震.

Results are greyed out if the word is from a new card, just like for Kanji Hover.

See [here](tooltipresults.md) for information on how the examples are chosen,
and how to customize it.

---

# Word Pitch

Here is a (slightly modified) excerpt taken from the
[AJT Pitch Accent add-on page](https://ankiweb.net/shared/info/1225470483)
that explains the notation well:

!!! quote
    For more information on the Japanese pitch accent, I would like to refer you to
    [this wikipedia article](http://en.wikipedia.org/wiki/Japanese_pitch_accent).
    In short, the following notations can be found:

    - **Overline**: Indicates "High" pitch (see "Binary pitch" in Wikipedia article).
    - **Overline downstep**: usually means stressing the mora/syllable before.
    - **Red circle mark**: Nasal pronunciation.

        For example, げ would be a nasal け,
        and would represented as け<span class="nasal">°</span>.

    - **Blue color**: barely pronounced at all.

        For example, <span class="nopron">ヒ</span> would be closer to h than hi. <br>
        Likewise, <span class="nopron">ク</span> would be more like a k than ku.



## Colored Pitch Accent
<i><sup>Main page: [Auto Pitch Accent (Colored Pitch Accent)](autopa.md#colored-pitch-accent)</sup></i>

Pitch accent can already be set very easily by writing the position in `PAOverride`.
Moreover, the reading, word and pitch overline can be automatically colored
in Migaku style colors according to the main pitch accent groups.

This automatic coloring behavior is **disabled by default**,
and must be enabled in the [options file](runtimeoptions.md){:target="_blank"}:

??? examplecode "Enabling colored pitch accent *(click here)*"
    ```json
    "auto-pitch-accent": {
      "enabled": true, // (1)!
      "colored-pitch-accent": {
        "enabled": true,
        // ...
      }
      // ...
    }
    ```

    1.  The `auto-pitch-accent` module must be enabled to use colored pitch accent.

![type:video](assets/pa_override_color.mp4)



---


# Images in Definition Fields
Outside of the normal click to zoom image at the top right,
any customly inserted images, including images inserted directly by Yomichan,
will be converted to text which you have to hover over to reveal.
Of course, this image can also be clicked on to zoom.
See the video demo below to see exactly what happens.

![type:video](assets/img_utils.mp4)

??? info "How to disable *(click here)*"
    This image conversion can be globally disabled
    in the [runtime options file](runtimeoptions.md){:target="_blank"}:

    ```json
    "img-utils": {
      "stylize-images-in-glossary": false,
      // ...
    }
    ```
    Additionally, if you want to only disable this for some particular images,
    [edit the HTML](faq.md#how-do-i-edit-the-fields-raw-html){:target="_blank"}
    of the desired field, and add `data-do-not-convert="true"`.

    An example is shown below:
    ```
    <img src="your_image.png" data-do-not-convert="true">
    ```


# Image Blur
{{ feature_version("0.10.3.0") }}

This allows you to blur the images of cards marked with a NSFW tag.

This behavior is **disabled by default**. In other words, you will not be able to blur
images unless the following setting is explicitly enabled
in the [runtime options file](runtimeoptions.md){:target="_blank"}:


??? examplecode "Enabling image blur *(click here)*"
    ```json
    "img-utils": {
      "enabled": true, // (1)!
      "nsfw-toggle": {
        "enabled": true,
        // ...
      }
    }
    ```

    1.  The `img-utils` module must be enabled to use the image blur feature.

<figure markdown>
  {{ img("example toggle blur gif", "assets/anki_blur/example.gif") }}
</figure>



To mark a card as NSFW, add any of the following tags to the card:

> `nsfw`・`NSFW`・`-NSFW`




!!! note
    Recall that you can use custom text in the `Picture` field instead of having an actual picture.
    This is useful if you simply don't want to save a particular image.


## Change Review Session State
The above demo shows how you can un-blur an image temporarily.
This means that if you see that card again during the same review session,
the image will be blurred again.

This state can be changed for a review session.
To toggle between review-session states, hover over the info circle,
and click on the eyeball to the top left.
This state will be maintained for the entire review session, but will be lost on the next session.

The tabs below show the available states.
By default, states cycle from left to right.


=== "Only Blur if NSFW"

    | Not Marked | Marked (with `NSFW` tag) |
    |:-:|:-:|
    | {{ img("", "assets/anki_blur/unmarked_revealed.png") }} | ![](assets/anki_blur/marked_blurred.png) |

=== "Always Blurred"

    | Not Marked | Marked (with `NSFW` tag) |
    |:-:|:-:|
    | ![](assets/anki_blur/unmarked_blurred.png) | ![](assets/anki_blur/marked_blurred.png) |

=== "Always Revealed"

    | Not Marked | Marked (with `NSFW` tag) |
    |:-:|:-:|
    | {{ img("", "assets/anki_blur/unmarked_revealed.png") }} | {{ img("", "assets/anki_blur/marked_revealed.png") }} |


??? example "Demos *(click here)*"

    === "Regular, unmarked card"
        {{ img("", "assets/anki_blur/example_session_toggle_unmarked.gif") }}

    === "Card marked as NSFW"
        {{ img("", "assets/anki_blur/example_session_toggle_marked.gif") }}

    !!! note
        Both examples have the info circle toggled (clicked), so the tooltip persists.


## Additional Details

- The eyeball to toggle the blur between an image will not be shown unless the card is marked as NSFW
    (or the review session state is "Always Blurred").
- Clicking on the blurred image will do nothing; you must click on the eye to un-blur the image.
    Forcing the user to click in a smaller area makes accidental reveals less common.
- After revealing the image, you can click on the image to zoom, as normal.
    You cannot click on a blurred image to zoom.
- Most things can be changed in the runtime options,
    including what tags can be used, the default initial state on PC/mobile, etc.
- This was heavily inspired by
    [Marv's implementation](https://github.com/MarvNC/JP-Resources#anki-card-blur)
    of the same feature.

---


# Conclusion
Outside of the user interface, the note has plenty of fields you can use
to further modify the card. Head over to the [Field Reference](fieldref.md) page to see just that.


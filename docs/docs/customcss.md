

# Overview

If you have already read the [Modding Overview](modding.md) page,
you should already know that there are two ways of modding the note:

1. You can directly edit the CSS files, but lose all the changes you made when you update.
1. (Recommended) Add new files to add to the existing CSS, as to not lose changes between updates.

For completeness, the first method is mentioned below.
However, the rest of page will focus on the recommended second way of modding the note.

??? example "How to directly edit the CSS *(click here)*"

    * Any time `style.scss` is mentioned, edit the styles sheet in the Anki template.
        This can be accessed by:

        > (Main window) →  `Browse` →  `Cards...` (middle of the screen) →  `Styling` (top left)

    * Any time `fields.scss` is mentioned, edit the `fields.css` file under the
        [addons folder](faq.md#where-is-the-x-folder-in-anki):
        ```
        Anki2/addons21/181103283/user_files/field.css
        ```

    * Any time `editor.scss` is mentioned, edit the `editor.css` file under the
        addons folder:
        ```
        Anki2/addons21/181103283/user_files/editor.css
        ```


!!! warning

    Since this note is still in beta, the CSS itself,
    including the class names and structure of the HTML,
    is subject to heavy change.
    This is because when mobile support is being worked on,
    the CSS will likely heavily change to support mobile.

    If you are planning on changing the CSS,
    be vigilant with potential changes in future updates!


---

# How To Add Custom CSS

If you want to extend the CSS, do the following:

1. [Build the note](building.md) if you haven't already, and ensure everything works.

1. Make a new folder under `(project root)/src/scss` (for example, `src/scss/extra`).

    !!! note
        Unlike [regular overrides](overrides.md) and [modules](modules.md),
        custom CSS cannot be defined in the `overrides` folder,
        due to a complication in the current build system.
        I will be working on a way to define this in the `overrides` folder in the future.

1. Add the folder to the end of `css-folders` in `config.py`.
    This should result in the following:
    ```
    "css-folders": ["base", "dictionaries", "extra"],
    ```
1. Under the `extra` folder, use the following files to override the correct css:
    - `style.scss`: The main css for the card templates.
    - `field.scss`: The css used by [CSS injector](setupanki.md#css-injector)
        to customize individual fields.
    - `editor.scss`: The css used by CSS injector to customize the editor around the fields.

    All of the files are optional. This means you do not need to create all three files
    for the folder to be valid.

    The resulting folder should be of the format:
    ```
    src
     L scss
        L base
           L ...
        L dictionaries
           L ...
        L extra
           L field.scss
           L editor.scss
           L style.scss
    ```

1. Rebuild and reinstall the template.
    The css should be automatically applied to the note.


<!--
Many existing variables already exist (see `templates/scss/base/common.scss`),
and can be overwritten easily.

For example, any variable within the `style.scss` file can be replaced by putting
the following under `extra/style.scss`:
```
:root {
    --variable: 5px;
}
```
-->

!!! note

    You might have noticed that this is the SCSS, not CSS.
    However, SCSS is complete superset of CSS
    (with some small exceptions).
    In other words, if you don't know any SCSS, you can write normal CSS
    and have it behave completely the same.


---

# Adjusting Zoom
This allows you to increase (or decrease) the size of the card,
without affecting any of Anki's GUI.

1. Under `extra/style.scss`, add the following code:

    ```css
    :root {
      /* Times 1.1 of the original size.
       * If you want to make the note smaller, use a value below 1, like 0.9.
       */
      --zoom: 1.1;
    }
    ```

---


# Limiting number of dictionaries
This allows you to limit the number of displayed dictionaries shown in "Extra Definitions".

1. Under `extra/style.scss`, add the following code:

    ```css
    /* max 4 definitions shown */
    .glossary-text--extra-definitions ol li:nth-child(n+5) {
      display: none;
    }
    ```

2. (Optional) Under `extra/field.scss`, add the following code:

    ```css
    /* max 4 definitions shown */
    anki-editable[field="ExtraDefinitions"] ol li:nth-child(n+5) {
      color: var(--text-color--3);
    }
    ```
    This will grey out the definitions past the 4th definition in the editor.


---

# Limiting number of frequencies
This allows you to limit the number of frequencies shown at the top right corner.

1. Under `extra/style.scss`, add the following code:

    ```css
    /* max 5 frequencies shown */
    .frequencies div.frequencies__group:nth-child(n+6) {
      display: none;
    }
    ```

2. (Optional) Under `extra/field.scss`, add the following code:

    ```css
    /* max 5 frequencies shown */
    anki-editable[field="FrequenciesStylized"] div.frequencies__group:nth-child(n+6) {
      color: var(--text-color--3);
    }
    ```
    This will grey out the frequencies past the 5th frequency in the editor.



---

# Hiding the first line of a definition

The first line of the definition has various elements that can be hidden with CSS.

=== "Nothing Hidden (Default)"
    <figure markdown>
      {{ img("", "assets/first_line_css/full.png") }}
      <figcaption>
        Nothing is hidden. This is the default behavior.
      </figcaption>
    </figure>

=== "Hide Extra Text"
    <figure markdown>
      {{ img("", "assets/first_line_css/dict_tag_only.png") }}
      <figcaption>
        [(CSS)](customcss.md#hiding-the-text-after-the-dictionary)
        This hides all the text to the right of the dictionary tag.
      </figcaption>
    </figure>

=== "Hide Dictionary Tag"
    <figure markdown>
      {{ img("", "assets/first_line_css/right_text_only.png") }}
      <figcaption>
        [(CSS)](customcss.md#hiding-dictionary-tags)
        Removes only the dictionary tag.
        It doesn't look very good on most dictionaries.
      </figcaption>
    </figure>

=== "Hide Entire First Line"
    <figure markdown>
      {{ img("", "assets/first_line_css/first_line_hidden.png") }}
      <figcaption>
        [(CSS)](customcss.md#fully-hiding-the-first-line)
        Hides the entire first line, removing both the dictionary tag
        and the text to the right of the dictionary tag.
      </figcaption>
    </figure>



---


## Hiding the text after the dictionary
{{ feature_version("0.11.0.0") }}

This removes the text content to the right of the the dictionary tag.


1. Under `extra/style.scss`, add the following code:

    ```css
    /* hide the text after the 「旺文社国語辞典 第十一版」 dictionary tag */
    .glossary-text ol li[data-details="明鏡国語辞典 第二版"] .dict-group__glossary--first-line {
      display: none;
    }
    ```

2. (Optional) Under `extra/field.scss`, add the following code:

    ```css
    /* greys out the text after the 「旺文社国語辞典 第十一版」 dictionary tag */
    anki-editable ol li[data-details="明鏡国語辞典 第二版"] .dict-group__glossary--first-line {
      color: var(--text-color--3);
    }
    ```

---



## Hiding dictionary tags
This will allow you hide arbitrary dictionary tags.

1. Under `extra/style.scss`, add the following code:
    ```css
    /* hide the 「旺文社国語辞典 第十一版」 dictionary */
    ol li[data-details="旺文社国語辞典 第十一版"] .dict-group__tag-list {
      display: none;
    }
    ```

2. (Optional) Under `extra/field.scss`, add the following code:
    ```css
    /* greys out the 「旺文社国語辞典 第十一版」 dictionary */
    anki-editable ol li[data-details="旺文社国語辞典 第十一版"] .dict-group__tag-list {
      color: var(--text-color--3);
    }
    ```

---

## Fully hiding the first line
{{ feature_version("0.11.0.0") }}

The above two can be combined to completely hide the first line.

1. Under `extra/style.scss`, add the following code:

    ```css
    /* hide the first line for the 「旺文社国語辞典 第十一版」 dictionary */
    .glossary-text ol li[data-details="明鏡国語辞典 第二版"] {
      .dict-group__tag-list, .dict-group__glossary--first-line, .dict-group__glossary--first-line-break {
        display: none;
      }
    }

    ```

2. (Optional) Under `extra/field.scss`, add the following code:

    ```css
    anki-editable ol li[data-details="明鏡国語辞典 第二版"] {
      .dict-group__tag-list, .dict-group__glossary--first-line, .dict-group__glossary--first-line-break {
        display: none;
      }
    }
    ```

!!! note
    The above examples are scss, and not css.
    If you are using css, do not flatten the classes after the first line.

    ??? examplecode "Example Raw CSS *(click here)*"
        ```css
        .glossary-text ol li[data-details="明鏡国語辞典 第二版"] .dict-group__tag-list {
          display: none;
        }
        .glossary-text ol li[data-details="明鏡国語辞典 第二版"] .dict-group__glossary--first-line {
          display: none;
        }
        .glossary-text ol li[data-details="明鏡国語辞典 第二版"] .dict-group__glossary--first-line-break {
          display: none;
        }
        ```

---



# Removing the numbers on the primary definition

Currently, I am not aware of an easy way to only remove the numbers if there is only one
item (and having them remain for multple definitions) with only CSS.

The following CSS completely nukes the numbers regardless of how many items there are in the list.


1. Under `extra/style.scss`, add the following code:

    ```css
    .glossary-text--primary-definition ol {
      list-style: none;
      padding-left: 0em;
    }
    ```



---

# Highlight the word within the tooltips
{{ feature_version("0.11.0.0") }}

The word within the sentences are not highlighted by default.
This allows said words to be highlighted.

1. Under `extra/style.scss`, add the following code:

    ```css
    .hover-tooltip .hover-tooltip__sent-div b {
      font-weight: bold;
      color: var(--accent);
    }
    ```


# Remove the "(N/A)" on words with no pitch accents
{{ feature_version("0.11.0.0") }}

If the word has no pitch accent, the pitch accent is usually displayed as `(N/A)`.
This indicator can be removed with the following CSS:

1. Under `extra/style.scss`, add the following code:

    ```css
    .dh-left__word-pitch-text:empty:before {
      content: ""
    }
    ```






<!--
# Hiding Several Dictionary Tags
Alternatively, you can hide all dictionaries that are not
a specific dictionary:

1. Under `extra/style.scss`, add the following code:
    ```css
    /* hide dictionaries other than "JMdict (English)" */
    ol li:not([data-details="JMdict (English)"]) .dict-group__tag-list {
      display: none;
    }
    ```

2. (Optional) Under `extra/field.scss`, add the following code:
    ```css
    /* greys out all dictionaries that aren't JMdict (English) */
    anki-editable ol li:not([data-details="JMdict (English)"]) .dict-group__tag-list {
      color: var(--text-color--3);
    }
    ```
-->



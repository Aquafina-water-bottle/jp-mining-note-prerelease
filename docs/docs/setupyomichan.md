# Overview

[Yomichan](https://github.com/FooSoft/yomichan)
is the main program that will create the cards. You can download Yomichan as a Firefox extension
or under the Chrome web store.

This section will go over the minimal Yomichan setup to work with this card type.

**If you have never used Yomichan before**, please see
[this page](https://learnjapanese.moe/yomichan/) first to get it working.

---

# Preliminary Steps
If you have used Yomichan before, please make a
[backup of your settings](faq.md#how-do-i-backup-yomichan-settings){:target="_blank"}
(just in case).


Additionally, if you downloaded Yomichan from a file, try updating that as well.
Most users should have installed it from their browser's extension page, in which case
nothing has to be done.

---


# Yomichan Fields
To edit the fields that Yomichan will automatically fill out, do the following:

![type:video](assets/yomichan/yomichan_anki_format.mp4)

1. Navigate to Yomichan Settings.
1. Go to the `Anki` section.
1. Select `Anki card format...`.
1. Set "Model" as `JP Mining Note`.
1. Copy and paste the following values into the fields
   (the custom markers won't be available in the dropdown arrow):


??? example "Click here to see the fields to copy and paste."

    {{ yomichan_fields_table() | indent(4) }}


The above fields will create, by default,
a basic **vocab card** in **bilingual format**,
with all other definitions in collapsable fields.

!!! note
    Anything field marked with `*` are binary fields, and
    **should be configured to each user's personal preferences.**

    To change the default value of any of the fields, simply fill
    the field in within the aforementioned `Anki card format...` section.

    For example, if you want the card to be a sentence card by default,
    fill the `IsSentenceCard` field here.


The custom markers like `{jpmn-primary-definition}` is not provided by Yomichan by default.
See the section below to make these markers usable.

---



# Yomichan Templates
Yomichan supports user inserted template code that allows the automatic
separation of bilingual and monolingual dictionary definitions, custom stylization, etc.
This note type makes heavy use of these custom templates.

To make the new markers usable, do the following:

![type:video](assets/yomichan/import_yomichan_templates.mp4)

1. Navigate to Yomichan Settings.
1. Make sure that advanced settings are turned on (bottom left corner).
1. Go to the `Anki` section
1. Select `Configure Anki card templates...`
1. If you have existing template code already, I highly recommend
   **resetting the templates** (bottom right corner, red button)
   unless you know exactly what you are doing.

After resetting the templates,
**without** removing any of the existing template code,
add the following template code as follows:

1. Copy and paste the code below to the **top** of the default Yomichan template code:

    ??? examplecode "Click here to show the template code to copy."

        ```handlebars
        {% filter indent(width=8) -%}
        {{ TOP_YOMICHAN }}
        {% endfilter %}
        ```

2. Copy and paste the code below to the **bottom** of the default Yomichan template code:

    ??? examplecode "Click here to show the template code to copy."

        ```handlebars
        {% filter indent(width=8) -%}
        {{ BOTTOM_YOMICHAN }}
        {% endfilter %}
        ```

---

# Make an example card!
At this point, you should be able to make cards with Yomichan!

??? example "Click here to show some example Japanese sentences."

    「や、いらっしゃい。ま、毒を食らわば皿までって言うしね。あ、違うか。乗り掛かった船？」
    { .jp-quote-text }

    「なによぅ…甲斐甲斐しく会いに来た女に対して、最初に言うセリフがそれ？」
    { .jp-quote-text }

    「あの時逃げ出した私の罰…あの時の汚辱は今ここで、全部そそいでやるんだ…」
    { .jp-quote-text }

    「貴方なんなんです？なにか、妙に銃口慣れしていますね…若者特有の空威張りという訳でもなさそうですし…」
    { .jp-quote-text }

{{ img("adding a card with Yomichan", "assets/yomichan/add_card.gif") }}

Obviously, just Yomichan alone doesn't fill every field.
Notably, the picture and sentence audio is missing.

Outside of that, there are some final settings you can adjust within the Yomichan templates
if the card doesn't look quite right.


---


# Yomichan Templates Options

## Monolingual Definition
<i><sup>Main page: [Yomichan Template Options (Categorization of Dictionaries)](yomichantemplates.md#categorization-of-dictionaries)</sup></i>

If you want the first definition you see (the `PrimaryDefinition` field) to be monolingual,
change the following line at the top of the templates code:

{% raw %}
```handlebars
{{~#set "opt-first-definition-type" "bilingual"}}{{/set~}}
```
to
```handlebars
{{~#set "opt-first-definition-type" "monolingual"}}{{/set~}}
```
{% endraw %}


!!! note

    If you are using monolingual dictionaries, on your first few cards,
    please check that your dictionaries are in the expected places.
    Extra bilingual definitions should be under `Secondary Definition`,
    and extra monolingual definitions should be under `Extra Definitions`.

    If your dictionaries are ending up in the wrong sections,
    then it is likely a problem with how the template code categorizes the dictionaries.
    See [here](yomichantemplates.md#categorization-of-dictionaries){:target="_blank"} for more info.

<br>


## Selected Text as the Definition
<i><sup>Main page: [Yomichan Template Options (Selected Text)](yomichantemplates.md#selected-text)</sup></i>


If you want to select the text to use instead of the definition,
simply set `opt-selection-text-enabled` to `true`.

![type:video](assets/yomichan/selected_text.mp4)

By default, this enable the following behavior:

1. If nothing is selected, then the first dictionary is chosen just like normal.
1. If a dictionary is selected, then that dictionary will replace the first definition.
1. If a section of text is selected, then that dictionary will replace the first definition.
    Additionally, that section of text will be highlighted (bolded).

!!! note
    Selecting parts of a definition to bold the text does not always work,
    especially when used across text with formatting or newlines.
    See [this](yomichantemplates.md#overriding-the-definition){:target="_blank"} for more details.

    With this being said, selecting the dictionary should always work.

---


# Android Setup

!!! warning
    Actually using JPMN on mobile devices (e.g. for reviewing), is currently not supported.
    This simply shows how to make the cards on Android.

If you wish to add cards on Android, use
[AnkiconnectAndroid](https://github.com/KamWithK/AnkiconnectAndroid)
and follow the instructions on the AnkiconnectAndroid's README page.

In addition to the above instructions, you may have to disable duplicate checks
in order for the application to work.

There is currently no way to automatically add an image (e.g. a screenshot) automatically.
Images must be added manually within `AnkiDroid`.


!!! info "Tip"

    Although screenshots cannot be added automatically,
    the runtime options supports automatically adding images
    based off of tags. See [here](images.md#automatically-add-images-using-tags)
    for more info.

---


# Enjoy your new one-click cards!

If you've made it this far, then congratulations!
Most fields of the cards have been automatically filled out, just from Yomichan alone!

This concludes the setup process for creating cards with Yomichan.

From here, you likely fall under one of the two categories below:


1. **I'm new to sentence mining.**

    If you're new to sentence mining, there are likely some things things
    that you would like to set up. These include:

    1. Getting the actual text to use Yomichan on.
    1. Getting the pictures and/or sentence audio from the media into the card.

    Head over to the [Setup: Everything Else](setupeverythingelse.md) page to see exactly that.


1. **I already have a sentence mining workflow.**

    If you have a workflow already setup,
    you may have to do some minor tweaks to your current workflow
    to match the new field names.
    For example, the exporting sentence audio and picture fields may be different
    compared to your previous card.

    Other than that, you are completely finished with the setup process!

    !!! note
        See [Setup: Everything Else (Notes on Various Programs)](setupeverythingelse.md#notes-on-various-programs)
        for specific tips on a select few programs.


<!--
If you already have a
you may have to do some minor tweaks to your current workflow,
to match the field names, for exporting sentence audio and pictures.
However, outside of that, **you are now finished**{ .text-yellow }!

From here, there are a few of pages of interest.

- Up until now, this has documented the bare minimum setup to create Anki cards.
    For purely optional but potentially useful setup tips, see [Setup: Other](setupother.md).
- You can now create and use jp-mining-note!
    See the [Reference](ui.md)
    to see all the different ways you can use and personalize the card.


---

# Wait! I don't have a workflow setup yet!

If you're new to sentence mining, there are likely some things things
that you would like to set up. These include:

1. Getting the actual text to use Yomichan on.
1. Getting the pictures and/or sentence audio from the media into the card.

Head over to the [Setup: Everything Else](setupeverythingelse.md) page to see exactly that.

-->







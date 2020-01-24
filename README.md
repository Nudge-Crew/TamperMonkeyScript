# TamperMonkeyScript

This script can be imported into tempermonkey using the import file function.

# Installation Guide
1. Make sure you have [tampermonkey](https://www.tampermonkey.net) installed on your browser.
2. Download the `tampermonkey-script.zip` from [the latest release](https://github.com/Nudge-Crew/TamperMonkeyScript/releases/tag/1.0.0).
3. Go to `TamperMonkey Dashboard` in your extension menu.
4. Go to `Utilities` in the dashboard menu.
5. Click on `Zip Import` and select `tampermonkey-script.zip` file.
6. Once redirected to the `Import` screen, make sure to have both `KPI Help` and `Emotion API` selected.

Tampermonkey should now be functioning on browser at [canvas](https://fhict.test.instructure.com).

In order to make it work properly make sure to do the following steps:
(These steps are for Firefox, but should be similar to other browsers)
1. Go to `Inspect Element`
2. Go to `Storage`
3. Go to `Local Storage` and click on the canvas url e.g `https://fhict.test.instructure.com`
4. Click the `+` icon to add a new value to `Local Storage`.
5. add a key called `canvas` and your [canvas access_token](https://canvas.instructure.com/doc/api/file.oauth.html#manual-token-generation) as the value.

Once these steps are followed, the canvas buttons should be functioning properly and saving to the database.

Warning: Sentimental Analysis currently only functions with a [selected amount of languages](https://cloud.google.com/natural-language/docs/languages). As of January 2020 the Dutch language is not yet supported.

Warning: Sentimental Analysis may take a while before it is giving a response. An Alert will pop-up once the action has been finished (both success and error)

# gogh
Build system for awesome backgrounds in CSS [CLI, Build, PostCSS]

## Example

gogh --import --file import.json > style.json ;
gogh --merge --file import-verticals.json > style2.json;
mv style2.json style.json;
gogh --compile > style.css 

## Notes
Given properly formatted gradient information in style.json create style.css,
and a preview of all CSS backgrounds inside (index.html)

This will be GH_PAGES friendly by default.

It will use parcel for ES6 behind index.html
It will use PostCSS for prefixes.

It will check for empty JSON and existence of style.txt

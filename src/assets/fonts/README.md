# Fonts
Use woff and woff2 preferrablly

Decalre weight variations _(Bold, Regular)_ of a font under one font family.


```css
@font-face {
  font-family: "Open Sans";
  font-weight: 400;
  src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),
       url("/fonts/OpenSans-Regular-webfont.woff") format("woff");
}

@font-face {
  font-family: "Open Sans";
  font-weight: bold;
  src: url("/fonts/OpenSans-Bold-webfont.woff2") format("woff2"),
       url("/fonts/OpenSans-Bold-webfont.woff") format("woff");
}
```


References: 
  - https://developer.mozilla.org/en-US/docs/Web/Guide/WOFF
  - https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face

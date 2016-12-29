!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict";function t(e){for(var t={},r=0;r<e.length;++r)t[e[r]]=!0;return t}function r(e,t){for(var r,o=!1;null!=(r=e.next());){if(o&&"/"==r){t.tokenize=null;break}o="*"==r}return["comment","comment"]}e.defineMode("css",function(t,r){function o(e,t){return h=t,e}function a(e,t){var r=e.next();if(f[r]){var a=f[r](e,t);if(a!==!1)return a}return"@"==r?(e.eatWhile(/[\w\\\-]/),o("def",e.current())):"="==r||("~"==r||"|"==r)&&e.eat("=")?o(null,"compare"):'"'==r||"'"==r?(t.tokenize=i(r),t.tokenize(e,t)):"#"==r?(e.eatWhile(/[\w\\\-]/),o("atom","hash")):"!"==r?(e.match(/^\s*\w*/),o("keyword","important")):/\d/.test(r)||"."==r&&e.eat(/\d/)?(e.eatWhile(/[\w.%]/),o("number","unit")):"-"!==r?/[,+>*\/]/.test(r)?o(null,"select-op"):"."==r&&e.match(/^-?[_a-z][_a-z0-9-]*/i)?o("qualifier","qualifier"):/[:;{}\[\]\(\)]/.test(r)?o(null,r):"u"==r&&e.match(/rl(-prefix)?\(/)||"d"==r&&e.match("omain(")||"r"==r&&e.match("egexp(")?(e.backUp(1),t.tokenize=n,o("property","word")):/[\w\\\-]/.test(r)?(e.eatWhile(/[\w\\\-]/),o("property","word")):o(null,null):/[\d.]/.test(e.peek())?(e.eatWhile(/[\w.%]/),o("number","unit")):e.match(/^-[\w\\\-]+/)?(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?o("variable-2","variable-definition"):o("variable-2","variable")):e.match(/^\w+-/)?o("meta","meta"):void 0}function i(e){return function(t,r){for(var a,i=!1;null!=(a=t.next());){if(a==e&&!i){")"==e&&t.backUp(1);break}i=!i&&"\\"==a}return(a==e||!i&&")"!=e)&&(r.tokenize=null),o("string","string")}}function n(e,t){return e.next(),e.match(/\s*[\"\')]/,!1)?t.tokenize=null:t.tokenize=i(")"),o(null,"(")}function l(e,t,r){this.type=e,this.indent=t,this.prev=r}function s(e,t,r,o){return e.context=new l(r,t.indentation()+(o===!1?0:b),e.context),r}function c(e){return e.context.prev&&(e.context=e.context.prev),e.context.type}function d(e,t,r){return _[r.context.type](e,t,r)}function p(e,t,r,o){for(var a=o||1;a>0;a--)r.context=r.context.prev;return d(e,t,r)}function u(e){var t=e.current().toLowerCase();g=K.hasOwnProperty(t)?"atom":j.hasOwnProperty(t)?"keyword":"variable"}var m=r.inline;r.propertyKeywords||(r=e.resolveMode("text/css"));var h,g,b=t.indentUnit,f=r.tokenHooks,y=r.documentTypes||{},w=r.mediaTypes||{},k=r.mediaFeatures||{},v=r.mediaValueKeywords||{},x=r.propertyKeywords||{},z=r.nonStandardPropertyKeywords||{},q=r.fontProperties||{},P=r.counterDescriptors||{},j=r.colorKeywords||{},K=r.valueKeywords||{},B=r.allowNested,T=r.supportsAtComponent===!0,_={};return _.top=function(e,t,r){if("{"==e)return s(r,t,"block");if("}"==e&&r.context.prev)return c(r);if(T&&/@component/.test(e))return s(r,t,"atComponentBlock");if(/^@(-moz-)?document$/.test(e))return s(r,t,"documentTypes");if(/^@(media|supports|(-moz-)?document|import)$/.test(e))return s(r,t,"atBlock");if(/^@(font-face|counter-style)/.test(e))return r.stateArg=e,"restricted_atBlock_before";if(/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(e))return"keyframes";if(e&&"@"==e.charAt(0))return s(r,t,"at");if("hash"==e)g="builtin";else if("word"==e)g="tag";else{if("variable-definition"==e)return"maybeprop";if("interpolation"==e)return s(r,t,"interpolation");if(":"==e)return"pseudo";if(B&&"("==e)return s(r,t,"parens")}return r.context.type},_.block=function(e,t,r){if("word"==e){var o=t.current().toLowerCase();return x.hasOwnProperty(o)?(g="property","maybeprop"):z.hasOwnProperty(o)?(g="string-2","maybeprop"):B?(g=t.match(/^\s*:(?:\s|$)/,!1)?"property":"tag","block"):(g+=" error","maybeprop")}return"meta"==e?"block":B||"hash"!=e&&"qualifier"!=e?_.top(e,t,r):(g="error","block")},_.maybeprop=function(e,t,r){return":"==e?s(r,t,"prop"):d(e,t,r)},_.prop=function(e,t,r){if(";"==e)return c(r);if("{"==e&&B)return s(r,t,"propBlock");if("}"==e||"{"==e)return p(e,t,r);if("("==e)return s(r,t,"parens");if("hash"!=e||/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())){if("word"==e)u(t);else if("interpolation"==e)return s(r,t,"interpolation")}else g+=" error";return"prop"},_.propBlock=function(e,t,r){return"}"==e?c(r):"word"==e?(g="property","maybeprop"):r.context.type},_.parens=function(e,t,r){return"{"==e||"}"==e?p(e,t,r):")"==e?c(r):"("==e?s(r,t,"parens"):"interpolation"==e?s(r,t,"interpolation"):("word"==e&&u(t),"parens")},_.pseudo=function(e,t,r){return"word"==e?(g="variable-3",r.context.type):d(e,t,r)},_.documentTypes=function(e,t,r){return"word"==e&&y.hasOwnProperty(t.current())?(g="tag",r.context.type):_.atBlock(e,t,r)},_.atBlock=function(e,t,r){if("("==e)return s(r,t,"atBlock_parens");if("}"==e||";"==e)return p(e,t,r);if("{"==e)return c(r)&&s(r,t,B?"block":"top");if("interpolation"==e)return s(r,t,"interpolation");if("word"==e){var o=t.current().toLowerCase();g="only"==o||"not"==o||"and"==o||"or"==o?"keyword":w.hasOwnProperty(o)?"attribute":k.hasOwnProperty(o)?"property":v.hasOwnProperty(o)?"keyword":x.hasOwnProperty(o)?"property":z.hasOwnProperty(o)?"string-2":K.hasOwnProperty(o)?"atom":j.hasOwnProperty(o)?"keyword":"error"}return r.context.type},_.atComponentBlock=function(e,t,r){return"}"==e?p(e,t,r):"{"==e?c(r)&&s(r,t,B?"block":"top",!1):("word"==e&&(g="error"),r.context.type)},_.atBlock_parens=function(e,t,r){return")"==e?c(r):"{"==e||"}"==e?p(e,t,r,2):_.atBlock(e,t,r)},_.restricted_atBlock_before=function(e,t,r){return"{"==e?s(r,t,"restricted_atBlock"):"word"==e&&"@counter-style"==r.stateArg?(g="variable","restricted_atBlock_before"):d(e,t,r)},_.restricted_atBlock=function(e,t,r){return"}"==e?(r.stateArg=null,c(r)):"word"==e?(g="@font-face"==r.stateArg&&!q.hasOwnProperty(t.current().toLowerCase())||"@counter-style"==r.stateArg&&!P.hasOwnProperty(t.current().toLowerCase())?"error":"property","maybeprop"):"restricted_atBlock"},_.keyframes=function(e,t,r){return"word"==e?(g="variable","keyframes"):"{"==e?s(r,t,"top"):d(e,t,r)},_.at=function(e,t,r){return";"==e?c(r):"{"==e||"}"==e?p(e,t,r):("word"==e?g="tag":"hash"==e&&(g="builtin"),"at")},_.interpolation=function(e,t,r){return"}"==e?c(r):"{"==e||";"==e?p(e,t,r):("word"==e?g="variable":"variable"!=e&&"("!=e&&")"!=e&&(g="error"),"interpolation")},{startState:function(e){return{tokenize:null,state:m?"block":"top",stateArg:null,context:new l(m?"block":"top",e||0,null)}},token:function(e,t){if(!t.tokenize&&e.eatSpace())return null;var r=(t.tokenize||a)(e,t);return r&&"object"==typeof r&&(h=r[1],r=r[0]),g=r,t.state=_[t.state](h,e,t),g},indent:function(e,t){var r=e.context,o=t&&t.charAt(0),a=r.indent;return"prop"!=r.type||"}"!=o&&")"!=o||(r=r.prev),r.prev&&("}"!=o||"block"!=r.type&&"top"!=r.type&&"interpolation"!=r.type&&"restricted_atBlock"!=r.type?(")"!=o||"parens"!=r.type&&"atBlock_parens"!=r.type)&&("{"!=o||"at"!=r.type&&"atBlock"!=r.type)||(a=Math.max(0,r.indent-b),r=r.prev):(r=r.prev,a=r.indent)),a},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",fold:"brace"}});var o=["domain","regexp","url","url-prefix"],a=t(o),i=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],n=t(i),l=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid","orientation","device-pixel-ratio","min-device-pixel-ratio","max-device-pixel-ratio","pointer","any-pointer","hover","any-hover"],s=t(l),c=["landscape","portrait","none","coarse","fine","on-demand","hover","interlace","progressive"],d=t(c),p=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","baseline-shift","binding","bleed","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-feature-settings","font-family","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-gap","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-gap","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","justify-content","left","letter-spacing","line-break","line-height","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marker-offset","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","max-height","max-width","min-height","min-width","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotation","rotation-point","ruby-align","ruby-overhang","ruby-position","ruby-span","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-outline","text-overflow","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","word-break","word-spacing","word-wrap","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode"],u=t(p),m=["scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-3d-light-color","scrollbar-track-color","shape-inside","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","zoom"],h=t(m),g=["font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"],b=t(g),f=["additive-symbols","fallback","negative","pad","prefix","range","speak-as","suffix","symbols","system"],y=t(f),w=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],k=t(w),v=["above","absolute","activeborder","additive","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","attr","auto","avoid","avoid-column","avoid-page","avoid-region","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","bullets","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","calc","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","color","color-burn","color-dodge","column","column-reverse","compact","condensed","contain","content","content-box","context-menu","continuous","copy","counter","counters","cover","crop","cross","crosshair","currentcolor","cursive","cyclic","darken","dashed","decimal","decimal-leading-zero","default","default-button","dense","destination-atop","destination-in","destination-out","destination-over","devanagari","difference","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ethiopic-numeric","ew-resize","exclusion","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fixed","flat","flex","flex-end","flex-start","footnotes","forwards","from","geometricPrecision","georgian","graytext","grid","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hard-light","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","hue","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-grid","inline-table","inset","inside","intrinsic","invert","italic","japanese-formal","japanese-informal","justify","kannada","katakana","katakana-iroha","keep-all","khmer","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","landscape","lao","large","larger","left","level","lighter","lighten","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","luminosity","malayalam","match","matrix","matrix3d","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","multiply","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","octal","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","perspective","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row","row-resize","row-reverse","rtl","run-in","running","s-resize","sans-serif","saturation","scale","scale3d","scaleX","scaleY","scaleZ","screen","scroll","scrollbar","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","semi-condensed","semi-expanded","separate","serif","show","sidama","simp-chinese-formal","simp-chinese-informal","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","soft-light","solid","somali","source-atop","source-in","source-out","source-over","space","space-around","space-between","spell-out","square","square-button","start","static","status-bar","stretch","stroke","sub","subpixel-antialiased","super","sw-resize","symbolic","symbols","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tamil","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","trad-chinese-formal","trad-chinese-informal","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","var","vertical","vertical-text","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","wrap","wrap-reverse","x-large","x-small","xor","xx-large","xx-small"],x=t(v),z=o.concat(i).concat(l).concat(c).concat(p).concat(m).concat(w).concat(v);e.registerHelper("hintWords","css",z),e.defineMIME("text/css",{documentTypes:a,mediaTypes:n,mediaFeatures:s,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:h,fontProperties:b,counterDescriptors:y,colorKeywords:k,valueKeywords:x,tokenHooks:{"/":function(e,t){return e.eat("*")?(t.tokenize=r,r(e,t)):!1}},name:"css"}),e.defineMIME("text/x-scss",{mediaTypes:n,mediaFeatures:s,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:h,colorKeywords:k,valueKeywords:x,fontProperties:b,allowNested:!0,tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=r,r(e,t)):["operator","operator"]},":":function(e){return e.match(/\s*\{/)?[null,"{"]:!1},$:function(e){return e.match(/^[\w-]+/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"]},"#":function(e){return e.eat("{")?[null,"interpolation"]:!1}},name:"css",helperType:"scss"}),e.defineMIME("text/x-less",{mediaTypes:n,mediaFeatures:s,mediaValueKeywords:d,propertyKeywords:u,nonStandardPropertyKeywords:h,colorKeywords:k,valueKeywords:x,fontProperties:b,allowNested:!0,tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=r,r(e,t)):["operator","operator"]},"@":function(e){return e.eat("{")?[null,"interpolation"]:e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/,!1)?!1:(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"])},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"}),e.defineMIME("text/x-gss",{documentTypes:a,mediaTypes:n,mediaFeatures:s,propertyKeywords:u,nonStandardPropertyKeywords:h,fontProperties:b,counterDescriptors:y,colorKeywords:k,valueKeywords:x,supportsAtComponent:!0,tokenHooks:{"/":function(e,t){return e.eat("*")?(t.tokenize=r,r(e,t)):!1}},name:"css",helperType:"gss"})});
//# sourceMappingURL=css.min.js.map
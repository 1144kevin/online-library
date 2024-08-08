module.exports = {
    extends: ['stylelint-config-recommended-scss', 'stylelint-config-prettier'],
    plugins: ['stylelint-order'],
    rules: {
      // 禁止在字體系列中使用重複的名字
      'font-family-no-duplicate-names': true,
      // 在計算函數中的操作符之間需要使用空格
      'function-calc-no-unspaced-operator': true,
      // 字符串中不允許换行
      'string-no-newline': true,
      // 禁止未知單位
      'unit-no-unknown': true,
      // 禁止未知属性
      'property-no-unknown': true,
      // 在 keyframe 中禁止使用!important
      'keyframe-declaration-no-important': true,
      // block 中禁止出現重複的属性
      'declaration-block-no-duplicate-properties': true,
      // 禁止空 block
      'block-no-empty': true,
      // 禁止未知的 pseudo-class
      'selector-pseudo-class-no-unknown': true,
      // 禁止未知的 pseudo-element
      'selector-pseudo-element-no-unknown': true,
      // 禁止未知的 selector
      'selector-type-no-unknown': true,
      // 忽略指定的未知 @ 规则
      'scss/at-rule-no-unknown': [
        true,
        {
          ignoreAtRules: [],
        },
      ],
      // 不檢查權重
      'no-descending-specificity': null,
      // 禁止重複 import 規則
      'no-duplicate-at-import-rules': true,
      // 禁止重複選擇器
      'no-duplicate-selectors': true,
      // 禁止額外的分號
      'no-extra-semicolons': true,
      // 不使用颜色名稱，只使用十六進制或其缩寫
      'color-named': 'never',
      // 定義 keyframes 命名方式
      'keyframes-name-pattern': 'animate-.+',
      // 一行只允許有一個 key:value
      'declaration-block-single-line-max-declarations': 1,
      // 複合選擇器中允許的最大複合選擇器數量
      'selector-max-compound-selectors': 5,
      // 選擇器中不允許空行
      'selector-max-empty-lines': 0,
      // pseudo-element 選擇器的冒號符號表示為雙冒號
      'selector-pseudo-element-colon-notation': 'double',
      // 最大 nesting 深度
      'max-nesting-depth': 5,
      // 十六進制颜色使用小寫
      'color-hex-case': 'lower',
      // 函數中逗號後需要空格
      'function-comma-space-after': 'always',
      // 函數中逗號前不能有空格
      'function-comma-space-before': 'never',
      // 函數中不允許空行
      'function-max-empty-lines': 0,
      // 函數名使用小寫
      'function-name-case': 'lower',
      // 函數中URL需要引號
      'function-url-quotes': 'always',
      // 函數後需要空格
      'function-whitespace-after': 'always',
      // 數字前不允許有前導零
      'number-leading-zero': 'never',
      // 數字後不允許有尾随零
      'number-no-trailing-zeros': true,
      // 字符串使用單引號
      'string-quotes': 'single',
      // 單位使用小寫
      'unit-case': 'lower',
      // 值的關键字使用小寫
      'value-keyword-case': 'lower',
      // 值列表中不允許有空行
      'value-list-max-empty-lines': 0,
      // 自定義属性前不允許有空行
      'custom-property-empty-line-before': 'never',
      // 属性名使用小寫
      'property-case': 'lower',
      // 驚嘆號後不需要空格
      'declaration-bang-space-after': 'never',
      // 驚嘆號前需要空格
      'declaration-bang-space-before': 'always',
      // 冒號後需要空格
      'declaration-colon-space-after': 'always',
      // 冒號前不能有空格
      'declaration-colon-space-before': 'never',
      // block 前不能有空行
      'declaration-empty-line-before': 'never',
      // block 分號後需要换行
      'declaration-block-semicolon-newline-after': 'always',
      // block 分號前不能有空格
      'declaration-block-semicolon-space-before': 'never',
      // block 中最後一個屬性必须有分號
      'declaration-block-trailing-semicolon': 'always',
      // block 的 } 前不能有空行
      'block-closing-brace-empty-line-before': 'never',
      // block 的 } 前需要换行
      'block-closing-brace-newline-before': 'always',
      // block 的 { 後需要换行
      'block-opening-brace-newline-after': 'always',
      // block 的 { 前需要有空格
      'block-opening-brace-space-before': 'always',
      // 属性選擇器括號内不能有空格
      'selector-attribute-brackets-space-inside': 'never',
      // 属性選擇器操作符後不能有空格
      'selector-attribute-operator-space-after': 'never',
      // 属性選擇器操作符前不能有空格
      'selector-attribute-operator-space-before': 'never',
      // 属性選擇器的值必须使用引號
      'selector-attribute-quotes': 'always',
      // 组合選擇器後需要有空格
      'selector-combinator-space-after': 'always',
      // 组合選擇器前需要有空格
      'selector-combinator-space-before': 'always',
      // 後代選擇器不允許有非空格字符
      'selector-descendant-combinator-no-non-space': true,
      // 伪类選擇器名稱使用小寫
      'selector-pseudo-class-case': 'lower',
      // 伪类選擇器括號内不能有空格
      'selector-pseudo-class-parentheses-space-inside': 'never',
      // pseudo-element 選擇器名稱使用小寫
      'selector-pseudo-element-case': 'lower',
      // 選擇器列表中逗號後需要换行
      'selector-list-comma-newline-after': 'always',
      // 選擇器列表中逗號前不能有空格
      'selector-list-comma-space-before': 'never',
      // block 前需要空行
      'rule-empty-line-before': [
        'always-multi-line',
        {
          except: ['first-nested'],
          ignore: ['after-comment'],
        },
      ],
      // media 中的冒號後需要空格
      'media-feature-colon-space-after': 'always',
      // media 中的冒號前不能有空格
      'media-feature-colon-space-before': 'never',
      // media 名稱使用小寫
      'media-feature-name-case': 'lower',
      // media 括號内不能有空格
      'media-feature-parentheses-space-inside': 'never',
      // media 的範圍操作符後需要空格
      'media-feature-range-operator-space-after': 'always',
      // media 的範圍操作符前需要空格
      'media-feature-range-operator-space-before': 'always',
      // media 查詢列表中的逗號後需要空格
      'media-query-list-comma-space-after': 'always',
      // media 查詢列表中的逗號前不能有空格
      'media-query-list-comma-space-before': 'never',
      // @ 名稱使用小寫
      'at-rule-name-case': 'lower',
      // @ 名稱後需要空格
      'at-rule-name-space-after': 'always',
      // @ 分號後需要换行
      'at-rule-semicolon-newline-after': 'always',
      // @ 分號前不能有空格
      'at-rule-semicolon-space-before': 'never',
      // 縮排
      indentation: 2,
      // 最多允許一個空行
      'max-empty-lines': 1,
      // 禁止行尾空白
      'no-eol-whitespace': true,
      'order/properties-order': [
        {
          // Must be first.
          properties: ['all', 'content', 'appearance'],
        },
        {
          // Position.
          properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index'],
        },
        {
          // Display mode.
          properties: ['box-sizing', 'display'],
        },
        {
          // Flexible boxes.
          properties: [
            'flex',
            'flex-basis',
            'flex-direction',
            'flex-flow',
            'flex-grow',
            'flex-shrink',
            'flex-wrap',
          ],
        },
        {
          // Grid layout.
          properties: [
            'grid',
            'grid-area',
            'grid-template',
            'grid-template-areas',
            'grid-template-rows',
            'grid-template-columns',
            'grid-row',
            'grid-row-start',
            'grid-row-end',
            'grid-column',
            'grid-column-start',
            'grid-column-end',
            'grid-auto-rows',
            'grid-auto-columns',
            'grid-auto-flow',
            'grid-gap',
            'grid-row-gap',
            'grid-column-gap',
          ],
        },
        {
          // Gap.
          properties: ['gap', 'row-gap', 'column-gap'],
        },
        {
          // Layout alignment.
          properties: [
            'place-items',
            'align-content',
            'align-items',
            'align-self',
            'justify-content',
            'justify-items',
            'justify-self',
          ],
        },
        {
          // Order.
          properties: ['order'],
        },
        {
          // Box model.
          properties: [
            'float',
            'width',
            'min-width',
            'max-width',
            'height',
            'min-height',
            'max-height',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'overflow',
            'overflow-x',
            'overflow-y',
            '-webkit-overflow-scrolling',
            '-ms-overflow-x',
            '-ms-overflow-y',
            '-ms-overflow-style',
            'overscroll-behavior',
            'overscroll-behavior-x',
            'overscroll-behavior-y',
            'overscroll-behavior-inline',
            'overscroll-behavior-block',
            'clip',
            'clip-path',
            'clear',
          ],
        },
        {
          // Typography.
          properties: [
            'font',
            'font-family',
            'font-size',
            'font-style',
            'font-weight',
            'font-feature-settings',
            'font-kerning',
            'font-variant',
            'font-variant-ligatures',
            'font-variant-caps',
            'font-variant-alternates',
            'font-variant-numeric',
            'font-variant-east-asian',
            'font-variant-position',
            'font-size-adjust',
            'font-stretch',
            'font-effect',
            'font-emphasize',
            'font-emphasize-position',
            'font-emphasize-style',
            '-webkit-font-smoothing',
            '-moz-osx-font-smoothing',
            'font-smooth',
            'hyphens',
            'line-height',
            'color',
            'text-align',
            'text-align-last',
            'text-emphasis',
            'text-emphasis-color',
            'text-emphasis-style',
            'text-emphasis-position',
            'text-decoration',
            'text-decoration-line',
            'text-decoration-thickness',
            'text-decoration-style',
            'text-decoration-color',
            'text-underline-position',
            'text-underline-offset',
            'text-indent',
            'text-justify',
            'text-outline',
            '-ms-text-overflow',
            'text-overflow',
            'text-overflow-ellipsis',
            'text-overflow-mode',
            'text-shadow',
            'text-transform',
            'text-wrap',
            '-webkit-text-size-adjust',
            '-ms-text-size-adjust',
            'letter-spacing',
            'word-break',
            'word-spacing',
            'word-wrap', // Legacy name for `overflow-wrap`
            'overflow-wrap',
            'tab-size',
            'white-space',
            'vertical-align',
            'list-style',
            'list-style-position',
            'list-style-type',
            'list-style-image',
          ],
        },
        {
          // Accessibility & Interactions.
          properties: [
            'pointer-events',
            '-ms-touch-action',
            'touch-action',
            'cursor',
            'visibility',
            'zoom',
            'table-layout',
            'empty-cells',
            'caption-side',
            'border-spacing',
            'border-collapse',
            'quotes',
            'counter-reset',
            'counter-increment',
            'resize',
            'user-select',
            'nav-index',
            'nav-up',
            'nav-right',
            'nav-down',
            'nav-left',
          ],
        },
        {
          // Background & Borders.
          properties: [
            'background',
            'background-color',
            'background-image',
            "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
            'filter:progid:DXImageTransform.Microsoft.gradient',
            'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader',
            'filter',
            'background-repeat',
            'background-attachment',
            'background-position',
            'background-position-x',
            'background-position-y',
            'background-clip',
            'background-origin',
            'background-size',
            'background-blend-mode',
            'isolation',
            'border',
            'border-color',
            'border-style',
            'border-width',
            'border-top',
            'border-top-color',
            'border-top-style',
            'border-top-width',
            'border-right',
            'border-right-color',
            'border-right-style',
            'border-right-width',
            'border-bottom',
            'border-bottom-color',
            'border-bottom-style',
            'border-bottom-width',
            'border-left',
            'border-left-color',
            'border-left-style',
            'border-left-width',
            'border-radius',
            'border-top-left-radius',
            'border-top-right-radius',
            'border-bottom-right-radius',
            'border-bottom-left-radius',
            'border-image',
            'border-image-source',
            'border-image-slice',
            'border-image-width',
            'border-image-outset',
            'border-image-repeat',
            'outline',
            'outline-width',
            'outline-style',
            'outline-color',
            'outline-offset',
            'box-shadow',
            'mix-blend-mode',
            'filter:progid:DXImageTransform.Microsoft.Alpha(Opacity',
            "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
            'opacity',
            '-ms-interpolation-mode',
          ],
        },
        {
          // SVG Presentation Attributes.
          properties: [
            'alignment-baseline',
            'baseline-shift',
            'dominant-baseline',
            'text-anchor',
            'word-spacing',
            'writing-mode',
  
            'fill',
            'fill-opacity',
            'fill-rule',
            'stroke',
            'stroke-dasharray',
            'stroke-dashoffset',
            'stroke-linecap',
            'stroke-linejoin',
            'stroke-miterlimit',
            'stroke-opacity',
            'stroke-width',
  
            'color-interpolation',
            'color-interpolation-filters',
            'color-profile',
            'color-rendering',
            'flood-color',
            'flood-opacity',
            'image-rendering',
            'lighting-color',
            'marker-start',
            'marker-mid',
            'marker-end',
            'mask',
            'shape-rendering',
            'stop-color',
            'stop-opacity',
          ],
        },
        {
          // Transitions & Animation.
          properties: [
            'transition',
            'transition-delay',
            'transition-timing-function',
            'transition-duration',
            'transition-property',
            'transform',
            'transform-origin',
            'animation',
            'animation-name',
            'animation-duration',
            'animation-play-state',
            'animation-timing-function',
            'animation-delay',
            'animation-iteration-count',
            'animation-direction',
          ],
        },
      ],
    },
    ignoreFiles: ['.vscode/**', 'dist/**', 'node_modules/**', 'build/**'],
  };
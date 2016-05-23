## CSS hack

常用的CSS Hack表现形式，**CSS属性前缀法**、**选择器前缀法**以及**IE条件注释法**。

1. 属性前缀法-(即类内部Hack)：

    - 例如，IE6能识别下划线`_`和星号`*`，IE7能识别星号`*`，但不能识别下划线`_`，IE6~IE10都认识`\9`，但firefox前述三个都不能认识

2. 选择器前缀法-(即选择器Hack)：
    
    - 例如，IE6能识别`*html .class{}`，IE7能识别`*+html .class{}`或者`*:first-child+html .class{}`

3. IE条件注释法-(即HTML条件注释Hack)：
    
    - 针对所有IE(注：IE10+已经不再支持条件注释)： `<!--[if IE]>`IE浏览器显示的内容 `<![endif]-->`，针对IE6及以下版本： `<!--[if lt IE 6]>`只在IE6-显示的内容 `<![endif]-->`。这类Hack不仅对CSS生效，对写在判断语句里面的所有代码都会生效。
    
    
    
## IE条件注释法

这种方式是IE浏览器专有的Hack方式，微软官方推荐使用的hack方式:

    只在IE下生效
    <!--[if IE]>
    这段文字只在IE浏览器显示
    <![endif]-->
    
    只在IE6下生效
    <!--[if IE 6]>
    这段文字只在IE6浏览器显示
    <![endif]-->
    
    只在IE6以上版本生效
    <!--[if gte IE 6]>
    这段文字只在IE6以上(包括)版本IE浏览器显示
    <![endif]-->
    
    只在IE8上不生效
    <!--[if ! IE 8]>
    这段文字在非IE8浏览器显示
    <![endif]-->
    
    非IE浏览器生效
    <!--[if !IE]>
    这段文字只在非IE浏览器显示
    <![endif]-->
    
    
    
    
## 属性前缀法
    
属性前缀法是在CSS样式属性名前加上一些只有特定浏览器才能识别的hack前缀，以达到预期的页面展现效果。




## 选择器前缀法    
    
    
## CSS Hack Table    

    
- This	-> 当前浏览器
- Y	-> 渲染
- N	-> 不渲染
- H	-> 部分版本或部分属性渲染
- B	-> 样式失效
- s	-> 选择器前缀法
- p	-> 属性前缀法
- m -> Media Query hack    

## 参考链接

1. [CSS hacks](http://www.webdevout.net/css-hacks)
2. [CSS big list of css hacks](http://mynthon.net/howto/-/webdev/CSS-big-list-of-css-hacks.txt)
3. [CSS Hack Table](http://swordair.com/tools/css-hack-table/)

**http://blog.csdn.net/freshlover/article/details/12132801**
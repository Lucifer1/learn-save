1. canvas 1px模糊的问题
   1. canvas的每条线都有一条无限细的“中线”，线条的宽度是从中线向两侧延伸的。如果我们还是从第2个像素点画一条线，那么线条的中线就会靠齐到第2个像素的起点，然后我们开始画了，问题也就来了：Canvas 的线条以中线向两侧延伸，而不是向某一边延伸(比如这里，如果只是往右侧延伸，那么我们的问题就不再是问题了)，延伸过后我们的线条实际上是这样的：
   ![canvas_1](./img/canvas_1.png)
   计算机不允许出现小于1px的图形，所以他做了一个折中的事：把这两个像素都绘制了。
   所以，如此一来，本来1px的线条，就成了看起来2px宽的线条。
   所以，该问题的原因：Canvas中的line把中线与像素的起点对齐了，而不是像素的中间点。
   解决方法：让线条的中线和像素的中间点对齐。像素的中间点很好找，比如第2像素的中间点，依据图上的解释就是1.5像素的位置，那么x像素的中间点就是(x-0.5)px。
   ![canvas_2](./img/canvas_2.png)

2. beginPath()
   1. 如果没有使用beginPath()这个方法，那么canvas的绘制方法，如stroke等，会把其那边所有的图形都重新画一遍，例如：

        ```
        var ctx  = document. getElementById ( 'cvs' ). getContext ( '2d' ) ;
        ctx. beginPath ( ) ;
        ctx. moveTo ( 100.5 , 20.5 ) ;
        ctx. lineTo ( 200.5 , 20.5 ) ;
        ctx. stroke ( ) ;
        // ctx. beginPath ( ) ;
        ctx. moveTo ( 100.5 , 40.5 ) ;
        ctx. lineTo ( 200.5 , 40.5 )
        ctx. strokeStyle  =  '#f00' ;
        ctx. stroke ( ) ;
        ```
      这里，第一个stroke画一条黑线，第二个stroke绘制两条红线，所以最终的呈现结果就是两条红线而不是一红一黑

3. 直接使用canvas.toDataURL()指令，图片模糊的问题
    1.  原因：这个方法可以在0-1范围内选择图片质量，默认为0.92
    2.  解决方法：
        1.  将第二个参数设置为1，级canvas.toDataURL('image/png', 1)
        2.  画一个很大的图，然后缩小
[![npm](https://img.shields.io/npm/v/nativescript-extendedinfo.svg)](https://www.npmjs.com/package/nativescript-extendedinfo)
[![npm](https://img.shields.io/npm/dt/nativescript-extendedinfo.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-extendedinfo)
[![GitHub forks](https://img.shields.io/github/forks/Akylas/nativescript-extendedinfo.svg)](https://github.com/Akylas/nativescript-extendedinfo/network)
[![GitHub stars](https://img.shields.io/github/stars/Akylas/nativescript-extendedinfo.svg)](https://github.com/Akylas/nativescript-extendedinfo/stargazers)

## Installation

* `tns plugin add nativescript-extendedinfo`

Be sure to run a new build after adding plugins to avoid any issues.

---


### Usage

The nativescript Canvas is based on the [Android Canvas](https://developer.android.com/reference/android/graphics/Canvas) class.
The android API is actually a direct subclass with some Additions

## Plain NativeScript

<span style="color:red">IMPORTANT: </span>_Make sure you include `xmlns:mdc="nativescript-extendedinfo"` on the Page element_

### XML

```XML
<Page xmlns:cv="nativescript-extendedinfo">
    <StackLayout horizontalAlignment="center">
        <cv:CanvasView width="100" height="100" draw="draw"/>
   </StackLayout>
</Page>
```

## NativeScript + Angular

```typescript
import { registerElement } from 'nativescript-angular/element-registry';
import { CanvasView } from 'nativescript-extendedinfo';
registerElement('CanvasView', () => CanvasView);
```

```html
<CanvasView width="100" height="100" (draw)="draw($event)></CanvasView>
```

## NativeScript + Vue

```javascript
import Vue from 'nativescript-vue';
import CardViewPlugin from 'nativescript-extendedinfo/vue';

Vue.use(CardViewPlugin);
```

```html
<CanvasView  width="100" height="100" @draw="draw"/>
```

##draw Method 
```typescript
function draw(event: { canvas: Canvas }) {
    const paint = new Paint();
    paint.setColor(new Color('black'));
    paint.strokeWidth = 10;
    canvas.drawRect(createRect(0, 0, 200, 100), paint);
}
```


## Description
Simple example to implement easily images rendered with webgl. You just need to create a canvas, set its width and height with css, and the images will get the same dimensions


## Installation
```sh
npm i
```

## Run
```sh
gulp
```

## Usage

### HTML
```html
    <div data-module-distortion data-distortion-texture="/assets/images/image-1.jpg" data-distortion-displacement="/assets/images/radial-displacement.jpg" class="c-distortion" data-distortion-factor="1" data-distortion-gap="20">
        <canvas data-distortion="canvas"></canvas>
    </div>
```

### CSS
```css
    .c-distortion {
        width: 500px; //Can be in %, vw etc..
        height: 390px;
    }
```

## Options

| Attribute | Values | Description |
| --------- | ------ | ----------- |
| `data-distortion-texture` | url | Image you want to display |
| `data-distortion-displacement` | url | Texture you want for a displacement (example: linear or radial gradient, The brighter the pixel, the more the z-axis is affected) |
| `data-distortion-factor` | integer | Value to manage the intensity of the displacement |
| `data-distortion-gap` | integer | % of the canvas width to have a gap. Prevent an `overflow: hidden` style and allow to see the effect on the borders|


## Examples
### Radial displacement texture
![](https://raw.githubusercontent.com//locomotivemtl/webgl-images/master/www/assets/images/radial-displacement.jpg)

### Axis
![](https://raw.githubusercontent.com//locomotivemtl/webgl-images/master/docs/axis.jpg)

### Displacement Position 0,0
![](https://raw.githubusercontent.com//locomotivemtl/webgl-images/master/docs/positionExample.jpg)


## Dependencies

[Locomotive Boilerplate](https://github.com/locomotivemtl/locomotive-boilerplate)
[Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll)

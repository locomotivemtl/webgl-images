<p align="center">
    <a href="https://github.com/locomotivemtl/locomotive-boilerplate">
        <img src="https://user-images.githubusercontent.com/4596862/54868065-c2aea200-4d5e-11e9-9ce3-e0013c15f48c.png" height="140">
    </a>
</p>
<h1 align="center">Locomotive Distortion Example</h1>
<p align="center">Front-end images rendered with webgl for distortion effect</p>

## Description
Simple examples to implement easily images rendered with webgl. You just need to create a canvas, set its width and height with css, and the images will get the same dimensions


## Installation
```sh
npm i
```

## Usage

### HTML
```html
    <div data-module-distortion data-distortion-texture="/assets/images/image-1.jpg" data-distortion-displacement="/assets/images/radial-displacement.jpg" class="c-distortion" data-distortion-factor="1" data-distortion-gap="20">
        <canvas data-distortion="canvas"></canvas>
    </div>
```

### Javascript
```scss
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

## Dependencies

[Locomotive Boilerplate](https://github.com/locomotivemtl/locomotive-boilerplate)
[Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll)

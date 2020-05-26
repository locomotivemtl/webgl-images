
## Description
Simple example to implement easily images rendered with webgl. You just need to create a wrap, set its width and height with css, and the images will get the same dimensions.


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
    <div data-module-gl-image data-gl-image-texture="/assets/images/image-1.jpg" data-gl-image-displacement="/assets/images/radial-displacement.jpg" class="c-gl-image" data-gl-image-factor="1" data-gl-image-gap="20">
        <div class="c-gl-image_wrap" data-gl-image="wrap"></div>
    </div>
```

### CSS
```css
    .c-gl-image {
        width: 500px; //Can be in %, vw etc..
        height: 390px;
    }
```

## Options

| Attribute | Values | Description |
| --------- | ------ | ----------- |
| `data-gl-image-texture` | url | Image you want to display |
| `data-gl-image-displacement` | url | Texture you want for a displacement (example: linear or radial gradient, The brighter the pixel, the more the z-axis is affected) |
| `data-gl-image-factor` | integer | Value to manage the intensity of the displacement |
| `data-gl-image-gap` | integer | % of the canvas width to have a gap. Prevent an `overflow: hidden` style and allow to see the effect on the borders|


## Examples
### Radial displacement texture
![](https://raw.githubusercontent.com//locomotivemtl/webgl-images/master/www/assets/images/radial-displacement.jpg)

### Axis
![](https://raw.githubusercontent.com//locomotivemtl/webgl-images/master/docs/axis.jpg)

### Displacement Position 0,0
![](https://raw.githubusercontent.com//locomotivemtl/webgl-images/master/docs/positionExample.jpg)


## Dependencies

- [OGL](https://github.com/oframe/ogl/)
- [Locomotive Boilerplate](https://github.com/locomotivemtl/locomotive-boilerplate)
- [Locomotive Scroll](https://github.com/locomotivemtl/locomotive-scroll)

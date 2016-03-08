<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Afrostream Player](#afrostream-player)
  - [Getting Started](#getting-started)
  - [Documentation](#documentation)
    - [Plugin Options](#plugin-options)
      - [option](#option)
  - [Release History](#release-history)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Afrostream Player

Player afrostream

## Getting Started

Once you've added the plugin script to your page, you can use it with any video:

```html
<script src="video.js"></script>
<script src="afrostream-player.js"></script>
<script>
  videojs(document.querySelector('video')).afrostreamPlayer();
</script>
```

There's also a [working example](example.html) of the plugin you can check out if you're having trouble.

## Documentation
### Plugin Options

You may pass in an options object to the plugin upon initialization. This
object may contain any of the following properties:

#### option
Type: `boolean`
Default: true

An example boolean option that has no effect.

## Release History

 - 0.1.0: Initial release

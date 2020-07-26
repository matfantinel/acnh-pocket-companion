#!/bin/bash
echo "Resizing all icons based on the 512x512 one..."

echo "Resizing to 384"
convert icon-512x512.png -resize 384x384\> icon-384x384.png

echo "Resizing to 192"
convert icon-512x512.png -resize 192x192\> icon-192x192.png

echo "Resizing to 152"
convert icon-512x512.png -resize 152x152\> icon-152x152.png

echo "Resizing to 144"
convert icon-512x512.png -resize 144x144\> icon-144x144.png

echo "Resizing to 128"
convert icon-512x512.png -resize 128x128\> icon-128x128.png

echo "Resizing to 96"
convert icon-512x512.png -resize 96x96\> icon-96x96.png

echo "Resizing to 72"
convert icon-512x512.png -resize 72x72\> icon-72x72.png


echo "Resizing to touch-icon-ipad"
convert icon-512x512.png -resize 152x152\> touch-icon-ipad.png

echo "Resizing to touch-icon-ipad-retina"
convert icon-512x512.png -resize 167x167\> touch-icon-ipad-retina.png

echo "Resizing to touch-icon-iphone"
convert icon-512x512.png -resize 256x256\> touch-icon-iphone.png

echo "Resizing to touch-icon-iphone-retina"
convert icon-512x512.png -resize 180x180\> touch-icon-iphone-retina.png


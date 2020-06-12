yarn build
rm -R /mnt/e/oldcoustier/rotateimage
cp -r build/. /mnt/e/oldcoustier/rotateimage
rm /mnt/e/oldcoustier/rotateimage/static/js/*.map
rm /mnt/e/oldcoustier/rotateimage/static/css/*.map

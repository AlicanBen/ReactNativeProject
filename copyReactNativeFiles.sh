#!/bin/bash
echo "Copying View Manager Files";
cp "app-dependencies/react-native-safe-area-view-fix/index.js" "node_modules/react-native-safe-area-view/";
cp "app-dependencies/react-router-types-fix/index.d.ts" "node_modules/@types/history";
echo "";
echo "Copied!";

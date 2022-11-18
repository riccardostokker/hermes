#!/bin/bash

WORKDIR=$(dirname "$1")
PACKAGES=('core' 'vue' 'playground')

cd "$WORKDIR" || exit

# Build all the specified packages
for i in "${PACKAGES[@]}"
do
   :
echo "Starting watcher for $i package..."
pushd "packages/$i" > /dev/null || exit
(pnpm watch || echo "Watcher for $i package failed.") &
popd > /dev/null || exit
done


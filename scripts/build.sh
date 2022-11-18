#!/bin/bash

WORKDIR=$(dirname "$1")
PACKAGES=('core' 'vue')

cd "$WORKDIR" || exit

# Build all the specified packages
for i in "${PACKAGES[@]}"
do
   :
echo "Building $i package."
pushd "packages/$i" > /dev/null || exit
pnpm build > /dev/null &&
echo "Package $i successfully built."
popd > /dev/null || exit
done

#! /usr/bin/env bash

# shellcheck disable=SC2164
# Ensure we're in the repo root
cd "$( cd "$( dirname "$(realpath -m "${BASH_SOURCE[0]}")" )" && pwd )/..";

for typ in iterable iterable/operators asynciterable asynciterable/operators; do
    mkdir -p "integration/src/${typ}";
    mapfile -t ary < <(node -p "Object.keys(require('./targets/ix/${typ}')).filter(k => k.charAt(0) === k.charAt(0).toLowerCase()).join('\n')");
    for fun in "${ary[@]}"; do
        cat << EOF > "integration/src/${typ}/${fun}.js"
import { ${fun} } from 'ix/${typ}';
console.log(${fun});
EOF
    done
done

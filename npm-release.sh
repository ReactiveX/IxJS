#! /usr/bin/env bash

set -x;

bump=${1:?missing required semantic-version bump. usage: \`$0 major|minor|patch\`}
echo "semantic-version bump: $bump"

cp {,_}package.json
npm --no-git-tag-version version "$bump" &>/dev/null
npx conventional-changelog -i CHANGELOG.md -s -p angular

npm run --silent lint
npm run --silent build
npm run --silent test
npx lerna version \
    --yes --force-publish=* \
    --no-push --no-git-tag-version \
    "$bump"

git add CHANGELOG.md lerna.json
git commit -m "docs(CHANGELOG): $(npx --yes json -f package.json version)" -n
mv -f {_,}package.json
npm version "$bump" -m "chore(release): %s"
git push --follow-tags
npx conventional-github-releaser -p angular

read -p "Please enter your npm 2FA one-time password: " NPM_OTP </dev/tty

npx lerna exec --concurrency 1 --no-bail -- npm publish --otp="$NPM_OTP"

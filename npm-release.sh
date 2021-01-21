bump=${1:?missing required semantic-version bump. usage: \`$0 major|minor|patch\`}
echo "semantic-version bump: $bump"

npx run-s --silent lint build test
npx lerna version \
    --yes --force-publish=* \
    --no-push --no-git-tag-version \
    $bump

cp package.json _package.json
npm --no-git-tag-version version $bump &>/dev/null
npx conventional-changelog -i CHANGELOG.md -s -p angular
git add CHANGELOG.md lerna.json && version=$(npx json -f package.json version)
git commit -m "docs(CHANGELOG): $version" -n
mv -f _package.json package.json
npm version $bump -m "chore(release): %s"
git push --follow-tags
npx conventional-github-releaser -p angular

read -p "Please enter your npm 2FA one-time password: " NPM_OTP </dev/tty

npx lerna exec --no-bail -- npm publish --otp=$NPM_OTP

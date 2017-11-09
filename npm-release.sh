preset=$(conventional-commits-detector) && echo "conventional-commits preset: $preset"
bump=${1:-$(conventional-recommended-bump -p $preset)} && echo "semantic-version bump: $bump"

run-s --silent lint build test
lerna publish --yes --skip-git --cd-version $bump --force-publish=*

cp package.json _package.json
npm --no-git-tag-version version $bump &>/dev/null
conventional-changelog -i CHANGELOG.md -s -p $preset
git add CHANGELOG.md lerna.json && version=$(json -f package.json version)
git commit -m "docs(CHANGELOG): $version" -n
mv -f _package.json package.json
npm version $bump -m "chore(release): %s"
git push --follow-tags
conventional-github-releaser -p $preset

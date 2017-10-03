cp package.json _package.json
preset=$(conventional-commits-detector) && echo "conventional-commits preset: $preset"
bump=${1:-$(conventional-recommended-bump -p $preset)} && echo "semantic-version bump: $bump"
npm --no-git-tag-version version $bump &>/dev/null
conventional-changelog -i CHANGELOG.md -s -p $preset
run-s --silent lint build test doc
git add CHANGELOG.md && version=$(json -f package.json version)
git commit -m "docs(CHANGELOG): $version"
mv -f _package.json package.json
npm version $bump -m "chore(release): %s"
git push --follow-tags
conventional-github-releaser -p $preset
lerna publish --yes --skip-git --cd-version $bump --force-publish=*

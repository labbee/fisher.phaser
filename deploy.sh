set -e
set NODE_ENV=production
npm run build
cd dist
git init
git add .
git commit -m 'Auto deploy to github-pages'
git push -f git@github.com:labbee/fisher.phaser.git master:gh-pages
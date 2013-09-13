grunt build
git checkout gh-pages
git pull
rm -rf `ls | egrep -v '(dist|node_modules)'`
cp -R dist/* .
git add -A
git commit
git push
git checkout master

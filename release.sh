grunt build
git checkout gh-pages
rm -rf `ls | egrep -v '(dist|node_modules)'`
mv dist/* .
git add -A
git commit
git checkout master
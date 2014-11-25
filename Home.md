## Design notes

[Design diagrams](https://drive.google.com/folderview?id=0B9rpPoIDv3vTNlZxOVp6a2tNa1E&usp=sharing)


## Publishing a release

    git log `git describe --tags --abbrev=0 web-animations-js/master`..web-animations-next/master --pretty=format:"  * %s"

## Pushing from web-animations-next to web-animations-js

    git fetch web-animations-next
    git fetch web-animations-js
    git checkout web-animations-js/master
    git merge web-animations-next/master --no-edit --quiet
    npm install
    grunt
    git add -f *.min.js* &&
    git commit -m 'Add build artifacts from '`cat .git/refs/remotes/web-animations-next/master`
    git push web-animations-js HEAD:refs/heads/master
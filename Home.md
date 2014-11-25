## Design notes

[Design diagrams](https://drive.google.com/folderview?id=0B9rpPoIDv3vTNlZxOVp6a2tNa1E&usp=sharing)


## Publishing a release

1.  Determine the version number for the release

    * Increment the first number and reset others to 0 when there are large breaking changes
    * Increment the second number and reset the third to 0 when there are significant new, but backwards compatible features
    * Otherwise, increment the third number

2.  Add versioned release notes to History.md, for example:

        ### 3.13.37 — *November 1, 2001*

          * Fixed a bug where nothing worked

    Use the following to generate a summary of commits, but edit the list to contain only
    relevant information.

        git log `git describe --tags --abbrev=0 web-animations-js/master`..web-animations-next/master --pretty=format:"  * %s"

3.  Commit the History.md change, and push to web-animations-js

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
## Developer setup instructions

1. `git clone git@github.com:web-animations/web-animations-next.git`
1. Install [node](https://nodejs.org/en/) and make sure `npm` is in your $PATH
1. Run `npm install` in the respository to pull in development dependencies.
1. Run `npm install -g grunt grunt-cli` to get the build tools for the command line.
1. Run `grunt` to build the polyfill.
1. Run `grunt test` to run polyfill tests using the build.


## Design notes

[Design diagrams](https://drive.google.com/folderview?id=0B9rpPoIDv3vTNlZxOVp6a2tNa1E&usp=sharing)


## Publishing a release

1.  Determine the version number for the release

    * Increment the first number and reset others to 0 when there are large breaking changes
    * Increment the second number and reset the third to 0 when there are significant new, but backwards compatible features
    * Otherwise, increment the third number

2.  Add versioned release notes to `History.md`, for example:

        ### 3.13.37 — *November 1, 2001*

          * Fixed a bug where nothing worked

    Use the following to generate a summary of commits, but edit the list to contain only
    relevant information.

        git log `git describe --tags --abbrev=0 web-animations-js/master`..web-animations-next/master --pretty=format:"  * %s"

3.  Specify the new version inside `package.json` (for NPM), for example:

    ```js
      "version": "3.13.37",
    ```

4.  Submit both changes to web-animations-next then follow the procedure to push from web-animations-next to web-animations-js.

5.  Draft a [new release](https://github.com/web-animations/web-animations-js/releases) at the
    commit pushed to web-animations-js in step #4. Copy the release notes from `History.md`
    added in step #2.

6. Once you've pushed to web-animations-js, run `npm publish` from that checked-out folder

   To do this, you'll need to be a collaborator [on the NPM project](https://www.npmjs.com/package/web-animations-js), or have a collaborator help you.

7. If there are any breaking changes to the API in this release you must notify web-animations-changes@googlegroups.com.

   Only owners of the group may post to it so you may need to request ownership or ask someone to post it for you.

## Pushing from web-animations-next to web-animations-js

    git fetch web-animations-next
    git fetch web-animations-js
    git checkout web-animations-js/master
    git merge web-animations-next/master --no-edit --quiet
    npm install
    grunt
    git add -f *.min.js*
    git rm .gitignore
    git commit -m 'Add build artifacts from '`cat .git/refs/remotes/web-animations-next/master`
    git push web-animations-js HEAD:refs/heads/master
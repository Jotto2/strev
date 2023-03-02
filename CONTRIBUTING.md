# CONTRIBUTING
 Instructions for contributing to **Strev**.
 
 
### Issues
Each sprint is made up by smaller issues. Issues should contain a description with a checklist of specific goals. After these goals are completed, and the branch is merged, the issue can be closed.

### Branches 
***main*** is only used at the end of each sprint and is protected for this reason. We use ***dev*** for any merges during the sprint. This way ***main*** is always functional and we avoid any mistakes affecting our functional code. New branches are created from issues and they are therefore named accordingly with a number and then a name. Several branches may reference the same issue and therefore contain the same issue number.

Ex.: `1-homepage`

### Merging
Merging is done by creating a merge request and assigning a team member as reviewer. After the review and any conflicts are resolved, the branches can be merged and the merge request closed.


### Commits
Commits start with `#<IssueID>` then followed by a tag:
 - `feat` for new features or functionality
 - `fix` for bugfixes or maintenance
 - `style` for style/CSS
 - `docs` for documentation
 - `refactor` for restructuring of code or files
 - `test` for additions or changes to tests
 - `build` for build related changes
 - `chore` for commits that do not fit any other tag
 
Ex.: `feat (#12): adds a getter`

For co-authored commits add:
Co-Authored-By: [name] <[email]>
to the body of your commit message.

Structure React components:
 - "const foo = (props) => { ..."
 - States (UseState)
 - Handlers/Support functions (SetState functions)
 - UseEffects
 - "... return ..."


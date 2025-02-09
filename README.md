# vfxTdUtils - Visual-Effects Technical-Director Utilities

Beyond the other [repositories](https://github.com/jrowellfx)
provided by me, James Rowell,
this git-repository provides
further
utilities for VFX "Technical Directors"

### Some backstory.

In the early days, VFX-artists were often given the title of
"Technical Director", whether lighting, compositing,
rigging characters, creating particle-simulations, render-wrangling, etc.,
or most likely all of the above.

The reason we called ourselves TDs was that we did much of
our work via scripts, in tcsh or bash or with makefiles,
or using custom scripts that drove the plethora of home-brewed tools at the studio.
We lived on the command-line, making extensive use of the Unix environment.
We capitalized on the
[Unix philosopy](https://en.wikipedia.org/wiki/Unix_philosophy)
in our approach to building our shots and "pipelines".
It was a technical process that required us to be a bit of a programmer,
thus the title "Technical Director".

Even with our powerful GUI-based tools today
I still find it helpful (in my work as a VFX-Supervisor and artist)
to work in the command-line with old-school TD-utilties and practices.
This is doubly so working at smaller studios that can't afford pricey
and comprehensive "Pipeline" tools like Autodesk's
"[Flow Production Tracking](https://www.autodesk.com/products/flow-production-tracking)"
software.

I hope independent VFX-artists, likely also working without the help of
monolithic pipeline tools,
will find my thoughts and utilties to be helpful as building-blocks
for their own pipelines, joining the ranks of us O.G. Technical-Directors.

## Summary of the utilities in `vfxTdUtils`.

`runsed` - an unbelievably useful wrapper-utility for `sed` that been in heavy
use for 30+ years to batch run sed-scripts on files. Quite robust! Easy to back out changes!

> _"I think I hold the record for the most number of file-checkout, changes and commits
on the AutoCAD code base when I was working on R13. I renamed almost ALL the API calls
(to have nice and consistent naming convention across the WHOLE API
which I designed to make reading code flow like reading prose)
and similarly for many internal function calls in the newly designed C++ libraries and modules.
In large part that work I did was possible simply because I wrote and used `runsed`." ~~ James Rowell_

`rm-spaces` - a utility to remove spaces from filenames while maintaining filename readability.

`time-stamp` - prints out a string suitable for a time-stamp as `YYMMDD-hhmmss` say to
embed in a file-name. Several options to customize the output as typically needed
when embedding the time-stamp in a file-name or directory-name.

`tabs2spaces/spaces2tabs` - wrappers for the commands `expand` and `unexpand`
    respectively.  The FILES are changed in place, and like `runsed` the changes
    can be easily reviewed and backed out if desired.

`mod-tstamp` - adds or subtracts hours from a file's time-stamp which used to be
    useful when copying files across timezones. Possibly less
    useful these days due to decent system-level timezone support.

### The most essential VFX-TD-Utils are in [`jrowellfx`](https://github.com/jrowellfx)'s other repos.

Please install the following tools as well, they are 
essential when TD'ing shots
from the command line, you will use them daily!
I dare say, without `lsseq` (or something like
it that existed at every major studio) it would be extremely tough to TD shots
from the command-line without GUI support like you see with modern Pipeline tools like
Autodesk's
"[`Flow Production Tracking`](https://www.autodesk.com/products/flow-production-tracking)"
software.

- [`lsseq`](https://github.com/jrowellfx/lsseq) - An extremely powerful, feature-rich and robust tool
akin to `/bin/ls` for listing image-sequences in a nice way. **Essential**!
- [`renumseq`](https://github.com/jrowellfx/renumSeq) - Command line utility to renumber
and/or rename image-sequences. An valuable companion to `lsseq`.
- [`expandseq`/`condenseseq`](https://github.com/jrowellfx/expandSeq) - utilities for
expanding and condensing integer-sequences using a simple frame-range-syntax
widely used within the VFX-industry.

Other ***essential*** TD tools don't need to be installed, just mastered. Namely:

- `grep`, `fgrep`
- `find`
- `sort`
- `cat`
- use of back-quotes to echo command output onto the command line,  
  for example: ``touch myfile.`time-stamp --short` `` might create the file: `myfile.250207`
- regular-expressions (as used by `sed`).
- At least be a little familiar with `bash` shell scripting.
- `vi`
- `git`
- Use of file redirection like "`<`" and "`>`" and pipes "`|`".

## More detailed descriptions of the utilities in `vfxTdUtils`.

### About runsed

`runsed` is an unbelievably useful script that been in heavy use for 30+ years
to batch run sed-scripts on files. Quite robust! Easy to back out changes!

`runsed` is a wrapper for the command "`sed -f sed.script [FILE]...`".

`runsed` runs a script-file called `sed.script` (that must exist in the current directory)
with [`sed`](https://man7.org/linux/man-pages/man1/sed.1p.html)
on each `FILE` listed on the command line.

  `runsed` changes the files in place,
that is, it replaces the existing `FILE` with a stream-edited copy of itself.

A backup copy of each original `FILE` is created called "`.FILE.runsed`" in the directory
that `FILE` resides.

Two special files are also created in the current directory to allow you
to review all the changes made as well as undo the changes if the results
weren't what you expected.  Namely, the files "`.runsed.diff.runsed`" and
"`.runsed.undo.runsed`" which are executable.

When you are eventually satisfied simply remove all files called "`.*.runsed`"
with the command:

```
    rm .*.runsed
```

If you changed files in subdirectories, this is a better way to get rid
of all the crufty leftovers, plus it handles files with spaces in
their names properly:

```
    find . -name '.*.runsed' -type f -print0 | xargs -0 /bin/rm -f
```

Ultimately it's up to you to clean up the crufty leftover files.

```
Usage: runsed [-h | --help | --version] [FILE]...

optional arguments:

 -h, --help      show the help and exit
 --version       print out the version number and exit
```


### About rm-spaces

```
$ ./rm-spaces -h

usage: rm-spaces [-h | --help] [OPTIONS]

rm-spaces is a util to help remove spaces from filenames. rm-spaces operates on files
in the current working directory (and/or below).

Options:
 -h, --help           display this help and exit
 -r, --recursive      remove spaces from filenames from the current working
                        directory and down into subdirectories (not default)
 -d, --directories    only remove spaces from directory names
 -f, --regular-files  only remove spaces from regular files (and links)
 -x, --execute        make the changes on the fly
 -q, --remove-quotes  also strip '`?"[](){} characters.
 -c, --camel-case     converts words to camel case when possible (not default).
 --dates              replaces spaces before or after dates (eg 2023-03-27) with
                        underscores. (default)
 --noDates            don't try to match dates in filenames as in --dates.
 --version            print out the version number and exit

rm-spaces takes spaces out of filenames while maintaining filename readability.
It removes trailing and leading spaces, removes spaces after or before dots (.),
pluses (+) etc.

rm-spaces then replaces all spaces with underscores (_) unless --camel-case is
specified, in which case words are converted to 'camel case" unless readability
would suffer.

rm-spaces creates the following executable files in the current working directory:

 - .rename.files.rm-spaces
     Run this to rename regular files (must run before directories below).
     (not necessary with -x option).
 - .undo.files.rm-spaces
     Run this to undo the above changes
 - .failed.files.rm-spaces
     List of renames that would have failed due to name conflict
     (hand edit to taste then run it).

 - .rename.dirs.rm-spaces
     Run this to rename directories (must run after changing names on regular files
     with the .rename.files.rm-spaces script).  (not necessary with -x option).
 - .undo.dirs.rm-spaces
     Run this to undo the above changes
 - .failed.dirs.rm-spaces
     List of renames that would have failed due to name conflict
     (hand edit to taste then run it).
```

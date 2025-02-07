# vfxTdUtils - Visual Effects Technical Director Utilities

Here are some useful utilities for VFX "Technical Directors".

The early days of the VFX world all VFX artists were called
"Technical Directors", whether you were lighting, compositing
rigging characters, running and rendering simulations,
or most likely all of the above.

The reason we called ourselves TDs was because we did most of
our work via a shell, like tcsh, bash, and makefiles, plus the 
plethora of home-brewed tools at whatever studio you happened to work at.
A lot of how we generated images was through programming via scripts of various sorts.
It was quite "Technical" so you kind of had to be a bit of a programmer
thus the title "Technical Director".

The "Pipeline" were all the tools we used via the command line
to get shots put together. I expect the term "Pipeline" that we use
these days is borrowed from
Unix "pipes" that is the "|" character which is used to string
the output of one command into the input of the next.

### The Utils

`tstamp` - prints out a string suitable for a time stamp as `YYMMDD-hhmmss`.

`mod-tstamp` - adds or subtracts hours from a file's timestamp, which used to be
    useful when copying files across timezones, but possibly less
    useful these days.

`tabs2spaces/spaces2tabs` - is a wrapper for the commands `expand` and `unexpand`
    respectively.  The FILES are changed in place, and changes can easily
    be undone. (Note the command spaces2tabs can be a hard link to tabs2spaces,
    the functionality of the command switches based on the name.)

```
<Note, more utils coming.

 This repo is WIP as I'm folding the rmSpaces & runsed repo
 into this one, plus rewriting the method used to install from
 the tarballs, via make etc.>
```

# utils
Some useful utilities.

`tstamp` - prints out a string suitable for a time stamp as `YYMMDD-hhmmss`.

`mod-tstamp` - adds or subtracts hours from a file's timestamp, which used to be
    useful when copying files across timezones, but possibly less
    useful these days.

`tabs2spaces/spaces2tabs` - is a wrapper for the commands `expand` and `unexpand`
    respectively.  The FILES are changed in place, and changes can easily
    be undone. (Note the command spaces2tabs can be a hard link to tabs2spaces,
    the functionality of the command switches based on the name.)


# utils
Some useful utilities.

`ts` - prints out a string suitable for a time stamp as `YYMMDD-hhmmss`.

`modtstamp` - adds or subtracts hours from a files timestamp, used to be
    useful when copying files across timezones, but possibly less
    useful these days.

`tabs2spaces/spaces2tabs` - is a wrapper for the commands `expand` and `unexpand`
    respectively.  The FILES are changed in place, and changes can easily
    be undone.

### Installation

Download the latest tarball (in the dist directory) and unzip it. For example:

$ tar -xvzf utils-2.000.tar.gz
utils-2.000/
utils-2.000/PKG-INFO
utils-2.000/README.md
utils-2.000/modtstamp
utils-2.000/setup.py
utils-2.000/spaces2tabs
utils-2.000/tabs2spaces
utils-2.000/ts

If you are not superuser then copy the commands to your ~/bin.

If you want to install system wide then

$ su -
# python3 setup.py install

And the commands will be installed in /usr/local/bin

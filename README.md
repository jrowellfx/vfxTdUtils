# utils
Some useful utilities.

`ts` - prints out a string suitable for a time stamp as `YYMMDD-hhmmss`.

`modtstamp` - adds or subtracts hours from a file's timestamp, which used to be
    useful when copying files across timezones, but possibly less
    useful these days.

`tabs2spaces/spaces2tabs` - is a wrapper for the commands `expand` and `unexpand`
    respectively.  The FILES are changed in place, and changes can easily
    be undone.

### Installation

Download the latest tarball (from the dist directory) and unzip it. For example:

```
$ tar -xvzf utils-2.0.0.tar.gz
utils-2.0.0/
utils-2.0.0/PKG-INFO
utils-2.0.0/README.md
utils-2.0.0/modtstamp
utils-2.0.0/setup.py
utils-2.0.0/spaces2tabs
utils-2.0.0/tabs2spaces
utils-2.0.0/ts
```

If you are not superuser then just copy the commands (`ts`, `spaces2tabs`, `tabs2spaces` and `modtstamp`) to your `~/bin`.

If you want to install system wide then

```
$ su -
# cd utils-2.0.0
# python3 setup.py install
```

And the commands will be installed in `/usr/local/bin`

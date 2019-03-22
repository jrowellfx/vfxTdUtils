#!/usr/bin/python2.7

from distutils.core import setup
import os
import shutil

createdSpaces2Tabs = False
if not os.path.exists('spaces2tabs') :
    shutil.copy2('tabs2spaces', 'spaces2tabs')
    createdSpaces2Tabs = True

setup(name='utils',
      version='1.000',
      description='Some usefil shell utilities.',
      long_description='',
      author='James Philip Rowell',
      author_email='james@alpha-eleven.com',
      url='http://www.alpha-eleven.com',
      py_modules=[],
      scripts=['tabs2spaces', 'spaces2tabs', 'tstamp'],
      license = "BSD 3-Clause license",
     )

if createdSpaces2Tabs :
    os.remove('spaces2tabs')


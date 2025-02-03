#!/usr/bin/env python3

from distutils.core import setup
import os
import shutil

createdSpaces2Tabs = False
if not os.path.exists('spaces2tabs') :
    shutil.copy2('tabs2spaces', 'spaces2tabs')
    createdSpaces2Tabs = True

setup(name='utils',
      version='2.000',
      description='Some useful shell utilities.',
      long_description='',
      author='James Philip Rowell',
      author_email='james@alpha-eleven.com',
      url='http://www.alpha-eleven.com',
      py_modules=[],
      scripts=['tabs2spaces', 'spaces2tabs', 'modtstamp', 'ts'],
      license = "BSD 3-Clause license",
     )

if createdSpaces2Tabs :
    os.remove('spaces2tabs')


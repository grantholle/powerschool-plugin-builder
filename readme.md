# PowerSchool Plugin Builder 💩

> I found building a zip file that PowerSchool would accept to be an unnecessarily laborious venture, so I made this.

## Install

```
$ npm i -g powerschool-plugin-builder
```

You should now have the `pspb` command.

## Usage

```
$ pspb -h

  Usage: pspb [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -s, --source [path]  The path to the plugin directory. If none is given, assumes your current working directory.
    -o, --output [path]  The path to the output directory. If none is given, assumes your current working directory.
    -i, --increment <type>  Increment the version found `plugin.xml` by release type (major, minor, patch) [patch]
    -q, --quiet          Do not log messages
```

## Example

With [a bunch of] logging:

```
$ pspb -s plugin/ -o /path/to/output/
info:    Starting zip of /Users/user/plugin
info:    Copied source directory to temporary directory
info:    Cleaned .DS_Store from temporary directory
info:    Cleaned .git from temporary directory
info:    Finished sanitizing temporary directory
info:    Added entry ...
info:    ...
info:    ...
info:    ...
info:    ...
info:    Zip file created at /path/to/output/plugin.zip
info:    Removed temporary directory
info:    Build finished!
```

With no logging:

```
$ pspb -s plugin/ -o /path/to/output -q
```

## Licence

Copyright 2017-2018 Grant Holle

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
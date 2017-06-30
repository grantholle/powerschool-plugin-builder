# PowerSchool Plugin Builder 💩

I found building a zip file that PowerSchool would accept to be an unnecessarily laborious venture, so I made this.

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
    -i, --increment <type>  Increment the version found `plugin.xml` by release type (major, minor, path) [patch]
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

MIT

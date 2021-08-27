# PowerSchool Plugin Builder

Build a PowerSchool plugin zip file fast and easy with a cli.

## Sponsor

[<img src="https://www.archboard.io/assets/images/github.png" width="420" />](https://www.archboard.io)

## Install

Due to the advent of `npx`, installation is no longer needed. If you want to install the cli globally, you can fun the following command.

```
$ npm i -g powerschool-plugin-builder
```

Using npx:

```
$ npx powerschool-plugin-builder
```

You should now have the `pspb` command. However, all references will use `npx pspb` to run commands.

## Usage

Run `npx pspb -h` to see all the options:

```
  Usage: pspb [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -s, --source [path]  The path to the plugin directory. If none is given, assumes your current working directory.
    -o, --output [path]  The path to the output directory. If none is given, assumes your current working directory.
    -i, --increment <type>  Increment the version found `plugin.xml` by release type (major, minor, patch) [patch]
    -q, --quiet          Do not log messages
```

### Example

With [a bunch of] logging:

```
$ npx pspb -s plugin/ -o /path/to/output/
info:    Starting zip of /path/to/plugin
info:    Removed existing build
info:    Version is not incrementing
info:    Copied source directory to temporary directory /path/to/temp/.temp-build
info:    Cleaned .git from temporary directory
info:    Cleaned node_modules from temporary directory
info:    Cleaned package-lock.json from temporary directory
info:    Cleaned package.json from temporary directory
info:    Cleaned readme.md from temporary directory
info:    Finished sanitizing temporary directory
info:    Added entry permissions_root/
info:    Added entry permissions_root/vendor.permission_mappings.xml
info:    Added entry plugin.xml
info:    Added entry queries_root/
...
info:    Zip file created at /path/to/output/plugin.zip
info:    Removed temporary directory /path/to/temp/.temp-build
info:    Build complete!
```

With no logging:

```
$ npx pspb -s plugin/ -o /path/to/output -q
```

## License

[MIT](LICENSE.md)
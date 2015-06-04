# oddiff
Colorized octal diff tool using the mac/unix [od](http://en.wikipedia.org/wiki/Od_(Unix)) tool and jsdiff/chalk for colorized output


<!-- HELP-BEGIN -->
# Usage

`oddiff file1 file2`

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--version]**&nbsp;&nbsp;&nbsp;: prints the version

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  **[--debug]**&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: prints extra debug info to the console

# Description

`oddiff` is a simple tool that wraps the native `od` command against both files passed in, and then applies a colorized diff output between the two results of `od`.

# Results

When the two files are identical, you will see the octal representation of the file printed in a grey text to the console.

If there are any differences they will be displayed in-line in the console output with red (removed) and green (added) to the screen.

<!-- HELP-END -->

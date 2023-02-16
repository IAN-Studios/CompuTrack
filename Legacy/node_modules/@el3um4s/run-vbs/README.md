# Node RunVbs

A simple package to run VBS scripts from NodeJs.

NPM link: [@el3um4s/run-vbs](https://www.npmjs.com/package/@el3um4s/run-vbs)

### Install and use the package

To use the package in a project:

```bash
npm i @el3um4s/run-vbs
```

and then in a file:

```ts
import { runVbs, runVbsFile } from "@el3um4s/run-vbs";

const vbs = `Wscript.Echo "hello world"`;
const result = await runVbs({ vbs });
console.log(result); // hello world

const file = "./test.vbs";
const fromFile = await runVbsFile({ vbs: file });
console.log(fromFile); // hello world
```

### API: runVbs

- `runVbs(data: { vbs: string; args?: string[]; }): Promise<string>` Run a VBS script and return the result.
- `runVbsBuffer(data: { vbs: string; args?: string[]; }): Promise<string[]>` Run a VBS script and return the result as a buffer.

```ts
import { runVbs } from "@el3um4s/run-vbs";

const vbs = `
set args = Wscript.Arguments

Dim name, surname

Dim count
count = WScript.arguments.count

if count = 0 then
    name = ""
    surname = ""
    Wscript.Echo "hello world"
end if

if count = 1 then
    name = args(0)
    surname = ""
    Wscript.Echo "hello" & " " & name & "!"
end if

if count = 2 then
    name = args(0)
    surname = args(1)
    Wscript.Echo "hello" & " " & name & " " & surname  & "!"
end if
`;

const result = await runVbs({
  vbs,
});
console.log(result); // hello world

const result2 = await runVbs({
  vbs,
  args: ["John", "Doe"],
});
console.log(result2); // hello John Doe!
```

### API: runVbsFile

- `runVbsFile(data: { vbs: string; args?: string[]; }): Promise<string>` Run a VBS script and return the result.
- `runVbsFileBuffer(data: { vbs: string; args?: string[]; }): Promise<string[]>` Run a VBS script and return the result as a buffer.

```ts
import { runVbsFile } from "@el3um4s/run-vbs";

const result = await runVbsFile({
  vbs: "./src/__tests__/test_no_output.vbs",
});
console.log(result); // hello world

const result2 = await runVbsFile({
  vbs: "./src/__tests__/test_no_output.vbs",
  args: ["John", "Doe"],
});
console.log(result2); // hello John Doe!
```

### Known Issues

There can be issues when the file path has a space.

### Acknowledgments

To create this package I was inspired by:

- [windows-shortcut-vbs](https://www.npmjs.com/package/windows-shortcut-vbs)
- [el3um4s/deno-adodb](https://github.com/el3um4s/deno-adodb)

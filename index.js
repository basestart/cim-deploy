#! /usr/bin/env node
const cp = require('child_process');
const fs = require('fs');
const rm = require('rimraf');
const target = process.argv[2];
let ignoreFile = process.argv[3];
cp.exec(`mv ${target}/${ignoreFile} ./${ignoreFile}`);

rm(`${target}/*`, function () {
    cp.exec(`mv ./${ignoreFile} ${target}/${ignoreFile}`);
    cp.exec(`cp dist/dist_qh/* ${target} -r`, function (err, stdout) {
        if(!err) {
            console.log(stdout);
        }
    })
})

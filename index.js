#! /usr/bin/env node
const chalk = require('chalk');
const cp = require('child_process');
const fs = require('fs');
const rm = require('rimraf');
const assert = require('assert');
const target = process.argv[2];
let ignore = process.argv.slice(3);

ignore = ignore.filter(item => {
	if (!fs.existsSync(`${target}/${item}`)) {
		console.log(chalk.blue(`${item} 不存在`));
	} else {
		return item;
	}
});

// 保存保留文件
saveIgnore();

assert(target, '请配置目标目录 : cim-deploy <target idr> [ignore folders or files]');

// 删除所有我呢见
rm(`${target}/*`, function () {
	// 复制构建项目
    cp.execSync(`cp dist/dist_qh/* ${target} -r`); 
    // 删除同名复制文件
    rmDuplicate();
    // 取回保留文件
	recoverIgnore();
})

function saveIgnore() {
	let cmd = `mv`;

	ignore.map(ignore => {
		cmd = `${cmd} ${target}/${ignore}`;
	})
	cmd = `${cmd} -t ${target}/../`;
	cp.execSync(cmd);
}

function rmDuplicate () {
	let cmd = `rm`;
	let rmignore = ignore.filter(item => fs.existsSync(`${target}/item`))
	if(rmignore.length) {
		rmignore.map(ignore => {
			cmd = `${cmd} ${target}/${ignore}`;
		})
		cmd = `${cmd} -r`;
		cp.execSync(cmd);
	}
}

function recoverIgnore () {
	let cmd = `mv`;

	ignore.map(ignore => {
		cmd = `${cmd} ${target}/../${ignore}`;
	})
	cmd = `${cmd} -t ${target}/`;
	cp.execSync(cmd);
}

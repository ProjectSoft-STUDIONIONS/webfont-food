module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var fs = require('fs'),
		PACK = grunt.file.readJSON('package.json'),
		path = require('path'),
		chalk = require('chalk'),
		hash = function (...args) {
			var md5 = require('md5');
			let result = "",
				arr = [];
			if(!args.length){
				let time = (new Date()).getTime();
				arr.push("Not arguments");
				result = md5(time).toString();
			}else{
				let text = "";
				for(let index in args){
					let file = args[index];
					file = path.normalize(path.join(__dirname, file));
					try{
						let buff = fs.readFileSync(file, {
							encoding: "utf8"
						}).toString();
						text += buff;
						arr.push(file);
					}catch(e){
						// Ничего не делаем
						arr.push("Not found");
					}
				}
				result = md5(text).toString();
			}
			arr.push(result);
			grunt.log.oklns([chalk.cyan("Generate hash:") + "\n" + chalk.yellow(arr.join("\n"))]);
			return result;
		};
	var gc = {
		version: `${PACK.version}`,
		default: [
			"less",
			"ttf2woff2",
			"copy",
		],
		hash: hash('src/style.less'),
	};


	grunt.initConfig({
		globalConfig : gc,
		pkg : PACK,
		less: {
			default: {
				options : {
					compress: false,
					ieCompat: false,
					plugins: [],
					modifyVars: {
						hash: gc.hash
					},
				},
				files : {
					// component-3x
					'dest/css/foodIcon.css' : [
						//'bower_components/bootstrap/less/bootstrap.less',
						'src/style.less'
					],
				},
			},
		},
		ttf2woff2: {
			default: {
				src: "src/fonts/*.ttf",
				dest: "dest/fonts"
			},
		},
		copy: {
			default: {
				expand: true,
				cwd: 'src/fonts',
				src: '**',
				dest: 'dest/fonts/',
			},
		}
	});
	grunt.registerTask('default',	gc.default);
};
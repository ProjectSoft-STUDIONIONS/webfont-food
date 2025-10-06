module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var fs = require('fs'),
		PACK = grunt.file.readJSON('package.json'),
		path = require('path'),
		chalk = require('chalk');
	var gc = {
		version: `${PACK.version}`,
		default: [
			"webfont",
			"less"
		]
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
				},
				files : {
					'dest/css/foodIcon.css' : [
						'src/less/FoodIcon.less',
					],
				},
			},
		},
		webfont: {
			icons: {
				src: 'src/glyph/*.svg',
				dest: 'dest/fonts',
				options: {
					hashes: true,
					relativeFontPath: '../fonts/',
					destLess: 'src/less',
					font: 'FoodIcon',
					types: 'ttf,woff2',
					fontFamilyName: 'FoodIcon',
					fontFilename: 'FoodIcon',
					stylesheets: ['less'],
					syntax: 'bootstrap',
					engine: 'fontforge',
					autoHint: false,
					execMaxBuffer: 1024 * 200,
					htmlDemo: false,
					//version: gc.fontVers,
					normalize: true,
					startCodepoint: 0xE900,
					iconsStyles: false,
					templateOptions: {
						fontfaceStyles: true,
						baseClass: 'food-icon',
						classPrefix: 'food-icon-'
					},
					embed: false,
					template: 'src/font.template'
				}
			}
		}
	});
	grunt.registerTask('default',	gc.default);
};

module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
          	beforeuglify: ['CDN-Scripts/smartad_unmin_dev.js', 'CDN-Scripts/divscripte/*unmin.js', 'CDN-Scripts/pages/*_sp.js', 'CDN-Scripts/partners/*.js', 'build/includePartner.js'],
          	//afteruglify: ['CDN-Scripts/smartad.js'],
          	/*filter: function(filepath) {
          		return (filepath.match(/bkp|backup/i))? !0 : !1;
          	},*/
          	options: {
          	    maxerr: 50000,
          	    ignores: ['CDN-Scripts/partners/prebidLib.js','CDN-Scripts/partners/prebidLib_unmin.js'],
          	    globals: {
                    'console': true
          	    },
          	    boss: !0,
          	    curly: !0,
          	    eqeqeq: true,
          	    forin: !0,
          	    asi: !0,
          	    nonbsp: !1,
          	    globalstrict: !1,
          	    reporter: 'node_modules/jshint-stylish',
          	    reporterOutput: 'JSDriver-Tests/lintlog.js',
          	    smarttabs: !0,
          	    expr: !0
          	}
        },
		uglify: {
			build: {
				files: [{
					'CDN-Scripts/smartad.js': ['CDN-Scripts/smartad_unmin.js'],
					'CDN-Scripts/divscripte/adplayer.js': ['CDN-Scripts/divscripte/adplayer_unmin.js'],
					'CDN-Scripts/divscripte/adplayer.sas.js': ['CDN-Scripts/divscripte/adplayer.sas_unmin.js']
				}]
            },
			prod: {
			    files: [{
                    expand: true,
                    src: ['**/*.js'],
				    cwd: 'build/pages/',
                    dest: 'CDN-Scripts/pages'
                }]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['jshint', 'uglify']);

};
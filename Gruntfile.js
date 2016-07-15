module.exports = function (grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        //��������� ������������
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true,
                    console: true
                }
            },
            '<%= pkg.name %>' : {
                src: [ 'src/js/**/*.js' ]
            }
        },
        //����������� ������
        concat: {
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> -v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") */\n'
            },
            dist: {
                src: ['src/js/file1.js', 'src/js/file2.js'],
                dest: 'dest/build.js'
            }
        },
        //���������� js ������
        uglify: {
            build: {
                src: 'dest/build.js',
                dest: 'dest/build.min.js'
            }
        },
        //���������� css ������
        cssmin: {
            with_banner: {
                options: {
                    banner: '/* My minified CSS */\n'
                },
                files: {
                    'dest/style.min.css' : ['src/css/main.css']
                }
            }
        },
        // ������������� ���������
        watch: {
            scripts: {
                files: ['src/js/*.js'],
                tasks: ['jshint', 'concat', 'uglify', 'removelogging']
            },
            css: {
                files: ['**/*.css'],
                tasks: ['cssmin']
            }
        },
        // �������� console.log �� ������
        removelogging: {
            dist: {
                src: 'dest/build.min.js',
                dest: 'dest/build.clean.js'
            }
        }
    });

    //���������� ����������� �������
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-remove-logging');
    //������������ ������
    grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'removelogging', 'watch']);
    grunt.registerTask('test', ['']);
};
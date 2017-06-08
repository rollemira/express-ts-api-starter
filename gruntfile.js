module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        copy: {
            build: {
                files: [
                    {//copy configs
                        expand: true,
                        cwd: "./",
                        src: ["./**/*.config", "./**/*.json", "!./node_modules/**"],
                        dest: "./dist"
                    },
                    {//copy server
                        expand: true,
                        flatten: true,
                        cwd: "./",
                        src: ["./bin/*.js"],
                        dest: "./dist"
                    },
                    {//copy public files
                        expand: true,
                        cwd: "./public",
                        src: ["**"],
                        dest: "./dist/public"
                    }
                ]
            }
        },
        ts: {
            app: {
                files: [{
                    src: ["server/**/*.ts", "!server/.baseDir.ts"],
                    dest: "./dist"
                }],
                options: {
                    experimentalDecorators: true,
                    module: "commonjs",
                    target: "es6",
                    sourceMap: false
                }
            }
        },
        clean: {
            dist: ["./dist/*"]
        },
        watch: {
            ts: {
                files: ["server/**/*.ts"],
                tasks: ["ts"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-ts");

    grunt.registerTask("default", [
        "clean",
        "copy",
        "ts"
    ]);

};
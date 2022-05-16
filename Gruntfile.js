//require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

module.exports = function (grunt) {
  grunt.initConfig({
    ts: {
      default: {
        // src: ["**/*.ts", "!node_modules/**"],
        src: ["src/**/*.ts", "!node_modules/**"],
        outDir: "./dist",
      },
      options: {
        rootDir: "./src",
        target: "es6",
        module: "es2015",
        // moduleResolution: "node",
        esModuleInterop: true,
        allowJs: true
      }
    },
    concat: {
      options: {
        separator: "\n",
      },
      dist: {
        src: ["dist/**/*.js", "dist/*.js"],
        dest: "build/jdatagrid.js"
      }
    },
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      dist: {
        files: {
          "js/jdatagrid.js": "build/jdatagrid.js",
        },
      },
    },
  });
  grunt.loadNpmTasks("grunt-ts");
  // grunt.loadNpmTasks('grunt-contrib-concat');concat
  // grunt.loadNpmTasks('grunt-babel');babel
  grunt.registerTask("default", ["ts",]);
};
module.exports = function(grunt) {
    grunt.initConfig({
      ts: {
        default : {
          // src: ["**/*.ts", "!node_modules/**"],
          src: ["src/**/*.ts", "!node_modules/**"],
          outDir: "dist"
        },
        options:{
            rootDir : "src"
        }
      },
      concat:{
          options:{
            separator: ";",
          },
          dist:{
             src:["dist/**/*"],
             dest:"build/jdatagrid.js"
          }
      }
    });
    grunt.loadNpmTasks("grunt-ts");
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask("default", ["ts","concat"]);
  };
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/materia.js",
  output: {
    file: "dist/materia.js",
    format: "es",
  },
  plugins: [resolve(), terser()],
};

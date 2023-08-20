const path = require("path");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

const renderDom = async (filename) => {
    // path is project root + static + filename
    const filepath = path.join(process.cwd(), "static", filename);

    const dom = await JSDOM.fromFile(filepath, {
        runScripts: "dangerously",
        resources: "usable",
    });

    return new Promise((resolve, _) => {
        dom.window.document.addEventListener("DOMContentLoaded", () => {
            resolve(dom);
        });
    });
};

module.exports = renderDom;
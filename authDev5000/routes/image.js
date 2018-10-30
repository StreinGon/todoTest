const express = require("express");
const fs = require("fs");
const router = express.Router();
/**
 * @api {get} /image/:imagename Image Get single image
 *  * @apiGroup Image
 */
router.get("/:image", (req, res, next) => {
  fs.readFile(`public\\uploads\\${req.url}`, "binary", function(error, file) {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write("Not found" + "\n");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "image/png" });
      res.end(file, "binary");
    }
  });
});

module.exports = router;

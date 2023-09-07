const schedule = require("node-schedule");
const fs = require("fs");

const tmpDir = "./tmp/";

// Change the schedule to run at 6:14 am
const cleanUpSchedule = "* */5 * * *"; // "Minute Hour Day Month DayOfWeek"
schedule.scheduleJob(cleanUpSchedule, function () {
  console.log("running job: clean up tmp files");
  fs.readdir(tmpDir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.warn("unable to read temp files directory");
      console.log(err);
      return;
    }
    if (Array.isArray(files)) {
      const currentTime = new Date().getTime(); // Get current time in milliseconds
      const fiveMinutesAgo = currentTime - 5 * 60 * 1000; // Calculate time 5 minutes ago
      // Because of withFileTypes option, files are fs.Dirent objects instead of just string filenames.
      files.forEach((file) => {
        // Make sure it's a file before proceeding
        if (file.isFile()) {
          fs.stat(tmpDir + file.name, (err, stats) => {
            if (err) {
              console.warn("unable to fs.stat() file %s", file.name);
              console.log(err);
              return;
            }
            // If the file's creation time is earlier than five minutes ago, delete it
            if (stats.birthtimeMs < fiveMinutesAgo) {
              console.log("removing temp file %s", file.name);
              fs.unlink(tmpDir + file.name, (err) => {
                if (err) {
                  console.warn("unable to remove temp file %s", file.name);
                } else {
                  console.log("temp file %s removed", file.name);
                }
              });
            } else {
              console.log(
                "the temp file %s will not be removed due to not being old enough.",
                file.name
              );
            }
          });
        }
      });
    }
  });
});

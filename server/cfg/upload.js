Meteor.startup(function () {
    var root = process.env.PWD;

    UploadServer.init({
        tmpDir: root + '/.uploads/tmp',
        uploadDir: root + '/.uploads/backgrounds',
        checkCreateDirectories: false,
        mimeTypes: {
            "jpeg": "image/jpeg",
            "jpg": "image/jpeg",
            "png": "image/png",
            "gif": "image/gif"
        }
    });
});

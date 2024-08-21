const fs = require('fs-extra');

const listFolderCopy = [
    {
        sourceDirectory: 'views',
        targetDirectory: 'dist/views'
    },
    {
        sourceDirectory: 'public',
        targetDirectory: 'dist/public'
    }
];

listFolderCopy.forEach((folder) => {
    fs.copy(folder.sourceDirectory, folder.targetDirectory, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Copy ${folder.sourceDirectory} to ${folder.targetDirectory} success`);
        }
    });
});
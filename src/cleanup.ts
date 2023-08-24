import { unlink, readdir, stat } from "fs/promises";
import { removeProject, __rootdir, getProjectsUsedBefore, removeExpiredShortCodes } from "./database-util.js";
import { join } from "path";

const daysToMs = (days: number) => days * 24 * 60 * 60 * 1000; 

export async function cleanupAll() {
    
    await Promise.all([
        cleanupProjects(),
        removeExpiredShortCodes(),
        deleteOldFiles()
    ]);

    async function cleanupProjects() {
        const oldProjects = await getOldProjects();
        await Promise.all(oldProjects.map(deleteProject));
    }

    async function deleteOldFiles() {
        const oldFiles = await getOldFiles();
        await Promise.all(oldFiles.map(unlink));
    }
}

async function getOldFiles(): Promise<string[]> {    
    if (process.env.DATA_LIFE_DAYS) {
        const dataFilesDir = join(__rootdir, "data_files");
        const allFilesPromise = readdir(dataFilesDir);
        
        const ageLimit = parseFloat(process.env.DATA_LIFE_DAYS);
        const cullTime = Date.now() - daysToMs(ageLimit);

        const allFiles = await allFilesPromise;
        const filesWithTime = await Promise.all(allFiles.map(async (fileName) => {
            const filePath = join(dataFilesDir, fileName)
            return { filePath , modified: await getLastModified(filePath)}
        }));

        return filesWithTime
            .filter((fileWithTime) => fileWithTime.modified < cullTime)
            .map((fileWithTime) => fileWithTime.filePath);
    } else {
        return []
    }

    async function getLastModified(filePath: string) {
        return (await stat(filePath)).mtimeMs;
    }
}

async function getOldProjects(): Promise<string[]> {

    if (process.env.PROJECT_LIFE_DAYS) {
        const ageLimit = parseFloat(process.env.PROJECT_LIFE_DAYS);
        const oldestAge = Date.now() - daysToMs(ageLimit);

        return await getProjectsUsedBefore(oldestAge);
    } else {
        return [];
    }
}

async function deleteProject(projectName: string) {
    try {
        await Promise.all([
            removeProject(projectName), 
            removeProjectDemonstrationFiles(projectName)
        ]);

    } catch (err) {
        console.log(`Failed to delete ${projectName}, received: ${err}`)
    }
    
    async function removeProjectDemonstrationFiles(projectName: string) {
        const demonstrationFilesDir = join(__rootdir, "demonstration_files");
        const allFiles = await readdir(demonstrationFilesDir);
    
        await Promise.all(allFiles.map((fileName: string) => {
            const demonstrationFileNameRegex = new RegExp(`^${projectName}-\\d+.csv`)
    
            if (demonstrationFileNameRegex.test(fileName)) {
                const filePath = join(demonstrationFilesDir, fileName);
                return unlink(filePath);
            }
        }));
    }
}

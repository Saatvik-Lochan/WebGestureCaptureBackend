import Datastore from "nedb"
import { Participant, Project, Trial } from "./models/project-model.mts";
import { GestureClassLocator } from "./demonstration-router.mts";

/**
 * The time after which a shortCode will expire in ms.
 */
const codeExpirationMs = 60000000; // 1000 minutes (for debug)

// set up database
const projectDb = new Datastore({
    filename: "db/user.db",
    autoload: true
});

const demonstrationDb = new Datastore({
    filename: "db/demonstration.db",
    autoload: true
});

// demonstration based functions
/**
 * A subtype of {@link GestureClassLocator} which is stored in the database. 
 * It has the added information of insertion time and id.
 */
export interface GestureClassStamped extends GestureClassLocator {
    /**
     * The time at which the object was inserted into the database.
     */
    stamped: number;

    /**
     * The id of the object, also used as its ShortCode.
     * @remarks The id is given by the NeDB database after it is inserted.
     */
    _id?: string;
}

/**
 * Inserts the locator into the database, stamping it with a time and shortcode
 * @param locator The locator to be inserted.
 * @returns The id or shortcode which was generated.
 */
export function addLocator(locator: GestureClassLocator) {
    const stamped: GestureClassStamped = { ...locator, stamped: Date.now()};

    return new Promise((resolve, reject)  => {
        demonstrationDb.insert(stamped, (err: Error, doc: GestureClassStamped) => {
            if (err) return reject(err);

            resolve(doc._id);
        });
    })
}

/**
 * Attempts to find a locator with the corresponding shortcode and return it.
 * @param shortCode The shortcode or id to serarch for.
 * @returns The locator corresponding to the shortCode.
 * @throws Error("No such shortcode") if the shortCode does not exist in the database
 * @throws Error("Code expired") if the shortCode has expired
 */
export function getLocatorFromShortCode(shortCode: string): Promise<GestureClassLocator>{
    return new Promise((resolve, reject) => {
        demonstrationDb.findOne({ _id: shortCode }, (err: Error, doc: GestureClassStamped) => {
            if (err) return reject(err);
            
            if (!doc) {
                return reject(Error("No such shortcode"));
            } 

            if (Date.now() - doc.stamped > codeExpirationMs) {
                return reject(Error("Code expired"));
            }

            resolve(doc);
        });
    });
}

// project based functions
/**
 * @returns The number of projects in the database.
 */
export function getNumberOfProjects(): Promise<number> {
    return new Promise(resolve => {
        projectDb.count({}, (err: Error, count: number) => resolve(count));
    });
}
 
/**
 * Searches the database for a project with the corresponding project_name.
 * @remarks 
 * It is assumed that project_name is unique within the database.
 * If it is not, it will return the first project encountered.
 * @param project_name The name of the project being searched for.
 * @returns The project with the name specified.
 */
export function getProject(project_name: string): Promise<Project> {
    return new Promise((resolve, reject) => {
        projectDb.findOne({ project_name }, (err: Error, doc: any) => {
            if (err) reject(err);
            
            resolve(doc);
        });
    })
}

/**
 * Inserts a project into the database
 * @param project The project to insert 
 * @returns The inserted project (with an _id) {@link https://github.com/louischatriot/nedb#inserting-documents | nedb}.
 */
export function addProject(project: Project): Promise<Project> {
    return new Promise((resolve, reject) => {
        projectDb.insert(project, (err, doc: Project) => {
            if (err) reject(err);
            else resolve(doc);
        });
    });
}

/**
 * Add a {@link https://jwt.io/ | JWToken} to a project in the database
 * @remarks Overwrites any existing tokens (though the old tokens will remain valid with their payload)
 * @param project_name The project to add a token to
 * @param token the JWToken to add to the project
 */
export function addTokenTo(project_name: string, token: string) {
    projectDb.update({ project_name: project_name }, 
        { $set: {token: token} }, {}
    );
}

// participant based functions
/**
 * Adds a {@link Participant} object to a project in the database. 
 * @param projectName The name of the project to insert into
 * @param newParticipant The participant object to insert 
 */
export function addParticipant(projectName: string, newParticipant: Participant) {
    projectDb.update({ project_name: projectName }, { $push: { participants: newParticipant } });
}

/**
 * Extracts a {@link Participant} from a {@link Project} object using the participant's id.
 * @param project The {@link Project} to find the participant in
 * @param participantId The id of the {@link Participant} object to find
 * @returns The {@link Participant} object with the corresponding id or `null` if there is no such participant
 */
export function getParticipant(project: Project, participantId: string): Participant {
    let outParticipant = null;

    project.participants.forEach((participant: Participant) => {
        if (participant.participant_id === participantId) outParticipant = participant;
    });

    return outParticipant;
}

/**
 * Returns a {@link RegExpMatchArray} with groups of `pid` and `urlCode`
 * 
 * @param pidAndUrlCode A string containing a `pid` and a `urlCode` separated by a `-`
 * @returns 
 * A {@link RegExpMatchArray} with groups of `pid` and `urlCode`. 
 * Returns `null` if there was no match (i.e. an invalid input string).
 * 
 * @example
 * ```ts
 * result = getPidAndUrlCode("1-d0a710cc25");
 * const {pid, urlCode} = result.groups; 
 * 
 * // expected results:
 * // pid == "1"
 * // urlCode == "d0a710cc25"
 * ```
 * ```
 */
export function getPidAndUrlCode(pidAndUrlCode: string) {
    const regex = /(?<pid>.*)-(?<urlCode>.*)/;
    return pidAndUrlCode.match(regex);
}

/**
 * Gets a {@link Participant} from a {@link Project} using its `pid` and `urlCode` - if the code is valid.
 * 
 * @param project The project in which to look for participants
 * @param pidAndUrlCode A string of `pid` (participant id) and `urlCode` separated by `-`, example: `1-d0a710cc25`
 * @returns The {@link Participant} object with the correct `pid` and matching `urlCode`. 
 * Returns `null` if {@link pidAndUrlCode} paramater has {@link getPidAndUrlCode | an invalid format}, 
 * or if the `pid` does not match the `urlCode` stored with the corresponding {@link Participant} in the {@link Project} 
 */
export function getParticipantFromUrlCode(project: Project, pidAndUrlCode: string) {
    const match = getPidAndUrlCode(pidAndUrlCode);

    if (match == null) return null;

    const {pid, urlCode} = match.groups;
    const participant = getParticipant(project, pid);

    if (participant == null || 
        !('urlCode' in participant) || 
        participant.urlCode != urlCode) return null;

    return participant;
}

/**
 * Sets the {@link Project.participants | participants} field of the {@link Project} in the database
 * specified by {@link projectName}; 
 * @param projectName The name of the {@link Project} in the database
 * @param allParticipants An array with which to replace the current {@link Project.participants | participants} array
 */
function setAllParticipants(projectName: string, allParticipants: Participant[]) {
    projectDb.update({ project_name: projectName }, { $set: { participants: allParticipants } });
}

// pretty inefficent, preferentially use setAllParticipants and change in bulk
export async function setParticipant(projectName: string, newParticipant: Participant) {
    const proj = await getProject(projectName);
    proj.participants = proj.participants.map((participant: Participant) => {
        if (participant.participant_id == newParticipant.participant_id) return newParticipant;
        else return participant;
    });
    setAllParticipants(projectName, proj.participants);
}

export function getCompletedTrial(participant: Participant, trialId: string): Trial {
    let outTrial = null;

    participant.completedTrials.forEach((trial: Trial) => {
        if (trial.trial_id == trialId) outTrial = trial;
    });

    return outTrial;
}

// trial based functions
export function getTrial(participant: Participant, trialId: string): Trial {
    let outTrial = null;

    participant.pendingTrials.forEach((trial: Trial) => {
        if (trial.trial_id == trialId) outTrial = trial;
    });

    return outTrial;
}

// removes trial from input participant as well
export function moveTrialToComplete(participant: Participant, trialId: string) {
    const newPending: Trial[] = [];
    console.log(participant)

    for (let trial of participant.pendingTrials) {
        if (trial.trial_id == trialId) {
            participant.completedTrials.push(trial);
        } else {
            newPending.push(trial);
        }
    }

    participant.pendingTrials = newPending;
    console.log(participant)
    return participant;
}

export function removeTrialFromParticipant(participant: Participant, trialId: string) {
    participant.completedTrials = removeTrialFromList(participant.completedTrials);
    participant.pendingTrials = removeTrialFromList(participant.pendingTrials);
    return participant;

    function removeTrialFromList(trialList: Trial[]) {
        return trialList.filter(trial => trial.trial_id != trialId);
    }
}

// aggregating functions
export function getAllCompletedTrialsFromProject(project: Project) {
    let outList: Trial[] = [];

    project.participants.forEach(participant => {
        outList = [...outList, ...participant.completedTrials];
    });

    return outList.map(trial => trial.trial_id);
}

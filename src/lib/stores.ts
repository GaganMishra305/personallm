import { connectToDatabase } from './mongo';
interface LeaderboardEntry {
  name: string;
  score: number;
}

// Simplified store type without daily counts
interface UserSubmissionStore {
  name: string;
  email: string;
  bestSubmission: {
    submissionJson: any;
    notebookLink: string;
    timestamp: Date;
    score: number;
  } | null;
}

export async function createOrUpdateUser(name: string, email: string): Promise<void> {
  const { db } = await connectToDatabase();
  const usersCollection = db.collection<UserSubmissionStore>('users');

  await usersCollection.updateOne(
    { email },
    {
      $setOnInsert: {
        name,
        email,
        bestSubmission: null
      }
    },
    { upsert: true }
  );
}

export async function addSubmission(
  email: string,
  submissionJson: any,
  notebookLink: string,
  score: number
): Promise<boolean> {
  const { db } = await connectToDatabase();
  const usersCollection = db.collection<UserSubmissionStore>('users');

  const user = await usersCollection.findOne({ email });
  if (!user) return false;

  // Update best submission only if score is higher or no previous submission exists
  if (!user.bestSubmission || score > user.bestSubmission.score) {
    await usersCollection.updateOne(
      { email },
      {
        $set: {
          bestSubmission: {
            submissionJson,
            notebookLink,
            timestamp: new Date(),
            score
          }
        }
      }
    );
  }

  return true;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const { db } = await connectToDatabase();
  const usersCollection = db.collection<UserSubmissionStore>('users');

  return await usersCollection
    .find(
      { bestSubmission: { $ne: null }},
      { 
        projection: {
          name: 1,
          'bestSubmission.score': 1,
          _id: 0
        }
      }
    )
    .sort({ 'bestSubmission.score': -1 })
    .toArray()
    .then(results => results.map(result => ({
      name: result.name,
      score: result.bestSubmission?.score || 0
    })));
}

export async function getUserSubmission(email: string): Promise<UserSubmissionStore | null> {
  const { db } = await connectToDatabase();
  const usersCollection = db.collection<UserSubmissionStore>('users');
  
  return await usersCollection.findOne({ email });
}
export type Keypoint = {
  x: number;
  y: number;
  z: number;
  visibility: number;
};

export type ExerciseDataObj = {
  partName: string;
  deviation: number;
  maxDeviation: number;
};

export type ExerciseData = Array<ExerciseDataObj>;

export type MessageData = {
  [partName: string]: string;
};

export type RepsData = {
  partName: string;
  range: Array<number>;
};

export interface AngleData {
  [key: string]: number;
}

export interface ExerciseDataParent {
  [key: string]: ExerciseData;
}

export interface MessageDataParent {
  [key: string]: MessageData;
}

export interface RepsDataParent {
  [key: string]: RepsData;
}

export interface AngleDataParent {
  [key: string]: AngleData;
}

export type CompoundData =
  | {
      exerciseData: ExerciseDataParent;
      repsData: RepsDataParent;
      messageData: MessageDataParent;
      angleData: AngleDataParent;
    }
  | undefined;

export type DeviatingPart = {
  partName: string;
  deviation: number;
};

export type FinalData = {
  currentExercise: string;
  deviatingPartArray: Array<DeviatingPart>;
  deviatingPart: string;
  message: string;
  deviationDataObj: { startTime: number; endTime: number };
  repFlag: boolean;
  repCount: number;
  repDataArr: RepInsertionArray;
};

export type RepInsertionArray = Array<{
  endTime: number;
  wrongForm: FinalData["deviationDataObj"];
}>;

export type InsertionData = Array<{ name: string; sets: RepInsertionArray }>;

//Array given by playlist/exercise to Canvas
export type ExerciseObj = {
  name: string;
  reps: number;
};

export type CustomResult = {
  image: any;
  poseLandmarks: Array<Keypoint>;
  currentExercise: string;
};

export type PoseResult = {
  image: any;
  poseLandmarks: Array<Keypoint>;
  poseWorldLandmarks: Array<Keypoint>;
};

export interface PoseDataNodes {
  id: number;
  x: number;
  y: number;
  z: number;
}

export interface PoseDataLinks {
  source: number;
  target: number;
}

import { Result, VO } from "@spysec/shared";

interface EmailContent {
  type: 'EMAIL';
  sender: string;
  subject: string;
  body: string;
}

interface CodeContent {
  type: 'CODE';
  language: 'typescript' | 'python' | 'bash' | 'sql';
  codeSnippet: string;
  filename?: string;
}

interface ImageContent {
  type: 'IMAGE';
  imageUrl: string;
  altText?: string;
}

interface TerminalContent {
  type: 'TERMINAL';
  logs: string[];
  hostname: string;
}

interface InfoData {
  title?: string;
  text: string;
  imageURL?: string;
}

interface QuizData {
  context?: HotspotContext
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  feedbackSuccess: string;
  feedbackError: string;
}

interface InputData {
  question: string;
  description?: string;
  placeholder?: string;
  context?: HotspotContext; 
  validation: {
    type: 'EXACT_MATCH' | 'CONTAINS' | 'REGEX';
    expectedValue: string;
  };
  feedbackSuccess: string;
  feedbackError: string;
}

type HotspotContext = EmailContent | CodeContent | ImageContent | TerminalContent;

interface HotspotData {
  context: HotspotContext;
  regions: {
    id: string;
    rect: { x: number, y: number, w: number, h: number }; 
    feedback: string;
    isCorrect: boolean;
  }[];
}

export type MissionBlock =
  | { id: string; type: 'INFO'; data: InfoData }
  | { id: string; type: 'QUIZ'; data: QuizData }
  | { id: string; type: 'HOTSPOT'; data: HotspotData }
  | { id: string; type: 'INPUT'; data: InputData };

export class MissionContent extends VO<MissionBlock[]> {
  static readonly ERROR_MISSION_CONTENT_MUST_BE_NON_EMPTY_LIST = "MISSION_CONTENT_MUST_BE_NON_EMPTY_LIST";
  static readonly ERROR_BLOCK_MISSING_ID_OR_TYPE = "BLOCK_MISSING_ID_OR_TYPE";
  static readonly ERROR_QUIZ_MISSING_CORRECT_OPTION = "QUIZ_MISSING_CORRECT_OPTION";
  static readonly ERROR_QUIZ_NEEDS_TWO_OPTIONS = "QUIZ_NEEDS_TWO_OPTIONS";
  static readonly ERROR_HOTSPOT_INVALID_STRUCTURE = "ERROR_HOTSPOT_INVALID_STRUCTURE";
  static readonly ERROR_HOTSPOT_NEEDS_REGIONS = "ERROR_HOTSPOT_NEEDS_REGIONS";
  static readonly ERROR_INPUT_MISSING_VALIDATION = "INPUT_MISSING_VALIDATION";

  private constructor(blocks: MissionBlock[]) {
    super(blocks);
  }

  static create(rawBlocks: any[]): Result<MissionContent> {
    if (!Array.isArray(rawBlocks) || rawBlocks.length === 0) {
      return Result.fail(MissionContent.ERROR_MISSION_CONTENT_MUST_BE_NON_EMPTY_LIST);
    }

    for (const block of rawBlocks) {
      if (!block.id || !block.type || !block.data) {
        return Result.fail(MissionContent.ERROR_BLOCK_MISSING_ID_OR_TYPE);
      }

      if (block.type === 'QUIZ') {
        const quiz = block.data as Partial<QuizData>;
        if (!quiz.correctOptionId) return Result.fail(MissionContent.ERROR_QUIZ_MISSING_CORRECT_OPTION);
        if (!Array.isArray(quiz.options) || quiz.options.length < 2) {
          return Result.fail(MissionContent.ERROR_QUIZ_NEEDS_TWO_OPTIONS);
        }
      }

      if (block.type === 'INPUT') {
        const inputData = block.data as Partial<InputData>;
        if (!inputData.validation || !inputData.validation.expectedValue) {
            return Result.fail(MissionContent.ERROR_INPUT_MISSING_VALIDATION);
        }
      }

      if (block.type === 'HOTSPOT') {
        const hotspot = block.data as Partial<HotspotData>;
        if (!hotspot.context || !hotspot.context.type) {
          return Result.fail(MissionContent.ERROR_HOTSPOT_INVALID_STRUCTURE);
        }
        if (!Array.isArray(hotspot.regions) || hotspot.regions.length === 0) {
          return Result.fail(MissionContent.ERROR_HOTSPOT_NEEDS_REGIONS);
        }
        const invalidRegion = hotspot.regions.find(r => !r.rect || typeof r.rect.x !== 'number');
        if (invalidRegion) {
          return Result.fail("HOTSPOT_REGION_INVALID_COORDINATES");
        }
      }
    }

    return Result.ok(new MissionContent(rawBlocks as MissionBlock[]));
  }

  static restore(blocks: MissionBlock[]): MissionContent {
    return new MissionContent(blocks);
  }

  estimateDifficulty(): 'EASY' | 'HARD' {
    const quizCount = this.value.filter(b => b.type === 'QUIZ').length;
    return quizCount > 3 ? 'HARD' : 'EASY';
  }

  get blocks(): MissionBlock[] {
    return this.value;
  }     
}


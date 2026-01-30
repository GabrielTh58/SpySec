import { Result, VO } from "@spysec/shared";

interface BaseBlockData {
  mascotMessage?: string;
}

interface MatchingData extends BaseBlockData {
  question: string;
  pairs: { leftId: string; leftText: string; rightId: string; rightText: string }[];
  feedbackSuccess: string;
  feedbackError: string;
}

interface SortingData extends BaseBlockData {
  question: string;
  items: { id: string; text: string }[];
  correctOrder: string[];
  feedbackSuccess: string;
  feedbackError: string;
}

interface EmailContent extends BaseBlockData {
  type: 'EMAIL';
  sender: string;
  subject: string;
  body: string;
}

interface ImageContent extends BaseBlockData {
  type: 'IMAGE';
  image: string;
  altText: string;
}

interface TerminalContent extends BaseBlockData {
  type: 'TERMINAL';
  logs: string[];
  hostname: string;
}

interface InfoData extends BaseBlockData {
  title?: string;
  text: string;
  deepDive?: string
  imageURL?: string;
  highlightBox?: string;
}

interface QuizData extends BaseBlockData {
  context?: HotspotContext
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  feedbackSuccess: string;
  feedbackError: string;
  explanation?: string
}

interface InputData extends BaseBlockData {
  question: string;
  description?: string;
  placeholder?: string;
  context?: HotspotContext;
  validation: {
    type: 'EXACT_MATCH' | 'CONTAINS' | 'REGEX';
    expectedValue: string;
    isCaseSensitive?: boolean
  };
  feedbackSuccess: string;
  feedbackError: string;
}

type HotspotContext = EmailContent | TerminalContent | ImageContent;

interface HotspotData {
  context: HotspotContext;
  feedbackError?: string;
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
  | { id: string; type: 'INPUT'; data: InputData }
  | { id: string; type: 'MATCHING'; data: MatchingData }
  | { id: string; type: 'SORTING'; data: SortingData };

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

      if (block.type === 'MATCHING') {
        const data = block.data as Partial<MatchingData>;
        if (!Array.isArray(data.pairs) || data.pairs.length < 2) return Result.fail("MATCHING_NEEDS_AT_LEAST_TWO_PAIRS");
      }
  
      if (block.type === 'SORTING') {
        const data = block.data as Partial<SortingData>;
        if (!Array.isArray(data.items) || !Array.isArray(data.correctOrder)) return Result.fail("SORTING_INVALID_STRUCTURE");
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

  hasInteraction(): boolean {
    return this.value.some(b => ['INPUT', 'HOTSPOT', 'QUIZ'].includes(b.type));
  }

  validateUserAnswers(answers: Record<string, any>): { isValid: boolean, failedBlockIds: string[] } {
    const failedBlockIds: string[] = [];

    for (const block of this.value) {
      if (block.type === 'INFO') continue;

      const userAnswer = answers[block.id];

      if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
        failedBlockIds.push(block.id);
        continue;
      }

      // 3. Validação de QUIZ
      if (block.type === 'QUIZ') {
        // No Quiz, a resposta deve ser o ID da opção
        if (userAnswer !== block.data.correctOptionId) {
          failedBlockIds.push(block.id);
        }
      }

      // 4. Validação de INPUT
      if (block.type === 'INPUT') {
        const validation = block.data.validation;
        const userText = String(userAnswer).trim();
        const expectedText = validation.expectedValue.trim();

        if (validation.type === 'EXACT_MATCH') {
          const isCaseSensitive = (validation as any).isCaseSensitive ?? false;

          if (isCaseSensitive) {
            if (userText !== expectedText) failedBlockIds.push(block.id);
          } else {
            if (userText.toLowerCase() !== expectedText.toLowerCase()) failedBlockIds.push(block.id);
          }
        }

        else if (validation.type === 'CONTAINS') {
          if (!userText.includes(expectedText)) failedBlockIds.push(block.id);
        }

        else if (validation.type === 'REGEX') {
          try {
            const regex = new RegExp(expectedText);
            if (!regex.test(userText)) failedBlockIds.push(block.id);
          } catch (e) {
            console.error(`Invalid Regex in block ${block.id}`);
            failedBlockIds.push(block.id);
          }
        }
      }

      // 5. Validação de HOTSPOT
      if (block.type === 'HOTSPOT') {
        // Assumimos que a resposta é um array de IDs das regiões clicadas: ['r1', 'r2']
        if (!Array.isArray(userAnswer)) {
          failedBlockIds.push(block.id);
          continue;
        }

        const requiredRegionIds = block.data.regions
          .filter(r => r.isCorrect)
          .map(r => r.id);

        const foundAllCorrect = requiredRegionIds.every(id => userAnswer.includes(id));
        const clickedWrong = userAnswer.some(id => {
          const region = block.data.regions.find(r => r.id === id);
          return region ? !region.isCorrect : false;
        });

        if (!foundAllCorrect || clickedWrong) {
          failedBlockIds.push(block.id);
        }
      }

      if (block.type === 'MATCHING') {
        const isCorrect = block.data.pairs.every(pair => userAnswer[pair.leftId] === pair.rightId);
        if (!isCorrect) failedBlockIds.push(block.id);
      }

      if (block.type === 'SORTING') {
        const isCorrect = Array.isArray(userAnswer) &&
          userAnswer.length === block.data.correctOrder.length &&
          userAnswer.every((id, idx) => id === block.data.correctOrder[idx]);
        if (!isCorrect) failedBlockIds.push(block.id);
      }
    }

    return {
      isValid: failedBlockIds.length === 0,
      failedBlockIds
    };
  }

  findBlockById(id: string) {
    const block = this.value.find((b) => b.id === id)
    return block || null
  }

  getBlockErrorFeedback(id: string): string {
    const block = this.findBlockById(id);
    if (!block) return "UNKNOWN_ERROR";

    if (['QUIZ', 'INPUT', 'MATCHING', 'SORTING', 'HOTSPOT'].includes(block.type)) {
      return (block.data as any).feedbackError || "INCORRECT_ANSWER";
    }

    return "INCORRECT_ANSWER";
  }

  get blocks(): MissionBlock[] {
    return this.value;
  }
}


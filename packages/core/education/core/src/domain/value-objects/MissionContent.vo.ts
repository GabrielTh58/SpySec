import { Result, VO } from "@spysec/shared";

export interface BaseBlockData {
  mascotMessage?: string;
}

export interface ClassificationCategory {
  id: string;
  name: string;
}

export interface ClassificationItem {
  id: string;
  text: string;
  categoryId: string;
}

export interface ClassificationData extends BaseBlockData {
  question: string;
  categories: ClassificationCategory[];
  items: ClassificationItem[];
  feedbackSuccess: string;
  feedbackError: string;
}

export interface HotspotRegion {
  id: string;
  feedback: string;
  isCorrect: boolean;
}

export interface MatchingData extends BaseBlockData {
  question: string;
  pairs: { leftId: string; leftText: string; rightId: string; rightText: string }[];
  feedbackSuccess: string;
  feedbackError: string;
}

export interface SortingData extends BaseBlockData {
  question: string;
  items: { id: string; text: string }[];
  correctOrder: string[];
  feedbackSuccess: string;
  feedbackError: string;
}

export interface InfoData extends BaseBlockData {
  title?: string;
  text: string;
  deepDive?: string
  imageURL?: string;
  highlightBox?: string;
}

export interface QuizData extends BaseBlockData {
  question: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  feedbackSuccess: string;
  feedbackError: string;
  explanation?: string
}

export interface InputData extends BaseBlockData {
  question: string;
  description?: string;
  placeholder?: string;
  validation: {
    type: 'EXACT_MATCH' | 'CONTAINS' | 'REGEX';
    expectedValue: string;
    isCaseSensitive?: boolean
  };
  feedbackSuccess: string;
  feedbackError: string;
}

export interface ScenarioQuizQuestion {
  id: string;
  timestamp?: string;
  location?: string;
  context: string;
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  feedbackSuccess: string;
  feedbackError: string;
  mascotMessage: string;
}

export interface ScenarioQuizData {
  scenarioName: string;
  questions: ScenarioQuizQuestion[];
  summary: {
    title: string;
    passingScore: number;
    resultMessages: {
      excellent: string;
      good: string;
      needsWork: string;
    };
    mascotMessage: string;
    xpReward: number;
    bonusXp?: number;
  };
}

export interface SummaryData extends BaseBlockData {
  title: string;
  summary: string;
  keyTakeaway: string;
  xpEarned?: number;
  nextMissionTeaser?: string;
}

type BodyNode =
  | { type: 'text'; content: string }
  | { type: 'hotspot'; content: string; regionId: string };

type HotspotContext =
  | {
    type: 'EMAIL';
    sender?: BodyNode[];
    subject?: string;
    avatarUrl?: string;
  }
  | {
    type: 'BROWSER';       // barra de endereço + página
    addressBar?: BodyNode[]
    pageTitle?: string;
    isHttps?: boolean;    // exibe cadeado verde ou aviso "Não seguro"
    favicon?: string;
  }
  | {
    type: 'CHAT';
    sender?: string;
    platform?: 'whatsapp' | 'telegram' | 'sms';
    avatarUrl?: string;
  }

export interface HotspotData {
  feedbackError?: string;
  requiredSelections?: number;
  allowMultiple?: boolean;
  context: HotspotContext;
  body: BodyNode[];
  regions: HotspotRegion[];
}

export type MissionBlock =
  | { id: string; type: 'INFO'; data: InfoData }
  | { id: string; type: 'QUIZ'; data: QuizData }
  | { id: string; type: 'HOTSPOT'; data: HotspotData }
  | { id: string; type: 'INPUT'; data: InputData }
  | { id: string; type: 'MATCHING'; data: MatchingData }
  | { id: string; type: 'SORTING'; data: SortingData }
  | { id: string; type: 'CLASSIFICATION'; data: ClassificationData }
  | { id: string; type: 'SUMMARY'; data: SummaryData }
  | { id: string; type: 'SCENARIO_QUIZ', data: ScenarioQuizData }

export class MissionContent extends VO<MissionBlock[]> {
  static readonly ERROR_MISSION_CONTENT_MUST_BE_NON_EMPTY_LIST = "MISSION_CONTENT_MUST_BE_NON_EMPTY_LIST";
  static readonly ERROR_BLOCK_MISSING_ID_OR_TYPE = "BLOCK_MISSING_ID_OR_TYPE";
  static readonly ERROR_QUIZ_MISSING_CORRECT_OPTION = "QUIZ_MISSING_CORRECT_OPTION";
  static readonly ERROR_QUIZ_NEEDS_TWO_OPTIONS = "QUIZ_NEEDS_TWO_OPTIONS";
  static readonly ERROR_HOTSPOT_INVALID_STRUCTURE = "ERROR_HOTSPOT_INVALID_STRUCTURE";
  static readonly ERROR_HOTSPOT_NEEDS_REGIONS = "ERROR_HOTSPOT_NEEDS_REGIONS";
  static readonly ERROR_INPUT_MISSING_VALIDATION = "INPUT_MISSING_VALIDATION";
  static readonly ERROR_HOTSPOT_REGION_MISSING_ID = "ERROR_HOTSPOT_REGION_MISSING_ID";
  static readonly ERROR_SUMMARY_MISSING_REQUIRED_FIELDS = "SUMMARY_MISSING_REQUIRED_FIELDS";

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

      switch (block.type) {
        case 'MATCHING': {
          const data = block.data as Partial<MatchingData>;
          if (!Array.isArray(data.pairs) || data.pairs.length < 2) {
            return Result.fail("MATCHING_NEEDS_AT_LEAST_TWO_PAIRS");
          }
          break;
        }
        case 'SORTING': {
          const data = block.data as Partial<SortingData>;
          if (!Array.isArray(data.items) || !Array.isArray(data.correctOrder)) {
            return Result.fail("SORTING_INVALID_STRUCTURE");
          }
          break;
        }
        case 'QUIZ': {
          const quiz = block.data as Partial<QuizData>;
          if (!quiz.correctOptionId) {
            return Result.fail(MissionContent.ERROR_QUIZ_MISSING_CORRECT_OPTION);
          }
          if (!Array.isArray(quiz.options) || quiz.options.length < 2) {
            return Result.fail(MissionContent.ERROR_QUIZ_NEEDS_TWO_OPTIONS);
          }
          break;
        }
        case 'INPUT': {
          const inputData = block.data as Partial<InputData>;
          if (!inputData.validation || !inputData.validation.expectedValue) {
            return Result.fail(MissionContent.ERROR_INPUT_MISSING_VALIDATION);
          }
          break;
        }
        case 'HOTSPOT': {
          const hotspot = block.data as Partial<HotspotData>;
          if (!hotspot.context || !hotspot.context.type) {
            return Result.fail(MissionContent.ERROR_HOTSPOT_INVALID_STRUCTURE);
          }
          if (!Array.isArray(hotspot.regions) || hotspot.regions.length === 0) {
            return Result.fail(MissionContent.ERROR_HOTSPOT_NEEDS_REGIONS);
          }
          const invalidRegion = hotspot.regions.find(r => !r.id || typeof r.id !== 'string');
          if (invalidRegion) {
            return Result.fail(MissionContent.ERROR_HOTSPOT_REGION_MISSING_ID);
          }
          break;
        }
        case 'CLASSIFICATION': {
          const data = block.data as Partial<ClassificationData>;
          if (!Array.isArray(data.categories) || data.categories.length < 2) {
            return Result.fail("CLASSIFICATION_NEEDS_AT_LEAST_TWO_CATEGORIES");
          }
          if (!Array.isArray(data.items) || data.items.length === 0) {
            return Result.fail("CLASSIFICATION_NEEDS_ITEMS");
          }
          const categoryIds = data.categories.map(c => c.id);
          const invalidItem = data.items.find(item => !categoryIds.includes(item.categoryId));
          if (invalidItem) {
            return Result.fail("CLASSIFICATION_ITEM_HAS_INVALID_CATEGORY_ID");
          }
          break;
        }
        case 'SUMMARY': {
          const data = block.data as Partial<SummaryData>;
          if (!data.title || !data.summary || !data.keyTakeaway) {
            return Result.fail(MissionContent.ERROR_SUMMARY_MISSING_REQUIRED_FIELDS);
          }
          break;
        }
        case 'SCENARIO_QUIZ': {
          const data = block.data as Partial<ScenarioQuizData>;
          if (!Array.isArray(data.questions) || data.questions.length === 0) {
            return Result.fail("SCENARIO_QUIZ_NEEDS_QUESTIONS");
          }

          if (typeof data.summary?.passingScore !== 'number') {
            return Result.fail("SCENARIO_QUIZ_MISSING_PASSING_SCORE");
          }

          const invalidQuestion = data.questions.find(
            q => !q.id || !q.correctOptionId || !Array.isArray(q.options) || q.options.length < 2
          );
          if (invalidQuestion) {
            return Result.fail("SCENARIO_QUIZ_QUESTION_INVALID_STRUCTURE");
          }
          break;
        }
        default:
          break;
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
    return this.value.some(b => ['INPUT', 'HOTSPOT', 'QUIZ', 'MATCHING', 'SORTING', 'CLASSIFICATION', 'SCENARIO_QUIZ'].includes(b.type));
  }

  validateUserAnswers(answers: Record<string, any>): { isValid: boolean, failedBlockIds: string[] } {
    const failedBlockIds: string[] = [];

    for (const block of this.value) {
      if (block.type === 'INFO' || block.type === 'SUMMARY') continue;

      const userAnswer = answers[block.id];

      if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
        failedBlockIds.push(block.id);
        continue;
      }
      
      if (typeof userAnswer === 'object' && !Array.isArray(userAnswer) && Object.keys(userAnswer).length === 0) {
        failedBlockIds.push(block.id);
        continue;
     }

      switch (block.type) {
        case 'QUIZ': {
          if (userAnswer !== block.data.correctOptionId) {
            failedBlockIds.push(block.id);
          }
          break;
        }

        case 'INPUT': {
          const validation = block.data.validation;
          const userText = String(userAnswer).trim();
          const expectedText = validation.expectedValue.trim();

          switch (validation.type) {
            case 'EXACT_MATCH': {
              const isCaseSensitive = (validation as any).isCaseSensitive ?? false;
              if (isCaseSensitive) {
                if (userText !== expectedText) failedBlockIds.push(block.id);
              } else {
                if (userText.toLowerCase() !== expectedText.toLowerCase()) failedBlockIds.push(block.id);
              }
              break;
            }
            case 'CONTAINS': {
              if (!userText.includes(expectedText)) failedBlockIds.push(block.id);
              break;
            }
            case 'REGEX': {
              try {
                const regex = new RegExp(expectedText);
                if (!regex.test(userText)) failedBlockIds.push(block.id);
              } catch (e) {
                console.error(`Invalid Regex in block ${block.id}`);
                failedBlockIds.push(block.id);
              }
              break;
            }
          }
          break;
        }

        case 'HOTSPOT': {
          if (!Array.isArray(userAnswer)) {
            failedBlockIds.push(block.id);
            break;
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
          break;
        }

        case 'MATCHING': {
          const isCorrect = block.data.pairs.every(pair => userAnswer[pair.leftId] === pair.rightId);
          if (!isCorrect) failedBlockIds.push(block.id);
          break;
        }

        case 'SORTING': {
          const isCorrect = Array.isArray(userAnswer) &&
            userAnswer.length === block.data.correctOrder.length &&
            userAnswer.every((id, idx) => id === block.data.correctOrder[idx]);
          if (!isCorrect) failedBlockIds.push(block.id);
          break;
        }

        case 'CLASSIFICATION': {
          if (typeof userAnswer !== 'object' || Array.isArray(userAnswer)) {
            failedBlockIds.push(block.id);
            break;
          }

          const data = block.data as ClassificationData;
          const answeredItemIds = Object.keys(userAnswer);
          if (answeredItemIds.length !== data.items.length) {
            failedBlockIds.push(block.id);
            break;
          }

          const isAllCorrect = data.items.every(item => {
            return userAnswer[item.id] === item.categoryId;
          });

          if (!isAllCorrect) {
            failedBlockIds.push(block.id);
          }
          break;
        }

        case 'SCENARIO_QUIZ': {
          const data = block.data as ScenarioQuizData;

          if (typeof userAnswer !== 'object' || Array.isArray(userAnswer)) {
            failedBlockIds.push(block.id);
            break;
          }

          const correctAnswers = data.questions.filter(
            q => userAnswer[q.id] === q.correctOptionId
          ).length;

          const passed = correctAnswers >= data.summary.passingScore;

          if (!passed) {
            failedBlockIds.push(block.id);
          }
          break;
        }

        default:
          break;
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

    if (['QUIZ', 'INPUT', 'MATCHING', 'SORTING', 'HOTSPOT', 'CLASSIFICATION'].includes(block.type)) {
      return (block.data as any).feedbackError || "INCORRECT_ANSWER";
    }

    if (block.type === 'SCENARIO_QUIZ') {
      return (block.data as ScenarioQuizData).summary.resultMessages.needsWork || "YOU_DID_NOT_REACH_THE_MINIMUM_PASSING_SCORE";
    }
    return "INCORRECT_ANSWER";
  }

  getUserActionAsText(blockId: string, answer: any): string {
    const block = this.findBlockById(blockId);
    if (!block) return String(answer);

    try {
      switch (block.type) {
        case 'QUIZ':
          const opt = (block.data as any).options?.find((opt: any) => opt.id === answer);
          return opt ? opt.text : "No answer";

        case 'MATCHING':
          return this.translateMatching(block.data, answer);

        case 'SORTING':
          return this.translateSorting(block.data, answer);

        case 'CLASSIFICATION':
          return this.translateClassification(block.data, answer);

        case 'SCENARIO_QUIZ':
          return this.translateScenarioQuiz(block.data, answer);

        case 'INPUT':
          return String(answer);

        default:
          return JSON.stringify(answer);
      }
    } catch (error) {
      console.error(`Error translating block action ${blockId}:`, error);
      return "Action not identified.";
    }
  }
  
  // --- Auxiliary Translation Functions ---

  private translateMatching(data: any, answer: Record<string, string>): string {
    if (typeof answer !== 'object' || Array.isArray(answer)) return "INVALID_ANSWER";
  
    return data.pairs
      ?.map((pair: any) => {
        const selectedRightId = answer[pair.leftId]; 
        if (selectedRightId === pair.rightId) return null;

        const selectedRight = data.pairs.find((p: any) => p.rightId === selectedRightId);
        const selectedText = selectedRight?.rightText ?? `unknown option (${selectedRightId})`;

        return `Matched "${pair.leftText}" with "${selectedText}"`;
      })
      .filter(Boolean)
      .join(' | ') ?? "INVALID_ANSWER";
  }

  private translateClassification(data: any, answer: Record<string, string>): string {
    if (typeof answer !== 'object' || Array.isArray(answer)) return "INVALID_CLASSIFICATION";
  
    return data.items
      ?.map((item: any) => {
        const selectedCatId = answer[item.id];
        const selectedCat = data.categories?.find((c: any) => c.id === selectedCatId);
        const correctCat = data.categories?.find((c: any) => c.id === item.categoryId);
        const isCorrect = selectedCatId === item.categoryId;
        if (isCorrect) return null;
        return `"${item.text}" classified as "${selectedCat?.name ?? selectedCatId}" (correct: "${correctCat?.name ?? item.categoryId}")`;
      })
      .filter(Boolean)
      .join(' | ') ?? "INVALID_CLASSIFICATION";
  }

  private translateSorting(data: any, answer: string[]): string {
    if (!Array.isArray(answer)) return "INVALID_SORTING";

    const sortedTexts = answer.map(itemId => {
      const itemDef = data.items?.find((i: any) => i.id === itemId);
      return itemDef ? itemDef.text : itemId;
    });

    return `Sorted in the following order: ${sortedTexts.join(' -> ')}`;
  }

  private translateScenarioQuiz(data: any, answer: Record<string, string>): string {
    if (typeof answer !== 'object' || Array.isArray(answer)) return "INVALID_SCENARIO";
  
    const wrongQuestions = data.questions?.filter(
      (q: any) => answer[q.id] !== q.correctOptionId
    ) ?? [];
  
    if (wrongQuestions.length === 0) return "Answered all scenario questions correctly";
  
    return wrongQuestions.map((q: any) => {
      const selectedOpt = q.options?.find((o: any) => o.id === answer[q.id]);
      const correctOpt = q.options?.find((o: any) => o.id === q.correctOptionId);
      return `"${q.question}" → selected "${selectedOpt?.text ?? answer[q.id]}" (correct: "${correctOpt?.text ?? q.correctOptionId}")`;
    }).join(' | ');
  }

  get blocks(): MissionBlock[] {
    return this.value;
  } 
}


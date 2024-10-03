import { FrequentQuestionDto } from './../../frequent-question/dtos/frequent-question-dtos';
export class FrequentQuestionCategoryDto {
  id: number;
  isActive: boolean;
  name: string;
  description: string;
  frequentQuestions?: FrequentQuestionDto[] = [];

  constructor() {
  }
}

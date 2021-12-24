import { RefObject } from "react";

export interface QuestionProps {
  question: string;
  answer: string;
}

export interface OverlayProps {
  onClose: () => void;
  question: QuestionProps | undefined;
  input: RefObject<HTMLInputElement>;
}

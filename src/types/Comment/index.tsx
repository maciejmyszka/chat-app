export interface CommentType {
  id: number;
  username: string;
  image: string;
  date: string;
  counter: number;
  text: string;
  replies?: CommentType[];
}

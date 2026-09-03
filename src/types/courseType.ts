/** @format */
export interface ICourse {
  title: string;
  description: string;
  weeks: number;
  tuition: number;
  minimumSkill: 'beginner' | 'intermediate' | 'advanced';
  scholarshipsAvailable?: boolean;
  bootcamp: {};
  user?: string;
  createdAt?: Date;
}

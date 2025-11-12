export type CourseName = 'Starters' | 'Mains' | 'Desserts' | 'Sides' | 'Drinks';

export interface MenuItem {
  id: string;
  name: string;
  course: CourseName;
  price: number;
  description?: string;
}

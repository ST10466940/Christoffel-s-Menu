import { MenuItem, CourseName } from '../types';

export type AveragePriceByCourse = Record<CourseName, number | null>;

export const calculateAveragePricesByCourse = (
  menuItems: MenuItem[],
  courses: CourseName[],
): AveragePriceByCourse => {
  const averages: AveragePriceByCourse = courses.reduce((acc, course) => {
    acc[course] = null;
    return acc;
  }, {} as AveragePriceByCourse);

  courses.forEach((course) => {
    const courseItems = menuItems.filter((item) => item.course === course);
    if (courseItems.length > 0) {
      const total = courseItems.reduce((sum, item) => sum + item.price, 0);
      averages[course] = Number((total / courseItems.length).toFixed(2));
    }
  });

  return averages;
};

export const getUniqueCourses = (menuItems: MenuItem[], allCourses: CourseName[]): CourseName[] => {
  const present = new Set<CourseName>();
  menuItems.forEach((item) => present.add(item.course));
  return allCourses.filter((course) => present.has(course));
};

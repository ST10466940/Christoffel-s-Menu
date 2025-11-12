import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { CourseName, MenuItem } from '../types';
import { CourseSelector } from '../components/CourseSelector';
import { MenuList } from '../components/MenuList';
import { getUniqueCourses } from '../utils/menuAnalytics';

type FilterScreenProps = {
  menuItems: MenuItem[];
  courses: CourseName[];
};

export const FilterScreen: React.FC<FilterScreenProps> = ({ menuItems, courses }) => {
  const availableCourses = useMemo(() => getUniqueCourses(menuItems, courses), [menuItems, courses]);
  const [selectedCourse, setSelectedCourse] = useState<CourseName | 'All'>(availableCourses[0] ?? 'All');

  const filteredItems = useMemo(() => {
    if (selectedCourse === 'All') {
      return menuItems;
    }
    return menuItems.filter((item) => item.course === selectedCourse);
  }, [menuItems, selectedCourse]);

  const showAllToggle = availableCourses.length > 1;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Guest Menu Explorer</Text>
      <Text style={styles.sectionTitle}>Filter by Course</Text>
      {availableCourses.length > 0 ? (
        <CourseSelector
          courses={availableCourses}
          selectedCourse={selectedCourse}
          onSelect={setSelectedCourse}
          includeAll={showAllToggle}
        />
      ) : (
        <Text style={styles.emptyText}>No menu items available yet.</Text>
      )}
      <MenuList
        menuItems={filteredItems}
        emptyMessage="No dishes match this course. Try another selection."
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
    color: '#1f2933',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1f2933',
  },
  emptyText: {
    color: '#52606d',
    textAlign: 'center',
    marginVertical: 24,
  },
});

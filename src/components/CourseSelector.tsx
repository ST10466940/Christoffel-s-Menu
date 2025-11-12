import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CourseName } from '../types';

type CourseSelectorProps = {
  courses: CourseName[];
  selectedCourse: CourseName | 'All';
  onSelect: (course: CourseName | 'All') => void;
  includeAll?: boolean;
};

export const CourseSelector: React.FC<CourseSelectorProps> = ({
  courses,
  selectedCourse,
  onSelect,
  includeAll = false,
}) => {
  const options: (CourseName | 'All')[] = includeAll ? ['All', ...courses] : courses;

  return (
    <View style={styles.container}>
      {options.map((course) => {
        const isSelected = course === selectedCourse;
        return (
          <TouchableOpacity
            key={course}
            style={[styles.chip, isSelected && styles.chipSelected]}
            onPress={() => onSelect(course)}
          >
            <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{course}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#f1f1f5',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chipSelected: {
    backgroundColor: '#2f80ed',
  },
  chipText: {
    color: '#333',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#fff',
  },
});

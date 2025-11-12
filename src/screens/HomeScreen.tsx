import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MenuItem, CourseName } from '../types';
import { calculateAveragePricesByCourse } from '../utils/menuAnalytics';
import { MenuList } from '../components/MenuList';

type HomeScreenProps = {
  menuItems: MenuItem[];
  courses: CourseName[];
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ menuItems, courses }) => {
  const averages = calculateAveragePricesByCourse(menuItems, courses);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Christoffel's Menu</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Average Price by Course</Text>
        {courses.map((course) => (
          <View key={course} style={styles.averageRow}>
            <Text style={styles.courseLabel}>{course}</Text>
            <Text style={styles.averageValue}>
              {averages[course] !== null ? `$${averages[course]?.toFixed(2)}` : '—'}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Complete Menu</Text>
        <MenuList menuItems={menuItems} emptyMessage="No dishes have been added yet." />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1f2933',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1f2933',
  },
  averageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d2d6dc',
  },
  courseLabel: {
    fontSize: 16,
    color: '#3e4c59',
  },
  averageValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#102a43',
  },
});

import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { CourseName, MenuItem } from '../types';
import { CourseSelector } from '../components/CourseSelector';
import { MenuList } from '../components/MenuList';

type MenuManagementScreenProps = {
  menuItems: MenuItem[];
  courses: CourseName[];
  onAddItem: (item: Omit<MenuItem, 'id'>) => void;
  onRemoveItem: (id: string) => void;
};

export const MenuManagementScreen: React.FC<MenuManagementScreenProps> = ({
  menuItems,
  courses,
  onAddItem,
  onRemoveItem,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<CourseName>(courses[0]);
  const [price, setPrice] = useState('');

  const handleAddItem = () => {
    if (!name.trim()) {
      Alert.alert('Add Menu Item', 'Please enter a name for the dish.');
      return;
    }

    const parsedPrice = Number(price);
    if (!price || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert('Add Menu Item', 'Please enter a valid price.');
      return;
    }

    onAddItem({
      name: name.trim(),
      description: description.trim() ? description.trim() : undefined,
      course,
      price: parsedPrice,
    });

    setName('');
    setDescription('');
    setPrice('');
  };

  const sortedMenu = useMemo(
    () =>
      [...menuItems].sort((a, b) => {
        if (a.course === b.course) {
          return a.name.localeCompare(b.name);
        }
        return courses.indexOf(a.course) - courses.indexOf(b.course);
      }),
    [menuItems, courses],
  );

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Chef's Menu Management</Text>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Add a New Dish</Text>
          <TextInput
            placeholder="Dish name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Description (optional)"
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.multiline]}
            multiline
          />
          <Text style={styles.selectorLabel}>Course</Text>
          <CourseSelector courses={courses} selectedCourse={course} onSelect={(value) => setCourse(value as CourseName)} />
          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            style={styles.input}
            keyboardType="decimal-pad"
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>Add Dish</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Current Menu</Text>
          <MenuList
            menuItems={sortedMenu}
            emptyMessage="No dishes yet. Add your first one above!"
            onRemoveItem={onRemoveItem}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 24,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1f2933',
  },
  formSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1f2933',
  },
  selectorLabel: {
    fontSize: 14,
    color: '#52606d',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d2d6dc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  multiline: {
    minHeight: 70,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#2f80ed',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

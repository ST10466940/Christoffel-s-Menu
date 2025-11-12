import React, { useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CourseName, MenuItem } from './src/types';
import { defaultMenuItems } from './src/data/defaultMenu';
import { HomeScreen } from './src/screens/HomeScreen';
import { MenuManagementScreen } from './src/screens/MenuManagementScreen';
import { FilterScreen } from './src/screens/FilterScreen';

const COURSES: CourseName[] = ['Starters', 'Mains', 'Desserts', 'Sides', 'Drinks'];

type ScreenKey = 'home' | 'manage' | 'filter';

const navigationLabels: Record<ScreenKey, string> = {
  home: 'Home',
  manage: 'Chef Menu Management',
  filter: 'Guest Filter',
};

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(defaultMenuItems);
  const [currentScreen, setCurrentScreen] = useState<ScreenKey>('home');

  const handleAddItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    setMenuItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const screenContent = useMemo(() => {
    switch (currentScreen) {
      case 'manage':
        return (
          <MenuManagementScreen
            menuItems={menuItems}
            courses={COURSES}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
          />
        );
      case 'filter':
        return <FilterScreen menuItems={menuItems} courses={COURSES} />;
      case 'home':
      default:
        return <HomeScreen menuItems={menuItems} courses={COURSES} />;
    }
  }, [currentScreen, menuItems]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.appContainer}>
        <View style={styles.navBar}>
          {(Object.keys(navigationLabels) as ScreenKey[]).map((key) => {
            const isActive = currentScreen === key;
            return (
              <TouchableOpacity
                key={key}
                style={[styles.navButton, isActive && styles.navButtonActive]}
                onPress={() => setCurrentScreen(key)}
              >
                <Text style={[styles.navButtonText, isActive && styles.navButtonTextActive]}>
                  {navigationLabels[key]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.screenContainer}>{screenContent}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d2d6dc',
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#e4e7eb',
  },
  navButtonActive: {
    backgroundColor: '#2f80ed',
  },
  navButtonText: {
    color: '#1f2933',
    fontWeight: '600',
  },
  navButtonTextActive: {
    color: '#fff',
  },
  screenContainer: {
    flex: 1,
  },
});

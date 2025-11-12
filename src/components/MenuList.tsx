import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MenuItem } from '../types';

type MenuListProps = {
  menuItems: MenuItem[];
  emptyMessage?: string;
  onRemoveItem?: (id: string) => void;
};

export const MenuList: React.FC<MenuListProps> = ({ menuItems, emptyMessage, onRemoveItem }) => {
  if (menuItems.length === 0) {
    return <Text style={styles.emptyText}>{emptyMessage ?? 'No menu items available.'}</Text>;
  }

  return (
    <View style={styles.listContent}>
      {menuItems.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </View>
          <Text style={styles.meta}>{item.course}</Text>
          {item.description ? <Text style={styles.description}>{item.description}</Text> : null}
          {onRemoveItem ? (
            <TouchableOpacity style={styles.removeButton} onPress={() => onRemoveItem(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2933',
  },
  meta: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  removeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#f56565',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 24,
  },
});

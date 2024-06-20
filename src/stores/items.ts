import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Session } from '@supabase/supabase-js';
import type { PantryItem } from '@/types/items';
import { addItem, deleteItem, getItems, updateItem } from '@/services/item-service';

export const useItemStore = defineStore('items', {
  state: () => ({
    items: [] as PantryItem[]
  }),
  getters: {},
  actions: {
    async getItems() {
      this.items = await getItems();
    },
    async updateItem(itemId: number, updatedItem: PantryItem) {
      updateItem(itemId, updatedItem);
      const index = this.items.findIndex((item) => item.id === itemId);
      if (index < 0) {
        throw new Error('Item id not valid, item not found in array');
      }
      this.items[index] = updatedItem;
    },
    async addItem(item: PantryItem) {
      try {
        this.items.push(item);
        const newItem = await addItem(item);
        const index = this.items.findIndex((i) => i.id === item.id);
        if (index < 0) {
          throw new Error('Item id not valid, item not found in array');
        }
        this.items[index] = newItem;
      } catch (e) {
        console.error(e);
      }
    },
    async deleteItem(itemId: number) {
      deleteItem(itemId);
      this.items = this.items.filter((item) => item.id !== itemId);
    }
  },
  persist: true
});

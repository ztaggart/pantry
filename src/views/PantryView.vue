<script setup lang="ts">
import type {
  DataTableRowContextMenuEvent,
  DataTableRowEditCancelEvent,
  DataTableRowEditSaveEvent
} from 'primevue/datatable';
import { onMounted, ref } from 'vue';
import type { PantryItem } from '@/types/items';
import { useItemStore } from '../stores/items';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

const editingRows = ref<any[]>([]);
const itemStore = useItemStore();

onMounted(async () => {
  await itemStore.getItems();
});

const menuItems = ref([
  {
    label: 'Delete item',
    icon: 'pi pi-times',
    command: () => deleteItems(selectedProducts.value)
  }
]);
const menu = ref();
const { items } = storeToRefs(itemStore);
const addingItem = ref(false);
const selectedProducts = ref<PantryItem[]>([]);

function addFillerItem() {
  if (addingItem.value) {
    return;
  }
  const filler: PantryItem = {
    id: -1,
    name: '',
    quantity: '',
    location: '',
    added: false
  };
  // items.value.unshift(filler);
  editingRows.value = [filler];
  addingItem.value = true;
}

function showContextMenu(event: DataTableRowContextMenuEvent) {
  selectedProducts.value = [event.data];
  menu.value.show(event.originalEvent);
}

function onRowEditSave(event: DataTableRowEditSaveEvent) {
  let { newData, data } = event;
  if (!hasEmptyData(newData)) {
    if (!data.added) {
      saveNewItem(newData);
    } else {
      updateItem(newData);
    }
  } else {
    alert('Row has empty data');
    editingRows.value.push(data);
  }
}

async function saveNewItem(item: PantryItem) {
  await itemStore.addItem(item);
  addingItem.value = false;
}

async function updateItem(item: PantryItem) {
  await itemStore.updateItem(item.id, item);
}

async function deleteItems(items: PantryItem[]) {
  await Promise.all(items.map((item) => itemStore.deleteItem(item.id)));
}

function onRowEditCancel(event: DataTableRowEditCancelEvent) {
  let { data, index } = event;
  // if (!items.value) {
  //   return;
  // }
  if (!data.added) {
    // items.value.splice(index, 1);
    addingItem.value = false;
  }
}

function hasEmptyData(data: PantryItem) {
  let key: keyof PantryItem;
  for (key in data) {
    if (data[key] === '') {
      return true;
    }
  }
  return false;
}
</script>
<template>
  <div class="pantry-container">
    <h1>Pantry</h1>
    <div class="pantry-table-container">
      <div class="table-tools">
        <div class="pantry-actions">
          <Button @click="addFillerItem">Add Item</Button>
          <Button severity="secondary">Undo</Button>
          <Button severity="secondary">Redo</Button>
        </div>
        <InputText placeholder="Search" />
      </div>
      <ContextMenu ref="menu" :model="menuItems" />
      <DataTable
        v-model:selection="selectedProducts"
        v-model:editingRows="editingRows"
        selectionMode="multiple"
        @row-contextmenu="showContextMenu"
        @row-edit-save="onRowEditSave"
        @row-edit-cancel="onRowEditCancel"
        :value="
          addingItem
            ? [
                {
                  id: -1,
                  name: '',
                  quantity: '',
                  location: '',
                  added: false
                },
                ...items
              ]
            : items
        "
        editMode="row"
        resizableColumns
        columnResizeMode="fit"
        :metaKeySelection="true"
        dataKey="id"
        style="user-select: none; width: 100%"
        :showGridlines="true"
        contextMenu
      >
        <Column field="name" header="Name" style=""
          ><template #editor="{ data, field }">
            <InputText v-model="data[field]" class="input" /> </template
        ></Column>
        <Column field="quantity" header="Quantity" style=""
          ><template #editor="{ data, field }">
            <InputText v-model="data[field]" class="input" /> </template
        ></Column>
        <Column field="location" header="Location" style=""
          ><template #editor="{ data, field }">
            <InputText v-model="data[field]" style="width: 100%" class="input" /> </template
        ></Column>
        <Column :rowEditor="true" class="input" style="width: 10%"></Column>
      </DataTable>
    </div>
  </div>
</template>
<style scoped>
.pantry-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pantry-table-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 70%;
}

.table-tools {
  display: flex;
  justify-content: space-between;
}

.pantry-actions {
  display: flex;
  gap: 1em;
}

.search {
  border-radius: 50px;
}

.input {
  width: 100%;
}
</style>
../stores/items

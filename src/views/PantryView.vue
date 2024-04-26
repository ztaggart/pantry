<script setup lang="ts">
import type {
  DataTableRowClickEvent,
  DataTableRowContextMenuEvent,
  DataTableRowEditSaveEvent
} from 'primevue/datatable';
import { getItems } from '../services/item-service';
import { onMounted } from 'vue';
import { ref } from 'vue';
import type { PantryItem } from '@/types/items';

onMounted(() => {
  getItems().then((data) => (items.value = data));
});

const editingRows = ref<any[]>([]);

const menuItems = ref([
  {
    label: 'Test',
    icon: 'pi pi-language'
  }
]);
const menu = ref();

const items = ref<PantryItem[]>();
const addingItem = ref(false);
const selectedProducts = ref<any[]>();

function addFillerItem() {
  if (addingItem.value || !items.value) {
    return;
  }
  const filler: PantryItem = {
    id: items.value.length,
    name: '',
    quantity: '',
    location: ''
  };
  items.value.unshift(filler);
  editingRows.value = [filler];
  addingItem.value = true;
}

function showContextMenu(event: DataTableRowContextMenuEvent) {
  selectedProducts.value = [event.data];
  menu.value.show(event.originalEvent);
}

function onRowClick(event: DataTableRowClickEvent) {
  const originalPointerEvent = event.originalEvent as PointerEvent;
  if (
    selectedProducts.value?.includes(event.data) &&
    !(event.originalEvent as PointerEvent).ctrlKey
  ) {
    editingRows.value = [event.data];
  } else {
    editingRows.value = [];
  }
}

function onRowEditSave(event: DataTableRowEditSaveEvent) {
  let { newData, index } = event;
  if (!items.value) {
    return;
  }
  if (!hasEmptyData(newData)) {
    items.value[index] = newData;
  } else {
    items.value.shift();
  }
  addingItem.value = false;
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
        @row-click="onRowClick"
        @row-contextmenu="showContextMenu"
        @row-edit-save="onRowEditSave"
        :value="items"
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

<script setup lang="ts">
import type {
  DataTableRowContextMenuEvent,
  DataTableRowDoubleClickEvent,
  DataTableRowEditSaveEvent
} from 'primevue/datatable';
import { onMounted, ref, toRaw } from 'vue';
import type { PantryItem } from '@/types/items';
import { useItemStore } from '../stores/items';
import { storeToRefs } from 'pinia';

const itemStore = useItemStore();
const { items } = storeToRefs(itemStore);

onMounted(async () => {
  await itemStore.getItems();
});

const menuItems = ref([
  {
    label: 'Delete item',
    icon: 'pi pi-trash',
    command: deleteSelectedItems
  }
]);
const menu = ref();

const addingItem = ref(false);
const itemName = ref('');
const itemLocation = ref('');
const itemQuantity = ref('');
const selectedRows = ref<PantryItem[]>([]);
const editingRows = ref<any[]>([]);

function showAddingModal() {
  addingItem.value = true;
}

function showContextMenu(event: DataTableRowContextMenuEvent) {
  selectedRows.value = [event.data];
  menu.value.show(event.originalEvent);
}

function onRowEditSave(event: DataTableRowEditSaveEvent) {
  let { newData, data } = event;
  if (!hasEmptyData(newData)) {
    updateItem(newData);
  } else {
    alert('Row has empty data');
    editingRows.value.push(data);
  }
}

function hasEmptyData(data: PantryItem) {
  console.log(data);
  let key: keyof PantryItem;
  for (key in data) {
    if (data[key] === '') {
      return true;
    }
  }
  return false;
}

function onRowDoubleClick(event: DataTableRowDoubleClickEvent) {
  selectedRows.value = selectedRows.value.filter((row) => row.id !== event.data.id);
  editingRows.value = [event.data];
}

function saveNewItem() {
  const item = {
    id: new Date().getTime(),
    name: itemName.value,
    quantity: itemQuantity.value,
    location: itemLocation.value
  };
  if (hasEmptyData(item)) {
    alert('Row has empty data');
    return;
  }
  itemStore.addItem(item);
  addingItem.value = false;
  itemLocation.value = '';
  itemName.value = '';
  itemQuantity.value = '';
}

async function updateItem(item: PantryItem) {
  await itemStore.updateItem(item.id, item);
}

function deleteSelectedItems() {
  deleteItems(selectedRows.value);
}

async function deleteItems(items: PantryItem[]) {
  await Promise.all(items.map((item) => itemStore.deleteItem(item.id)));
}
</script>
<template>
  <div class="pantry-container">
    <h1>Pantry</h1>
    <div class="pantry-table-container">
      <div class="table-tools">
        <div class="pantry-actions">
          <Button @click="showAddingModal">Add Item</Button>
          <Button severity="danger" @click="deleteSelectedItems">Delete Items</Button>
        </div>
        <InputText placeholder="Search" size="small" />
      </div>
      <Dialog
        v-model:visible="addingItem"
        modal
        header="Add Pantry Item"
        :style="{ width: '25rem' }"
      >
        <div class="add-item-container">
          <div class="attribute-container">
            <label class="attribute-label"> Name </label>
            <InputText class="attribute-input" v-model="itemName"></InputText>
          </div>
          <div class="attribute-container">
            <label class="attribute-label"> Quantity </label>
            <InputText class="attribute-input" v-model="itemQuantity"></InputText>
          </div>
          <div class="attribute-container">
            <label class="attribute-label"> Location </label>
            <InputText class="attribute-input" v-model="itemLocation"></InputText>
          </div>
          <Button class="save-btn" @click="saveNewItem">Save</Button>
        </div>
      </Dialog>
      <ContextMenu ref="menu" :model="menuItems" />
      <DataTable
        v-model:selection="selectedRows"
        v-model:editingRows="editingRows"
        selectionMode="multiple"
        @row-contextmenu="showContextMenu"
        @row-edit-save="onRowEditSave"
        @row-dblclick="onRowDoubleClick"
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
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="name" header="Name" style=""
          ><template #editor="{ data, field }">
            <InputText v-model="data[field]" class="edit-input" /> </template
        ></Column>
        <Column field="quantity" header="Quantity" style=""
          ><template #editor="{ data, field }">
            <InputText v-model="data[field]" class="edit-input" /> </template
        ></Column>
        <Column field="location" header="Location" style=""
          ><template #editor="{ data, field }">
            <InputText v-model="data[field]" style="width: 100%" class="edit-input" /> </template
        ></Column>
        <Column :rowEditor="true" class="edit-input" style="width: 10%"> </Column>
        <Column :rowEditor="true" class="edit-input" style="width: 10%">
          <template #body="{ data }">
            <Button
              @click="() => deleteItems([toRaw(data)])"
              severity="secondary"
              text
              rounded
              icon="pi pi-trash"
            ></Button>
          </template>
        </Column>
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

.edit-input {
  width: 100%;
}

.attribute-label {
  width: 6rem;
}

.attribute-input {
  flex: 1 1 auto;
}

.attribute-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.add-item-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.save-btn {
  margin: auto;
}
</style>

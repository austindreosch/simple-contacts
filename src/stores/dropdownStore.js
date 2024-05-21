import { reactive } from 'vue';

export const dropdownStore = reactive({
  openDropdownId: null,
  setOpenDropdown(id) {
    this.openDropdownId = id;
  },
  clearOpenDropdown() {
    this.openDropdownId = null;
  }
});

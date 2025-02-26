<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar class="bg-darkgreen">
        <q-space />
        <q-input
          filled
          v-model="searchQuery"
          label="Search"
          debounce="300"
          color="white"
          text-color="white"
          dense
          placeholder="Search..."
          :style="{ 'background-color': '#f0f0f0' }"
          class="q-mb-md q-pa-xs q-px-md-none"
        />
        <q-btn
          flat
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleDrawer"
          class="text-white"
        />
      </q-toolbar>
    </q-header>

    <!-- Drawer -->
    <q-drawer
      v-model="drawerOpen"
      side="right"
      bordered
      class="no-scrollbar fixed-height"
    >
      <q-list style="height: 100%">
        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section> Logout </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Hauptinhalt -->
    <q-page-container>
      <div class="matrix-container">
        <!-- Matrix mit horizontaler und vertikaler Scrollbar -->
        <div class="q-pa-md">
          <table class="data-matrix q-table-responsive">
            <thead class="fixed-header ">
              <tr>
                <th
                  v-for="(title, index) in columnTitles"
                  :key="index"
                  :style="{
                    width: columnWidths[index] + 'px',
                    maxWidth: '200px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }"
                >
                  <span
                    @click="sortTable(index)"
                    style="display: flex; align-items: center; cursor: pointer"
                  >
                    {{ title }}
                    <q-icon
                      :name="
                        sortAsc && sortColumn === index
                          ? 'arrow_upward'
                          : sortColumn === index
                          ? 'arrow_downward'
                          : 'arrow_upward'
                      "
                      class="sort-icon"
                    />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in users" :key="rowIndex">
                <td>
                    {{ row.date?row.date:'14/1/2025' }}
                </td>
                <td>
                    {{row.id}}
                </td>
                <td class="text-center">
                    {{ row.totalInvestment }}
                </td>
                <td class="text-center">
                    {{ row.totalPlaytime }}
                </td>
                <td class="text-center">
                    {{ row.totalWinPayout }}
                </td>
                <td>
                    <q-input
                      v-model="row[colIndex]"
                      type="number"
                      min="0"
                      max="100"
                      dense
                      :value="row.profitSuccess"
                      hide-dropdown
                      :style="{ width: columnWidths[colIndex] + 'px' }"
                      placeholder="Enter value"
                    />
                </td>
                <td class="text-center">
                    {{ row.totalSpins }}
                </td>
                <td class="text-center">
                    {{ row.online }}
                </td>
                <td class="text-center">
                    {{ row.firstName }}
                </td>
                <td class="text-center">
                    {{ row.lastName?row.lastName:row.surname }}
                </td>
               
                <td class="text-center">
                    {{ row.dateOfBirth?row.dateOfBirth:row.dob }}
                </td>
                <td class="text-center">
                    {{ row.streetName }}
                </td>
                <td class="text-center">
                    {{ row.phone }}
                </td>
                <td class="text-center">
                    {{ row.email }}
                </td>
                <td class="text-center">
                    {{ row.confirmations.allDetailsCorrect }}
                </td>
                <td class="text-center">
                    {{ row.confirmations.beneficialOwner }}
                </td>
                <td class="text-center">
                    {{ row.confirmations.termsAndConditions }}
                </td>
                <td class="text-center">
                    {{ row.blockUser }}
                </td>
                <td>
                    <q-btn
                      flat
                      icon="delete"
                      color="negative"
                      @click="deleteUserInfo(row.id)"
                      :style="{ width: columnWidths[colIndex] + 'px' }"
                    />
                </td>
                <td v-for="(col, colIndex) in row" :key="colIndex">

                  <!-- Spezielle Behandlung für "Profit Success +/-" Spalte -->
                  <!-- <template
                    v-if="columnTitles[colIndex] === 'Profit Success +/-'"
                  >
                    <q-input
                      v-model="row[colIndex]"
                      type="number"
                      min="0"
                      max="100"
                      dense
                      hide-dropdown
                      :style="{ width: columnWidths[colIndex] + 'px' }"
                      placeholder="Enter value"
                    />
                  </template> -->
                  <!-- Block-User: Toggle-Schalter -->
                  <!-- <template v-if="columnTitles[colIndex] === 'Block - User'">
                    <q-toggle
                      v-model="row[colIndex]"
                      label="Ja / Nein"
                      :true-value="'Ja'"
                      :false-value="'Nein'"
                      color="green"
                      :style="{ width: columnWidths[colIndex] + 'px' }"
                      :label-true="true"
                      :label-false="false"
                      class="block-toggle"
                    />
                  </template> -->
                  <!-- Delete User: Mülltonnen-Icon -->
                  <!-- <template v-if="columnTitles[colIndex] === 'Delete User'">
                    <q-btn
                      flat
                      icon="delete"
                      color="negative"
                      @click="deleteUser(rowIndex)"
                      :style="{ width: columnWidths[colIndex] + 'px' }"
                    />
                  </template> -->
                  <!-- <template v-else>
                    {{ col }}
                  </template> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </q-page-container>

    <!-- Modale für Kapitel -->
    <q-dialog v-model="showModal">
      <q-card class="q-dialog-plugin">
        <q-card-section>
          <div class="q-pa-md">
            <div class="title-wrapper">
              <h6 class="title">{{ modalTitle }}</h6>
              <q-btn flat icon="close" @click="closeModal" class="close-btn" />
            </div>
            <div class="scrollable-text">
              {{ modalContent }}
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
  
  <script>
import { ref, computed, onBeforeMount,onMounted } from "vue"; // Add computed import
import { useRouter } from "vue-router";
import { useAdminStore } from "../../stores/admin";
export default {
  setup() {
    const adminStore = useAdminStore();
    const router = useRouter();
    const drawerOpen = ref(false);
    const showModal = ref(false);
    const modalTitle = ref("");
    const modalContent = ref("");
    const searchQuery = ref("");
    const columnTitles = ref([
      "Login Date",
      "Player name ID",
      "Total Investment",
      "Total Playtime",
      "Total Win / Payout",
      "Profit Success +/-",
      "Total Spins",
      "Online?",
      "First name",
      "Surname",
      "Date of birth",
      "Street name",
      "Phone Nr.",
      "E-Mail address",
      "I confirm: All details are correct and I have not been banned from playing.",
      "I confirm: I am the beneficial owner of the player account.",
      "I confirm: T&C and Data Protection Policy",
      "Block - User",
      "Delete User",
    ]);
    const columnWidths = ref(Array(30).fill(150)); // For 30 columns, each 150px wide
    const users = ref([]);
    const sortColumn = ref(null); // Currently sorted column
    const sortAsc = ref(true); // Sort order (ascending or descending)

    // Check the user's role before mounting the page
    onBeforeMount(() => {
      const userRole = localStorage.getItem("role"); // Assume role is stored in localStorage
      if (userRole !== "admin") {
        router.push("/login"); // Redirect to login page if user is not an admin
      }
    });
    onMounted(async()=>{
       await adminStore.getUsers()
       users.value=adminStore.users
    })
    const sortedRows = computed(() => {
      if (sortColumn.value === null) {
        return rows.value; // Return rows unchanged if no sorting is applied
      }

      return [...rows.value].sort((a, b) => {
        let aVal = a[sortColumn.value];
        let bVal = b[sortColumn.value];

        // If the column is numeric, evaluate as number
        if (!isNaN(aVal) && !isNaN(bVal)) {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        }

        if (aVal < bVal) return sortAsc.value ? -1 : 1;
        if (aVal > bVal) return sortAsc.value ? 1 : -1;
        return 0;
      });
    });

    const toggleDrawer = () => {
      drawerOpen.value = !drawerOpen.value;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const openModal = (title, content) => {
      modalTitle.value = title;
      modalContent.value = content;
      showModal.value = true;
    };
    const deleteUserInfo=async(id)=>{
        await adminStore.deleteUser(id)
        await adminStore.getUsers()
    }
    const logout = () => {
      console.log("User logged out");
    };

    const sortTable = (index) => {
      if (sortColumn.value === index) {
        sortAsc.value = !sortAsc.value;
      } else {
        sortColumn.value = index;
        sortAsc.value = true;
      }
    };

    const deleteUser = (rowIndex) => {
      rows.value.splice(rowIndex, 1); // Delete the user at the specified row
      console.log("User deleted");
    };

    return {
      drawerOpen,
      showModal,
      modalTitle,
      modalContent,
      searchQuery,
      columnTitles,
      columnWidths,
      sortedRows,
      sortColumn,
      sortAsc,
      toggleDrawer,
      closeModal,
      openModal,
      logout,
      sortTable,
      deleteUser,
      users,
      deleteUserInfo
    };
  },
};
</script>
  <style scoped>
/* Responsive Styles */
@media (max-width: 600px) {
  .matrix-container {
    overflow-x: auto;
    display: block;
  }

  .data-matrix {
    width: 100%;
    table-layout: auto;
  }

  .q-table-responsive {
    width: 100%;
  }

  .q-toolbar {
    padding: 0.5rem;
  }

  .q-input {
    width: 100%;
  }

  .q-btn {
    display: block;
    margin-top: 1rem;
  }

  .q-dialog-plugin {
    width: 100%;
    max-width: 90vw;
  }
}

@media (min-width: 601px) {
  .matrix-container {
    overflow-x: auto;
  }

  .data-matrix {
    width: 100%;
  }

  .q-dialog-plugin {
    width: 60vw;
  }
}
</style>
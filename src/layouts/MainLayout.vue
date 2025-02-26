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
        />
        <q-btn flat round icon="menu" aria-label="Menu" @click="toggleDrawer" class="text-white" />
      </q-toolbar>
    </q-header>

    <!-- Drawer -->
    <q-drawer v-model="drawerOpen" side="right" bordered class="no-scrollbar fixed-height">
      <q-list style="height: 100%;">
        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>
            Logout
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Hauptinhalt -->
    <q-page-container>
      <div class="matrix-container">
        <!-- Matrix mit horizontaler und vertikaler Scrollbar -->
        <table class="data-matrix">
          <thead class="fixed-header">
            <tr>
              <th v-for="(title, index) in columnTitles" :key="index" :style="{ width: columnWidths[index] + 'px' }">
                <span @click="sortTable(index)" style="display: flex; align-items: center; cursor: pointer;">
                  {{ title }}
                  <q-icon 
                    :name="sortAsc && sortColumn === index ? 'arrow_upward' : (sortColumn === index ? 'arrow_downward' : 'arrow_upward')" 
                    class="sort-icon" 
                  />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in sortedRows" :key="rowIndex">
              <td v-for="(col, colIndex) in row" :key="colIndex">
                <!-- Spezielle Behandlung für "Profit Success +/-" Spalte -->
                <template v-if="columnTitles[colIndex] === 'Profit Success +/-'">
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
                </template>
                <!-- Block-User: Toggle-Schalter -->
                <template v-if="columnTitles[colIndex] === 'Block - User'">
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
                </template>
                <!-- Delete User: Mülltonnen-Icon -->
                <template v-if="columnTitles[colIndex] === 'Delete User'">
                  <q-btn 
                    flat 
                    icon="delete" 
                    color="negative" 
                    @click="deleteUser(rowIndex)" 
                    :style="{ width: columnWidths[colIndex] + 'px' }"
                  />
                </template>
                <template v-else>
                  {{ col }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
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
export default {
  data() {
    return {
      drawerOpen: false,
      showModal: false,
      modalTitle: '',
      modalContent: '',
      searchQuery: '',
      columnTitles: [
        'Login Date', 'Player name ID', 'Total Investment', 'Total Playtime', 'Total Win / Payout', 
        'Profit Success +/-', 'Total Spins', 'Online?', 'First name', 'Surname', 'Date of birth', 
        'Street name', 'Phone Nr.', 'E-Mail address', 
        'I confirm: All details are correct and I have not been banned from playing.',
        'I confirm: I am the beneficial owner of the player account.',
        'I confirm: T&C and Data Protection Policy', 'Nr. Creditcard', 'Date of Valid', 
        'Secure Code', 'Block - User', 'Delete User',
      ],
      columnWidths: Array(30).fill(150),  // Für 30 Spalten, jede 150px breit
      rows: [ // Beispiel-Datenzeilen
        ['2024-11-21', 'Player1', '1000', '5h', '500 / 300', '', '100', 'Yes', 'John', 'Doe', '1990-01-01', 'Street 123', '123456789', 'john.doe@example.com', 'True', 'True', 'True', '1234 5678 9876 5432', '2025-01-01', '123', 'Nein', 'No'],
        ['2024-11-20', 'Player2', '2000', '10h', '1000 / 800', '', '200', 'No', 'Alice', 'Smith', '1992-02-02', 'Street 456', '987654321', 'alice.smith@example.com', 'True', 'True', 'True', '4321 8765 6789 1234', '2026-02-01', '456', 'Ja', 'No'],
        // Weitere tatsächliche Daten hier
      ],
      sortColumn: null, // Aktuell sortierte Spalte
      sortAsc: true, // Sortierreihenfolge (aufsteigend oder absteigend)
    };
  },
  computed: {
    sortedRows() {
      if (this.sortColumn === null) {
        return this.rows; // Wenn keine Sortierung gewählt wurde, gebe die Daten unverändert zurück
      }

      return [...this.rows].sort((a, b) => {
        let aVal = a[this.sortColumn];
        let bVal = b[this.sortColumn];

        // Wenn die Spalte numerisch ist, bewerte sie als Zahl
        if (!isNaN(aVal) && !isNaN(bVal)) {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        }

        if (aVal < bVal) return this.sortAsc ? -1 : 1;
        if (aVal > bVal) return this.sortAsc ? 1 : -1;
        return 0;
      });
    },
  },
  methods: {
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen;
    },
    closeModal() {
      this.showModal = false;
    },
    openModal(title, content) {
      this.modalTitle = title;
      this.modalContent = content;
      this.showModal = true;
    },
    logout() {
      console.log("User logged out");
    },
    sortTable(index) {
      if (this.sortColumn === index) {
        // Wenn auf die gleiche Spalte geklickt wird, ändere die Reihenfolge
        this.sortAsc = !this.sortAsc;
      } else {
        // Ansonsten, setze auf die neue Spalte und aufsteigend
        this.sortColumn = index;
        this.sortAsc = true;
      }
    },
    deleteUser(rowIndex) {
      this.rows.splice(rowIndex, 1); // Löscht den User an der entsprechenden Zeile
      console.log("User deleted");
    },
  },
};
</script>

<style scoped>
.matrix-container {
  width: 100%;
  background-color: white;
  overflow-x: auto; /* Ermöglicht horizontales Scrollen */
  overflow-y: auto; /* Ermöglicht vertikales Scrollen */
  padding: 20px;
}

.data-matrix {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto; /* Flexible Spaltenbreiten */
  color: rgb(0, 0, 0);
  white-space: nowrap; /* Verhindert Zeilenumbruch in den Zellen */
}

.fixed-header {
  position: sticky;
  top: 0;
  background-color: #c5d4e4;
  z-index: 1; /* Stellt sicher, dass die Kopfzeile immer oben bleibt */
}

.data-matrix th,
.data-matrix td {
  padding: 12px;
  border: 1px solid #0a0a0a;
  text-align: left;
  cursor: pointer;
}

.sort-icon {
  margin-left: 5px;
  opacity: 0.6; /* Faded effect for inactive sort arrows */
}

.scrollable-body {
  max-height: 500px; /* Maximale Höhe des Matrix-Inhalts */
  overflow-y: auto; /* Vertikales Scrollen der Matrix */
  display: block; /* Wichtig für das Scrollen */
  overflow-x: auto; /* Ermöglicht horizontales Scrollen */
}

/* Stil für den Logout-Element im Seitenmenü */
.logout-item {
  font-size: 16px;
  color: #0a0a0a;
}

.logout-item:hover {
  background-color: #979927; /* Hellgrauer Hover-Effekt */
}

/* Verhindert Scrollen im Drawer */
.no-scrollbar {
  overflow: hidden; /* Deaktiviert die Scrollbar */
}

.fixed-height {
  height: 100%; /* Sorgt dafür, dass der Drawer die volle Höhe einnimmt */
  display: flex; /* Ermöglicht saubere Layout-Ausrichtung */
  flex-direction: column; /* Richtet die Inhalte von oben nach unten aus */
}

/* Modales Dialogfenster */
.q-dialog-plugin {
  max-width: 600px;
  width: 90%;
}

.title-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Stile für den Textbereich im Modal */
.scrollable-text {
  max-height: 400px;
  overflow-y: auto;
  padding: 10px;
}

/* Schließen-Button im Dialog */
.close-btn {
  position: absolute;
  top: 0;
  right: 0;
}

.text-white {
  color: rgb(240, 235, 235);
}

/* Styling für die dunkelgrüne Toolbar */
.bg-darkgreen {
  background-color: #2b45dd; /* Dunkelgrün */
}

/* Spezifische Stile für den Toggle-Schalter */
.block-toggle .q-toggle__label {
  font-weight: bold;
}
</style>

<script setup>
import { ref, computed } from 'vue';
// Använd den relativa sökvägen (../) för att undvika @-aliasfelet
import { 
    getBookings, 
    deleteBooking, 
    completeBooking 
} from '../services/bookingService.js'; 

// Hämta den reaktiva listan från servicen
const allBookings = getBookings(); 

// --- 1. REAKTIVA STATE FÖR FILTER OCH SÖKNING ---
const searchQuery = ref('');
const statusFilter = ref('alla'); // Standardvärde: Visa alla statusar

// --- 2. SÖKFUNKTION (Computed Property) ---
const searchedBookings = computed(() => {
    const query = searchQuery.value.toLowerCase();
    
    if (!query) {
        return allBookings.value; // Om sökfältet är tomt, visa alla
    }

    return allBookings.value.filter(booking => {
        // Sök i namn, registreringsnummer och service-typ
        return (
            booking.kundNamn.toLowerCase().includes(query) ||
            booking.regNr.toLowerCase().includes(query) ||
            booking.service.toLowerCase().includes(query)
        );
    });
});

// --- 3. FILTRERINGSFUNKTION (Computed Property) ---
const filteredBookings = computed(() => {
    const filter = statusFilter.value;
    
    if (filter === 'alla') {
        return searchedBookings.value; // Returnerar sökresultatet
    }
    
    // Filtrera sökresultatet efter matchande status
    return searchedBookings.value.filter(booking => {
        return booking.status === filter;
    });
});
</script>

<template>
  <section>
    <div class="header-container">
      <h1>Bokningar</h1>
      <p>Här kan du se och hantera alla bokningar.</p>
    </div>

    <!-- Sök och filter -->
    <div class="controls">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Sök på namn, regnr, service..."
        class="search-input"
      />
      <div class="filter-buttons">
        <button @click="statusFilter = 'alla'" :class="{ active: statusFilter === 'alla' }">Alla</button>
        <button @click="statusFilter = 'bokad'" :class="{ active: statusFilter === 'bokad' }">Bokade</button>
        <button @click="statusFilter = 'klar'" :class="{ active: statusFilter === 'klar' }">Klara</button>
      </div>
    </div>

    <!-- Bokningslista -->
    <div class="booking-list">
      <div v-if="filteredBookings.length === 0" class="no-bookings">
        <p>Inga bokningar matchade din sökning eller filter.</p>
      </div>
      <div v-else v-for="booking in filteredBookings" :key="booking.id" class="booking-card" :class="booking.status">
        <div class="booking-info">
          <h3>{{ booking.kundNamn }}</h3>
          <p><strong>Reg.nr:</strong> {{ booking.regNr }}</p>
          <p><strong>Service:</strong> {{ booking.service }}</p>
          <p><strong>Datum:</strong> {{ booking.datum }}</p>
          <p><strong>Status:</strong> <span class="status-label">{{ booking.status }}</span></p>
        </div>
        <div class="booking-actions">
          <button v-if="booking.status === 'bokad'" @click="completeBooking(booking.id)" class="btn-complete">
            Markera som klar
          </button>
          <button @click="deleteBooking(booking.id)" class="btn-delete">
            Ta bort
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header-container {
  text-align: center;
  margin-bottom: 2rem;
}
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  gap: 1rem;
}
.search-input {
  flex-grow: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
.filter-buttons button {
  margin-left: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  background-color: #f0f0f0;
}
.filter-buttons button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
.booking-list {
  display: grid;
  gap: 1.5rem;
}
.booking-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: box-shadow 0.2s ease-in-out;
}
.booking-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
.booking-card.klar {
  background-color: #e9f5e9;
  border-left: 5px solid #28a745;
}
.booking-card.bokad {
  border-left: 5px solid #ffc107;
}
.booking-info h3 {
  margin-top: 0;
}
.booking-info p {
  margin: 0.25rem 0;
  color: #555;
}
.status-label {
  text-transform: capitalize;
  font-weight: bold;
}
.booking-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.booking-actions button {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  color: white;
}
.btn-complete {
  background-color: #28a745;
}
.btn-delete {
  background-color: #dc3545;
}
.no-bookings {
  text-align: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>

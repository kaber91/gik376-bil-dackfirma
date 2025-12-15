<script setup>
import { ref, computed } from 'vue'
import { getBookings, deleteBooking, completeBooking } from '../services/bookingService.js'

const allBookings = getBookings()

const searchQuery = ref('')
const statusFilter = ref('alla')

// används när man klickar "Markera som klar"
function markAsDone(booking) {
  // enkel standardtext så completeBooking får sin parameter
  const performedAction = booking.service || 'Service utförd'
  completeBooking(booking.id, performedAction)
}

const searchedBookings = computed(() => {
  const query = searchQuery.value.toLowerCase()

  if (!query) return allBookings.value

  return allBookings.value.filter(booking => {
    return (
      (booking.kundNamn || '').toLowerCase().includes(query) ||
      (booking.regNr || '').toLowerCase().includes(query) ||
      (booking.service || '').toLowerCase().includes(query)
    )
  })
})

const filteredBookings = computed(() => {
  const filter = statusFilter.value

  if (filter === 'alla') return searchedBookings.value

  return searchedBookings.value.filter(booking => booking.status === filter)
})
</script>

<template>
  <section>
    <div class="header-container">
      <h1>Bokningar</h1>
      <p>Här kan du se och hantera alla bokningar.</p>
    </div>

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

        <!-- BYT klar -> avslutad -->
        <button @click="statusFilter = 'avslutad'" :class="{ active: statusFilter === 'avslutad' }">Klara</button>
      </div>
    </div>

    <div class="booking-list">
      <div v-if="filteredBookings.length === 0" class="no-bookings">
        <p>Inga bokningar matchade din sökning eller filter.</p>
      </div>

      <div
        v-else
        v-for="booking in filteredBookings"
        :key="booking.id"
        class="booking-card"
        :class="booking.status"
      >
        <div class="booking-info">
          <h3>{{ booking.kundNamn }}</h3>
          <p><strong>Reg.nr:</strong> {{ booking.regNr }}</p>
          <p><strong>Service:</strong> {{ booking.service }}</p>
          <p><strong>Datum:</strong> {{ booking.datum }} <span v-if="booking.tid">kl {{ booking.tid }}</span></p>

          <!-- Visa ev. extra fält från nya formuläret -->
          <p v-if="booking.email"><strong>E-post:</strong> {{ booking.email }}</p>
          <p v-if="booking.telefon"><strong>Telefon:</strong> {{ booking.telefon }}</p>

          <p><strong>Status:</strong> <span class="status-label">{{ booking.status }}</span></p>

          <p v-if="booking.performedAction"><strong>Åtgärd:</strong> {{ booking.performedAction }}</p>
        </div>

        <div class="booking-actions">
          <button
            v-if="booking.status === 'bokad'"
            @click="markAsDone(booking)"
            class="btn-complete"
          >
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
/* din CSS kan vara kvar exakt som den är, men lägg till detta: */
.booking-card.avslutad {
  background-color: #e9f5e9;
  border-left: 5px solid #28a745;
}
</style>


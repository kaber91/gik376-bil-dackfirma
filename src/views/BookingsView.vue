<template>
  <section class="bookings-view">
    <h1>Mina Bokningar</h1>
    <p>Här är en översikt över alla bokade tider.</p>

    <table class="bookings-table">
      <thead>
        <tr>
          <th>Kundnamn</th>
          <th>Reg.nr</th>
          <th>Service</th>
          <th>Datum</th>
          <th>Tid</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="booking in bookings" :key="booking.id">
          <td>{{ booking.customerName }}</td>
          <td>{{ booking.licensePlate }}</td>
          <td>{{ booking.serviceType }}</td>
          <td>{{ booking.bookingDate }}</td>
          <td>{{ booking.bookingTime }}</td>
          <td>
            <span :class="['status', getStatusClass(booking.status)]">{{ booking.status }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref } from 'vue'
// Importera bokningsdata från JSON-filen.
import bookingsData from '../data/bookings.json'


const bookings = ref(bookingsData)

// Funktion för att returnera en CSS-klass baserat på bokningens status.
const getStatusClass = (status) => {
  if (status === 'Avslutad') return 'status-completed'
  if (status === 'Bokad') return 'status-booked'
  return 'status-default'
}
</script>

<style scoped>
.bookings-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.bookings-table {
  width: 100%;
  margin-top: 2rem;
  border-collapse: collapse;
}

.bookings-table th,
.bookings-table td {
  border: 1px solid #444;
  padding: 0.75rem;
  text-align: left;
}

.bookings-table th {
  background-color: #1a1a1a;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  color: white;
  font-weight: bold;
}

.status-booked {
  background-color: #3b82f6; /* Blå */
}

.status-completed {
  background-color: #22c55e; /* Grön */
}
.status-default {
  background-color: #6b7280; /* Grå */
}
</style>
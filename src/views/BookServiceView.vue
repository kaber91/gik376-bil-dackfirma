<template>
  <section class="booking-form">
    <h1>Boka Service</h1>

    <form @submit.prevent="handleSubmit">

      <label>
        Namn:
        <input v-model="form.name" type="text" required />
      </label>

      <label>
        E-post:
        <input v-model="form.email" type="email" required />
      </label>

      <label>
        Telefonnummer:
        <input v-model="form.phone" type="tel" required />
      </label>

      <label>
        Registreringsnummer:
        <input v-model="form.regNumber" type="text" required />
      </label>

      <label>
        Datum:
        <input v-model="form.date" type="date" required />
      </label>

      <label>
        Tid:
        <input v-model="form.time" type="time" required />
      </label>

      <label>
        Typ av tjänst:
        <select v-model="form.serviceType" required>
          <option disabled value="">Välj tjänst</option>
          <option>Däckbyte</option>
          <option>Balansjustering</option>
          <option>Felsökning</option>
          <option>Service</option>
        </select>
      </label>

      <button type="submit">Boka</button>
    </form>

    <!-- Bekräftelsemeddelande -->
    <p v-if="lastBooking" class="success-message">
      Tack {{ lastBooking.name }}! Din bokning för {{ lastBooking.date }} kl {{ lastBooking.time }} är registrerad.
    </p>

    <!-- Debug under utveckling – kan tas bort senare -->
    <pre>{{ form }}</pre>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Form-objektet
const form = reactive({
  name: "",
  email: "",
  phone: "",
  regNumber: "",
  date: "",
  time: "",
  serviceType: ""
})

// Spara senaste bokningen för att visa bekräftelse
const lastBooking = ref(null)

function handleSubmit() {
  // Skapa bokningsobjekt
  const booking = {
    id: Date.now(),
    name: form.name,
    email: form.email,
    phone: form.phone,
    regNumber: form.regNumber,
    date: form.date,
    time: form.time,
    serviceType: form.serviceType,
    status: "bokad"
  }

  console.log("Bokning skapad:", booking)

  // Spara senaste bokningen så att bekräftelsetexten visas
  lastBooking.value = booking

  // Resetta formuläret
  Object.keys(form).forEach(key => form[key] = "")
}
</script>

<style scoped>
.booking-form {
  max-width: 450px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
}

input, select, button {
  padding: 0.5rem;
  font-size: 1rem;
}

button {
  margin-top: 1rem;
  cursor: pointer;
}

.success-message {
  margin-top: 1rem;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #4caf50;
  background: #e8f8ec;
  font-size: 0.95rem;
}
</style>


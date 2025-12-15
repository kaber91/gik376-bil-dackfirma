<script setup>
import { reactive, ref } from "vue"
import { addBooking } from "../services/bookingService.js"

const form = reactive({
  kundNamn: "",
  email: "",
  telefon: "",
  regNr: "",
  datum: "",
  tid: "",
  service: ""
})

const successMessage = ref("")
const errorMessage = ref("")

function handleSubmit() {
  // Enkel validering
  if (
    !form.kundNamn ||
    !form.email ||
    !form.telefon ||
    !form.regNr ||
    !form.datum ||
    !form.tid ||
    !form.service
  ) {
    errorMessage.value = "Alla fält måste fyllas i."
    successMessage.value = ""
    return
  }

  // Skicka ENDAST form-data (bookingService lägger själv till id + status)
  addBooking({ ...form })

  successMessage.value = `Tack ${form.kundNamn}! Din bokning ${form.datum} kl ${form.tid} är registrerad.`
  errorMessage.value = ""

  Object.keys(form).forEach(key => (form[key] = ""))

  setTimeout(() => {
    successMessage.value = ""
  }, 5000)
}
</script>

<template>
  <section class="booking-page">
    <div class="header-container">
      <h1>Boka Service</h1>
      <p>Fyll i formuläret nedan för att boka en ny servicetid.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="booking-form">
      <div class="form-group">
        <label for="kundNamn">Namn</label>
        <input
          id="kundNamn"
          type="text"
          v-model="form.kundNamn"
          placeholder="T.ex. Karolina Berg"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">E-post</label>
        <input
          id="email"
          type="email"
          v-model="form.email"
          placeholder="t.ex. namn@mail.se"
          required
        />
      </div>

      <div class="form-group">
        <label for="telefon">Telefonnummer</label>
        <input
          id="telefon"
          type="tel"
          v-model="form.telefon"
          placeholder="T.ex. 0701234567"
          required
        />
      </div>

      <div class="form-group">
        <label for="regNr">Registreringsnummer</label>
        <input
          id="regNr"
          type="text"
          v-model="form.regNr"
          placeholder="T.ex. ABC 123"
          required
        />
      </div>

      <div class="form-group">
        <label for="datum">Datum</label>
        <input id="datum" type="date" v-model="form.datum" required />
      </div>

      <div class="form-group">
        <label for="tid">Tid</label>
        <input id="tid" type="time" v-model="form.tid" required />
      </div>

      <div class="form-group">
        <label for="service">Typ av tjänst</label>
        <select id="service" v-model="form.service" required>
          <option value="" disabled>Välj en service...</option>
          <option value="Däckbyte">Däckbyte</option>
          <option value="Hjulinställning">Hjulinställning</option>
          <option value="Reparation">Reparation</option>
          <option value="Service">Service</option>
          <option value="Övrigt">Övrigt</option>
        </select>
      </div>

      <div v-if="successMessage" class="message success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="message error">{{ errorMessage }}</div>

      <button type="submit" class="submit-btn">Skapa bokning</button>
    </form>
  </section>
</template>

<style scoped>
.header-container {
  text-align: center;
  margin-bottom: 2rem;
}

.booking-form {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.message {
  text-align: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
}

.success {
  background-color: #e9f5e9;
  color: #28a745;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
}
</style>

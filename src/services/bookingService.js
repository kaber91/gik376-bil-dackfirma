

import { ref } from 'vue';
import initialBookings from '../assets/bookings.json'; 

const bookings = ref(initialBookings);

// --- fejk spara-funktion
function simulateSave() {
    console.log("Bokningsdatan har uppdaterats (simulerad sparning)!");
}


// --- De olika funktionerna (crud) 


/**
 * Exponerar den reaktiva listan av bokningar för vyer.
 */
export function getBookings() {
    return bookings;
}

/**
 * Lägg till bokning (Create)
 */
export function addBooking(newBookingData) {
    const newId = Date.now();
    
    const newBooking = { 
        id: newId, 
        status: 'bokad', 
        ...newBookingData 
    };

    bookings.value.push(newBooking);
    simulateSave();
}

/**
 * Uppdatera bokning (Update)
 */
export function updateBooking(id, updatedFields) {
    const index = bookings.value.findIndex(b => b.id === id);

    if (index !== -1) {
        bookings.value[index] = { ...bookings.value[index], ...updatedFields };
        simulateSave();
        return true;
    }
    return false;
}

/**
 * Ta bort bokning (Delete)
 */
export function deleteBooking(id) {
    bookings.value = bookings.value.filter(b => b.id !== id);
    simulateSave();
}

/**
 * Markera bokning som avslutad (Specialiserad Update)
 */
export function completeBooking(id, performedAction) {
    updateBooking(id, { 
        status: 'avslutad', 
        performedAction: performedAction,
        dateCompleted: new Date().toISOString()
    });
}
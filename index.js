const ParkingSystem = require('./parking');
const fs = require('fs/promises');

async function main() {
    const parking = new ParkingSystem();

    console.log("Initializing Parking System...");
    await parking.loadData();

    // Add vehicles
    await parking.addVehicle("KA-01-1234");
    await parking.addVehicle("KA-02-5678");

    // Remove vehicle
    await parking.removeVehicle("KA-01-1234");

    // Check parking availability
    const availableSlots = parking.getAvailableSlots();
    console.log(`Available slots: ${availableSlots}`);

    // Save data
    await parking.saveData();
}

main().catch(err => console.error("Error:", err));

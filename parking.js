const fs = require('fs/promises');
const path = require('path');
const Stack = require('./utils/stack');
const Queue = require('./utils/queue');

const DATA_FILE = path.join(__dirname, 'data/parking.json');

class ParkingSystem {
    constructor() {
        this.maxSlots = 10;
        this.vehicles = [];
        this.history = new Stack();
        this.queue = new Queue();
    }

    async loadData() {
        try {
            const data = await fs.readFile(DATA_FILE, 'utf8');
            const parsedData = JSON.parse(data);
            this.vehicles = parsedData.vehicles || [];
        } catch (err) {
            console.log("No existing data found. Initializing new parking system.");
        }
    }

    async saveData() {
        const data = JSON.stringify({ vehicles: this.vehicles }, null, 2);
        await fs.writeFile(DATA_FILE, data);
        console.log("Parking data saved!");
    }

    addVehicle(plateNumber) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.vehicles.length >= this.maxSlots) {
                    console.log(`Parking full! Adding ${plateNumber} to the waiting queue.`);
                    this.queue.enqueue(plateNumber);
                    return resolve();
                }
                this.vehicles.push(plateNumber);
                this.history.push({ action: 'add', plateNumber });
                console.log(`Vehicle ${plateNumber} parked.`);
                resolve();
            }, 1000);
        });
    }

    removeVehicle(plateNumber) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.vehicles.indexOf(plateNumber);
                if (index === -1) {
                    console.log(`Vehicle ${plateNumber} not found!`);
                    return reject(new Error('Vehicle not found.'));
                }
                this.vehicles.splice(index, 1);
                this.history.push({ action: 'remove', plateNumber });
                console.log(`Vehicle ${plateNumber} removed.`);
                resolve();
            }, 1000);
        });
    }

    getAvailableSlots() {
        return this.maxSlots - this.vehicles.length;
    }
}

module.exports = ParkingSystem;

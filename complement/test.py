import json
import random
import hashlib

# Define the possible transactions
transactions_list = [
    {"transaction": "Reuseable Straws", "amount": 100},
    {"transaction": "Bees Wax Candle", "amount": 200},
    {"transaction": "Bamboo Toothbrushes", "amount": 350},
    {"transaction": "Solar Power Charger", "amount": 5000},
    {"transaction": "EcoBee Thermostat", "amount": 15000}
]

# Create a list to store transaction data
transactions = []

# Generate data for 100 transactions
for _ in range(100):
    # Choose a random transaction
    transaction = random.choice(transactions_list)

    # Generate a random hash for the address
    address = '0x' + hashlib.sha256(str(random.getrandbits(256)).encode('utf-8')).hexdigest()

    transaction["address"] = address
    transactions.append(transaction)

# Write the data to transactions.json
with open('transactions.json', 'w') as f:
    json.dump(transactions, f)
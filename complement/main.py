from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import json
import os

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class User(BaseModel):
    address: str
    balance: int

users = []

# Check if users.json exists, if not, create it
if not os.path.exists('users.json'):
    with open('users.json', 'w') as f:
        json.dump([], f)

@app.post("/user")
async def create_user(user: User):
    users.append(user)
    with open('users.json', 'w') as f:
        json.dump([u.dict() for u in users], f)
    return user

@app.get("/user/{address}")
async def get_user(address: str):
    with open('users.json', 'r') as f:
        users = [User(**u) for u in json.load(f)]
    for user in users:
        if user.address == address:
            return user
    return {"error": "User not found"}
@app.put("/user/{address}/add/{amount}")
async def add_balance(address: str, amount: int):
    with open('users.json', 'r') as f:
        users = [User(**u) for u in json.load(f)]
    for user in users:
        if user.address == address:
            user.balance += amount
            break
    else:  # This else clause is executed when the for loop is exhausted, i.e., address not found
        users.append(User(address=address, balance=amount))
    with open('users.json', 'w') as f:
        json.dump([u.dict() for u in users], f)
    return {"address": address, "balance": amount}

@app.put("/user/{address}/remove/{amount}")
async def remove_balance(address: str, amount: int):
    with open('users.json', 'r') as f:
        users = [User(**u) for u in json.load(f)]
    for user in users:
        if user.address == address:
            if user.balance >= amount:
                user.balance -= amount
                with open('users.json', 'w') as f:
                    json.dump([u.dict() for u in users], f)
                return user
            else:
                return {"error": "Insufficient balance"}
    return {"error": "User not found"}
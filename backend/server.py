from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Base offset so the public "brands registered" counter starts high (matches brand copy)
BRANDS_BASE_OFFSET = 384

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ------------------ Models ------------------
class Brief(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    brand: str
    email: EmailStr
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BriefCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    brand: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    message: str = Field(..., min_length=1, max_length=2000)


class BriefCountResponse(BaseModel):
    count: int


class Subscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class SubscribeCreate(BaseModel):
    email: EmailStr


class SubscribeCountResponse(BaseModel):
    count: int


# ------------------ Routes ------------------
@api_router.get("/")
async def root():
    return {"message": "4-11 Studio API"}


@api_router.post("/briefs", response_model=Brief)
async def create_brief(payload: BriefCreate):
    brief = Brief(**payload.model_dump())
    doc = brief.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.briefs.insert_one(doc)
    return brief


@api_router.get("/briefs", response_model=List[Brief])
async def list_briefs():
    docs = await db.briefs.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


@api_router.get("/briefs/count", response_model=BriefCountResponse)
async def brief_count():
    n = await db.briefs.count_documents({})
    return BriefCountResponse(count=BRANDS_BASE_OFFSET + n)


SUBS_BASE_OFFSET = 384


@api_router.post("/subscribe", response_model=Subscriber)
async def subscribe(payload: SubscribeCreate):
    email = payload.email.lower()
    existing = await db.subscribers.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=409, detail="You're already on the list.")
    sub = Subscriber(email=email)
    doc = sub.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.subscribers.insert_one(doc)
    return sub


@api_router.get("/subscribe/count", response_model=SubscribeCountResponse)
async def subscribe_count():
    n = await db.subscribers.count_documents({})
    return SubscribeCountResponse(count=SUBS_BASE_OFFSET + n)


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

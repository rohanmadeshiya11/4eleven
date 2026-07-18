"""Backend tests for /api/subscribe endpoints."""
import os
import uuid
import requests
import pytest

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL")
if not BASE_URL:
    # Read from frontend/.env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.strip().split("=", 1)[1]
                break
BASE_URL = BASE_URL.rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def unique_email():
    return f"test_{uuid.uuid4().hex[:12]}@example.com"


def test_root():
    r = requests.get(f"{API}/", timeout=15)
    assert r.status_code == 200


def test_subscribe_count_baseline():
    r = requests.get(f"{API}/subscribe/count", timeout=15)
    assert r.status_code == 200
    data = r.json()
    assert "count" in data
    assert isinstance(data["count"], int)
    assert data["count"] >= 384


def test_subscribe_valid(unique_email):
    r = requests.post(f"{API}/subscribe", json={"email": unique_email}, timeout=15)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["email"] == unique_email
    assert "id" in data and data["id"]
    assert "created_at" in data


def test_subscribe_duplicate(unique_email):
    r1 = requests.post(f"{API}/subscribe", json={"email": unique_email}, timeout=15)
    assert r1.status_code == 200
    r2 = requests.post(f"{API}/subscribe", json={"email": unique_email}, timeout=15)
    assert r2.status_code == 409
    detail = r2.json().get("detail")
    assert detail == "You're already on the list."


def test_subscribe_invalid_email():
    r = requests.post(f"{API}/subscribe", json={"email": "not-an-email"}, timeout=15)
    assert r.status_code == 422


def test_subscribe_count_increments(unique_email):
    r0 = requests.get(f"{API}/subscribe/count", timeout=15)
    c0 = r0.json()["count"]
    r = requests.post(f"{API}/subscribe", json={"email": unique_email}, timeout=15)
    assert r.status_code == 200
    r1 = requests.get(f"{API}/subscribe/count", timeout=15)
    c1 = r1.json()["count"]
    assert c1 == c0 + 1

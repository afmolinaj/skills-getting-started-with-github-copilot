import pytest
from fastapi.testclient import TestClient
from src.app import app

client = TestClient(app)

def test_get_activities():
    response = client.get("/activities")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, dict)
    assert "Chess Club" in data

def test_signup_and_unregister():
    test_email = "testuser@mergington.edu"
    activity = "Chess Club"

    # Sign up
    resp_signup = client.post(f"/activities/{activity}/signup?email={test_email}")
    assert resp_signup.status_code == 200
    assert f"Signed up {test_email}" in resp_signup.json()["message"]

    # Duplicate sign up should not fail (but could be improved)
    resp_signup2 = client.post(f"/activities/{activity}/signup?email={test_email}")
    assert resp_signup2.status_code == 200

    # Unregister
    resp_unreg = client.post(f"/activities/{activity}/unregister?email={test_email}")
    assert resp_unreg.status_code == 200
    assert f"{test_email} has been unregistered" in resp_unreg.json()["message"]

    # Unregister again should fail
    resp_unreg2 = client.post(f"/activities/{activity}/unregister?email={test_email}")
    assert resp_unreg2.status_code == 400
    assert "Email not registered" in resp_unreg2.json()["detail"]

def test_signup_missing_email():
    activity = "Chess Club"
    resp = client.post(f"/activities/{activity}/signup?email=")
    assert resp.status_code == 400
    assert "Email is required" in resp.json()["detail"]

def test_signup_activity_not_found():
    resp = client.post("/activities/Nonexistent/signup?email=test@mergington.edu")
    assert resp.status_code == 404
    assert "Activity not found" in resp.json()["detail"]
